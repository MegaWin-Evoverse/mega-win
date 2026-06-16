import axios from 'axios';
import { applyInterceptors } from './interceptors';

export const api = axios.create({
  withCredentials: true,
});

applyInterceptors(api);
