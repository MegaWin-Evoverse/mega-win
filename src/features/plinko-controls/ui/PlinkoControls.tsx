'use client';

import { SegmentedTabs } from '@/shared/ui/segmented-tabs';
import { Slider } from '@/shared/ui/slider';
import { PLINKO_LABELS, PLINKO_RISK_OPTIONS, PLINKO_ROWS } from '../config/constants';
import { usePlinkoControls } from '../model/usePlinkoControls';

export function PlinkoControls() {
  const { risk, rows, onRiskChange, onRowsChange } = usePlinkoControls();

  function handleRowsChange(value: number | readonly number[]) {
    onRowsChange(typeof value === 'number' ? value : value[0]);
  }

  return (
    <>
      <div className="flex w-full flex-col gap-2">
        <span className="font-outfit text-base font-medium text-brand-text-white">
          {PLINKO_LABELS.RISK}
        </span>
        <SegmentedTabs items={[...PLINKO_RISK_OPTIONS]} value={risk} onValueChange={onRiskChange} />
      </div>

      <div className="flex w-full flex-col gap-2">
        <span className="font-outfit text-base font-medium text-brand-text-white">
          {PLINKO_LABELS.ROWS}
        </span>
        <div className="flex items-center gap-2">
          <span className="font-outfit text-base font-semibold text-brand-text-white/95">
            {rows}
          </span>
          <Slider
            min={PLINKO_ROWS.MIN}
            max={PLINKO_ROWS.MAX}
            step={PLINKO_ROWS.STEP}
            value={[rows]}
            onValueChange={handleRowsChange}
            className="flex-1 [&_[data-slot=slider-range]]:bg-brand-green-to [&_[data-slot=slider-track]]:bg-border-default"
          />
        </div>
      </div>
    </>
  );
}
