import { useQuery } from '@tanstack/react-query';
import { api } from '@/shared/api/client';
import { ROULETTE_CONFIG_QUERY_KEYS } from '@/shared/api/query-keys';
import { QUERY_STALE_TIME_MS } from '@/shared/config';

const ROULETTE_CONFIG_PATH = '/api/games/house/roulette/config';

const ROULETTE_CONFIG_DEFAULTS = {
  MIN_BET: 1,
  MAX_BET: 100000,
} as const;

interface RouletteConfig {
  minBet: number;
  maxBet: number;
}

async function fetchRouletteConfig(): Promise<RouletteConfig> {
  const response = await api.get<RouletteConfig>(ROULETTE_CONFIG_PATH);
  return response.data;
}

export function useRouletteConfig() {
  const { data } = useQuery({
    queryKey: ROULETTE_CONFIG_QUERY_KEYS.config,
    queryFn: fetchRouletteConfig,
    staleTime: QUERY_STALE_TIME_MS,
  });

  return {
    minBet: data?.minBet ?? ROULETTE_CONFIG_DEFAULTS.MIN_BET,
    maxBet: data?.maxBet ?? ROULETTE_CONFIG_DEFAULTS.MAX_BET,
  };
}
