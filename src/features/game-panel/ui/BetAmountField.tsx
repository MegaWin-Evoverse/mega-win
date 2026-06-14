'use client';
import type { ChangeEvent } from 'react';
import Image from 'next/image';
import { cn } from '@/shared/lib/cn';
import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';
import { COIN_ICON, GAME_PANEL_LABELS } from '@/shared/config';
import { BalanceDisplay } from './BalanceDisplay';

interface Props {
  betAmount: string;
  balance: number;
  onBetAmountChange: (value: string) => void;
  onBetBlur?: () => void;
  onBetHalf: () => void;
  onBetDouble: () => void;
  onBetMax: () => void;
  className?: string;
}

export function BetAmountField({
  betAmount,
  balance,
  onBetAmountChange,
  onBetBlur,
  onBetHalf,
  onBetDouble,
  onBetMax,
  className,
}: Props) {
  function handleBetAmountInput(event: ChangeEvent<HTMLInputElement>) {
    onBetAmountChange(event.target.value);
  }

  function handleBlur() {
    onBetBlur?.();
  }

  return (
    <div className={cn('flex w-full flex-col gap-2', className)}>
      <div className="flex items-center justify-between gap-2">
        <span className="font-outfit text-base font-medium text-brand-text-white">
          {GAME_PANEL_LABELS.BET_AMOUNT}
        </span>
        <BalanceDisplay balance={balance} />
      </div>

      <div className="flex h-11 items-center justify-between gap-2 rounded-lg border border-border-default bg-border-default/25 px-3 focus-within:border-button-brand-bg-dark transition-colors duration-200">
        <div className="flex flex-1 items-center gap-2">
          <Image
            src={COIN_ICON.SRC}
            alt={COIN_ICON.ALT}
            width={COIN_ICON.SIZE_INPUT}
            height={COIN_ICON.SIZE_INPUT}
          />
          <Input
            inputMode="decimal"
            value={betAmount}
            onChange={handleBetAmountInput}
            onBlur={handleBlur}
            className="h-auto border-0 bg-transparent p-0 font-outfit text-sm text-brand-text-light shadow-none focus-visible:border-0 focus-visible:ring-0 dark:bg-transparent"
          />
        </div>

        <div className="flex items-center gap-1">
          <Button variant="chip" size="none" onClick={onBetHalf}>
            {GAME_PANEL_LABELS.HALF}
          </Button>
          <Button variant="chip" size="none" onClick={onBetDouble}>
            {GAME_PANEL_LABELS.DOUBLE}
          </Button>
          <Button variant="chip" size="none" onClick={onBetMax} className="px-2">
            {GAME_PANEL_LABELS.MAX}
          </Button>
        </div>
      </div>
    </div>
  );
}
