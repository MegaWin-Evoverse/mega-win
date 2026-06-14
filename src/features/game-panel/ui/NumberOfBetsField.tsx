'use client';
import type { ChangeEvent } from 'react';
import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';
import { GAME_PANEL_LABELS } from '@/shared/config';

interface Props {
  numberOfBets: string;
  onNumberOfBetsChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onInfinityClick: () => void;
}

export function NumberOfBetsField({ numberOfBets, onNumberOfBetsChange, onInfinityClick }: Props) {
  return (
    <div className="flex w-full flex-col gap-2">
      <span className="font-outfit text-sm font-medium text-brand-text-light/80">
        {GAME_PANEL_LABELS.NUMBER_OF_BETS}
      </span>
      <div className="flex h-11 items-center justify-between gap-2 rounded-lg border border-border-default bg-border-default/25 px-3 focus-within:border-button-brand-bg-dark transition-colors duration-200">
        <Input
          inputMode="numeric"
          value={numberOfBets}
          onChange={onNumberOfBetsChange}
          className="h-auto border-0 bg-transparent p-0 font-outfit text-sm text-brand-text-light shadow-none focus-visible:border-0 focus-visible:ring-0 dark:bg-transparent"
        />
        <Button
          variant="ghost"
          size="none"
          onClick={onInfinityClick}
          className="flex h-7 items-center justify-center rounded-md border border-border-default bg-surface-inset px-2.5 font-outfit text-base text-brand-text-light hover:text-brand-text-white transition-colors duration-150"
          aria-label={GAME_PANEL_LABELS.INFINITY_ARIA_LABEL}
        >
          {GAME_PANEL_LABELS.INFINITY_SYMBOL}
        </Button>
      </div>
    </div>
  );
}
