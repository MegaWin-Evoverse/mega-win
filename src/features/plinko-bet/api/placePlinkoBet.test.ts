import { api } from '@/shared/api/client';
import { RISK } from '@/entities/game';
import { placePlinkoBet } from './placePlinkoBet';

jest.mock('@/shared/api/client', () => ({ api: { post: jest.fn() } }));
const mockPost = api.post as jest.Mock;

describe('placePlinkoBet', () => {
  beforeEach(() => {
    mockPost.mockReset();
    mockPost.mockResolvedValue({
      data: {
        betId: '1',
        betSize: '1',
        payout: '0.5',
        multiplier: 0.5,
        results: [0, 1],
        createdAt: 'x',
      },
    });
  });

  it('maps risk to uppercase and sends betSize/rowsCount', async () => {
    const result = await placePlinkoBet({ betSize: 1, rows: 8, risk: RISK.MEDIUM });
    expect(mockPost).toHaveBeenCalledWith('/api/games/plinko/bet', {
      betSize: 1,
      rowsCount: 8,
      risk: 'MEDIUM',
    });
    expect(result.multiplier).toBe(0.5);
  });
});
