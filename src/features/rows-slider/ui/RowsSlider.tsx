'use client';
import { ROWS_LABEL } from '../model/constants';
import { useRowsSlider } from '../model/useRowsSlider';
import { RowsSliderView } from './RowsSliderView';

interface Props {
  className?: string;
}

export function RowsSlider({ className }: Props) {
  const { rows, setRows } = useRowsSlider();

  return (
    <RowsSliderView
      rows={rows}
      onRowsChange={setRows}
      label={ROWS_LABEL}
      labelClassName="text-base font-medium text-brand-text-white"
      className={className}
    />
  );
}
