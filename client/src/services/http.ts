import axios from 'axios';
import { env } from '../config/env';

const http = axios.create({
  baseURL: env.API_BASE_URL,
  withCredentials: true,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const setHttpAuthToken = (token?: string) => {
  if (token) {
    http.defaults.headers.common.Authorization = `Bearer ${token}`;
  } else {
    delete http.defaults.headers.common.Authorization;
  }
};

http.interceptors.request.use((config) => {
  console.log(
    '[AXIOS REQUEST]',
    config.url,
    config.headers?.Authorization
  );
  return config;
});

http.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.warn('Unauthorized – token may be expired');
    }
    return Promise.reject(error);
  }
);

export default http;
