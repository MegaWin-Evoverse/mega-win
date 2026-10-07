'use client';
import { useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { ROUTES, PROFILE_TAB_QUERY_KEY, PROFILE_TAB_QUERY } from '@/shared/config';
import { useUserQuery } from '@/entities/user';
import { useAuthStore } from '@/features/auth';

const CONNECTIONS_TAB_ROUTE = `${ROUTES.PROFILE}?${PROFILE_TAB_QUERY_KEY}=${PROFILE_TAB_QUERY.CONNECTIONS}`;

interface UseConnectAccountActionReturn {
  onConnectAccount: () => void;
}

export function useConnectAccountAction(): UseConnectAccountActionReturn {
  const router = useRouter();
  const { data: user } = useUserQuery();
  const openAuthForm = useAuthStore((state) => state.openAuthForm);

  const onConnectAccount = useCallback(() => {
    if (user) {
      router.push(CONNECTIONS_TAB_ROUTE);
      return;
    }

    openAuthForm();
  }, [user, router, openAuthForm]);

  return { onConnectAccount };
}
