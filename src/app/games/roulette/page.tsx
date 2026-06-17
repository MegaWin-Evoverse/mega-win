import { ControlPanel } from '@/widgets/control-panel';
import { GameSettingsBar } from '@/widgets/game-settings-bar';
import { BetsStory } from '@/entities/bets-story';
import { GAME } from '@/entities/game';

const GAME_BOARD_PLACEHOLDER = '[ Roulette Game Board Placeholder ]';

export default function RoulettePage() {
  return (
    <div className="flex-1 flex flex-col gap-6 p-4 lg:p-6 overflow-y-auto max-h-full w-full max-w-[1400px] mx-auto">
      <div className="flex flex-col lg:flex-row gap-6 w-full items-start">
        <ControlPanel game={GAME.ROULETTE} />
        <div className="flex-1 w-full min-h-[400px] flex items-center justify-center border border-dashed border-border/20 rounded-xl bg-bg-primary/20 text-brand-text-muted font-outfit text-sm">
          {GAME_BOARD_PLACEHOLDER}
        </div>
      </div>
      <GameSettingsBar game={GAME.ROULETTE} className="max-w-none" />
      <div className="w-full">
        <BetsStory />
      </div>
    </div>
  );
}
