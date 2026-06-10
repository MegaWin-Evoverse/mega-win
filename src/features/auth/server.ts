import type { NextResponse } from 'next/server';
import setCookieParser from 'set-cookie-parser';
import { ACCESS_TOKEN_MAX_AGE, REFRESH_TOKEN_MAX_AGE } from './model/constants';

const COOKIE_CONFIG = {
  access_token: {
    maxAge: ACCESS_TOKEN_MAX_AGE,
    path: '/',
  },
  refresh_token: {
    maxAge: REFRESH_TOKEN_MAX_AGE,
    path: '/api/auth',
  },
} as const;

export function applyAuthCookies(response: NextResponse, backendHeaders: Headers): void {
  const secure = process.env.NODE_ENV === 'production';
  const cookies = setCookieParser.parse(backendHeaders.getSetCookie());

  for (const cookie of cookies) {
    if (!(cookie.name in COOKIE_CONFIG)) continue;
    const name = cookie.name as keyof typeof COOKIE_CONFIG;

    response.cookies.set(name, cookie.value, {
      httpOnly: true,
      maxAge: cookie.maxAge ?? COOKIE_CONFIG[name].maxAge,
      path: COOKIE_CONFIG[name].path,
      sameSite: 'strict',
      secure,
    });
  }
}
