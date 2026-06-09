import { Button } from '@/shared/ui/button';
import { DICE_LABELS } from '@/features/dice-controls';

export function ConfigureButton() {
  return (
    <Button variant="action" size="action" className="w-full">
      {DICE_LABELS.CONFIGURE}
    </Button>
  );
}
