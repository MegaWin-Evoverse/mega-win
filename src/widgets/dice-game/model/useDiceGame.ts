'use client';
import { useState, useCallback, useMemo, useRef, useEffect, useLayoutEffect } from 'react';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { useShallow } from 'zustand/react/shallow';
import { useGameControlsStore } from '@/entities/game';
import {
  DEFAULT_ROLLOVER,
  HOUSE_EDGE,
  MAX_HISTORY,
  STATS_DECIMALS,
  CHANCE_DECIMALS,
  BET_DECIMALS,
  ROLL_ABOVE,
  LABELS,
} from './constants';
import type { RollEntry } from './types';
import { diceBet } from '../api/diceBet';

interface UseDiceGameResult {
  rollover: number;
  history: RollEntry[];
  lastRoll: RollEntry | null;
  multiplierDisplay: string;
  rolloverDisplay: string;
  chanceDisplay: string;
  handleRolloverChange: (value: number) => void;
  handleRoll: () => void;
}

export function useDiceGame(): UseDiceGameResult {
  const { storeBetAmount, setBetCallback } = useGameControlsStore(
    useShallow((state) => ({
      storeBetAmount: state.betAmount,
      setBetCallback: state.setBetCallback,
    }))
  );

  const [rollover, setRollover] = useState(DEFAULT_ROLLOVER);
  const [history, setHistory] = useState<RollEntry[]>([]);
  const [lastRoll, setLastRoll] = useState<RollEntry | null>(null);
  const handleRollRef = useRef<() => void>(() => {});

  const chance = 100 - rollover;
  const multiplier = chance > 0 ? (HOUSE_EDGE * 100) / chance : 0;
  const multiplierDisplay = useMemo(() => multiplier.toFixed(STATS_DECIMALS), [multiplier]);
  const rolloverDisplay = useMemo(() => rollover.toFixed(STATS_DECIMALS), [rollover]);
  const chanceDisplay = useMemo(() => chance.toFixed(CHANCE_DECIMALS), [chance]);

  const { mutate, isPending } = useMutation({
    mutationFn: diceBet,
    onSuccess: (response) => {
      const entry: RollEntry = { value: response.randomValue, isWin: response.didWin };
      setLastRoll(entry);
      setHistory((prev) => [entry, ...prev].slice(0, MAX_HISTORY));
    },
    onError: () => {
      toast.error(LABELS.BET_ERROR);
    },
  });

  const handleRoll = useCallback(() => {
    if (isPending) return;

    mutate({
      betSize: parseFloat(storeBetAmount).toFixed(BET_DECIMALS),
      threshold: rollover,
      above: ROLL_ABOVE,
    });
  }, [isPending, mutate, storeBetAmount, rollover]);

  useLayoutEffect(() => {
    handleRollRef.current = handleRoll;
  });

  useEffect(() => {
    const stableCallback = () => handleRollRef.current();
    setBetCallback(stableCallback);
    return () => setBetCallback(null);
  }, [setBetCallback]);

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
    handleRolloverChange,
    handleRoll,
  };
}
