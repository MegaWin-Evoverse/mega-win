'use client';
import { useEffect } from 'react';
import { GameResultCard, getResultVariant } from '@/shared/ui/game-result-card';
import { getTurboValue } from '@/shared/lib/getTurboValue';
import { useTurboModeStore } from '@/features/game-settings';
import type { PlinkoResult } from '@/features/plinko-bet';
import { RESULT_OVERLAY_DURATION_MS, RESULT_OVERLAY_DURATION_TURBO_MS } from '../model/constants';

interface Props {
  result: PlinkoResult | null;
  onDismiss: () => void;
}

export function PlinkoResultOverlay({ result, onDismiss }: Props) {
  const turboMode = useTurboModeStore((state) => state.turboMode);

  useEffect(() => {
    if (!result) return;
    const duration = getTurboValue(
      turboMode,
      RESULT_OVERLAY_DURATION_MS,
      RESULT_OVERLAY_DURATION_TURBO_MS
    );
    const timer = setTimeout(onDismiss, duration);
    return () => clearTimeout(timer);
  }, [result, onDismiss, turboMode]);

  if (!result) return null;

  return (
    <div className="absolute inset-0 z-10 flex items-center justify-center bg-page-bg/40 backdrop-blur-md">
      <GameResultCard
        variant={getResultVariant(result.multiplier)}
        multiplier={result.multiplier}
        payout={String(result.payout)}
      />
    </div>
  );
}
