'use client';
import { Button } from '@/shared/ui/button';
import { GAME_PANEL_LABELS } from '@/shared/config';

interface Props {
  onBetHalf: () => void;
  onBetDouble: () => void;
  onBetMax: () => void;
  disabled?: boolean;
}

export function QuickBetButtons({ onBetHalf, onBetDouble, onBetMax, disabled }: Props) {
  return (
    <div className="flex items-center gap-1">
      <Button variant="chip" size="none" onClick={onBetHalf} disabled={disabled}>
        {GAME_PANEL_LABELS.HALF}
      </Button>
      <Button variant="chip" size="none" onClick={onBetDouble} disabled={disabled}>
        {GAME_PANEL_LABELS.DOUBLE}
      </Button>
      <Button variant="chip" size="none" onClick={onBetMax} className="px-2" disabled={disabled}>
        {GAME_PANEL_LABELS.MAX}
      </Button>
    </div>
  );
}
