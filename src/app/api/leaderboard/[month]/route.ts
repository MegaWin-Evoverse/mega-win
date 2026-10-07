import { type NextRequest, NextResponse } from 'next/server';

interface Context {
  params: Promise<{ month: string }>;
}

export async function GET(request: NextRequest, { params }: Context) {
  const { month } = await params;
  const { searchParams } = request.nextUrl;

  const url = new URL(`${process.env.NEXT_PUBLIC_API_URL}/leaderboard/${month}`);
  searchParams.forEach((value, key) => url.searchParams.set(key, value));

  let response: Response;

  try {
    response = await fetch(url.toString(), {
      headers: {
        Cookie: request.headers.get('cookie') ?? '',
      },
    });
  } catch {
    return NextResponse.json({}, { status: 502 });
  }

  if (!response.ok) {
    return NextResponse.json({}, { status: response.status });
  }

  const data = await response.json();

  return NextResponse.json(data);
}
