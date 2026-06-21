'use client';
import type { ChangeEvent, ReactNode } from 'react';
import Image, { type StaticImageData } from 'next/image';
import { cn } from '@/shared/lib/cn';
import { Input } from '@/shared/ui/input';

interface Props {
  value: string;
  onValueChange?: (value: string) => void;
  onBlur?: () => void;
  inputMode?: 'decimal' | 'numeric';
  readOnly?: boolean;
  iconSrc?: StaticImageData;
  iconAlt?: string;
  iconSize?: number;
  trailing?: ReactNode;
  className?: string;
}

export function AmountInput({
  value,
  onValueChange,
  onBlur,
  inputMode = 'decimal',
  readOnly = false,
  iconSrc,
  iconAlt = '',
  iconSize = 16,
  trailing,
  className,
}: Props) {
  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    onValueChange?.(event.target.value);
  }

  return (
    <div
      className={cn(
        'flex h-11 items-center justify-between gap-2 rounded-lg border border-border-default bg-border-default/25 px-3 transition-colors duration-200',
        !readOnly && 'focus-within:border-button-brand-bg-dark',
        className
      )}
    >
      <div className="flex flex-1 items-center gap-2">
        {iconSrc && <Image src={iconSrc} alt={iconAlt} width={iconSize} height={iconSize} />}
        <Input
          inputMode={inputMode}
          value={value}
          onChange={handleChange}
          onBlur={onBlur}
          readOnly={readOnly}
          className={cn(
            'h-auto border-0 bg-transparent p-0 font-outfit text-sm text-brand-text-light shadow-none focus-visible:border-0 focus-visible:ring-0 dark:bg-transparent',
            readOnly && 'pointer-events-none select-none'
          )}
        />
      </div>
      {trailing}
    </div>
  );
}
