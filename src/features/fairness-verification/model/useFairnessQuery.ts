'use client';
import { useQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from '@/shared/api/query-keys';
import type { FairnessData } from './types';
import { FAIRNESS_SEED_ENDPOINT, FAIRNESS_SEED_ERROR } from './constants';

export function useFairnessQuery(isEnabled: boolean) {
  return useQuery<FairnessData>({
    queryKey: QUERY_KEYS.fairnessSeed,
    queryFn: async () => {
      const response = await fetch(FAIRNESS_SEED_ENDPOINT);
      if (!response.ok) {
        throw new Error(FAIRNESS_SEED_ERROR);
      }
      return (await response.json()) as FairnessData;
    },
    enabled: isEnabled,
    retry: false,
    refetchOnWindowFocus: false,
  });
}
