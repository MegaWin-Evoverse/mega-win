import { api } from '@/shared/api/client';
import type { LeaderboardData } from '../model/types';

interface Params {
  month: string;
  page?: number;
  take?: number;
}

export async function getLeaderboard({
  month,
  page = 1,
  take = 100,
}: Params): Promise<LeaderboardData> {
  const { data } = await api.get<LeaderboardData>(`/api/leaderboard/${month}`, {
    params: { page, take },
  });

  return data;
}
