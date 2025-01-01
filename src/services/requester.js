import axios from 'axios';
import { useGlobalStore } from '@/stores/global'

const apiRequester = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    Accept: 'application/json',
  },
});

apiRequester.interceptors.request.use(
  (config) => {
    const globalStore = useGlobalStore()
    const token = globalStore.token
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // Set Authorization header
    }
    return config;
  }
);

apiRequester.interceptors.response.use(
  (response) => {
    // Pass through successful responses
    return response;
  },
  (error) => {
    const globalStore = useGlobalStore();

    if (error.response && error.response.status === 401) {
      // Clear the token and user data
      globalStore.logout();

      // Refresh to trigger login redirect
      window.location.reload();
    }

    // Reject the error to allow further handling if needed
    return Promise.reject(error);
  }
);

export default apiRequester;
