'use client';
import { useState, useEffect } from 'react';
import { getBucketIndex, PLINKO_MULTIPLIERS, type Risk } from '@/entities/game';
import { computePlinkoOutcome } from './verifyOutcome';

export interface PlinkoVerifyOutcome {
  bucket: number;
  multiplier: number;
}

export function usePlinkoVerifyOutcome(
  clientSeed: string,
  serverSeed: string,
  nonce: string,
  rows: number,
  risk: Risk
): PlinkoVerifyOutcome | null {
  const [outcome, setOutcome] = useState<PlinkoVerifyOutcome | null>(null);

  const isValid = Boolean(clientSeed && serverSeed && nonce);

  useEffect(() => {
    if (!isValid) return;

    let isCancelled = false;
    computePlinkoOutcome(clientSeed, serverSeed, nonce, rows).then((steps) => {
      if (isCancelled) return;
      const bucket = getBucketIndex(steps);
      const multiplier = PLINKO_MULTIPLIERS[risk]?.[rows]?.[bucket] ?? 0;
      setOutcome({ bucket, multiplier });
    });

    return () => {
      isCancelled = true;
    };
  }, [clientSeed, serverSeed, nonce, rows, risk, isValid]);

  return isValid ? outcome : null;
}
