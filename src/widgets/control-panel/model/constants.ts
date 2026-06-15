export const GAME = {
  DICE: 'dice',
  KENO: 'keno',
  PLINKO: 'plinko',
  ROULETTE: 'roulette',
} as const;

export type Game = (typeof GAME)[keyof typeof GAME];

export const RISK = {
  CLASSIC: 'classic',
  LOW: 'low',
  MEDIUM: 'medium',
  HIGH: 'high',
} as const;

export type Risk = (typeof RISK)[keyof typeof RISK];

export interface RiskOption {
  value: Risk;
  label: string;
  className: string;
}

export const KENO_RISK_OPTIONS: readonly RiskOption[] = [
  { value: RISK.CLASSIC, label: 'Classic', className: 'text-risk-classic' },
  { value: RISK.LOW, label: 'Low', className: 'text-risk-low' },
  { value: RISK.MEDIUM, label: 'Medium', className: 'text-risk-medium' },
  { value: RISK.HIGH, label: 'High', className: 'text-risk-high' },
];

export const PLINKO_RISK_OPTIONS: readonly RiskOption[] = [
  { value: RISK.LOW, label: 'Low', className: 'text-risk-low' },
  { value: RISK.MEDIUM, label: 'Medium', className: 'text-risk-medium' },
  { value: RISK.HIGH, label: 'High', className: 'text-risk-high' },
];

export const PLINKO_ROWS = {
  MIN: 8,
  MAX: 16,
  DEFAULT: 8,
  STEP: 1,
} as const;

export const CHIP_NOMINALS = [
  '1',
  '5',
  '10',
  '25',
  '50',
  '100',
  '250',
  '500',
  '1K',
  '2K',
  '5K',
  '10K',
  '25K',
  '50K',
  '100K',
] as const;

export type ChipNominal = (typeof CHIP_NOMINALS)[number];

export const CHIP_BASE_COLOR = '#1b1f26';
export const CHIP_CORE_COLOR = '#151924';
export const CHIP_TEXT_COLOR = '#FDFDFD';

export const CHIP_STRIPES: Record<ChipNominal, string> = {
  '1': '#FFFFFF',
  '5': '#75D2FD',
  '10': '#018BCB',
  '25': '#FFBABA',
  '50': '#FF4D4D',
  '100': '#EC0303',
  '250': '#9CFFC5',
  '500': '#35FF89',
  '1K': '#35FF89',
  '2K': '#F3FF9C',
  '5K': '#B2C807',
  '10K': '#B2C807',
  '25K': '#CDB1FE',
  '50K': '#9A5FFF',
  '100K': '#6208FF',
};

export const CONTROL_PANEL_LABELS = {
  RISK: 'Risk',
  ROWS: 'Rows',
  PROFIT_ON_WIN: 'Profit on Win',
  ON_WIN: 'On Win',
  ON_LOSS: 'On Loss',
  STOP_ON_PROFIT: 'Stop on Profit',
  STOP_ON_LOSS: 'Stop on Loss',
  CONFIGURE: 'Configure',
  CLEAR_TABLE: 'Clear Table',
  AUTO_PICK: 'Auto Pick',
  CLEAR: 'Clear',
  UNDO: 'Undo',
  CHIP_VALUE: 'Chip Value',
  CHOOSE_ACTION: 'Choose action',
  COINS: 'COINS',
} as const;

export const TABLE_ACTIONS = {
  KENO: 'keno',
  ROULETTE: 'roulette',
} as const;

export type TableActionsVariant = (typeof TABLE_ACTIONS)[keyof typeof TABLE_ACTIONS];

// Shape of CONTROL_PANEL_CONFIG below — internal presentation config, used only in this file.
// Kept here (not in types.ts) on purpose: these describe THIS file's data, and types.ts already
// imports Risk/RiskOption/TableActionsVariant from here — moving them would create a
// constants <-> types import cycle. types.ts holds the per-game STATE contract; this holds the
// per-game LAYOUT config.
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
    classNames: {
      actionButton: 'lg:mt-3',
      betSummary: 'order-3 lg:order-none lg:mt-8',
      chips: 'order-4 lg:order-none lg:mt-6',
      numberOfBetsSection: 'order-5 lg:order-none',
      tableActionsSection: 'order-2 lg:order-none',
    },
  },
};
