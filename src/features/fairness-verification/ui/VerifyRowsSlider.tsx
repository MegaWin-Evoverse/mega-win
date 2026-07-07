'use client';
import { RowsSliderView } from '@/features/rows-slider';
import { FAIRNESS_LABELS } from '../model/constants';

interface Props {
  rows: number;
  onRowsChange: (rows: number) => void;
  className?: string;
}

export function VerifyRowsSlider({ rows, onRowsChange, className }: Props) {
  return (
    <RowsSliderView
      rows={rows}
      onRowsChange={onRowsChange}
      label={FAIRNESS_LABELS.fieldRows}
      labelClassName="text-sm font-light text-brand-text-light select-none"
      className={className}
    />
  );
}
