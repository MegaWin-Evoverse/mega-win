import { useShallow } from 'zustand/react/shallow';
import { useGameControlsStore, selectIsAutoMode } from '@/entities/game';

interface UseBetButtonReturn {
  isAutoMode: boolean;
  isDisabled: boolean;
}

export function useBetButton(requiresBet: boolean): UseBetButtonReturn {
  const { isAutoMode, isBetActive, betAmount, selectedChip } = useGameControlsStore(
    useShallow((state) => ({
      isAutoMode: selectIsAutoMode(state),
      isBetActive: state.isBetActive,
      betAmount: state.betAmount,
      selectedChip: state.selectedChip,
    }))
  );

  const parsedBet = Number.parseFloat(betAmount);
  const isDisabled = requiresBet
    ? (!isAutoMode && !isBetActive) || parsedBet <= 0 || Number.isNaN(parsedBet)
    : selectedChip === null;

  return { isAutoMode, isDisabled };
}
