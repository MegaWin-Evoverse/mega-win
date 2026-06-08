'use client';

import { type ChangeEvent } from 'react';
import Image from 'next/image';

import { Input } from '@/shared/ui/input';
import { BalanceDisplay } from './BalanceDisplay';
import { BetChipButton } from './BetChipButton';
import { COIN_ICON, GAME_PANEL_LABELS } from '../config/constants';

interface Props {
  betAmount: string;
  balance: number;
  onBetAmountChange: (value: string) => void;
  onBetHalf: () => void;
  onBetDouble: () => void;
  onBetMax: () => void;
}

export function BetAmountField({
  betAmount,
  balance,
  onBetAmountChange,
  onBetHalf,
  onBetDouble,
  onBetMax,
}: Props) {
  function handleBetAmountInput(event: ChangeEvent<HTMLInputElement>) {
    onBetAmountChange(event.target.value);
  }

  return (
    <div className="flex w-full flex-col gap-2">
      <div className="flex items-center justify-between gap-2">
        <span className="font-outfit text-base font-medium text-brand-text-white">
          {GAME_PANEL_LABELS.BET_AMOUNT}
        </span>
        <BalanceDisplay balance={balance} />
      </div>

      <div className="flex h-11 items-center justify-between gap-2 rounded-lg border border-border-default bg-border-default/25 px-3">
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
            className="h-auto border-0 bg-transparent p-0 font-outfit text-sm text-brand-text-light shadow-none focus-visible:border-0 focus-visible:ring-0"
          />
        </div>

        <div className="flex items-center gap-1">
          <BetChipButton onClick={onBetHalf}>{GAME_PANEL_LABELS.HALF}</BetChipButton>
          <BetChipButton onClick={onBetDouble}>{GAME_PANEL_LABELS.DOUBLE}</BetChipButton>
          <BetChipButton onClick={onBetMax} className="px-2">
            {GAME_PANEL_LABELS.MAX}
          </BetChipButton>
        </div>
      </div>
    </div>
  );
}
