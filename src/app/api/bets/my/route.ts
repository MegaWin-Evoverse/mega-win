import { NextResponse } from 'next/server';
import { MY_BETS_PAGE_SIZE, MY_BETS_QUERY_PARAM, MY_BETS_BACKEND_PATH } from '@/entities/my-bets';

const DEFAULT_PAGE = '1';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const params = new URLSearchParams();

  params.set(MY_BETS_QUERY_PARAM.PAGE, searchParams.get(MY_BETS_QUERY_PARAM.PAGE) ?? DEFAULT_PAGE);
  params.set(
    MY_BETS_QUERY_PARAM.TAKE,
    searchParams.get(MY_BETS_QUERY_PARAM.TAKE) ?? String(MY_BETS_PAGE_SIZE)
  );

  const gameSlug = searchParams.get(MY_BETS_QUERY_PARAM.GAME_SLUG);
  if (gameSlug) params.set(MY_BETS_QUERY_PARAM.GAME_SLUG, gameSlug);

  const sort = searchParams.get(MY_BETS_QUERY_PARAM.SORT);
  if (sort) params.set(MY_BETS_QUERY_PARAM.SORT, sort);

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}${MY_BETS_BACKEND_PATH}?${params.toString()}`,
    {
      headers: {
        Cookie: request.headers.get('cookie') ?? '',
      },
    }
  );

  if (!response.ok) {
    return NextResponse.json({}, { status: response.status });
  }

  const data = await response.json();

  return NextResponse.json(data);
}
