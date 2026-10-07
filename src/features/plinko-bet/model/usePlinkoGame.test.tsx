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
        activeTab: 'manual',
        numberOfBets: '0',
        applyBet,
        applyWin,
      }),
  };
});

function wrapper({ children }: { children: ReactNode }) {
  const client = new QueryClient({ defaultOptions: { queries: { retry: false } } });
  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
}

describe('usePlinkoGame manual', () => {
  beforeEach(() => {
    mockBet.mockReset();
    applyBet.mockReset();
    applyWin.mockReset();
    mockBet.mockResolvedValue({
      betId: '1',
      betSize: '10',
      payout: '21',
      multiplier: 2.1,
      results: [1, 0, 1, 0, 0, 0, 0, 0],
      createdAt: 'x',
    });
  });

  it('debits the bet and enqueues a drop on success', async () => {
    const { result } = renderHook(() => usePlinkoGame(), { wrapper });
    await act(async () => {
      result.current.placeBet();
    });
    expect(applyBet).toHaveBeenCalledWith(10);
    await waitFor(() => expect(result.current.drops).toHaveLength(1));
    expect(result.current.drops[0].results).toEqual([1, 0, 1, 0, 0, 0, 0, 0]);
  });

  it('credits payout and removes the drop on landing', async () => {
    const { result } = renderHook(() => usePlinkoGame(), { wrapper });
    await act(async () => {
      result.current.placeBet();
    });
    await waitFor(() => expect(result.current.drops).toHaveLength(1));
    const dropId = result.current.drops[0].id;
    act(() => result.current.onDropLanded(dropId, 21));
    expect(applyWin).toHaveBeenCalledWith(21);
    expect(result.current.drops).toHaveLength(0);
  });
});
