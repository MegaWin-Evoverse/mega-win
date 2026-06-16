import { type ChipNominal } from '@/entities/game';

export const CHIP_LABELS = {
  CHIP_VALUE: 'Chip Value',
  COINS: 'COINS',
} as const;

export const CHIP_BASE_COLOR = '#1b1f26';
export const CHIP_CORE_COLOR = '#151924';
export const CHIP_TEXT_COLOR = '#FDFDFD';

export const CHIP_STRIPES: Record<ChipNominal, string> = {
  '1': '#FFFFFF',
  '5': '#75D2FD',
  '10': '#018BCB',
  '25': '#FFBABA',
  '50': '#FF4D4D',
  '100': '#EC0303',
  '250': '#9CFFC5',
  '500': '#35FF89',
  '1K': '#35FF89',
  '2K': '#F3FF9C',
  '5K': '#B2C807',
  '10K': '#B2C807',
  '25K': '#CDB1FE',
  '50K': '#9A5FFF',
  '100K': '#6208FF',
};
