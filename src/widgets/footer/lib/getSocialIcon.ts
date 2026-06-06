import { type ComponentType } from 'react';
import { FaFacebookF, FaInstagram, FaXTwitter, FaTelegram, FaDiscord } from 'react-icons/fa6';
import { SOCIAL_LINKS } from '@/shared/config';

type SocialIconName = (typeof SOCIAL_LINKS)[number]['icon'];

const socialIcons = {
  facebook: FaFacebookF,
  instagram: FaInstagram,
  twitter: FaXTwitter,
  telegram: FaTelegram,
  discord: FaDiscord,
} satisfies Record<SocialIconName, ComponentType<{ className?: string }>>;

export function getSocialIcon(iconName: SocialIconName) {
  return socialIcons[iconName];
}
