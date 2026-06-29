'use client';
import { useState } from 'react';
import type { UseFormRegisterReturn } from 'react-hook-form';
import { Eye, EyeOff } from 'lucide-react';
import { Input } from '@/shared/ui/input';
import { Button } from '@/shared/ui/button';
import { FieldError } from '@/shared/ui/field-error';

interface Props {
  id: string;
  placeholder: string;
  error?: string;
  registration: UseFormRegisterReturn;
}

export function PasswordField({ id, placeholder, error, registration }: Props) {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className="flex flex-col gap-[4px]">
      <div className="relative">
        <Input
          id={id}
          type={isVisible ? 'text' : 'password'}
          placeholder={placeholder}
          className="h-9 sm:h-[42px] rounded-[8px] border-auth-surface bg-auth-bg pr-10 text-sm focus-visible:ring-0 focus-visible:border-button-brand-bg-dark transition-colors duration-200"
          {...registration}
        />
        <Button
          type="button"
          variant="ghost"
          size="icon-sm"
          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
          onClick={() => setIsVisible((v) => !v)}
          aria-label={isVisible ? 'Hide password' : 'Show password'}
        >
          {isVisible ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
        </Button>
      </div>
      {error && <FieldError message={error} />}
    </div>
  );
}
