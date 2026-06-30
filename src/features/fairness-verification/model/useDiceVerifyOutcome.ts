'use client';
import { useState, useEffect } from 'react';
import { computeDiceOutcome } from './verifyOutcome';

export function useDiceVerifyOutcome(
  clientSeed: string,
  serverSeed: string,
  nonce: string
): number | null {
  const [rollValue, setRollValue] = useState<number | null>(null);
  const isValid = Boolean(clientSeed && serverSeed && nonce);

  useEffect(() => {
    if (!isValid) return;

    let isCancelled = false;
    computeDiceOutcome(clientSeed, serverSeed, nonce).then((result) => {
      if (!isCancelled) setRollValue(result);
    });

    return () => {
      isCancelled = true;
    };
  }, [clientSeed, serverSeed, nonce, isValid]);

  return isValid ? rollValue : null;
}
