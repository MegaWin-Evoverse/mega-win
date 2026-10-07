'use client';
import { useQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from '@/shared/api/query-keys';
import { getRewards } from '../api/getRewards';
import type { RewardSort } from './types';

export function useRewardsQuery(sort: RewardSort) {
  return useQuery({
    queryKey: QUERY_KEYS.rewards(sort),
    queryFn: () => getRewards({ sort }),
  });
}
