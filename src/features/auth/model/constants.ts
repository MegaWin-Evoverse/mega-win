export const PATHS = {
  'sign-up': '/api/auth/register',
  'sign-in': '/api/auth/login',
  'verify-email': '/api/auth/verify-email',
} as const;

export const ERROR_STATUS = {
  'sign-up': 409,
  'sign-in': 401,
} as const;

export const ERROR_MESSAGE = {
  'sign-up': 'Email already registered',
  'sign-in': 'Invalid credentials',
} as const;
