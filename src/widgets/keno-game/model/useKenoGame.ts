'use client';
import { useState, useCallback, useMemo, useRef, useEffect, useLayoutEffect } from 'react';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { useShallow } from 'zustand/react/shallow';
import { useGameControlsStore, RISK } from '@/entities/game';
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
import { kenoBet } from '../api/kenoBet';

interface UseKenoGameResult {
  phase: GamePhase;
  selectedNumbers: Set<number>;
  drawnNumbers: Set<number>;
  matchCount: number;
  winMultiplier: number;
  currentPayouts: readonly number[];
  currentChances: readonly number[];
  betAmount: number;
  isRevealing: boolean;
  handleNumberToggle: (n: number) => void;
  handlePlay: () => void;
  handleReset: () => void;
  getCellState: (n: number) => CellState;
}

export function useKenoGame(): UseKenoGameResult {
  const { storeBetAmount, storeRisk, setBetCallback } = useGameControlsStore(
    useShallow((state) => ({
      storeBetAmount: state.betAmount,
      storeRisk: state.risk,
      setBetCallback: state.setBetCallback,
    }))
  );

  const [gameResult, setGameResult] = useState<GameResult>('idle');
  const [serverMultiplier, setServerMultiplier] = useState(0);
  const [selectedNumbers, setSelectedNumbers] = useState<Set<number>>(new Set());
  const [allDrawnNumbers, setAllDrawnNumbers] = useState<Set<number>>(new Set());
  const [revealedNumbers, setRevealedNumbers] = useState<Set<number>>(new Set());
  const [isRevealing, setIsRevealing] = useState(false);
  const timeoutsRef = useRef<ReturnType<typeof setTimeout>[]>([]);
  const handlePlayRef = useRef<() => void>(() => {});

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
    return (PAYOUTS_BY_RISK[risk] ?? PAYOUTS_BY_RISK[RISK.CLASSIC]).slice(0, selectedCount + 1);
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

  const { mutate, isPending } = useMutation({
    mutationFn: kenoBet,
    onSuccess: (response) => {
      const drawnArray = response.results.map((n) => n + 1);
      const drawn = new Set(drawnArray);

      setAllDrawnNumbers(drawn);
      setRevealedNumbers(new Set());
      setServerMultiplier(response.multiplier);

      drawnArray.forEach((n, i) => {
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
    if (selectedNumbers.size < MIN_PICKS || isRevealing || isPending || gameResult !== 'idle') {
      return;
    }

    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];

    setIsRevealing(true);

    mutate({
      betSize: parseFloat(storeBetAmount).toFixed(BET_DECIMALS),
      risk: (storeRisk ?? RISK.CLASSIC).toUpperCase(),
      selected: Array.from(selectedNumbers).map((n) => n - 1),
    });
  }, [selectedNumbers, isRevealing, isPending, gameResult, mutate, storeBetAmount, storeRisk]);

  useLayoutEffect(() => {
    handlePlayRef.current = handlePlay;
  });

  useEffect(() => {
    const stableCallback = () => handlePlayRef.current();
    setBetCallback(stableCallback);
    return () => setBetCallback(null);
  }, [setBetCallback]);

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
    selectedNumbers,
    drawnNumbers: allDrawnNumbers,
    matchCount,
    winMultiplier,
    currentPayouts,
    currentChances,
    betAmount,
    isRevealing,
    handleNumberToggle,
    handlePlay,
    handleReset,
    getCellState,
  };
}
