'use client';
import { useLeaderboardQuery } from '@/shared/api/useLeaderboardQuery';
import { TOP_3_THRESHOLD, PODIUM_ORDER } from './constants';
import { getCurrentMonth } from '@/shared/lib/getCurrentMonth';
import type { LeaderCardData } from './types';
import { toLeaderCard } from './toLeaderCard';

export function useMonthlyLeaderboard() {
  const month = getCurrentMonth();

  const { data, isLoading } = useLeaderboardQuery(month);

  const allParticipants = data?.participants?.data ?? [];
  const top3Participants = allParticipants.filter((p) => Number(p.position) <= TOP_3_THRESHOLD);

  const cards: LeaderCardData[] = PODIUM_ORDER.map((pos) => {
    const participant = top3Participants.find((p) => Number(p.position) === pos);

    if (!participant) {
      return null;
    }

    return toLeaderCard(participant);
  }).filter((card): card is LeaderCardData => card !== null);

  const isEmpty = !isLoading && cards.length === 0;

  return { cards, isLoading, isEmpty };
}
