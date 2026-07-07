import { api } from '@/shared/api/client';
import { SESSION_HINT_COOKIE, USER_PATHS } from '@/shared/api/constants';
import { getCookie } from '@/shared/lib/getCookie';
import { NO_SESSION_ERROR } from '../model/constants';
import type { User } from '../model/types';

export async function getUser(): Promise<User> {
  if (!getCookie(SESSION_HINT_COOKIE)) {
    throw new Error(NO_SESSION_ERROR);
  }

  const { data } = await api.get<User>(USER_PATHS.ME);

  return data;
}

export interface UpdateUserInfoPayload {
  username?: string;
  btcAddress?: string;
  ethAddress?: string;
  ltcAddress?: string;
}

export async function updateUserInfo(payload: UpdateUserInfoPayload): Promise<User> {
  const { data } = await api.patch<User>(USER_PATHS.UPDATE_INFO, payload);

  return data;
}
