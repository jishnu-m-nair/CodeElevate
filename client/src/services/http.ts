import axios from 'axios';
import { env } from '../config/env';
import { store } from '../store/store';
import { setAuth, clearAuth } from '../store/slices/authSlice';
import { toast } from 'sonner';

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

// ── Request interceptor ──────────────────────────────────────────────────────
http.interceptors.request.use(
  (config) => {
    const token = store.getState().auth.accessToken;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// ── Response interceptor ─────────────────────────────────────────────────────
let isRefreshing = false;
let pendingQueue: Array<{
  resolve: (token: string) => void;
  reject: (error: unknown) => void;
}> = [];

const processPendingQueue = (error: unknown, token: string | null) => {
  pendingQueue.forEach(({ resolve, reject }) => {
    if (token) resolve(token);
    else reject(error);
  });
  pendingQueue = [];
};

// http.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const originalRequest = error.config;

//     const isExpiredToken =
//       error.response?.status === 401 && error.response.data?.expired === true;

//     const isRefreshEndpoint = originalRequest.url === '/refresh';

//     // ── Non-refresh-eligible errors — pass through immediately ───────────────
//     if (!isExpiredToken || originalRequest._retry || isRefreshEndpoint) {
//       return Promise.reject(error);
//     }

//     // ── Queue concurrent requests while refresh is in progress ───────────────
//     if (isRefreshing) {
//       return new Promise((resolve, reject) => {
//         pendingQueue.push({ resolve, reject });
//       }).then((token) => {
//         originalRequest.headers.Authorization = `Bearer ${token}`;
//         return http(originalRequest);
//       });
//     }

//     originalRequest._retry = true;
//     isRefreshing = true;

//     try {
//       const { data } = await http.post<{ data: { accessToken: string } }>('/refresh');
//       const newToken = data.data.accessToken;

//       const currentRole = store.getState().auth.role;
//       store.dispatch(setAuth({ accessToken: newToken, role: currentRole }));
//       setHttpAuthToken(newToken);
//       processPendingQueue(null, newToken);

//       originalRequest.headers.Authorization = `Bearer ${newToken}`;
//       return http(originalRequest);
//     } catch (refreshError) {
//       processPendingQueue(refreshError, null);
//       store.dispatch(clearAuth());
//       setHttpAuthToken(undefined);

//       toast.error('Session expired. Please log in again.');

//       // small delay so the toast is visible before redirect
//       setTimeout(() => {
//         window.location.href = '/login';
//       }, 1500);

//       return Promise.reject(refreshError);
//     } finally {
//       isRefreshing = false;
//     }
//   }
// );
http.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    const status = error.response?.status;
    const isExpiredToken =
      status === 401 && error.response.data?.expired === true;

    const isRefreshEndpoint = originalRequest.url === '/refresh';

    // 🔥 NEW: Handle forbidden / unauthorized (NOT refresh case)
    if (
      (status === 401 && !isExpiredToken) || // invalid token
      status === 403 // recruiter not approved / rejected
    ) {
      store.dispatch(clearAuth());
      setHttpAuthToken(undefined);

      const message =
        error.response?.data?.message ||
        'Access denied. Please login again.';

      toast.error(message);

      setTimeout(() => {
        // optional: role-based redirect
        const role = store.getState().auth.role;

        if (role === 'admin') window.location.href = '/admin/login';
        else if (role === 'recruiter') window.location.href = '/recruiter/login';
        else window.location.href = '/login';
      }, 1500);

      return Promise.reject(error);
    }

    // ── Existing logic (KEEP THIS) ─────────────────────────────
    if (!isExpiredToken || originalRequest._retry || isRefreshEndpoint) {
      return Promise.reject(error);
    }

    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        pendingQueue.push({ resolve, reject });
      }).then((token) => {
        originalRequest.headers.Authorization = `Bearer ${token}`;
        return http(originalRequest);
      });
    }

    originalRequest._retry = true;
    isRefreshing = true;

    try {
      const { data } = await http.post<{ data: { accessToken: string } }>('/refresh');
      const newToken = data.data.accessToken;

      const currentRole = store.getState().auth.role;
      store.dispatch(setAuth({ accessToken: newToken, role: currentRole }));
      setHttpAuthToken(newToken);
      processPendingQueue(null, newToken);

      originalRequest.headers.Authorization = `Bearer ${newToken}`;
      return http(originalRequest);
    } catch (refreshError) {
      processPendingQueue(refreshError, null);
      store.dispatch(clearAuth());
      setHttpAuthToken(undefined);

      toast.error('Session expired. Please log in again.');

      setTimeout(() => {
        window.location.href = '/login';
      }, 1500);

      return Promise.reject(refreshError);
    } finally {
      isRefreshing = false;
    }
  }
);

export default http;