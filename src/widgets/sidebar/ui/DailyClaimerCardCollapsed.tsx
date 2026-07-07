import Image from 'next/image';
import { Card } from '@/shared/ui/card';

export function DailyClaimerCardCollapsed() {
  return (
    <Card className="daily-claimer-card relative h-[51px] w-12 gap-0 overflow-hidden rounded-[7.619px] py-0 ring-0">
      <Image
        src="/daily-claimer-bg.webp"
        fill
        unoptimized
        priority
        alt="Daily Claimer"
        className="object-cover"
      />
    </Card>
  );
}
