'use client';
import Image from 'next/image';
import { X } from 'lucide-react';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '@/shared/ui/dialog';
import { Button } from '@/shared/ui/button';
import { usePointsExchange } from '../model/usePointsExchange';
import { EXCHANGE_UI_TEXT, EXCHANGE_IMAGE } from '../model/constants';
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
  const { form, onSubmit, isPending, amount, canSubmit } = usePointsExchange({
    watchPointsBalance,
    onSuccessCallback: () => onOpenChange(false),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = form;

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
          className="absolute right-5 top-5 size-5 text-auth-text-secondary hover:bg-transparent hover:text-auth-text z-20"
          aria-label={EXCHANGE_UI_TEXT.CLOSE_ARIA_LABEL}
        >
          <X className="size-5" />
        </Button>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-center">
          <Image
            src={EXCHANGE_IMAGE.SRC}
            alt={EXCHANGE_IMAGE.ALT}
            width={EXCHANGE_IMAGE.SIZE}
            height={EXCHANGE_IMAGE.SIZE}
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
          <Button type="submit" variant="main" size="play" className="w-full" disabled={!canSubmit}>
            {isPending ? EXCHANGE_UI_TEXT.BUTTON_CONFIRMING : EXCHANGE_UI_TEXT.BUTTON_CONFIRM}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
