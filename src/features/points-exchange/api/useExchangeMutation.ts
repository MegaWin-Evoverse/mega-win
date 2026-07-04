import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { QUERY_KEYS } from '@/shared/api/query-keys';
import { getApiErrorMessage } from '@/shared/lib/getApiErrorMessage';
import { exchangeWatchToGame } from './exchangeApi';
import { EXCHANGE_MESSAGES } from '../model/constants';

interface UseExchangeMutationOptions {
  onSuccessCallback?: () => void;
}

export function useExchangeMutation({ onSuccessCallback }: UseExchangeMutationOptions = {}) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (exchangeAmount: string) => exchangeWatchToGame({ amount: exchangeAmount }),
    onSuccess: () => {
      toast.success(EXCHANGE_MESSAGES.SUCCESS);
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.currentUser });
      onSuccessCallback?.();
    },
    onError: (error) => {
      toast.error(getApiErrorMessage(error, EXCHANGE_MESSAGES.ERROR_GENERIC));
    },
  });
}
