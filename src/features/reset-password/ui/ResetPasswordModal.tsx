'use client';
import { cn } from '@/shared/lib/cn';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '@/shared/ui/dialog';
import { Button } from '@/shared/ui/button';
import { useResetPassword } from '../model/useResetPassword';
import {
  RESET_PASSWORD_TITLE,
  RESET_PASSWORD_DESC,
  RESET_PASSWORD_BTN,
  FIELD,
  FIELD_LABELS,
  FIELD_PLACEHOLDERS,
  PASSWORD_REQUIREMENTS,
  REQUIREMENTS_TITLE,
} from '../model/constants';
import { PasswordField } from './PasswordField';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export function ResetPasswordModal({ isOpen, onClose }: Props) {
  const { form, isPending, newPassword, onSubmit } = useResetPassword(onClose);
  const {
    register,
    formState: { errors },
  } = form;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent
        showCloseButton
        className="w-[calc(100%-32px)] sm:w-full max-w-[420px] p-0 border-auth-surface bg-bg-primary max-h-[calc(100dvh-2rem)] flex flex-col overflow-hidden"
      >
        <DialogTitle className="sr-only">{RESET_PASSWORD_TITLE}</DialogTitle>
        <DialogDescription className="sr-only">{RESET_PASSWORD_DESC}</DialogDescription>
        <form
          onSubmit={onSubmit}
          className="flex flex-col gap-3 sm:gap-[16px] p-4 sm:p-[32px] overflow-y-auto"
        >
          <div className="flex flex-col gap-[4px]">
            <h2 className="text-lg sm:text-xl font-bold text-auth-text">{RESET_PASSWORD_TITLE}</h2>
            <p className="text-xs sm:text-sm font-light text-auth-text-secondary">
              {RESET_PASSWORD_DESC}
            </p>
          </div>
          <div className="flex flex-col gap-[4px]">
            <label
              className="text-sm font-light text-auth-text-secondary"
              htmlFor={FIELD.CURRENT_PASSWORD}
            >
              {FIELD_LABELS[FIELD.CURRENT_PASSWORD]}
            </label>
            <PasswordField
              id={FIELD.CURRENT_PASSWORD}
              placeholder={FIELD_PLACEHOLDERS[FIELD.CURRENT_PASSWORD]}
              error={errors[FIELD.CURRENT_PASSWORD]?.message}
              registration={register(FIELD.CURRENT_PASSWORD)}
            />
          </div>
          <div className="flex flex-col gap-[8px]">
            <div className="flex flex-col gap-[4px]">
              <label
                className="text-sm font-light text-auth-text-secondary"
                htmlFor={FIELD.NEW_PASSWORD}
              >
                {FIELD_LABELS[FIELD.NEW_PASSWORD]}
              </label>
              <PasswordField
                id={FIELD.NEW_PASSWORD}
                placeholder={FIELD_PLACEHOLDERS[FIELD.NEW_PASSWORD]}
                error={errors[FIELD.NEW_PASSWORD]?.message}
                registration={register(FIELD.NEW_PASSWORD)}
              />
            </div>
            <div className="rounded-[8px] border border-auth-surface bg-auth-bg px-4 py-3 flex flex-col gap-[6px]">
              <p className="text-sm font-semibold text-auth-text">{REQUIREMENTS_TITLE}</p>
              <ul className="flex flex-col gap-[4px]">
                {PASSWORD_REQUIREMENTS.map((req) => (
                  <li
                    key={req.label}
                    className={cn(
                      'flex items-center gap-2 text-sm font-light',
                      req.test(newPassword) ? 'text-brand-green-to' : 'text-auth-text-secondary'
                    )}
                  >
                    <span className="size-1.5 rounded-full bg-current shrink-0" />
                    {req.label}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="flex flex-col gap-[4px]">
            <label
              className="text-sm font-light text-auth-text-secondary"
              htmlFor={FIELD.CONFIRM_PASSWORD}
            >
              {FIELD_LABELS[FIELD.CONFIRM_PASSWORD]}
            </label>
            <PasswordField
              id={FIELD.CONFIRM_PASSWORD}
              placeholder={FIELD_PLACEHOLDERS[FIELD.CONFIRM_PASSWORD]}
              error={errors[FIELD.CONFIRM_PASSWORD]?.message}
              registration={register(FIELD.CONFIRM_PASSWORD)}
            />
          </div>
          <Button
            type="submit"
            disabled={isPending}
            className="h-10 sm:h-[48px] w-full rounded-[8px] border-0 bg-auth-btn-primary text-sm sm:text-lg font-medium text-auth-btn-text hover:bg-auth-btn-primary hover:opacity-90"
          >
            {RESET_PASSWORD_BTN}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
