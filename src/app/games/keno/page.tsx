import { ControlPanel } from '@/widgets/control-panel';
import { KenoGame } from '@/widgets/keno-game';

export default function Keno() {
  return (
    <div className="flex">
      <ControlPanel game="keno" />
      <KenoGame />
    </div>
  );
}
