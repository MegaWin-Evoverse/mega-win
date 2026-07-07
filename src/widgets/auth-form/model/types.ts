import type { SOCIAL_PROVIDER_ID } from './constants';

type SocialProviderId = (typeof SOCIAL_PROVIDER_ID)[keyof typeof SOCIAL_PROVIDER_ID];

export interface SocialProvider {
  id: SocialProviderId;
  label: string;
  iconSrc: string;
  isEnabled: boolean;
}
