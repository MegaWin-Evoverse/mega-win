import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ForgotPasswordForm } from './ForgotPasswordForm';
import { useAuthStore } from '@/features/auth';
import { forgotPasswordApi } from '../api/forgotPasswordApi';

jest.mock('@/features/auth', () => ({ useAuthStore: jest.fn() }));
jest.mock('../api/forgotPasswordApi', () => ({ forgotPasswordApi: jest.fn() }));

const mockUseAuthStore = useAuthStore as unknown as jest.Mock;
const mockForgotPasswordApi = forgotPasswordApi as jest.Mock;
const mockCloseAuthForm = jest.fn();
const mockCloseForgotPassword = jest.fn();

function renderForgotPasswordForm() {
  const queryClient = new QueryClient({ defaultOptions: { queries: { retry: false } } });
  return render(
    <QueryClientProvider client={queryClient}>
      <ForgotPasswordForm />
    </QueryClientProvider>
  );
}

describe('ForgotPasswordForm', () => {
  beforeEach(() => {
    mockUseAuthStore.mockImplementation((selector) =>
      selector({ closeAuthForm: mockCloseAuthForm, closeForgotPassword: mockCloseForgotPassword })
    );
    mockCloseAuthForm.mockReset();
    mockCloseForgotPassword.mockReset();
    mockForgotPasswordApi.mockReset();
  });

  it('calls closeForgotPassword when Back is clicked', () => {
    renderForgotPasswordForm();

    fireEvent.click(screen.getByRole('button', { name: 'Back' }));

    expect(mockCloseForgotPassword).toHaveBeenCalledTimes(1);
  });

  it('shows the success message after a successful submission', async () => {
    mockForgotPasswordApi.mockResolvedValue({
      message: 'If this email exists, a reset link has been sent.',
    });
    renderForgotPasswordForm();

    fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'user@example.com' } });
    fireEvent.click(screen.getByRole('button', { name: 'Send Reset Link' }));

    await waitFor(() =>
      expect(
        screen.getByText('If this email exists, a reset link has been sent.')
      ).toBeInTheDocument()
    );
  });
});
