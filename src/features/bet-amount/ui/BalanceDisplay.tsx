import Image from 'next/image';
import { GAME_POINT_ICON } from '@/shared/config';
import { AnimatedNumber } from '@/shared/ui/AnimatedNumber';

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
      <AnimatedNumber value={balance} className="font-outfit text-base text-brand-text-white" />
    </div>
  );
}
