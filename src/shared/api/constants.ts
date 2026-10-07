export const REFRESH_PATH = '/api/auth/refresh';
export const LOGOUT_PATH = '/api/auth/logout';

export const HTTP_STATUS_UNAUTHORIZED = 401;

export const SESSION_HINT_COOKIE = 'has_session';

export const AUTH_PATHS = [
  '/api/auth/login',
  '/api/auth/register',
  '/api/auth/verify-email',
] as const;

export const USER_PATHS = {
  ME: '/api/user/query/me',
  UPDATE_INFO: '/api/user/command/update/user-info',
  UPDATE_PASSWORD: '/api/user/command/update/password',
} as const;
