import type { z } from 'zod';
import type { forgotPasswordSchema } from './schema';

export type ForgotPasswordSchema = z.infer<typeof forgotPasswordSchema>;

export interface ForgotPasswordResponse {
  message: string;
}
