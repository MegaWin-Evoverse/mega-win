import { GameLayout } from '@/widgets/game-layout';
import { PlinkoControls } from '@/widgets/plinko-game';

export default function PlinkoPage() {
  return <GameLayout controls={<PlinkoControls />} />;
}
