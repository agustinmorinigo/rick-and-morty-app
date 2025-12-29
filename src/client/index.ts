import axios from 'axios';
import camelcaseKeys from 'camelcase-keys';
import { apiBaseUrl } from '@/constants/api';

const apiClient = axios.create({
  baseURL: apiBaseUrl,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.response.use(
  (response) => {
    if (response.data) {
      response.data = camelcaseKeys(response.data, { deep: true });
    }
    return response;
  },
  (error) => {
    const message = error.response?.data?.message || error.message || 'Unknown error';
    return Promise.reject(new Error(message));
  },
);

export default apiClient;
