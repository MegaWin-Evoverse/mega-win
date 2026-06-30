import { CircleDollarSign } from 'lucide-react';
import { Input } from '@/shared/ui/input';

interface Props {
  label: string;
  value: string;
  onValueChange: (value: string) => void;
}

export function StopField({ label, value, onValueChange }: Props) {
  return (
    <div className="flex flex-col gap-3">
      <span className="font-outfit text-xs font-semibold leading-4 text-brand-text-white">
        {label}
      </span>
      <div className="flex h-11 items-center gap-2 rounded-lg border border-border-default bg-auth-surface/25 px-3">
        <CircleDollarSign className="h-4 w-4 shrink-0 text-brand-green-to" />
        <Input
          type="number"
          value={value}
          onChange={(e) => onValueChange(e.target.value)}
          className="h-auto flex-1 border-0 bg-transparent p-0 font-outfit text-xs font-semibold text-brand-text-light focus-visible:border-0 focus-visible:ring-0"
        />
      </div>
    </div>
  );
}
