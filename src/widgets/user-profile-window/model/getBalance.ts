import { BALANCE_TYPE } from '@/entities/user';
import { formatAmount } from '@/shared/lib/formatAmount';
import type { User } from '@/entities/user';

export const getBalance = (type: (typeof BALANCE_TYPE)[keyof typeof BALANCE_TYPE], user?: User) =>
  formatAmount(
    Number(user?.userBalances.find((balance) => balance.balanceType === type)?.value ?? 0)
  );
