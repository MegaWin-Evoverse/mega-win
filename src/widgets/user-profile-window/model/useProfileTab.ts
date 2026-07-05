'use client';
import { useRef, useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { updateUserInfo } from '@/entities/user';
import { QUERY_KEYS } from '@/shared/api/query-keys';
import { BALANCE_TYPE } from '@/entities/user';
import type { UserCryptoAddresses, User, UpdateUserInfoPayload } from '@/entities/user';
import type { CryptoWalletKey } from './types';
import { getBalance } from './getBalance';
import {
  WALLET_DRAFT_DEFAULTS,
  WALLET_UPDATE_ERROR,
  USERNAME_UPDATE_ERROR,
  USERNAME_UPDATE_SUCCESS,
} from './constants';

export function useProfileTab(user: User) {
  const queryClient = useQueryClient();

  const [isPrivateModeEnabled, setIsPrivateModeEnabled] = useState(false);
  const [isEditingUsername, setIsEditingUsername] = useState(false);
  const [usernameInput, setUsernameInput] = useState(user.username);
  const usernameInputRef = useRef<HTMLInputElement>(null);

  const [editingWalletKey, setEditingWalletKey] = useState<CryptoWalletKey | null>(null);
  const [walletDraftValues, setWalletDraftValues] =
    useState<Record<CryptoWalletKey, string>>(WALLET_DRAFT_DEFAULTS);

  const gamePoints = getBalance(BALANCE_TYPE.GAME_POINTS, user);
  const watchPoints = getBalance(BALANCE_TYPE.WATCH_POINTS, user);
  const cryptoAddresses: UserCryptoAddresses = user.userCryptoAddresses;

  const { mutate: saveUserInfo, isPending: isSavingUsername } = useMutation({
    mutationFn: updateUserInfo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.currentUser });
    },
  });

  function onPrivateModeToggle() {
    setIsPrivateModeEnabled((prev) => !prev);
  }

  function onUsernameEditStart() {
    setUsernameInput(user.username);
    setIsEditingUsername(true);
    requestAnimationFrame(() => usernameInputRef.current?.focus());
  }

  function onUsernameChange(value: string) {
    setUsernameInput(value);
  }

  function onUsernameCancel() {
    setIsEditingUsername(false);
    setUsernameInput(user.username);
  }

  function onUsernameSave() {
    const trimmed = usernameInput.trim();
    if (!trimmed || trimmed === user.username) {
      setIsEditingUsername(false);
      return;
    }
    saveUserInfo(
      { username: trimmed },
      {
        onSuccess: () => {
          setIsEditingUsername(false);
          toast.success(USERNAME_UPDATE_SUCCESS);
        },
        onError: () => {
          setUsernameInput(user.username);
          toast.error(USERNAME_UPDATE_ERROR);
        },
      }
    );
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
    if (!editingWalletKey) return;
    const payload: UpdateUserInfoPayload = {
      [editingWalletKey]: walletDraftValues[editingWalletKey].trim(),
    };
    saveUserInfo(payload, {
      onSuccess: () => setEditingWalletKey(null),
      onError: () => toast.error(WALLET_UPDATE_ERROR),
    });
  }

  return {
    isPrivateModeEnabled,
    onPrivateModeToggle,
    isEditingUsername,
    isSavingUsername,
    usernameInput,
    usernameInputRef,
    onUsernameEditStart,
    onUsernameChange,
    onUsernameSave,
    onUsernameCancel,
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
