// User Types
export type UserRole = 'student' | 'parent' | 'tutor' | 'admin';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatar?: string;
  phone?: string;
  createdAt: string;
}

export interface Student extends User {
  role: 'student';
  grade: number;
  school: string;
  targetUniversities: string[];
  subjects: string[];
  parentId?: string;
}

export interface Parent extends User {
  role: 'parent';
  children: string[]; // Student IDs
}

export interface Tutor extends User {
  role: 'tutor';
  specialties: string[];
  education: string;
  rating: number;
  totalClasses: number;
  hourlyRate: number;
  bio: string;
  availability: TimeSlot[];
}

// Schedule Types
export interface TimeSlot {
  day: string;
  startTime: string;
  endTime: string;
}

export interface Class {
  id: string;
  studentId: string;
  tutorId: string;
  subject: string;
  scheduledAt: string;
  duration: number; // in minutes
  status: 'scheduled' | 'ongoing' | 'completed' | 'cancelled';
  materials?: string[];
  recordingUrl?: string;
}

// Academic Performance Types
export interface GradeData {
  subject: string;
  score: number;
  percentile: number;
  date: string;
}

export interface PerformanceData {
  studentId: string;
  semester: string;
  grades: GradeData[];
  overallAverage: number;
}

// AI Consulting Types
export interface UniversityPrediction {
  universityName: string;
  department: string;
  admissionProbability: number;
  requiredScore: number;
  competitionRate: number;
}

export interface AIAnalysisResult {
  studentId: string;
  predictions: UniversityPrediction[];
  weakSubjects: string[];
  recommendations: string[];
  studyPlan: StudyPlanItem[];
  generatedAt: string;
}

export interface StudyPlanItem {
  subject: string;
  targetScore: number;
  currentScore: number;
  tasks: string[];
  deadline: string;
}

// Community Types
export interface Post {
  id: string;
  authorId: string;
  authorName: string;
  category: 'notice' | 'free' | 'success' | 'qna';
  title: string;
  content: string;
  tags: string[];
  views: number;
  likes: number;
  comments: Comment[];
  createdAt: string;
  updatedAt: string;
}

export interface Comment {
  id: string;
  authorId: string;
  authorName: string;
  content: string;
  createdAt: string;
}

export interface StudyGroup {
  id: string;
  name: string;
  description: string;
  subject: string;
  maxMembers: number;
  currentMembers: string[]; // User IDs
  schedule: TimeSlot[];
  createdAt: string;
}

// Payment Types
export type PlanType = 'free' | 'basic' | 'premium';

export interface PricingPlan {
  id: PlanType;
  name: string;
  price: number;
  features: string[];
  popular?: boolean;
}

export interface Subscription {
  userId: string;
  plan: PlanType;
  startDate: string;
  endDate: string;
  autoRenew: boolean;
  status: 'active' | 'cancelled' | 'expired';
}

export interface Payment {
  id: string;
  userId: string;
  amount: number;
  plan: PlanType;
  method: string;
  status: 'pending' | 'completed' | 'failed';
  createdAt: string;
}

// Notification Types
export interface Notification {
  id: string;
  userId: string;
  type: 'class' | 'payment' | 'message' | 'announcement' | 'system';
  title: string;
  message: string;
  read: boolean;
  link?: string;
  createdAt: string;
}
