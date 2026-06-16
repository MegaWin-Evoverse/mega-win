import { ControlPanel } from '@/widgets/control-panel';
import { GAME } from '@/entities/game';

export default function PlinkoPage() {
  return <ControlPanel game={GAME.PLINKO} />;
}
