import { KENO_TOTAL_NUMBERS } from '../config/constants';

export function shuffleSlice(count: number): number[] {
  const all = Array.from({ length: KENO_TOTAL_NUMBERS }, (_, i) => i + 1);
  for (let i = all.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const tmp = all[i];
    all[i] = all[j];
    all[j] = tmp;
  }
  return all.slice(0, count);
}
