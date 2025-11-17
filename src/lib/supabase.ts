import { createClient } from '@supabase/supabase-js';

// Supabase 환경 변수 확인
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    'Supabase 환경 변수가 설정되지 않았습니다. .env 파일을 확인하세요.\n' +
    'VITE_SUPABASE_URL과 VITE_SUPABASE_ANON_KEY가 필요합니다.'
  );
}

// Supabase 클라이언트 생성
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
  },
});

// Database Types (TypeScript용)
export interface Profile {
  id: string;
  email: string;
  full_name: string;
  phone?: string;
  avatar_url?: string;
  role: 'student' | 'tutor' | 'parent' | 'admin';
  created_at: string;
  updated_at: string;
}

export interface Student {
  id: string;
  user_id: string;
  grade?: number;
  school_name?: string;
  target_universities?: string[];
  subjects?: string[];
  gpa?: number;
  sat_score?: number;
  act_score?: number;
  parent_id?: string;
  created_at: string;
  updated_at: string;
}

export interface Tutor {
  id: string;
  user_id: string;
  university: string;
  major: string;
  graduation_year?: number;
  subjects: string[];
  hourly_rate: number;
  rating: number;
  total_sessions: number;
  bio?: string;
  education_background?: string;
  teaching_style?: string;
  available_hours?: Record<string, string[]>;
  verified: boolean;
  created_at: string;
  updated_at: string;
}

export interface Session {
  id: string;
  student_id: string;
  tutor_id: string;
  subject: string;
  scheduled_at: string;
  duration_minutes: number;
  status: 'scheduled' | 'ongoing' | 'completed' | 'cancelled';
  meeting_url?: string;
  notes?: string;
  rating?: number;
  review?: string;
  created_at: string;
  updated_at: string;
}

export interface Payment {
  id: string;
  user_id: string;
  session_id?: string;
  amount: number;
  currency: string;
  payment_method: string;
  status: 'pending' | 'completed' | 'failed' | 'refunded';
  toss_payment_key?: string;
  toss_order_id?: string;
  paid_at?: string;
  created_at: string;
}

export interface AIConsultation {
  id: string;
  student_id: string;
  consultation_type: 'university_recommendation' | 'study_plan' | 'career_advice';
  input_data: Record<string, any>;
  ai_response: Record<string, any>;
  prompt_tokens?: number;
  completion_tokens?: number;
  created_at: string;
}

export interface CommunityPost {
  id: string;
  author_id: string;
  title: string;
  content: string;
  category: 'study_tips' | 'university_info' | 'tutoring' | 'general' | 'qna';
  tags?: string[];
  views: number;
  likes: number;
  created_at: string;
  updated_at: string;
}

export interface Comment {
  id: string;
  post_id: string;
  author_id: string;
  content: string;
  likes: number;
  created_at: string;
  updated_at: string;
}

export interface Notification {
  id: string;
  user_id: string;
  type: string;
  title: string;
  message: string;
  read: boolean;
  link?: string;
  created_at: string;
}
