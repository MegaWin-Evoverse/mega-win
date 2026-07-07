import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const url = `${process.env.NEXT_PUBLIC_API_URL}/reward/query/${id}`;

  let response: Response;

  try {
    response = await fetch(url, {
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
