import type { ReactNode } from 'react';
import { cn } from '@/shared/lib/cn';

interface Props {
  controls: ReactNode;
  gameField?: ReactNode;
  className?: string;
}

export function GameLayout({ controls, gameField, className }: Props) {
  return (
    <div
      className={cn(
        'game-layout mx-auto flex w-full max-w-[1017px] flex-col overflow-hidden lg:h-[668px] lg:flex-row lg:rounded-[16px]',
        className
      )}
    >
      {controls}
      <div className="order-first min-h-[320px] w-full flex-1 bg-bg-primary lg:order-none lg:min-h-0">
        {gameField}
      </div>
    </div>
  );
}
