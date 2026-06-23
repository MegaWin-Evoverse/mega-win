import { type NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;

  const url = new URL(`${process.env.NEXT_PUBLIC_API_URL}/reward/query`);

  searchParams.forEach((value, key) => url.searchParams.set(key, value));

  let response: Response;

  try {
    response = await fetch(url.toString(), {
      headers: {
        Cookie: request.headers.get('cookie') ?? '',
      },
    });
  } catch {
    return NextResponse.json({}, { status: 503 });
  }

  if (!response.ok) {
    return NextResponse.json({}, { status: response.status });
  }

  const data = await response.json();

  return NextResponse.json(data);
}
