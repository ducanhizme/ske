import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, LoginCredentials, AuthState } from '@/types';

export interface AuthContextType {
  user: User | null;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
  error: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true,
    error: null,
  });

  // Simulate loading user from storage on mount
  useEffect(() => {
    const loadUser = async () => {
      try {
        // Simulate checking for stored auth token
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
          const user = JSON.parse(storedUser);
          setAuthState(prev => ({
            ...prev,
            user,
            isAuthenticated: true,
            isLoading: false,
          }));
        } else {
          setAuthState(prev => ({
            ...prev,
            isLoading: false,
          }));
        }
      } catch {
        setAuthState(prev => ({
          ...prev,
          isLoading: false,
          error: 'Failed to load user',
        }));
      }
    };

    loadUser();
  }, []);

  const login = async (credentials: LoginCredentials): Promise<void> => {
    setAuthState(prev => ({ ...prev, isLoading: true, error: null }));
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock user data
      const user: User = {
        id: '1',
        email: credentials.email,
        name: 'John Doe',
        role: 'user',
      };

      localStorage.setItem('user', JSON.stringify(user));
      
      setAuthState({
        user,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      });
    } catch {
      setAuthState(prev => ({
        ...prev,
        isLoading: false,
        error: 'Login failed',
      }));
    }
  };

  const logout = (): void => {
    localStorage.removeItem('user');
    setAuthState({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
    });
  };

  const value: AuthContextType = {
    user: authState.user,
    login,
    logout,
    isLoading: authState.isLoading,
    error: authState.error,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};