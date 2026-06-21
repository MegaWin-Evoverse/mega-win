import { renderHook, act, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type { ReactNode } from 'react';
import { toast } from 'sonner';
import { useDailyClaim } from './useDailyClaim';
import { useUserQuery } from '@/entities/user';
import { useAuthStore } from '@/features/auth';
import { claimDaily } from '../api/claimDaily';
import { fetchClaimStatus } from '../api/fetchClaimStatus';

jest.mock('@/entities/user', () => ({ useUserQuery: jest.fn() }));
jest.mock('@/features/auth', () => ({ useAuthStore: jest.fn() }));
jest.mock('../api/claimDaily', () => ({ claimDaily: jest.fn() }));
jest.mock('../api/fetchClaimStatus', () => ({ fetchClaimStatus: jest.fn() }));
jest.mock('sonner', () => ({ toast: { error: jest.fn() } }));

const mockUseUserQuery = useUserQuery as jest.Mock;
const mockUseAuthStore = useAuthStore as unknown as jest.Mock;
const mockClaimDaily = claimDaily as jest.Mock;
const mockFetchClaimStatus = fetchClaimStatus as jest.Mock;
const mockOpenAuthForm = jest.fn();

function renderDailyClaim() {
  const queryClient = new QueryClient({ defaultOptions: { queries: { retry: false } } });
  const wrapper = ({ children }: { children: ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );

  return { ...renderHook(() => useDailyClaim(), { wrapper }), queryClient };
}

describe('useDailyClaim', () => {
  beforeEach(() => {
    mockUseAuthStore.mockImplementation((selector) => selector({ openAuthForm: mockOpenAuthForm }));
    mockOpenAuthForm.mockReset();
    mockClaimDaily.mockReset();
    mockFetchClaimStatus.mockReset();
    (toast.error as jest.Mock).mockReset();
  });

  it('returns uiState "login" and opens the auth form when not authenticated', () => {
    mockUseUserQuery.mockReturnValue({ data: undefined });

    const { result } = renderDailyClaim();

    expect(result.current.uiState).toBe('login');
    act(() => result.current.onAction());
    expect(mockOpenAuthForm).toHaveBeenCalledTimes(1);
  });

  it('returns uiState "hidden" when the backend reports the feature disabled', async () => {
    mockUseUserQuery.mockReturnValue({ data: { id: '1' } });
    mockFetchClaimStatus.mockResolvedValue({
      available: false,
      enabled: false,
      pointsAmount: 0,
      nextClaimAt: '2026-06-22T00:00:00.000Z',
      secondsUntilNextClaim: 0,
      invalidConfig: false,
    });

    const { result } = renderDailyClaim();

    await act(async () => {
      await Promise.resolve();
    });

    expect(result.current.uiState).toBe('hidden');
  });

  it('returns uiState "claim" with the points amount when available', async () => {
    mockUseUserQuery.mockReturnValue({ data: { id: '1' } });
    mockFetchClaimStatus.mockResolvedValue({
      available: true,
      enabled: true,
      pointsAmount: 10,
      nextClaimAt: '2026-06-22T00:00:00.000Z',
      secondsUntilNextClaim: 0,
      invalidConfig: false,
    });

    const { result } = renderDailyClaim();

    await waitFor(() => expect(result.current.uiState).toBe('claim'));
    expect(result.current.pointsAmount).toBe(10);
  });

  it('claims and switches to "countdown" on success', async () => {
    mockUseUserQuery.mockReturnValue({ data: { id: '1' } });
    mockFetchClaimStatus
      .mockResolvedValueOnce({
        available: true,
        enabled: true,
        pointsAmount: 10,
        nextClaimAt: '2026-06-22T00:00:00.000Z',
        secondsUntilNextClaim: 0,
        invalidConfig: false,
      })
      .mockResolvedValueOnce({
        available: false,
        enabled: true,
        pointsAmount: 10,
        nextClaimAt: '2026-06-22T00:00:00.000Z',
        secondsUntilNextClaim: 3600,
        invalidConfig: false,
      });
    mockClaimDaily.mockResolvedValue({ pointsAmount: 10 });

    const { result } = renderDailyClaim();

    await waitFor(() => expect(result.current.uiState).toBe('claim'));

    await act(async () => {
      result.current.onAction();
    });

    await waitFor(() => expect(mockClaimDaily).toHaveBeenCalledTimes(1));
    await waitFor(() => expect(result.current.uiState).toBe('countdown'));
  });

  it('toasts an error and resyncs status on 409 already-claimed', async () => {
    mockUseUserQuery.mockReturnValue({ data: { id: '1' } });
    mockFetchClaimStatus.mockResolvedValue({
      available: true,
      enabled: true,
      pointsAmount: 10,
      nextClaimAt: '2026-06-22T00:00:00.000Z',
      secondsUntilNextClaim: 0,
      invalidConfig: false,
    });
    mockClaimDaily.mockRejectedValue({ isAxiosError: true, response: { status: 409 } });

    const { result } = renderDailyClaim();

    await waitFor(() => expect(result.current.uiState).toBe('claim'));

    await act(async () => {
      result.current.onAction();
    });

    await waitFor(() => expect(toast.error).toHaveBeenCalledWith("You've already claimed today"));
  });

  it('toasts the throttled message on 429', async () => {
    mockUseUserQuery.mockReturnValue({ data: { id: '1' } });
    mockFetchClaimStatus.mockResolvedValue({
      available: true,
      enabled: true,
      pointsAmount: 10,
      nextClaimAt: '2026-06-22T00:00:00.000Z',
      secondsUntilNextClaim: 0,
      invalidConfig: false,
    });
    mockClaimDaily.mockRejectedValue({ isAxiosError: true, response: { status: 429 } });

    const { result } = renderDailyClaim();

    await waitFor(() => expect(result.current.uiState).toBe('claim'));

    await act(async () => {
      result.current.onAction();
    });

    await waitFor(() =>
      expect(toast.error).toHaveBeenCalledWith('Too many attempts, please slow down')
    );
  });

  it('toasts the unavailable message on a non-axios error', async () => {
    mockUseUserQuery.mockReturnValue({ data: { id: '1' } });
    mockFetchClaimStatus.mockResolvedValue({
      available: true,
      enabled: true,
      pointsAmount: 10,
      nextClaimAt: '2026-06-22T00:00:00.000Z',
      secondsUntilNextClaim: 0,
      invalidConfig: false,
    });
    mockClaimDaily.mockRejectedValue(new Error('network down'));

    const { result } = renderDailyClaim();

    await waitFor(() => expect(result.current.uiState).toBe('claim'));

    await act(async () => {
      result.current.onAction();
    });

    await waitFor(() =>
      expect(toast.error).toHaveBeenCalledWith('Daily claimer is unavailable right now')
    );
  });

  it('toasts the unavailable message on a 403/500 response', async () => {
    mockUseUserQuery.mockReturnValue({ data: { id: '1' } });
    mockFetchClaimStatus.mockResolvedValue({
      available: true,
      enabled: true,
      pointsAmount: 10,
      nextClaimAt: '2026-06-22T00:00:00.000Z',
      secondsUntilNextClaim: 0,
      invalidConfig: false,
    });
    mockClaimDaily.mockRejectedValue({ isAxiosError: true, response: { status: 500 } });

    const { result } = renderDailyClaim();

    await waitFor(() => expect(result.current.uiState).toBe('claim'));

    await act(async () => {
      result.current.onAction();
    });

    await waitFor(() =>
      expect(toast.error).toHaveBeenCalledWith('Daily claimer is unavailable right now')
    );
  });

  it('refetches status once the countdown target has already passed', async () => {
    mockUseUserQuery.mockReturnValue({ data: { id: '1' } });
    mockFetchClaimStatus.mockResolvedValue({
      available: false,
      enabled: true,
      pointsAmount: 10,
      nextClaimAt: '2020-01-01T00:00:00.000Z',
      secondsUntilNextClaim: 0,
      invalidConfig: false,
    });

    renderDailyClaim();

    await waitFor(() => expect(mockFetchClaimStatus).toHaveBeenCalledTimes(2));
  });
});
