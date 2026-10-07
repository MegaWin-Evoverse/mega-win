import Image from 'next/image';
import { NOT_FOUND_SUBTITLE, NOT_FOUND_TITLE } from '../model/constants';

export function NotFoundCard() {
  return (
    <div className="relative z-10 flex w-full max-w-[480px] flex-col items-center justify-center gap-4 rounded-[20px] bg-bg-primary px-5 py-6 md:max-w-[480px] md:gap-5 md:px-8 md:py-8 lg:h-[210px] lg:px-8 lg:py-8">
      <Image
        src="/404/claude.svg"
        alt=""
        aria-hidden
        width={74}
        height={54}
        className="h-auto w-[48px] md:w-[62px] lg:w-[62px]"
      />
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="font-outfit text-lg font-semibold leading-6 text-brand-text-white md:text-2xl md:leading-8 lg:max-w-[420px] lg:text-2xl lg:leading-8">
          {NOT_FOUND_TITLE}
        </h1>
        <p className="font-outfit text-xs font-semibold leading-4 text-brand-text-light md:text-base md:leading-5 lg:max-w-[420px] lg:text-base lg:leading-5">
          {NOT_FOUND_SUBTITLE}
        </p>
      </div>
    </div>
  );
}
