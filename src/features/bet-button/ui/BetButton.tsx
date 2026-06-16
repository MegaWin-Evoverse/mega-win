'use client';
import { cn } from '@/shared/lib/cn';
import { Button } from '@/shared/ui/button';
import { useBetButton } from '../model/useBetButton';

interface Props {
  manualLabel: string;
  autoLabel: string;
  requiresBet: boolean;
  onBet?: () => void;
  className?: string;
}

export function BetButton({ manualLabel, autoLabel, requiresBet, onBet, className }: Props) {
  const { isAutoMode, canBet } = useBetButton(requiresBet);
  const label = isAutoMode ? autoLabel : manualLabel;

  return (
    <Button
      variant="main"
      size="play"
      onClick={onBet}
      disabled={!canBet}
      className={cn('order-first lg:order-none', className)}
    >
      {label}
    </Button>
  );
}
