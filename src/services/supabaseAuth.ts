import { supabase, type Profile } from '../lib/supabase';
import type { User } from '../types';
import type { RegisterData } from '../contexts/AuthContext';

/**
 * Supabase Auth Service
 * Supabase Authentication을 사용한 인증 서비스
 */

// Supabase Profile을 앱의 User 타입으로 변환
const profileToUser = (profile: Profile): User => {
  return {
    id: profile.id,
    name: profile.full_name,
    email: profile.email,
    role: profile.role,
    avatar: profile.avatar_url,
    phone: profile.phone,
    createdAt: profile.created_at,
  };
};

// 현재 로그인된 사용자 가져오기
export const getCurrentUser = async (): Promise<User | null> => {
  try {
    // Supabase 세션 확인
    const {
      data: { session },
      error: sessionError,
    } = await supabase.auth.getSession();

    if (sessionError || !session) {
      return null;
    }

    // 프로필 정보 가져오기
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', session.user.id)
      .single();

    if (profileError || !profile) {
      console.error('프로필 가져오기 실패:', profileError);
      return null;
    }

    return profileToUser(profile as Profile);
  } catch (error) {
    console.error('getCurrentUser 오류:', error);
    return null;
  }
};

// 로그인
export const login = async (email: string, password: string): Promise<User> => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    throw new Error(error.message);
  }

  if (!data.user) {
    throw new Error('로그인에 실패했습니다.');
  }

  // 프로필 정보 가져오기
  const { data: profile, error: profileError } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', data.user.id)
    .single();

  if (profileError || !profile) {
    throw new Error('프로필 정보를 가져올 수 없습니다.');
  }

  return profileToUser(profile as Profile);
};

// 회원가입
export const register = async (data: RegisterData): Promise<User> => {
  // 1. Supabase Auth에 사용자 생성
  const { data: authData, error: authError } = await supabase.auth.signUp({
    email: data.email,
    password: data.password,
    options: {
      data: {
        full_name: data.name,
        role: data.role,
      },
    },
  });

  if (authError) {
    throw new Error(authError.message);
  }

  if (!authData.user) {
    throw new Error('회원가입에 실패했습니다.');
  }

  // 2. profiles 테이블에 프로필 생성
  const { data: profile, error: profileError } = await supabase
    .from('profiles')
    .insert({
      id: authData.user.id,
      email: data.email,
      full_name: data.name,
      phone: data.phone,
      role: data.role,
    })
    .select()
    .single();

  if (profileError) {
    // 프로필 생성 실패 시 인증 사용자 삭제
    console.error('프로필 생성 실패:', profileError);
    throw new Error('프로필 생성에 실패했습니다.');
  }

  // 3. 역할별 추가 테이블에 데이터 생성
  if (data.role === 'student') {
    const { error: studentError } = await supabase.from('students').insert({
      user_id: authData.user.id,
      grade: undefined,
      school_name: undefined,
    });

    if (studentError) {
      console.error('학생 프로필 생성 실패:', studentError);
    }
  } else if (data.role === 'tutor') {
    // 튜터는 별도로 신청 과정이 필요하므로 여기서는 생성하지 않음
    // 관리자 승인 후 tutors 테이블에 추가
  }

  return profileToUser(profile as Profile);
};

// 로그아웃
export const logout = async (): Promise<void> => {
  const { error } = await supabase.auth.signOut();
  if (error) {
    throw new Error(error.message);
  }
};

// 프로필 업데이트
export const updateProfile = async (
  userId: string,
  updates: Partial<User>
): Promise<User> => {
  // profiles 테이블 업데이트
  const { data: profile, error } = await supabase
    .from('profiles')
    .update({
      full_name: updates.name,
      phone: updates.phone,
      avatar_url: updates.avatar,
    })
    .eq('id', userId)
    .select()
    .single();

  if (error || !profile) {
    throw new Error('프로필 업데이트에 실패했습니다.');
  }

  return profileToUser(profile as Profile);
};

// Auth 상태 변경 리스너 설정
export const onAuthStateChange = (
  callback: (user: User | null) => void
): (() => void) => {
  const {
    data: { subscription },
  } = supabase.auth.onAuthStateChange(async (event, session) => {
    if (event === 'SIGNED_IN' && session) {
      const user = await getCurrentUser();
      callback(user);
    } else if (event === 'SIGNED_OUT') {
      callback(null);
    }
  });

  // Cleanup function
  return () => {
    subscription.unsubscribe();
  };
};

export const supabaseAuthService = {
  getCurrentUser,
  login,
  register,
  logout,
  updateProfile,
  onAuthStateChange,
};
