import { useShallow } from 'zustand/react/shallow';
import { GAME_PANEL_TAB } from '@/shared/config';
import { useNumberOfBets } from '@/shared/hooks/useNumberOfBets';
import { PLINKO_DEFAULTS, PLINKO_LABELS } from './constants';
import { usePlinkoStore } from './plinkoStore';

export function usePlinkoControls() {
  const {
    activeTab,
    betAmount,
    balance,
    risk,
    rows,
    numberOfBets,
    setTab,
    setBetAmount,
    setRisk,
    setRows,
    setNumberOfBets,
    betHalf,
    betDouble,
    betMax,
    normalizeBetAmount,
  } = usePlinkoStore(
    useShallow((state) => ({
      activeTab: state.activeTab,
      betAmount: state.betAmount,
      balance: state.balance,
      risk: state.risk,
      rows: state.rows,
      numberOfBets: state.numberOfBets,
      setTab: state.setTab,
      setBetAmount: state.setBetAmount,
      setRisk: state.setRisk,
      setRows: state.setRows,
      setNumberOfBets: state.setNumberOfBets,
      betHalf: state.betHalf,
      betDouble: state.betDouble,
      betMax: state.betMax,
      normalizeBetAmount: state.normalizeBetAmount,
    }))
  );

  function handleRowsChange(value: number | readonly number[]) {
    setRows(typeof value === 'number' ? value : value[0]);
  }

  const { handleNumberOfBetsChange, handleInfinityClick } = useNumberOfBets(
    setNumberOfBets,
    PLINKO_DEFAULTS.NUMBER_OF_BETS
  );

  const isAutoMode = activeTab === GAME_PANEL_TAB.AUTO;
  const actionButtonLabel = isAutoMode ? PLINKO_LABELS.START_AUTOBET : PLINKO_LABELS.BET;
  const isActionButtonDisabled = parseFloat(betAmount) <= 0 || isNaN(parseFloat(betAmount));

  return {
    activeTab,
    betAmount,
    balance,
    risk,
    rows,
    numberOfBets,
    isAutoMode,
    actionButtonLabel,
    isActionButtonDisabled,
    setTab,
    setBetAmount,
    setRisk,
    betHalf,
    betDouble,
    betMax,
    handleRowsChange,
    handleNumberOfBetsChange,
    handleInfinityClick,
    onBetBlur: normalizeBetAmount,
  };
}
