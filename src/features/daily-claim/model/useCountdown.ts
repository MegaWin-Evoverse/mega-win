'use client';
import { useCountdown as useCountdownRemaining } from '@/shared/lib/useCountdown';
import { DAILY_CLAIM_COUNTDOWN_UNIT } from './constants';

const SECONDS_PER_MINUTE = 60;
const MINUTES_PER_HOUR = 60;
const SECONDS_PER_HOUR = SECONDS_PER_MINUTE * MINUTES_PER_HOUR;
const PAD_LENGTH = 2;
const PAD_CHAR = '0';

interface UseCountdownResult {
  label: string;
  isComplete: boolean;
}

function formatRemaining(totalSeconds: number): string {
  const hours = Math.floor(totalSeconds / SECONDS_PER_HOUR);
  const minutes = Math.floor((totalSeconds % SECONDS_PER_HOUR) / SECONDS_PER_MINUTE);
  const seconds = totalSeconds % SECONDS_PER_MINUTE;
  const paddedMinutes = String(minutes).padStart(PAD_LENGTH, PAD_CHAR);
  const paddedSeconds = String(seconds).padStart(PAD_LENGTH, PAD_CHAR);

  return `${hours}${DAILY_CLAIM_COUNTDOWN_UNIT.HOUR}:${paddedMinutes}${DAILY_CLAIM_COUNTDOWN_UNIT.MINUTE}:${paddedSeconds}${DAILY_CLAIM_COUNTDOWN_UNIT.SECOND}`;
}

export function useCountdown(targetIso: string | undefined): UseCountdownResult {
  const target = targetIso !== undefined ? new Date(targetIso) : undefined;
  const { totalSeconds, isComplete } = useCountdownRemaining(target);

  return {
    label: formatRemaining(totalSeconds),
    isComplete,
  };
}
