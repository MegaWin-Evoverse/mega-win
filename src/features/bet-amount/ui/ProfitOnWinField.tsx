'use client';
import { CollapsibleSection } from '@/shared/ui/collapsible-section';
import { AmountInput } from '@/shared/ui/amount-input';
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
      <div className="flex w-full flex-col gap-2">
        <span className="font-outfit text-base font-medium text-brand-text-white">
          {PROFIT_ON_WIN_LABEL}
        </span>
        <AmountInput
          value={profitOnWin}
          readOnly
          iconSrc={COIN_ICON.SRC}
          iconAlt={COIN_ICON.ALT}
          iconSize={COIN_ICON.SIZE_INPUT}
        />
      </div>
    </CollapsibleSection>
  );
}
