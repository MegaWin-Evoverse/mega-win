import { create } from 'zustand';
import { GAME_PANEL_TAB, type GamePanelTab } from '@/shared/config';
import {
  sanitizeBetInput,
  normalizeBetValue,
  calcHalfBet,
  calcDoubleBet,
  calcMaxBet,
} from '@/shared/lib/betAmount';
import { type Risk, RISK, GAME_CONTROLS_DEFAULTS, PLINKO_ROWS, CHIP_NOMINALS } from './constants';

const DIGITS_ONLY = /\D/g;

export interface GameControlsState {
  activeTab: GamePanelTab;
  betAmount: string;
  balance: number;
  risk: Risk;
  rows: number;
  numberOfBets: string;
  selectedChip: string | null;
  placedBet: number;
  onWinMode: string;
  onWinIncrease: string;
  onLossMode: string;
  onLossIncrease: string;
  stopOnProfit: string;
  stopOnLoss: string;
  isBetActive: boolean;
  applyBet: (amount: number) => void;
  applyWin: (amount: number) => void;
  setBalance: (balance: number) => void;
  betCallback: (() => void) | null;
  setBetCallback: (fn: (() => void) | null) => void;
  setTab: (tab: GamePanelTab) => void;
  setBetAmount: (value: string) => void;
  normalizeBetAmount: () => void;
  betHalf: () => void;
  betDouble: () => void;
  betMax: () => void;
  setRisk: (risk: Risk) => void;
  setRows: (value: number | readonly number[]) => void;
  setNumberOfBets: (value: string) => void;
  setInfinity: () => void;
  decrementNumberOfBets: () => void;
  setOnWinMode: (mode: string) => void;
  setOnWinIncrease: (value: string) => void;
  setOnLossMode: (mode: string) => void;
  setOnLossIncrease: (value: string) => void;
  setStopOnProfit: (value: string) => void;
  setStopOnLoss: (value: string) => void;
  applyAutoBetConfig: (config: {
    onWinMode: string;
    onWinIncrease: string;
    onLossMode: string;
    onLossIncrease: string;
    stopOnProfit: string;
    stopOnLoss: string;
  }) => void;
  resetAutoBetConfig: () => void;
  selectChip: (chip: string) => void;
  clearTable: () => void;
  undo: () => void;
  autoPick: () => void;
}

const useGameControlsStoreRaw = create<GameControlsState>((set, get) => ({
  activeTab: GAME_PANEL_TAB.MANUAL,
  betAmount: GAME_CONTROLS_DEFAULTS.BET_AMOUNT_TEXT,
  balance: GAME_CONTROLS_DEFAULTS.BALANCE,
  risk: RISK.LOW,
  rows: PLINKO_ROWS.DEFAULT,
  numberOfBets: GAME_CONTROLS_DEFAULTS.NUMBER_OF_BETS,
  selectedChip: CHIP_NOMINALS[0],
  placedBet: 0,
  onWinMode: GAME_CONTROLS_DEFAULTS.ON_WIN,
  onWinIncrease: GAME_CONTROLS_DEFAULTS.ON_WIN_INCREASE,
  onLossMode: GAME_CONTROLS_DEFAULTS.ON_LOSS,
  onLossIncrease: GAME_CONTROLS_DEFAULTS.ON_LOSS_INCREASE,
  stopOnProfit: GAME_CONTROLS_DEFAULTS.STOP_ON_PROFIT,
  stopOnLoss: GAME_CONTROLS_DEFAULTS.STOP_ON_LOSS,
  isBetActive: false,
  applyBet: (amount) => set((state) => ({ balance: Math.max(0, state.balance - amount) })),
  applyWin: (amount) => set((state) => ({ balance: state.balance + amount })),
  setBalance: (balance) => set({ balance }),
  betCallback: null,
  setBetCallback: (betCallback) => set({ betCallback }),
  setTab: (activeTab) => set({ activeTab }),
  setBetAmount: (value) => {
    if (value === '') {
      set({ betAmount: '', isBetActive: false });
      return;
    }
    const next = sanitizeBetInput(value, get().balance);
    set({ betAmount: next, isBetActive: (Number.parseFloat(next) || 0) > 0 });
  },
  normalizeBetAmount: () => {
    const next = normalizeBetValue(get().betAmount);
    set({ betAmount: next, isBetActive: true });
  },
  betHalf: () =>
    set((state) => {
      const next = calcHalfBet(state.betAmount);
      return { betAmount: next, isBetActive: (Number.parseFloat(next) || 0) > 0 };
    }),
  betDouble: () =>
    set((state) => {
      const next = calcDoubleBet(state.betAmount, state.balance);
      return { betAmount: next, isBetActive: (Number.parseFloat(next) || 0) > 0 };
    }),
  betMax: () =>
    set((state) => {
      const next = calcMaxBet(state.balance);
      return { betAmount: next, isBetActive: (Number.parseFloat(next) || 0) > 0 };
    }),
  setRisk: (risk) => set({ risk }),
  setRows: (value) => set({ rows: Array.isArray(value) ? value[0] : (value as number) }),
  setNumberOfBets: (value) => set({ numberOfBets: value.replace(DIGITS_ONLY, '') }),
  setInfinity: () => set({ numberOfBets: GAME_CONTROLS_DEFAULTS.NUMBER_OF_BETS }),
  decrementNumberOfBets: () =>
    set((state) => {
      if (state.numberOfBets === GAME_CONTROLS_DEFAULTS.NUMBER_OF_BETS) return {};
      const current = parseInt(state.numberOfBets, 10);
      if (isNaN(current) || current <= 1) return { numberOfBets: '0' };
      return { numberOfBets: String(current - 1) };
    }),
  setOnWinMode: (onWinMode) => set({ onWinMode }),
  setOnWinIncrease: (onWinIncrease) => set({ onWinIncrease }),
  setOnLossMode: (onLossMode) => set({ onLossMode }),
  setOnLossIncrease: (onLossIncrease) => set({ onLossIncrease }),
  setStopOnProfit: (stopOnProfit) => set({ stopOnProfit }),
  setStopOnLoss: (stopOnLoss) => set({ stopOnLoss }),
  applyAutoBetConfig: (config) => set(config),
  resetAutoBetConfig: () =>
    set({
      onWinMode: GAME_CONTROLS_DEFAULTS.ON_WIN,
      onWinIncrease: GAME_CONTROLS_DEFAULTS.ON_WIN_INCREASE,
      onLossMode: GAME_CONTROLS_DEFAULTS.ON_LOSS,
      onLossIncrease: GAME_CONTROLS_DEFAULTS.ON_LOSS_INCREASE,
      stopOnProfit: GAME_CONTROLS_DEFAULTS.STOP_ON_PROFIT,
      stopOnLoss: GAME_CONTROLS_DEFAULTS.STOP_ON_LOSS,
    }),
  selectChip: (chip) =>
    set((state) => ({ selectedChip: state.selectedChip === chip ? null : chip })),
  clearTable: () => set({ selectedChip: null }),
  undo: () => {},
  autoPick: () => {},
}));

export const useGameControlsStore = Object.assign(
  function useGameControlsStore<T>(selector: (s: GameControlsState) => T): T {
    return useGameControlsStoreRaw(selector);
  },
  { getState: useGameControlsStoreRaw.getState, setState: useGameControlsStoreRaw.setState }
);
