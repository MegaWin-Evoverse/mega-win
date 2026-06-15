'use client';
import type { User } from '@/entities/user';
import { useUserPanel } from '../model/useUserPanel';
import { BalanceMenu } from './BalanceMenu';
import { UserMenu } from './UserMenu';

interface Props {
  user: User;
}

export function UserPanel({ user }: Props) {
  const { logout, isLoggingOut } = useUserPanel();

  return (
    <div className="flex items-center gap-2">
      <BalanceMenu balances={user.userBalances} />
      <UserMenu user={user} onLogout={logout} isLoggingOut={isLoggingOut} />
    </div>
  );
}
