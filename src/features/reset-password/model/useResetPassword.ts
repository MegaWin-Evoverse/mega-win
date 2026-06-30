'use client';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { resetPasswordSchema, type ResetPasswordFormValues } from './schema';
import { FIELD } from './constants';
import { useResetPasswordMutation } from './useResetPasswordMutation';

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

  const { mutate, isPending } = useResetPasswordMutation(() => {
    form.reset();
    onClose();
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
