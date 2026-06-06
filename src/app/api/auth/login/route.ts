import { NextResponse } from 'next/server';
import { applyAuthCookies } from '@/features/auth/server';

export async function POST(request: Request) {
  const body = await request.json();
  const recaptchaToken = request.headers.get('recaptcha-token');

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/local/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(recaptchaToken && { 'recaptcha-token': recaptchaToken }),
    },
    body: JSON.stringify({ email: body.email, password: body.password }),
  });

  if (!response.ok) {
    const errorData = await response.json();

    return NextResponse.json({ error: errorData.message }, { status: response.status });
  }

  const nextResponse = NextResponse.json({ success: true }, { status: response.status });

  applyAuthCookies(nextResponse, response.headers);

  return nextResponse;
}
