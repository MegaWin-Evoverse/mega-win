'use client';
import { X } from 'lucide-react';
import { useVerifyEmail, useAuthStore } from '@/features/auth';
import { Button } from '@/shared/ui/button';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/shared/ui/input-otp';
import { FieldError } from '@/shared/ui/field-error';
import { OTP_LENGTH } from '../model/constants';

interface Props {
  email: string | null;
}

export function VerifyEmailForm({ email }: Props) {
  const closeAuthForm = useAuthStore((state) => state.closeAuthForm);
  const { errors, code, handleCodeChange, onSubmit, isPending, clearVerificationToken } =
    useVerifyEmail();

  return (
    <div className="relative flex w-full flex-col items-center bg-bg-primary rounded-xl p-[24px] sm:p-[40px]">
      <Button
        type="button"
        variant="ghost"
        size="icon"
        onClick={closeAuthForm}
        className="absolute right-[20px] top-[20px] size-[20px] text-auth-text-secondary hover:bg-transparent hover:text-auth-text z-20"
        aria-label="Close form"
      >
        <X className="size-[20px]" />
      </Button>
      <form onSubmit={onSubmit} className="flex w-full flex-col items-center text-center">
        <h2 className="mb-[12px] text-2xl font-bold text-auth-text">Your code is on the way!</h2>
        <p className="mb-[32px] text-sm leading-relaxed text-auth-text-secondary">
          To log in, enter the code we emailed to{' '}
          {email && <span className="font-medium text-primary">{email}</span>}
          {!email && <span className="font-medium text-primary">your email</span>}
          <br />
          It may take a minute to arrive
        </p>
        <div className="mb-[8px] flex w-full justify-center">
          <InputOTP maxLength={OTP_LENGTH} value={code} onChange={handleCodeChange}>
            <InputOTPGroup className="gap-[8px]">
              {Array.from({ length: OTP_LENGTH }).map((_, i) => (
                <InputOTPSlot
                  key={i}
                  index={i}
                  className="size-[56px] rounded-[10px] border border-auth-surface bg-auth-bg text-lg font-medium text-auth-text first:rounded-l-[10px] last:rounded-r-[10px] data-[active=true]:border-button-brand-bg-dark data-[active=true]:ring-0"
                />
              ))}
            </InputOTPGroup>
          </InputOTP>
        </div>
        {errors.code && (
          <div className="mb-[8px]">
            <FieldError message={errors.code.message} />
          </div>
        )}
        <Button
          className="mb-[16px] mt-[24px] h-[48px] w-full rounded-[8px] border-0 bg-auth-btn-primary text-lg font-medium text-auth-btn-text hover:bg-auth-btn-primary hover:opacity-90"
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
          className="text-sm text-auth-text-secondary underline opacity-60 hover:bg-transparent hover:opacity-100"
        >
          Back to registration
        </Button>
      </form>
    </div>
  );
}
