'use client';

import { cn } from '@/shared/lib/cn';
import { getNumberColor } from '@/features/roulette-table';
import { useRouletteStore } from '@/features/roulette-controls';

const HISTORY_COLOR_CLASSES = {
  red: 'bg-roulette-red',
  black: 'bg-gradient-to-b from-border-default to-brand-btn-gradient-to',
  green: 'bg-brand-green-to',
} as const;

const MAX_VISIBLE_RESULTS = 5;

export function LastResults() {
  const betHistory = useRouletteStore((state) => state.betHistory);

  if (betHistory.length === 0) return null;

  return (
    <div className="flex flex-col items-start gap-1">
      {betHistory.slice(0, MAX_VISIBLE_RESULTS).map((entry) => (
        <span
          key={entry.id}
          className={cn(
            'flex size-10 shrink-0 items-center justify-center rounded-[4px] text-sm font-semibold text-brand-text-white shadow-sm',
            'duration-300 animate-in fade-in zoom-in-95 slide-in-from-top-1',
            HISTORY_COLOR_CLASSES[getNumberColor(entry.position)]
          )}
        >
          {entry.position}
        </span>
      ))}
    </div>
  );
}
