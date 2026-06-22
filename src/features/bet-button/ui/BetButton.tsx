'use client';
import { cn } from '@/shared/lib/cn';
import { Button } from '@/shared/ui/button';
import { useGameControlsStore } from '@/entities/game';
import { useBetButton } from '../model/useBetButton';

interface Props {
  manualLabel: string;
  autoLabel: string;
  requiresBet: boolean;
  onBet?: () => void;
  className?: string;
  isAutoRunning?: boolean;
  autoActiveLabel?: string;
}

export function BetButton({
  manualLabel,
  autoLabel,
  requiresBet,
  onBet,
  className,
  isAutoRunning,
  autoActiveLabel,
}: Props) {
  const { isAutoMode, canBet } = useBetButton(requiresBet);
  const isStopState = isAutoMode && Boolean(isAutoRunning);
  const label = isAutoMode
    ? isAutoRunning && autoActiveLabel
      ? autoActiveLabel
      : autoLabel
    : manualLabel;

  return (
    <Button
      variant={isStopState ? 'main-stop' : 'main'}
      size="play"
      onClick={onBet}
      disabled={!canBet}
      className={cn('order-first lg:order-none', className)}
    >
      {label}
    </Button>
  );
}
