import { useEffect } from 'react';
import { useMutation } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import { toast } from 'sonner';
import { api } from '@/shared/api/client';
import { getTurboValue } from '@/shared/lib/getTurboValue';
import { useGameControlsStore, selectIsAutoMode } from '@/entities/game';
import { useTurboModeStore } from '@/features/game-settings';
import {
  AUTO_BET_DELAY_MS,
  AUTO_BET_DELAY_TURBO_MS,
  BET_ERROR_MESSAGES,
  HTTP_UNAUTHORIZED,
  MIN_AUTO_BET_COUNT,
  ROULETTE_BET_PATH,
  ROULETTE_LABELS,
} from './constants';
import { buildBetParams } from './buildBetParams';
import type { BetResponse } from './types';
import { useRouletteConfig } from './useRouletteConfig';
import { useRouletteStore } from './rouletteStore';

export function useRouletteBet() {
  const isAutoMode = useGameControlsStore(selectIsAutoMode);
  const numberOfBets = useGameControlsStore((state) => state.numberOfBets);
  const placedBets = useRouletteStore((state) => state.placedBets);
  const placedBet = useRouletteStore((state) => state.placedBet);
  const betResult = useRouletteStore((state) => state.betResult);
  const isAutoRunning = useRouletteStore((state) => state.isAutoRunning);
  const autoBetsRemaining = useRouletteStore((state) => state.autoBetsRemaining);
  const autoBetCount = useRouletteStore((state) => state.autoBetCount);
  const setLastResult = useRouletteStore((state) => state.setLastResult);
  const setBetResult = useRouletteStore((state) => state.setBetResult);
  const setPendingBetResult = useRouletteStore((state) => state.setPendingBetResult);
  const setSpinning = useRouletteStore((state) => state.setSpinning);
  const clearTable = useRouletteStore((state) => state.clearTable);
  const decrementAutoBet = useRouletteStore((state) => state.decrementAutoBet);
  const stopAutoBet = useRouletteStore((state) => state.stopAutoBet);
  const startAutoBet = useRouletteStore((state) => state.startAutoBet);
  const turboMode = useTurboModeStore((state) => state.turboMode);
  const { minBet, maxBet } = useRouletteConfig();

  const { mutate } = useMutation({
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

  function startAuto() {
    if (!validateBet()) return;
    const count = Math.max(
      MIN_AUTO_BET_COUNT,
      Number.parseInt(numberOfBets, 10) || MIN_AUTO_BET_COUNT
    );
    startAutoBet(count);
    mutate();
  }

  function stopAuto() {
    stopAutoBet();
    clearTable();
  }

  function onBet() {
    if (!isAutoMode) {
      placeBet();
      return;
    }
    if (isAutoRunning) {
      stopAuto();
      return;
    }
    startAuto();
  }

  useEffect(() => {
    if (!isAutoRunning || !betResult) return;

    if (autoBetsRemaining <= 1) {
      stopAutoBet();
      clearTable();
      return;
    }

    const delay = getTurboValue(turboMode, AUTO_BET_DELAY_MS, AUTO_BET_DELAY_TURBO_MS);
    const timer = setTimeout(() => {
      decrementAutoBet();
      mutate();
    }, delay);

    return () => clearTimeout(timer);
  }, [
    betResult,
    isAutoRunning,
    autoBetsRemaining,
    decrementAutoBet,
    stopAutoBet,
    clearTable,
    mutate,
    turboMode,
  ]);

  const autoBetLabel = isAutoRunning
    ? `${ROULETTE_LABELS.STOP_AUTOBET} ${autoBetCount - autoBetsRemaining + 1}/${autoBetCount}`
    : undefined;

  return {
    onBet,
    isAutoRunning,
    autoBetLabel,
  };
}
