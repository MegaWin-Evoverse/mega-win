import { BALANCE_TYPE, type User } from '@/entities/user';

export function getGamePointsBalance(user: User | undefined): number | null {
  const gamePoints = user?.userBalances.find(
    (balance) => balance.balanceType === BALANCE_TYPE.GAME_POINTS
  );

  if (!gamePoints) {
    return null;
  }

  return Number.parseFloat(gamePoints.value) || 0;
}
