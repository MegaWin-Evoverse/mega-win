import { ControlPanel } from '@/widgets/control-panel';
import { KenoGame } from '@/widgets/keno-game';
import { GAME } from '@/entities/game';

export default function Keno() {
  return (
    <div className="flex">
      <ControlPanel game={GAME.KENO} />
      <KenoGame />
    </div>
  );
}
