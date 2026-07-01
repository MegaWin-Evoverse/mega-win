'use client';
import { cn } from '@/shared/lib/cn';
import { AmountInput } from '@/shared/ui/amount-input';
import { GAME_PANEL_LABELS, GAME_POINT_ICON } from '@/shared/config';
import type { SoundName } from '@/shared/lib/playSound';
import { useBetAmount } from '../model/useBetAmount';
import { BalanceDisplay } from './BalanceDisplay';
import { QuickBetButtons } from './QuickBetButtons';

interface Props {
  className?: string;
  quickBetSound?: SoundName;
}

export function BetAmountField({ className, quickBetSound }: Props) {
  const {
    betAmount,
    balance,
    setBetAmount,
    onBetBlur,
    betHalf,
    betDouble,
    betMax,
    isInputDisabled,
  } = useBetAmount(quickBetSound);

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
