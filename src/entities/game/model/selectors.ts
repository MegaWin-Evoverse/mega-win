import { BET_AMOUNT_DECIMALS, GAME_PANEL_TAB } from '@/shared/config';
import { GAME_CONTROLS_DEFAULTS } from './constants';
import type { GameControlsState } from './store';

export function selectIsAutoMode(state: GameControlsState): boolean {
  return state.activeTab === GAME_PANEL_TAB.AUTO;
}

export function selectProfitOnWin(state: GameControlsState): string {
  const amount = Number.parseFloat(state.betAmount) || 0;
  const profit = amount * GAME_CONTROLS_DEFAULTS.PROFIT_MULTIPLIER;
  return profit > 0
    ? profit.toFixed(BET_AMOUNT_DECIMALS)
    : GAME_CONTROLS_DEFAULTS.PROFIT_ON_WIN_TEXT;
}
