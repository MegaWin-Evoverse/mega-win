'use client';
import { cn } from '@/shared/lib/cn';
import { Button } from '@/shared/ui/button';
import { useBetButton } from '../model/useBetButton';

interface Props {
  manualLabel: string;
  autoLabel: string;
  requiresBet: boolean;
  className?: string;
  onBet?: () => void;
  isBetting?: boolean;
  isAutoRunning?: boolean;
  autoActiveLabel?: string;
}

export function BetButton({
  manualLabel,
  autoLabel,
  requiresBet,
  className,
  onBet,
  isBetting,
  isAutoRunning,
  autoActiveLabel,
}: Props) {
  const { isAutoMode, isDisabled } = useBetButton(requiresBet);
  const isStopState = isAutoMode && Boolean(isAutoRunning);
  const baseLabel = isAutoMode ? autoLabel : manualLabel;
  const label = isStopState && autoActiveLabel ? autoActiveLabel : baseLabel;

  return (
    <Button
      variant={isStopState ? 'main-stop' : 'main'}
      size="play"
      onClick={onBet}
      disabled={isDisabled && !isBetting}
      className={cn('order-first lg:order-none', className)}
    >
      {label}
    </Button>
  );
}
