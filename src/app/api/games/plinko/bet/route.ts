import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

const ACCESS_TOKEN = 'access_token';
const PLINKO_BET_ENDPOINT = 'games/house/plinko/bet';

export async function POST(request: Request): Promise<NextResponse> {
  const body = await request.json();
  const cookieStore = await cookies();
  const accessToken = cookieStore.get(ACCESS_TOKEN)?.value;

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${PLINKO_BET_ENDPOINT}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(accessToken && { Cookie: `${ACCESS_TOKEN}=${accessToken}` }),
    },
    body: JSON.stringify(body),
  });

  const data = await response.json();
  return NextResponse.json(data, { status: response.status });
}
