import { Card } from '@/shared/ui/card';
import {
  CONNECTIONS_TITLE,
  CASINO_CONNECTIONS_SECTION_TITLE,
  SOCIAL_CONNECTIONS,
} from '../model/constants';
import { ConnectionCard } from './ConnectionCard';
import { DegenCityCard } from './DegenCityCard';

export function ConnectionsTab() {
  return (
    <div className="flex flex-col gap-4">
      <section className="flex flex-col gap-3">
        <h3 className="text-xl font-bold text-foreground">{CONNECTIONS_TITLE}</h3>
        <Card variant="profile" className="p-4 md:p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {SOCIAL_CONNECTIONS.map((provider) => (
              <ConnectionCard
                key={provider.key}
                iconKey={provider.key}
                name={provider.name}
                description={provider.description}
                connectHref={provider.connectHref}
              />
            ))}
          </div>
        </Card>
      </section>
      <section className="flex flex-col gap-3">
        <h3 className="text-xl font-bold text-foreground">{CASINO_CONNECTIONS_SECTION_TITLE}</h3>
        <Card variant="profile" className="p-4 md:p-6">
          <DegenCityCard />
        </Card>
      </section>
    </div>
  );
}
