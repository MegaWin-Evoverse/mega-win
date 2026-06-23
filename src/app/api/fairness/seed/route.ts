import { type NextRequest, NextResponse } from 'next/server';

const UPSTREAM_ERROR_MESSAGE = 'Upstream server returned error';
const PROXY_ERROR_MESSAGE = 'Internal server proxy error';
const PROXY_ERROR_LOG = 'Proxy fairness seed error:';

export async function GET(request: NextRequest) {
  try {
    const clientCookies = request.headers.get('cookie') || '';

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/fairness/seed`, {
      headers: {
        Accept: 'application/json',
        Cookie: clientCookies,
      },
      cache: 'no-store',
    });

    if (!response.ok) {
      return NextResponse.json({ error: UPSTREAM_ERROR_MESSAGE }, { status: response.status });
    }

    const data: unknown = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error(PROXY_ERROR_LOG, error);
    return NextResponse.json({ error: PROXY_ERROR_MESSAGE }, { status: 500 });
  }
}
