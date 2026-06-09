import axios from 'axios';
import { applyInterceptors } from './interceptors';

export const authApi = axios.create({
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const api = axios.create({
  withCredentials: true,
});

applyInterceptors(api);
