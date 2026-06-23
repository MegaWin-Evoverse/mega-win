import type { ClaimStatus, DailyClaimUiState } from './types';

export function resolveUiState(
  isAuthenticated: boolean,
  status: ClaimStatus | undefined
): DailyClaimUiState {
  if (!isAuthenticated) return 'login';
  if (!status) return 'hidden';
  if (!status.enabled || status.invalidConfig) return 'hidden';
  if (status.available) return 'claim';

  return 'countdown';
}
