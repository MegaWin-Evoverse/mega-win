import Image from 'next/image';
import { cn } from '@/shared/lib/cn';
import { Tooltip, TooltipTrigger, TooltipContent } from '@/shared/ui/tooltip';
import {
  BET_DECIMALS,
  MULTIPLIER_DECIMALS,
  PAYOUT_COLS,
  PAYOUT_TOOLTIP_LABELS,
} from '../model/constants';
import type { GamePhase } from '../model/types';

interface Props {
  payouts: readonly number[];
  chances: readonly number[];
  matchCount: number;
  phase: GamePhase;
  betAmount: number;
}

export function Payout({ payouts, chances, matchCount, phase, betAmount }: Props) {
  const isResult = phase === 'win' || phase === 'lose';
  const colsClass = PAYOUT_COLS[payouts.length] ?? 'grid-cols-6';

  return (
    <div className={cn('grid w-full gap-[6px]', colsClass)}>
      {payouts.map((multiplier, index) => {
        const isActive = isResult && index === matchCount;
        const displayMultiplier = parseFloat(multiplier.toFixed(MULTIPLIER_DECIMALS));
        const profit = parseFloat(((multiplier - 1) * betAmount).toFixed(BET_DECIMALS));
        const chance = chances[index];

        return (
          <Tooltip key={index}>
            <TooltipTrigger render={<div className="flex flex-col overflow-hidden rounded-lg" />}>
              <div
                className={cn(
                  'flex items-center justify-center gap-0.5 border border-keno-cell-border px-1 py-1.5 lg:gap-1 lg:px-4',
                  isActive
                    ? 'border-brand-green-to/40 bg-gradient-to-b from-brand-green-from to-brand-green-to'
                    : 'bg-gradient-to-b from-keno-payout-from to-keno-payout-to'
                )}
              >
                <Image
                  src="/keno/coin.svg"
                  alt=""
                  width={16}
                  height={16}
                  aria-hidden="true"
                  className="hidden lg:block"
                />
                <span
                  className={cn(
                    'font-outfit text-xs font-semibold leading-4',
                    isActive ? 'text-brand-dark' : 'text-brand-text-white'
                  )}
                >
                  {index}x
                </span>
              </div>
              <div className="flex items-center justify-center bg-gradient-to-b from-brand-border to-brand-btn-gradient-to px-1 py-2 lg:px-4">
                <span className="w-full text-center font-outfit text-xs font-semibold leading-4 text-brand-text-white">
                  {displayMultiplier}x
                </span>
              </div>
            </TooltipTrigger>
            <TooltipContent
              side="top"
              sideOffset={8}
              className="flex flex-col items-start gap-3 rounded-xl border border-keno-cell-border bg-gradient-to-b from-brand-border to-brand-btn-gradient-to p-3 text-brand-text-white max-w-none"
            >
              <div className="flex items-stretch divide-x divide-keno-cell-border">
                <div className="flex flex-col gap-1 pr-4">
                  <span className="font-outfit text-[10px] font-normal leading-3 text-brand-text-muted">
                    {PAYOUT_TOOLTIP_LABELS.MULTIPLIER}
                  </span>
                  <div className="flex items-center gap-1">
                    <Image src="/keno/coin.svg" alt="" width={14} height={14} aria-hidden="true" />
                    <span className="font-outfit text-xs font-semibold leading-4">
                      {displayMultiplier}x
                    </span>
                  </div>
                </div>
                {betAmount > 0 && (
                  <div className="flex flex-col gap-1 px-4">
                    <span className="font-outfit text-[10px] font-normal leading-3 text-brand-text-muted">
                      {PAYOUT_TOOLTIP_LABELS.PROFIT}
                    </span>
                    <div className="flex items-center gap-1">
                      <Image
                        src="/keno/profit.svg"
                        alt=""
                        width={14}
                        height={14}
                        aria-hidden="true"
                      />
                      <span className="font-outfit text-xs font-semibold leading-4">{profit}</span>
                    </div>
                  </div>
                )}
                {chance !== undefined && (
                  <div className="flex flex-col gap-1 pl-4">
                    <span className="font-outfit text-[10px] font-normal leading-3 text-brand-text-muted">
                      {PAYOUT_TOOLTIP_LABELS.CHANCE}
                    </span>
                    <div className="flex items-center gap-1">
                      <span className="font-outfit text-xs font-semibold leading-4">{chance}</span>
                      <span className="font-outfit text-[10px] font-normal leading-3 text-brand-text-muted">
                        {PAYOUT_TOOLTIP_LABELS.CHANCE_UNIT}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </TooltipContent>
          </Tooltip>
        );
      })}
    </div>
  );
}
