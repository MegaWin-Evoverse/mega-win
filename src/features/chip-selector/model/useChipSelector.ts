import { useShallow } from 'zustand/react/shallow';
import { useGameControlsStore } from '@/entities/game';

interface UseChipSelectorReturn {
  selectedChip: string | null;
  placedBet: number;
  selectChip: (chip: string) => void;
}

export function useChipSelector(): UseChipSelectorReturn {
  return useGameControlsStore(
    useShallow((state) => ({
      selectedChip: state.selectedChip,
      placedBet: state.placedBet,
      selectChip: state.selectChip,
    }))
  );
}
