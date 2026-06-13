import Image from 'next/image';

interface Props {
  title: string;
  iconSrc: string;
  iconWidth: number;
  iconHeight: number;
}

export function SectionHeader({ title, iconSrc, iconWidth, iconHeight }: Props) {
  return (
    <div className="flex items-center gap-2.5">
      <Image
        src={iconSrc}
        width={iconWidth}
        height={iconHeight}
        alt=""
        className="shrink-0"
        priority
      />
      <h2 className="font-outfit font-semibold text-[20px] leading-[28px] text-brand-text-white tracking-normal select-none">
        {title}
      </h2>
    </div>
  );
}
