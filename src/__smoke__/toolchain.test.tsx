import { render, screen } from '@testing-library/react';

function Greeting({ name }: { name: string }) {
  return <p>Hello {name}</p>;
}

describe('jest toolchain', () => {
  it('renders a component via Testing Library + jest-dom', () => {
    render(<Greeting name="mega-win" />);
    expect(screen.getByText('Hello mega-win')).toBeInTheDocument();
  });
});
