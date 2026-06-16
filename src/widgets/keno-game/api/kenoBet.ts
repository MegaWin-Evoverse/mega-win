import { api } from '@/shared/api/client';
import type { KenoBetPayload, KenoBetResponse } from '../model/types';

export async function kenoBet(payload: KenoBetPayload): Promise<KenoBetResponse> {
  const { data } = await api.post<KenoBetResponse>('/api/games/house/keno/bet', payload);

  return data;
}
