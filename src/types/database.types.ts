/**
 * Database Schema Types (Supabase - snake_case)
 * 이 파일은 Supabase 데이터베이스 스키마와 1:1 매칭됩니다.
 */

// ============================================
// Core Database Tables
// ============================================

export interface DbProfile {
  id: string;
  email: string;
  full_name: string;
  phone: string | null;
  avatar_url: string | null;
  role: 'student' | 'tutor' | 'parent' | 'admin';
  created_at: string;
  updated_at: string;
}

export interface DbStudent {
  id: string;
  user_id: string;
  grade: number | null;
  school_name: string | null;
  target_universities: string[] | null;
  subjects: string[] | null;
  gpa: number | null;
  sat_score: number | null;
  act_score: number | null;
  parent_id: string | null;
  created_at: string;
  updated_at: string;
}

export interface DbTutor {
  id: string;
  user_id: string;
  university: string;
  major: string;
  graduation_year: number | null;
  subjects: string[];
  hourly_rate: number;
  rating: number;
  total_sessions: number;
  bio: string | null;
  education_background: string | null;
  teaching_style: string | null;
  available_hours: Record<string, string[]> | null;
  verified: boolean;
  created_at: string;
  updated_at: string;
}

export interface DbSession {
  id: string;
  student_id: string;
  tutor_id: string;
  subject: string;
  scheduled_at: string;
  duration_minutes: number;
  status: 'scheduled' | 'ongoing' | 'completed' | 'cancelled';
  meeting_url: string | null;
  notes: string | null;
  rating: number | null;
  review: string | null;
  created_at: string;
  updated_at: string;
}

export interface DbPayment {
  id: string;
  user_id: string;
  session_id: string | null;
  amount: number;
  currency: string;
  payment_method: string;
  status: 'pending' | 'completed' | 'failed' | 'refunded';
  toss_payment_key: string | null;
  toss_order_id: string | null;
  paid_at: string | null;
  created_at: string;
}

export interface DbAIConsultation {
  id: string;
  student_id: string;
  consultation_type: 'university_recommendation' | 'study_plan' | 'career_advice';
  input_data: Record<string, any>;
  ai_response: Record<string, any>;
  prompt_tokens: number | null;
  completion_tokens: number | null;
  created_at: string;
}

export interface DbCommunityPost {
  id: string;
  author_id: string;
  title: string;
  content: string;
  category: 'study_tips' | 'university_info' | 'tutoring' | 'general' | 'qna';
  tags: string[] | null;
  views: number;
  likes: number;
  created_at: string;
  updated_at: string;
}

export interface DbComment {
  id: string;
  post_id: string;
  author_id: string;
  content: string;
  likes: number;
  created_at: string;
  updated_at: string;
}

export interface DbNotification {
  id: string;
  user_id: string;
  type: string;
  title: string;
  message: string;
  read: boolean;
  link: string | null;
  created_at: string;
}

export interface DbStudyGroup {
  id: string;
  name: string;
  description: string | null;
  category: string;
  max_members: number;
  creator_id: string;
  created_at: string;
}

export interface DbStudyGroupMember {
  id: string;
  group_id: string;
  user_id: string;
  role: 'admin' | 'member';
  joined_at: string;
}

// ============================================
// Join Types (with related data)
// ============================================

export interface DbPostWithAuthor extends DbCommunityPost {
  author: DbProfile;
  comments?: DbCommentWithAuthor[];
}

export interface DbCommentWithAuthor extends DbComment {
  author: DbProfile;
}

export interface DbSessionWithDetails extends DbSession {
  student: DbStudent & { profile: DbProfile };
  tutor: DbTutor & { profile: DbProfile };
}

// ============================================
// Database Enums
// ============================================

export type DbUserRole = DbProfile['role'];
export type DbSessionStatus = DbSession['status'];
export type DbPaymentStatus = DbPayment['status'];
export type DbPostCategory = DbCommunityPost['category'];
export type DbConsultationType = DbAIConsultation['consultation_type'];

// ============================================
// Insert Types (for creating new records)
// ============================================

export type DbProfileInsert = Omit<DbProfile, 'created_at' | 'updated_at'>;
export type DbStudentInsert = Omit<DbStudent, 'id' | 'created_at' | 'updated_at'>;
export type DbTutorInsert = Omit<DbTutor, 'id' | 'created_at' | 'updated_at' | 'rating' | 'total_sessions' | 'verified'>;
export type DbSessionInsert = Omit<DbSession, 'id' | 'created_at' | 'updated_at'>;
export type DbPaymentInsert = Omit<DbPayment, 'id' | 'created_at'>;
export type DbPostInsert = Omit<DbCommunityPost, 'id' | 'created_at' | 'updated_at' | 'views' | 'likes'>;

// ============================================
// Update Types (for updating records)
// ============================================

export type DbProfileUpdate = Partial<Omit<DbProfile, 'id' | 'created_at' | 'updated_at'>>;
export type DbStudentUpdate = Partial<Omit<DbStudent, 'id' | 'user_id' | 'created_at' | 'updated_at'>>;
export type DbTutorUpdate = Partial<Omit<DbTutor, 'id' | 'user_id' | 'created_at' | 'updated_at'>>;
export type DbSessionUpdate = Partial<Omit<DbSession, 'id' | 'created_at' | 'updated_at'>>;
