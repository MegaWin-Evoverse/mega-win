import { api } from '@/shared/api/client';
import { DAILY_CLAIM_API_PATHS } from '../model/constants';
import type { ClaimResponse } from '../model/types';

export async function claimDaily(): Promise<ClaimResponse> {
  const { data } = await api.post<ClaimResponse>(DAILY_CLAIM_API_PATHS.claim);

  return data;
}
