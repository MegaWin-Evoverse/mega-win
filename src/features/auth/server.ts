import type { NextResponse } from 'next/server';
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

function parseSetCookie(header: string) {
  const [nameValue, ...directives] = header.split(';').map((segment) => segment.trim());
  const equalsIndex = nameValue.indexOf('=');

  if (equalsIndex <= 0) {
    return null;
  }

  const rawMaxAge = directives
    .find((directive) => directive.toLowerCase().startsWith('max-age='))
    ?.split('=')[1];
  const maxAge = Number(rawMaxAge);

  return {
    name: nameValue.slice(0, equalsIndex),
    value: nameValue.slice(equalsIndex + 1),
    maxAge: Number.isFinite(maxAge) ? maxAge : undefined,
  };
}

export function applyAuthCookies(response: NextResponse, backendHeaders: Headers): void {
  const secure = process.env.NODE_ENV === 'production';
  const setCookie = backendHeaders.getSetCookie();

  for (const header of setCookie) {
    const parsed = parseSetCookie(header);

    if (!parsed || !(parsed.name in COOKIE_CONFIG)) continue;

    const name = parsed.name as keyof typeof COOKIE_CONFIG;
    const config = COOKIE_CONFIG[name];

    response.cookies.set(name, parsed.value, {
      httpOnly: true,
      maxAge: parsed.maxAge ?? config.maxAge,
      path: config.path,
      sameSite: 'strict',
      secure,
    });
  }
}
