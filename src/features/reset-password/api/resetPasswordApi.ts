import { api } from '@/shared/api/client';
import { USER_PATHS } from '@/shared/api/constants';

interface ResetPasswordPayload {
  currentPassword: string;
  newPassword: string;
}

export async function resetPassword(payload: ResetPasswordPayload): Promise<void> {
  await api.patch(USER_PATHS.UPDATE_PASSWORD, payload);
}
