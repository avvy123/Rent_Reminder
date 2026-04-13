import { getTokenFromCookies } from '@/utils/helper';
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5201/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const token = getTokenFromCookies();
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

export default api;
