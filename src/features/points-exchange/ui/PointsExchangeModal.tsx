'use client';

import Image from 'next/image';
import { X } from 'lucide-react';

import { Dialog, DialogContent, DialogTitle, DialogDescription } from '@/shared/ui/dialog';
import { Button } from '@/shared/ui/button';

import { usePointsExchange } from '../model/usePointsExchange';
import { EXCHANGE_UI_TEXT, EXCHANGE_FORM_FIELDS } from '../model/constants';
import { ExchangeRateDisplay } from './components/ExchangeRateDisplay';
import { ExchangeFormFields } from './components/ExchangeFormFields';

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

  const amount = watch(EXCHANGE_FORM_FIELDS.AMOUNT);

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
            alt={EXCHANGE_UI_TEXT.IMAGE_ALT}
            width={120}
            height={120}
            className="mb-2"
          />

          <DialogTitle className="text-xl font-bold mb-2">{EXCHANGE_UI_TEXT.TITLE}</DialogTitle>
          <DialogDescription className="text-center text-auth-text-secondary text-sm mb-5 max-w-[340px]">
            {EXCHANGE_UI_TEXT.DESCRIPTION}
          </DialogDescription>

          <ExchangeRateDisplay />

          <ExchangeFormFields
            control={control}
            errors={errors}
            amount={amount}
            watchPointsBalance={watchPointsBalance}
            gamePointsBalance={gamePointsBalance}
          />

          <Button
            type="submit"
            variant="main"
            size="play"
            className="w-full"
            disabled={isPending || !amount || Number(amount) <= 0}
          >
            {isPending ? EXCHANGE_UI_TEXT.BUTTON_CONFIRMING : EXCHANGE_UI_TEXT.BUTTON_CONFIRM}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
