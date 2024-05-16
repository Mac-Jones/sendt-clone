import axios from 'axios';

const apiClient = axios.create({
  baseURL: `${process.env.EXPO_PUBLIC_API_URL}/api/v1`,
  timeout: 10000,
});

export default apiClient;
