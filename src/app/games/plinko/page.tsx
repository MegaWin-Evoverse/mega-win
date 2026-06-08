import { PlinkoControls } from '@/features/plinko-controls';
import { GameLayout } from '@/widgets/game-layout';

export default function PlinkoPage() {
  return <GameLayout controls={<PlinkoControls />} />;
}
