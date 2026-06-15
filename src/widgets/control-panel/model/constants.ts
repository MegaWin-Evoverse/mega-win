import {
  type Game,
  GAME,
  KENO_RISK_OPTIONS,
  PLINKO_RISK_OPTIONS,
  type RiskOption,
} from '@/entities/game';
import { TABLE_ACTIONS, type TableActionsVariant } from '@/features/table-actions';

const BET_LABELS = {
  BET: 'Bet',
  START_AUTO_BET: 'Start Auto-Bet',
  START_AUTOBET: 'Start autobet',
} as const;

interface ControlPanelClassNames {
  betAmountField?: string;
  actionButton?: string;
  risk?: string;
  rows?: string;
  chips?: string;
  betSummary?: string;
  profitSection?: string;
  numberOfBetsSection?: string;
  autoBetSummarySection?: string;
  configureSection?: string;
  tableActionsSection?: string;
}

// Per-game LAYOUT config: which feature-blocks the panel renders and how they are
// positioned. State lives in entities/game; this file only describes composition.
interface ControlPanelConfig {
  showBetAmount: boolean;
  riskOptions: readonly RiskOption[] | null;
  showRows: boolean;
  showProfitOnWin: boolean;
  showNumberOfBets: boolean;
  showAutoBetSummary: boolean;
  showConfigure: boolean;
  showChips: boolean;
  tableActions: TableActionsVariant | null;
  requiresBet: boolean;
  betLabels: { manual: string; auto: string };
  classNames: ControlPanelClassNames;
}

export const CONTROL_PANEL_CONFIG: Record<Game, ControlPanelConfig> = {
  [GAME.DICE]: {
    showBetAmount: true,
    riskOptions: null,
    showRows: false,
    showProfitOnWin: true,
    showNumberOfBets: true,
    showAutoBetSummary: true,
    showConfigure: true,
    showChips: false,
    tableActions: null,
    requiresBet: true,
    betLabels: { manual: BET_LABELS.BET, auto: BET_LABELS.START_AUTO_BET },
    classNames: {
      betAmountField: 'order-3 lg:order-none lg:mt-8',
      actionButton: 'lg:mt-3',
      profitSection: 'order-4 lg:order-none',
      numberOfBetsSection: 'order-4 lg:order-none',
      autoBetSummarySection: 'order-5 lg:order-none',
      configureSection: 'order-2 lg:order-none',
    },
  },
  [GAME.KENO]: {
    showBetAmount: true,
    riskOptions: KENO_RISK_OPTIONS,
    showRows: false,
    showProfitOnWin: false,
    showNumberOfBets: true,
    showAutoBetSummary: false,
    showConfigure: false,
    showChips: false,
    tableActions: TABLE_ACTIONS.KENO,
    requiresBet: true,
    betLabels: { manual: BET_LABELS.BET, auto: BET_LABELS.BET },
    classNames: {
      betAmountField: 'order-3 lg:order-none lg:mt-8',
      actionButton: 'lg:mt-3',
      risk: 'order-4 lg:order-none lg:mt-4',
      numberOfBetsSection: 'order-5 lg:order-none',
      tableActionsSection: 'order-2 lg:order-none lg:mt-6',
    },
  },
  [GAME.PLINKO]: {
    showBetAmount: true,
    riskOptions: PLINKO_RISK_OPTIONS,
    showRows: true,
    showProfitOnWin: false,
    showNumberOfBets: true,
    showAutoBetSummary: false,
    showConfigure: false,
    showChips: false,
    tableActions: null,
    requiresBet: true,
    betLabels: { manual: BET_LABELS.BET, auto: BET_LABELS.START_AUTOBET },
    classNames: {
      betAmountField: 'order-3 lg:order-none lg:mt-8',
      actionButton: 'lg:mt-6',
      risk: 'order-4 lg:order-none lg:mt-4',
      rows: 'order-5 lg:order-none lg:mt-4',
      numberOfBetsSection: 'order-6 lg:order-none',
    },
  },
  [GAME.ROULETTE]: {
    showBetAmount: false,
    riskOptions: null,
    showRows: false,
    showProfitOnWin: false,
    showNumberOfBets: true,
    showAutoBetSummary: false,
    showConfigure: false,
    showChips: true,
    tableActions: TABLE_ACTIONS.ROULETTE,
    requiresBet: false,
    betLabels: { manual: BET_LABELS.BET, auto: BET_LABELS.BET },
    classNames: {
      actionButton: 'lg:mt-3',
      betSummary: 'order-3 lg:order-none lg:mt-8',
      chips: 'order-4 lg:order-none lg:mt-6',
      numberOfBetsSection: 'order-5 lg:order-none',
      tableActionsSection: 'order-2 lg:order-none',
    },
  },
};
