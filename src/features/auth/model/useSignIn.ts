import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { QUERY_KEYS } from '@/shared/api/query-keys';
import { getApiErrorMessage } from '@/shared/lib/getApiErrorMessage';
import { signInSchema } from './schema';
import { useAuthStore } from './authStore';
import { ERROR_MESSAGE, PATHS, SUCCESS_MESSAGE } from './constants';
import { api } from '@/shared/api/client';
import type { AuthResponse, SignInSchema } from './types';

export function useSignIn() {
  const queryClient = useQueryClient();
  const closeAuthForm = useAuthStore((state) => state.closeAuthForm);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInSchema>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: async (data: SignInSchema) => {
      const response = await api.post<AuthResponse>(PATHS['sign-in'], {
        email: data.email,
        password: data.password,
      });
      return response.data;
    },
    onSuccess: () => {
      closeAuthForm();
      toast.success(SUCCESS_MESSAGE['sign-in']);
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.currentUser });
    },
    onError: (error) => {
      toast.error(getApiErrorMessage(error, ERROR_MESSAGE['sign-in']));
    },
  });

  const onSubmit = handleSubmit((data) => {
    mutate(data);
  });

  return { errors, register, onSubmit, isPending };
}
