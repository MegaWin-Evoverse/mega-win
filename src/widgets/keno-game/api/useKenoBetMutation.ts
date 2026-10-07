'use client';
import { useMutation } from '@tanstack/react-query';
import type { KenoBetPayload, KenoBetResponse } from '../model/types';
import { kenoBet } from './kenoBet';

interface UseKenoBetMutationParams {
  onSuccess: (response: KenoBetResponse) => void;
  onError: () => void;
}

interface UseKenoBetMutationResult {
  mutate: (payload: KenoBetPayload) => void;
  isPending: boolean;
}

export function useKenoBetMutation({
  onSuccess,
  onError,
}: UseKenoBetMutationParams): UseKenoBetMutationResult {
  const { mutate, isPending } = useMutation({
    mutationFn: kenoBet,
    onSuccess,
    onError,
  });
  return { mutate, isPending };
}
