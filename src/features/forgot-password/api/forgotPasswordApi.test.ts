import { api } from '@/shared/api/client';
import { forgotPasswordApi } from './forgotPasswordApi';

jest.mock('@/shared/api/client', () => ({ api: { post: jest.fn() } }));
const mockPost = api.post as jest.Mock;

describe('forgotPasswordApi', () => {
  beforeEach(() => {
    mockPost.mockReset();
    mockPost.mockResolvedValue({
      data: { message: 'If this email exists, a reset link has been sent.' },
    });
  });

  it('posts the email to the forgot-password endpoint', async () => {
    const result = await forgotPasswordApi('user@example.com');

    expect(mockPost).toHaveBeenCalledWith('/api/auth/forgot-password', {
      email: 'user@example.com',
    });
    expect(result.message).toBe('If this email exists, a reset link has been sent.');
  });
});
