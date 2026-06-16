import { useShallow } from 'zustand/react/shallow';
import { useGameControlsStore, selectIsAutoMode } from '@/entities/game';

interface UseTableActionsReturn {
  clearTable: () => void;
  autoPick: () => void;
  undo: () => void;
  isAutoMode: boolean;
}

export function useTableActions(): UseTableActionsReturn {
  return useGameControlsStore(
    useShallow((state) => ({
      clearTable: state.clearTable,
      autoPick: state.autoPick,
      undo: state.undo,
      isAutoMode: selectIsAutoMode(state),
    }))
  );
}
