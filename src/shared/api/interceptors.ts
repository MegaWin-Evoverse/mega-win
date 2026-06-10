import axios, { type AxiosError, type AxiosInstance } from 'axios';
import createAuthRefresh from 'axios-auth-refresh';
import { AUTH_PATHS, REFRESH_PATH } from './constants';

function refreshTokens() {
  return axios.post(REFRESH_PATH, null, { withCredentials: true });
}

function shouldRefresh(error: AxiosError): boolean {
  const url = error.config?.url ?? '';

  return !AUTH_PATHS.some((path) => url.startsWith(path));
}

export function applyInterceptors(instance: AxiosInstance): void {
  createAuthRefresh(instance, refreshTokens, { shouldRefresh });
}
