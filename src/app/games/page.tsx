import type { Metadata } from 'next';
import { GamesHero } from '@/widgets/games-hero';
import { GameCardsGrid } from '@/widgets/games-cards';
import { BetsStory } from '@/entities/bets-story';
import { FAQ } from '@/widgets/faq';

export const metadata: Metadata = {
  title: 'Games',
};

export default function GamesPage() {
  return (
    <main className="flex-1 flex flex-col w-full overflow-x-hidden">
      <GamesHero />
      <div className="w-full max-w-[900px] mx-auto px-4 flex flex-col gap-8">
        <GameCardsGrid columns={2} variant="wide" />
        <BetsStory />
        <FAQ />
      </div>
    </main>
  );
}
