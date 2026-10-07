import { useShallow } from 'zustand/react/shallow';
import { useGameControlsStore, selectProfitOnWin, selectIsAutoMode } from '@/entities/game';

interface UseProfitOnWinReturn {
  profitOnWin: string;
  isAutoMode: boolean;
}

export function useProfitOnWin(): UseProfitOnWinReturn {
  return useGameControlsStore(
    useShallow((state) => ({
      profitOnWin: selectProfitOnWin(state),
      isAutoMode: selectIsAutoMode(state),
    }))
  );
}
