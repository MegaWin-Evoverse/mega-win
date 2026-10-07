import { REWARDS_LABELS } from './constants';

export function formatTimeLeft(endDate: string): string {
  const diff = new Date(endDate).getTime() - Date.now();

  if (diff <= 0) {
    return REWARDS_LABELS.TIME_EXPIRED;
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

  return `${days}${REWARDS_LABELS.TIME_DAYS} : ${String(hours).padStart(2, '0')}${REWARDS_LABELS.TIME_HOURS} : ${String(minutes).padStart(2, '0')}${REWARDS_LABELS.TIME_MINUTES}`;
}
