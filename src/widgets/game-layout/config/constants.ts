export const GAME_PANEL_TAB = {
  MANUAL: 'manual',
  AUTO: 'auto',
} as const;

export type GamePanelTab = (typeof GAME_PANEL_TAB)[keyof typeof GAME_PANEL_TAB];

export const GAME_PANEL_LABELS = {
  MANUAL: 'Manual',
  AUTO: 'Auto',
  BET_AMOUNT: 'Bet Amount',
  BET: 'Bet',
  HALF: '1/2',
  DOUBLE: '2X',
  MAX: 'MAX',
} as const;

export const GAME_PANEL_DEFAULTS = {
  BALANCE: 4593.24,
  BET_AMOUNT_TEXT: '0.00',
} as const;

export const BET_AMOUNT_STEP = {
  HALF: 0.5,
  DOUBLE: 2,
} as const;

export const BET_AMOUNT_DECIMALS = 2;

export const COIN_ICON = {
  SRC: '/icons/coin-1.svg',
  ALT: 'Coin',
  SIZE_BALANCE: 20,
  SIZE_INPUT: 16,
} as const;
