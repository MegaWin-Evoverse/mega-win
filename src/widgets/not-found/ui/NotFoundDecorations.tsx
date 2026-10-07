import Image from 'next/image';

export function NotFoundDecorations() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
      <div className="absolute left-1/2 top-[60%] h-[300px] w-[150%] -translate-x-1/2 bg-[linear-gradient(170.1deg,rgba(0,0,0,0)_2.99%,rgba(27,209,103,0.3)_94.41%)] blur-[60px] md:top-[58%] md:h-[420px] md:blur-[70px] lg:top-[55%] lg:h-[559px] lg:w-[3945px] lg:blur-[80px]" />
      <Image
        src="/404/dolar-top.svg"
        alt=""
        width={352}
        height={347}
        className="absolute -right-16 -top-16 w-[180px] rotate-[-64deg] blur-[2px] md:-right-20 md:-top-20 md:w-[280px] lg:-right-24 lg:-top-24 lg:w-[352px] lg:blur-[4px]"
      />
      <div className="absolute -bottom-10 -left-16 md:-bottom-12 md:-left-10 lg:bottom-[-60px] lg:left-[-40px]">
        <Image
          src="/404/dolar-bottom.svg"
          alt=""
          width={543}
          height={388}
          className="w-[260px] rotate-[11deg] md:w-[480px] lg:w-[632px]"
        />
        <Image
          src="/404/coin.svg"
          alt=""
          width={210}
          height={218}
          className="absolute left-[140px] top-[70px] w-[90px] rotate-[14deg] md:left-[260px] md:top-[130px] md:w-[150px] lg:left-[355px] lg:top-[133px] lg:w-[170px]"
        />
      </div>
    </div>
  );
}
