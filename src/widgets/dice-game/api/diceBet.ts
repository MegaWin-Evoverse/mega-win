import { api } from '@/shared/api/client';
import { DICE_BET_ROUTE } from '../model/constants';
import type { DiceBetPayload, DiceBetResponse } from '../model/types';

export async function diceBet(payload: DiceBetPayload): Promise<DiceBetResponse> {
  const { data } = await api.post<DiceBetResponse>(DICE_BET_ROUTE, payload);

  return data;
}
