import { ControlPanel } from '@/widgets/control-panel';
import { GAME } from '@/entities/game';
import { DiceGame } from '@/widgets/dice-game';

export default function DicePage() {
  return (
    <div className="flex">
      <ControlPanel game={GAME.DICE} />;
      <DiceGame />
    </div>
  );
}
