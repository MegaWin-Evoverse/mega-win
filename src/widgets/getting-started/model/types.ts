type StepMediaVariant = 'degencity' | 'discord' | 'connect';

interface DescriptionSegment {
  text: string;
  accent?: boolean;
}

interface StepDecoration {
  src: string;
  width: number;
  height: number;
  className: string;
}

export type StepAction = { type: 'external-link'; href: string } | { type: 'connect-account' };

export interface StepCardData {
  id: string;
  mediaVariant: StepMediaVariant;
  title: string;
  leadText?: string;
  description?: readonly DescriptionSegment[];
  promoCode?: string;
  promoNote?: string;
  buttonLabel: string;
  action: StepAction;
  decorations: readonly StepDecoration[];
}
