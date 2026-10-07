'use client';
import { useCountdown as useCountdownRemaining } from '@/shared/lib/useCountdown';
import type { CountdownValues } from './types';

const SECONDS_PER_MINUTE = 60;
const MINUTES_PER_HOUR = 60;
const HOURS_PER_DAY = 24;
const SECONDS_PER_HOUR = SECONDS_PER_MINUTE * MINUTES_PER_HOUR;
const SECONDS_PER_DAY = SECONDS_PER_HOUR * HOURS_PER_DAY;
const PAD_LENGTH = 2;
const PAD_CHAR = '0';

function pad(value: number): string {
  return String(value).padStart(PAD_LENGTH, PAD_CHAR);
}

export function useCountdown(targetDate: Date): CountdownValues {
  const { totalSeconds } = useCountdownRemaining(targetDate);
  const days = Math.floor(totalSeconds / SECONDS_PER_DAY);
  const hours = Math.floor((totalSeconds % SECONDS_PER_DAY) / SECONDS_PER_HOUR);
  const minutes = Math.floor((totalSeconds % SECONDS_PER_HOUR) / SECONDS_PER_MINUTE);
  const seconds = totalSeconds % SECONDS_PER_MINUTE;

  return {
    days: pad(days),
    hours: pad(hours),
    minutes: pad(minutes),
    seconds: pad(seconds),
  };
}
