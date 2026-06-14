import { create } from 'zustand';
import { GAME_PANEL_TAB, type GamePanelTab } from '@/shared/config';
import {
  sanitizeBetInput,
  normalizeBetValue,
  calcHalfBet,
  calcDoubleBet,
  calcMaxBet,
} from '@/shared/lib/betAmount';
import { PLINKO_DEFAULTS, PLINKO_RISK, PLINKO_ROWS, type PlinkoRisk } from './constants';

interface PlinkoState {
  activeTab: GamePanelTab;
  betAmount: string;
  balance: number;
  risk: PlinkoRisk;
  rows: number;
  numberOfBets: string;
  setTab: (tab: GamePanelTab) => void;
  setBetAmount: (amount: string) => void;
  normalizeBetAmount: () => void;
  setRisk: (risk: PlinkoRisk) => void;
  setRows: (rows: number) => void;
  setNumberOfBets: (bets: string) => void;
  betHalf: () => void;
  betDouble: () => void;
  betMax: () => void;
}

const usePlinkoStoreRaw = create<PlinkoState>((set, get) => ({
  activeTab: GAME_PANEL_TAB.MANUAL,
  betAmount: PLINKO_DEFAULTS.BET_AMOUNT_TEXT,
  balance: PLINKO_DEFAULTS.BALANCE,
  risk: PLINKO_RISK.LOW,
  rows: PLINKO_ROWS.DEFAULT,
  numberOfBets: PLINKO_DEFAULTS.NUMBER_OF_BETS,
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
  setRows: (rows) => set({ rows }),
  setNumberOfBets: (numberOfBets) => set({ numberOfBets }),
  betHalf: () => set((state) => ({ betAmount: calcHalfBet(state.betAmount) })),
  betDouble: () => set((state) => ({ betAmount: calcDoubleBet(state.betAmount, state.balance) })),
  betMax: () => set((state) => ({ betAmount: calcMaxBet(state.balance) })),
  // TODO: integrate game engine
}));

export function usePlinkoStore<T>(selector: (state: PlinkoState) => T): T {
  return usePlinkoStoreRaw(selector);
}
