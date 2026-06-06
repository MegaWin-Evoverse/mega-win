import { useState } from 'react';
import { useAuth } from '@/features/auth';
import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';
import { Recaptcha } from '@/shared/ui/recaptcha';
import { Checkbox } from '@/shared/ui/checkbox';
import { Error } from '@/shared/ui/error';
import { BUTTON_TEXT } from '../model/constants';
import { GoogleIcon } from './icons/GoogleIcon';
import { DiscordIcon } from './icons/DiscordIcon';
import { SteamIcon } from './icons/SteamIcon';
import type { AuthTab } from '../model/types';

interface Props {
  type: AuthTab;
}

export function AuthFormBody({ type }: Props) {
  const { errors, register, onSubmit, isPending, recaptchaKey, setRecaptchaToken } = useAuth({
    type,
  });
  const [isTermsAccepted, setIsTermsAccepted] = useState(false);
  const [isAgeConfirmed, setIsAgeConfirmed] = useState(false);
  const canSubmit = type === 'sign-in' || (isTermsAccepted && isAgeConfirmed);

  return (
    <form onSubmit={onSubmit}>
      {type === 'sign-up' && (
        <div className="flex flex-col gap-[8px] mb-[16px]">
          <label className="text-background" htmlFor="username">
            Username
          </label>
          <Input
            id="username"
            placeholder="Enter your username"
            type="text"
            {...register('username')}
          />
          {errors.username && <Error message={errors.username.message} />}
        </div>
      )}

      <div className="flex flex-col gap-[8px] mb-[16px]">
        <label className="text-background" htmlFor="email">
          Email
        </label>
        <Input id="email" placeholder="Enter your email" type="email" {...register('email')} />
        {errors.email && <Error message={errors.email.message} />}
      </div>

      <div className="flex flex-col gap-[8px] mb-[16px]">
        <label className="text-background" htmlFor="password">
          Password
        </label>
        <Input
          id="password"
          placeholder="Enter your password"
          type="password"
          {...register('password')}
        />
        {errors.password && <Error message={errors.password.message} />}
      </div>

      {type === 'sign-up' && (
        <div className="flex flex-col gap-[10px] mb-[20px]">
          <p className="text-background text-sm">To access the platform, please confirm:</p>
          <label className="flex items-center gap-[10px] cursor-pointer">
            <Checkbox
              checked={isTermsAccepted}
              onCheckedChange={(checked) => setIsTermsAccepted(Boolean(checked))}
            />
            <span className="text-background text-sm">
              I agree to the Terms of Service and Privacy Policy
            </span>
          </label>
          <label className="flex items-center gap-[10px] cursor-pointer">
            <Checkbox
              checked={isAgeConfirmed}
              onCheckedChange={(checked) => setIsAgeConfirmed(Boolean(checked))}
            />
            <span className="text-background text-sm">I am 18 years old or older</span>
          </label>
        </div>
      )}

      <div className="mb-[16px]">
        <Recaptcha key={recaptchaKey} onChange={setRecaptchaToken} />
      </div>

      <Button
        className="w-full h-[52px] mb-[24px] text-base"
        type="submit"
        disabled={isPending || !canSubmit}
      >
        {BUTTON_TEXT[type]}
      </Button>

      <div className="flex items-center gap-[12px] mb-[16px]">
        <div className="flex-1 h-px bg-border" />
        <span className="text-background/60 text-sm">OR</span>
        <div className="flex-1 h-px bg-border" />
      </div>

      <div className="flex gap-[8px]">
        <Button type="button" variant="outline" className="flex-1 h-[52px]" disabled>
          <GoogleIcon />
        </Button>
        <Button type="button" variant="outline" className="flex-1 h-[52px]" disabled>
          <DiscordIcon />
        </Button>
        <Button type="button" variant="outline" className="flex-1 h-[52px]" disabled>
          <SteamIcon />
        </Button>
      </div>
    </form>
  );
}
