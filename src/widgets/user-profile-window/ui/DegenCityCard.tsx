'use client';
import { useState } from 'react';
import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';
import { cn } from '@/shared/lib/cn';
import {
  CONNECTION_STATUS_DISCONNECTED,
  DEGENCITY_USERNAME_LABEL,
  DEGENCITY_USERNAME_PLACEHOLDER,
  DEGENCITY_APPLY_LABEL,
  DEGENCITY_CONNECTION,
  CONNECTION_AUTH_INPUT_CLASS,
} from '../model/constants';
import { ProviderIcon } from './ProviderIcon';

export function DegenCityCard() {
  const [username, setUsername] = useState('');
  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-3 rounded-xl bg-page-bg p-4">
      <div className="flex items-center gap-3 flex-1 min-w-0">
        <ProviderIcon iconKey="degencity" />
        <div className="flex flex-col gap-0.5 min-w-0">
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-foreground">
              {DEGENCITY_CONNECTION.name}
            </span>
            <span className="text-xs font-medium text-destructive">
              {CONNECTION_STATUS_DISCONNECTED}
            </span>
          </div>
          <span className="text-xs text-text-secondary">{DEGENCITY_CONNECTION.description}</span>
        </div>
      </div>
      <div className="flex flex-col gap-1 sm:shrink-0 sm:min-w-[200px]">
        <span className="text-xs text-text-secondary">{DEGENCITY_USERNAME_LABEL}</span>
        <div className="relative flex items-center">
          <Input
            variant="brand"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder={DEGENCITY_USERNAME_PLACEHOLDER}
            className={cn('h-9 pr-16 text-sm', CONNECTION_AUTH_INPUT_CLASS)}
          />
          <Button
            variant="ghost"
            size="none"
            className="absolute right-2 text-brand-green-to text-sm font-medium hover:bg-transparent"
          >
            {DEGENCITY_APPLY_LABEL}
          </Button>
        </div>
      </div>
    </div>
  );
}
