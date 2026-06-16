'use client';
import { cn } from '@/shared/lib/cn';
import { Button } from '@/shared/ui/button';
import { useGameControlsStore } from '@/entities/game';
import { useBetButton } from '../model/useBetButton';

interface Props {
  manualLabel: string;
  autoLabel: string;
  requiresBet: boolean;
  className?: string;
}

export function BetButton({ manualLabel, autoLabel, requiresBet, className }: Props) {
  const { isAutoMode, isDisabled } = useBetButton(requiresBet);
  const betCallback = useGameControlsStore((state) => state.betCallback);
  const label = isAutoMode ? autoLabel : manualLabel;

  return (
    <Button
      variant="main"
      size="play"
      onClick={() => betCallback?.()}
      disabled={isDisabled}
      className={cn('order-first lg:order-none', className)}
    >
      {label}
    </Button>
  );
}
