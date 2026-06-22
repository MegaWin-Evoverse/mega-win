'use client';
import { useState } from 'react';
import { DEFAULT_SORT } from './constants';
import { useRewardsQuery } from './useRewardsQuery';
import type { RewardSort } from './types';

export function useRewards() {
  const [sort, setSort] = useState<RewardSort>(DEFAULT_SORT);
  const { data, isLoading, isError } = useRewardsQuery(sort);

  function onSortChange(value: RewardSort | null) {
    if (value !== null) setSort(value);
  }

  return {
    rewards: data?.data ?? [],
    isLoading,
    isError,
    sort,
    onSortChange,
  };
}
