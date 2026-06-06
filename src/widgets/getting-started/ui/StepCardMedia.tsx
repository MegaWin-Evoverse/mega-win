import Image from 'next/image';
import { type StepCardData, GETTING_STARTED_CONSTANTS } from '../config/constants';
import { MediaGlows } from './MediaGlows';

interface Props {
  mediaVariant: StepCardData['mediaVariant'];
  decorations: StepCardData['decorations'];
}

export function StepCardMedia({ mediaVariant, decorations }: Props) {
  return (
    <div className="relative h-[210px] w-full shrink-0 overflow-hidden rounded-t-xl bg-gs-media">
      <MediaGlows mediaVariant={mediaVariant} />
      {decorations.map((decoration) => (
        <Image
          key={decoration.src}
          src={decoration.src}
          alt={GETTING_STARTED_CONSTANTS.DECORATION_ALT}
          width={decoration.width}
          height={decoration.height}
          className={decoration.className}
        />
      ))}
    </div>
  );
}
