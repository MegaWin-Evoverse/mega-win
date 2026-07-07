import { Copy, Check } from 'lucide-react';
import { Button } from '@/shared/ui/button';
import { TableCell } from '@/shared/ui/table';
import { CELL_CLASS, SEED_TRUNCATE_LENGTH } from '../model/constants';

interface Props {
  seed: string;
  copyKey: string;
  copiedKey: string | null;
  ariaLabel: string;
  onCopy: (value: string, key: string) => void;
}

export function SeedHistoryCell({ seed, copyKey, copiedKey, ariaLabel, onCopy }: Props) {
  return (
    <TableCell className={CELL_CLASS}>
      <div className="flex items-center gap-1.5">
        <span className="font-mono text-sm">{seed.slice(0, SEED_TRUNCATE_LENGTH)}…</span>
        <Button
          variant="ghost"
          size="none"
          aria-label={ariaLabel}
          onClick={() => onCopy(seed, copyKey)}
          className="shrink-0 p-0.5 text-muted-foreground hover:text-foreground"
        >
          {copiedKey === copyKey ? (
            <Check className="size-3.5 text-brand-green-to" />
          ) : (
            <Copy className="size-3.5" />
          )}
        </Button>
      </div>
    </TableCell>
  );
}
