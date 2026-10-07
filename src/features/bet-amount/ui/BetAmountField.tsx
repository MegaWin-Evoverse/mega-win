'use client';
import { AmountInput } from '@/shared/ui/amount-input';
import { LabeledField } from '@/shared/ui/labeled-field';
import { GAME_PANEL_LABELS, GAME_POINT_ICON } from '@/shared/config';
import type { SoundName } from '@/shared/lib/playSound';
import { useBetAmount } from '../model/useBetAmount';
import { QuickBetButtons } from './QuickBetButtons';

interface Props {
  className?: string;
  quickBetSound?: SoundName;
}

export function BetAmountField({ className, quickBetSound }: Props) {
  const { betAmount, setBetAmount, onBetBlur, betHalf, betDouble, betMax, isInputDisabled } =
    useBetAmount(quickBetSound);

  return (
    <LabeledField
      label={GAME_PANEL_LABELS.BET_AMOUNT}
      labelClassName="text-base font-medium text-brand-text-white"
      className={className}
    >
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
    </LabeledField>
  );
}
