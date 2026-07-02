import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { useExchangeMutation } from '../api/useExchangeMutation';
import { getPointsExchangeSchema, type PointsExchangeFormValues } from './schema';

interface UsePointsExchangeProps {
  watchPointsBalance: string;
  onSuccessCallback?: () => void;
}

export function usePointsExchange({
  watchPointsBalance,
  onSuccessCallback,
}: UsePointsExchangeProps) {
  const maxBalance = Number(watchPointsBalance);

  const form = useForm<PointsExchangeFormValues>({
    resolver: zodResolver(getPointsExchangeSchema(maxBalance)),
    defaultValues: { amount: '' },
    mode: 'onSubmit',
  });

  const { mutate: exchange, isPending } = useExchangeMutation({
    onSuccessCallback: () => {
      form.reset();
      onSuccessCallback?.();
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
