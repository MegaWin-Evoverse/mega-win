import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { forgotPasswordApi } from '../api/forgotPasswordApi';
import { forgotPasswordSchema } from './schema';
import { FORGOT_PASSWORD_ERROR } from './constants';
import type { ForgotPasswordSchema } from './types';

export function useForgotPassword() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordSchema>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { email: '' },
  });

  const { mutate, isPending, isSuccess } = useMutation({
    mutationFn: (data: ForgotPasswordSchema) => forgotPasswordApi(data.email),
    onError: () => {
      toast.error(FORGOT_PASSWORD_ERROR);
    },
  });

  const onSubmit = handleSubmit((data) => {
    mutate(data);
  });

  return { errors, register, onSubmit, isPending, isSuccess };
}
