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
}

export const KENO_RISK_OPTIONS: readonly RiskOption[] = [
  { value: RISK.CLASSIC, label: 'Classic' },
  { value: RISK.LOW, label: 'Low' },
  { value: RISK.MEDIUM, label: 'Medium' },
  { value: RISK.HIGH, label: 'High' },
];

export const PLINKO_RISK_OPTIONS: readonly RiskOption[] = [
  { value: RISK.LOW, label: 'Low' },
  { value: RISK.MEDIUM, label: 'Medium' },
  { value: RISK.HIGH, label: 'High' },
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

export function getChipStripe(nominal: ChipNominal = CHIP_NOMINALS[0]): string {
  return CHIP_STRIPES[nominal];
}

export const GAME_CONTROLS_DEFAULTS = {
  BET_AMOUNT_TEXT: '0.00',
  PROFIT_ON_WIN_TEXT: '0.00',
  NUMBER_OF_BETS: '∞',
  ON_WIN: 'Auto',
  ON_LOSS: 'Auto',
  STOP_ON_PROFIT: '1.00',
  STOP_ON_LOSS: '1.00',
  PROFIT_MULTIPLIER: 1.41,
  BALANCE: 0,
} as const;

export type ApiRisk = 'LOW' | 'MEDIUM' | 'HIGH';

export const RISK_API_MAP: Record<Risk, ApiRisk> = {
  [RISK.CLASSIC]: 'LOW',
  [RISK.LOW]: 'LOW',
  [RISK.MEDIUM]: 'MEDIUM',
  [RISK.HIGH]: 'HIGH',
};

export const MULTIPLIER_TIER = {
  GREEN: 'green',
  YELLOW: 'yellow',
  ORANGE_LIGHT: 'orange-light',
  ORANGE: 'orange',
  RED: 'red',
} as const;

export type MultiplierTier = (typeof MULTIPLIER_TIER)[keyof typeof MULTIPLIER_TIER];

export const TIER_BG_CLASS: Record<MultiplierTier, string> = {
  [MULTIPLIER_TIER.GREEN]: 'bg-plinko-green',
  [MULTIPLIER_TIER.YELLOW]: 'bg-plinko-yellow',
  [MULTIPLIER_TIER.ORANGE_LIGHT]: 'bg-plinko-orange-light',
  [MULTIPLIER_TIER.ORANGE]: 'bg-plinko-orange',
  [MULTIPLIER_TIER.RED]: 'bg-plinko-red',
};
