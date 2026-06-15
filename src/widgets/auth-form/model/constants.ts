export const BUTTON_TEXT = {
  'sign-up': 'Register',
  'sign-in': 'Log In',
} as const;

export const AUTH_TABS = [
  { value: 'sign-in', label: BUTTON_TEXT['sign-in'] },
  { value: 'sign-up', label: BUTTON_TEXT['sign-up'] },
] as const;

export const OTP_LENGTH = 6;
