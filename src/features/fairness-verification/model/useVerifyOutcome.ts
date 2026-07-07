'use client';
import { useState, useEffect } from 'react';
import { computeRouletteOutcome } from './verifyOutcome';

export function useVerifyOutcome(
  clientSeed: string,
  serverSeed: string,
  nonce: string
): number | null {
  const [winningNumber, setWinningNumber] = useState<number | null>(null);

  const isValid = Boolean(clientSeed && serverSeed && nonce);

  useEffect(() => {
    if (!isValid) return;

    let isCancelled = false;
    computeRouletteOutcome(clientSeed, serverSeed, nonce).then((result) => {
      if (!isCancelled) setWinningNumber(result);
    });

    return () => {
      isCancelled = true;
    };
  }, [clientSeed, serverSeed, nonce, isValid]);

  return isValid ? winningNumber : null;
}
