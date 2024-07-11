import axios from 'axios';
const axiosClient = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://127.0.0.1:5000',
    timeout: 1000,
    headers: {
      'Content-Type': 'application/json',
    },
});

axiosClient.interceptors.response.use(
    response => response.data,
    error => {
      // Xử lý lỗi
      return Promise.reject(error);
    }
);

export default axiosClient;