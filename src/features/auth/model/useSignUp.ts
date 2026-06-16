import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import { toast } from 'sonner';
import { signUpSchema } from './schema';
import { useAuthStore } from './authStore';
import { ERROR_MESSAGE, PATHS, RECAPTCHA_ERROR } from './constants';
import { useRecaptcha } from './useRecaptcha';
import { api } from '@/shared/api/client';
import type { AuthResponse, SignUpSchema } from './types';

export function useSignUp() {
  const { recaptchaToken, setRecaptchaToken, recaptchaKey, resetRecaptcha } = useRecaptcha();
  const setVerificationToken = useAuthStore((state) => state.setVerificationToken);
  const setEmail = useAuthStore((state) => state.setEmail);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpSchema>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: '',
      password: '',
      username: '',
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: async (data: SignUpSchema & { recaptchaToken: string }) => {
      const response = await api.post<AuthResponse>(
        PATHS['sign-up'],
        { username: data.username, email: data.email, password: data.password },
        { headers: { 'recaptcha-token': data.recaptchaToken } }
      );
      return response.data;
    },
    onSuccess: (result, data) => {
      if (result.verificationToken) {
        setVerificationToken(result.verificationToken);
        setEmail(data.email);
      }
    },
    onError: (error) => {
      if (isAxiosError(error)) {
        toast.error(error.response?.data?.error ?? ERROR_MESSAGE['sign-up']);
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
