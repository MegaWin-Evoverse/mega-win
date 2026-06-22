import { FAQ } from '@/widgets/faq';
import { Rewards } from '@/widgets/rewards';

export default function RewardsPage() {
  return (
    <div className="flex flex-col gap-10 py-8 px-4 xl:px-8">
      <Rewards />
      <FAQ />
    </div>
  );
}
