'use client';

import { cn } from '@/shared/lib/cn';
import { Button } from '@/shared/ui/button';

interface Props {
  number: number;
  isSelected: boolean;
  isHit: boolean;
  isDrawnMiss: boolean;
  isResultPhase: boolean;
  onNumberToggle: (n: number) => void;
}

export function KenoCell({
  number,
  isSelected,
  isHit,
  isDrawnMiss,
  isResultPhase,
  onNumberToggle,
}: Props) {
  const isGreen = (!isResultPhase && isSelected) || isHit;
  const isDimmed = isResultPhase && !isHit && !isDrawnMiss;

  return (
    <Button
      variant="ghost"
      size="none"
      onClick={() => onNumberToggle(number)}
      disabled={isResultPhase}
      aria-label={`Number ${number}`}
      aria-pressed={isSelected}
      className={cn(
        'relative flex h-[67px] w-[67px] items-center justify-center rounded-xl font-outfit text-xl font-semibold transition-colors duration-150',
        isGreen &&
          'border-0 bg-gradient-to-b from-brand-green-from to-brand-green-to text-brand-dark',
        isDrawnMiss &&
          'border border-keno-cell-border bg-gradient-to-b from-border-default to-brand-btn-gradient-to text-red-500',
        !isGreen &&
          !isDrawnMiss &&
          'border border-keno-cell-border bg-gradient-to-b from-border-default to-brand-btn-gradient-to text-brand-text-white',
        isDimmed && 'opacity-40',
        !isResultPhase && !isGreen && 'hover:opacity-80'
      )}
    >
      {number}
      {isDrawnMiss && (
        <>
          <span className="absolute left-1.5 top-1.5 h-3 w-3 rounded-tl-sm border-l-2 border-t-2 border-red-500" />
          <span className="absolute right-1.5 top-1.5 h-3 w-3 rounded-tr-sm border-r-2 border-t-2 border-red-500" />
          <span className="absolute bottom-1.5 left-1.5 h-3 w-3 rounded-bl-sm border-b-2 border-l-2 border-red-500" />
          <span className="absolute bottom-1.5 right-1.5 h-3 w-3 rounded-br-sm border-b-2 border-r-2 border-red-500" />
        </>
      )}
    </Button>
  );
}
