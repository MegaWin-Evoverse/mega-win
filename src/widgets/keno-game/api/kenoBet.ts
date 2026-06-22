import { api } from '@/shared/api/client';
import type { KenoBetPayload, KenoBetResponse } from '../model/types';
import { KENO_BET_ENDPOINT } from '../model/constants';

export async function kenoBet(payload: KenoBetPayload): Promise<KenoBetResponse> {
  const { data } = await api.post<KenoBetResponse>(KENO_BET_ENDPOINT, payload);

  return data;
}
