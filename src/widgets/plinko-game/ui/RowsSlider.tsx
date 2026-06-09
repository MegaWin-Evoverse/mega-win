'use client';

import { cn } from '@/shared/lib/cn';
import { Slider } from '@/shared/ui/slider';
import { PLINKO_LABELS, PLINKO_ROWS } from '@/features/plinko-controls';

interface Props {
  rows: number;
  onRowsChange: (value: number | readonly number[]) => void;
  className?: string;
}

export function RowsSlider({ rows, onRowsChange, className }: Props) {
  return (
    <div className={cn('flex w-full flex-col gap-2', className)}>
      <span className="font-outfit text-base font-medium text-brand-text-white">
        {PLINKO_LABELS.ROWS}
      </span>
      <div className="flex items-center gap-4">
        <span className="min-w-[12px] font-outfit text-base font-semibold text-brand-text-white/95">
          {rows}
        </span>
        <Slider
          min={PLINKO_ROWS.MIN}
          max={PLINKO_ROWS.MAX}
          step={PLINKO_ROWS.STEP}
          value={[rows]}
          onValueChange={onRowsChange}
          className="flex-1 [&_[data-slot=slider-range]]:bg-brand-green-to [&_[data-slot=slider-track]]:bg-border-default [&_[data-slot=slider-thumb]]:h-3.5 [&_[data-slot=slider-thumb]]:w-1.5 [&_[data-slot=slider-thumb]]:rounded-full [&_[data-slot=slider-thumb]]:border-0 [&_[data-slot=slider-thumb]]:bg-white"
        />
      </div>
    </div>
  );
}
