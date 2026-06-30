'use client';
import { useState } from 'react';
import { DEFAULT_SORT } from './constants';
import { useRewardsQuery } from './useRewardsQuery';
import type { RewardSort } from './types';

export function useRewards() {
  const [sort, setSort] = useState<RewardSort>(DEFAULT_SORT);
  const [search, setSearch] = useState('');
  const { data, isLoading, isError } = useRewardsQuery(sort);

  const allRewards = data?.data ?? [];
  const rewards = search.trim()
    ? allRewards.filter((r) => r.title.toLowerCase().includes(search.toLowerCase()))
    : allRewards;

  function onSortChange(value: RewardSort | null) {
    if (value !== null) setSort(value);
  }

  function onSearchChange(value: string) {
    setSearch(value);
  }

  return {
    rewards,
    isLoading,
    isError,
    sort,
    search,
    onSortChange,
    onSearchChange,
  };
}
