import { DRAWN_COUNT, TOTAL_NUMBERS } from './constants';

export function drawNumbers(): Set<number> {
  const pool = Array.from({ length: TOTAL_NUMBERS }, (_, i) => i + 1);

  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [pool[i], pool[j]] = [pool[j] as number, pool[i] as number];
  }

  return new Set(pool.slice(0, DRAWN_COUNT));
}
