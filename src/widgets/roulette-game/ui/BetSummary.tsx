'use client';
import Image from 'next/image';
import { cn } from '@/shared/lib/cn';
import { formatAmount } from '@/shared/lib/formatAmount';
import { COIN_ICON } from '@/shared/config';
import { ROULETTE_LABELS } from '@/features/roulette-controls';

interface Props {
  selectedChip: string | null;
  placedBet: number;
  className?: string;
}

export function BetSummary({ selectedChip, placedBet, className }: Props) {
  return (
    <div className={cn('flex w-full flex-col gap-4', className)}>
      <div className="flex items-center justify-between font-outfit text-base font-medium">
        <span className="text-brand-text-white">{ROULETTE_LABELS.CHIP_VALUE}</span>
        <div className="flex items-center gap-2 text-brand-text-white">
          <span
            className={cn(
              'size-2.5 rounded-full transition-colors duration-200',
              selectedChip ? 'bg-brand-green-to' : 'bg-chip-text-muted'
            )}
          />
          <span>
            {selectedChip
              ? `${selectedChip} ${ROULETTE_LABELS.COINS}`
              : `0 ${ROULETTE_LABELS.COINS}`}
          </span>
        </div>
      </div>
      <div className="flex items-center justify-between font-outfit text-base font-medium">
        <span className="text-brand-text-white">{ROULETTE_LABELS.BET_AMOUNT}</span>
        <div className="flex items-center gap-2 text-brand-text-white">
          <Image
            src={COIN_ICON.SRC}
            alt={COIN_ICON.ALT}
            width={COIN_ICON.SIZE_BALANCE}
            height={COIN_ICON.SIZE_BALANCE}
          />
          <span>
            {formatAmount(placedBet)} {ROULETTE_LABELS.COINS}
          </span>
        </div>
      </div>
    </div>
  );
}
