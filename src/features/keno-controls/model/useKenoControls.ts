import { useShallow } from 'zustand/react/shallow';
import { GAME_PANEL_TAB } from '@/shared/config';
import { useNumberOfBets } from '@/shared/hooks/useNumberOfBets';
import { KENO_DEFAULTS } from './constants';
import { useKenoStore } from './kenoStore';

export function useKenoControls() {
  const {
    activeTab,
    betAmount,
    balance,
    risk,
    numberOfBets,
    isBetActive,
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
  } = useKenoStore(
    useShallow((state) => ({
      activeTab: state.activeTab,
      betAmount: state.betAmount,
      balance: state.balance,
      risk: state.risk,
      numberOfBets: state.numberOfBets,
      isBetActive: state.isBetActive,
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
    }))
  );

  const { handleNumberOfBetsChange, handleInfinityClick } = useNumberOfBets(
    setNumberOfBets,
    KENO_DEFAULTS.NUMBER_OF_BETS
  );

  const isAutoMode = activeTab === GAME_PANEL_TAB.AUTO;
  const isActionButtonDisabled =
    !isBetActive || parseFloat(betAmount) <= 0 || isNaN(parseFloat(betAmount));

  return {
    activeTab,
    betAmount,
    balance,
    risk,
    numberOfBets,
    isBetActive,
    isAutoMode,
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
  };
}
