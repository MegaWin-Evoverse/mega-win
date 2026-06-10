import Image from 'next/image';

interface Props {
  logoSrc: string;
  logoAlt: string;
}

export function CampaignLogoBlock({ logoSrc, logoAlt }: Props) {
  return (
    <div className="absolute right-5 top-5 z-10 pointer-events-none select-none flex items-center gap-1.5">
      <Image src={logoSrc} alt={logoAlt} width={79} height={17} priority />
    </div>
  );
}
