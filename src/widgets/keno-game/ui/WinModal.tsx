import Image from 'next/image';
import { Trophy } from 'lucide-react';
import { Button } from '@/shared/ui/button';
import coinIcon from '@/shared/assets/icons/coin.svg';
import coin1Icon from '@/shared/assets/icons/coin-1.svg';
import { LABELS, MULTIPLIER_DECIMALS, BET_DECIMALS } from '../model/constants';

interface Props {
  multiplier: number;
  betAmount: number;
  matchCount: number;
  onPlayAgain: () => void;
}

export function WinModal({ multiplier, betAmount, matchCount, onPlayAgain }: Props) {
  return (
    <div className="absolute inset-0 flex items-center justify-center rounded-2xl backdrop-blur-sm bg-background/60 z-10">
      <div className="overflow-hidden rounded-xl bg-card shadow-2xl min-w-56">
        <div className="flex items-center justify-center gap-2 px-6 py-4 text-foreground">
          <Trophy className="size-5" aria-label={LABELS.WIN_TROPHY_ARIA} />
          <span className="text-xl font-bold font-heading">
            {multiplier.toFixed(MULTIPLIER_DECIMALS)}x
          </span>
        </div>

        <div className="flex items-center justify-center gap-8 border-t border-border bg-secondary/50 px-6 py-4">
          <div className="flex items-center gap-1.5">
            <Image src={coinIcon} alt={LABELS.WIN_COIN_ALT} width={20} height={20} />
            <span className="font-medium text-foreground">{betAmount.toFixed(BET_DECIMALS)}</span>
          </div>

          <div className="flex items-center gap-1.5">
            <Image src={coin1Icon} alt={LABELS.WIN_MATCHES_ALT} width={20} height={20} />
            <span className="font-medium text-foreground">{matchCount}x</span>
          </div>
        </div>

        <div className="px-4 pb-4 pt-3">
          <Button variant="main" className="w-full" onClick={onPlayAgain}>
            {LABELS.PLAY_AGAIN}
          </Button>
        </div>
      </div>
    </div>
  );
}
