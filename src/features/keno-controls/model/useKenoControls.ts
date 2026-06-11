import { useShallow } from 'zustand/react/shallow';

import { GAME_PANEL_TAB } from '@/shared/config';
import { useNumberOfBets } from '@/shared/lib/hooks/use-number-of-bets';
import { KENO_DEFAULTS, KENO_GAME_PHASE } from '../config/constants';
import { useKenoStore } from './kenoStore';

export function useKenoControls() {
  const {
    activeTab,
    betAmount,
    balance,
    risk,
    numberOfBets,
    selectedNumbers,
    gamePhase,
    setTab,
    setBetAmount,
    setRisk,
    setNumberOfBets,
    betHalf,
    betDouble,
    betMax,
    clearTable,
    autoPick,
    normalizeBetAmount,
    startGame,
  } = useKenoStore(
    useShallow((state) => ({
      activeTab: state.activeTab,
      betAmount: state.betAmount,
      balance: state.balance,
      risk: state.risk,
      numberOfBets: state.numberOfBets,
      selectedNumbers: state.selectedNumbers,
      gamePhase: state.gamePhase,
      setTab: state.setTab,
      setBetAmount: state.setBetAmount,
      setRisk: state.setRisk,
      setNumberOfBets: state.setNumberOfBets,
      betHalf: state.betHalf,
      betDouble: state.betDouble,
      betMax: state.betMax,
      clearTable: state.clearTable,
      autoPick: state.autoPick,
      normalizeBetAmount: state.normalizeBetAmount,
      startGame: state.startGame,
    }))
  );

  const { handleNumberOfBetsChange, handleInfinityClick } = useNumberOfBets(
    setNumberOfBets,
    KENO_DEFAULTS.NUMBER_OF_BETS
  );

  const isAutoMode = activeTab === GAME_PANEL_TAB.AUTO;
  const isInResultPhase = gamePhase === KENO_GAME_PHASE.RESULT;
  const isActionButtonDisabled =
    isInResultPhase ||
    selectedNumbers.length === 0 ||
    parseFloat(betAmount) <= 0 ||
    isNaN(parseFloat(betAmount));

  return {
    activeTab,
    betAmount,
    balance,
    risk,
    numberOfBets,
    selectedNumbers,
    gamePhase,
    isAutoMode,
    isInResultPhase,
    isActionButtonDisabled,
    setTab,
    setBetAmount,
    setRisk,
    betHalf,
    betDouble,
    betMax,
    clearTable,
    autoPick,
    handleNumberOfBetsChange,
    handleInfinityClick,
    onBetBlur: normalizeBetAmount,
    startGame,
  };
}
