export interface ClaimStatus {
  available: boolean;
  enabled: boolean;
  pointsAmount: number;
  nextClaimAt: string;
  secondsUntilNextClaim: number;
  invalidConfig: boolean;
}

export interface ClaimResponse {
  pointsAmount: number;
}

export type DailyClaimUiState = 'hidden' | 'login' | 'claim' | 'countdown';
