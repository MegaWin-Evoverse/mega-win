import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { parseChipValue } from './constants';
import type { BetResult, HistoryEntry, PlacedBet } from './types';

const BET_HISTORY_MAX = 10;

interface RouletteState {
  placedBet: number;
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
  autoBetCount: number;
  placeBetOnZone: (type: PlacedBet['type'], key: string, label: string, chip: string) => void;
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
      placedBet: 0,
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
      autoBetCount: 0,

      placeBetOnZone: (type, key, label, chip) => {
        if (!chip) return;
        const { placedBets } = get();
        const chipAmount = parseChipValue(chip);
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

      startAutoBet: (count) =>
        set({ isAutoRunning: true, autoBetsRemaining: count, autoBetCount: count }),

      decrementAutoBet: () =>
        set((state) => ({ autoBetsRemaining: Math.max(0, state.autoBetsRemaining - 1) })),

      stopAutoBet: () => set({ isAutoRunning: false, autoBetsRemaining: 0, autoBetCount: 0 }),
    }),
    {
      name: 'roulette-storage',
      partialize: (state) => ({
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
