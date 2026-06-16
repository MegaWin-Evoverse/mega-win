import { proxyAuthRequest } from '@/features/auth/server';

export async function POST(request: Request) {
  return proxyAuthRequest({ endpoint: 'auth/local/register', request, passthrough: true });
}
