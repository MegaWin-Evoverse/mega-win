'use client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import { toast } from 'sonner';
import { QUERY_KEYS, DAILY_CLAIM_QUERY_KEYS } from '@/shared/api/query-keys';
import { claimDaily } from '../api/claimDaily';
import { DAILY_CLAIM_HTTP_STATUS, DAILY_CLAIM_ERROR_MESSAGE } from './constants';

function resolveErrorMessage(error: unknown): string {
  if (!isAxiosError(error)) return DAILY_CLAIM_ERROR_MESSAGE.UNAVAILABLE;

  const status = error.response?.status;
  if (status === DAILY_CLAIM_HTTP_STATUS.ALREADY_CLAIMED)
    return DAILY_CLAIM_ERROR_MESSAGE.ALREADY_CLAIMED;
  if (status === DAILY_CLAIM_HTTP_STATUS.THROTTLED) return DAILY_CLAIM_ERROR_MESSAGE.THROTTLED;
  if (status === DAILY_CLAIM_HTTP_STATUS.DISABLED) return DAILY_CLAIM_ERROR_MESSAGE.UNAVAILABLE;
  if (status === DAILY_CLAIM_HTTP_STATUS.INVALID_CONFIG)
    return DAILY_CLAIM_ERROR_MESSAGE.UNAVAILABLE;

  return DAILY_CLAIM_ERROR_MESSAGE.UNAVAILABLE;
}

export function useClaimMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: claimDaily,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.currentUser });
      queryClient.invalidateQueries({ queryKey: DAILY_CLAIM_QUERY_KEYS.status });
    },
    onError: (error) => {
      toast.error(resolveErrorMessage(error));
      queryClient.invalidateQueries({ queryKey: DAILY_CLAIM_QUERY_KEYS.status });
    },
  });
}
