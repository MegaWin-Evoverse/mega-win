import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const body = await request.json();
  const recaptchaToken = request.headers.get('recaptcha-token');

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/local/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(recaptchaToken && { 'recaptcha-token': recaptchaToken }),
    },
    body: JSON.stringify({
      email: body.email,
      password: body.password,
      username: body.username,
    }),
  });

  if (response.status === 409) {
    return NextResponse.json({ error: 'Email already registered' }, { status: 409 });
  }

  const data = await response.json();

  return NextResponse.json(data, { status: response.status });
}
