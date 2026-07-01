'use client';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
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
  const { mutate, isPending } = useMutation({
    mutationFn: diceBet,
    onSuccess,
    onError: () => {
      toast.error(LABELS.BET_ERROR);
      onError();
    },
  });

  return { mutate, isPending };
}
