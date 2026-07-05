export const AUTH_TAB_DEFAULT = 'sign-in' as const;

export const PATHS = {
  'sign-up': '/api/auth/register',
  'sign-in': '/api/auth/login',
  'verify-email': '/api/auth/verify-email',
} as const;

export const ERROR_MESSAGE = {
  'sign-up': 'Email already registered',
  'sign-in': 'Invalid credentials',
} as const;

export const VERIFY_EMAIL_ERROR = 'Invalid or expired verification code';

export const SUCCESS_MESSAGE = {
  'sign-in': 'Welcome back!',
  'verify-email': 'Email verified successfully!',
} as const;

export const VERIFY_EMAIL_FIELDS = {
  code: 'code',
} as const;

export const LOGOUT_ERROR = 'Failed to log out';

export const ACCESS_TOKEN_MAX_AGE = 600;

export const REFRESH_TOKEN_MAX_AGE = 259_200;

const GOOGLE_AUTH_ENDPOINT = '/auth/google';

export const SOCIAL_AUTH_URL = {
  google: `${process.env.NEXT_PUBLIC_API_URL}${GOOGLE_AUTH_ENDPOINT}`,
} as const;
