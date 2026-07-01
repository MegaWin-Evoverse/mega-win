'use client';
import { useState, useEffect } from 'react';
import { computeKenoOutcome } from './verifyOutcome';

export interface KenoVerifyOutcome {
  drawnNumbers: ReadonlySet<number>;
}

export function useKenoVerifyOutcome(
  clientSeed: string,
  serverSeed: string,
  nonce: string
): KenoVerifyOutcome | null {
  const [outcome, setOutcome] = useState<KenoVerifyOutcome | null>(null);
  const isValid = Boolean(clientSeed && serverSeed && nonce);

  useEffect(() => {
    if (!isValid) return;

    let isCancelled = false;
    computeKenoOutcome(clientSeed, serverSeed, nonce).then((drawn) => {
      if (isCancelled) return;
      setOutcome({ drawnNumbers: new Set(drawn) });
    });

    return () => {
      isCancelled = true;
    };
  }, [clientSeed, serverSeed, nonce, isValid]);

  return isValid ? outcome : null;
}
