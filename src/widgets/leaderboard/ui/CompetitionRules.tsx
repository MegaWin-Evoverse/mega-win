import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/shared/ui/accordion';
import { SectionTitle } from '@/shared/ui/section-title';
import { COMPETITION_RULES_CONSTANTS, COMPETITION_RULES_ITEMS } from '../model/constants';

export function CompetitionRules() {
  return (
    <section
      aria-label={COMPETITION_RULES_CONSTANTS.SECTION_ARIA_LABEL}
      className="flex w-full flex-col gap-6 items-center"
    >
      <SectionTitle
        title={COMPETITION_RULES_CONSTANTS.SECTION_TITLE}
        iconSrc={COMPETITION_RULES_CONSTANTS.ICON_SRC}
        iconWidth={COMPETITION_RULES_CONSTANTS.ICON_WIDTH}
        iconHeight={COMPETITION_RULES_CONSTANTS.ICON_HEIGHT}
        className="justify-center w-full"
      />
      <Accordion className="w-full flex flex-col gap-2">
        {COMPETITION_RULES_ITEMS.map((item) => (
          <AccordionItem
            key={item.id}
            value={item.id}
            className="bg-bg-primary rounded-[12px] border-none flex flex-col hover:bg-bg-primary-hover transition-colors duration-200"
          >
            <AccordionTrigger className="w-full flex items-center justify-between font-outfit text-base font-semibold leading-5 text-brand-text-white hover:no-underline select-none [&_svg]:text-brand-text-light transition-colors px-4 py-5">
              {item.question}
            </AccordionTrigger>
            <AccordionContent className="font-outfit text-sm font-normal text-brand-text-light leading-[18px] pl-4 pr-8 pt-2 pb-5">
              {item.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}
