import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API || 'http://localhost:3001';

export const apiClient = axios.create({
  baseURL: API_URL,
});

apiClient.interceptors.request.use(
  (config) => {
    if (typeof window !== 'undefined') {
      const token = sessionStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error),
);

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      if (typeof window !== 'undefined') {
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('user');
        sessionStorage.removeItem('lastActivity');
      }
    }
    return Promise.reject(error);
  },
);

export default apiClient;
