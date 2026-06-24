import { NextResponse } from 'next/server';
import { MY_BETS_PAGE_SIZE } from '@/entities/my-bets';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const params = new URLSearchParams();

  params.set('page', searchParams.get('page') ?? '1');
  params.set('take', searchParams.get('take') ?? String(MY_BETS_PAGE_SIZE));

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/bets/my?${params.toString()}`, {
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
