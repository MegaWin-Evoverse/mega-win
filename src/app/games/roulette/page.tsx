import { ControlPanel } from '@/widgets/control-panel';
import { GAME } from '@/entities/game';

export default function RoulettePage() {
  return <ControlPanel game={GAME.ROULETTE} />;
}
