'use client';
import { CollapsibleSection } from '@/shared/ui/collapsible-section';
import { AmountInput } from '@/shared/ui/amount-input';
import { LabeledField } from '@/shared/ui/labeled-field';
import { COIN_ICON } from '@/shared/config';
import { useProfitOnWin } from '../model/useProfitOnWin';
import { PROFIT_ON_WIN_LABEL } from '../model/constants';

interface Props {
  className?: string;
}

export function ProfitOnWinField({ className }: Props) {
  const { profitOnWin, isAutoMode } = useProfitOnWin();

  return (
    <CollapsibleSection isOpen={!isAutoMode} className={className} openClassName="lg:mt-4">
      <LabeledField
        label={PROFIT_ON_WIN_LABEL}
        labelClassName="text-base font-medium text-brand-text-white"
      >
        <AmountInput
          value={profitOnWin}
          readOnly
          iconSrc={COIN_ICON.SRC}
          iconAlt={COIN_ICON.ALT}
          iconSize={COIN_ICON.SIZE_INPUT}
        />
      </LabeledField>
    </CollapsibleSection>
  );
}
