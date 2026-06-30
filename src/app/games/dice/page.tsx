import { ControlPanel } from '@/widgets/control-panel';
import { GAME } from '@/entities/game';
import { DiceGame } from '@/widgets/dice-game';
import { RevealOnScroll } from '@/shared/ui/RevealOnScroll';

export default function DicePage() {
  return (
    <RevealOnScroll triggerOn="mount" className="flex">
      <ControlPanel game={GAME.DICE} />
      <DiceGame />
    </RevealOnScroll>
  );
}
