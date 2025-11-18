import { createClient } from '@supabase/supabase-js';
import { env } from '../config/env';

// Supabase 클라이언트 생성
export const supabase = createClient(env.supabase.url, env.supabase.anonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
  },
});

// Database Types (TypeScript용)
// 모든 DB 타입은 단일 소스에서 관리됩니다.
export {
  type DbProfile as Profile,
  type DbStudent as Student,
  type DbTutor as Tutor,
  type DbSession as Session,
  type DbPayment as Payment,
  type DbAIConsultation as AIConsultation,
  type DbCommunityPost as CommunityPost,
  type DbComment as Comment,
  type DbNotification as Notification,
} from '../types/database.types';
