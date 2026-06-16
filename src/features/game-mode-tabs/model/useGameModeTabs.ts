import { useShallow } from 'zustand/react/shallow';
import type { GamePanelTab } from '@/shared/config';
import { useGameControlsStore } from '@/entities/game';

interface UseGameModeTabsReturn {
  activeTab: GamePanelTab;
  setTab: (tab: GamePanelTab) => void;
}

export function useGameModeTabs(): UseGameModeTabsReturn {
  return useGameControlsStore(
    useShallow((state) => ({ activeTab: state.activeTab, setTab: state.setTab }))
  );
}
