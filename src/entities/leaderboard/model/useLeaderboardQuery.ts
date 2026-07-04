'use client';
import { useQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from '@/shared/api/query-keys';
import { getLeaderboard } from '../api/getLeaderboard';
import { TOP_3_THRESHOLD } from './constants';
import { getCurrentMonth } from './getCurrentMonth';
import type { LeaderboardParticipant } from './types';

interface UseLeaderboardQueryReturn {
  month: string;
  participants: LeaderboardParticipant[];
  top3: LeaderboardParticipant[];
  isLoading: boolean;
}

export function useLeaderboardQuery(): UseLeaderboardQueryReturn {
  const month = getCurrentMonth();

  const { data, isLoading } = useQuery({
    queryKey: QUERY_KEYS.leaderboard(month),
    queryFn: () => getLeaderboard({ month }),
    retry: false,
  });

  const participants = data?.participants.data ?? [];
  const top3 = participants.filter((participant) => participant.position <= TOP_3_THRESHOLD);

  return { month, participants, top3, isLoading };
}
