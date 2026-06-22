import type { Metadata } from 'next';
import { GamesHero } from '@/widgets/games-hero';
import { GameCards } from '@/widgets/games-cards';
import { BetsStory } from '@/entities/bets-story';
import { FAQ } from '@/widgets/faq';

export const metadata: Metadata = {
  title: 'Games',
};

export default function GamesPage() {
  return (
    <main className="flex-1 flex flex-col w-full overflow-x-hidden">
      <GamesHero />
      <div className="w-full max-w-[1133px] mx-auto px-4 mt-8 flex flex-col gap-8">
        <GameCards />
        <BetsStory />
        <FAQ />
      </div>
    </main>
  );
}
