export function formatMultiplier(betSize: string, payout: string): string {
  const bet = Number(betSize);

  if (bet === 0) {
    return '—';
  }

  const multiplier = Number(payout) / bet;

  return `x${multiplier.toFixed(2)}`;
}
