'use client';

import { useVerifyEmail } from '@/features/auth';
import { Button } from '@/shared/ui/button';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/shared/ui/input-otp';
import { Error } from '@/shared/ui/error';
import { OTP_LENGTH } from '../model/constants';

export function VerifyEmailForm({ email }: { email: string | null }) {
  const { errors, code, handleCodeChange, onSubmit, isPending, clearVerificationToken } =
    useVerifyEmail();

  return (
    <form onSubmit={onSubmit} className="flex flex-col items-center text-center">
      <h2 className="text-background text-2xl font-bold mb-[12px]">Your code is on the way!</h2>

      <p className="text-background/80 text-sm mb-[32px] leading-relaxed">
        To log in, enter the code we emailed to{' '}
        {email && <span className="text-primary font-medium">{email}</span>}
        {!email && <span className="text-primary font-medium">your email</span>}
        <br />
        It may take a minute to arrive
      </p>

      <div className="mb-[8px] w-full flex justify-center">
        <InputOTP maxLength={OTP_LENGTH} value={code} onChange={handleCodeChange}>
          <InputOTPGroup className="gap-[8px]">
            {Array.from({ length: OTP_LENGTH }).map((_, i) => (
              <InputOTPSlot
                key={i}
                index={i}
                className="size-[56px] rounded-[10px] border border-input/40 bg-input/20 text-lg font-medium first:rounded-l-[10px] last:rounded-r-[10px]"
              />
            ))}
          </InputOTPGroup>
        </InputOTP>
      </div>

      {errors.code && (
        <div className="mb-[8px]">
          <Error message={errors.code.message} />
        </div>
      )}

      <Button
        className="w-full h-[52px] text-base mt-[24px] mb-[16px]"
        type="submit"
        disabled={isPending || code.length < OTP_LENGTH}
      >
        Confirm
      </Button>

      <Button
        type="button"
        variant="ghost"
        size="default"
        onClick={clearVerificationToken}
        className="text-background text-sm underline opacity-60 hover:opacity-100 hover:bg-transparent"
      >
        Back to registration
      </Button>
    </form>
  );
}
