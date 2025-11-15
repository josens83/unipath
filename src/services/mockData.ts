import type {
  PricingPlan,
  GradeData,
  Tutor,
  Class,
  Post,
  StudyGroup,
  UniversityPrediction,
} from '../types';

export const pricingPlans: PricingPlan[] = [
  {
    id: 'free',
    name: '무료 체험',
    price: 0,
    features: [
      '커뮤니티 접근',
      '기본 AI 분석 월 1회',
      '게시판 이용',
      '제한된 학습 자료',
    ],
  },
  {
    id: 'basic',
    name: '베이직',
    price: 49000,
    features: [
      'AI 분석 무제한',
      '월 2회 화상수업',
      'Q&A 우선답변',
      '학습 진도 관리',
      '성적 분석 리포트',
    ],
    popular: true,
  },
  {
    id: 'premium',
    name: '프리미엄',
    price: 149000,
    features: [
      '전체 기능 무제한',
      '무제한 화상수업',
      '1:1 컨설팅 월 4회',
      '맞춤 학습 플랜',
      '24시간 질의응답',
      '합격 수기 프리미엄 콘텐츠',
    ],
  },
];

export const mockGrades: GradeData[] = [
  { subject: '국어', score: 85, percentile: 88, date: '2024-03' },
  { subject: '수학', score: 78, percentile: 75, date: '2024-03' },
  { subject: '영어', score: 92, percentile: 95, date: '2024-03' },
  { subject: '과학', score: 88, percentile: 90, date: '2024-03' },
  { subject: '사회', score: 90, percentile: 92, date: '2024-03' },
];

export const mockTutors: Tutor[] = [
  {
    id: '1',
    email: 'tutor1@example.com',
    name: '김수학',
    role: 'tutor',
    specialties: ['수학', '물리'],
    education: '서울대학교 수학과',
    rating: 4.9,
    totalClasses: 230,
    hourlyRate: 50000,
    bio: '10년 경력의 수학 전문 강사입니다. 학생 개개인의 수준에 맞는 맞춤 수업을 제공합니다.',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=tutor1',
    createdAt: '2023-01-15',
    availability: [
      { day: '월요일', startTime: '18:00', endTime: '22:00' },
      { day: '수요일', startTime: '18:00', endTime: '22:00' },
      { day: '금요일', startTime: '18:00', endTime: '22:00' },
    ],
  },
  {
    id: '2',
    email: 'tutor2@example.com',
    name: '이영어',
    role: 'tutor',
    specialties: ['영어', '영문법'],
    education: '연세대학교 영어영문학과',
    rating: 4.8,
    totalClasses: 180,
    hourlyRate: 45000,
    bio: '토익 990점, 영어 회화부터 수능 영어까지 완벽 대비 가능합니다.',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=tutor2',
    createdAt: '2023-02-20',
    availability: [
      { day: '화요일', startTime: '17:00', endTime: '21:00' },
      { day: '목요일', startTime: '17:00', endTime: '21:00' },
      { day: '토요일', startTime: '10:00', endTime: '18:00' },
    ],
  },
  {
    id: '3',
    email: 'tutor3@example.com',
    name: '박국어',
    role: 'tutor',
    specialties: ['국어', '논술'],
    education: '고려대학교 국어국문학과',
    rating: 4.7,
    totalClasses: 150,
    hourlyRate: 48000,
    bio: '논술 전문 강사로 다수의 학생들을 명문대에 합격시켰습니다.',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=tutor3',
    createdAt: '2023-03-10',
    availability: [
      { day: '월요일', startTime: '16:00', endTime: '20:00' },
      { day: '수요일', startTime: '16:00', endTime: '20:00' },
      { day: '일요일', startTime: '14:00', endTime: '18:00' },
    ],
  },
];

export const mockClasses: Class[] = [
  {
    id: '1',
    studentId: 'student1',
    tutorId: '1',
    subject: '수학',
    scheduledAt: '2024-12-15T18:00:00',
    duration: 60,
    status: 'scheduled',
    materials: ['미적분 교재 3단원'],
  },
  {
    id: '2',
    studentId: 'student1',
    tutorId: '2',
    subject: '영어',
    scheduledAt: '2024-12-16T17:00:00',
    duration: 60,
    status: 'scheduled',
    materials: ['영문법 정리 자료'],
  },
];

export const mockPosts: Post[] = [
  {
    id: '1',
    authorId: 'admin',
    authorName: '관리자',
    category: 'notice',
    title: '2025학년도 대입 일정 안내',
    content: '2025학년도 대학입시 주요 일정을 안내드립니다...',
    tags: ['공지', '입시일정'],
    views: 1523,
    likes: 45,
    comments: [],
    createdAt: '2024-11-01T10:00:00',
    updatedAt: '2024-11-01T10:00:00',
  },
  {
    id: '2',
    authorId: 'user1',
    authorName: '익명',
    category: 'success',
    title: '서울대 합격 수기',
    content: 'UniPath 덕분에 꿈에 그리던 서울대에 합격했습니다!',
    tags: ['합격수기', '서울대'],
    views: 892,
    likes: 78,
    comments: [
      {
        id: 'c1',
        authorId: 'user2',
        authorName: '익명',
        content: '축하드립니다! 어떤 공부법이 가장 효과적이었나요?',
        createdAt: '2024-11-05T14:30:00',
      },
    ],
    createdAt: '2024-11-05T09:00:00',
    updatedAt: '2024-11-05T09:00:00',
  },
];

export const mockStudyGroups: StudyGroup[] = [
  {
    id: '1',
    name: '수학 올림피아드 준비반',
    description: '수학 올림피아드를 준비하는 학생들의 모임입니다.',
    subject: '수학',
    maxMembers: 10,
    currentMembers: ['user1', 'user2', 'user3'],
    schedule: [
      { day: '토요일', startTime: '14:00', endTime: '17:00' },
    ],
    createdAt: '2024-10-01',
  },
  {
    id: '2',
    name: '영어 토론 스터디',
    description: '영어 실력 향상을 위한 토론 스터디입니다.',
    subject: '영어',
    maxMembers: 8,
    currentMembers: ['user4', 'user5'],
    schedule: [
      { day: '일요일', startTime: '15:00', endTime: '17:00' },
    ],
    createdAt: '2024-10-15',
  },
];

export const mockUniversityPredictions: UniversityPrediction[] = [
  {
    universityName: '서울대학교',
    department: '경영학과',
    admissionProbability: 65,
    requiredScore: 92,
    competitionRate: 15.2,
  },
  {
    universityName: '연세대학교',
    department: '경영학과',
    admissionProbability: 78,
    requiredScore: 88,
    competitionRate: 12.8,
  },
  {
    universityName: '고려대학교',
    department: '경영학과',
    admissionProbability: 82,
    requiredScore: 86,
    competitionRate: 11.5,
  },
  {
    universityName: '성균관대학교',
    department: '경영학과',
    admissionProbability: 90,
    requiredScore: 83,
    competitionRate: 9.3,
  },
];
