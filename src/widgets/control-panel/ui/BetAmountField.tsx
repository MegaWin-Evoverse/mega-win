'use client';
import { cn } from '@/shared/lib/cn';
import { AmountInput } from '@/shared/ui/amount-input';
import { COIN_ICON, GAME_PANEL_LABELS } from '@/shared/config';
import { BalanceDisplay } from './BalanceDisplay';
import { QuickBetButtons } from './QuickBetButtons';

interface Props {
  betAmount: string;
  balance: number;
  onBetAmountChange: (value: string) => void;
  onBetBlur: () => void;
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
  return (
    <div className={cn('flex w-full flex-col gap-2', className)}>
      <div className="flex items-center justify-between gap-2">
        <span className="font-outfit text-base font-medium text-brand-text-white">
          {GAME_PANEL_LABELS.BET_AMOUNT}
        </span>
        <BalanceDisplay balance={balance} />
      </div>
      <AmountInput
        value={betAmount}
        onValueChange={onBetAmountChange}
        onBlur={onBetBlur}
        iconSrc={COIN_ICON.SRC}
        iconAlt={COIN_ICON.ALT}
        iconSize={COIN_ICON.SIZE_INPUT}
        trailing={
          <QuickBetButtons onBetHalf={onBetHalf} onBetDouble={onBetDouble} onBetMax={onBetMax} />
        }
      />
    </div>
  );
}
