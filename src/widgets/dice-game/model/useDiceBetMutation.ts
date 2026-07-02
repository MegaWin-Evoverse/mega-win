'use client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { QUERY_KEYS } from '@/shared/api/query-keys';
import { LABELS } from './constants';
import type { DiceBetPayload, DiceBetResponse } from './types';
import { diceBet } from '../api/diceBet';

interface UseDiceBetMutationConfig {
  onSuccess: (response: DiceBetResponse) => void;
  onError: () => void;
}

interface UseDiceBetMutationResult {
  mutate: (payload: DiceBetPayload) => void;
  isPending: boolean;
}

export function useDiceBetMutation({
  onSuccess,
  onError,
}: UseDiceBetMutationConfig): UseDiceBetMutationResult {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: diceBet,
    onSuccess: (response) => {
      onSuccess(response);
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.currentUser });
    },
    onError: () => {
      toast.error(LABELS.BET_ERROR);
      onError();
    },
  });

  return { mutate, isPending };
}
