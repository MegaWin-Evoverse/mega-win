import type { z } from 'zod';
import type { signInSchema, signUpSchema, verifyEmailSchema } from './schema';

export type SignInSchema = z.infer<typeof signInSchema>;

export type SignUpSchema = z.infer<typeof signUpSchema>;

export type VerifyEmailSchema = z.infer<typeof verifyEmailSchema>;

export type AuthResponse = {
  success?: boolean;
  verificationToken?: string;
};

export type AuthType = 'sign-in' | 'sign-up';
