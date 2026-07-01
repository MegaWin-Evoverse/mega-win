import { NextResponse } from 'next/server';
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

interface ProxyAuthRequestParams {
  endpoint: string;
  request: Request;
  passthrough?: boolean;
}

export async function proxyAuthRequest({
  endpoint,
  request,
  passthrough = false,
}: ProxyAuthRequestParams): Promise<NextResponse> {
  const body = await request.json();

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${endpoint}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const error = await response.json();
    return NextResponse.json(error, { status: response.status });
  }

  if (passthrough) {
    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  }

  const nextResponse = NextResponse.json({ success: true }, { status: response.status });
  applyAuthCookies(nextResponse, response.headers);
  return nextResponse;
}
