'use client';
import { useQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from '@/shared/api/query-keys';
import { SEED_HISTORY_ENDPOINT, SEED_HISTORY_FETCH_ERROR, SEED_PAGE_SIZE } from './constants';
import type { SeedHistoryResponse } from './types';

export function useSeedHistoryQuery(page: number) {
  return useQuery<SeedHistoryResponse>({
    queryKey: QUERY_KEYS.seedHistory(page),
    queryFn: async () => {
      const response = await fetch(`${SEED_HISTORY_ENDPOINT}?page=${page}&take=${SEED_PAGE_SIZE}`);
      if (!response.ok) throw new Error(SEED_HISTORY_FETCH_ERROR);
      return (await response.json()) as SeedHistoryResponse;
    },
    refetchOnWindowFocus: false,
  });
}
