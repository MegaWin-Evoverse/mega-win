import type { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

export default function GamesLayout({ children }: Props) {
  return <div className="pb-10">{children}</div>;
}
