import { api } from '@/shared/api/client';
import type { MyBetsParams, MyBetsResponse } from '../model/types';

export async function getMyBets(params: MyBetsParams): Promise<MyBetsResponse> {
  const searchParams = new URLSearchParams({
    page: String(params.page),
    take: String(params.take),
  });

  const { data } = await api.get<MyBetsResponse>(`/api/bets/my?${searchParams.toString()}`);

  return data;
}
