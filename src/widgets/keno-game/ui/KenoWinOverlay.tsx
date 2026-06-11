'use client';

import Image from 'next/image';

import { COIN_ICON } from '@/shared/config';
import { Button } from '@/shared/ui/button';

interface Props {
  multiplier: number;
  winAmount: number;
  matchCount: number;
  onDismiss: () => void;
}

export function KenoWinOverlay({ multiplier, winAmount, matchCount, onDismiss }: Props) {
  return (
    <Button
      variant="ghost"
      size="none"
      onClick={onDismiss}
      aria-label="Dismiss result"
      className="absolute inset-0 flex cursor-pointer items-center justify-center rounded-none backdrop-blur-sm hover:bg-transparent"
    >
      <div className="flex w-[280px] flex-col overflow-hidden rounded-xl shadow-2xl">
        <div className="flex flex-col items-center justify-center gap-2 bg-gradient-to-b from-brand-green-from to-brand-green-to px-6 py-5">
          <TrophyIcon />
          <span className="font-outfit text-3xl font-bold text-brand-dark">
            {multiplier.toFixed(2)}x
          </span>
        </div>
        <div className="flex items-center justify-center gap-8 bg-gradient-to-b from-border-default to-brand-btn-gradient-to px-6 py-4">
          <div className="flex items-center gap-2">
            <Image
              src={COIN_ICON.SRC}
              alt={COIN_ICON.ALT}
              width={COIN_ICON.SIZE_BALANCE}
              height={COIN_ICON.SIZE_BALANCE}
            />
            <span className="font-outfit text-base font-semibold text-brand-text-white">
              {winAmount.toFixed(2)}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="keno-gem size-4 shrink-0" />
            <span className="font-outfit text-base font-semibold text-brand-text-white">
              {matchCount}x
            </span>
          </div>
        </div>
      </div>
    </Button>
  );
}

function TrophyIcon() {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="text-brand-dark"
    >
      <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
      <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
      <path d="M4 22h16" />
      <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
      <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
      <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
    </svg>
  );
}
