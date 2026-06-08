import Image from 'next/image';

import { formatAmount } from '@/shared/lib/format-amount';
import { COIN_ICON } from '../config/constants';

interface Props {
  balance: number;
}

export function BalanceDisplay({ balance }: Props) {
  return (
    <div className="flex items-center gap-2">
      <Image
        src={COIN_ICON.SRC}
        alt={COIN_ICON.ALT}
        width={COIN_ICON.SIZE_BALANCE}
        height={COIN_ICON.SIZE_BALANCE}
      />
      <span className="font-outfit text-base text-brand-text-white">{formatAmount(balance)}</span>
    </div>
  );
}
