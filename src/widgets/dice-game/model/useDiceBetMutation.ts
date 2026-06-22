'use client';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { LABELS } from './constants';
import type { RollEntry, DiceBetPayload } from './types';
import { diceBet } from '../api/diceBet';

interface UseDiceBetMutationResult {
  mutate: (payload: DiceBetPayload) => void;
  isPending: boolean;
}

export function useDiceBetMutation(onEntry: (entry: RollEntry) => void): UseDiceBetMutationResult {
  const { mutate, isPending } = useMutation({
    mutationFn: diceBet,
    onSuccess: (response) => {
      onEntry({ value: response.randomValue, isWin: response.didWin });
    },
    onError: () => {
      toast.error(LABELS.BET_ERROR);
    },
  });

  return { mutate, isPending };
}
