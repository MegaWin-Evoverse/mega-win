import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/query/me`, {
    headers: {
      Cookie: request.headers.get('cookie') ?? '',
    },
  });

  if (!response.ok) {
    return NextResponse.json({}, { status: response.status });
  }

  const data = await response.json();

  return NextResponse.json(data);
}
