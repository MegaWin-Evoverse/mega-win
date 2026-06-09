interface Props {
  isFortuneBonus: boolean;
}

export function CampaignGlows({ isFortuneBonus }: Props) {
  if (isFortuneBonus) {
    return (
      <>
        <div className="promo-ellipse-6743-purple absolute w-[280.51px] h-[280.51px] -right-[0.22px] -bottom-[85.51px] rounded-full pointer-events-none z-0" />
        <div className="promo-ellipse-6744-purple absolute w-[262.14px] h-[262.14px] -right-[36.41px] -bottom-[97.14px] rounded-full pointer-events-none z-0" />
        <div className="promo-ellipse-6742-purple absolute w-[250px] h-[122px] right-[138.73px] -bottom-[27px] rounded-full pointer-events-none z-0" />
      </>
    );
  }

  return (
    <>
      <div className="promo-ellipse-6742-yellow absolute w-[249px] h-[186px] -right-[65px] -bottom-[78px] rounded-full pointer-events-none z-0" />
      <div className="promo-ellipse-6743-red absolute w-[447px] h-[151px] -right-[144px] -bottom-[89px] rounded-full pointer-events-none z-0" />
      <div className="promo-ellipse-red-overlay absolute w-[338px] h-[219.61px] right-[78px] -bottom-[88.61px] rounded-full mix-blend-plus-lighter opacity-40 pointer-events-none z-20" />
      <div className="promo-ellipse-red-overlay-small absolute w-[338px] h-[104.56px] right-[78px] bottom-[25.66px] rounded-full mix-blend-plus-lighter opacity-40 pointer-events-none z-20" />
    </>
  );
}
