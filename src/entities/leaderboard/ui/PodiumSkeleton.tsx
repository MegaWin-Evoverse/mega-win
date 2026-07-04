import { Skeleton } from '@/shared/ui/skeleton';
import { cn } from '@/shared/lib/cn';
import { PODIUM_CLASSES, PODIUM_SKELETON_COUNT } from '../model/constants';

export function PodiumSkeleton() {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-4 xl:gap-8 w-full max-w-[1000px] mx-auto z-10 relative">
      {Array.from({ length: PODIUM_SKELETON_COUNT }).map((_, idx) => (
        <Skeleton
          key={idx}
          className={cn(
            'w-full max-w-[340px] sm:max-w-none sm:w-[200px] md:w-[245px] xl:w-[280px] h-[300px] sm:h-[340px] rounded-[18px]',
            PODIUM_CLASSES[idx]
          )}
        />
      ))}
    </div>
  );
}
