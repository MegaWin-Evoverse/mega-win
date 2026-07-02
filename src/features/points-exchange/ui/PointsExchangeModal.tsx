'use client';

import Image from 'next/image';
import { X } from 'lucide-react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { Dialog, DialogContent, DialogTitle, DialogDescription } from '@/shared/ui/dialog';
import { Button } from '@/shared/ui/button';
import { AmountInput } from '@/shared/ui/amount-input';
import { FieldError } from '@/shared/ui/field-error';
import { COIN_ICON, GAME_POINT_ICON } from '@/shared/config';
import { QUERY_KEYS } from '@/shared/api/query-keys';

import { exchangeWatchToGame } from '../api/exchangeApi';

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  watchPointsBalance: string;
  gamePointsBalance: string;
}

export function PointsExchangeModal({
  open,
  onOpenChange,
  watchPointsBalance,
  gamePointsBalance,
}: Props) {
  const schema = z.object({
    amount: z
      .string()
      .refine((val) => {
        const num = Number(val);
        return !isNaN(num) && num > 0;
      }, 'Please enter a valid amount')
      .refine((val) => {
        const num = Number(val);
        return num <= Number(watchPointsBalance);
      }, 'Insufficient Watch Points'),
  });

  type FormValues = z.infer<typeof schema>;

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { amount: '' },
    mode: 'onSubmit',
  });

  const amount = watch('amount');
  const queryClient = useQueryClient();

  const { mutate: exchange, isPending } = useMutation({
    mutationFn: (exchangeAmount: string) => exchangeWatchToGame({ amount: exchangeAmount }),
    onSuccess: () => {
      toast.success('Points exchanged successfully');
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.currentUser });
      onOpenChange(false);
      reset();
    },
    onError: (error: unknown) => {
      const err = error as { response?: { data?: { message?: string | string[] } } };
      const msg = err?.response?.data?.message;
      const errorMsg = Array.isArray(msg) ? msg.join(', ') : msg || 'Failed to exchange points';
      toast.error(errorMsg);
    },
  });

  const onSubmit = (data: FormValues) => {
    exchange(data.amount);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={false}
        className="w-[calc(100%-32px)] sm:w-[540px] md:w-[640px] lg:w-[720px] max-w-none bg-bg-primary border-auth-surface p-6 sm:p-8"
      >
        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={() => onOpenChange(false)}
          className="absolute right-[20px] top-[20px] size-[20px] text-auth-text-secondary hover:bg-transparent hover:text-auth-text z-20"
          aria-label="Close form"
        >
          <X className="size-[20px]" />
        </Button>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-center">
          <Image
            src="/two-coins.webp"
            alt="Points Exchange"
            width={120}
            height={120}
            className="mb-2"
          />

          <DialogTitle className="text-xl font-bold mb-2">Points exchange</DialogTitle>
          <DialogDescription className="text-center text-auth-text-secondary text-sm mb-5 max-w-[340px]">
            Convert your Watch Points into Game Points to earn rewards and enhance your gameplay.
          </DialogDescription>

          <div className="flex items-center justify-center gap-4 bg-auth-surface rounded-xl py-3 px-4 w-full mb-5">
            <div className="flex items-center gap-2">
              <Image src={COIN_ICON.SRC} alt="Watch Point" width={20} height={20} />
              <span className="text-sm font-semibold">
                1 <span className="text-auth-text-secondary font-normal">Watch point</span>
              </span>
            </div>
            <span className="font-bold text-lg">=</span>
            <div className="flex items-center gap-2">
              <Image src={GAME_POINT_ICON.SRC} alt="Game Point" width={20} height={20} />
              <span className="text-sm font-semibold">
                1 <span className="text-auth-text-secondary font-normal">Game point</span>
              </span>
            </div>
          </div>

          <div className="w-full flex flex-col gap-4 mb-6">
            <div className="flex flex-col gap-2">
              <span className="text-sm font-medium text-auth-text-secondary">You give</span>
              <Controller
                name="amount"
                control={control}
                render={({ field }) => (
                  <AmountInput
                    value={field.value}
                    onValueChange={field.onChange}
                    onBlur={field.onBlur}
                    iconSrc={COIN_ICON.SRC}
                    inputMode="numeric"
                    trailing={
                      <div className="flex items-center gap-1.5 px-2 py-1 bg-border-default/25 rounded-md text-xs text-auth-text-secondary">
                        Balance <Image src={COIN_ICON.SRC} alt="" width={12} height={12} />{' '}
                        <span className="text-white font-medium">
                          {Number(watchPointsBalance).toLocaleString()}
                        </span>
                      </div>
                    }
                  />
                )}
              />
              {errors.amount && <FieldError message={errors.amount.message} />}
            </div>

            <div className="flex flex-col gap-2">
              <span className="text-sm font-medium text-auth-text-secondary">You will receive</span>
              <AmountInput
                value={amount || '0'}
                readOnly
                iconSrc={GAME_POINT_ICON.SRC}
                trailing={
                  <div className="flex items-center gap-1.5 px-2 py-1 bg-border-default/25 rounded-md text-xs text-auth-text-secondary">
                    Balance <Image src={GAME_POINT_ICON.SRC} alt="" width={12} height={12} />{' '}
                    <span className="text-white font-medium">
                      {Number(gamePointsBalance).toLocaleString()}
                    </span>
                  </div>
                }
              />
            </div>
          </div>

          <Button
            type="submit"
            variant="main"
            size="play"
            className="w-full"
            disabled={isPending || !amount || Number(amount) <= 0}
          >
            {isPending ? 'Confirming...' : 'Confirm'}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
