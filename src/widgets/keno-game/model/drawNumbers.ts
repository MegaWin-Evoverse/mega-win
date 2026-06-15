import { KENO_DRAWN_COUNT, KENO_TOTAL_NUMBERS } from './constants';

export function drawNumbers(): Set<number> {
  const pool = Array.from({ length: KENO_TOTAL_NUMBERS }, (_, i) => i + 1);

  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [pool[i], pool[j]] = [pool[j] as number, pool[i] as number];
  }

  return new Set(pool.slice(0, KENO_DRAWN_COUNT));
}
