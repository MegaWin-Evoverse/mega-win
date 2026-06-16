'use client';
import { type CSSProperties, type ReactNode } from 'react';
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
  const activeIndex = Math.max(
    0,
    items.findIndex((item) => item.value === value)
  );

  return (
    <div
      className={cn(
        'relative flex w-full items-center rounded-[12px] bg-bg-primary p-2',
        className
      )}
      style={
        {
          '--tab-count': items.length,
          '--active-index': activeIndex,
        } as CSSProperties
      }
    >
      <span
        aria-hidden="true"
        className="game-tab-active pointer-events-none absolute top-2 bottom-2 left-2 w-[calc((100%-1rem)/var(--tab-count))] translate-x-[calc(var(--active-index)*100%)] rounded-lg transition-transform duration-300 ease-out"
      />
      {items.map((item) => {
        const isActive = item.value === value;

        return (
          <Button
            key={item.value}
            variant="tab"
            size="none"
            aria-pressed={isActive}
            onClick={() => onValueChange(item.value)}
            className={cn(
              'relative z-10 h-11 flex-1 rounded-lg px-4 py-3 font-outfit text-base font-medium leading-5 text-brand-text-light aria-pressed:text-brand-text-white',
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
