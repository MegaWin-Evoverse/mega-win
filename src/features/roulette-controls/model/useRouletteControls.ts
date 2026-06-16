import { useShallow } from 'zustand/react/shallow';
import { GAME_PANEL_TAB } from '@/shared/config';
import { ROULETTE_DEFAULTS } from './constants';
import { useRouletteStore } from './rouletteStore';

const DIGITS_ONLY = /\D/g;

export function useRouletteControls() {
  const {
    activeTab,
    selectedChip,
    placedBet,
    numberOfBets,
    isBetActive,
    isSpinning,
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
      numberOfBets: state.numberOfBets,
      isBetActive: state.isBetActive,
      isSpinning: state.isSpinning,
      setTab: state.setTab,
      selectChip: state.selectChip,
      setNumberOfBets: state.setNumberOfBets,
      clearTable: state.clearTable,
      undo: state.undo,
    }))
  );

  function handleNumberOfBetsChange(value: string) {
    setNumberOfBets(value.replace(DIGITS_ONLY, ''));
  }

  function handleInfinityClick() {
    setNumberOfBets(ROULETTE_DEFAULTS.NUMBER_OF_BETS);
  }

  const isAutoMode = activeTab === GAME_PANEL_TAB.AUTO;

  return {
    activeTab,
    selectedChip,
    placedBet,
    numberOfBets,
    isBetActive,
    isSpinning,
    isAutoMode,
    setTab,
    selectChip,
    clearTable,
    undo,
    handleNumberOfBetsChange,
    handleInfinityClick,
  };
}
