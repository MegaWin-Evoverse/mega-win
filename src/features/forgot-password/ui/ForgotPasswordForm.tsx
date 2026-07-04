'use client';
import { useAuthStore } from '@/features/auth';
import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';
import { FieldError } from '@/shared/ui/field-error';
import { useForgotPassword } from '../model/useForgotPassword';
import {
  FORGOT_PASSWORD_BACK_LABEL,
  FORGOT_PASSWORD_DESCRIPTION,
  FORGOT_PASSWORD_SUBMIT_LABEL,
  FORGOT_PASSWORD_SUCCESS_MESSAGE,
  FORGOT_PASSWORD_TITLE,
} from '../model/constants';

export function ForgotPasswordForm() {
  const closeForgotPassword = useAuthStore((state) => state.closeForgotPassword);
  const { errors, register, onSubmit, isPending, isSuccess } = useForgotPassword();

  return (
    <div className="w-full">
      <Button
        type="button"
        variant="ghost"
        size="default"
        onClick={closeForgotPassword}
        className="mb-[24px] w-fit px-0 text-sm text-auth-text-secondary hover:bg-transparent hover:text-auth-text"
      >
        {FORGOT_PASSWORD_BACK_LABEL}
      </Button>
      <h2 className="mb-[12px] text-2xl font-bold text-auth-text">{FORGOT_PASSWORD_TITLE}</h2>
      <p className="mb-[24px] text-sm leading-relaxed text-auth-text-secondary">
        {FORGOT_PASSWORD_DESCRIPTION}
      </p>
      <form onSubmit={onSubmit} className="flex flex-col gap-[16px]">
        <div className="flex flex-col gap-[4px]">
          <label
            className="text-sm font-light text-auth-text-secondary"
            htmlFor="forgot-password-email"
          >
            Email
          </label>
          <Input
            id="forgot-password-email"
            placeholder="Enter your email"
            type="email"
            className="h-[42px] rounded-[8px] border-auth-surface bg-auth-bg focus-visible:ring-0 focus-visible:border-button-brand-bg-dark transition-colors duration-200"
            {...register('email')}
          />
          {errors.email && <FieldError message={errors.email.message} />}
        </div>
        {isSuccess && <p className="text-sm text-text-brand">{FORGOT_PASSWORD_SUCCESS_MESSAGE}</p>}
        <Button
          className="h-[48px] w-full rounded-[8px] border-0 bg-auth-btn-primary text-lg font-medium text-auth-btn-text hover:bg-auth-btn-primary hover:opacity-90"
          type="submit"
          disabled={isPending}
        >
          {FORGOT_PASSWORD_SUBMIT_LABEL}
        </Button>
      </form>
    </div>
  );
}
