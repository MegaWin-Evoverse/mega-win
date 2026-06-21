'use client';
import { useEffect, useState } from 'react';
import { DAILY_CLAIM_COUNTDOWN_UNIT } from './constants';

const MILLISECONDS_PER_SECOND = 1000;
const SECONDS_PER_MINUTE = 60;
const MINUTES_PER_HOUR = 60;
const SECONDS_PER_HOUR = SECONDS_PER_MINUTE * MINUTES_PER_HOUR;
const PAD_LENGTH = 2;
const PAD_CHAR = '0';

interface UseCountdownResult {
  label: string;
  isComplete: boolean;
}

function formatRemaining(secondsRemaining: number): string {
  const hours = Math.floor(secondsRemaining / SECONDS_PER_HOUR);
  const minutes = Math.floor((secondsRemaining % SECONDS_PER_HOUR) / SECONDS_PER_MINUTE);
  const seconds = secondsRemaining % SECONDS_PER_MINUTE;
  const paddedMinutes = String(minutes).padStart(PAD_LENGTH, PAD_CHAR);
  const paddedSeconds = String(seconds).padStart(PAD_LENGTH, PAD_CHAR);

  return `${hours}${DAILY_CLAIM_COUNTDOWN_UNIT.HOUR}:${paddedMinutes}${DAILY_CLAIM_COUNTDOWN_UNIT.MINUTE}:${paddedSeconds}${DAILY_CLAIM_COUNTDOWN_UNIT.SECOND}`;
}

function secondsUntil(targetIso: string | undefined): number {
  if (!targetIso) return 0;

  const diffMs = new Date(targetIso).getTime() - Date.now();

  return Math.max(0, Math.round(diffMs / MILLISECONDS_PER_SECOND));
}

export function useCountdown(targetIso: string | undefined): UseCountdownResult {
  const [trackedTargetIso, setTrackedTargetIso] = useState(targetIso);
  const [secondsRemaining, setSecondsRemaining] = useState(() => secondsUntil(targetIso));

  if (trackedTargetIso !== targetIso) {
    setTrackedTargetIso(targetIso);
    setSecondsRemaining(secondsUntil(targetIso));
  }

  useEffect(() => {
    const intervalId = setInterval(() => {
      setSecondsRemaining(secondsUntil(targetIso));
    }, MILLISECONDS_PER_SECOND);

    return () => clearInterval(intervalId);
  }, [targetIso]);

  return {
    label: formatRemaining(secondsRemaining),
    isComplete: targetIso !== undefined && secondsRemaining <= 0,
  };
}
