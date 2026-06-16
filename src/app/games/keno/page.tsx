import { ControlPanel } from '@/widgets/control-panel';
import { GAME } from '@/entities/game';

export default function KenoPage() {
  return <ControlPanel game={GAME.KENO} />;
}
