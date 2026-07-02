import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { QUERY_KEYS } from '@/shared/api/query-keys';
import { exchangeWatchToGame } from '../api/exchangeApi';
import { EXCHANGE_MESSAGES } from './constants';
import { getPointsExchangeSchema, type PointsExchangeFormValues } from './schema';

interface UsePointsExchangeProps {
  watchPointsBalance: string;
  onSuccessCallback?: () => void;
}

export function usePointsExchange({
  watchPointsBalance,
  onSuccessCallback,
}: UsePointsExchangeProps) {
  const queryClient = useQueryClient();
  const maxBalance = Number(watchPointsBalance);

  const form = useForm<PointsExchangeFormValues>({
    resolver: zodResolver(getPointsExchangeSchema(maxBalance)),
    defaultValues: { amount: '' },
    mode: 'onSubmit',
  });

  const { mutate: exchange, isPending } = useMutation({
    mutationFn: (exchangeAmount: string) => exchangeWatchToGame({ amount: exchangeAmount }),
    onSuccess: () => {
      toast.success(EXCHANGE_MESSAGES.SUCCESS);
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.currentUser });
      form.reset();
      onSuccessCallback?.();
    },
    onError: (error: unknown) => {
      const err = error as { response?: { data?: { message?: string | string[] } } };
      const msg = err?.response?.data?.message;
      const errorMsg = Array.isArray(msg) ? msg.join(', ') : msg || EXCHANGE_MESSAGES.ERROR_GENERIC;
      toast.error(errorMsg);
    },
  });

  const onSubmit = (data: PointsExchangeFormValues) => {
    exchange(data.amount);
  };

  return {
    form,
    onSubmit,
    isPending,
  };
}
