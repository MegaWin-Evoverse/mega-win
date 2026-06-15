'use client';
import { useState, useCallback, useMemo } from 'react';
import { KENO_MAX_PICKS, KENO_MIN_PICKS, KENO_DEFAULT_BET, KENO_PAYOUTS } from './constants';
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
  handleNumberToggle: (n: number) => void;
  handlePlay: () => void;
  handleReset: () => void;
  getCellState: (n: number) => CellState;
}

export function useKenoGame(betAmount = KENO_DEFAULT_BET): UseKenoGameResult {
  const [gameResult, setGameResult] = useState<GameResult>('idle');
  const [selectedNumbers, setSelectedNumbers] = useState<Set<number>>(new Set());
  const [drawnNumbers, setDrawnNumbers] = useState<Set<number>>(new Set());
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
      if (drawnNumbers.has(n)) {
        count++;
      }
    });

    return count;
  }, [gameResult, selectedNumbers, drawnNumbers]);

  const winMultiplier = useMemo<number>(
    () => (gameResult === 'idle' ? 0 : (currentPayouts[matchCount] ?? 0)),
    [gameResult, currentPayouts, matchCount]
  );

  const handleNumberToggle = useCallback(
    (n: number) => {
      if (gameResult !== 'idle') {
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
    [gameResult]
  );

  const handlePlay = useCallback(() => {
    if (selectedNumbers.size < KENO_MIN_PICKS) {
      return;
    }

    const drawn = drawNumbers();

    setDrawnNumbers(drawn);

    let matches = 0;

    selectedNumbers.forEach((n) => {
      if (drawn.has(n)) {
        matches++;
      }
    });

    const multiplier = (KENO_PAYOUTS[selectedNumbers.size] ?? [])[matches] ?? 0;

    setGameResult(multiplier > 0 ? 'win' : 'lose');
  }, [selectedNumbers]);

  const handleReset = useCallback(() => {
    setGameResult('idle');
    setSelectedNumbers(new Set());
    setDrawnNumbers(new Set());
  }, []);

  const getCellState = useCallback(
    (n: number): CellState => {
      if (gameResult === 'idle') {
        return selectedNumbers.has(n) ? 'selected' : 'idle';
      }

      const isSelected = selectedNumbers.has(n);
      const isDrawn = drawnNumbers.has(n);

      if (isSelected && isDrawn) {
        return 'hit';
      }

      if (isSelected) {
        return 'miss';
      }

      if (isDrawn) {
        return 'drawn';
      }

      return 'idle';
    },
    [gameResult, selectedNumbers, drawnNumbers]
  );

  return {
    phase,
    selectedNumbers,
    drawnNumbers,
    matchCount,
    winMultiplier,
    currentPayouts,
    betAmount,
    handleNumberToggle,
    handlePlay,
    handleReset,
    getCellState,
  };
}
