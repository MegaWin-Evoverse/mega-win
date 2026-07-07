import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { signUpSchema } from './schema';
import { useAuthStore } from './authStore';
import { ERROR_MESSAGE, PATHS } from './constants';
import { api } from '@/shared/api/client';
import { getApiErrorMessage } from '@/shared/lib/getApiErrorMessage';
import type { AuthResponse, SignUpSchema } from './types';

export function useSignUp() {
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
    mutationFn: async (data: SignUpSchema) => {
      const response = await api.post<AuthResponse>(PATHS['sign-up'], {
        username: data.username,
        email: data.email,
        password: data.password,
      });
      return response.data;
    },
    onSuccess: (result, data) => {
      if (result.verificationToken) {
        setVerificationToken(result.verificationToken);
        setEmail(data.email);
      }
    },
    onError: (error) => {
      toast.error(getApiErrorMessage(error, ERROR_MESSAGE['sign-up']));
    },
  });

  const onSubmit = handleSubmit((data) => {
    mutate(data);
  });

  return { errors, register, onSubmit, isPending };
}
