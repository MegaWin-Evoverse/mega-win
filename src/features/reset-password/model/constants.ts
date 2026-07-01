export const RESET_PASSWORD_TITLE = 'Reset Password';

export const RESET_PASSWORD_DESC =
  'Enter your current password and set a new one. We will email you after it is updated.';

export const RESET_PASSWORD_BTN = 'Reset Password';

export const OPEN_RESET_PASSWORD_LABEL = 'Reset Password';

export const TOAST_SUCCESS = 'Password updated successfully';
export const TOAST_ERROR = 'Failed to reset password. Check your current password.';

export const REQUIREMENTS_TITLE = 'Password requirements';

export const FIELD = {
  CURRENT_PASSWORD: 'currentPassword' as const,
  NEW_PASSWORD: 'newPassword' as const,
  CONFIRM_PASSWORD: 'confirmPassword' as const,
};

export const FIELD_LABELS = {
  [FIELD.CURRENT_PASSWORD]: 'Current Password',
  [FIELD.NEW_PASSWORD]: 'New Password',
  [FIELD.CONFIRM_PASSWORD]: 'Confirm New Password',
} as const;

export const FIELD_PLACEHOLDERS = {
  [FIELD.CURRENT_PASSWORD]: 'Enter current password',
  [FIELD.NEW_PASSWORD]: 'Enter new password',
  [FIELD.CONFIRM_PASSWORD]: 'Confirm new password',
} as const;

export const PASSWORD_REQUIREMENTS: { label: string; test: (v: string) => boolean }[] = [
  { label: 'At least 6 characters', test: (v) => v.length >= 6 },
  { label: 'At most 128 characters', test: (v) => v.length > 0 && v.length <= 128 },
  { label: 'At least one lowercase letter', test: (v) => /[a-z]/.test(v) },
  { label: 'At least one uppercase letter', test: (v) => /[A-Z]/.test(v) },
  { label: 'At least one digit', test: (v) => /\d/.test(v) },
  { label: 'At least one special character', test: (v) => /[^a-zA-Z0-9]/.test(v) },
];
