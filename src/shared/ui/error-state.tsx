'use client';
import { AlertCircle } from 'lucide-react';
import { cn } from '@/shared/lib/cn';
import { Button } from '@/shared/ui/button';

interface Props {
  title?: string;
  message?: string;
  onRetry?: () => void;
  className?: string;
}

export function ErrorState({
  title = 'Something went wrong',
  message = 'An unexpected error occurred. Please try again.',
  onRetry,
  className,
}: Props) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center text-center p-6 bg-bg-primary/60 border border-border-default/80 rounded-xl min-h-[220px] gap-4',
        className
      )}
    >
      <div className="flex items-center justify-center w-12 h-12 rounded-full bg-destructive/10 text-destructive">
        <AlertCircle className="w-6 h-6" />
      </div>
      <div className="flex flex-col gap-1.5 max-w-[280px]">
        <h4 className="font-outfit font-semibold text-base text-brand-text-white">{title}</h4>
        <p className="font-outfit text-sm text-brand-text-light leading-relaxed">{message}</p>
      </div>
      {onRetry && (
        <Button
          type="button"
          variant="tab"
          size="none"
          onClick={onRetry}
          className="flex h-10 px-6 items-center justify-center rounded-lg border border-border-default bg-gradient-to-b from-auth-surface to-auth-surface-light hover:brightness-110 active:scale-95 transition-all font-outfit font-medium text-sm text-brand-text-white cursor-pointer mt-1"
        >
          Try Again
        </Button>
      )}
    </div>
  );
}
