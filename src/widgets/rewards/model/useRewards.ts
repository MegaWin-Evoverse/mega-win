'use client';
import { useState } from 'react';
import { DEFAULT_SORT } from './constants';
import { useRewardsQuery } from './useRewardsQuery';
import type { RewardSort } from './types';

export function useRewards() {
  const [sort, setSort] = useState<RewardSort>(DEFAULT_SORT);
  const { data, isLoading } = useRewardsQuery(sort);

  return {
    rewards: data?.data ?? [],
    isLoading,
    sort,
    onSortChange: setSort,
  };
}
