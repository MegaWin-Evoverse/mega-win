import type { ReactNode } from 'react';
import { FaFacebookF, FaInstagram, FaXTwitter, FaTelegram, FaDiscord } from 'react-icons/fa6';
import { SOCIAL_LINKS } from '@/shared/config';

type SocialIconName = (typeof SOCIAL_LINKS)[number]['icon'];

export function getSocialIcon(iconName: SocialIconName): ReactNode {
  switch (iconName) {
    case 'facebook':
      return <FaFacebookF className="size-5" />;
    case 'instagram':
      return <FaInstagram className="size-5" />;
    case 'twitter':
      return <FaXTwitter className="size-5" />;
    case 'telegram':
      return <FaTelegram className="size-5" />;
    case 'discord':
      return <FaDiscord className="size-5" />;
    default:
      return null;
  }
}
