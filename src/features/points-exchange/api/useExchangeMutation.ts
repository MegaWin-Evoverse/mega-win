import { useMutation, useQueryClient } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import { toast } from 'sonner';
import { QUERY_KEYS } from '@/shared/api/query-keys';
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
      const msg = isAxiosError(error) ? error.response?.data?.message : undefined;
      const errorMsg = Array.isArray(msg) ? msg.join(', ') : msg || EXCHANGE_MESSAGES.ERROR_GENERIC;
      toast.error(errorMsg);
    },
  });
}
