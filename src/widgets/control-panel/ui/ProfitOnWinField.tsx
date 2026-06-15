import { cn } from '@/shared/lib/cn';
import { AmountInput } from '@/shared/ui/amount-input';
import { COIN_ICON } from '@/shared/config';
import { CONTROL_PANEL_LABELS } from '../model/constants';

interface Props {
  profitOnWin: string;
  className?: string;
}

export function ProfitOnWinField({ profitOnWin, className }: Props) {
  return (
    <div className={cn('flex w-full flex-col gap-2', className)}>
      <span className="font-outfit text-base font-medium text-brand-text-white">
        {CONTROL_PANEL_LABELS.PROFIT_ON_WIN}
      </span>
      <AmountInput
        value={profitOnWin}
        readOnly
        iconSrc={COIN_ICON.SRC}
        iconAlt={COIN_ICON.ALT}
        iconSize={COIN_ICON.SIZE_INPUT}
      />
    </div>
  );
}
