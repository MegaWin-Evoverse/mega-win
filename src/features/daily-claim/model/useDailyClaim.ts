'use client';
import { useEffect, useRef } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useUserQuery } from '@/entities/user';
import { useAuthStore } from '@/features/auth';
import { DAILY_CLAIM_QUERY_KEYS } from '@/shared/api/query-keys';
import { useClaimStatus } from './useClaimStatus';
import { useCountdown } from './useCountdown';
import { useClaimMutation } from './useClaimMutation';
import { resolveUiState } from './resolveUiState';
import type { DailyClaimUiState } from './types';

const DEFAULT_POINTS_AMOUNT = 0;

interface UseDailyClaimResult {
  uiState: DailyClaimUiState;
  pointsAmount: number;
  countdownLabel: string;
  isClaiming: boolean;
  onAction: () => void;
}

export function useDailyClaim(): UseDailyClaimResult {
  const queryClient = useQueryClient();
  const openAuthForm = useAuthStore((state) => state.openAuthForm);
  const { data: user } = useUserQuery();
  const isAuthenticated = user !== undefined;
  const { data: status } = useClaimStatus(isAuthenticated);
  const { label: countdownLabel, isComplete } = useCountdown(status?.nextClaimAt);
  const wasCompleteRef = useRef(false);

  useEffect(() => {
    if (isComplete && !wasCompleteRef.current) {
      queryClient.invalidateQueries({ queryKey: DAILY_CLAIM_QUERY_KEYS.status });
    }
    wasCompleteRef.current = isComplete;
  }, [isComplete, queryClient]);

  const { mutate, isPending } = useClaimMutation();

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
