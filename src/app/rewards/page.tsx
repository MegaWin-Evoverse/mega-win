import { FAQ } from '@/widgets/faq';
import { Rewards } from '@/widgets/rewards';
import { RevealOnScroll } from '@/shared/ui/RevealOnScroll';

export default function RewardsPage() {
  return (
    <div className="flex flex-col gap-10 py-8 px-4 xl:px-8">
      <RevealOnScroll triggerOn="mount" className="w-full">
        <Rewards />
      </RevealOnScroll>
      <RevealOnScroll className="w-full">
        <FAQ />
      </RevealOnScroll>
    </div>
  );
}
