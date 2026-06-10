import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, type Resolver } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import { toast } from 'sonner';
import { signInSchema, signUpSchema } from './schema';
import { useAuthStore } from './authStore';
import { ERROR_MESSAGE, PATHS } from './constants';
import { useRecaptcha } from './useRecaptcha';
import { api } from '@/shared/api/client';
import type { AuthResponse, SignUpSchema } from './types';

interface UseAuthParams {
  type: 'sign-in' | 'sign-up';
}

export function useAuth({ type }: UseAuthParams) {
  const { recaptchaToken, setRecaptchaToken, recaptchaKey, resetRecaptcha } = useRecaptcha();
  const setVerificationToken = useAuthStore((state) => state.setVerificationToken);
  const setEmail = useAuthStore((state) => state.setEmail);
  const schema = type === 'sign-in' ? signInSchema : signUpSchema;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpSchema>({
    resolver: zodResolver(schema) as unknown as Resolver<SignUpSchema>,
    defaultValues: {
      email: '',
      password: '',
      username: '',
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: async (data: SignUpSchema) => {
      const response = await api.post<AuthResponse>(
        PATHS[type],
        {
          ...(type === 'sign-up' && { username: data.username }),
          email: data.email,
          password: data.password,
        },
        { headers: { 'recaptcha-token': recaptchaToken! } }
      );

      return response.data;
    },
    onSuccess: (result, data) => {
      if (type === 'sign-in') {
        toast.success('Welcome back!');
      }

      if (type === 'sign-up' && result.verificationToken) {
        setVerificationToken(result.verificationToken);
        setEmail(data.email);
      }
    },
    onError: (error) => {
      if (isAxiosError(error)) {
        toast.error(error.response?.data?.error ?? ERROR_MESSAGE[type]);
      }

      resetRecaptcha();
    },
  });

  const onSubmit = handleSubmit((data) => {
    if (!recaptchaToken) {
      toast.error('Please complete the reCAPTCHA');

      return;
    }

    mutate(data);
  });

  return {
    errors,
    register,
    onSubmit,
    isPending,
    recaptchaKey,
    setRecaptchaToken,
  };
}
