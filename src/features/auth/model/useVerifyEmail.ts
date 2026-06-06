import { useCallback } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { verifyEmailSchema } from './schema';
import { useAuthStore } from './authStore';
import { PATHS, VERIFY_EMAIL_ERROR } from './constants';
import type { VerifyEmailSchema } from './types';
import { toast } from 'sonner';
import { authApi } from '@/shared/api/client';

export function useVerifyEmail() {
  const verificationToken = useAuthStore((state) => state.verificationToken);
  const clearVerificationToken = useAuthStore((state) => state.clearVerificationToken);

  const {
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<VerifyEmailSchema>({
    resolver: zodResolver(verifyEmailSchema),
    defaultValues: { code: '' },
  });

  const code = watch('code');
  const handleCodeChange = useCallback((value: string) => setValue('code', value), [setValue]);

  const { mutate, isPending } = useMutation({
    mutationFn: async (data: VerifyEmailSchema) => {
      const response = await authApi.post<{ success: boolean }>(PATHS['verify-email'], {
        verificationToken,
        code: data.code,
      });
      return response.data;
    },
    onSuccess: () => {
      clearVerificationToken();
    },
    onError: () => {
      toast.error(VERIFY_EMAIL_ERROR);
    },
  });

  const onSubmit = handleSubmit((data) => {
    if (!verificationToken) {
      return;
    }

    mutate(data);
  });

  return {
    errors,
    code,
    handleCodeChange,
    onSubmit,
    isPending,
    clearVerificationToken,
  };
}
