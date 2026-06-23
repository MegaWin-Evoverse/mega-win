import type { ComponentProps } from 'react';
import { cn } from '@/shared/lib/cn';

function Skeleton({ className, ...props }: ComponentProps<'div'>) {
  return (
    <div
      data-slot="skeleton"
      className={cn('animate-pulse rounded-md bg-muted', className)}
      {...props}
    />
  );
}

interface FormFieldsSkeletonProps {
  count?: number;
  className?: string;
}

function FormFieldsSkeleton({ count = 3, className }: FormFieldsSkeletonProps) {
  return (
    <div className={cn('flex w-full flex-col gap-3', className)}>
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="flex w-full flex-col gap-1">
          <Skeleton className="h-4 w-32 rounded-md" />
          <Skeleton className="h-11 w-full rounded-lg" />
        </div>
      ))}
    </div>
  );
}

export { Skeleton, FormFieldsSkeleton };
