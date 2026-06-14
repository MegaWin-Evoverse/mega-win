import { BET_AMOUNT_DECIMALS } from '@/shared/config';
import { DICE_DEFAULTS } from './constants';
import type { DiceState } from './diceStore';

export function selectProfitOnWin(state: DiceState): string {
  const amount = Number.parseFloat(state.betAmount) || 0;
  const profit = amount * DICE_DEFAULTS.MULTIPLIER;
  return profit > 0 ? profit.toFixed(BET_AMOUNT_DECIMALS) : DICE_DEFAULTS.PROFIT_ON_WIN_TEXT;
}
