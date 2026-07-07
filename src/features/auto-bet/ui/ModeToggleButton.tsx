import type { ReactNode } from 'react';
import { Button } from '@/shared/ui/button';
import { cn } from '@/shared/lib/cn';

interface Props {
  active: boolean;
  onClick: () => void;
  children: ReactNode;
}

export function ModeToggleButton({ active, onClick, children }: Props) {
  return (
    <Button
      variant="tab"
      size="none"
      onClick={onClick}
      className={cn(
        'h-7 rounded px-3 font-outfit text-xs font-semibold transition-all',
        active
          ? 'bg-gradient-to-b from-brand-green-from to-brand-green-to text-brand-dark'
          : 'bg-gradient-to-b from-auth-surface-dim to-auth-surface-light-dim text-brand-text-light'
      )}
    >
      {children}
    </Button>
  );
}
