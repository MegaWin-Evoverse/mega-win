import { useShallow } from 'zustand/react/shallow';
import { useGameControlsStore } from '@/entities/game';
import { playSound } from '@/shared/lib/playSound';

interface UseChipSelectorReturn {
  selectedChip: string | null;
  placedBet: number;
  selectChip: (chip: string) => void;
}

export function useChipSelector(): UseChipSelectorReturn {
  const {
    selectedChip,
    placedBet,
    selectChip: selectChipStore,
  } = useGameControlsStore(
    useShallow((state) => ({
      selectedChip: state.selectedChip,
      placedBet: state.placedBet,
      selectChip: state.selectChip,
    }))
  );

  function selectChip(chip: string) {
    playSound('selected');
    selectChipStore(chip);
  }

  return { selectedChip, placedBet, selectChip };
}
