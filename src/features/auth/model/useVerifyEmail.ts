import { zodResolver } from '@hookform/resolvers/zod';
import { useController, useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { verifyEmailSchema } from './schema';
import { useAuthStore } from './authStore';
import { PATHS, SUCCESS_MESSAGE, VERIFY_EMAIL_ERROR, VERIFY_EMAIL_FIELDS } from './constants';
import type { VerifyEmailSchema } from './types';
import { toast } from 'sonner';
import { api } from '@/shared/api/client';
import { QUERY_KEYS } from '@/shared/api/query-keys';

export function useVerifyEmail() {
  const queryClient = useQueryClient();
  const verificationToken = useAuthStore((state) => state.verificationToken);
  const clearVerificationToken = useAuthStore((state) => state.clearVerificationToken);
  const closeAuthForm = useAuthStore((state) => state.closeAuthForm);

  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<VerifyEmailSchema>({
    resolver: zodResolver(verifyEmailSchema),
    defaultValues: { code: '' },
  });

  const { field } = useController({ name: VERIFY_EMAIL_FIELDS.code, control });

  const { mutate, isPending } = useMutation({
    mutationFn: async (data: VerifyEmailSchema) => {
      const response = await api.post<{ success: boolean }>(PATHS['verify-email'], {
        verificationToken,
        code: data.code,
      });
      return response.data;
    },
    onSuccess: () => {
      clearVerificationToken();
      closeAuthForm();
      toast.success(SUCCESS_MESSAGE['verify-email']);
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.currentUser });
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
    code: field.value,
    isPending,
    handleCodeChange: field.onChange,
    onSubmit,
    clearVerificationToken,
  };
}
