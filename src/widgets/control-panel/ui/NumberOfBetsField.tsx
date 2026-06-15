'use client';
import { cn } from '@/shared/lib/cn';
import { Button } from '@/shared/ui/button';
import { AmountInput } from '@/shared/ui/amount-input';
import { GAME_PANEL_LABELS } from '@/shared/config';

interface Props {
  numberOfBets: string;
  onNumberOfBetsChange: (value: string) => void;
  onInfinityClick: () => void;
  className?: string;
}

export function NumberOfBetsField({
  numberOfBets,
  onNumberOfBetsChange,
  onInfinityClick,
  className,
}: Props) {
  return (
    <div className={cn('flex w-full flex-col gap-2', className)}>
      <span className="font-outfit text-sm font-medium text-brand-text-light/80">
        {GAME_PANEL_LABELS.NUMBER_OF_BETS}
      </span>
      <AmountInput
        value={numberOfBets}
        onValueChange={onNumberOfBetsChange}
        inputMode="numeric"
        trailing={
          <Button
            variant="ghost"
            size="none"
            onClick={onInfinityClick}
            className="flex h-7 items-center justify-center rounded-md border border-border-default bg-surface-inset px-2.5 font-outfit text-base text-brand-text-light hover:text-brand-text-white transition-colors duration-150"
            aria-label={GAME_PANEL_LABELS.INFINITY_ARIA_LABEL}
          >
            {GAME_PANEL_LABELS.INFINITY_SYMBOL}
          </Button>
        }
      />
    </div>
  );
}
