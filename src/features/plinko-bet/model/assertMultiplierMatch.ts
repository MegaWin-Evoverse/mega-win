import { getBucketIndex, PLINKO_MULTIPLIERS, type Risk } from '@/entities/game';
import { type PlinkoBetResult } from './types';

export function assertMultiplierMatch(data: PlinkoBetResult, rows: number, risk: Risk): void {
  if (process.env.NODE_ENV === 'production') return;
  const bucket = getBucketIndex(data.results);
  const table = PLINKO_MULTIPLIERS[risk]?.[rows];
  if (table && table[bucket] !== data.multiplier) {
    console.warn('[plinko] multiplier mismatch', {
      risk,
      rows,
      bucket,
      expected: table[bucket],
      got: data.multiplier,
    });
  }
}
