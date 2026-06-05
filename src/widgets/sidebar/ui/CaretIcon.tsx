import { type ComponentProps } from 'react';
import { cn } from '@/shared/lib/cn';

interface Props extends ComponentProps<'svg'> {
  isOpen: boolean;
}

export function CaretIcon({ isOpen, className, ...props }: Props) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="currentColor"
      className={cn(
        'transition-transform duration-200 ease-in-out shrink-0',
        isOpen ? 'rotate-180' : 'rotate-0',
        className
      )}
      {...props}
    >
      <path d="M4 6.5h12l-6 7z" />
    </svg>
  );
}
