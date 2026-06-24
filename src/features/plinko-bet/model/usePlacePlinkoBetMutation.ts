import { useMutation, useQueryClient } from '@tanstack/react-query';
import { QUERY_KEYS } from '@/shared/api/query-keys';
import {
  getBucketIndex,
  getMultiplierColorTier,
  PLINKO_MULTIPLIERS,
  type Risk,
} from '@/entities/game';
import { placePlinkoBet } from '../api/placePlinkoBet';
import { assertMultiplierMatch } from './assertMultiplierMatch';
import type { PlacePlinkoBetArgs, PlinkoBetResult, PlinkoDrop } from './types';

interface UsePlacePlinkoBetMutationArgs {
  rows: number;
  risk: Risk;
  onBetSuccess: (drop: PlinkoDrop) => void;
  onBetError: () => void;
}

interface UsePlacePlinkoBetMutationReturn {
  placeBet: (args: PlacePlinkoBetArgs) => void;
  isPending: boolean;
}

export function usePlacePlinkoBetMutation({
  rows,
  risk,
  onBetSuccess,
  onBetError,
}: UsePlacePlinkoBetMutationArgs): UsePlacePlinkoBetMutationReturn {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: placePlinkoBet,
    onSuccess: (data: PlinkoBetResult) => {
      assertMultiplierMatch(data, rows, risk);
      const bucket = getBucketIndex(data.results);
      const bucketCount = PLINKO_MULTIPLIERS[risk][rows].length;
      onBetSuccess({
        id: data.betId,
        results: data.results,
        multiplier: data.multiplier,
        payout: Number.parseFloat(data.payout) || 0,
        tier: getMultiplierColorTier(bucket, bucketCount),
      });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.currentUser });
    },
    onError: () => {
      onBetError();
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.currentUser });
    },
  });

  return { placeBet: mutation.mutate, isPending: mutation.isPending };
}
