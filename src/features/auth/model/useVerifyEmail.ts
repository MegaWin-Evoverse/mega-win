import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { verifyEmailSchema } from './schema';
import { useAuthStore } from './authStore';
import { PATHS } from './constants';
import { VerifyEmailSchema } from './types';
import { toast } from 'sonner';
import { authApi } from '@/shared/api/client';

export function useVerifyEmail() {
  const { verificationToken, setTokens, clearVerificationToken } = useAuthStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<VerifyEmailSchema>({
    resolver: zodResolver(verifyEmailSchema),
    defaultValues: { code: '' },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: async (data: VerifyEmailSchema) => {
      const response = await authApi.post<{ accessToken: string; refreshToken: string }>(
        PATHS['verify-email'],
        {
          verificationToken,
          code: data.code,
        }
      );
      return response.data;
    },
    onSuccess: (result) => {
      setTokens(result.accessToken, result.refreshToken);
    },
    onError: () => {
      toast.error('Invalid or expired verification code');
    },
  });

  const onSubmit = handleSubmit((data) => {
    if (!verificationToken) return;
    mutate(data);
  });

  return {
    errors,
    register,
    onSubmit,
    isPending,
    clearVerificationToken,
  };
}
