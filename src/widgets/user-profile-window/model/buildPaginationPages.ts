import {
  BETS_PAGINATION_EDGE,
  BETS_PAGINATION_THRESHOLD,
  BETS_PAGINATION_WINDOW,
} from './constants';

export function buildPaginationPages(current: number, total: number): (number | 'ellipsis')[] {
  if (total <= BETS_PAGINATION_THRESHOLD) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }

  const pages: (number | 'ellipsis')[] = [];
  const left = new Set<number>();
  const right = new Set<number>();

  for (let i = 1; i <= BETS_PAGINATION_EDGE; i++) left.add(i);

  for (let i = total - BETS_PAGINATION_EDGE + 1; i <= total; i++) right.add(i);

  for (
    let i = Math.max(1, current - BETS_PAGINATION_WINDOW);
    i <= Math.min(total, current + BETS_PAGINATION_WINDOW);
    i++
  ) {
    if (!left.has(i) && !right.has(i)) pages.push(i);
  }

  const allLeft = [...left].sort((a, b) => a - b);
  const allMid = pages.sort((a, b) => (a as number) - (b as number));
  const allRight = [...right].sort((a, b) => a - b);
  const result: (number | 'ellipsis')[] = [];
  let prev = 0;

  for (const group of [allLeft, allMid, allRight]) {
    for (const p of group) {
      if (prev > 0 && (p as number) - prev > 1) result.push('ellipsis');
      result.push(p);
      prev = p as number;
    }
  }

  return result;
}
