import { useShallow } from 'zustand/react/shallow';
import { useGameControlsStore, selectIsAutoMode } from '@/entities/game';
import { useUserQuery } from '@/entities/user';

interface UseBetButtonReturn {
  isAutoMode: boolean;
  canBet: boolean;
}

export function useBetButton(requiresBet: boolean): UseBetButtonReturn {
  const { data: user } = useUserQuery();
  const isAuthenticated = user !== undefined;

  const { isAutoMode, isBetActive, betAmount, balance, selectedChip } = useGameControlsStore(
    useShallow((state) => ({
      isAutoMode: selectIsAutoMode(state),
      isBetActive: state.isBetActive,
      betAmount: state.betAmount,
      balance: state.balance,
      selectedChip: state.selectedChip,
    }))
  );

  if (!isAuthenticated) {
    return { isAutoMode, canBet: false };
  }

  const parsedBet = Number.parseFloat(betAmount);
  const hasBalance = balance > 0;
  const canBet = requiresBet
    ? hasBalance && (isAutoMode || isBetActive) && parsedBet > 0 && !Number.isNaN(parsedBet)
    : hasBalance && selectedChip !== null;

  return { isAutoMode, canBet };
}
