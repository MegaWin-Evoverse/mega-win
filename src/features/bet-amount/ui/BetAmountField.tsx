'use client';
import { cn } from '@/shared/lib/cn';
import { AmountInput } from '@/shared/ui/amount-input';
import { GAME_PANEL_LABELS, GAME_POINT_ICON } from '@/shared/config';
import { useBetAmount } from '../model/useBetAmount';
import { QuickBetButtons } from './QuickBetButtons';

interface Props {
  className?: string;
}

export function BetAmountField({ className }: Props) {
  const { betAmount, isInputDisabled, setBetAmount, onBetBlur, betHalf, betDouble, betMax } =
    useBetAmount();

  return (
    <div className={cn('flex w-full flex-col gap-2', className)}>
      <span className="font-outfit text-base font-medium text-brand-text-white">
        {GAME_PANEL_LABELS.BET_AMOUNT}
      </span>
      <AmountInput
        value={betAmount}
        onValueChange={setBetAmount}
        onBlur={onBetBlur}
        disabled={isInputDisabled}
        iconSrc={GAME_POINT_ICON.SRC}
        iconAlt={GAME_POINT_ICON.ALT}
        iconSize={GAME_POINT_ICON.SIZE_INPUT}
        trailing={
          <QuickBetButtons
            onBetHalf={betHalf}
            onBetDouble={betDouble}
            onBetMax={betMax}
            disabled={isInputDisabled}
          />
        }
      />
    </div>
  );
}
