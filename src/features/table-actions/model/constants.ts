export const TABLE_ACTIONS = {
  KENO: 'keno',
  ROULETTE: 'roulette',
} as const;

export type TableActionsVariant = (typeof TABLE_ACTIONS)[keyof typeof TABLE_ACTIONS];

export const TABLE_ACTIONS_LABELS = {
  CLEAR_TABLE: 'Clear Table',
  AUTO_PICK: 'Auto Pick',
  CLEAR: 'Clear',
  UNDO: 'Undo',
  CHOOSE_ACTION: 'Choose action',
} as const;
