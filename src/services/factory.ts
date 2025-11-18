/**
 * API Factory Pattern
 * Mock API와 Real API를 자동으로 선택하는 팩토리 패턴
 */

import { env, isDevelopment } from '../config/env';
import { authAPI as mockAuthAPI } from './api';
import { supabaseAuthService } from './supabaseAuth';
import type { User } from '../types';
import type { RegisterData } from '../contexts/AuthContext';

/**
 * 인증 API 인터페이스 정의
 */
export interface IAuthAPI {
  login(email: string, password: string): Promise<User>;
  register(data: RegisterData): Promise<User>;
  logout(): Promise<void>;
  getCurrentUser(): Promise<User | null> | User | null;
  updateProfile(userId: string, data: Partial<User>): Promise<User>;
  onAuthStateChange?: (callback: (user: User | null) => void) => () => void;
}

/**
 * Mock Auth API를 IAuthAPI 인터페이스에 맞게 어댑터 패턴 적용
 */
const mockAuthAdapter: IAuthAPI = {
  login: mockAuthAPI.login,
  register: async (data: RegisterData) => {
    return mockAuthAPI.register(data);
  },
  logout: mockAuthAPI.logout,
  getCurrentUser: () => mockAuthAPI.getCurrentUser(),
  updateProfile: mockAuthAPI.updateProfile,
  // Mock API는 onAuthStateChange를 지원하지 않음
  onAuthStateChange: undefined,
};

/**
 * Supabase가 사용 가능한지 확인
 */
const isSupabaseAvailable = (): boolean => {
  return !!(env.supabase.url && env.supabase.anonKey);
};

/**
 * 환경에 따라 적절한 Auth API 구현체 선택
 */
export const getAuthAPI = (): IAuthAPI => {
  // Supabase가 설정되어 있으면 Supabase 사용
  if (isSupabaseAvailable()) {
    return supabaseAuthService as IAuthAPI;
  }

  // 그 외에는 Mock API 사용
  console.warn('[API Factory] Supabase를 사용할 수 없습니다. Mock API를 사용합니다.');
  return mockAuthAdapter;
};

/**
 * 현재 사용 중인 API 유형 확인
 */
export const getAPIType = (): 'supabase' | 'mock' => {
  return isSupabaseAvailable() ? 'supabase' : 'mock';
};

/**
 * 개발 환경에서 API 유형 로깅
 */
if (isDevelopment) {
  console.log(`[API Factory] Using ${getAPIType()} API`);
}

/**
 * 싱글톤 패턴으로 API 인스턴스 제공
 */
export const authService = getAuthAPI();
