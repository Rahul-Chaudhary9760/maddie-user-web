'use client';

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from 'react';
import { User, ApiResponse } from '@/types/auth';
import { api, tokenStorage, ApiError } from '@/lib/api';

export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (
    name: string,
    email: string,
    password: string,
    phone?: string
  ) => Promise<void>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Check current user via /auth/me
  const checkAuth = useCallback(async () => {
    const token = tokenStorage.getAccessToken();
    if (!token) {
      setUser(null);
      setIsAuthenticated(false);
      setIsLoading(false);
      return;
    }

    try {
      const res = await api.get<ApiResponse<User>>('/auth/me');
      if (res && res.data) {
        setUser(res.data);
        setIsAuthenticated(true);
      } else {
        tokenStorage.clearTokens();
        setUser(null);
        setIsAuthenticated(false);
      }
    } catch {
      tokenStorage.clearTokens();
      setUser(null);
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  // Login handler
  const login = async (email: string, password: string): Promise<void> => {
    setIsLoading(true);
    try {
      const res = await api.post<
        ApiResponse<{ user: User; accessToken: string; refreshToken?: string }>
      >('/auth/login', { email, password }, { skipAuth: true });

      const responseData = res.data;
      if (!responseData || !responseData.accessToken) {
        throw new ApiError(
          res.statusCode || 400,
          res.message || 'Login failed. Invalid response.'
        );
      }

      tokenStorage.setAccessToken(responseData.accessToken);
      if (responseData.refreshToken) {
        tokenStorage.setRefreshToken(responseData.refreshToken);
      }

      setUser(responseData.user);
      setIsAuthenticated(true);
    } finally {
      setIsLoading(false);
    }
  };

  // Register handler
  const register = async (
    name: string,
    email: string,
    password: string,
    phone?: string
  ): Promise<void> => {
    setIsLoading(true);
    try {
      await api.post<ApiResponse<User>>(
        '/auth/register',
        { name, email, password, phone },
        { skipAuth: true }
      );

      // Auto-login after registration
      await login(email, password);
    } finally {
      setIsLoading(false);
    }
  };

  // Logout handler
  const logout = async (): Promise<void> => {
    try {
      await api.post('/auth/logout', {});
    } catch {
      // Ignore network errors on logout
    } finally {
      tokenStorage.clearTokens();
      setUser(null);
      setIsAuthenticated(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        isLoading,
        login,
        register,
        logout,
        checkAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

