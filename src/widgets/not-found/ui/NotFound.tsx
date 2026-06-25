import { NotFoundCard } from './NotFoundCard';
import { NotFoundDecorations } from './NotFoundDecorations';

export function NotFound() {
  return (
    <main className="relative isolate flex h-[calc(100dvh-8rem)] flex-col items-center gap-16 bg-page-bg px-6 pb-16 pt-12 sm:h-[calc(100dvh-4rem)] md:gap-32 md:px-12 md:pt-20 lg:gap-48 lg:px-16 lg:pb-16 lg:pt-32">
      <NotFoundDecorations />
      <NotFoundCard />
    </main>
  );
}
