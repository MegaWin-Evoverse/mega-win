'use client';
import { useQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from '@/shared/api/query-keys';
import { getReward } from '../api/getReward';

export function useRewardQuery(id: string) {
  return useQuery({
    queryKey: QUERY_KEYS.reward(id),
    queryFn: () => getReward(id),
    enabled: Boolean(id),
  });
}
