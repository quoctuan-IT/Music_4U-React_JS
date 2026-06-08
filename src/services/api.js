import axios from "axios";

import {
  clearTokens,
  getAccessToken,
  getRefreshToken,
  setTokens,
} from "../utils/authStorage";

const api = axios.create({
  baseURL: "https://phamquoctuan041203.pythonanywhere.com/api",
  // baseURL: "http://127.0.0.1:8000/api",
});

api.interceptors.request.use((config) => {
  const token = getAccessToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

let isRefreshing = false;
let failedQueue = [];

function processQueue(error, token = null) {
  failedQueue.forEach(({ resolve, reject }) => {
    if (error) reject(error);
    else resolve(token);
  });
  failedQueue = [];
}

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status !== 401 ||
      !originalRequest ||
      originalRequest._retry
    ) {
      return Promise.reject(error);
    }

    if (originalRequest.url?.includes("/auth/refresh/")) {
      clearTokens();
      return Promise.reject(error);
    }

    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        failedQueue.push({ resolve, reject });
      }).then((token) => {
        originalRequest.headers.Authorization = `Bearer ${token}`;
        return api(originalRequest);
      });
    }

    originalRequest._retry = true;
    isRefreshing = true;

    const refresh = getRefreshToken();
    if (!refresh) {
      clearTokens();
      isRefreshing = false;
      return Promise.reject(error);
    }

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/auth/refresh/",
        { refresh },
      );
      const newAccess = response.data.access;
      setTokens({ access: newAccess, refresh });
      processQueue(null, newAccess);
      originalRequest.headers.Authorization = `Bearer ${newAccess}`;
      return api(originalRequest);
    } catch (refreshError) {
      processQueue(refreshError, null);
      clearTokens();
      return Promise.reject(refreshError);
    } finally {
      isRefreshing = false;
    }
  },
);

export default api;
