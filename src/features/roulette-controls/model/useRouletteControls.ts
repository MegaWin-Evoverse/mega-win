import { useShallow } from 'zustand/react/shallow';
import { GAME_PANEL_TAB } from '@/shared/config';
import { useNumberOfBets } from '@/shared/hooks/useNumberOfBets';
import { ROULETTE_DEFAULTS } from './constants';
import { useRouletteStore } from './rouletteStore';

export function useRouletteControls() {
  const {
    activeTab,
    selectedChip,
    placedBet,
    balance,
    numberOfBets,
    isBetActive,
    setTab,
    selectChip,
    setNumberOfBets,
    clearTable,
    undo,
  } = useRouletteStore(
    useShallow((state) => ({
      activeTab: state.activeTab,
      selectedChip: state.selectedChip,
      placedBet: state.placedBet,
      balance: state.balance,
      numberOfBets: state.numberOfBets,
      isBetActive: state.isBetActive,
      setTab: state.setTab,
      selectChip: state.selectChip,
      setNumberOfBets: state.setNumberOfBets,
      clearTable: state.clearTable,
      undo: state.undo,
    }))
  );

  const { handleNumberOfBetsChange, handleInfinityClick } = useNumberOfBets(
    setNumberOfBets,
    ROULETTE_DEFAULTS.NUMBER_OF_BETS
  );

  const isAutoMode = activeTab === GAME_PANEL_TAB.AUTO;

  return {
    activeTab,
    selectedChip,
    placedBet,
    balance,
    numberOfBets,
    isBetActive,
    isAutoMode,
    setTab,
    selectChip,
    clearTable,
    undo,
    handleNumberOfBetsChange,
    handleInfinityClick,
  };
}
