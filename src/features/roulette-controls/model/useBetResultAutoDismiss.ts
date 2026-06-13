import { useEffect } from 'react';

import { RESULT_OVERLAY_DURATION_MS } from '../config/constants';
import { useRouletteStore } from './rouletteStore';

export function useBetResultAutoDismiss() {
  const betResult = useRouletteStore((state) => state.betResult);
  const setBetResult = useRouletteStore((state) => state.setBetResult);

  useEffect(() => {
    if (!betResult) return;

    const timer = setTimeout(() => setBetResult(null), RESULT_OVERLAY_DURATION_MS);

    return () => clearTimeout(timer);
  }, [betResult, setBetResult]);
}
