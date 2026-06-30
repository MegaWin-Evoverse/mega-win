'use client';
import { useState, type ReactElement } from 'react';
import Image from 'next/image';
import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';
import { Card } from '@/shared/ui/card';
import {
  CONNECTIONS_TITLE,
  CASINO_CONNECTIONS_SECTION_TITLE,
  CONNECTION_STATUS_DISCONNECTED,
  CONNECTION_CONNECT_LABEL,
  DEGENCITY_USERNAME_LABEL,
  DEGENCITY_USERNAME_PLACEHOLDER,
  DEGENCITY_APPLY_LABEL,
  SOCIAL_CONNECTIONS,
  DEGENCITY_CONNECTION,
  CONNECTION_ICON_SRC,
} from '../model/constants';

function KickIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="50" height="50" rx="8" fill="#53FC18" />
      <path d="M12 10h8v10l8-10h10L26 25l12 15H28L20 30v10h-8V10z" fill="#000" />
    </svg>
  );
}

function GoogleIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M43.6 20.1H42V20H24v8h11.3C33.7 32.7 29.3 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.1 7.9 3l5.7-5.7C34.5 6.5 29.5 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.6-.4-3.9z"
        fill="#FFC107"
      />
      <path
        d="M6.3 14.7l6.6 4.8C14.7 15.1 19 12 24 12c3.1 0 5.8 1.1 7.9 3l5.7-5.7C34.5 6.5 29.5 4 24 4 16.3 4 9.7 8.3 6.3 14.7z"
        fill="#FF3D00"
      />
      <path
        d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35.5 26.7 36 24 36c-5.2 0-9.6-3.3-11.2-7.9l-6.5 5C9.5 39.6 16.2 44 24 44z"
        fill="#4CAF50"
      />
      <path
        d="M43.6 20.1H42V20H24v8h11.3c-.8 2.2-2.3 4.2-4.2 5.5l6.2 5.2C37 39.1 44 34 44 24c0-1.3-.1-2.6-.4-3.9z"
        fill="#1976D2"
      />
    </svg>
  );
}

type SocialIconKey = (typeof SOCIAL_CONNECTIONS)[number]['key'];
type IconKey = SocialIconKey | typeof DEGENCITY_CONNECTION.key;
type IconComponent = ({ className }: { className?: string }) => ReactElement;

const IMAGE_ICON_SRC: Partial<Record<IconKey, string>> = {
  discord: CONNECTION_ICON_SRC.discord,
  steam: CONNECTION_ICON_SRC.steam,
  degencity: CONNECTION_ICON_SRC.degencity,
};

const SVG_ICON_MAP: Partial<Record<IconKey, IconComponent>> = {
  kick: KickIcon,
  google: GoogleIcon,
};

function ProviderIcon({ iconKey }: { iconKey: IconKey }) {
  const imageSrc = IMAGE_ICON_SRC[iconKey];
  if (imageSrc) {
    return (
      <Image src={imageSrc} alt={iconKey} width={44} height={44} className="rounded-lg shrink-0" />
    );
  }
  const Icon = SVG_ICON_MAP[iconKey];
  if (Icon) return <Icon className="size-11 shrink-0 rounded-lg" />;
  return null;
}

const AUTH_INPUT_CLASS =
  'border-auth-surface bg-auth-bg focus-visible:ring-0 focus-visible:border-button-brand-bg-dark transition-colors duration-200';

interface Props {
  iconKey: SocialIconKey;
  name: string;
  description: string;
}

function ConnectionCard({ iconKey, name, description }: Props) {
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

export function ConnectionsTab() {
  const [degenCityUsername, setDegenCityUsername] = useState('');
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
              />
            ))}
          </div>
        </Card>
      </section>
      <section className="flex flex-col gap-3">
        <h3 className="text-xl font-bold text-foreground">{CASINO_CONNECTIONS_SECTION_TITLE}</h3>
        <Card variant="profile" className="p-4 md:p-6">
          <div className="flex items-center gap-4 rounded-xl bg-page-bg p-4">
            <ProviderIcon iconKey="degencity" />
            <div className="flex flex-1 flex-col gap-0.5 min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-foreground">
                  {DEGENCITY_CONNECTION.name}
                </span>
                <span className="text-xs font-medium text-destructive">
                  {CONNECTION_STATUS_DISCONNECTED}
                </span>
              </div>
              <span className="text-xs text-text-secondary">
                {DEGENCITY_CONNECTION.description}
              </span>
            </div>
            <div className="flex flex-col gap-1 shrink-0 min-w-[200px]">
              <span className="text-xs text-text-secondary">{DEGENCITY_USERNAME_LABEL}</span>
              <div className="relative flex items-center">
                <Input
                  value={degenCityUsername}
                  onChange={(e) => setDegenCityUsername(e.target.value)}
                  placeholder={DEGENCITY_USERNAME_PLACEHOLDER}
                  className={`h-9 pr-16 text-sm ${AUTH_INPUT_CLASS}`}
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
        </Card>
      </section>
    </div>
  );
}
