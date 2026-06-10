import Link from 'next/link';
import { ROUTES } from '@/shared/config';

interface Props {
  title: string;
}

export function UnderConstruction({ title }: Props) {
  return (
    <main className="flex flex-1 flex-col items-center justify-center p-8 text-center bg-brand-bg text-brand-text-white">
      <h1 className="font-outfit text-4xl font-bold uppercase tracking-wide mb-4">{title}</h1>
      <p className="text-brand-text-light max-w-md mb-8">
        Welcome to the {title} page. This page is currently under construction.
      </p>
      <Link
        href={ROUTES.HOME}
        className="text-brand-green-from hover:text-brand-green-to transition-colors font-medium"
      >
        Go Back Home
      </Link>
    </main>
  );
}
