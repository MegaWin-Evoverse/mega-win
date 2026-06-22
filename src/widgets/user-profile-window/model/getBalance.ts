import type { BALANCE_TYPE, User } from '@/entities/user';
import { formatAmount } from '@/shared/lib/formatAmount';

export const getBalance = (type: (typeof BALANCE_TYPE)[keyof typeof BALANCE_TYPE], user?: User) =>
  formatAmount(
    Number(user?.userBalances.find((balance) => balance.balanceType === type)?.value ?? 0)
  );
