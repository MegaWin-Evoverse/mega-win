'use client';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { resetPassword } from '../api/resetPasswordApi';
import { TOAST_SUCCESS, TOAST_ERROR } from './constants';

export function useResetPasswordMutation(onSuccess: () => void) {
  const { mutate, isPending } = useMutation({
    mutationFn: resetPassword,
    onSuccess: () => {
      toast.success(TOAST_SUCCESS);
      onSuccess();
    },
    onError: () => {
      toast.error(TOAST_ERROR);
    },
  });

  return { mutate, isPending };
}
