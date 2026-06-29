'use client';
import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useUserQuery, BALANCE_TYPE } from '@/entities/user';
import { ROUTES } from '@/shared/config';
import { PROFILE_WINDOW_TABS, TAB_LIST } from './constants';
import { getBalance } from './getBalance';
import type { ProfileWindowTab } from './types';

const TAB_QUERY_KEY = 'tab';

export function useUserProfileWindow() {
  const { data: user, isLoading: isUserLoading } = useUserQuery();
  const searchParams = useSearchParams();
  const router = useRouter();

  const tabParam = searchParams.get(TAB_QUERY_KEY) as ProfileWindowTab | null;
  const activeTab: ProfileWindowTab =
    tabParam && (TAB_LIST as readonly string[]).includes(tabParam)
      ? tabParam
      : PROFILE_WINDOW_TABS.PROFILE;

  const gamePointsBalance = getBalance(BALANCE_TYPE.GAME_POINTS, user);

  const [isResetPasswordOpen, setIsResetPasswordOpen] = useState(false);

  function onTabChange(tab: string) {
    router.replace(`${ROUTES.PROFILE}?${TAB_QUERY_KEY}=${tab}`);
  }

  function onOpenResetPassword() {
    setIsResetPasswordOpen(true);
  }

  function onCloseResetPassword() {
    setIsResetPasswordOpen(false);
  }

  return {
    user,
    isUserLoading,
    gamePointsBalance,
    activeTab,
    onTabChange,
    isResetPasswordOpen,
    onOpenResetPassword,
    onCloseResetPassword,
  };
}
