import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { GAME_PANEL_TAB, type GamePanelTab } from '@/shared/config';
import { ROULETTE_DEFAULTS, parseChipValue } from './constants';
import type { BetResult, HistoryEntry, PlacedBet } from './types';

const BET_HISTORY_MAX = 10;

interface RouletteState {
  activeTab: GamePanelTab;
  selectedChip: string | null;
  placedBet: number;
  numberOfBets: string;
  isBetActive: boolean;
  placedBets: PlacedBet[];
  lastResult: number | null;
  betResult: BetResult | null;
  pendingBetResult: BetResult | null;
  betHistory: HistoryEntry[];
  nextHistoryId: number;
  isSpinning: boolean;
  isAutoRunning: boolean;
  autoBetsRemaining: number;
  setTab: (tab: GamePanelTab) => void;
  selectChip: (chip: string | null) => void;
  setNumberOfBets: (bets: string) => void;
  placeBetOnZone: (type: PlacedBet['type'], key: string, label: string) => void;
  clearTable: () => void;
  undo: () => void;
  setLastResult: (position: number) => void;
  setBetResult: (result: BetResult | null) => void;
  setPendingBetResult: (result: BetResult | null) => void;
  resolveBetResult: () => void;
  setSpinning: (spinning: boolean) => void;
  startAutoBet: (count: number) => void;
  decrementAutoBet: () => void;
  stopAutoBet: () => void;
}

const useRouletteStoreRaw = create<RouletteState>()(
  persist(
    (set, get) => ({
      activeTab: GAME_PANEL_TAB.MANUAL,
      selectedChip: null,
      placedBet: 0,
      numberOfBets: ROULETTE_DEFAULTS.NUMBER_OF_BETS,
      isBetActive: false,
      placedBets: [],
      lastResult: null,
      betResult: null,
      pendingBetResult: null,
      betHistory: [],
      nextHistoryId: 1,
      isSpinning: false,
      isAutoRunning: false,
      autoBetsRemaining: 0,

      setTab: (activeTab) => set({ activeTab }),

      selectChip: (selectedChip) => set({ selectedChip }),

      setNumberOfBets: (numberOfBets) => set({ numberOfBets }),

      placeBetOnZone: (type, key, label) => {
        const { selectedChip, placedBets } = get();
        if (!selectedChip) return;

        const chipAmount = parseChipValue(selectedChip);
        const existing = placedBets.find((b) => b.key === key);
        const updated = existing
          ? placedBets.map((b) => (b.key === key ? { ...b, amount: b.amount + chipAmount } : b))
          : [...placedBets, { type, key, amount: chipAmount, label }];

        const newTotal = updated.reduce((sum, b) => sum + b.amount, 0);
        set({ placedBets: updated, placedBet: newTotal, isBetActive: true });
      },

      clearTable: () =>
        set({
          placedBets: [],
          placedBet: 0,
          selectedChip: null,
          isBetActive: false,
        }),

      undo: () => {
        const { placedBets } = get();
        if (placedBets.length === 0) return;
        const updated = placedBets.slice(0, -1);
        const newTotal = updated.reduce((sum, b) => sum + b.amount, 0);
        set({ placedBets: updated, placedBet: newTotal, isBetActive: updated.length > 0 });
      },

      setLastResult: (position) => set({ lastResult: position }),

      setBetResult: (betResult) => set({ betResult }),

      setPendingBetResult: (pendingBetResult) => set({ pendingBetResult }),

      resolveBetResult: () => {
        const { pendingBetResult } = get();
        if (pendingBetResult) {
          set((state) => ({
            betResult: pendingBetResult,
            pendingBetResult: null,
            nextHistoryId: state.nextHistoryId + 1,
            betHistory: [
              { id: state.nextHistoryId, position: pendingBetResult.position },
              ...state.betHistory,
            ].slice(0, BET_HISTORY_MAX),
          }));
        }
      },

      setSpinning: (spinning) => set({ isSpinning: spinning }),

      startAutoBet: (count) => set({ isAutoRunning: true, autoBetsRemaining: count }),

      decrementAutoBet: () =>
        set((state) => ({ autoBetsRemaining: Math.max(0, state.autoBetsRemaining - 1) })),

      stopAutoBet: () => set({ isAutoRunning: false, autoBetsRemaining: 0 }),
    }),
    {
      name: 'roulette-storage',
      partialize: (state) => ({
        selectedChip: state.selectedChip,
        placedBets: state.placedBets,
        placedBet: state.placedBet,
        isBetActive: state.isBetActive,
      }),
    }
  )
);

export function useRouletteStore<T>(selector: (state: RouletteState) => T): T {
  return useRouletteStoreRaw(selector);
}
