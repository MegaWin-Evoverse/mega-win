import { useShallow } from 'zustand/react/shallow';

import { GAME_PANEL_TAB } from '@/shared/config';
import { useNumberOfBets } from '@/shared/lib/hooks/use-number-of-bets';
import { DICE_DEFAULTS, DICE_LABELS } from '../config/constants';
import { useDiceStore, selectProfitOnWin } from './diceStore';

export function useDiceControls() {
  const {
    activeTab,
    betAmount,
    balance,
    numberOfBets,
    onWinMode,
    onLossMode,
    stopOnProfit,
    stopOnLoss,
    isBetActive,
    setTab,
    setBetAmount,
    normalizeBetAmount,
    setNumberOfBets,
    betHalf,
    betDouble,
    betMax,
  } = useDiceStore(
    useShallow((state) => ({
      activeTab: state.activeTab,
      betAmount: state.betAmount,
      balance: state.balance,
      numberOfBets: state.numberOfBets,
      onWinMode: state.onWinMode,
      onLossMode: state.onLossMode,
      stopOnProfit: state.stopOnProfit,
      stopOnLoss: state.stopOnLoss,
      isBetActive: state.isBetActive,
      setTab: state.setTab,
      setBetAmount: state.setBetAmount,
      normalizeBetAmount: state.normalizeBetAmount,
      setNumberOfBets: state.setNumberOfBets,
      betHalf: state.betHalf,
      betDouble: state.betDouble,
      betMax: state.betMax,
    }))
  );
  const profitOnWin = useDiceStore(selectProfitOnWin);

  const { handleNumberOfBetsChange, handleInfinityClick } = useNumberOfBets(
    setNumberOfBets,
    DICE_DEFAULTS.NUMBER_OF_BETS
  );

  const isAutoMode = activeTab === GAME_PANEL_TAB.AUTO;
  const actionButtonLabel = isAutoMode ? DICE_LABELS.START_AUTO_BET : DICE_LABELS.BET;

  const isActionButtonDisabled =
    (!isAutoMode && !isBetActive) || parseFloat(betAmount) <= 0 || isNaN(parseFloat(betAmount));

  return {
    activeTab,
    betAmount,
    balance,
    profitOnWin,
    numberOfBets,
    onWinMode,
    onLossMode,
    stopOnProfit,
    stopOnLoss,
    isAutoMode,
    actionButtonLabel,
    isActionButtonDisabled,
    setTab,
    setBetAmount,
    betHalf,
    betDouble,
    betMax,
    handleNumberOfBetsChange,
    handleInfinityClick,
    onBetBlur: normalizeBetAmount,
  };
}
