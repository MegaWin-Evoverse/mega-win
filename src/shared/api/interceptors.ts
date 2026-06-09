import axios, { type AxiosInstance, type InternalAxiosRequestConfig } from 'axios';

const REFRESH_PATH = '/api/auth/refresh';

type QueueItem = {
  resolve: () => void;
  reject: (error: unknown) => void;
};

let isRefreshing = false;
let pendingQueue: QueueItem[] = [];

function flushQueue(error: unknown): void {
  for (const item of pendingQueue) {
    if (error) {
      item.reject(error);
    } else {
      item.resolve();
    }
  }
  pendingQueue = [];
}

export function applyInterceptors(instance: AxiosInstance): void {
  instance.interceptors.response.use(
    (response) => response,
    async (error: unknown) => {
      if (!axios.isAxiosError(error)) return Promise.reject(error);

      const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

      if (error.response?.status !== 401 || originalRequest._retry) {
        return Promise.reject(error);
      }

      if (isRefreshing) {
        return new Promise<void>((resolve, reject) => {
          pendingQueue.push({ resolve, reject });
        }).then(() => instance(originalRequest));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        await axios.post(REFRESH_PATH, null, { withCredentials: true });
        flushQueue(null);
        return instance(originalRequest);
      } catch (refreshError) {
        flushQueue(refreshError);
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }
  );
}
