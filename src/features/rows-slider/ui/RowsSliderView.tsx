'use client';
import { Slider } from '@/shared/ui/slider';
import { LabeledField } from '@/shared/ui/labeled-field';
import { PLINKO_ROWS } from '@/entities/game';
import { ROWS_SLIDER_CLASS } from '../model/constants';

interface Props {
  rows: number;
  onRowsChange: (rows: number) => void;
  label: string;
  labelClassName?: string;
  className?: string;
}

export function RowsSliderView({ rows, onRowsChange, label, labelClassName, className }: Props) {
  return (
    <LabeledField label={label} labelClassName={labelClassName} className={className}>
      <div className="flex items-center gap-4">
        <span className="min-w-[12px] font-outfit text-base font-semibold text-brand-text-white/95">
          {rows}
        </span>
        <Slider
          min={PLINKO_ROWS.MIN}
          max={PLINKO_ROWS.MAX}
          step={PLINKO_ROWS.STEP}
          value={[rows]}
          onValueChange={(value) => onRowsChange(Array.isArray(value) ? value[0] : value)}
          className={ROWS_SLIDER_CLASS}
        />
      </div>
    </LabeledField>
  );
}
