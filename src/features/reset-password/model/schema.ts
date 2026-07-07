import { z } from 'zod';
import { FIELD } from './constants';

const newPasswordSchema = z
  .string()
  .min(6, 'At least 6 characters')
  .max(128, 'At most 128 characters')
  .regex(/[a-z]/, 'At least one lowercase letter')
  .regex(/[A-Z]/, 'At least one uppercase letter')
  .regex(/\d/, 'At least one digit')
  .regex(/[^a-zA-Z0-9]/, 'At least one special character');

export const resetPasswordSchema = z
  .object({
    [FIELD.CURRENT_PASSWORD]: z.string().min(1, 'Current password is required'),
    [FIELD.NEW_PASSWORD]: newPasswordSchema,
    [FIELD.CONFIRM_PASSWORD]: z.string().min(1, 'Please confirm your password'),
  })
  .refine((data) => data[FIELD.NEW_PASSWORD] === data[FIELD.CONFIRM_PASSWORD], {
    message: "Passwords don't match",
    path: [FIELD.CONFIRM_PASSWORD],
  });

export type ResetPasswordFormValues = z.infer<typeof resetPasswordSchema>;
