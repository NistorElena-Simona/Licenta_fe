import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export const getMuscles = async () => {
  try {
    const response = await api.get('/muscles');
    return response.data;
  } catch (error) {
    console.error('Error fetching muscles:', error);
    throw error; // Rethrow the error for handling in the component
  }
}; 