import Image from 'next/image';
import { Input } from '@/shared/ui/input';
import { DICE_LABELS } from '@/features/dice-controls';
import { COIN_ICON } from '@/shared/config';

interface Props {
  profitOnWin: string;
}

export function ProfitOnWinField({ profitOnWin }: Props) {
  return (
    <div className="flex w-full flex-col gap-2">
      <span className="font-outfit text-base font-medium text-brand-text-white">
        {DICE_LABELS.PROFIT_ON_WIN}
      </span>
      <div className="flex h-11 items-center gap-2 rounded-lg border border-border-default bg-border-default/25 px-3">
        <Image
          src={COIN_ICON.SRC}
          alt={COIN_ICON.ALT}
          width={COIN_ICON.SIZE_INPUT}
          height={COIN_ICON.SIZE_INPUT}
        />
        <Input
          value={profitOnWin}
          readOnly
          className="h-auto border-0 bg-transparent p-0 font-outfit text-sm text-brand-text-light shadow-none focus-visible:border-0 focus-visible:ring-0 dark:bg-transparent pointer-events-none select-none"
        />
      </div>
    </div>
  );
}
