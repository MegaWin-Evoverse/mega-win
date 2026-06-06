'use client';

import Image from 'next/image';
import { Button } from '@/shared/ui/button';
import { BUTTON_LABELS } from '@/shared/config';
import { useIsMobile } from '@/shared/hooks/useMobile';

interface Props {
  onRegisterClick?: () => void;
}

const HERO_TITLE = 'WELCOME TO THE MEGA WIN';
const HERO_DESCRIPTION = 'Discover exciting games, earn rewards, and enjoy exclusive bonuses!';

const ARIA_HERO_SECTION = 'Hero banner';
const ARIA_REGISTER_BUTTON = 'Register for an account';

export function Hero({ onRegisterClick }: Props) {
  const isMobile = useIsMobile();
  return (
    <section
      role="region"
      aria-label={ARIA_HERO_SECTION}
      className="relative w-full min-h-[300px] flex flex-row items-center pt-[60px] pb-[40px] px-0 overflow-hidden rounded-none hero-banner-bg border-b border-brand-border shrink-0 select-none isolate"
    >
      <div className="w-full max-w-[1133px] mx-auto pl-4 pr-[530px] z-10 flex flex-col items-start gap-8">
        <div className="flex flex-col items-start">
          <h1 className="font-outfit text-4xl lg:text-5xl font-black uppercase leading-[60px] text-brand-text-white tracking-normal">
            {HERO_TITLE}
          </h1>
          <p className="font-outfit text-lg font-normal leading-6 text-brand-text-light mt-2 max-w-[542px]">
            {HERO_DESCRIPTION}
          </p>
        </div>
        <Button
          variant="main"
          size="none"
          onClick={onRegisterClick}
          aria-label={ARIA_REGISTER_BUTTON}
          className="w-[140px] h-12 rounded-lg text-lg flex items-center justify-center font-outfit font-medium text-brand-dark"
        >
          {BUTTON_LABELS.REG}
        </Button>
      </div>
      <div
        aria-hidden
        className="absolute w-[725px] h-[218px] left-[calc(50%-362.5px+184px)] bottom-[-141px] hero-ellipse-glow z-0 pointer-events-none"
      />
      <Image
        src="/hero/character.png"
        alt=""
        aria-hidden
        width={isMobile ? 650 : 480}
        height={isMobile ? 650 : 480}
        className="absolute right-[-20px] md:right-[100px]  bottom-0 z-10 pointer-events-none object-contain object-bottom"
        priority
      />
      <div className="absolute right-0 bottom-0 w-[763px] h-[303px] pointer-events-none z-0 overflow-hidden">
        <div className="absolute w-[736.02px] h-[521.51px] left-[178.44px] top-[-126.49px] opacity-50">
          <div className="absolute left-[79.71%] right-[-10.96%] top-[24.06%] bottom-[-10.74%] opacity-50 rotate-[17.47deg]">
            <div className="absolute left-[87.9%] right-[-11.66%] top-[41.19%] bottom-[-13.24%] hero-radial-glow" />
          </div>
          <div className="absolute left-[89.53%] right-[-6.51%] top-[-41.75%] bottom-[94.62%] opacity-50 rotate-[19.62deg]">
            <div className="absolute left-[93.93%] right-[-6.84%] top-[-32.55%] bottom-[93.38%] rotate-[2.15deg] hero-radial-glow" />
          </div>
          <div className="absolute left-[63.75%] right-[25.01%] top-[31.34%] bottom-[37.48%] opacity-50 rotate-[30deg]">
            <div className="absolute left-[66.42%] right-[25.03%] top-[36.94%] bottom-[37.15%] rotate-[12.53deg] hero-radial-glow" />
          </div>
          <div className="absolute left-[23.39%] right-[64.94%] top-[-7.96%] bottom-[75.58%] opacity-50 rotate-[-24.75deg]">
            <div className="absolute left-[24.5%] right-[66.62%] top-[-4.58%] bottom-[77.66%] rotate-[-42.23deg] hero-radial-glow" />
          </div>
        </div>
        <Image
          src="/hero/dolar.svg"
          alt=""
          width={142}
          height={104}
          className="absolute left-[194.39px] top-[227.69px] hero-dolar-clean object-contain"
          priority
        />
        <Image
          src="/hero/dolar-blur.svg"
          alt=""
          width={160}
          height={125}
          className="absolute left-[585px] top-[30px] hero-dolar-blur object-contain"
          priority
        />
        <Image
          src="/hero/Airbrush-1.svg"
          alt=""
          width={77}
          height={82}
          className="absolute left-[237px] top-[133.48px] hero-chip-small-blur object-contain"
          priority
        />
        <Image
          src="/hero/Airbrush-2.png"
          alt=""
          width={136}
          height={145}
          className="absolute left-[575px] top-[230px] hero-chip-large-blur object-contain"
          priority
        />
        <Image
          src="/hero/Spades-1.svg"
          alt=""
          width={93}
          height={179}
          className="absolute right-0  bottom-[-30px]  object-contain opacity-30"
          priority
        />
        <Image
          src="/hero/Spades-2.svg"
          alt=""
          width={64}
          height={75}
          className="absolute left-[100px] top-0 object-contain opacity-30"
          priority
        />
        <Image
          src="/hero/Spades-3.svg"
          alt=""
          width={67}
          height={76}
          className="absolute left-[480px] top-[120px] rotate-[-10deg] object-contain opacity-30"
          priority
        />
      </div>
    </section>
  );
}
