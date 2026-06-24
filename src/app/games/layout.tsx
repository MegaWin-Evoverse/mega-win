import type { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

export default function GamesLayout({ children }: Props) {
  return <div className="games-shell pb-10">{children}</div>;
}
