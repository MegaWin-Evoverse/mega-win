import { api } from '@/shared/api/client';
import { FORGOT_PASSWORD_PATH } from '../model/constants';
import type { ForgotPasswordResponse } from '../model/types';

export async function forgotPasswordApi(email: string): Promise<ForgotPasswordResponse> {
  const response = await api.post<ForgotPasswordResponse>(FORGOT_PASSWORD_PATH, { email });
  return response.data;
}
