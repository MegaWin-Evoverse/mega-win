import { type NextRequest, NextResponse } from 'next/server';

const BACKEND_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

const CONTENT_TYPE_HEADER = 'Content-Type';
const COOKIE_HEADER = 'cookie';
const JSON_CONTENT_TYPE = 'application/json';
const PATH_SEGMENT_SEPARATOR = '/';
const METHODS_WITHOUT_BODY = ['GET', 'HEAD'] as const;

interface ProxyContext {
  params: Promise<{ path: string[] }>;
}

async function proxyToBackend(request: NextRequest, context: ProxyContext): Promise<Response> {
  const { path } = await context.params;
  const targetUrl = `${BACKEND_BASE_URL}/${path.join(PATH_SEGMENT_SEPARATOR)}${request.nextUrl.search}`;

  const requestHeaders = new Headers();
  requestHeaders.set(CONTENT_TYPE_HEADER, JSON_CONTENT_TYPE);

  const cookieHeader = request.headers.get(COOKIE_HEADER);
  if (cookieHeader) {
    requestHeaders.set(COOKIE_HEADER, cookieHeader);
  }

  const hasBody = !METHODS_WITHOUT_BODY.some((method) => method === request.method);
  const requestBody = hasBody ? await request.text() : undefined;

  const backendResponse = await fetch(targetUrl, {
    method: request.method,
    headers: requestHeaders,
    body: requestBody,
  });

  const responseBody = await backendResponse.text();
  const responseHeaders = new Headers();
  responseHeaders.set(
    CONTENT_TYPE_HEADER,
    backendResponse.headers.get(CONTENT_TYPE_HEADER) ?? JSON_CONTENT_TYPE
  );

  return new NextResponse(responseBody, {
    status: backendResponse.status,
    headers: responseHeaders,
  });
}

export async function GET(request: NextRequest, context: ProxyContext): Promise<Response> {
  return proxyToBackend(request, context);
}

export async function POST(request: NextRequest, context: ProxyContext): Promise<Response> {
  return proxyToBackend(request, context);
}

export async function PUT(request: NextRequest, context: ProxyContext): Promise<Response> {
  return proxyToBackend(request, context);
}

export async function PATCH(request: NextRequest, context: ProxyContext): Promise<Response> {
  return proxyToBackend(request, context);
}

export async function DELETE(request: NextRequest, context: ProxyContext): Promise<Response> {
  return proxyToBackend(request, context);
}
