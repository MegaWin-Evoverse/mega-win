export function buildPaginationPages(current: number, total: number): (number | 'ellipsis')[] {
  const paginationEdge = 1;
  const paginationSiblings = 2;

  if (total <= 7) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }

  const pages: (number | 'ellipsis')[] = [];
  const left = new Set<number>();
  const right = new Set<number>();

  for (let i = 1; i <= paginationEdge; i++) left.add(i);

  for (let i = total - paginationEdge + 1; i <= total; i++) right.add(i);

  for (
    let i = Math.max(1, current - paginationSiblings);
    i <= Math.min(total, current + paginationSiblings);
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
