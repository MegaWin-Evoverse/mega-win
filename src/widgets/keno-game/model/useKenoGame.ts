'use client';
import { useState, useCallback, useMemo, useRef, useEffect } from 'react';
import {
  KENO_MAX_PICKS,
  KENO_MIN_PICKS,
  KENO_DEFAULT_BET,
  KENO_PAYOUTS,
  KENO_REVEAL_DELAY_MS,
  KENO_RESULT_DELAY_MS,
} from './constants';
import type { GamePhase, CellState, GameResult } from './types';
import { drawNumbers } from './drawNumbers';

interface UseKenoGameResult {
  phase: GamePhase;
  selectedNumbers: Set<number>;
  drawnNumbers: Set<number>;
  matchCount: number;
  winMultiplier: number;
  currentPayouts: readonly number[];
  betAmount: number;
  isRevealing: boolean;
  handleNumberToggle: (n: number) => void;
  handlePlay: () => void;
  handleReset: () => void;
  getCellState: (n: number) => CellState;
}

export function useKenoGame(betAmount = KENO_DEFAULT_BET): UseKenoGameResult {
  const [gameResult, setGameResult] = useState<GameResult>('idle');
  const [selectedNumbers, setSelectedNumbers] = useState<Set<number>>(new Set());
  const [allDrawnNumbers, setAllDrawnNumbers] = useState<Set<number>>(new Set());
  const [revealedNumbers, setRevealedNumbers] = useState<Set<number>>(new Set());
  const [isRevealing, setIsRevealing] = useState(false);
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

  const currentPayouts = useMemo<readonly number[]>(
    () => (selectedCount >= KENO_MIN_PICKS ? (KENO_PAYOUTS[selectedCount] ?? []) : []),
    [selectedCount]
  );

  const matchCount = useMemo<number>(() => {
    if (gameResult === 'idle') {
      return 0;
    }

    let count = 0;

    selectedNumbers.forEach((n) => {
      if (allDrawnNumbers.has(n)) {
        count++;
      }
    });

    return count;
  }, [gameResult, selectedNumbers, allDrawnNumbers]);

  const winMultiplier = useMemo<number>(
    () => (gameResult === 'idle' ? 0 : (currentPayouts[matchCount] ?? 0)),
    [gameResult, currentPayouts, matchCount]
  );

  const handleNumberToggle = useCallback(
    (n: number) => {
      if (gameResult !== 'idle' || isRevealing) {
        return;
      }

      setSelectedNumbers((prev) => {
        const next = new Set(prev);

        if (next.has(n)) {
          next.delete(n);
        } else if (next.size < KENO_MAX_PICKS) {
          next.add(n);
        }

        return next;
      });
    },
    [gameResult, isRevealing]
  );

  const handlePlay = useCallback(() => {
    if (selectedNumbers.size < KENO_MIN_PICKS || isRevealing) {
      return;
    }

    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];

    const drawn = drawNumbers();
    const drawnArray = Array.from(drawn);
    let matches = 0;

    selectedNumbers.forEach((n) => {
      if (drawn.has(n)) {
        matches++;
      }
    });

    const multiplier = (KENO_PAYOUTS[selectedNumbers.size] ?? [])[matches] ?? 0;

    setAllDrawnNumbers(drawn);
    setRevealedNumbers(new Set());
    setIsRevealing(true);

    drawnArray.forEach((n, i) => {
      const timeout = setTimeout(
        () => {
          setRevealedNumbers((prev) => {
            const next = new Set(prev);
            next.add(n);
            return next;
          });
        },
        (i + 1) * KENO_REVEAL_DELAY_MS
      );

      timeoutsRef.current.push(timeout);
    });

    const finalTimeout = setTimeout(
      () => {
        setIsRevealing(false);
        setGameResult(multiplier > 0 ? 'win' : 'lose');
      },
      (drawnArray.length + 1) * KENO_REVEAL_DELAY_MS + KENO_RESULT_DELAY_MS
    );

    timeoutsRef.current.push(finalTimeout);
  }, [selectedNumbers, isRevealing]);

  const handleReset = useCallback(() => {
    timeoutsRef.current.forEach(clearTimeout);

    timeoutsRef.current = [];

    setGameResult('idle');
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

      if (isSelected && isRevealed) {
        return 'hit';
      }

      if (isSelected) {
        return isRevealing ? 'selected' : 'miss';
      }

      if (isRevealed) {
        return 'drawn';
      }

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
    betAmount,
    isRevealing,
    handleNumberToggle,
    handlePlay,
    handleReset,
    getCellState,
  };
}
