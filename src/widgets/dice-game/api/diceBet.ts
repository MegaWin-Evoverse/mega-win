import { api } from '@/shared/api/client';
import type { DiceBetPayload, DiceBetResponse } from '../model/types';

export async function diceBet(payload: DiceBetPayload): Promise<DiceBetResponse> {
  const { data } = await api.post<DiceBetResponse>('/api/games/house/dice/bet', payload);

  return data;
}
