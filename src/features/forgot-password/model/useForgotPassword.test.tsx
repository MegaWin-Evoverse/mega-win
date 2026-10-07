import { renderHook, act, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type { ReactNode } from 'react';
import { toast } from 'sonner';
import { useForgotPassword } from './useForgotPassword';
import { forgotPasswordApi } from '../api/forgotPasswordApi';

jest.mock('../api/forgotPasswordApi', () => ({ forgotPasswordApi: jest.fn() }));
jest.mock('sonner', () => ({ toast: { error: jest.fn() } }));

const mockForgotPasswordApi = forgotPasswordApi as jest.Mock;

function renderUseForgotPassword() {
  const queryClient = new QueryClient({ defaultOptions: { queries: { retry: false } } });
  const wrapper = ({ children }: { children: ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );

  return renderHook(() => useForgotPassword(), { wrapper });
}

describe('useForgotPassword', () => {
  beforeEach(() => {
    mockForgotPasswordApi.mockReset();
    (toast.error as jest.Mock).mockReset();
  });

  it('calls forgotPasswordApi with the submitted email and flips isSuccess', async () => {
    mockForgotPasswordApi.mockResolvedValue({
      message: 'If this email exists, a reset link has been sent.',
    });
    const { result } = renderUseForgotPassword();

    act(() => {
      result.current.register('email').onChange({
        target: { name: 'email', value: 'user@example.com' },
      } as never);
    });

    await act(async () => {
      await result.current.onSubmit();
    });

    await waitFor(() => expect(mockForgotPasswordApi).toHaveBeenCalledWith('user@example.com'));
    expect(result.current.isSuccess).toBe(true);
  });

  it('toasts an error when the request fails', async () => {
    mockForgotPasswordApi.mockRejectedValue(new Error('network down'));
    const { result } = renderUseForgotPassword();

    act(() => {
      result.current.register('email').onChange({
        target: { name: 'email', value: 'user@example.com' },
      } as never);
    });

    await act(async () => {
      await result.current.onSubmit();
    });

    await waitFor(() =>
      expect(toast.error).toHaveBeenCalledWith('Something went wrong, please try again')
    );
  });
});
