'use client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { api } from '@/shared/api/client';
import { QUERY_KEYS } from '@/shared/api/query-keys';
import type { User } from '@/entities/user';
import { LOGOUT_ERROR } from './constants';

interface UseUserPanelResult {
  logout: () => void;
  isLoggingOut: boolean;
}

export function useUserPanel(): UseUserPanelResult {
  const queryClient = useQueryClient();

  const { mutate: logout, isPending: isLoggingOut } = useMutation({
    mutationFn: () => api.post('/api/auth/logout'),
    onSuccess: () => {
      queryClient.setQueryData<User | undefined>(QUERY_KEYS.currentUser, undefined);
    },
    onError: () => {
      toast.error(LOGOUT_ERROR);
    },
  });

  return { logout, isLoggingOut };
}
