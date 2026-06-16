import { api } from '@/shared/api/client';
import type { User } from '../model/types';

export async function getUser(): Promise<User> {
  const { data } = await api.get<User>('/api/user/query/me');

  return data;
}
