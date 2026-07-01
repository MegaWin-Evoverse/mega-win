import type { SocialProvider } from './types';

export const BUTTON_TEXT = {
  'sign-up': 'Register',
  'sign-in': 'Log In',
} as const;

export const AUTH_TABS = [
  { value: 'sign-in', label: BUTTON_TEXT['sign-in'] },
  { value: 'sign-up', label: BUTTON_TEXT['sign-up'] },
] as const;

export const OTP_LENGTH = 6;

export const SOCIAL_PROVIDER_ID = {
  google: 'google',
  discord: 'discord',
  steam: 'steam',
} as const;

export const SOCIAL_DIVIDER_LABEL = 'OR';

export const SOCIAL_ICON_SIZE = 24;

export const SOCIAL_PROVIDERS: readonly SocialProvider[] = [
  { id: SOCIAL_PROVIDER_ID.google, label: 'Google', iconSrc: '/google-icon.svg', isEnabled: true },
  {
    id: SOCIAL_PROVIDER_ID.discord,
    label: 'Discord',
    iconSrc: '/discord-icon.svg',
    isEnabled: false,
  },
  { id: SOCIAL_PROVIDER_ID.steam, label: 'Steam', iconSrc: '/steam-icon.svg', isEnabled: false },
];
