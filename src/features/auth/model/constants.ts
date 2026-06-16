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
} as const;

export const RECAPTCHA_ERROR = 'Please complete the reCAPTCHA';

export const VERIFY_EMAIL_FIELDS = {
  code: 'code',
} as const;

export const ACCESS_TOKEN_MAX_AGE = 600;

export const REFRESH_TOKEN_MAX_AGE = 259_200;
