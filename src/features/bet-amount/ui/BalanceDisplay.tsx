import Image from 'next/image';
import { formatAmount } from '@/shared/lib/formatAmount';
import { GAME_POINT_ICON } from '@/shared/config';

interface Props {
  balance: number;
}

export function BalanceDisplay({ balance }: Props) {
  return (
    <div className="flex items-center gap-2">
      <Image
        src={GAME_POINT_ICON.SRC}
        alt={GAME_POINT_ICON.ALT}
        width={GAME_POINT_ICON.SIZE_BALANCE}
        height={GAME_POINT_ICON.SIZE_BALANCE}
      />
      <span className="font-outfit text-base text-brand-text-white">{formatAmount(balance)}</span>
    </div>
  );
}
