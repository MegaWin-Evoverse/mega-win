'use client';

import { useState, useCallback, useMemo, useRef, useEffect, useLayoutEffect } from 'react';
import { toast } from 'sonner';
import { useShallow } from 'zustand/react/shallow';
import { useGameControlsStore, RISK, RISK_API_MAP, selectIsAutoMode } from '@/entities/game';
import { useUserQuery } from '@/entities/user';
import { useTurboModeStore } from '@/features/game-settings';
import { getTurboValue } from '@/shared/lib/getTurboValue';
import {
  MAX_PICKS,
  MIN_PICKS,
  NUMBERS,
  PAYOUTS_BY_RISK,
  PICK_CHANCES,
  REVEAL_DELAY_MS,
  RESULT_DELAY_MS,
  AUTO_PICK_DELAY_MS,
  AUTO_BET_DELAY_MS,
  AUTO_BET_DELAY_TURBO_MS,
  BET_DECIMALS,
  LABELS,
} from './constants';
import type { GamePhase, CellState, GameResult } from './types';
import { useKenoBetMutation } from '../api/useKenoBetMutation';
import { getGamePointsBalance } from './getGamePointsBalance';

interface UseKenoGameResult {
  phase: GamePhase;
  matchCount: number;
  winMultiplier: number;
  currentPayouts: readonly number[];
  currentChances: readonly number[];
  betAmount: number;
  isRevealing: boolean;
  isAutoRunning: boolean;
  getCellState: (n: number) => CellState;
  handleNumberToggle: (n: number) => void;
  handlePlay: () => void;
  handleReset: () => void;
  handleAutoPick: () => void;
}

export function useKenoGame(): UseKenoGameResult {
  const {
    storeBetAmount,
    storeRisk,
    isAutoMode,
    storeNumberOfBets,
    storeDecrementNumberOfBets,
    setBalance,
  } = useGameControlsStore(
    useShallow((state) => ({
      storeBetAmount: state.betAmount,
      storeRisk: state.risk,
      isAutoMode: selectIsAutoMode(state),
      storeNumberOfBets: state.numberOfBets,
      storeDecrementNumberOfBets: state.decrementNumberOfBets,
      setBalance: state.setBalance,
    }))
  );
  const { data: user } = useUserQuery();
  const gamePointsBalance = getGamePointsBalance(user);
  const turboMode = useTurboModeStore((state) => state.turboMode);

  useEffect(() => {
    if (gamePointsBalance !== null) {
      setBalance(gamePointsBalance);
    }
  }, [gamePointsBalance, setBalance]);

  const [gameResult, setGameResult] = useState<GameResult>('idle');
  const [serverMultiplier, setServerMultiplier] = useState<number>(0);
  const [selectedNumbers, setSelectedNumbers] = useState<Set<number>>(new Set());
  const [allDrawnNumbers, setAllDrawnNumbers] = useState<Set<number>>(new Set());
  const [revealedNumbers, setRevealedNumbers] = useState<Set<number>>(new Set());
  const [isRevealing, setIsRevealing] = useState<boolean>(false);
  const [isAutoRunning, setIsAutoRunning] = useState<boolean>(false);
  const timeoutsRef = useRef<ReturnType<typeof setTimeout>[]>([]);
  const autoPickTimeoutsRef = useRef<ReturnType<typeof setTimeout>[]>([]);
  const isAutoRunningRef = useRef<boolean>(false);
  const remainingBetsRef = useRef<number>(0);
  const autoBetNextTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

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
    if (selectedCount < MIN_PICKS) {
      return [];
    }

    const risk = storeRisk ?? RISK.CLASSIC;

    return PAYOUTS_BY_RISK[risk].slice(0, selectedCount + 1);
  }, [selectedCount, storeRisk]);

  const currentChances = useMemo<readonly number[]>(
    () => (selectedCount >= MIN_PICKS ? PICK_CHANCES.slice(0, selectedCount + 1) : []),
    [selectedCount]
  );

  const matchCount = useMemo<number>(() => {
    if (gameResult === 'idle') {
      return 0;
    }

    let count = 0;

    selectedNumbers.forEach((number) => {
      if (allDrawnNumbers.has(number)) {
        count++;
      }
    });

    return count;
  }, [gameResult, selectedNumbers, allDrawnNumbers]);

  const winMultiplier = gameResult === 'idle' ? 0 : serverMultiplier;
  const betAmount = parseFloat(storeBetAmount) || 0;
  const fireBetRef = useRef<() => void>(() => {});

  const stopAutoBet = useCallback(() => {
    isAutoRunningRef.current = false;

    setIsAutoRunning(false);

    if (autoBetNextTimeoutRef.current !== null) {
      clearTimeout(autoBetNextTimeoutRef.current);

      autoBetNextTimeoutRef.current = null;
    }
  }, []);

  const { mutate, isPending } = useKenoBetMutation({
    onSuccess: (response) => {
      const drawnArray = response.results.map((n: number) => n + 1);
      const drawn = new Set<number>(drawnArray);

      setAllDrawnNumbers(drawn);
      setRevealedNumbers(new Set());
      setServerMultiplier(response.multiplier);

      function finalize() {
        setIsRevealing(false);
        setGameResult(response.multiplier > 0 ? 'win' : 'lose');

        if (!isAutoRunningRef.current) return;

        storeDecrementNumberOfBets();
        remainingBetsRef.current--;

        if (remainingBetsRef.current <= 0) {
          isAutoRunningRef.current = false;
          setIsAutoRunning(false);
          return;
        }

        autoBetNextTimeoutRef.current = setTimeout(
          () => {
            autoBetNextTimeoutRef.current = null;
            if (isAutoRunningRef.current) {
              fireBetRef.current();
            }
          },
          getTurboValue(turboMode, AUTO_BET_DELAY_MS, AUTO_BET_DELAY_TURBO_MS)
        );
      }

      if (turboMode) {
        setRevealedNumbers(drawn);
        finalize();
        return;
      }

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
        finalize,
        (drawnArray.length + 1) * REVEAL_DELAY_MS + RESULT_DELAY_MS
      );
      timeoutsRef.current.push(finalTimeout);
    },
    onError: () => {
      setIsRevealing(false);

      if (isAutoRunningRef.current) {
        isAutoRunningRef.current = false;

        setIsAutoRunning(false);
      }

      toast.error(LABELS.BET_ERROR);
    },
  });

  useLayoutEffect(() => {
    fireBetRef.current = () => {
      if (selectedNumbers.size < MIN_PICKS || !Number.isFinite(parseFloat(storeBetAmount))) {
        isAutoRunningRef.current = false;
        setIsAutoRunning(false);

        return;
      }

      setGameResult('idle');
      setServerMultiplier(0);
      setAllDrawnNumbers(new Set());
      setRevealedNumbers(new Set());
      setIsRevealing(true);

      mutate({
        betSize: parseFloat(storeBetAmount).toFixed(BET_DECIMALS),
        risk: RISK_API_MAP[storeRisk ?? RISK.CLASSIC],
        selected: Array.from(selectedNumbers).map((n) => n - 1),
      });
    };
  });

  const handlePlay = useCallback(() => {
    if (isAutoMode) {
      if (isAutoRunning) {
        stopAutoBet();

        return;
      }

      if (selectedNumbers.size < MIN_PICKS || !Number.isFinite(parseFloat(storeBetAmount))) {
        return;
      }

      autoPickTimeoutsRef.current.forEach(clearTimeout);
      autoPickTimeoutsRef.current = [];
      const count = parseInt(storeNumberOfBets, 10);
      remainingBetsRef.current = count > 0 ? count : Infinity;
      isAutoRunningRef.current = true;

      setIsAutoRunning(true);
      fireBetRef.current();

      return;
    }

    if (
      selectedNumbers.size < MIN_PICKS ||
      isRevealing ||
      isPending ||
      !Number.isFinite(parseFloat(storeBetAmount))
    ) {
      return;
    }

    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];
    autoPickTimeoutsRef.current.forEach(clearTimeout);
    autoPickTimeoutsRef.current = [];

    if (gameResult !== 'idle') {
      setGameResult('idle');
      setServerMultiplier(0);
      setAllDrawnNumbers(new Set());
      setRevealedNumbers(new Set());
    }

    setIsRevealing(true);

    mutate({
      betSize: parseFloat(storeBetAmount).toFixed(BET_DECIMALS),
      risk: RISK_API_MAP[storeRisk ?? RISK.CLASSIC],
      selected: Array.from(selectedNumbers).map((n) => n - 1),
    });
  }, [
    isAutoMode,
    isAutoRunning,
    selectedNumbers,
    isRevealing,
    isPending,
    gameResult,
    mutate,
    storeBetAmount,
    storeRisk,
    storeNumberOfBets,
    stopAutoBet,
  ]);

  const handleNumberToggle = useCallback(
    (number: number) => {
      if (isRevealing) {
        return;
      }

      if (gameResult !== 'idle') {
        setGameResult('idle');
        setServerMultiplier(0);
        setAllDrawnNumbers(new Set());
        setRevealedNumbers(new Set());
      }

      setSelectedNumbers((prev) => {
        const next = new Set(prev);

        if (next.has(number)) {
          next.delete(number);
        }

        if (next.size < MAX_PICKS) {
          next.add(number);
        }

        return next;
      });
    },
    [gameResult, isRevealing]
  );

  const handleReset = useCallback(() => {
    stopAutoBet();

    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];

    autoPickTimeoutsRef.current.forEach(clearTimeout);
    autoPickTimeoutsRef.current = [];

    setGameResult('idle');
    setServerMultiplier(0);
    setSelectedNumbers(new Set());
    setAllDrawnNumbers(new Set());
    setRevealedNumbers(new Set());
    setIsRevealing(false);
  }, [stopAutoBet]);

  const handleAutoPick = useCallback(() => {
    if (isRevealing) return;

    autoPickTimeoutsRef.current.forEach(clearTimeout);
    autoPickTimeoutsRef.current = [];
    const shuffled = [...NUMBERS].sort(() => Math.random() - 0.5).slice(0, MAX_PICKS);

    setGameResult('idle');
    setServerMultiplier(0);
    setAllDrawnNumbers(new Set());
    setRevealedNumbers(new Set());
    setSelectedNumbers(new Set());

    shuffled.forEach((n, i) => {
      const timeout = setTimeout(
        () => {
          setSelectedNumbers((prev) => {
            const next = new Set(prev);

            next.add(n);

            return next;
          });
        },
        (i + 1) * AUTO_PICK_DELAY_MS
      );

      autoPickTimeoutsRef.current.push(timeout);
    });
  }, [isRevealing]);

  useEffect(() => {
    return () => {
      timeoutsRef.current.forEach(clearTimeout);
      autoPickTimeoutsRef.current.forEach(clearTimeout);

      if (autoBetNextTimeoutRef.current !== null) {
        clearTimeout(autoBetNextTimeoutRef.current);
      }
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
    matchCount,
    winMultiplier,
    currentPayouts,
    currentChances,
    betAmount,
    isRevealing,
    isAutoRunning,
    getCellState,
    handleNumberToggle,
    handlePlay,
    handleReset,
    handleAutoPick,
  };
}
