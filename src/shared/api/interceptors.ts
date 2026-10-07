import axios, { type AxiosError, type AxiosInstance } from 'axios';
import createAuthRefresh from 'axios-auth-refresh';
import { AUTH_PATHS, HTTP_STATUS_UNAUTHORIZED, REFRESH_PATH } from './constants';

function refreshTokens() {
  return axios.get(REFRESH_PATH, { withCredentials: true });
}

function shouldRefresh(error: AxiosError): boolean {
  if (error.response?.status !== HTTP_STATUS_UNAUTHORIZED) {
    return false;
  }

  const url = error.config?.url ?? '';

  return !AUTH_PATHS.some((path) => url.startsWith(path));
}

export function applyInterceptors(instance: AxiosInstance): void {
  createAuthRefresh(instance, refreshTokens, { shouldRefresh });
}
