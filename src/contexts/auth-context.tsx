'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import type { User } from '@/types';
import { login as apiLogin, logout as apiLogout, type LoginPayload } from '@/lib/api/auth';
import { getStoredUser, setStoredUser, setToken, clearSession } from '@/lib/auth/session';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (payload: LoginPayload) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const initAuth = () => {
      const storedUser = getStoredUser();
      if (storedUser) {
        setUser(storedUser);
      }
      setIsLoading(false);
    };
    initAuth();
  }, []);

  const login = async (payload: LoginPayload) => {
    const data = await apiLogin(payload);
    setToken(data.token);
    setStoredUser(data.user);
    setUser(data.user);
    
    if (typeof document !== 'undefined') {
      document.cookie = `greenmetric_token=${data.token}; path=/; max-age=86400; SameSite=Lax`;
      document.cookie = `greenmetric_user_role=${data.user.role}; path=/; max-age=86400; SameSite=Lax`;
    }
    if(data.user.role == "SUPER_ADMIN"){
      router.push('/super-admin/dashboard');
    
    }
    else{
      router.push('/dashboard');

    }
  };

  const logout = async () => {
    try {
      await apiLogout();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      clearSession();
      setUser(null);
      
      if (typeof document !== 'undefined') {
        document.cookie = 'greenmetric_token=; path=/; max-age=0';
        document.cookie = 'greenmetric_user_role=; path=/; max-age=0';
      }
      
      router.push('/login');
    }
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
