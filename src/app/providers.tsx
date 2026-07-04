'use client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { TooltipProvider } from '@/shared/ui/tooltip';
import type { ReactNode } from 'react';
import { useState } from 'react';
import { useUserQuery } from '@/entities/user';
import { QUERY_STALE_TIME_MS } from '@/shared/config';

interface Props {
  children: ReactNode;
}

export function Providers({ children }: Props) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: QUERY_STALE_TIME_MS,
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      <UserBootstrap />
      <TooltipProvider>{children}</TooltipProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

function UserBootstrap() {
  useUserQuery();

  return null;
}
