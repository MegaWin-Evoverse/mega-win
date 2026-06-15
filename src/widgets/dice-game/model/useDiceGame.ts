'use client';
import { useState, useCallback, useMemo } from 'react';
import {
  DEFAULT_ROLLOVER,
  HOUSE_EDGE,
  MAX_HISTORY,
  STATS_DECIMALS,
  CHANCE_DECIMALS,
} from './constants';
import type { RollEntry } from './types';
import { rollDice } from './rollDice';

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
  const [rollover, setRollover] = useState(DEFAULT_ROLLOVER);
  const [history, setHistory] = useState<RollEntry[]>([]);
  const [lastRoll, setLastRoll] = useState<RollEntry | null>(null);
  const chance = 100 - rollover;
  const multiplier = chance > 0 ? (HOUSE_EDGE * 100) / chance : 0;
  const multiplierDisplay = useMemo(() => multiplier.toFixed(STATS_DECIMALS), [multiplier]);
  const rolloverDisplay = useMemo(() => rollover.toFixed(STATS_DECIMALS), [rollover]);
  const chanceDisplay = useMemo(() => chance.toFixed(CHANCE_DECIMALS), [chance]);

  const handleRolloverChange = useCallback((value: number) => {
    setRollover(value);
  }, []);

  const handleRoll = useCallback(() => {
    const value = rollDice();
    const isWin = value > rollover;
    const entry: RollEntry = { value, isWin };

    setLastRoll(entry);
    setHistory((prev) => [entry, ...prev].slice(0, MAX_HISTORY));
  }, [rollover]);

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
