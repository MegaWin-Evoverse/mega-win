import { api } from '@/shared/api/client';
import type { RewardDetail } from '../model/types';

export async function getReward(id: string): Promise<RewardDetail> {
  const { data } = await api.get<RewardDetail>(`/api/reward/${id}`);

  return data;
}
