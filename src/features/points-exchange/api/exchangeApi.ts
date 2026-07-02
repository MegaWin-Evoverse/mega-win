import { api } from '@/shared/api/client';

export const POINTS_EXCHANGE_PATH = '/api/balance/watch-to-game';

export interface ExchangePayload {
  amount: string;
}

export async function exchangeWatchToGame(payload: ExchangePayload): Promise<void> {
  await api.post(POINTS_EXCHANGE_PATH, payload);
}
