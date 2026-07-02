import { useShallow } from 'zustand/react/shallow';
import { useGameControlsStore } from '@/entities/game';
import { useUserQuery } from '@/entities/user';

interface UseBetAmountReturn {
  betAmount: string;
  isInputDisabled: boolean;
  setBetAmount: (value: string) => void;
  onBetBlur: () => void;
  betHalf: () => void;
  betDouble: () => void;
  betMax: () => void;
}

export function useBetAmount(): UseBetAmountReturn {
  const { data: user } = useUserQuery();
  const isAuthenticated = user !== undefined;

  const storeValues = useGameControlsStore(
    useShallow((state) => ({
      betAmount: state.betAmount,
      setBetAmount: state.setBetAmount,
      onBetBlur: state.normalizeBetAmount,
      betHalf: state.betHalf,
      betDouble: state.betDouble,
      betMax: state.betMax,
    }))
  );

  return { ...storeValues, isInputDisabled: !isAuthenticated };
}
