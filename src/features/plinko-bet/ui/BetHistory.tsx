import { MULTIPLIER_TIER, type MultiplierTier } from '@/entities/game';
import { cn } from '@/shared/lib/cn';
import type { PlinkoHistoryEntry } from '../model/types';

interface Props {
  history: PlinkoHistoryEntry[];
}

const TIER_CLASS: Record<MultiplierTier, string> = {
  [MULTIPLIER_TIER.GREEN]: 'bg-plinko-green',
  [MULTIPLIER_TIER.YELLOW]: 'bg-plinko-yellow',
  [MULTIPLIER_TIER.ORANGE_LIGHT]: 'bg-plinko-orange-light',
  [MULTIPLIER_TIER.ORANGE]: 'bg-plinko-orange',
  [MULTIPLIER_TIER.RED]: 'bg-plinko-red',
};

export function BetHistory({ history }: Props) {
  if (history.length === 0) return null;
  return (
    <div className="absolute top-0 right-0 z-10 flex flex-col gap-2">
      {history.map((entry) => (
        <span
          key={entry.id}
          className={cn(
            'flex h-[30px] w-[51.4px] shrink-0 items-center justify-center rounded-lg p-2.5 text-xs font-semibold uppercase text-plinko-multiplier-text animate-plinko-history-enter',
            TIER_CLASS[entry.tier]
          )}
        >
          {entry.multiplier}x
        </span>
      ))}
    </div>
  );
}
