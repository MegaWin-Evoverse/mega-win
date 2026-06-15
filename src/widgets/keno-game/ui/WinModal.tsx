import Image from 'next/image';
import { Trophy } from 'lucide-react';
import { Button } from '@/shared/ui/button';
import { KENO_LABELS, KENO_MULTIPLIER_DECIMALS, KENO_BET_DECIMALS } from '../model/constants';

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
          <Trophy className="size-5" aria-label={KENO_LABELS.WIN_TROPHY_ARIA} />
          <span className="text-xl font-bold font-heading">
            {multiplier.toFixed(KENO_MULTIPLIER_DECIMALS)}x
          </span>
        </div>

        <div className="flex items-center justify-center gap-8 border-t border-border bg-secondary/50 px-6 py-4">
          <div className="flex items-center gap-1.5">
            <Image src="/icons/coin.svg" alt={KENO_LABELS.WIN_COIN_ALT} width={20} height={20} />
            <span className="font-medium text-foreground">
              {betAmount.toFixed(KENO_BET_DECIMALS)}
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <Image
              src="/icons/green-coin.svg"
              alt={KENO_LABELS.WIN_MATCHES_ALT}
              width={20}
              height={20}
            />
            <span className="font-medium text-foreground">{matchCount}x</span>
          </div>
        </div>

        <div className="px-4 pb-4 pt-3">
          <Button variant="main" className="w-full" onClick={onPlayAgain}>
            {KENO_LABELS.PLAY_AGAIN}
          </Button>
        </div>
      </div>
    </div>
  );
}
