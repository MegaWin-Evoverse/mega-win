'use client';
import { useQuery } from '@tanstack/react-query';
import { DAILY_CLAIM_QUERY_KEYS } from '@/shared/api/query-keys';
import { fetchClaimStatus } from '../api/fetchClaimStatus';

export function useClaimStatus(isAuthenticated: boolean) {
  return useQuery({
    queryKey: DAILY_CLAIM_QUERY_KEYS.status,
    queryFn: fetchClaimStatus,
    enabled: isAuthenticated,
    retry: false,
  });
}
