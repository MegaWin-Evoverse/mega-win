import type { ReactNode } from 'react';
import { cn } from '@/shared/lib/cn';

interface Props {
  isOpen: boolean;
  className?: string;
  openClassName?: string;
  children: ReactNode;
}

export function CollapsibleSection({ isOpen, className, openClassName, children }: Props) {
  return (
    <div
      className={cn(
        'grid transition-all duration-300 ease-in-out',
        className,
        isOpen
          ? cn('grid-rows-[1fr] opacity-100', openClassName)
          : 'grid-rows-[0fr] opacity-0 pointer-events-none lg:mt-0'
      )}
    >
      <div className="overflow-hidden">
        <div className="pt-2">{children}</div>
      </div>
    </div>
  );
}
