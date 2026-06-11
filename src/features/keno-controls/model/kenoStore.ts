import { create } from 'zustand';
import { GAME_PANEL_TAB, type GamePanelTab } from '@/shared/config';
import {
  sanitizeBetInput,
  normalizeBetValue,
  calcHalfBet,
  calcDoubleBet,
  calcMaxBet,
} from '@/shared/lib/bet-amount';
import {
  KENO_DEFAULTS,
  KENO_GAME_PHASE,
  KENO_MAX_PICKS,
  KENO_DRAWS_COUNT,
  KENO_AUTO_PICK_COUNT,
  KENO_PAYOUTS,
  type KenoRisk,
  type KenoGamePhase,
} from '../config/constants';
import { shuffleSlice } from './shuffleSlice';

interface KenoState {
  activeTab: GamePanelTab;
  betAmount: string;
  balance: number;
  risk: KenoRisk;
  numberOfBets: string;
  selectedNumbers: number[];
  drawnNumbers: number[];
  gamePhase: KenoGamePhase;
  setTab: (tab: GamePanelTab) => void;
  setBetAmount: (amount: string) => void;
  normalizeBetAmount: () => void;
  setRisk: (risk: KenoRisk) => void;
  setNumberOfBets: (bets: string) => void;
  toggleNumber: (n: number) => void;
  startGame: () => void;
  dismissResult: () => void;
  betHalf: () => void;
  betDouble: () => void;
  betMax: () => void;
  clearTable: () => void;
  autoPick: () => void;
}

export const useKenoStore = create<KenoState>((set, get) => ({
  activeTab: GAME_PANEL_TAB.MANUAL,
  betAmount: KENO_DEFAULTS.BET_AMOUNT_TEXT,
  balance: KENO_DEFAULTS.BALANCE,
  risk: KENO_DEFAULTS.RISK,
  numberOfBets: KENO_DEFAULTS.NUMBER_OF_BETS,
  selectedNumbers: [],
  drawnNumbers: [],
  gamePhase: KENO_GAME_PHASE.IDLE,

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

  toggleNumber: (n) => {
    const { selectedNumbers, gamePhase } = get();
    if (gamePhase === KENO_GAME_PHASE.RESULT) return;

    if (selectedNumbers.includes(n)) {
      const updated = selectedNumbers.filter((x) => x !== n);
      set({
        selectedNumbers: updated,
        gamePhase: updated.length === 0 ? KENO_GAME_PHASE.IDLE : KENO_GAME_PHASE.PICKING,
      });
    } else if (selectedNumbers.length < KENO_MAX_PICKS) {
      set({
        selectedNumbers: [...selectedNumbers, n],
        gamePhase: KENO_GAME_PHASE.PICKING,
      });
    }
  },

  startGame: () => {
    const state = get();
    const { selectedNumbers, risk, betAmount, balance } = state;
    if (selectedNumbers.length === 0) return;

    const drawn = shuffleSlice(KENO_DRAWS_COUNT);
    const matchCount = drawn.filter((n) => selectedNumbers.includes(n)).length;
    const multiplier = KENO_PAYOUTS[risk][selectedNumbers.length - 1]?.[matchCount] ?? 0;
    const bet = parseFloat(betAmount) || 0;
    const winAmount = bet * multiplier;
    const newBalance = Math.max(0, parseFloat((balance - bet + winAmount).toFixed(2)));

    set({ drawnNumbers: drawn, gamePhase: KENO_GAME_PHASE.RESULT, balance: newBalance });
  },

  dismissResult: () => {
    set({ drawnNumbers: [], gamePhase: KENO_GAME_PHASE.PICKING });
  },

  betHalf: () => set((state) => ({ betAmount: calcHalfBet(state.betAmount) })),

  betDouble: () => set((state) => ({ betAmount: calcDoubleBet(state.betAmount, state.balance) })),

  betMax: () => set((state) => ({ betAmount: calcMaxBet(state.balance) })),

  clearTable: () => {
    set({ selectedNumbers: [], drawnNumbers: [], gamePhase: KENO_GAME_PHASE.IDLE });
  },

  autoPick: () => {
    const picked = shuffleSlice(KENO_AUTO_PICK_COUNT);
    set({ selectedNumbers: picked, drawnNumbers: [], gamePhase: KENO_GAME_PHASE.PICKING });
  },
}));
