import { Hero, TotalRewards } from '@/widgets';

export default function Home() {
  return (
    <main className="flex-1 flex flex-col w-full">
      <Hero />
      <div className="w-full max-w-[1133px] mx-auto px-4 mt-8">
        <TotalRewards />
      </div>
      <div className="flex-1 flex flex-col gap-6 p-6"></div>
    </main>
  );
}
