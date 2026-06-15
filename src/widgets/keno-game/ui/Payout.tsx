import Image from 'next/image';
import { cn } from '@/shared/lib/cn';
import { KENO_MULTIPLIER_DECIMALS, PAYOUT_COLS } from '../model/constants';
import type { GamePhase } from '../model/types';

interface Props {
  payouts: readonly number[];
  matchCount: number;
  phase: GamePhase;
}

export function Payout({ payouts, matchCount, phase }: Props) {
  const isResult = phase === 'win' || phase === 'lose';
  const colsClass = PAYOUT_COLS[payouts.length] ?? 'grid-cols-6';

  return (
    <div className={cn('grid w-full gap-[6px]', colsClass)}>
      {payouts.map((multiplier, index) => {
        const isActive = isResult && index === matchCount;

        return (
          <div key={index} className="flex flex-col overflow-hidden rounded-lg">
            <div
              className={cn(
                'flex items-center justify-center gap-1 border border-keno-cell-border px-4 py-1.5',
                isActive
                  ? 'border-brand-green-to/40 bg-gradient-to-b from-brand-green-from to-brand-green-to'
                  : 'bg-gradient-to-b from-keno-payout-from to-keno-payout-to'
              )}
            >
              <Image src="/icons/green-coin.svg" alt="" width={16} height={16} aria-hidden="true" />
              <span
                className={cn(
                  'font-outfit text-xs font-semibold leading-4',
                  isActive ? 'text-brand-dark' : 'text-brand-text-white'
                )}
              >
                {index}x
              </span>
            </div>

            <div className="flex items-center justify-center bg-gradient-to-b from-brand-border to-brand-btn-gradient-to px-4 py-2">
              <span className="w-full text-center font-outfit text-xs font-semibold leading-4 text-brand-text-white">
                {multiplier.toFixed(KENO_MULTIPLIER_DECIMALS)}x
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
