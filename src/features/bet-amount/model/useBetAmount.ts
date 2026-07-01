import { useShallow } from 'zustand/react/shallow';
import { useGameControlsStore } from '@/entities/game';
import { playSound, type SoundName } from '@/shared/lib/playSound';
import { useUserQuery } from '@/entities/user';

interface UseBetAmountReturn {
  betAmount: string;
  balance: number;
  isInputDisabled: boolean;
  setBetAmount: (value: string) => void;
  onBetBlur: () => void;
  betHalf: () => void;
  betDouble: () => void;
  betMax: () => void;
}

export function useBetAmount(quickBetSound: SoundName = 'tick'): UseBetAmountReturn {
  const {
    betAmount,
    balance,
    setBetAmount,
    onBetBlur,
    betHalf: betHalfStore,
    betDouble: betDoubleStore,
    betMax: betMaxStore,
  } = useGameControlsStore(
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

  const { data: user } = useUserQuery();
  const isAuthenticated = user !== undefined;

  function betHalf() {
    playSound(quickBetSound);
    betHalfStore();
  }

  function betDouble() {
    playSound(quickBetSound);
    betDoubleStore();
  }

  function betMax() {
    playSound(quickBetSound);
    betMaxStore();
  }

  return {
    betAmount,
    balance,
    setBetAmount,
    onBetBlur,
    betHalf,
    betDouble,
    betMax,
    isInputDisabled: !isAuthenticated,
  };
}
