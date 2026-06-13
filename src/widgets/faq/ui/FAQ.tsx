'use client';

import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/shared/ui/accordion';
import { SectionTitle } from '@/shared/ui/section-title';
import { cn } from '@/shared/lib/cn';
import { FAQ_ITEMS, FAQ_CONSTANTS } from '../model/constants';

interface Props {
  className?: string;
}

export function FAQ({ className }: Props) {
  return (
    <section
      aria-label={FAQ_CONSTANTS.SECTION_ARIA_LABEL}
      className={cn('flex w-full flex-col gap-6 items-center', className)}
    >
      <SectionTitle
        title={FAQ_CONSTANTS.SECTION_TITLE}
        iconSrc={FAQ_CONSTANTS.ICON_SRC}
        iconWidth={FAQ_CONSTANTS.ICON_WIDTH}
        iconHeight={FAQ_CONSTANTS.ICON_HEIGHT}
        className="justify-center w-full"
      />
      <Accordion className="w-full flex flex-col gap-2">
        {FAQ_ITEMS.map((item) => (
          <AccordionItem
            key={item.id}
            value={item.id}
            className="bg-bg-primary rounded-[12px] px-4 py-5 border-none flex flex-col hover:bg-bg-primary-hover transition-colors duration-200 cursor-pointer"
          >
            <AccordionTrigger className="w-full flex items-center justify-between font-outfit text-base font-semibold leading-5 text-brand-text-white hover:no-underline p-0 select-none [&_svg]:text-brand-text-light transition-colors">
              {item.question}
            </AccordionTrigger>
            <AccordionContent className="font-outfit text-sm font-normal text-brand-text-light leading-[18px] pr-4 pt-2 pb-0">
              {item.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}
