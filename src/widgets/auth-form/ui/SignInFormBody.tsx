'use client';
import { useSignIn, useAuthStore } from '@/features/auth';
import { FORGOT_PASSWORD_LINK_LABEL } from '@/features/forgot-password';
import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';
import { FieldError } from '@/shared/ui/field-error';
import { BUTTON_TEXT } from '../model/constants';

export function SignInFormBody() {
  const { errors, register, onSubmit, isPending } = useSignIn();
  const openForgotPassword = useAuthStore((state) => state.openForgotPassword);

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-[16px]">
      <div className="flex flex-col gap-[4px]">
        <label className="text-sm font-light text-auth-text-secondary" htmlFor="email">
          Email
        </label>
        <Input
          id="email"
          placeholder="Enter your email"
          type="email"
          className="h-[42px] rounded-[8px] border-auth-surface bg-auth-bg focus-visible:ring-0 focus-visible:border-button-brand-bg-dark transition-colors duration-200"
          {...register('email')}
        />
        {errors.email && <FieldError message={errors.email.message} />}
      </div>
      <div className="flex flex-col gap-[4px]">
        <label className="text-sm font-light text-auth-text-secondary" htmlFor="password">
          Password
        </label>
        <Input
          id="password"
          placeholder="Enter your password"
          type="password"
          className="h-[42px] rounded-[8px] border-auth-surface bg-auth-bg focus-visible:ring-0 focus-visible:border-button-brand-bg-dark transition-colors duration-200"
          {...register('password')}
        />
        {errors.password && <FieldError message={errors.password.message} />}
        <Button
          type="button"
          variant="ghost"
          size="default"
          onClick={openForgotPassword}
          className="w-fit self-end px-0 text-sm text-auth-text-secondary underline opacity-60 hover:bg-transparent hover:opacity-100"
        >
          {FORGOT_PASSWORD_LINK_LABEL}
        </Button>
      </div>
      <Button
        className="h-[48px] w-full rounded-[8px] border-0 bg-auth-btn-primary text-lg font-medium text-auth-btn-text hover:bg-auth-btn-primary hover:opacity-90"
        type="submit"
        disabled={isPending}
      >
        {BUTTON_TEXT['sign-in']}
      </Button>
    </form>
  );
}
