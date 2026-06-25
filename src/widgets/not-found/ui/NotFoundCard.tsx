import Image from 'next/image';
import { NOT_FOUND_SUBTITLE, NOT_FOUND_TITLE } from '../model/constants';

export function NotFoundCard() {
  return (
    <div className="relative z-10 flex w-full max-w-[573px] flex-col items-center justify-center gap-5 rounded-[20px] bg-bg-primary px-6 py-8 md:max-w-[573px] md:gap-6 md:px-10 md:py-10 lg:h-[250px] lg:px-10 lg:py-10">
      <Image
        src="/404/claude.svg"
        alt=""
        aria-hidden
        width={74}
        height={54}
        className="h-auto w-[56px] md:w-[74px] lg:w-[74px]"
      />
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="font-outfit text-xl font-semibold leading-7 text-brand-text-white md:text-3xl md:leading-10 lg:max-w-[493px] lg:text-3xl lg:leading-10">
          {NOT_FOUND_TITLE}
        </h1>
        <p className="font-outfit text-sm font-semibold leading-5 text-brand-text-light md:text-lg md:leading-6 lg:max-w-[493px] lg:text-lg lg:leading-6">
          {NOT_FOUND_SUBTITLE}
        </p>
      </div>
    </div>
  );
}
