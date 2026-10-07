import { z } from 'zod';

const baseSchema = z.object({
  email: z.email('Enter correct email'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[a-zA-Z]/, 'Password must contain at least one letter')
    .regex(/[0-9]/, 'Password must contain at least one digit'),
});

export const signInSchema = baseSchema;

export const signUpSchema = baseSchema.extend({
  username: z.string().min(1, 'Username is required'),
});

export const verifyEmailSchema = z.object({
  code: z.string().min(1, 'Verification code is required'),
});
