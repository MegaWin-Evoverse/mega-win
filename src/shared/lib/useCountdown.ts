'use client';
import { useEffect, useState } from 'react';

const TICK_INTERVAL_MS = 1000;

interface CountdownRemaining {
  totalSeconds: number;
  isComplete: boolean;
}

function secondsUntil(targetTime: number | undefined): number {
  if (targetTime === undefined) return 0;

  return Math.max(0, Math.round((targetTime - Date.now()) / TICK_INTERVAL_MS));
}

export function useCountdown(target: Date | undefined): CountdownRemaining {
  const targetTime = target?.getTime();
  const [trackedTargetTime, setTrackedTargetTime] = useState(targetTime);
  const [secondsRemaining, setSecondsRemaining] = useState(() => secondsUntil(targetTime));

  if (trackedTargetTime !== targetTime) {
    setTrackedTargetTime(targetTime);
    setSecondsRemaining(secondsUntil(targetTime));
  }

  useEffect(() => {
    const intervalId = setInterval(() => {
      setSecondsRemaining(secondsUntil(targetTime));
    }, TICK_INTERVAL_MS);

    return () => clearInterval(intervalId);
  }, [targetTime]);

  return {
    totalSeconds: secondsRemaining,
    isComplete: targetTime !== undefined && secondsRemaining <= 0,
  };
}
