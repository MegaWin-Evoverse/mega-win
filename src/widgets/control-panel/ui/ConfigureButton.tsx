import { Button } from '@/shared/ui/button';
import { CONTROL_PANEL_LABELS } from '../model/constants';

export function ConfigureButton() {
  return (
    <Button variant="action" size="action" className="w-full">
      {CONTROL_PANEL_LABELS.CONFIGURE}
    </Button>
  );
}
