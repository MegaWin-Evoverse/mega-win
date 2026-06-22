import { api } from '@/shared/api/client';
import { DEFAULT_PAGE, DEFAULT_TAKE } from '../model/constants';
import type { RewardsPage, RewardSort } from '../model/types';

interface Params {
  page?: number;
  take?: number;
  sort?: RewardSort;
}

export async function getRewards({
  page = DEFAULT_PAGE,
  take = DEFAULT_TAKE,
  sort,
}: Params = {}): Promise<RewardsPage> {
  const { data } = await api.get<RewardsPage>('/api/reward/query', {
    params: { page, take, ...(sort && { sort }) },
  });

  return data;
}
