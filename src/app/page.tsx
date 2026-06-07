import {
  Hero,
  TotalRewards,
  Features,
  ActiveCampaigns,
  GettingStarted,
  GameCards,
} from '@/widgets';

export default function Home() {
  return (
    <main className="flex-1 flex flex-col w-full">
      <Hero />
      <div className="w-full max-w-[1133px] mx-auto px-4 mt-8 flex flex-col gap-8">
        <ActiveCampaigns />
        <TotalRewards />
        <Features />
        <GettingStarted />
        <GameCards />
      </div>
      <div className="flex-1 flex flex-col gap-6 p-6"></div>
    </main>
  );
}
