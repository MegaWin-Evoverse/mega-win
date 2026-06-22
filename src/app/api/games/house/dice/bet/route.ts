import { NextResponse } from 'next/server';

const DICE_BET_ENDPOINT = '/games/house/dice/bet' as const;

export async function POST(request: Request) {
  const body = await request.json();

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${DICE_BET_ENDPOINT}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Cookie: request.headers.get('cookie') ?? '',
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const error = await response.json();
    return NextResponse.json(error, { status: response.status });
  }

  const data = await response.json();
  return NextResponse.json(data);
}
