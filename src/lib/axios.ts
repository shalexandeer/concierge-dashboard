import axios, { AxiosError } from "axios";
import { API_BASE_URL, GEOCODING_BASE_URL, GEOCODING_API_KEY } from "./constant/env";
// import { getToken, removeToken } from './helpers/cookies';
import { storageKeys } from "@/services/auth/keys";
import { ApiResponse } from "@/lib/types/api";

const API_VERSION = "api/v1";
export const BASE_URL = API_BASE_URL
  ? `${API_BASE_URL}/${API_VERSION}`
  : `http://localhost:8080/${API_VERSION}`;

// Create axios instance
export const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 20000,
  timeoutErrorMessage: "Periksa Kembali Koneksi Internet Anda.",
});

// Request interceptor
api.interceptors.request.use((config) => {
  // Skip adding token for login request
  if (config.url?.includes('/auth/login')) {
    return config;
  }

  // Add bearer token to all other requests
  const token = localStorage.getItem(storageKeys.accessToken);
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// Response interceptor
api.interceptors.response.use(
  (config) => {
    return config;
  },
  (error: AxiosError<ApiResponse<boolean>>) => {
    // Parse error
    if (error.response?.data?.message) {
      return Promise.reject({
        ...error,
        response: {
          ...error.response,
          data: {
            ...error.response?.data,
            message:
              typeof error.response.data.message === 'string'
                ? error.response.data.message
                : Object.values(error.response.data.message as Record<string, string[]>)[0][0],
          },
        },
      });
    }
    
    // Handle token expiration (401 errors)
    if (error.response?.status === 401) {
      // Remove token if it's expired
      localStorage.removeItem(storageKeys.accessToken);
      localStorage.removeItem(storageKeys.refreshToken);
      
      // Redirect to login page if needed
      window.location.href = '/login';
    }
    
    return Promise.reject(error);
  }
);

export const geocodingApi = axios.create({
  baseURL: `${GEOCODING_BASE_URL}?key=${GEOCODING_API_KEY}`,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
