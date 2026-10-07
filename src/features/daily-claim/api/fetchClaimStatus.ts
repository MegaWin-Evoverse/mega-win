import { api } from '@/shared/api/client';
import { DAILY_CLAIM_API_PATHS } from '../model/constants';
import type { ClaimStatus } from '../model/types';

export async function fetchClaimStatus(): Promise<ClaimStatus> {
  const { data } = await api.get<ClaimStatus>(DAILY_CLAIM_API_PATHS.status);

  return data;
}
