'use client';
import { useState, useCallback, useMemo, useRef, useEffect } from 'react';
import { useShallow } from 'zustand/react/shallow';
import { useGameControlsStore, selectIsAutoMode, type GameControlsState } from '@/entities/game';
import { useUserQuery } from '@/entities/user';
import {
  DEFAULT_ROLLOVER,
  HOUSE_EDGE,
  MAX_HISTORY,
  STATS_DECIMALS,
  CHANCE_DECIMALS,
  BET_DECIMALS,
  ROLL_ABOVE,
} from './constants';
import type { RollEntry } from './types';
import { useDiceBetMutation } from './useDiceBetMutation';
import { getGamePointsBalance } from './getGamePointsBalance';

function selectControls(state: GameControlsState) {
  return {
    betAmount: state.betAmount,
    isAutoMode: selectIsAutoMode(state),
    numberOfBets: state.numberOfBets,
    stopOnProfit: state.stopOnProfit,
    stopOnLoss: state.stopOnLoss,
    applyBet: state.applyBet,
    applyWin: state.applyWin,
    setBalance: state.setBalance,
  };
}

interface UseDiceGameResult {
  rollover: number;
  history: RollEntry[];
  lastRoll: RollEntry | null;
  multiplierDisplay: string;
  rolloverDisplay: string;
  chanceDisplay: string;
  isAutoRunning: boolean;
  handleRolloverChange: (value: number) => void;
  handleBet: () => void;
}

export function useDiceGame(): UseDiceGameResult {
  const {
    betAmount,
    isAutoMode,
    numberOfBets,
    stopOnProfit,
    stopOnLoss,
    applyBet,
    applyWin,
    setBalance,
  } = useGameControlsStore(useShallow(selectControls));
  const { data: user } = useUserQuery();

  const [rollover, setRollover] = useState(DEFAULT_ROLLOVER);
  const [history, setHistory] = useState<RollEntry[]>([]);
  const [lastRoll, setLastRoll] = useState<RollEntry | null>(null);
  const [isAutoRunning, setIsAutoRunning] = useState(false);

  const remainingRef = useRef(0);
  const autoRunningRef = useRef(false);
  const netProfitRef = useRef(0);
  const lastBetSizeRef = useRef(0);
  const rolloverRef = useRef(rollover);

  const gamePointsBalance = getGamePointsBalance(user);

  useEffect(() => {
    rolloverRef.current = rollover;
  }, [rollover]);

  useEffect(() => {
    if (gamePointsBalance !== null) {
      setBalance(gamePointsBalance);
    }
  }, [gamePointsBalance, setBalance]);

  const stop = useCallback(() => {
    autoRunningRef.current = false;
    remainingRef.current = 0;
    setIsAutoRunning(false);
  }, []);

  const chance = 100 - rollover;
  const multiplier = chance > 0 ? (HOUSE_EDGE * 100) / chance : 0;
  const multiplierDisplay = useMemo(() => multiplier.toFixed(STATS_DECIMALS), [multiplier]);
  const rolloverDisplay = useMemo(() => rollover.toFixed(STATS_DECIMALS), [rollover]);
  const chanceDisplay = useMemo(() => chance.toFixed(CHANCE_DECIMALS), [chance]);

  const placeOne = useCallback(() => {
    const betSize = parseFloat(betAmount);
    if (!Number.isFinite(betSize) || betSize <= 0) return false;
    lastBetSizeRef.current = betSize;
    applyBet(betSize);
    return true;
  }, [betAmount, applyBet]);

  const { mutate } = useDiceBetMutation({
    onSuccess: (response) => {
      const entry: RollEntry = { value: response.randomValue, isWin: response.didWin };
      setLastRoll(entry);
      setHistory((prev) => [entry, ...prev].slice(0, MAX_HISTORY));
      applyWin(parseFloat(response.payout));

      if (!autoRunningRef.current) return;

      netProfitRef.current += parseFloat(response.payout) - lastBetSizeRef.current;

      const profitStop = parseFloat(stopOnProfit) || 0;
      const lossStop = parseFloat(stopOnLoss) || 0;
      const hitProfit = profitStop > 0 && netProfitRef.current >= profitStop;
      const hitLoss = lossStop > 0 && -netProfitRef.current >= lossStop;

      remainingRef.current--;

      if (remainingRef.current <= 0 || hitProfit || hitLoss) {
        stop();
        return;
      }

      if (!placeOne()) {
        stop();
        return;
      }

      mutate({
        betSize: lastBetSizeRef.current.toFixed(BET_DECIMALS),
        threshold: rolloverRef.current,
        above: ROLL_ABOVE,
      });
    },
    onError: () => {
      applyWin(lastBetSizeRef.current);
      if (autoRunningRef.current) stop();
    },
  });

  const handleBet = useCallback(() => {
    if (!isAutoMode) {
      if (!placeOne()) return;
      mutate({
        betSize: lastBetSizeRef.current.toFixed(BET_DECIMALS),
        threshold: rolloverRef.current,
        above: ROLL_ABOVE,
      });
      return;
    }

    if (autoRunningRef.current) {
      stop();
      return;
    }

    const parsed = parseInt(numberOfBets, 10);
    const totalBets = Number.isFinite(parsed) && parsed > 0 ? parsed : Number.POSITIVE_INFINITY;
    remainingRef.current = totalBets;
    netProfitRef.current = 0;
    autoRunningRef.current = true;
    setIsAutoRunning(true);

    if (!placeOne()) {
      stop();
      return;
    }

    mutate({
      betSize: lastBetSizeRef.current.toFixed(BET_DECIMALS),
      threshold: rolloverRef.current,
      above: ROLL_ABOVE,
    });
  }, [isAutoMode, numberOfBets, placeOne, mutate, stop]);

  const handleRolloverChange = useCallback((value: number) => {
    setRollover(value);
  }, []);

  return {
    rollover,
    history,
    lastRoll,
    multiplierDisplay,
    rolloverDisplay,
    chanceDisplay,
    isAutoRunning,
    handleRolloverChange,
    handleBet,
  };
}
