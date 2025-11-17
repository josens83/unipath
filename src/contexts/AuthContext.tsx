import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { User } from '../types';
import { authAPI } from '../services/api';
import { supabaseAuthService } from '../services/supabaseAuth';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => Promise<void>;
  updateProfile: (data: Partial<User>) => Promise<void>;
  isAuthenticated: boolean;
  loading: boolean;
}

export interface RegisterData {
  email: string;
  password: string;
  name: string;
  role: 'student' | 'parent' | 'tutor';
  phone?: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

// Supabase 사용 여부 확인
const useSupabase = () => {
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
  const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
  return !!(supabaseUrl && supabaseKey);
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const isSupabaseEnabled = useSupabase();

  // Load user from Supabase or Mock API on mount
  useEffect(() => {
    const initAuth = async () => {
      try {
        if (isSupabaseEnabled) {
          // Supabase Auth 사용
          const currentUser = await supabaseAuthService.getCurrentUser();
          setUser(currentUser);
        } else {
          // Mock API 사용 (개발/테스트용)
          const currentUser = authAPI.getCurrentUser();
          setUser(currentUser);
        }
      } catch (error) {
        console.error('Auth 초기화 실패:', error);
      } finally {
        setLoading(false);
      }
    };

    initAuth();

    // Supabase Auth 상태 변경 리스너 (Supabase 사용 시)
    if (isSupabaseEnabled) {
      const unsubscribe = supabaseAuthService.onAuthStateChange((user) => {
        setUser(user);
      });
      return unsubscribe;
    }
  }, [isSupabaseEnabled]);

  const login = async (email: string, password: string) => {
    try {
      if (isSupabaseEnabled) {
        const loggedInUser = await supabaseAuthService.login(email, password);
        setUser(loggedInUser);
      } else {
        const loggedInUser = await authAPI.login(email, password);
        setUser(loggedInUser);
      }
    } catch (error) {
      throw error;
    }
  };

  const register = async (data: RegisterData) => {
    try {
      if (isSupabaseEnabled) {
        const newUser = await supabaseAuthService.register(data);
        setUser(newUser);
      } else {
        const newUser = await authAPI.register(data);
        setUser(newUser);
      }
    } catch (error) {
      throw error;
    }
  };

  const logout = async () => {
    try {
      if (isSupabaseEnabled) {
        await supabaseAuthService.logout();
      } else {
        await authAPI.logout();
      }
      setUser(null);
    } catch (error) {
      throw error;
    }
  };

  const updateProfile = async (data: Partial<User>) => {
    if (!user) throw new Error('로그인이 필요합니다.');

    try {
      if (isSupabaseEnabled) {
        const updatedUser = await supabaseAuthService.updateProfile(
          user.id,
          data
        );
        setUser(updatedUser);
      } else {
        const updatedUser = await authAPI.updateProfile(user.id, data);
        setUser(updatedUser);
      }
    } catch (error) {
      throw error;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        register,
        logout,
        updateProfile,
        isAuthenticated: !!user,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
