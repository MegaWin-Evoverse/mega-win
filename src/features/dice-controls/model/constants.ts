import { GAME_BALANCE } from '@/shared/config';

export const DICE_DEFAULTS = {
  BALANCE: GAME_BALANCE,
  BET_AMOUNT_TEXT: '0.00',
  PROFIT_ON_WIN_TEXT: '0.00',
  NUMBER_OF_BETS: '10',
  ON_WIN: 'Auto',
  ON_LOSS: 'Auto',
  STOP_ON_PROFIT: '1.00',
  STOP_ON_LOSS: '1.00',
  MULTIPLIER: 1.41,
} as const;

export const DICE_LABELS = {
  PROFIT_ON_WIN: 'Profit on Win',
  ON_WIN: 'On Win',
  ON_LOSS: 'On Loss',
  STOP_ON_PROFIT: 'Stop on Profit',
  STOP_ON_LOSS: 'Stop on Loss',
  CONFIGURE: 'Configure',
  START_AUTO_BET: 'Start Auto-Bet',
  BET: 'Bet',
} as const;
