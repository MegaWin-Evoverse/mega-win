export const EXCHANGE_MESSAGES = {
  SUCCESS: 'Points exchanged successfully',
  ERROR_GENERIC: 'Failed to exchange points',
  INVALID_AMOUNT: 'Please enter a valid amount',
  INSUFFICIENT_FUNDS: 'Insufficient Watch Points',
} as const;

export const EXCHANGE_UI_TEXT = {
  TITLE: 'Points exchange',
  DESCRIPTION:
    'Convert your Watch Points into Game Points to earn rewards and enhance your gameplay.',
  CLOSE_ARIA_LABEL: 'Close form',
  WATCH_POINT_NAME: 'Watch point',
  WATCH_POINT_ALT: 'Watch Point',
  GAME_POINT_NAME: 'Game point',
  GAME_POINT_ALT: 'Game Point',
  YOU_GIVE_LABEL: 'You give',
  YOU_RECEIVE_LABEL: 'You will receive',
  BALANCE_LABEL: 'Balance',
  BUTTON_CONFIRM: 'Confirm',
  BUTTON_CONFIRMING: 'Confirming...',
} as const;

export const EXCHANGE_FORM_FIELDS = {
  AMOUNT: 'amount',
} as const;

export const EXCHANGE_IMAGE = {
  SRC: '/two-coins.webp',
  ALT: 'Points Exchange',
  SIZE: 120,
} as const;

export const EXCHANGE_RATE = {
  WATCH: 1,
  GAME: 1,
} as const;
