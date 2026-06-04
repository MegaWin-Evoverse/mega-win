'use client';

import { useVerifyEmail } from '@/features/auth';
import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';
import { Error } from '@/shared/ui/error';

export function VerifyEmailForm() {
  const { errors, register, onSubmit, isPending, clearVerificationToken } = useVerifyEmail();

  return (
    <form onSubmit={onSubmit}>
      <p className="text-background mb-[16px] text-sm">
        We sent a verification code to your email. Enter it below to complete registration.
      </p>

      <div className="flex flex-col gap-[8px] mb-[16px]">
        <label className="text-background" htmlFor="code">
          Verification code
        </label>
        <Input id="code" placeholder="123456" type="text" {...register('code')} />
        {errors.code && <Error message={errors.code.message} />}
      </div>

      <Button className="mb-[12px]" type="submit" disabled={isPending}>
        Verify email
      </Button>

      <button
        type="button"
        onClick={clearVerificationToken}
        className="text-background text-sm underline opacity-60 hover:opacity-100"
      >
        Back to registration
      </button>
    </form>
  );
}
