import { z } from 'zod';
import { signInSchema, signUpSchema, verifyEmailSchema } from './schema';

export type SignInSchema = z.infer<typeof signInSchema>;
export type SignUpSchema = z.infer<typeof signUpSchema>;
export type VerifyEmailSchema = z.infer<typeof verifyEmailSchema>;

export type AuthResponse = {
  accessToken?: string;
  refreshToken?: string;
  verificationToken?: string;
};
