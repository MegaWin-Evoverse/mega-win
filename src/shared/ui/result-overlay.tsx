import type { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

export function ResultOverlay({ children }: Props) {
  return (
    <div className="absolute inset-0 z-10 flex items-center justify-center bg-page-bg/40 backdrop-blur-md">
      {children}
    </div>
  );
}
