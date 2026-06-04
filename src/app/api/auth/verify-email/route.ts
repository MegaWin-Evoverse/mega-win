import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const body = await request.json();

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/local/verify-email`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      verificationToken: body.verificationToken,
      code: body.code,
    }),
  });

  const data = await response.json();
  return NextResponse.json(data, { status: response.status });
}
