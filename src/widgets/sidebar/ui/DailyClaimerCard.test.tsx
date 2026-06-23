import { render, screen, fireEvent } from '@testing-library/react';
import { DailyClaimerCard } from './DailyClaimerCard';

describe('DailyClaimerCard', () => {
  it('renders a Login button and calls onAction when logged out', () => {
    const onAction = jest.fn();
    render(
      <DailyClaimerCard
        uiState="login"
        pointsAmount={0}
        countdownLabel="0h:00m:00s"
        isClaiming={false}
        onAction={onAction}
      />
    );

    fireEvent.click(screen.getByRole('button', { name: 'Log In' }));
    expect(onAction).toHaveBeenCalledTimes(1);
  });

  it('renders the points amount on the Claim button when claimable', () => {
    render(
      <DailyClaimerCard
        uiState="claim"
        pointsAmount={25}
        countdownLabel="0h:00m:00s"
        isClaiming={false}
        onAction={jest.fn()}
      />
    );

    expect(screen.getByRole('button', { name: /claim daily reward/i })).toHaveTextContent('25');
  });

  it('renders a countdown instead of a button when not available', () => {
    render(
      <DailyClaimerCard
        uiState="countdown"
        pointsAmount={10}
        countdownLabel="1h:01m:01s"
        isClaiming={false}
        onAction={jest.fn()}
      />
    );

    expect(screen.queryByRole('button')).not.toBeInTheDocument();
    expect(screen.getByText('1h:01m:01s')).toBeInTheDocument();
  });
});
