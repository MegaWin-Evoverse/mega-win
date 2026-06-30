export const AUTO_BET_MODE = {
  RESET: 'Reset',
  INCREASE: 'Increase By',
} as const;

export type AutoBetMode = (typeof AUTO_BET_MODE)[keyof typeof AUTO_BET_MODE];

export const AUTO_BET_MODE_ITEMS = [
  { value: AUTO_BET_MODE.RESET, label: AUTO_BET_MODE.RESET },
  { value: AUTO_BET_MODE.INCREASE, label: AUTO_BET_MODE.INCREASE },
] as const;

export const AUTO_BET_LABELS = {
  ON_WIN: 'On Win',
  ON_LOSS: 'On Loss',
  STOP_ON_PROFIT: 'Stop on Profit',
  STOP_ON_LOSS: 'Stop on Loss',
  CONFIGURE: 'Configure',
  CONFIGURE_TITLE: 'Configure Auto Bet',
  APPLY: 'Apply',
  RESET_ALL: 'Reset all',
  PERCENT_SUFFIX: '%',
} as const;
