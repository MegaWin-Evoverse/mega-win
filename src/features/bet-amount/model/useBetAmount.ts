import { useShallow } from 'zustand/react/shallow';
import { useGameControlsStore } from '@/entities/game';

interface UseBetAmountReturn {
  betAmount: string;
  balance: number;
  setBetAmount: (value: string) => void;
  onBetBlur: () => void;
  betHalf: () => void;
  betDouble: () => void;
  betMax: () => void;
}

export function useBetAmount(): UseBetAmountReturn {
  return useGameControlsStore(
    useShallow((state) => ({
      betAmount: state.betAmount,
      balance: state.balance,
      setBetAmount: state.setBetAmount,
      onBetBlur: state.normalizeBetAmount,
      betHalf: state.betHalf,
      betDouble: state.betDouble,
      betMax: state.betMax,
    }))
  );
}
