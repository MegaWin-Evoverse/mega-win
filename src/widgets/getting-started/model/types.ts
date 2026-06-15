export type StepMediaVariant = 'degencity' | 'discord' | 'connect';

export interface DescriptionSegment {
  text: string;
  accent?: boolean;
}

export interface StepDecoration {
  src: string;
  width: number;
  height: number;
  className: string;
}

export interface StepCardData {
  id: string;
  mediaVariant: StepMediaVariant;
  title: string;
  leadText?: string;
  description?: readonly DescriptionSegment[];
  promoCode?: string;
  promoNote?: string;
  buttonLabel: string;
  href: string;
  decorations: readonly StepDecoration[];
}
