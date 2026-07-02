import { api } from '@/shared/api/client';
import { isAxiosError } from 'axios';
import type { LeaderboardData } from '@/shared/api/types/leaderboard';

interface GetLeaderboardParams {
  month: string;
  page?: number;
  take?: number;
}

const DEFAULT_PAGE = 1;
const DEFAULT_TAKE = 100;
const NOT_FOUND_STATUS = 404;

export async function getLeaderboard({
  month,
  page = DEFAULT_PAGE,
  take = DEFAULT_TAKE,
}: GetLeaderboardParams): Promise<LeaderboardData> {
  try {
    const { data } = await api.get<LeaderboardData>(`/api/leaderboard/${month}`, {
      params: { page, take },
    });

    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response?.status === NOT_FOUND_STATUS) {
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
