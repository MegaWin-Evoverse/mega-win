'use client';

import { cn } from '@/shared/lib/cn';
import { Button } from '@/shared/ui/button';
import { GAME_PANEL_LABELS } from '../config/constants';

interface Props {
  onBet: () => void;
  className?: string;
}

export function BetButton({ onBet, className }: Props) {
  return (
    <Button
      variant="main"
      size="none"
      onClick={onBet}
      className={cn('h-12 w-full rounded-lg px-6 text-lg', className)}
    >
      {GAME_PANEL_LABELS.BET}
    </Button>
  );
}
