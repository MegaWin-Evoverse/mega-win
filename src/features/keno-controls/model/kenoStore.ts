import { create } from 'zustand';
import { GAME_PANEL_TAB, type GamePanelTab } from '@/shared/config';
import {
  sanitizeBetInput,
  normalizeBetValue,
  calcHalfBet,
  calcDoubleBet,
  calcMaxBet,
} from '@/shared/lib/betAmount';
import { KENO_DEFAULTS, type KenoRisk } from './constants';

interface KenoState {
  activeTab: GamePanelTab;
  betAmount: string;
  balance: number;
  risk: KenoRisk;
  numberOfBets: string;
  isBetActive: boolean;
  setTab: (tab: GamePanelTab) => void;
  setBetAmount: (amount: string) => void;
  normalizeBetAmount: () => void;
  setRisk: (risk: KenoRisk) => void;
  setNumberOfBets: (bets: string) => void;
  setIsBetActive: (active: boolean) => void;
  betHalf: () => void;
  betDouble: () => void;
  betMax: () => void;
  clearTable: () => void;
  autoPick: () => void;
}

const useKenoStoreRaw = create<KenoState>((set, get) => ({
  activeTab: GAME_PANEL_TAB.MANUAL,
  betAmount: KENO_DEFAULTS.BET_AMOUNT_TEXT,
  balance: KENO_DEFAULTS.BALANCE,
  risk: KENO_DEFAULTS.RISK,
  numberOfBets: KENO_DEFAULTS.NUMBER_OF_BETS,
  isBetActive: true,
  setTab: (activeTab) => set({ activeTab }),
  setBetAmount: (val) => {
    if (val === '') {
      set({ betAmount: '' });
      return;
    }
    set({ betAmount: sanitizeBetInput(val, get().balance) });
  },
  normalizeBetAmount: () => {
    set({ betAmount: normalizeBetValue(get().betAmount) });
  },
  setRisk: (risk) => set({ risk }),
  setNumberOfBets: (numberOfBets) => set({ numberOfBets }),
  setIsBetActive: (isBetActive) => set({ isBetActive }),
  betHalf: () => set((state) => ({ betAmount: calcHalfBet(state.betAmount) })),
  betDouble: () => set((state) => ({ betAmount: calcDoubleBet(state.betAmount, state.balance) })),
  betMax: () => set((state) => ({ betAmount: calcMaxBet(state.balance) })),
  clearTable: () => {
    set({ isBetActive: false });
  },
  autoPick: () => {
    set({ isBetActive: true });
  },
  // TODO: integrate game engine
}));

export function useKenoStore<T>(selector: (state: KenoState) => T): T {
  return useKenoStoreRaw(selector);
}
