import { create } from 'zustand';

import { GAME_PANEL_TAB, type GamePanelTab } from '@/shared/config';
import { ROULETTE_DEFAULTS } from '../config/constants';

interface RouletteState {
  activeTab: GamePanelTab;
  selectedChip: string | null;
  placedBet: number;
  balance: number;
  numberOfBets: string;
  isBetActive: boolean;
  setTab: (tab: GamePanelTab) => void;
  selectChip: (chip: string | null) => void;
  setNumberOfBets: (bets: string) => void;
  clearTable: () => void;
  undo: () => void;
}

const useRouletteStoreRaw = create<RouletteState>((set) => ({
  activeTab: GAME_PANEL_TAB.MANUAL,
  selectedChip: null,
  placedBet: 0,
  balance: ROULETTE_DEFAULTS.BALANCE,
  numberOfBets: ROULETTE_DEFAULTS.NUMBER_OF_BETS,
  isBetActive: false,
  setTab: (activeTab) => set({ activeTab }),
  selectChip: (selectedChip) =>
    set({
      selectedChip,
      isBetActive: selectedChip !== null,
    }),
  setNumberOfBets: (numberOfBets) => set({ numberOfBets }),
  clearTable: () =>
    set({
      placedBet: 0,
      selectedChip: null,
      isBetActive: false,
    }),
  undo: () =>
    set((state) => {
      if (state.selectedChip !== null) {
        return { selectedChip: null, isBetActive: false };
      }
      return {};
    }),
  // TODO: integrate game engine
}));

export function useRouletteStore<T>(selector: (state: RouletteState) => T): T {
  return useRouletteStoreRaw(selector);
}
