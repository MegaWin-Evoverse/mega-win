import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type { ReactNode } from 'react';
import { useClaimStatus } from './useClaimStatus';
import { fetchClaimStatus } from '../api/fetchClaimStatus';

jest.mock('../api/fetchClaimStatus', () => ({ fetchClaimStatus: jest.fn() }));
const mockFetchClaimStatus = fetchClaimStatus as jest.Mock;

const wrapper = ({ children }: { children: ReactNode }) => (
  <QueryClientProvider client={new QueryClient({ defaultOptions: { queries: { retry: false } } })}>
    {children}
  </QueryClientProvider>
);

describe('useClaimStatus', () => {
  beforeEach(() => {
    mockFetchClaimStatus.mockReset();
  });

  it('fetches the claim status when authenticated', async () => {
    mockFetchClaimStatus.mockResolvedValue({
      available: true,
      enabled: true,
      pointsAmount: 10,
      nextClaimAt: '2026-06-22T00:00:00.000Z',
      secondsUntilNextClaim: 0,
      invalidConfig: false,
    });

    const { result } = renderHook(() => useClaimStatus(true), { wrapper });

    await waitFor(() => expect(result.current.data?.pointsAmount).toBe(10));
    expect(mockFetchClaimStatus).toHaveBeenCalledTimes(1);
  });

  it('does not fetch when not authenticated', () => {
    renderHook(() => useClaimStatus(false), { wrapper });

    expect(mockFetchClaimStatus).not.toHaveBeenCalled();
  });
});
