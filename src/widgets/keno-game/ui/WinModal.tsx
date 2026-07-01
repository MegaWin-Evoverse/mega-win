import Image from 'next/image';
import { Trophy } from 'lucide-react';
import coinIcon from '@/shared/assets/icons/coin.svg';
import coin1Icon from '@/shared/assets/icons/coin-1.svg';
import { AnimatedNumber } from '@/shared/ui/AnimatedNumber';
import { LABELS, MULTIPLIER_DECIMALS } from '../model/constants';

interface Props {
  multiplier: number;
  betAmount: number;
  matchCount: number;
}

export function WinModal({ multiplier, betAmount, matchCount }: Props) {
  return (
    <div className="pointer-events-none absolute inset-0 flex items-center justify-center rounded-2xl backdrop-blur-sm bg-background/60 z-10">
      <div className="overflow-hidden rounded-xl bg-card shadow-2xl min-w-56">
        <div className="flex items-center justify-center gap-2 px-4 py-3 h-[52px] self-stretch result-header-win border border-keno-cell-border rounded-t-xl">
          <div className="flex items-center gap-1.5 px-4 py-1 w-24 h-7 rounded-2xl">
            <Trophy className="size-5 text-white" aria-label={LABELS.WIN_TROPHY_ARIA} />
            <span className="text-base font-semibold font-heading text-white">
              {multiplier.toFixed(MULTIPLIER_DECIMALS)}x
            </span>
          </div>
        </div>
        <div className="flex items-center justify-center gap-8 border-t border-border bg-secondary/50 px-6 py-4">
          <div className="flex items-center gap-1.5">
            <Image src={coinIcon} alt={LABELS.WIN_COIN_ALT} width={20} height={20} />
            <AnimatedNumber value={betAmount} className="font-medium text-foreground" />
          </div>
          <div className="flex items-center gap-1.5">
            <Image src={coin1Icon} alt={LABELS.WIN_MATCHES_ALT} width={20} height={20} />
            <span className="font-medium text-foreground">{matchCount}x</span>
          </div>
        </div>
      </div>
    </div>
  );
}
