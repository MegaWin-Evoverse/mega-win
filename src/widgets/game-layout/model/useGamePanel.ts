import { useCallback, useState } from 'react';

import {
  BET_AMOUNT_DECIMALS,
  BET_AMOUNT_STEP,
  GAME_PANEL_DEFAULTS,
  GAME_PANEL_TAB,
  type GamePanelTab,
} from '../config/constants';

interface UseGamePanelResult {
  activeTab: GamePanelTab;
  betAmount: string;
  balance: number;
  onTabChange: (tab: GamePanelTab) => void;
  onBetAmountChange: (value: string) => void;
  onBetHalf: () => void;
  onBetDouble: () => void;
  onBetMax: () => void;
  onBet: () => void;
}

function toBetText(value: number): string {
  return value.toFixed(BET_AMOUNT_DECIMALS);
}

export function useGamePanel(): UseGamePanelResult {
  const [activeTab, setActiveTab] = useState<GamePanelTab>(GAME_PANEL_TAB.MANUAL);
  const [betAmount, setBetAmount] = useState<string>(GAME_PANEL_DEFAULTS.BET_AMOUNT_TEXT);
  const balance = GAME_PANEL_DEFAULTS.BALANCE;

  const onTabChange = useCallback((tab: GamePanelTab) => setActiveTab(tab), []);

  const onBetAmountChange = useCallback((value: string) => setBetAmount(value), []);

  const onBetHalf = useCallback(() => {
    setBetAmount((previous) =>
      toBetText((Number.parseFloat(previous) || 0) * BET_AMOUNT_STEP.HALF)
    );
  }, []);

  const onBetDouble = useCallback(() => {
    setBetAmount((previous) =>
      toBetText((Number.parseFloat(previous) || 0) * BET_AMOUNT_STEP.DOUBLE)
    );
  }, []);

  const onBetMax = useCallback(() => setBetAmount(toBetText(balance)), [balance]);

  const onBet = useCallback(() => {}, []);

  return {
    activeTab,
    betAmount,
    balance,
    onTabChange,
    onBetAmountChange,
    onBetHalf,
    onBetDouble,
    onBetMax,
    onBet,
  };
}
