import type { Metadata } from 'next';
import { GameLayout } from '@/widgets/game-layout';
import {
  RouletteWheel,
  SoundToggle,
  LastResults,
  RouletteResultOverlay,
} from '@/widgets/roulette-wheel';
import { RouletteTable } from '@/features/roulette-table';
import { BetsStory } from '@/entities/bets-story';
import { RouletteControls } from './RouletteControls';
import { GameSettingsBar } from '@/widgets/game-settings-bar';
import { GAME } from '@/entities/game';

export const metadata: Metadata = {
  title: 'Roulette',
};

export default function RouletteRoute() {
  return (
    <div className="game-page flex flex-col items-center px-4 py-6 lg:px-6">
      <GameLayout
        controls={<RouletteControls />}
        gameField={
          <div className="relative flex h-full flex-col overflow-hidden bg-page-bg">
            <div className="roulette-vector-glow" />
            <div className="absolute left-3 sm:left-5 top-5 z-20 flex flex-col items-start gap-[13px]">
              <SoundToggle />
              <LastResults />
            </div>
            <div className="game-field-content flex-1 overflow-x-hidden overflow-y-auto pb-[25px] flex flex-col items-center">
              <div className="sm:relative">
                <RouletteWheel />
              </div>
              <RouletteTable className="roulette-table relative z-10 mt-4 sm:mt-8 lg:mt-auto" />
            </div>
            <RouletteResultOverlay />
          </div>
        }
      />
      <GameSettingsBar game={GAME.ROULETTE} className="mt-1" />
      <div className="mt-10">
        <BetsStory />
      </div>
    </div>
  );
}
