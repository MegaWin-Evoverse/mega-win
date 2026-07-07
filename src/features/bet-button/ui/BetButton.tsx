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
  isBetting?: boolean;
  isAutoRunning?: boolean;
  autoActiveLabel?: string;
}

export function BetButton({
  manualLabel,
  autoLabel,
  requiresBet,
  onBet,
  className,
  isBetting,
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
      disabled={!canBet && !isBetting}
      className={cn('order-first lg:order-none', className)}
    >
      {label}
    </Button>
  );
}
