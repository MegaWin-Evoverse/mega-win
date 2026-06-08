'use client';

import { type ReactNode } from 'react';

import { cn } from '@/shared/lib/cn';
import { Button } from '@/shared/ui/button';

interface SegmentedTabItem<T extends string> {
  value: T;
  label: ReactNode;
  className?: string;
}

interface Props<T extends string> {
  items: SegmentedTabItem<T>[];
  value: T;
  onValueChange: (value: T) => void;
  className?: string;
}

export function SegmentedTabs<T extends string>({
  items,
  value,
  onValueChange,
  className,
}: Props<T>) {
  return (
    <div className={cn('flex items-center gap-2 rounded-[12px] bg-bg-primary p-2', className)}>
      {items.map((item) => {
        const isActive = item.value === value;

        return (
          <Button
            key={item.value}
            variant="ghost"
            size="none"
            aria-pressed={isActive}
            onClick={() => onValueChange(item.value)}
            className={cn(
              'h-11 flex-1 rounded-lg px-4 py-3 font-outfit text-base font-medium leading-5 hover:bg-transparent',
              isActive ? 'game-tab-active' : 'bg-transparent',
              item.className
            )}
          >
            {item.label}
          </Button>
        );
      })}
    </div>
  );
}
