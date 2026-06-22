import { type ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

export default function GamesLayout({ children }: Props) {
  return <div className="games-shell pt-8 pb-10">{children}</div>;
}
