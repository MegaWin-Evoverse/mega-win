'use client';
import { useState } from 'react';
import { useShallow } from 'zustand/react/shallow';
import { useGameControlsStore, GAME_CONTROLS_DEFAULTS } from '@/entities/game';
import { AUTO_BET_MODE, type AutoBetMode } from './constants';

interface UseConfigureAutoBetReturn {
  onWinMode: AutoBetMode;
  onWinIncrease: string;
  onLossMode: AutoBetMode;
  onLossIncrease: string;
  stopOnProfit: string;
  stopOnLoss: string;
  setOnWinMode: (mode: AutoBetMode) => void;
  setOnWinIncrease: (value: string) => void;
  setOnLossMode: (mode: AutoBetMode) => void;
  setOnLossIncrease: (value: string) => void;
  setStopOnProfit: (value: string) => void;
  setStopOnLoss: (value: string) => void;
  handleApply: () => void;
  handleResetAll: () => void;
}

export function useConfigureAutoBet(onClose: () => void): UseConfigureAutoBetReturn {
  const stored = useGameControlsStore(
    useShallow((state) => ({
      onWinMode: state.onWinMode as AutoBetMode,
      onWinIncrease: state.onWinIncrease,
      onLossMode: state.onLossMode as AutoBetMode,
      onLossIncrease: state.onLossIncrease,
      stopOnProfit: state.stopOnProfit,
      stopOnLoss: state.stopOnLoss,
    }))
  );

  const [onWinMode, setOnWinMode] = useState<AutoBetMode>(stored.onWinMode);
  const [onWinIncrease, setOnWinIncrease] = useState(stored.onWinIncrease);
  const [onLossMode, setOnLossMode] = useState<AutoBetMode>(stored.onLossMode);
  const [onLossIncrease, setOnLossIncrease] = useState(stored.onLossIncrease);
  const [stopOnProfit, setStopOnProfit] = useState(stored.stopOnProfit);
  const [stopOnLoss, setStopOnLoss] = useState(stored.stopOnLoss);

  const applyAutoBetConfig = useGameControlsStore((state) => state.applyAutoBetConfig);
  const resetAutoBetConfig = useGameControlsStore((state) => state.resetAutoBetConfig);

  function handleApply() {
    applyAutoBetConfig({
      onWinMode,
      onWinIncrease,
      onLossMode,
      onLossIncrease,
      stopOnProfit,
      stopOnLoss,
    });
    onClose();
  }

  function handleResetAll() {
    setOnWinMode(AUTO_BET_MODE.RESET);
    setOnWinIncrease(GAME_CONTROLS_DEFAULTS.ON_WIN_INCREASE);
    setOnLossMode(AUTO_BET_MODE.RESET);
    setOnLossIncrease(GAME_CONTROLS_DEFAULTS.ON_LOSS_INCREASE);
    setStopOnProfit(GAME_CONTROLS_DEFAULTS.STOP_ON_PROFIT);
    setStopOnLoss(GAME_CONTROLS_DEFAULTS.STOP_ON_LOSS);
    resetAutoBetConfig();
  }

  return {
    onWinMode,
    onWinIncrease,
    onLossMode,
    onLossIncrease,
    stopOnProfit,
    stopOnLoss,
    setOnWinMode,
    setOnWinIncrease,
    setOnLossMode,
    setOnLossIncrease,
    setStopOnProfit,
    setStopOnLoss,
    handleApply,
    handleResetAll,
  };
}
