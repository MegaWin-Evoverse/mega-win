import type { ReactNode } from 'react';
import { cn } from '@/shared/lib/cn';

interface Props {
  label: string;
  labelClassName?: string;
  className?: string;
  children: ReactNode;
}

export function LabeledField({ label, labelClassName, className, children }: Props) {
  return (
    <div className={cn('flex w-full flex-col gap-2', className)}>
      <span className={cn('font-outfit', labelClassName)}>{label}</span>
      {children}
    </div>
  );
}
