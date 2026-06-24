'use client';
import { useState } from 'react';
import { useUserQuery, BALANCE_TYPE } from '@/entities/user';
import { PROFILE_WINDOW_TABS } from './constants';
import { getBalance } from './getBalance';
import type { ProfileWindowTab } from './types';

export function useUserProfileWindow() {
  const { data: user, isLoading: isUserLoading } = useUserQuery();
  const [activeTab, setActiveTab] = useState<ProfileWindowTab>(PROFILE_WINDOW_TABS.PROFILE);
  const gamePointsBalance = getBalance(BALANCE_TYPE.GAME_POINTS, user);

  function onTabChange(tab: string) {
    setActiveTab(tab as ProfileWindowTab);
  }

  return {
    user,
    isUserLoading,
    gamePointsBalance,
    activeTab,
    onTabChange,
  };
}
