import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/logout`, {
    method: 'POST',
    headers: {
      Cookie: request.headers.get('cookie') ?? '',
    },
  });

  const response = NextResponse.json({});

  response.cookies.set('access_token', '', { maxAge: 0, path: '/' });

  response.cookies.set('refresh_token', '', { maxAge: 0, path: '/api/auth' });

  return response;
}
