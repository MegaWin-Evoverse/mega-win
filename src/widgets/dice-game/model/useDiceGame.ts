'use client';
import { useState, useCallback, useMemo, useRef, useEffect, useLayoutEffect } from 'react';
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
} from './constants';
import type { RollEntry } from './types';
import { useDiceBetMutation } from './useDiceBetMutation';

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

  const { mutate, isPending } = useDiceBetMutation((entry) => {
    setLastRoll(entry);
    setHistory((prev) => [entry, ...prev].slice(0, MAX_HISTORY));
  });

  const handleRoll = useCallback(() => {
    if (isPending) return;
    const betSize = parseFloat(storeBetAmount);
    if (isNaN(betSize)) return;

    mutate({
      betSize: betSize.toFixed(BET_DECIMALS),
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
