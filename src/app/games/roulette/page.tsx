import type { Metadata } from 'next';
import { GameLayout } from '@/widgets/game-layout';
import { RouletteControls } from '@/widgets/roulette-game';
import {
  RouletteWheel,
  SoundToggle,
  LastResults,
  RouletteResultOverlay,
} from '@/widgets/roulette-wheel';
import { RouletteTable } from '@/features/roulette-table';

export const metadata: Metadata = {
  title: 'Roulette',
};

export default function RouletteRoute() {
  return (
    <GameLayout
      controls={<RouletteControls />}
      gameField={
        <div className="relative flex h-full flex-col overflow-hidden bg-page-bg">
          <div className="roulette-vector-glow" />
          <div className="absolute left-3 sm:left-5 top-5 z-20 flex flex-col items-start gap-[13px]">
            <SoundToggle />
            <LastResults />
          </div>

          {/* Scrollable area for game board */}
          <div className="flex-1 overflow-x-hidden overflow-y-auto pb-[25px] flex flex-col items-center">
            {/* Wheel container (visibility and overlay states managed inside RouletteWheel) */}
            <div className="sm:relative">
              <RouletteWheel />
            </div>
            <RouletteTable className="relative z-10 mt-4 sm:mt-8 lg:mt-auto" />
          </div>

          <RouletteResultOverlay />
        </div>
      }
    />
  );
}
