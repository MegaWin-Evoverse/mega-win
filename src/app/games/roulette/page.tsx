import { GameLayout } from '@/widgets/game-layout';
import { RouletteControls } from '@/widgets/roulette-game';

export default function RoulettePage() {
  return <GameLayout controls={<RouletteControls />} />;
}
