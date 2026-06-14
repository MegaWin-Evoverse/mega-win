import { api } from '@/shared/api/client';
import type { Bet, Path } from '../model/types';

const BASE_PATH = '/api/bets/latest';

export async function getBetsStory(path: Path): Promise<Bet[]> {
  const { data } = await api.get<Bet[]>(path === 'latest' ? BASE_PATH : `${BASE_PATH}/${path}`);

  return data;
}
