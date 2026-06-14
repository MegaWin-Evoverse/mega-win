import { create } from 'zustand';
import { GAME_PANEL_TAB, type GamePanelTab } from '@/shared/config';
import {
  sanitizeBetInput,
  normalizeBetValue,
  calcHalfBet,
  calcDoubleBet,
  calcMaxBet,
} from '@/shared/lib/betAmount';
import { DICE_DEFAULTS } from './constants';

export interface DiceState {
  activeTab: GamePanelTab;
  betAmount: string;
  balance: number;
  numberOfBets: string;
  onWinMode: string;
  onLossMode: string;
  stopOnProfit: string;
  stopOnLoss: string;
  isBetActive: boolean;
  setTab: (tab: GamePanelTab) => void;
  setBetAmount: (amount: string) => void;
  normalizeBetAmount: () => void;
  setNumberOfBets: (bets: string) => void;
  betHalf: () => void;
  betDouble: () => void;
  betMax: () => void;
}

const useDiceStoreRaw = create<DiceState>((set, get) => ({
  activeTab: GAME_PANEL_TAB.MANUAL,
  betAmount: DICE_DEFAULTS.BET_AMOUNT_TEXT,
  balance: DICE_DEFAULTS.BALANCE,
  numberOfBets: DICE_DEFAULTS.NUMBER_OF_BETS,
  onWinMode: DICE_DEFAULTS.ON_WIN,
  onLossMode: DICE_DEFAULTS.ON_LOSS,
  stopOnProfit: DICE_DEFAULTS.STOP_ON_PROFIT,
  stopOnLoss: DICE_DEFAULTS.STOP_ON_LOSS,
  isBetActive: false,
  setTab: (activeTab) => set({ activeTab }),
  setBetAmount: (val) => {
    if (val === '') {
      set({ betAmount: '', isBetActive: false });
      return;
    }
    const finalVal = sanitizeBetInput(val, get().balance);
    set({ betAmount: finalVal, isBetActive: (Number.parseFloat(finalVal) || 0) > 0 });
  },
  normalizeBetAmount: () => {
    const finalVal = normalizeBetValue(get().betAmount);
    set({ betAmount: finalVal, isBetActive: true });
  },
  setNumberOfBets: (numberOfBets) => set({ numberOfBets }),
  betHalf: () =>
    set((state) => {
      const nextBet = calcHalfBet(state.betAmount);
      return { betAmount: nextBet, isBetActive: (Number.parseFloat(nextBet) || 0) > 0 };
    }),
  betDouble: () =>
    set((state) => {
      const nextBet = calcDoubleBet(state.betAmount, state.balance);
      return { betAmount: nextBet, isBetActive: (Number.parseFloat(nextBet) || 0) > 0 };
    }),
  betMax: () =>
    set((state) => {
      const nextBet = calcMaxBet(state.balance);
      return { betAmount: nextBet, isBetActive: (Number.parseFloat(nextBet) || 0) > 0 };
    }),
  // TODO: integrate game engine
}));

export function useDiceStore<T>(selector: (state: DiceState) => T): T {
  return useDiceStoreRaw(selector);
}
