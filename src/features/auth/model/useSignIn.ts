import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import { toast } from 'sonner';
import { QUERY_KEYS } from '@/shared/api/query-keys';
import { signInSchema } from './schema';
import { useAuthStore } from './authStore';
import { ERROR_MESSAGE, PATHS, RECAPTCHA_ERROR, SUCCESS_MESSAGE } from './constants';
import { useRecaptcha } from './useRecaptcha';
import { api } from '@/shared/api/client';
import type { AuthResponse, SignInSchema } from './types';

export function useSignIn() {
  const queryClient = useQueryClient();
  const { recaptchaToken, setRecaptchaToken, recaptchaKey, resetRecaptcha } = useRecaptcha();
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
    mutationFn: async (data: SignInSchema & { recaptchaToken: string }) => {
      const response = await api.post<AuthResponse>(
        PATHS['sign-in'],
        { email: data.email, password: data.password },
        { headers: { 'recaptcha-token': data.recaptchaToken } }
      );
      return response.data;
    },
    onSuccess: () => {
      closeAuthForm();
      toast.success(SUCCESS_MESSAGE['sign-in']);
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.currentUser });
    },
    onError: (error) => {
      if (isAxiosError(error)) {
        toast.error(error.response?.data?.error ?? ERROR_MESSAGE['sign-in']);
      }
      resetRecaptcha();
    },
  });

  const onSubmit = handleSubmit((data) => {
    if (!recaptchaToken) {
      toast.error(RECAPTCHA_ERROR);
      return;
    }
    mutate({ ...data, recaptchaToken });
  });

  return { errors, register, onSubmit, isPending, recaptchaKey, setRecaptchaToken };
}
