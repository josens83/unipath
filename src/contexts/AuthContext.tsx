import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { User } from '../types';
import { authService } from '../services/factory';

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

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Load user from API (Supabase or Mock) on mount
  useEffect(() => {
    const initAuth = async () => {
      try {
        const currentUser = await authService.getCurrentUser();
        setUser(currentUser);
      } catch (error) {
        console.error('Auth 초기화 실패:', error);
      } finally {
        setLoading(false);
      }
    };

    initAuth();

    // Auth 상태 변경 리스너 (Supabase만 지원)
    if (authService.onAuthStateChange) {
      const unsubscribe = authService.onAuthStateChange((user) => {
        setUser(user);
      });
      return unsubscribe;
    }
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const loggedInUser = await authService.login(email, password);
      setUser(loggedInUser);
    } catch (error) {
      throw error;
    }
  };

  const register = async (data: RegisterData) => {
    try {
      const newUser = await authService.register(data);
      setUser(newUser);
    } catch (error) {
      throw error;
    }
  };

  const logout = async () => {
    try {
      await authService.logout();
      setUser(null);
    } catch (error) {
      throw error;
    }
  };

  const updateProfile = async (data: Partial<User>) => {
    if (!user) throw new Error('로그인이 필요합니다.');

    try {
      const updatedUser = await authService.updateProfile(user.id, data);
      setUser(updatedUser);
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
