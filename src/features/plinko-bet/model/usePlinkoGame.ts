import { useCallback, useEffect, useRef, useState } from 'react';
import { useShallow } from 'zustand/react/shallow';
import { toast } from 'sonner';
import { GAME_PANEL_TAB } from '@/shared/config';
import { useGameControlsStore, type GameControlsState } from '@/entities/game';
import { useUserQuery, BALANCE_TYPE, type User } from '@/entities/user';
import { usePlacePlinkoBetMutation } from './usePlacePlinkoBetMutation';
import { PLINKO_BET_ERROR_MESSAGE, PLINKO_HISTORY_LIMIT, PLINKO_LABELS } from './constants';
import { type PlinkoDrop, type PlinkoHistoryEntry } from './types';

interface AutoBetProgress {
  current: number;
  total: number;
}

interface UsePlinkoGameReturn {
  placeBet: () => void;
  stop: () => void;
  drops: PlinkoDrop[];
  history: PlinkoHistoryEntry[];
  onDropLanded: (id: string, payout: number) => void;
  isBetting: boolean;
  isAutoRunning: boolean;
  autoBetLabel?: string;
}

function selectControls(state: GameControlsState) {
  return {
    betAmount: state.betAmount,
    risk: state.risk,
    rows: state.rows,
    activeTab: state.activeTab,
    numberOfBets: state.numberOfBets,
    stopOnProfit: state.stopOnProfit,
    stopOnLoss: state.stopOnLoss,
    applyBet: state.applyBet,
    applyWin: state.applyWin,
    setBalance: state.setBalance,
  };
}

function getGamePointsBalance(user: User | undefined): number | null {
  const gamePoints = user?.userBalances.find(
    (balance) => balance.balanceType === BALANCE_TYPE.GAME_POINTS
  );
  if (!gamePoints) return null;
  return Number.parseFloat(gamePoints.value) || 0;
}

export function usePlinkoGame(): UsePlinkoGameReturn {
  const {
    betAmount,
    risk,
    rows,
    activeTab,
    numberOfBets,
    stopOnProfit,
    stopOnLoss,
    applyBet,
    applyWin,
    setBalance,
  } = useGameControlsStore(useShallow(selectControls));
  const { data: user } = useUserQuery();
  const [drops, setDrops] = useState<PlinkoDrop[]>([]);
  const [history, setHistory] = useState<PlinkoHistoryEntry[]>([]);
  const [isAutoRunning, setIsAutoRunning] = useState(false);
  const [autoBetProgress, setAutoBetProgress] = useState<AutoBetProgress | null>(null);

  const remainingRef = useRef(0);
  const autoRunningRef = useRef(false);
  const netProfitRef = useRef(0);
  const lastBetSizeRef = useRef(0);

  const gamePointsBalance = getGamePointsBalance(user);

  useEffect(() => {
    if (gamePointsBalance !== null) setBalance(gamePointsBalance);
  }, [gamePointsBalance, setBalance]);

  const stop = useCallback(() => {
    autoRunningRef.current = false;
    remainingRef.current = 0;
    setIsAutoRunning(false);
    setAutoBetProgress(null);
  }, []);

  const onBetSuccess = useCallback((drop: PlinkoDrop) => {
    setDrops((prev) => [...prev, drop]);
  }, []);

  const onBetError = useCallback(() => {
    applyWin(lastBetSizeRef.current);
    toast.error(PLINKO_BET_ERROR_MESSAGE);
    if (autoRunningRef.current) stop();
  }, [applyWin, stop]);

  const { placeBet: mutate, isPending } = usePlacePlinkoBetMutation({
    rows,
    risk,
    onBetSuccess,
    onBetError,
  });

  const placeOne = useCallback(() => {
    const betSize = Number.parseFloat(betAmount) || 0;
    if (betSize <= 0) return false;
    lastBetSizeRef.current = betSize;
    applyBet(betSize);
    mutate({ betSize, rows, risk });
    return true;
  }, [betAmount, risk, rows, applyBet, mutate]);

  const isAutoMode = activeTab === GAME_PANEL_TAB.AUTO;

  const placeBet = useCallback(() => {
    if (!isAutoMode) {
      placeOne();
      return;
    }
    if (autoRunningRef.current) return;
    const parsed = Number.parseInt(numberOfBets, 10);
    const totalBets = Number.isFinite(parsed) && parsed > 0 ? parsed : Number.POSITIVE_INFINITY;
    remainingRef.current = totalBets;
    netProfitRef.current = 0;
    autoRunningRef.current = true;
    setIsAutoRunning(true);
    setAutoBetProgress(Number.isFinite(totalBets) ? { current: 1, total: totalBets } : null);
    if (remainingRef.current > 0 && placeOne()) {
      remainingRef.current -= 1;
    } else {
      stop();
    }
  }, [isAutoMode, numberOfBets, placeOne, stop]);

  const onDropLanded = useCallback(
    (id: string, payout: number) => {
      if (payout > 0) applyWin(payout);
      const landed = drops.find((drop) => drop.id === id);
      if (landed) {
        const entry: PlinkoHistoryEntry = {
          id: landed.id,
          multiplier: landed.multiplier,
          tier: landed.tier,
        };
        setHistory((prev) => [entry, ...prev].slice(0, PLINKO_HISTORY_LIMIT));
      }
      setDrops((prev) => prev.filter((drop) => drop.id !== id));
      netProfitRef.current += payout - lastBetSizeRef.current;
      if (!autoRunningRef.current) return;
      const profitStop = Number.parseFloat(stopOnProfit) || 0;
      const lossStop = Number.parseFloat(stopOnLoss) || 0;
      const hitProfit = profitStop > 0 && netProfitRef.current >= profitStop;
      const hitLoss = lossStop > 0 && -netProfitRef.current >= lossStop;
      if (remainingRef.current <= 0 || hitProfit || hitLoss) {
        stop();
        return;
      }
      if (placeOne()) {
        remainingRef.current -= 1;
        setAutoBetProgress((prev) => (prev ? { ...prev, current: prev.current + 1 } : prev));
      } else {
        stop();
      }
    },
    [applyWin, drops, stopOnProfit, stopOnLoss, placeOne, stop]
  );

  const autoBetLabel = isAutoRunning
    ? autoBetProgress
      ? `${PLINKO_LABELS.STOP_AUTOBET} ${autoBetProgress.current}/${autoBetProgress.total}`
      : PLINKO_LABELS.STOP_AUTOBET
    : undefined;

  return {
    placeBet,
    stop,
    drops,
    history,
    onDropLanded,
    isBetting: isPending || isAutoRunning,
    isAutoRunning,
    autoBetLabel,
  };
}
