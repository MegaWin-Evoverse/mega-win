'use client';

import { type ReactNode } from 'react';

import { cn } from '@/shared/lib/cn';
import { Button } from '@/shared/ui/button';

interface Props {
  onClick: () => void;
  children: ReactNode;
  className?: string;
}

export function BetChipButton({ onClick, children, className }: Props) {
  return (
    <Button
      variant="ghost"
      size="none"
      onClick={onClick}
      className={cn(
        'game-chip h-7 min-w-7 rounded-[6.4px] px-1.5 font-outfit text-xs font-semibold hover:opacity-80',
        className
      )}
    >
      {children}
    </Button>
  );
}
