import { TIER_BG_CLASS } from '@/entities/game';
import { cn } from '@/shared/lib/cn';
import type { PlinkoHistoryEntry } from '../model/types';

interface Props {
  history: PlinkoHistoryEntry[];
}

export function BetHistory({ history }: Props) {
  if (history.length === 0) return null;
  return (
    <div className="absolute top-0 right-0 z-10 flex flex-col gap-2">
      {history.map((entry) => (
        <span
          key={entry.id}
          className={cn(
            'flex h-[30px] w-[51.4px] shrink-0 items-center justify-center rounded-lg p-2.5 text-xs font-semibold uppercase text-plinko-multiplier-text animate-plinko-history-enter',
            TIER_BG_CLASS[entry.tier]
          )}
        >
          {entry.multiplier}x
        </span>
      ))}
    </div>
  );
}
