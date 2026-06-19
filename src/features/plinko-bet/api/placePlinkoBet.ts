import { api } from '@/shared/api/client';
import { toApiRisk } from '@/entities/game';
import { PLINKO_BET_URL } from '../model/constants';
import {
  type PlacePlinkoBetArgs,
  type PlinkoBetPayload,
  type PlinkoBetResult,
} from '../model/types';

export async function placePlinkoBet({
  betSize,
  rows,
  risk,
}: PlacePlinkoBetArgs): Promise<PlinkoBetResult> {
  const payload: PlinkoBetPayload = { betSize, rowsCount: rows, risk: toApiRisk(risk) };
  const response = await api.post<PlinkoBetResult>(PLINKO_BET_URL, payload);
  return response.data;
}
