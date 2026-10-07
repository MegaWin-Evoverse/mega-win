import { useShallow } from 'zustand/react/shallow';
import { useGameControlsStore, selectIsAutoMode } from '@/entities/game';

interface UseAutoBetReturn {
  numberOfBets: string;
  onNumberOfBetsChange: (value: string) => void;
  onInfinityClick: () => void;
  isAutoMode: boolean;
}

export function useAutoBet(): UseAutoBetReturn {
  return useGameControlsStore(
    useShallow((state) => ({
      numberOfBets: state.numberOfBets,
      onNumberOfBetsChange: state.setNumberOfBets,
      onInfinityClick: state.setInfinity,
      isAutoMode: selectIsAutoMode(state),
    }))
  );
}
