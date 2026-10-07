import Image from 'next/image';
import { CONNECTION_ICON_SRC } from '../model/constants';

type IconKey = keyof typeof CONNECTION_ICON_SRC;

interface Props {
  iconKey: IconKey;
}

export function ProviderIcon({ iconKey }: Props) {
  return (
    <Image
      src={CONNECTION_ICON_SRC[iconKey]}
      alt={iconKey}
      width={44}
      height={44}
      className="rounded-lg shrink-0"
    />
  );
}
