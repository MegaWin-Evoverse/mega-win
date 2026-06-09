import { NextResponse } from 'next/server';
import { applyAuthCookies } from '@/features/auth/server';

export async function POST(request: Request) {
  const refreshToken = request.cookies.get('refresh_token')?.value;

  if (!refreshToken) {
    return NextResponse.json({ error: 'No refresh token' }, { status: 401 });
  }

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/refresh`, {
    method: 'POST',
    headers: {
      Cookie: `refresh_token=${refreshToken}`,
    },
  });

  if (!response.ok) {
    return NextResponse.json({ error: 'Refresh failed' }, { status: response.status });
  }

  const nextResponse = NextResponse.json({ success: true });
  applyAuthCookies(nextResponse, response.headers);

  return nextResponse;
}
