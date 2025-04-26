'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { LoginCredentials, RegisterCredentials, User } from '@/types/auth';
import { getMe, login, logout, refreshToken, register } from '@/app/services/AuthService';


interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (credentials: RegisterCredentials) => Promise<void>;
  logout: () => Promise<void>;
  error: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const router = useRouter();

  useEffect(() => {

    const checkAuthStatus = async () => {
      try {
        setIsLoading(true);
        let accessToken = null;      
        if (typeof window !== 'undefined') {
          accessToken = localStorage.getItem('accessToken');
        }
        
        if (accessToken) {
          const userData = await getMe();
          setUser(userData);
          setIsAdmin(Array.isArray(userData.roles) && userData.roles.includes('ADMIN'));
        }
      } catch (error) {
        try {
          if (typeof window !== 'undefined') {
            const refreshTokenValue = localStorage.getItem('refreshToken');
            if (refreshTokenValue) {
              await handleRefreshToken(refreshTokenValue);
            }
          }
        } catch (refreshError) {
          
          if (typeof window !== 'undefined') {
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
          }
        }
      } finally {
        setIsLoading(false);
      }
    };
    
    checkAuthStatus();
  }, []);

  const handleRefreshToken = async (refreshTokenValue: string) => {
    try {
      const tokens = await refreshToken(refreshTokenValue);
      localStorage.setItem('accessToken', tokens.accessToken);
      localStorage.setItem('refreshToken', tokens.refreshToken);
      
      const userData = await getMe();
      setUser(userData);
      setIsAdmin(Array.isArray(userData.roles) && userData.roles.includes('ADMIN'));
      return tokens;
    } catch (error) {
      throw error;
    }
  };

  const handleLogin = async (credentials: LoginCredentials) => {
    try {
      setIsLoading(true);
      setError(null);
      
      const tokens = await login(credentials);
      localStorage.setItem('accessToken', tokens.accessToken);
      localStorage.setItem('refreshToken', tokens.refreshToken);
      
      const userData = await getMe();
      setUser(userData);
      setIsAdmin(Array.isArray(userData.roles) && userData.roles.includes('ADMIN'));
    } catch (error: any) {
      setError(error.message || 'Failed to login');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (credentials: RegisterCredentials) => {
    try {
      setIsLoading(true);
      setError(null);
      
      const response = await register(credentials);
    
      if (response.status === 201) {
        router.push('/pages/verification');
      }

    } catch (error: any) {
      setError(error.message || 'Failed to register');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      setIsLoading(true);
      const refreshTokenValue = localStorage.getItem('refreshToken');
      
      if (refreshTokenValue) {
        await logout(refreshTokenValue);
      }
      
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      setUser(null);
      setIsAdmin(false);
      
      router.push('/');
    } catch (error: any) {
      setError(error.message || 'Failed to logout');
    } finally {
      setIsLoading(false);
    }
  };

  const value = {
    user,
    isLoading,
    isAuthenticated: !!user,
    isAdmin,
    login: handleLogin,
    register: handleRegister,
    logout: handleLogout,
    error
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
