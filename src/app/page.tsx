import { Hero } from '@/widgets/hero';
import { TotalRewards } from '@/widgets/total-rewards';
import { Features } from '@/widgets/feature-section';
import { ActiveCampaigns } from '@/widgets/active-campaigns';
import { GettingStarted } from '@/widgets/getting-started';
import { GameCards } from '@/widgets/games-cards';
import { MonthlyLeaderboard } from '@/widgets/monthly-leaderboard';
import { FAQ } from '@/widgets/faq';
import { RevealOnScroll } from '@/shared/ui/RevealOnScroll';

export default function Home() {
  return (
    <main className="flex-1 flex flex-col w-full overflow-x-clip">
      <RevealOnScroll triggerOn="mount" className="w-full">
        <Hero />
      </RevealOnScroll>
      <div className="w-full max-w-[1133px] mx-auto px-4 mt-8 flex flex-col gap-8">
        <RevealOnScroll className="w-full">
          <ActiveCampaigns />
        </RevealOnScroll>
        <RevealOnScroll className="w-full">
          <TotalRewards />
        </RevealOnScroll>
        <RevealOnScroll className="w-full">
          <Features />
        </RevealOnScroll>
        <RevealOnScroll className="w-full">
          <GettingStarted />
        </RevealOnScroll>
        <RevealOnScroll className="w-full">
          <GameCards />
        </RevealOnScroll>
        <RevealOnScroll className="w-full">
          <MonthlyLeaderboard />
        </RevealOnScroll>
        <RevealOnScroll className="w-full">
          <FAQ />
        </RevealOnScroll>
      </div>
      <div className="flex-1 flex flex-col gap-6 p-6"></div>
    </main>
  );
}
