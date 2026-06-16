import { ControlPanel } from '@/widgets/control-panel';
import { GAME } from '@/entities/game';

export default function DicePage() {
  return <ControlPanel game={GAME.DICE} />;
}
