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
    console.log('INTERCEPTOR EXECUTADO' + globalStore.token)
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // Set Authorization header
    }
    return config;
  }
);

export default apiRequester;
