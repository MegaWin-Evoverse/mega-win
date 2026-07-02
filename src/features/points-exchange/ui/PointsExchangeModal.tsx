'use client';

import Image from 'next/image';
import { X } from 'lucide-react';
import { Controller } from 'react-hook-form';

import { Dialog, DialogContent, DialogTitle, DialogDescription } from '@/shared/ui/dialog';
import { Button } from '@/shared/ui/button';
import { AmountInput } from '@/shared/ui/amount-input';
import { FieldError } from '@/shared/ui/field-error';
import { COIN_ICON, GAME_POINT_ICON } from '@/shared/config';
import { usePointsExchange } from '../model/usePointsExchange';

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
  const { form, onSubmit, isPending } = usePointsExchange({
    watchPointsBalance,
    onSuccessCallback: () => onOpenChange(false),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = form;

  const amount = watch('amount');

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

          <div className="flex items-center justify-between gap-2 sm:gap-4 w-full mb-5">
            <div className="flex flex-1 items-center justify-center gap-1.5 sm:gap-2 h-11 rounded-lg border border-border-default bg-border-default/25 px-2 sm:px-4">
              <Image
                src={COIN_ICON.SRC}
                alt="Watch Point"
                width={20}
                height={20}
                className="w-4 h-4 sm:w-5 sm:h-5 shrink-0"
              />
              <span className="text-xs sm:text-sm font-semibold whitespace-nowrap">
                1 <span className="text-auth-text-secondary font-normal">Watch point</span>
              </span>
            </div>
            <span className="font-bold text-base sm:text-lg text-auth-text-secondary shrink-0">
              =
            </span>
            <div className="flex flex-1 items-center justify-center gap-1.5 sm:gap-2 h-11 rounded-lg border border-border-default bg-border-default/25 px-2 sm:px-4">
              <Image
                src={GAME_POINT_ICON.SRC}
                alt="Game Point"
                width={20}
                height={20}
                className="w-4 h-4 sm:w-5 sm:h-5 shrink-0"
              />
              <span className="text-xs sm:text-sm font-semibold whitespace-nowrap">
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
