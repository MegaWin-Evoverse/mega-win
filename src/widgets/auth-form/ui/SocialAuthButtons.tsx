'use client';
import Image from 'next/image';
import { useSocialAuth } from '@/features/auth';
import { Button } from '@/shared/ui/button';
import {
  SOCIAL_DIVIDER_LABEL,
  SOCIAL_ICON_SIZE,
  SOCIAL_PROVIDER_ID,
  SOCIAL_PROVIDERS,
} from '../model/constants';

export function SocialAuthButtons() {
  const { redirectToGoogleAuth } = useSocialAuth();

  return (
    <div className="flex w-full flex-col gap-[16px]">
      <div className="flex items-center gap-[12px]">
        <span className="h-px flex-1 bg-auth-surface" />
        <span className="text-xs font-medium tracking-wider text-auth-text-secondary">
          {SOCIAL_DIVIDER_LABEL}
        </span>
        <span className="h-px flex-1 bg-auth-surface" />
      </div>
      <div className="grid grid-cols-3 gap-[12px]">
        {SOCIAL_PROVIDERS.map((provider) => (
          <Button
            key={provider.id}
            type="button"
            variant="neutral"
            size="none"
            disabled={!provider.isEnabled}
            onClick={provider.id === SOCIAL_PROVIDER_ID.google ? redirectToGoogleAuth : undefined}
            aria-label={`Continue with ${provider.label}`}
            className="h-[52px] w-full justify-center rounded-[8px] px-0"
          >
            <Image
              src={provider.iconSrc}
              alt=""
              width={SOCIAL_ICON_SIZE}
              height={SOCIAL_ICON_SIZE}
            />
          </Button>
        ))}
      </div>
    </div>
  );
}
