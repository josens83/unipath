/**
 * Type Mappers - Database ↔ Application
 * snake_case (DB) ↔ camelCase (App) 변환 유틸리티
 */

import type {
  DbProfile,
  DbStudent,
  DbTutor,
  DbSession,
  DbPayment,
  DbCommunityPost,
  DbComment,
  DbNotification,
  DbPostWithAuthor,
  DbCommentWithAuthor,
} from './database.types';

import type {
  User,
  Student,
  Tutor,
  Class,
  Payment,
  Post,
  Comment,
  Notification,
} from './index';

// ============================================
// Profile → User
// ============================================

export function mapProfileToUser(profile: DbProfile): User {
  return {
    id: profile.id,
    email: profile.email,
    name: profile.full_name,
    role: profile.role,
    avatar: profile.avatar_url ?? undefined,
    phone: profile.phone ?? undefined,
    createdAt: profile.created_at,
  };
}

export function mapUserToProfileUpdate(user: Partial<User>): Partial<DbProfile> {
  const update: Partial<DbProfile> = {};

  if (user.email !== undefined) update.email = user.email;
  if (user.name !== undefined) update.full_name = user.name;
  if (user.role !== undefined) update.role = user.role;
  if (user.avatar !== undefined) update.avatar_url = user.avatar;
  if (user.phone !== undefined) update.phone = user.phone;

  return update;
}

// ============================================
// DbStudent → Student (extends User)
// ============================================

export function mapDbStudentToStudent(
  dbStudent: DbStudent,
  profile: DbProfile
): Student {
  return {
    ...mapProfileToUser(profile),
    role: 'student',
    grade: dbStudent.grade ?? 0,
    school: dbStudent.school_name ?? '',
    targetUniversities: dbStudent.target_universities ?? [],
    subjects: dbStudent.subjects ?? [],
    parentId: dbStudent.parent_id ?? undefined,
  };
}

// ============================================
// DbTutor → Tutor (extends User)
// ============================================

export function mapDbTutorToTutor(
  dbTutor: DbTutor,
  profile: DbProfile
): Tutor {
  return {
    ...mapProfileToUser(profile),
    role: 'tutor',
    specialties: dbTutor.subjects,
    education: `${dbTutor.university} ${dbTutor.major}`,
    rating: dbTutor.rating,
    totalClasses: dbTutor.total_sessions,
    hourlyRate: dbTutor.hourly_rate,
    bio: dbTutor.bio ?? '',
    availability: mapAvailableHoursToTimeSlots(dbTutor.available_hours),
  };
}

function mapAvailableHoursToTimeSlots(
  availableHours: Record<string, string[]> | null | undefined
): Array<{ day: string; startTime: string; endTime: string }> {
  if (!availableHours) return [];

  const result: Array<{ day: string; startTime: string; endTime: string }> = [];

  for (const [day, slots] of Object.entries(availableHours)) {
    for (const slot of slots) {
      const [startTime, endTime] = slot.split('-');
      if (startTime && endTime) {
        result.push({ day, startTime, endTime });
      }
    }
  }

  return result;
}

// ============================================
// DbSession → Class
// ============================================

export function mapDbSessionToClass(session: DbSession): Class {
  return {
    id: session.id,
    studentId: session.student_id,
    tutorId: session.tutor_id,
    subject: session.subject,
    scheduledAt: session.scheduled_at,
    duration: session.duration_minutes,
    status: session.status,
    materials: undefined, // Not in DB schema
    recordingUrl: session.meeting_url ?? undefined,
  };
}

// ============================================
// DbPayment → Payment
// ============================================

export function mapDbPaymentToPayment(dbPayment: DbPayment): Payment {
  return {
    id: dbPayment.id,
    userId: dbPayment.user_id,
    amount: dbPayment.amount,
    plan: 'basic', // TODO: Infer from amount or add plan field to DB
    method: dbPayment.payment_method,
    status: dbPayment.status === 'completed' ? 'completed' :
            dbPayment.status === 'failed' ? 'failed' : 'pending',
    createdAt: dbPayment.created_at,
  };
}

// ============================================
// DbCommunityPost → Post
// ============================================

export function mapDbPostToPost(
  dbPost: DbCommunityPost,
  authorName: string,
  comments?: Comment[]
): Post {
  // Map category - DB categories to App categories
  let category: Post['category'];
  switch (dbPost.category) {
    case 'qna':
      category = 'qna';
      break;
    case 'university_info':
      category = 'success';
      break;
    case 'study_tips':
      category = 'notice';
      break;
    case 'general':
    default:
      category = 'free';
  }

  return {
    id: dbPost.id,
    authorId: dbPost.author_id,
    authorName,
    category,
    title: dbPost.title,
    content: dbPost.content,
    tags: dbPost.tags ?? [],
    views: dbPost.views,
    likes: dbPost.likes,
    comments: comments ?? [],
    createdAt: dbPost.created_at,
    updatedAt: dbPost.updated_at,
  };
}

export function mapDbPostWithAuthorToPost(dbPost: DbPostWithAuthor): Post {
  const comments = dbPost.comments?.map(c =>
    mapDbCommentWithAuthorToComment(c)
  ) ?? [];

  return mapDbPostToPost(dbPost, dbPost.author.full_name, comments);
}

// ============================================
// DbComment → Comment
// ============================================

export function mapDbCommentToComment(
  dbComment: DbComment,
  authorName: string
): Comment {
  return {
    id: dbComment.id,
    authorId: dbComment.author_id,
    authorName,
    content: dbComment.content,
    createdAt: dbComment.created_at,
  };
}

export function mapDbCommentWithAuthorToComment(
  dbComment: DbCommentWithAuthor
): Comment {
  return mapDbCommentToComment(dbComment, dbComment.author.full_name);
}

// ============================================
// DbNotification → Notification
// ============================================

export function mapDbNotificationToNotification(
  dbNotification: DbNotification
): Notification {
  return {
    id: dbNotification.id,
    userId: dbNotification.user_id,
    type: dbNotification.type as Notification['type'],
    title: dbNotification.title,
    message: dbNotification.message,
    read: dbNotification.read,
    link: dbNotification.link ?? undefined,
    createdAt: dbNotification.created_at,
  };
}

// ============================================
// Reverse Mappers (App → DB for inserts/updates)
// ============================================

export function mapPostToDbPostInsert(
  post: Omit<Post, 'id' | 'views' | 'likes' | 'comments' | 'createdAt' | 'updatedAt'>
): Omit<DbCommunityPost, 'id' | 'created_at' | 'updated_at' | 'views' | 'likes'> {
  // Map category back
  let category: DbCommunityPost['category'];
  switch (post.category) {
    case 'notice':
      category = 'general';
      break;
    case 'success':
      category = 'university_info';
      break;
    case 'qna':
      category = 'qna';
      break;
    default:
      category = 'general';
  }

  return {
    author_id: post.authorId,
    title: post.title,
    content: post.content,
    category,
    tags: post.tags,
  };
}

// ============================================
// Utility Types
// ============================================

/**
 * Generic snake_case to camelCase converter type
 * (for reference - actual conversion happens in mapper functions)
 */
export type SnakeToCamel<S extends string> = S extends `${infer T}_${infer U}`
  ? `${T}${Capitalize<SnakeToCamel<U>>}`
  : S;

/**
 * Generic camelCase to snake_case converter type
 */
export type CamelToSnake<S extends string> = S extends `${infer T}${infer U}`
  ? `${T extends Capitalize<T> ? '_' : ''}${Lowercase<T>}${CamelToSnake<U>}`
  : S;
