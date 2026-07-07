import { Support } from '@/widgets/support';
import { FAQ } from '@/widgets/faq';

export default function SupportPage() {
  return (
    <div className="mx-auto flex w-full max-w-[1017px] flex-col gap-8 mb-20 max-md:mb-4 px-4 xl:px-0 py-8">
      <Support />
      <FAQ />
    </div>
  );
}
