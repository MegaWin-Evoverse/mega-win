import { Hero } from '@/widgets/hero';
import { TotalRewards } from '@/widgets/total-rewards';
import { Features } from '@/widgets/feature-section';
import { ActiveCampaigns } from '@/widgets/active-campaigns';
import { GettingStarted } from '@/widgets/getting-started';
import { GameCards } from '@/widgets/games-cards';
import { MonthlyLeaderboard } from '@/widgets/monthly-leaderboard';
import { FAQ } from '@/widgets/faq';

export default function Home() {
  return (
    <main className="flex-1 flex flex-col w-full overflow-x-hidden">
      <Hero />
      <div className="w-full max-w-[1133px] mx-auto px-4 mt-8 flex flex-col gap-8">
        <ActiveCampaigns />
        <TotalRewards />
        <Features />
        <GettingStarted />
        <GameCards />
        <MonthlyLeaderboard />
        <FAQ />
      </div>
      <div className="flex-1 flex flex-col gap-6 p-6"></div>
    </main>
  );
}
