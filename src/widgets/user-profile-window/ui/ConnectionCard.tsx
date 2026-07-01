import { Button } from '@/shared/ui/button';
import { CONNECTION_STATUS_DISCONNECTED, CONNECTION_CONNECT_LABEL } from '../model/constants';
import { ProviderIcon } from './ProviderIcon';
import type { SOCIAL_CONNECTIONS } from '../model/constants';

type SocialConnectionKey = (typeof SOCIAL_CONNECTIONS)[number]['key'];

interface Props {
  iconKey: SocialConnectionKey;
  name: string;
  description: string;
}

export function ConnectionCard({ iconKey, name, description }: Props) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-3 rounded-xl bg-page-bg p-4">
      <div className="flex items-center gap-3 flex-1 min-w-0">
        <ProviderIcon iconKey={iconKey} />
        <div className="flex flex-col gap-0.5 min-w-0">
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-foreground">{name}</span>
            <span className="text-xs font-medium text-destructive">
              {CONNECTION_STATUS_DISCONNECTED}
            </span>
          </div>
          <span className="text-xs text-text-secondary">{description}</span>
        </div>
      </div>
      <Button variant="tab-active" size="sm" className="w-full sm:w-auto sm:shrink-0 px-5">
        {CONNECTION_CONNECT_LABEL}
      </Button>
    </div>
  );
}
