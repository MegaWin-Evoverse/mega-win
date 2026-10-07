import { RewardDetails } from '@/widgets/rewards';

export default async function RewardPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  return (
    <div className="py-8 px-4 xl:px-8">
      <RewardDetails id={id} />
    </div>
  );
}
