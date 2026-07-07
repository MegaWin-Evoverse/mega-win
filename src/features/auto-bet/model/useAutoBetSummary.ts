import { useShallow } from 'zustand/react/shallow';
import { useGameControlsStore, selectIsAutoMode } from '@/entities/game';

interface UseAutoBetSummaryReturn {
  onWinMode: string;
  onLossMode: string;
  stopOnProfit: string;
  stopOnLoss: string;
  isAutoMode: boolean;
}

export function useAutoBetSummary(): UseAutoBetSummaryReturn {
  return useGameControlsStore(
    useShallow((state) => ({
      onWinMode: state.onWinMode,
      onLossMode: state.onLossMode,
      stopOnProfit: state.stopOnProfit,
      stopOnLoss: state.stopOnLoss,
      isAutoMode: selectIsAutoMode(state),
    }))
  );
}
