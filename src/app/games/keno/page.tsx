import { GameLayout } from '@/widgets/game-layout';
import { KenoControls, KenoGameField } from '@/widgets/keno-game';

export default function KenoPage() {
  return <GameLayout controls={<KenoControls />} gameField={<KenoGameField />} />;
}
