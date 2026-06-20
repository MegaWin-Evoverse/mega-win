import Image from 'next/image';
import { Trophy } from 'lucide-react';

import { cn } from '@/shared/lib/cn';

const COIN_ICON_SRC = '/icons/coin.svg';
const COIN_ICON_SIZE = 16;
const RESULT_DECIMAL_PLACES = 2;
const MULTIPLIER_SUFFIX = 'x';

export const RESULT_VARIANT = {
  WIN: 'win',
  PARTIAL: 'partial',
  LOSS: 'loss',
} as const;

export type ResultVariant = (typeof RESULT_VARIANT)[keyof typeof RESULT_VARIANT];

const LOSS_MULTIPLIER = 0;
const WIN_MULTIPLIER_THRESHOLD = 1;

export function getResultVariant(multiplier: number): ResultVariant {
  if (multiplier <= LOSS_MULTIPLIER) return RESULT_VARIANT.LOSS;
  if (multiplier < WIN_MULTIPLIER_THRESHOLD) return RESULT_VARIANT.PARTIAL;
  return RESULT_VARIANT.WIN;
}

const HEADER_CLASS_BY_VARIANT: Record<ResultVariant, string> = {
  [RESULT_VARIANT.WIN]: 'result-header-win',
  [RESULT_VARIANT.PARTIAL]: 'result-surface-neutral',
  [RESULT_VARIANT.LOSS]: 'result-header-loss',
};

interface Props {
  variant: ResultVariant;
  multiplier: number;
  payout: string;
  resultValue: number;
  className?: string;
}

export function GameResultCard({ variant, multiplier, payout, resultValue, className }: Props) {
  const multiplierLabel = `${multiplier.toFixed(RESULT_DECIMAL_PLACES)}${MULTIPLIER_SUFFIX}`;
  const payoutLabel = parseFloat(payout).toFixed(RESULT_DECIMAL_PLACES);

  return (
    <div className={cn('flex w-[190px] flex-col overflow-hidden rounded-[12px]', className)}>
      <div
        className={cn(
          'flex h-[52px] items-center justify-center gap-2 rounded-t-[12px] border border-button-brand-bg-disabled px-4',
          HEADER_CLASS_BY_VARIANT[variant]
        )}
      >
        <Trophy className="h-5 w-5 text-brand-text-white" aria-hidden />
        <span className="font-outfit text-base font-semibold text-brand-text-white">
          {multiplierLabel}
        </span>
      </div>
      <div className="result-surface-neutral flex h-[64px] items-center justify-between gap-3 rounded-b-[12px] p-4">
        <div className="mx-auto flex items-center gap-1.5">
          <Image
            src={COIN_ICON_SRC}
            width={COIN_ICON_SIZE}
            height={COIN_ICON_SIZE}
            alt=""
            aria-hidden
          />
          <span className="font-outfit text-base font-semibold text-brand-text-white">
            {payoutLabel}
          </span>
        </div>
        <div className="flex h-10 w-10 items-center justify-center rounded-[4px] bg-brand-btn-gradient-to">
          <span className="font-outfit text-sm font-semibold text-brand-text-white">
            {resultValue}
          </span>
        </div>
      </div>
    </div>
  );
}
