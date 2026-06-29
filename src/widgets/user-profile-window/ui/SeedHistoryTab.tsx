import { SEED_HISTORY_EMPTY, SEED_HISTORY_TITLE } from '../model/constants';

export function SeedHistoryTab() {
  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-xl font-bold">{SEED_HISTORY_TITLE}</h3>
      <div className="py-12 text-center text-sm text-muted-foreground">{SEED_HISTORY_EMPTY}</div>
    </div>
  );
}
