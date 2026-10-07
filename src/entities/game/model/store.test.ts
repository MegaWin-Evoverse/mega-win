import { GAME_BALANCE } from '@/shared/config';
import { useGameControlsStore } from './store';

describe('game store balance actions', () => {
  it('applyBet subtracts and applyWin adds to balance', () => {
    useGameControlsStore.setState({ balance: GAME_BALANCE });
    useGameControlsStore.getState().applyBet(10);
    expect(useGameControlsStore.getState().balance).toBeCloseTo(GAME_BALANCE - 10);
    useGameControlsStore.getState().applyWin(4);
    expect(useGameControlsStore.getState().balance).toBeCloseTo(GAME_BALANCE - 10 + 4);
  });
});
