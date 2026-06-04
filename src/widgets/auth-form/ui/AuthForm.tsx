'use client';

import { useAuth, useAuthStore } from '@/features/auth';
import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';
import { Recaptcha } from '@/shared/ui/recaptcha';
import { BUTTON_TEXT } from '../model/constants';
import { Error } from '@/shared/ui/error';
import { VerifyEmailForm } from './VerifyEmailForm';

interface Props {
  type: 'sign-in' | 'sign-up';
}

export function AuthForm({ type }: Props) {
  const { errors, register, onSubmit, isPending, recaptchaKey, setRecaptchaToken } = useAuth({
    type,
  });

  const verificationToken = useAuthStore((state) => state.verificationToken);

  if (type === 'sign-up' && verificationToken) {
    return <VerifyEmailForm />;
  }

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
        <Input id="email" placeholder="your@email.com" type="email" {...register('email')} />

        {errors.email && <Error message={errors.email.message} />}
      </div>

      <div className="flex flex-col gap-[8px] mb-[16px]">
        <label className="text-background" htmlFor="password">
          Password
        </label>
        <Input id="password" placeholder="******" type="password" {...register('password')} />
        {errors.password && <Error message={errors.password.message} />}
      </div>

      <div className="mb-[16px]">
        <Recaptcha key={recaptchaKey} onChange={setRecaptchaToken} />
      </div>

      <Button className="mb-[30px]" type="submit" disabled={isPending}>
        {BUTTON_TEXT[type]}
      </Button>
    </form>
  );
}
