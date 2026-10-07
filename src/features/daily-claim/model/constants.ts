export const DAILY_CLAIM_API_PATHS = {
  status: '/api/daily-claimer/status',
  claim: '/api/daily-claimer/claim',
} as const;

export const DAILY_CLAIM_HTTP_STATUS = {
  DISABLED: 403,
  ALREADY_CLAIMED: 409,
  THROTTLED: 429,
  INVALID_CONFIG: 500,
} as const;

export const DAILY_CLAIM_ERROR_MESSAGE = {
  ALREADY_CLAIMED: "You've already claimed today",
  THROTTLED: 'Too many attempts, please slow down',
  UNAVAILABLE: 'Daily claimer is unavailable right now',
} as const;

export const DAILY_CLAIM_COUNTDOWN_UNIT = {
  HOUR: 'h',
  MINUTE: 'm',
  SECOND: 's',
} as const;
