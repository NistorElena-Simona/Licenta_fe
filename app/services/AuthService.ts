import { LoginCredentials, RegisterCredentials, TokenResponse, User } from "@/types/auth";
import axios from "axios";

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


api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      try {
        const refreshTokenValue = localStorage.getItem('refreshToken');
        if (!refreshTokenValue) {
          throw new Error('No refresh token available');
        }
        
        const response = await axios.post(`${API_URL}/auth/refresh`, {
          refreshToken: refreshTokenValue
        });
        
        const { accessToken, refreshToken: newRefreshToken } = response.data;
        

        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', newRefreshToken);
        

        originalRequest.headers['Authorization'] = `Bearer ${accessToken}`;
        return axios(originalRequest);
      } catch (refreshError) {

        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        

        // if (typeof window !== 'undefined') {
        //   window.location.href = '/pages/login';
        // }
        
        return Promise.reject(refreshError);
      }
    }
    
    return Promise.reject(error);
  }
);

export const login = async (credentials: LoginCredentials): Promise<TokenResponse> => {
  try {
    const response = await api.post('/auth/login', credentials);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to login');
  }
};

export const register = async (credentials: RegisterCredentials): Promise<void> => {
  try {
    const response = await api.post('/user/register', credentials);
    return { status: response.status };
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to register');
  }
};

export const logout = async (refreshTokenValue: string): Promise<void> => {
  try {
    await api.post('/auth/logout', { refreshToken: refreshTokenValue });
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to logout');
  }
};

export const refreshToken = async (refreshTokenValue: string): Promise<TokenResponse> => {
  try {
    const response = await axios.post(`${API_URL}/auth/refresh`, {
      refreshToken: refreshTokenValue
    });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to refresh token');
  }
};

export const getMe = async (): Promise<User> => {
  try {
    const response = await api.get('/user/me');
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to get user data');
  }
};
