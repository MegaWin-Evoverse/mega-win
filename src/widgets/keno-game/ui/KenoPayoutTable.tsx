'use client';

import { cn } from '@/shared/lib/cn';

interface Props {
  payouts: number[];
  activeMatchCount: number | null;
}

const GEM_SIZES = [
  'size-2',
  'size-[10px]',
  'size-3',
  'size-[14px]',
  'size-4',
  'size-[18px]',
  'size-5',
  'size-[22px]',
  'size-6',
  'size-7',
  'size-8',
] as const;

export function KenoPayoutTable({ payouts, activeMatchCount }: Props) {
  return (
    <div className="flex w-full gap-[6px]">
      {payouts.map((multiplier, matchIndex) => {
        const isActive = activeMatchCount === matchIndex;
        const gemSize = GEM_SIZES[Math.min(matchIndex, GEM_SIZES.length - 1)];

        return (
          <div
            key={matchIndex}
            className={cn(
              'flex min-w-0 flex-1 flex-col overflow-hidden rounded-lg transition-all duration-200',
              isActive && 'ring-1 ring-brand-green-to'
            )}
          >
            <div className="flex items-center justify-center gap-1 border border-keno-cell-border bg-gradient-to-b from-keno-payout-top-from to-keno-payout-top-to px-2 py-1.5">
              <span className={cn('keno-gem shrink-0', gemSize)} />
              <span className="font-outfit text-xs font-semibold text-brand-text-white">
                {matchIndex}x
              </span>
            </div>
            <div className="flex items-center justify-center bg-gradient-to-b from-border-default to-brand-btn-gradient-to px-2 py-2">
              <span
                className={cn(
                  'font-outfit text-xs font-semibold',
                  isActive ? 'text-brand-green-to' : 'text-brand-text-white'
                )}
              >
                {multiplier.toFixed(2)}x
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
