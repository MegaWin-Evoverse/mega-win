import { useEffect } from 'react';
import { getTurboValue } from '@/shared/lib/getTurboValue';
import { playSound, stopSound } from '@/shared/lib/playSound';
import { useTurboModeStore } from '@/features/game-settings';
import { RESULT_OVERLAY_DURATION_MS, RESULT_OVERLAY_DURATION_TURBO_MS } from './constants';
import { useRouletteStore } from './rouletteStore';

export function useBetResultAutoDismiss() {
  const betResult = useRouletteStore((state) => state.betResult);
  const setBetResult = useRouletteStore((state) => state.setBetResult);
  const turboMode = useTurboModeStore((state) => state.turboMode);

  useEffect(() => {
    if (!betResult) return;

    stopSound('roulette');
    playSound('score');

    const duration = getTurboValue(
      turboMode,
      RESULT_OVERLAY_DURATION_MS,
      RESULT_OVERLAY_DURATION_TURBO_MS
    );
    const timer = setTimeout(() => setBetResult(null), duration);

    return () => clearTimeout(timer);
  }, [betResult, setBetResult, turboMode]);
}
