'use client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import { toast } from 'sonner';
import { QUERY_KEYS, DAILY_CLAIM_QUERY_KEYS } from '@/shared/api/query-keys';
import { useUserQuery } from '@/entities/user';
import { useAuthStore } from '@/features/auth';
import { useClaimStatus } from './useClaimStatus';
import { useCountdown } from './useCountdown';
import { claimDaily } from '../api/claimDaily';
import { DAILY_CLAIM_HTTP_STATUS, DAILY_CLAIM_ERROR_MESSAGE } from './constants';
import type { ClaimStatus, DailyClaimUiState } from './types';

const DEFAULT_POINTS_AMOUNT = 0;

interface UseDailyClaimResult {
  uiState: DailyClaimUiState;
  pointsAmount: number;
  countdownLabel: string;
  isClaiming: boolean;
  onAction: () => void;
}

function resolveErrorMessage(error: unknown): string {
  if (!isAxiosError(error)) return DAILY_CLAIM_ERROR_MESSAGE.UNAVAILABLE;

  const status = error.response?.status;
  if (status === DAILY_CLAIM_HTTP_STATUS.ALREADY_CLAIMED)
    return DAILY_CLAIM_ERROR_MESSAGE.ALREADY_CLAIMED;
  if (status === DAILY_CLAIM_HTTP_STATUS.THROTTLED) return DAILY_CLAIM_ERROR_MESSAGE.THROTTLED;

  return DAILY_CLAIM_ERROR_MESSAGE.UNAVAILABLE;
}

function resolveUiState(
  isAuthenticated: boolean,
  status: ClaimStatus | undefined
): DailyClaimUiState {
  if (!isAuthenticated) return 'login';
  if (!status) return 'hidden';
  if (!status.enabled || status.invalidConfig) return 'hidden';
  if (status.available) return 'claim';

  return 'countdown';
}

export function useDailyClaim(): UseDailyClaimResult {
  const queryClient = useQueryClient();
  const openAuthForm = useAuthStore((state) => state.openAuthForm);
  const { data: user } = useUserQuery();
  const isAuthenticated = user !== undefined;
  const { data: status } = useClaimStatus(isAuthenticated);
  const { label: countdownLabel } = useCountdown(status?.nextClaimAt);

  const { mutate, isPending } = useMutation({
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

  const uiState = resolveUiState(isAuthenticated, status);

  function onAction(): void {
    if (uiState === 'login') {
      openAuthForm();
      return;
    }
    if (uiState === 'claim') {
      mutate();
    }
  }

  return {
    uiState,
    pointsAmount: status?.pointsAmount ?? DEFAULT_POINTS_AMOUNT,
    countdownLabel,
    isClaiming: isPending,
    onAction,
  };
}
