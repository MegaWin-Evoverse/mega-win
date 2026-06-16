import { useEffect } from 'react';
import { useMutation } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import { toast } from 'sonner';
import { api } from '@/shared/api/client';
import { AUTO_BET_DELAY_MS, BET_TYPE } from './constants';
import type { BetResponse, PlacedBet } from './types';
import { useRouletteConfig } from './useRouletteConfig';
import { useRouletteStore } from './rouletteStore';

const ROULETTE_BET_PATH = '/games/house/roulette/bet';

const BET_ERROR_MESSAGES = {
  NO_BETS: 'Place at least one bet before spinning.',
  BELOW_MIN: (min: number) => `Minimum bet is ${min} coins.`,
  ABOVE_MAX: (max: number) => `Maximum bet is ${max} coins.`,
  UNAUTHORIZED: 'Please log in to place bets.',
  GENERIC: 'Failed to place bet. Please try again.',
} as const;

const HTTP_UNAUTHORIZED = 401;

interface StraightValue {
  straightNumber: number;
  amount: string;
}

interface HalfValue {
  half: string;
  amount: string;
}

interface ParityValue {
  parity: string;
  amount: string;
}

interface ColorValue {
  color: string;
  amount: string;
}

interface ColumnValue {
  column: string;
  amount: string;
}

interface DozenValue {
  dozen: string;
  amount: string;
}

// Bet types the backend accepts but the table UI does not yet place — always sent empty.
type UnsupportedBetValue = { amount: string };

interface BetParams {
  straightValues: StraightValue[];
  halfValues: HalfValue[];
  parityValues: ParityValue[];
  colorValues: ColorValue[];
  columnValues: ColumnValue[];
  dozenValues: DozenValue[];
  splitValues: UnsupportedBetValue[];
  cornerValues: UnsupportedBetValue[];
  streetValues: UnsupportedBetValue[];
  doubleStreetValues: UnsupportedBetValue[];
}

function createEmptyBetParams(): BetParams {
  return {
    straightValues: [],
    halfValues: [],
    parityValues: [],
    colorValues: [],
    columnValues: [],
    dozenValues: [],
    splitValues: [],
    cornerValues: [],
    streetValues: [],
    doubleStreetValues: [],
  };
}

function buildBetParams(placedBets: PlacedBet[]): BetParams {
  const params = createEmptyBetParams();

  for (const bet of placedBets) {
    const amount = bet.amount.toString();
    const [, value] = bet.key.split('-');

    if (bet.type === BET_TYPE.STRAIGHT) {
      params.straightValues.push({ straightNumber: parseInt(value, 10), amount });
    } else if (bet.type === BET_TYPE.HALF) {
      params.halfValues.push({ half: value, amount });
    } else if (bet.type === BET_TYPE.PARITY) {
      params.parityValues.push({ parity: value, amount });
    } else if (bet.type === BET_TYPE.COLOR) {
      params.colorValues.push({ color: value, amount });
    } else if (bet.type === BET_TYPE.COLUMN) {
      params.columnValues.push({ column: value, amount });
    } else if (bet.type === BET_TYPE.DOZEN) {
      params.dozenValues.push({ dozen: value, amount });
    }
  }

  return params;
}

export function useRouletteBet() {
  const placedBets = useRouletteStore((state) => state.placedBets);
  const placedBet = useRouletteStore((state) => state.placedBet);
  const betResult = useRouletteStore((state) => state.betResult);
  const isAutoRunning = useRouletteStore((state) => state.isAutoRunning);
  const autoBetsRemaining = useRouletteStore((state) => state.autoBetsRemaining);
  const setLastResult = useRouletteStore((state) => state.setLastResult);
  const setBetResult = useRouletteStore((state) => state.setBetResult);
  const setPendingBetResult = useRouletteStore((state) => state.setPendingBetResult);
  const setSpinning = useRouletteStore((state) => state.setSpinning);
  const clearTable = useRouletteStore((state) => state.clearTable);
  const startAutoBet = useRouletteStore((state) => state.startAutoBet);
  const decrementAutoBet = useRouletteStore((state) => state.decrementAutoBet);
  const stopAutoBet = useRouletteStore((state) => state.stopAutoBet);
  const { minBet, maxBet } = useRouletteConfig();

  const { mutate, isPending } = useMutation({
    mutationFn: async () => {
      const params = buildBetParams(placedBets);
      const response = await api.post<BetResponse>(ROULETTE_BET_PATH, { params });
      return response.data;
    },
    onMutate: () => {
      setBetResult(null);
      setPendingBetResult(null);
      setSpinning(true);
    },
    onSuccess: (data) => {
      setLastResult(data.randomPosition);
      setPendingBetResult({
        multiplier: data.multiplier,
        payout: data.payout,
        position: data.randomPosition,
      });
      setSpinning(false);
      // Bets always remain on the table after a spin so they can be repeated or adjusted;
      // the user can manually clear them anytime using the Clear button.
    },
    onError: (error) => {
      setSpinning(false);
      stopAutoBet();
      if (isAxiosError(error) && error.response?.status === HTTP_UNAUTHORIZED) {
        toast.error(BET_ERROR_MESSAGES.UNAUTHORIZED);
      } else {
        toast.error(BET_ERROR_MESSAGES.GENERIC);
      }
    },
  });

  function validateBet(): boolean {
    if (placedBets.length === 0) {
      toast.error(BET_ERROR_MESSAGES.NO_BETS);
      return false;
    }
    if (placedBet < minBet) {
      toast.error(BET_ERROR_MESSAGES.BELOW_MIN(minBet));
      return false;
    }
    if (placedBet > maxBet) {
      toast.error(BET_ERROR_MESSAGES.ABOVE_MAX(maxBet));
      return false;
    }
    return true;
  }

  function placeBet() {
    if (!validateBet()) return;
    mutate();
  }

  function startAuto(count: number) {
    if (!validateBet()) return;
    startAutoBet(count);
    mutate();
  }

  function stopAuto() {
    stopAutoBet();
    clearTable();
  }

  // Drive the auto-bet loop: each spin settles (betResult set) -> after a short pause,
  // either start the next spin (bets stay on the table) or finish the sequence.
  useEffect(() => {
    if (!isAutoRunning || !betResult) return;

    if (autoBetsRemaining <= 1) {
      stopAutoBet();
      clearTable();
      return;
    }

    const timer = setTimeout(() => {
      decrementAutoBet();
      mutate();
    }, AUTO_BET_DELAY_MS);

    return () => clearTimeout(timer);
  }, [
    betResult,
    isAutoRunning,
    autoBetsRemaining,
    decrementAutoBet,
    stopAutoBet,
    clearTable,
    mutate,
  ]);

  return {
    placeBet,
    startAuto,
    stopAuto,
    isAutoRunning,
    isPlacingBet: isPending,
  };
}
