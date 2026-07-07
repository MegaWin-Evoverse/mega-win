'use client';
import { cn } from '@/shared/lib/cn';
import type { StepCardData } from '../model/types';

interface Props {
  mediaVariant: StepCardData['mediaVariant'];
}

const SPARKLES = [
  'w-[6px] h-[6px] left-[184px] top-[93px]',
  'w-[6px] h-[6px] left-[193px] top-[75px]',
  'w-[9px] h-[9px] left-[216px] top-[38px]',
  'w-[9px] h-[9px] left-[127px] top-[15px]',
  'w-[12px] h-[12px] left-[121px] top-[67px]',
  'w-[6px] h-[6px] left-[150px] top-[93px]',
  'w-[6px] h-[6px] left-[150px] top-[67px]',
] as const;

export function MediaGlows({ mediaVariant }: Props) {
  if (mediaVariant === 'degencity') {
    return (
      <>
        <div className="gs-glow-purple-top absolute left-1/2 -top-[70px] h-[200px] w-[576px] -translate-x-1/2 rounded-[86px] z-0 pointer-events-none" />
        <div className="gs-glow-green absolute left-[calc(50%-385px)] -bottom-[120px] h-[310px] w-[310px] rounded-full z-0 pointer-events-none" />
      </>
    );
  }

  if (mediaVariant === 'discord') {
    return (
      <>
        <div className="gs-glow-rect-purple absolute left-[calc(50%-43px)] -top-[39px] h-[205px] w-[205px] rotate-45 rounded-[100px] z-0 pointer-events-none" />
        {SPARKLES.map((sparkle) => (
          <div
            key={sparkle}
            className={cn('gs-sparkle absolute rounded-full z-10 pointer-events-none', sparkle)}
          />
        ))}
      </>
    );
  }

  return (
    <>
      <div className="gs-glow-purple-top absolute left-1/2 -top-[70px] h-[200px] w-[576px] -translate-x-1/2 rounded-[86px] z-0 pointer-events-none" />
      <div className="gs-glow-blue absolute left-[calc(50%-170px)] -bottom-[140px] h-[310px] w-[310px] rounded-full z-0 pointer-events-none" />
      <div className="gs-glow-violet absolute left-[calc(50%+170px)] -bottom-[280px] h-[310px] w-[310px] rounded-full z-0 pointer-events-none" />
    </>
  );
}
