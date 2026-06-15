import type { GamePanelTab } from '@/shared/config';
import type { Risk } from './constants';

// --- Shared blocks (present for every game) ---
interface TabsState {
  activeTab: GamePanelTab;
  isAutoMode: boolean;
  setTab: (tab: GamePanelTab) => void;
}

interface BetButtonState {
  actionButtonLabel: string;
  isActionButtonDisabled: boolean;
}

interface NumberOfBetsState {
  numberOfBets: string;
  onNumberOfBetsChange: (value: string) => void;
  onInfinityClick: () => void;
}

interface BetAmountState {
  betAmount: string;
  balance: number;
  setBetAmount: (value: string) => void;
  onBetBlur: () => void;
  betHalf: () => void;
  betDouble: () => void;
  betMax: () => void;
}

// --- Game-specific blocks ---
interface RiskState {
  risk: Risk;
  setRisk: (risk: Risk) => void;
}

interface RowsState {
  rows: number;
  setRows: (value: number | readonly number[]) => void;
}

interface ProfitState {
  profitOnWin: string;
}

interface AutoBetSummaryState {
  onWinMode: string;
  onLossMode: string;
  stopOnProfit: string;
  stopOnLoss: string;
}

interface KenoActionsState {
  clearTable: () => void;
  autoPick: () => void;
}

interface RouletteChipState {
  selectedChip: string | null;
  placedBet: number;
  selectChip: (chip: string) => void;
  clearTable: () => void;
  undo: () => void;
}

// --- Per-game contracts: exactly what each game must wire into the panel.
// Re-add `export` (+ index) for a given game once its real logic is implemented. ---
type DiceControlPanelState = TabsState &
  BetButtonState &
  NumberOfBetsState &
  BetAmountState &
  ProfitState &
  AutoBetSummaryState;

type KenoControlPanelState = TabsState &
  BetButtonState &
  NumberOfBetsState &
  BetAmountState &
  RiskState &
  KenoActionsState;

type PlinkoControlPanelState = TabsState &
  BetButtonState &
  NumberOfBetsState &
  BetAmountState &
  RiskState &
  RowsState;

type RouletteControlPanelState = TabsState & BetButtonState & NumberOfBetsState & RouletteChipState;

// Public contract — each game implements exactly one of these.
export type ControlPanelState =
  | DiceControlPanelState
  | KenoControlPanelState
  | PlinkoControlPanelState
  | RouletteControlPanelState;

// Internal render view: the panel reads blocks gated by CONTROL_PANEL_CONFIG[game],
// which guarantees the fields that game's state actually carries.
export type ControlPanelRenderState = TabsState &
  BetButtonState &
  NumberOfBetsState &
  BetAmountState &
  RiskState &
  RowsState &
  ProfitState &
  AutoBetSummaryState &
  KenoActionsState &
  RouletteChipState;
