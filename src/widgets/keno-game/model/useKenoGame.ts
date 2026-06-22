'use client';
import { useState, useCallback, useMemo, useRef, useEffect } from 'react';
import { toast } from 'sonner';
import { useShallow } from 'zustand/react/shallow';
import { useGameControlsStore, RISK, RISK_API_MAP } from '@/entities/game';
import {
  MAX_PICKS,
  MIN_PICKS,
  PAYOUTS_BY_RISK,
  PICK_CHANCES,
  REVEAL_DELAY_MS,
  RESULT_DELAY_MS,
  BET_DECIMALS,
  LABELS,
} from './constants';
import type { GamePhase, CellState, GameResult } from './types';
import { useKenoBetMutation } from '../api/useKenoBetMutation';

interface UseKenoGameResult {
  phase: GamePhase;
  matchCount: number;
  winMultiplier: number;
  currentPayouts: readonly number[];
  currentChances: readonly number[];
  betAmount: number;
  isRevealing: boolean;
  getCellState: (n: number) => CellState;
  handleNumberToggle: (n: number) => void;
  handlePlay: () => void;
  handleReset: () => void;
}

export function useKenoGame(): UseKenoGameResult {
  const { storeBetAmount, storeRisk } = useGameControlsStore(
    useShallow((state) => ({
      storeBetAmount: state.betAmount,
      storeRisk: state.risk,
    }))
  );

  const [gameResult, setGameResult] = useState<GameResult>('idle');
  const [serverMultiplier, setServerMultiplier] = useState<number>(0);
  const [selectedNumbers, setSelectedNumbers] = useState<Set<number>>(new Set());
  const [allDrawnNumbers, setAllDrawnNumbers] = useState<Set<number>>(new Set());
  const [revealedNumbers, setRevealedNumbers] = useState<Set<number>>(new Set());
  const [isRevealing, setIsRevealing] = useState<boolean>(false);
  const timeoutsRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  const selectedCount = selectedNumbers.size;

  const phase: GamePhase =
    gameResult === 'win'
      ? 'win'
      : gameResult === 'lose'
        ? 'lose'
        : selectedCount === 0
          ? 'default'
          : 'pick';

  const currentPayouts = useMemo<readonly number[]>(() => {
    if (selectedCount < MIN_PICKS) return [];
    const risk = storeRisk ?? RISK.CLASSIC;
    return PAYOUTS_BY_RISK[risk].slice(0, selectedCount + 1);
  }, [selectedCount, storeRisk]);

  const currentChances = useMemo<readonly number[]>(
    () => (selectedCount >= MIN_PICKS ? PICK_CHANCES.slice(0, selectedCount + 1) : []),
    [selectedCount]
  );

  const matchCount = useMemo<number>(() => {
    if (gameResult === 'idle') return 0;
    let count = 0;
    selectedNumbers.forEach((n) => {
      if (allDrawnNumbers.has(n)) count++;
    });
    return count;
  }, [gameResult, selectedNumbers, allDrawnNumbers]);

  const winMultiplier = gameResult === 'idle' ? 0 : serverMultiplier;
  const betAmount = parseFloat(storeBetAmount) || 0;

  const { mutate, isPending } = useKenoBetMutation({
    onSuccess: (response) => {
      const drawnArray = response.results.map((n: number) => n + 1);
      const drawn = new Set<number>(drawnArray);

      setAllDrawnNumbers(drawn);
      setRevealedNumbers(new Set());
      setServerMultiplier(response.multiplier);

      drawnArray.forEach((n: number, i: number) => {
        const timeout = setTimeout(
          () => {
            setRevealedNumbers((prev) => {
              const next = new Set(prev);
              next.add(n);
              return next;
            });
          },
          (i + 1) * REVEAL_DELAY_MS
        );
        timeoutsRef.current.push(timeout);
      });

      const finalTimeout = setTimeout(
        () => {
          setIsRevealing(false);
          setGameResult(response.multiplier > 0 ? 'win' : 'lose');
        },
        (drawnArray.length + 1) * REVEAL_DELAY_MS + RESULT_DELAY_MS
      );

      timeoutsRef.current.push(finalTimeout);
    },
    onError: () => {
      setIsRevealing(false);
      toast.error(LABELS.BET_ERROR);
    },
  });

  const handlePlay = useCallback(() => {
    if (
      selectedNumbers.size < MIN_PICKS ||
      isRevealing ||
      isPending ||
      gameResult !== 'idle' ||
      !Number.isFinite(parseFloat(storeBetAmount))
    ) {
      return;
    }

    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];

    setIsRevealing(true);

    mutate({
      betSize: parseFloat(storeBetAmount).toFixed(BET_DECIMALS),
      risk: RISK_API_MAP[storeRisk ?? RISK.CLASSIC],
      selected: Array.from(selectedNumbers).map((n) => n - 1),
    });
  }, [selectedNumbers, isRevealing, isPending, gameResult, mutate, storeBetAmount, storeRisk]);

  const handleNumberToggle = useCallback(
    (n: number) => {
      if (gameResult !== 'idle' || isRevealing) return;
      setSelectedNumbers((prev) => {
        const next = new Set(prev);
        if (next.has(n)) {
          next.delete(n);
        } else if (next.size < MAX_PICKS) {
          next.add(n);
        }
        return next;
      });
    },
    [gameResult, isRevealing]
  );

  const handleReset = useCallback(() => {
    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];
    setGameResult('idle');
    setServerMultiplier(0);
    setSelectedNumbers(new Set());
    setAllDrawnNumbers(new Set());
    setRevealedNumbers(new Set());
    setIsRevealing(false);
  }, []);

  useEffect(() => {
    return () => {
      timeoutsRef.current.forEach(clearTimeout);
    };
  }, []);

  const getCellState = useCallback(
    (number: number): CellState => {
      if (!isRevealing && gameResult === 'idle') {
        return selectedNumbers.has(number) ? 'selected' : 'idle';
      }
      const isSelected = selectedNumbers.has(number);
      const isRevealed = revealedNumbers.has(number);
      if (isSelected && isRevealed) return 'hit';
      if (isSelected) return isRevealing ? 'selected' : 'miss';
      if (isRevealed) return 'drawn';
      return 'idle';
    },
    [isRevealing, gameResult, selectedNumbers, revealedNumbers]
  );

  return {
    phase,
    matchCount,
    winMultiplier,
    currentPayouts,
    currentChances,
    betAmount,
    isRevealing,
    getCellState,
    handleNumberToggle,
    handlePlay,
    handleReset,
  };
}
