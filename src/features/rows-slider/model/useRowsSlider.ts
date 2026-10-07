import { useShallow } from 'zustand/react/shallow';
import { useGameControlsStore } from '@/entities/game';

interface UseRowsSliderReturn {
  rows: number;
  setRows: (value: number | readonly number[]) => void;
}

export function useRowsSlider(): UseRowsSliderReturn {
  return useGameControlsStore(
    useShallow((state) => ({ rows: state.rows, setRows: state.setRows }))
  );
}
