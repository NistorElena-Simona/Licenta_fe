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

export const getExercisesByMuscleId = async (muscleId: number) => {
  try {
    const response = await api.get(`/exercises/muscle/${muscleId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching exercises:', error);
    throw error; 
  }
};