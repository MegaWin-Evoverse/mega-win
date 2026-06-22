'use client';
import { type CSSProperties } from 'react';
import Image from 'next/image';
import { useTotalRewardsCounter } from '../model/useTotalRewardsCounter';
import dollarIcon from '../assets/icons/dollar.svg';

const DIGIT_VALUES = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
const DIGIT_HEIGHT = 40;

export function TotalRewardsCounter() {
  const digits = useTotalRewardsCounter();

  return (
    <div className="relative w-[255px] h-[43.23px] sm:w-[398.18px] sm:h-[65.79px] md:w-[414.11px] md:h-[68.41px] lg:w-[487.19px] lg:h-[80.48px] shrink-0">
      <div className="absolute left-0 top-1/2 -translate-y-1/2 origin-left scale-[0.523] sm:scale-[0.817] md:scale-[0.85] lg:scale-100 w-[487.19px] h-[80.48px] flex flex-row items-center py-3 pr-3 pl-5 gap-5 bg-page-bg rounded-xl select-none isolation-auto">
        <div className="flex items-center justify-center w-[23px] h-[40px] shrink-0 z-0">
          <Image
            src={dollarIcon}
            alt=""
            width={21}
            height={33}
            priority
            className="object-contain"
          />
        </div>
        <div className="relative flex flex-row items-center gap-[2.02px] w-[412.19px] h-[56.48px] rounded-lg shrink-0 z-10">
          {digits.map((digit, idx) => (
            <div
              key={idx}
              className="w-[49.76px] h-[56.14px] bg-bg-primary rounded-md p-[8.07px] flex justify-center items-center overflow-hidden relative shrink-0"
            >
              <div className="h-[40px] overflow-hidden relative w-full">
                <div
                  className="flex flex-col transition-transform duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] translate-y-[var(--digit-offset)]"
                  style={{ '--digit-offset': `-${digit * DIGIT_HEIGHT}px` } as CSSProperties}
                >
                  {DIGIT_VALUES.map((val) => (
                    <span
                      key={val}
                      className="h-[40px] font-outfit font-black text-[36px] leading-[40px] uppercase text-brand-text-white text-center w-full block"
                    >
                      {val}
                    </span>
                  ))}
                </div>
              </div>
              <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-bg-primary via-transparent to-bg-primary opacity-60 rounded-md" />
            </div>
          ))}
        </div>
        <span className="absolute left-[217.48px] top-[32px] font-outfit font-semibold text-[20px] leading-[24px] text-text-secondary z-20 pointer-events-none">
          ,
        </span>
        <span className="absolute left-[372.48px] top-[32px] font-outfit font-semibold text-[20px] leading-[24px] text-text-secondary z-20 pointer-events-none">
          ,
        </span>
      </div>
    </div>
  );
}
