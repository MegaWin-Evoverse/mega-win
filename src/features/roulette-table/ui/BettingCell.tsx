import { cn } from '@/shared/lib/cn';
import { Button } from '@/shared/ui/button';
import type { PlacedBet } from '@/features/roulette-controls';
import { ChipStack } from './ChipStack';

export type BettingCellColor = 'red' | 'black' | 'green' | 'dark';

interface Props {
  label: string | number;
  color?: BettingCellColor;
  placedBet?: PlacedBet;
  onClick: () => void;
  className?: string;
  ariaLabel?: string;
}

const COLOR_CLASSES: Record<BettingCellColor, string> = {
  red: 'bg-roulette-red border border-transparent shadow-sm hover:brightness-110',
  black:
    'bg-gradient-to-b from-border-default to-brand-btn-gradient-to border border-transparent shadow-sm hover:brightness-110',
  green: 'bg-brand-green-to border border-transparent shadow-sm hover:brightness-110',
  dark: 'bg-bg-primary border border-roulette-cell-border hover:border-brand-text-muted hover:brightness-125',
};

export function BettingCell({
  label,
  color = 'black',
  placedBet,
  onClick,
  className,
  ariaLabel,
}: Props) {
  return (
    <Button
      variant="ghost"
      size="none"
      onClick={onClick}
      aria-label={ariaLabel ?? `Bet on ${label}`}
      className={cn(
        'relative flex items-center justify-center font-outfit text-[min(14px,2.2cqw)] font-semibold text-brand-text-white transition-all duration-150 select-none cursor-pointer',
        COLOR_CLASSES[color],
        placedBet
          ? 'ring-1 ring-brand-text-white shadow-[0_0_8px_var(--color-roulette-chip-glow)]'
          : 'hover:scale-[1.02]',
        className
      )}
    >
      {label}

      {placedBet && <ChipStack amount={placedBet.amount} />}
    </Button>
  );
}
