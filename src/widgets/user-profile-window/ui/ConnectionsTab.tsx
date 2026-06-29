import { CONNECTIONS_EMPTY, CONNECTIONS_TITLE } from '../model/constants';

export function ConnectionsTab() {
  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-xl font-bold">{CONNECTIONS_TITLE}</h3>
      <div className="py-12 text-center text-sm text-muted-foreground">{CONNECTIONS_EMPTY}</div>
    </div>
  );
}
