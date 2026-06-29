'use client';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { resetPassword } from '../api/resetPasswordApi';
import { resetPasswordSchema, type ResetPasswordFormValues } from './schema';
import { FIELD, TOAST_SUCCESS, TOAST_ERROR } from './constants';

export function useResetPassword(onClose: () => void) {
  const form = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      [FIELD.CURRENT_PASSWORD]: '',
      [FIELD.NEW_PASSWORD]: '',
      [FIELD.CONFIRM_PASSWORD]: '',
    },
  });

  const newPassword = form.watch(FIELD.NEW_PASSWORD);

  const { mutate, isPending } = useMutation({
    mutationFn: resetPassword,
    onSuccess: () => {
      toast.success(TOAST_SUCCESS);
      form.reset();
      onClose();
    },
    onError: () => {
      toast.error(TOAST_ERROR);
    },
  });

  function onSubmit(values: ResetPasswordFormValues) {
    mutate({
      currentPassword: values[FIELD.CURRENT_PASSWORD],
      newPassword: values[FIELD.NEW_PASSWORD],
    });
  }

  return {
    form,
    isPending,
    newPassword,
    onSubmit: form.handleSubmit(onSubmit),
  };
}
