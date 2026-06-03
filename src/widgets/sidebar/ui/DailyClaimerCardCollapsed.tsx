import Image from 'next/image';

import { Card } from '@/shared/ui/card';

export function DailyClaimerCardCollapsed() {
  return (
    <Card className="daily-claimer-card relative h-[51px] w-12 gap-0 overflow-hidden rounded-[7.619px] bg-daily-claimer-bg py-0 ring-0">
      {/* Green glow ellipse */}
      <div
        aria-hidden
        className="absolute bottom-0 left-1/2 h-[20px] w-full -translate-x-1/2 bg-daily-claimer-glow blur-[20px]"
      />

      {/* Chest image fills the card */}
      <Image
        src="/image-2423.png"
        fill
        unoptimized
        alt="Daily Claimer"
        className="object-contain"
      />
    </Card>
  );
}
