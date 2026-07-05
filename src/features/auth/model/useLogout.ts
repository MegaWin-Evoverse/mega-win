'use client';
import { useRouter } from 'next/navigation';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { api } from '@/shared/api/client';
import { QUERY_KEYS } from '@/shared/api/query-keys';
import { LOGOUT_PATH } from '@/shared/api/constants';
import { ROUTES } from '@/shared/config/routes';
import { LOGOUT_ERROR } from './constants';

interface UseLogoutResult {
  logout: () => void;
  isLoggingOut: boolean;
}

export function useLogout(): UseLogoutResult {
  const queryClient = useQueryClient();
  const router = useRouter();

  const { mutate: logout, isPending: isLoggingOut } = useMutation({
    mutationFn: () => api.post(LOGOUT_PATH),
    onSuccess: () => {
      queryClient.removeQueries({ queryKey: QUERY_KEYS.currentUser });
      queryClient.clear();
      router.push(ROUTES.HOME);
      router.refresh();
    },
    onError: () => {
      toast.error(LOGOUT_ERROR);
    },
  });

  return { logout, isLoggingOut };
}
