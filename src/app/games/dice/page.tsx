import { GameLayout } from '@/widgets/game-layout';
import { DiceControls } from '@/widgets/dice-game';

export default function DicePage() {
  return <GameLayout controls={<DiceControls />} />;
}
