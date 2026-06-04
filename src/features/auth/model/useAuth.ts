import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, type Resolver } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import { toast } from 'sonner';
import { signInSchema, signUpSchema } from './schema';
import { useAuthStore } from './authStore';
import { ERROR_MESSAGE, ERROR_STATUS, PATHS } from './constants';
import { useRecaptcha } from './useRecaptcha';
import { authApi } from '@/shared/api/client';
import type { AuthResponse, SignUpSchema } from './types';

interface Props {
  type: 'sign-in' | 'sign-up';
}

export function useAuth({ type }: Props) {
  const { recaptchaToken, setRecaptchaToken, recaptchaKey, resetRecaptcha } = useRecaptcha();
  const { setTokens, setVerificationToken } = useAuthStore();
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
      const response = await authApi.post<AuthResponse>(
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
    onSuccess: (result) => {
      if (type === 'sign-up' && result.verificationToken) {
        setVerificationToken(result.verificationToken);
      }

      if (result.accessToken && result.refreshToken) {
        setTokens(result.accessToken, result.refreshToken);
      }
    },
    onError: (error) => {
      if (isAxiosError(error) && error.response?.status === ERROR_STATUS[type]) {
        toast.error(ERROR_MESSAGE[type]);
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
