'use client';

import { useSignIn } from '@/features/auth';
import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';
import { Recaptcha } from '@/shared/ui/recaptcha';
import { FieldError } from '@/shared/ui/field-error';
import { BUTTON_TEXT } from '../model/constants';
import { GoogleIcon } from './icons/GoogleIcon';
import { DiscordIcon } from './icons/DiscordIcon';
import { SteamIcon } from './icons/SteamIcon';

export function SignInFormBody() {
  const { errors, register, onSubmit, isPending, recaptchaKey, setRecaptchaToken } = useSignIn();

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
          className="h-[42px] rounded-[8px] border-auth-surface bg-auth-bg"
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
          className="h-[42px] rounded-[8px] border-auth-surface bg-auth-bg"
          {...register('password')}
        />
        {errors.password && <FieldError message={errors.password.message} />}
      </div>
      <Recaptcha key={recaptchaKey} onChange={setRecaptchaToken} />
      <Button
        className="h-[48px] w-full rounded-[8px] border-0 bg-auth-btn-primary text-lg font-medium text-auth-btn-text hover:bg-auth-btn-primary hover:opacity-90"
        type="submit"
        disabled={isPending}
      >
        {BUTTON_TEXT['sign-in']}
      </Button>
      <div className="flex items-center gap-[10px]">
        <div className="h-px flex-1 rounded-[6px] bg-auth-surface" />
        <span className="text-sm uppercase text-auth-text-muted">OR</span>
        <div className="h-px flex-1 rounded-[6px] bg-auth-surface" />
      </div>
      <div className="flex gap-[16px]">
        <Button
          type="button"
          variant="ghost"
          className="h-[48px] flex-1 rounded-[8px] border border-auth-surface bg-auth-btn-social hover:bg-auth-btn-social hover:opacity-85"
          disabled
        >
          <GoogleIcon />
        </Button>
        <Button
          type="button"
          variant="ghost"
          className="h-[48px] flex-1 rounded-[8px] border border-auth-surface bg-auth-btn-social hover:bg-auth-btn-social hover:opacity-85"
          disabled
        >
          <DiscordIcon />
        </Button>
        <Button
          type="button"
          variant="ghost"
          className="h-[48px] flex-1 rounded-[8px] border border-auth-surface bg-auth-btn-social hover:bg-auth-btn-social hover:opacity-85"
          disabled
        >
          <SteamIcon />
        </Button>
      </div>
    </form>
  );
}
