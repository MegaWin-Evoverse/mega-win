'use client';
import { useState } from 'react';
import { WALLET_DRAFT_DEFAULTS } from './constants';
import { BALANCE_TYPE, type UserCryptoAddresses, type User } from '@/entities/user';
import type { CryptoWalletKey } from './types';
import { getBalance } from './getBalance';

export function useProfileTab(user: User) {
  const [isPrivateModeEnabled, setIsPrivateModeEnabled] = useState(false);
  const [editingWalletKey, setEditingWalletKey] = useState<CryptoWalletKey | null>(null);
  const [walletDraftValues, setWalletDraftValues] =
    useState<Record<CryptoWalletKey, string>>(WALLET_DRAFT_DEFAULTS);
  const gamePoints = getBalance(BALANCE_TYPE.GAME_POINTS, user);
  const watchPoints = getBalance(BALANCE_TYPE.WATCH_POINTS, user);
  const cryptoAddresses: UserCryptoAddresses = user.userCryptoAddresses;

  function onPrivateModeToggle() {
    setIsPrivateModeEnabled((prev) => !prev);
  }

  function onWalletEditStart(key: CryptoWalletKey) {
    setEditingWalletKey(key);
    setWalletDraftValues((prev) => ({
      ...prev,
      [key]: user.userCryptoAddresses[key] ?? '',
    }));
  }

  function onWalletEditCancel() {
    setEditingWalletKey(null);
  }

  function onWalletDraftChange(key: CryptoWalletKey, value: string) {
    setWalletDraftValues((prev) => ({ ...prev, [key]: value }));
  }

  function onWalletSave() {
    setEditingWalletKey(null);
  }

  return {
    isPrivateModeEnabled,
    onPrivateModeToggle,
    editingWalletKey,
    walletDraftValues,
    onWalletEditStart,
    onWalletEditCancel,
    onWalletDraftChange,
    onWalletSave,
    gamePoints,
    watchPoints,
    cryptoAddresses,
  };
}
