import { api } from '@/shared/api/client';
import { MY_BETS_ENDPOINT, MY_BETS_QUERY_PARAM } from '../model/constants';
import type { MyBetsParams, MyBetsResponse } from '../model/types';

export async function getMyBets(params: MyBetsParams): Promise<MyBetsResponse> {
  const searchParams = new URLSearchParams({
    [MY_BETS_QUERY_PARAM.PAGE]: String(params.page),
    [MY_BETS_QUERY_PARAM.TAKE]: String(params.take),
  });

  if (params.gameSlug) searchParams.set(MY_BETS_QUERY_PARAM.GAME_SLUG, params.gameSlug);
  if (params.sort) searchParams.set(MY_BETS_QUERY_PARAM.SORT, params.sort);

  const { data } = await api.get<MyBetsResponse>(`${MY_BETS_ENDPOINT}?${searchParams.toString()}`);

  return data;
}
