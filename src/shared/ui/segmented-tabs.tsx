'use client';
import type { CSSProperties, ReactNode } from 'react';
import { useSegmentedIndicator } from '@/shared/hooks/useSegmentedIndicator';
import { cn } from '@/shared/lib/cn';
import { Button } from '@/shared/ui/button';

interface SegmentedTabItem<T extends string> {
  value: T;
  label: ReactNode;
  className?: string;
}

interface Props<T extends string> {
  items: readonly SegmentedTabItem<T>[];
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
  const { indicator, registerTab } = useSegmentedIndicator(value, items.length);

  return (
    <div
      className={cn(
        'relative flex w-full items-center rounded-[12px] bg-bg-primary p-2',
        className
      )}
    >
      {indicator && (
        <span
          aria-hidden="true"
          className="game-tab-active pointer-events-none absolute top-2 bottom-2 left-(--ind-left) w-(--ind-width) rounded-lg transition-[left,width] duration-300 ease-out"
          style={
            {
              '--ind-left': `${indicator.left}px`,
              '--ind-width': `${indicator.width}px`,
            } as CSSProperties
          }
        />
      )}
      {items.map((item) => {
        const isActive = item.value === value;
        return (
          <span key={item.value} ref={registerTab(item.value)} className="relative z-10 flex-1">
            <Button
              variant="tab"
              size="none"
              aria-pressed={isActive}
              onClick={() => onValueChange(item.value)}
              className={cn(
                'h-11 w-full rounded-lg px-4 py-3 font-outfit text-base font-medium leading-5 text-brand-text-light aria-pressed:text-brand-text-white',
                item.className
              )}
            >
              {item.label}
            </Button>
          </span>
        );
      })}
    </div>
  );
}
