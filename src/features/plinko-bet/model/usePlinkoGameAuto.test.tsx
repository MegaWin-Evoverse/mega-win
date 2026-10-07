import { renderHook, act, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type { ReactNode } from 'react';
import { placePlinkoBet } from '../api/placePlinkoBet';
import { usePlinkoGame } from './usePlinkoGame';

jest.mock('../api/placePlinkoBet', () => ({ placePlinkoBet: jest.fn() }));
const mockBet = placePlinkoBet as jest.Mock;

const applyBet = jest.fn();
const applyWin = jest.fn();
jest.mock('@/entities/game', () => {
  const actual = jest.requireActual('@/entities/game');
  return {
    ...actual,
    useGameControlsStore: (selector: (s: unknown) => unknown) =>
      selector({
        betAmount: '10',
        risk: actual.RISK.LOW,
        rows: 8,
        activeTab: 'auto',
        numberOfBets: '2',
        stopOnProfit: '1000000',
        stopOnLoss: '1000000',
        applyBet,
        applyWin,
      }),
  };
});

function wrapper({ children }: { children: ReactNode }) {
  const client = new QueryClient({ defaultOptions: { queries: { retry: false } } });
  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
}

describe('usePlinkoGame auto', () => {
  beforeEach(() => {
    mockBet.mockReset();
    applyBet.mockReset();
    applyWin.mockReset();
    mockBet
      .mockResolvedValueOnce({
        betId: '1',
        betSize: '10',
        payout: '0',
        multiplier: 0.5,
        results: [0, 0, 0, 0, 0, 0, 0, 0],
        createdAt: 'x',
      })
      .mockResolvedValueOnce({
        betId: '2',
        betSize: '10',
        payout: '0',
        multiplier: 0.5,
        results: [0, 0, 0, 0, 0, 0, 0, 0],
        createdAt: 'x',
      });
  });

  it('places exactly numberOfBets sequential drops', async () => {
    const { result } = renderHook(() => usePlinkoGame(), { wrapper });
    await act(async () => {
      result.current.placeBet();
    });
    await waitFor(() => expect(result.current.drops).toHaveLength(1));
    expect(mockBet).toHaveBeenCalledTimes(1);
    expect(result.current.isBetting).toBe(true);
    act(() => result.current.onDropLanded('1', 0));
    await waitFor(() => expect(mockBet).toHaveBeenCalledTimes(2));
    await waitFor(() => expect(result.current.drops).toHaveLength(1));
    act(() => result.current.onDropLanded('2', 0));
    expect(mockBet).toHaveBeenCalledTimes(2);
    expect(result.current.drops).toHaveLength(0);
    expect(result.current.isBetting).toBe(false);
  });
});
