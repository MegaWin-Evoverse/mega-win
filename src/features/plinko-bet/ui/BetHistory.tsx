import { TIER_BG_CLASS } from '@/entities/game';
import { cn } from '@/shared/lib/cn';
import type { PlinkoHistoryEntry } from '../model/types';

interface Props {
  history: PlinkoHistoryEntry[];
}

export function BetHistory({ history }: Props) {
  if (history.length === 0) return null;
  return (
    <div className="absolute top-0 right-0 z-10 flex flex-col gap-1 sm:gap-2">
      {history.map((entry) => (
        <span
          key={entry.id}
          className={cn(
            'flex h-[20px] w-[36px] shrink-0 items-center justify-center rounded-md p-1 text-[9px] font-semibold uppercase text-plinko-multiplier-text animate-plinko-history-enter sm:h-[30px] sm:w-[51.4px] sm:rounded-lg sm:p-2.5 sm:text-xs',
            TIER_BG_CLASS[entry.tier]
          )}
        >
          {entry.multiplier}
          <span className="hidden sm:inline">x</span>
        </span>
      ))}
    </div>
  );
}
