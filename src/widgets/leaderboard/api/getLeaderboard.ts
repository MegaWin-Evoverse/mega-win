import { api } from '@/shared/api/client';
import { isAxiosError } from 'axios';
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
  try {
    const { data } = await api.get<LeaderboardData>(`/api/leaderboard/${month}`, {
      params: { page, take },
    });

    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response?.status === 404) {
      return {
        month,
        title: '',
        updatedAt: new Date().toISOString(),
        participants: {
          take,
          page,
          total: 0,
          totalPages: 0,
          data: [],
        },
      };
    }
    throw error;
  }
}
