'use client';
import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useUserQuery, BALANCE_TYPE } from '@/entities/user';
import { ROUTES, PROFILE_TAB_QUERY_KEY } from '@/shared/config';
import { PROFILE_WINDOW_TABS, TAB_LIST } from './constants';
import { getBalance } from './getBalance';
import type { ProfileWindowTab } from './types';

export function useUserProfileWindow() {
  const { data: user, isLoading: isUserLoading } = useUserQuery();
  const searchParams = useSearchParams();
  const router = useRouter();

  const tabParam = searchParams.get(PROFILE_TAB_QUERY_KEY);
  const activeTab: ProfileWindowTab =
    tabParam !== null && (TAB_LIST as readonly string[]).includes(tabParam)
      ? (tabParam as ProfileWindowTab)
      : PROFILE_WINDOW_TABS.PROFILE;

  const gamePointsBalance = getBalance(BALANCE_TYPE.GAME_POINTS, user);

  const [isResetPasswordOpen, setIsResetPasswordOpen] = useState(false);

  function onTabChange(tab: string) {
    router.replace(`${ROUTES.PROFILE}?${PROFILE_TAB_QUERY_KEY}=${tab}`);
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
