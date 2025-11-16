import type {
  User, Tutor,
  Post, Comment, Class,
  AIAnalysisResult, Payment, Subscription, PlanType
} from '../types';

// LocalStorage Keys
const STORAGE_KEYS = {
  USERS: 'unipath_users',
  POSTS: 'unipath_posts',
  CLASSES: 'unipath_classes',
  PAYMENTS: 'unipath_payments',
  SUBSCRIPTIONS: 'unipath_subscriptions',
  CURRENT_USER: 'unipath_current_user',
} as const;

// Utility: Delay for realistic API simulation
const delay = (ms: number = 500) => new Promise(resolve => setTimeout(resolve, ms));

// Utility: Get from LocalStorage
const getStorage = <T>(key: string, defaultValue: T): T => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch {
    return defaultValue;
  }
};

// Utility: Set to LocalStorage
const setStorage = <T>(key: string, value: T): void => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error('Storage error:', error);
  }
};

// Initialize Mock Data
const initializeMockData = () => {
  const users = getStorage<User[]>(STORAGE_KEYS.USERS, []);

  if (users.length === 0) {
    const mockUsers: User[] = [
      {
        id: 'admin-1',
        email: 'admin@unipath.kr',
        name: '관리자',
        role: 'admin',
        createdAt: new Date().toISOString(),
      },
      {
        id: 'student-1',
        email: 'student@test.com',
        name: '김학생',
        role: 'student',
        createdAt: new Date().toISOString(),
      },
      {
        id: 'parent-1',
        email: 'parent@test.com',
        name: '이학부모',
        role: 'parent',
        createdAt: new Date().toISOString(),
      },
      {
        id: 'tutor-1',
        email: 'tutor@test.com',
        name: '박튜터',
        role: 'tutor',
        createdAt: new Date().toISOString(),
      },
    ];

    setStorage(STORAGE_KEYS.USERS, mockUsers);
  }
};

// Initialize on module load
initializeMockData();

// ==================== Auth API ====================

export const authAPI = {
  async login(email: string, password: string): Promise<User> {
    await delay();

    const users = getStorage<User[]>(STORAGE_KEYS.USERS, []);
    const user = users.find(u => u.email === email);

    if (!user || password.length < 6) {
      throw new Error('이메일 또는 비밀번호가 올바르지 않습니다.');
    }

    setStorage(STORAGE_KEYS.CURRENT_USER, user);
    return user;
  },

  async register(data: {
    email: string;
    password: string;
    name: string;
    role: 'student' | 'parent' | 'tutor';
    phone?: string;
  }): Promise<User> {
    await delay();

    const users = getStorage<User[]>(STORAGE_KEYS.USERS, []);

    if (users.some(u => u.email === data.email)) {
      throw new Error('이미 등록된 이메일입니다.');
    }

    const newUser: User = {
      id: `${data.role}-${Date.now()}`,
      email: data.email,
      name: data.name,
      role: data.role,
      phone: data.phone,
      createdAt: new Date().toISOString(),
    };

    users.push(newUser);
    setStorage(STORAGE_KEYS.USERS, users);
    setStorage(STORAGE_KEYS.CURRENT_USER, newUser);

    return newUser;
  },

  async logout(): Promise<void> {
    await delay(200);
    localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
  },

  getCurrentUser(): User | null {
    return getStorage<User | null>(STORAGE_KEYS.CURRENT_USER, null);
  },

  async updateProfile(userId: string, data: Partial<User>): Promise<User> {
    await delay();

    const users = getStorage<User[]>(STORAGE_KEYS.USERS, []);
    const index = users.findIndex(u => u.id === userId);

    if (index === -1) {
      throw new Error('사용자를 찾을 수 없습니다.');
    }

    users[index] = { ...users[index], ...data };
    setStorage(STORAGE_KEYS.USERS, users);

    const currentUser = getStorage<User | null>(STORAGE_KEYS.CURRENT_USER, null);
    if (currentUser?.id === userId) {
      setStorage(STORAGE_KEYS.CURRENT_USER, users[index]);
    }

    return users[index];
  },
};

// ==================== User API ====================

export const userAPI = {
  async getUsers(role?: string): Promise<User[]> {
    await delay();

    const users = getStorage<User[]>(STORAGE_KEYS.USERS, []);
    return role ? users.filter(u => u.role === role) : users;
  },

  async getUser(userId: string): Promise<User | null> {
    await delay();

    const users = getStorage<User[]>(STORAGE_KEYS.USERS, []);
    return users.find(u => u.id === userId) || null;
  },

  async deleteUser(userId: string): Promise<void> {
    await delay();

    const users = getStorage<User[]>(STORAGE_KEYS.USERS, []);
    const filtered = users.filter(u => u.id !== userId);
    setStorage(STORAGE_KEYS.USERS, filtered);
  },
};

// ==================== Post API ====================

export const postAPI = {
  async getPosts(category?: string): Promise<Post[]> {
    await delay();

    const posts = getStorage<Post[]>(STORAGE_KEYS.POSTS, []);
    return category ? posts.filter(p => p.category === category) : posts;
  },

  async getPost(postId: string): Promise<Post | null> {
    await delay();

    const posts = getStorage<Post[]>(STORAGE_KEYS.POSTS, []);
    return posts.find(p => p.id === postId) || null;
  },

  async createPost(data: Omit<Post, 'id' | 'views' | 'likes' | 'comments' | 'createdAt' | 'updatedAt'>): Promise<Post> {
    await delay();

    const posts = getStorage<Post[]>(STORAGE_KEYS.POSTS, []);

    const newPost: Post = {
      ...data,
      id: `post-${Date.now()}`,
      views: 0,
      likes: 0,
      comments: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    posts.unshift(newPost);
    setStorage(STORAGE_KEYS.POSTS, posts);

    return newPost;
  },

  async updatePost(postId: string, data: Partial<Post>): Promise<Post> {
    await delay();

    const posts = getStorage<Post[]>(STORAGE_KEYS.POSTS, []);
    const index = posts.findIndex(p => p.id === postId);

    if (index === -1) {
      throw new Error('게시글을 찾을 수 없습니다.');
    }

    posts[index] = {
      ...posts[index],
      ...data,
      updatedAt: new Date().toISOString()
    };
    setStorage(STORAGE_KEYS.POSTS, posts);

    return posts[index];
  },

  async deletePost(postId: string): Promise<void> {
    await delay();

    const posts = getStorage<Post[]>(STORAGE_KEYS.POSTS, []);
    const filtered = posts.filter(p => p.id !== postId);
    setStorage(STORAGE_KEYS.POSTS, filtered);
  },

  async addComment(postId: string, comment: Omit<Comment, 'id' | 'createdAt'>): Promise<Comment> {
    await delay();

    const posts = getStorage<Post[]>(STORAGE_KEYS.POSTS, []);
    const post = posts.find(p => p.id === postId);

    if (!post) {
      throw new Error('게시글을 찾을 수 없습니다.');
    }

    const newComment: Comment = {
      ...comment,
      id: `comment-${Date.now()}`,
      createdAt: new Date().toISOString(),
    };

    post.comments.push(newComment);
    setStorage(STORAGE_KEYS.POSTS, posts);

    return newComment;
  },
};

// ==================== Class API ====================

export const classAPI = {
  async getClasses(userId?: string, role?: string): Promise<Class[]> {
    await delay();

    const classes = getStorage<Class[]>(STORAGE_KEYS.CLASSES, []);

    if (!userId) return classes;

    if (role === 'student') {
      return classes.filter(c => c.studentId === userId);
    }
    if (role === 'tutor') {
      return classes.filter(c => c.tutorId === userId);
    }

    return classes;
  },

  async createClass(data: Omit<Class, 'id'>): Promise<Class> {
    await delay();

    const classes = getStorage<Class[]>(STORAGE_KEYS.CLASSES, []);

    const newClass: Class = {
      ...data,
      id: `class-${Date.now()}`,
    };

    classes.push(newClass);
    setStorage(STORAGE_KEYS.CLASSES, classes);

    return newClass;
  },

  async updateClass(classId: string, data: Partial<Class>): Promise<Class> {
    await delay();

    const classes = getStorage<Class[]>(STORAGE_KEYS.CLASSES, []);
    const index = classes.findIndex(c => c.id === classId);

    if (index === -1) {
      throw new Error('수업을 찾을 수 없습니다.');
    }

    classes[index] = { ...classes[index], ...data };
    setStorage(STORAGE_KEYS.CLASSES, classes);

    return classes[index];
  },

  async deleteClass(classId: string): Promise<void> {
    await delay();

    const classes = getStorage<Class[]>(STORAGE_KEYS.CLASSES, []);
    const filtered = classes.filter(c => c.id !== classId);
    setStorage(STORAGE_KEYS.CLASSES, filtered);
  },
};

// ==================== Tutor API ====================

export const tutorAPI = {
  async getTutors(filters?: { subject?: string; minRating?: number }): Promise<Tutor[]> {
    await delay();

    const users = getStorage<User[]>(STORAGE_KEYS.USERS, []);
    let tutors = users.filter(u => u.role === 'tutor') as Tutor[];

    if (filters?.subject) {
      tutors = tutors.filter(t =>
        (t as any).specialties?.includes(filters.subject)
      );
    }

    if (filters?.minRating !== undefined) {
      tutors = tutors.filter(t =>
        (t as any).rating >= filters.minRating!
      );
    }

    return tutors;
  },

  async getTutor(tutorId: string): Promise<Tutor | null> {
    await delay();

    const users = getStorage<User[]>(STORAGE_KEYS.USERS, []);
    const tutor = users.find(u => u.id === tutorId && u.role === 'tutor');

    return tutor as Tutor || null;
  },
};

// ==================== AI API ====================

export const aiAPI = {
  async analyzeStudent(studentId: string): Promise<AIAnalysisResult> {
    await delay(1000); // Longer delay for AI processing

    // Mock AI analysis result
    return {
      studentId,
      predictions: [
        {
          universityName: '서울대학교',
          department: '컴퓨터공학과',
          admissionProbability: 75,
          requiredScore: 95,
          competitionRate: 15.2,
        },
        {
          universityName: '연세대학교',
          department: '전기전자공학과',
          admissionProbability: 85,
          requiredScore: 92,
          competitionRate: 12.8,
        },
        {
          universityName: '고려대학교',
          department: '소프트웨어학과',
          admissionProbability: 90,
          requiredScore: 90,
          competitionRate: 10.5,
        },
      ],
      weakSubjects: ['영어', '수학'],
      recommendations: [
        '영어 독해 능력 향상을 위한 집중 학습이 필요합니다.',
        '수학 미적분 파트 보완 학습을 권장합니다.',
        '정기적인 모의고사를 통한 실전 감각 유지가 중요합니다.',
      ],
      studyPlan: [
        {
          subject: '영어',
          targetScore: 95,
          currentScore: 85,
          tasks: [
            '매일 영어 지문 3개 이상 읽기',
            '주 2회 모의고사 풀이',
            '틀린 문제 오답노트 작성',
          ],
          deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
        },
        {
          subject: '수학',
          targetScore: 92,
          currentScore: 88,
          tasks: [
            '미적분 개념 복습',
            '기출문제 풀이 (최근 3개년)',
            '약점 유형 집중 연습',
          ],
          deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
        },
      ],
      generatedAt: new Date().toISOString(),
    };
  },
};

// ==================== Payment API ====================

export const paymentAPI = {
  async createPayment(data: {
    userId: string;
    plan: PlanType;
    amount: number;
    method: string;
  }): Promise<Payment> {
    await delay(1000);

    const payments = getStorage<Payment[]>(STORAGE_KEYS.PAYMENTS, []);

    const newPayment: Payment = {
      id: `payment-${Date.now()}`,
      userId: data.userId,
      amount: data.amount,
      plan: data.plan,
      method: data.method,
      status: 'completed', // Mock: always successful
      createdAt: new Date().toISOString(),
    };

    payments.push(newPayment);
    setStorage(STORAGE_KEYS.PAYMENTS, payments);

    // Create subscription
    const subscriptions = getStorage<Subscription[]>(STORAGE_KEYS.SUBSCRIPTIONS, []);

    const newSubscription: Subscription = {
      userId: data.userId,
      plan: data.plan,
      startDate: new Date().toISOString(),
      endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
      autoRenew: true,
      status: 'active',
    };

    subscriptions.push(newSubscription);
    setStorage(STORAGE_KEYS.SUBSCRIPTIONS, subscriptions);

    return newPayment;
  },

  async getPayments(userId: string): Promise<Payment[]> {
    await delay();

    const payments = getStorage<Payment[]>(STORAGE_KEYS.PAYMENTS, []);
    return payments.filter(p => p.userId === userId);
  },

  async getSubscription(userId: string): Promise<Subscription | null> {
    await delay();

    const subscriptions = getStorage<Subscription[]>(STORAGE_KEYS.SUBSCRIPTIONS, []);
    return subscriptions.find(s => s.userId === userId && s.status === 'active') || null;
  },

  async cancelSubscription(userId: string): Promise<void> {
    await delay();

    const subscriptions = getStorage<Subscription[]>(STORAGE_KEYS.SUBSCRIPTIONS, []);
    const subscription = subscriptions.find(s => s.userId === userId && s.status === 'active');

    if (subscription) {
      subscription.status = 'cancelled';
      subscription.autoRenew = false;
      setStorage(STORAGE_KEYS.SUBSCRIPTIONS, subscriptions);
    }
  },
};

// ==================== Dashboard API ====================

export const dashboardAPI = {
  async getStats(userId: string, role: string) {
    await delay();

    if (role === 'admin') {
      return {
        totalUsers: getStorage<User[]>(STORAGE_KEYS.USERS, []).length,
        activeUsers: Math.floor(getStorage<User[]>(STORAGE_KEYS.USERS, []).length * 0.85),
        totalRevenue: 45780000,
        monthlyRevenue: 8950000,
        totalClasses: getStorage<Class[]>(STORAGE_KEYS.CLASSES, []).length,
        activeTutors: getStorage<User[]>(STORAGE_KEYS.USERS, []).filter(u => u.role === 'tutor').length,
      };
    }

    if (role === 'student') {
      const classes = getStorage<Class[]>(STORAGE_KEYS.CLASSES, []).filter(
        c => c.studentId === userId
      );

      return {
        totalClasses: classes.length,
        upcomingClasses: classes.filter(c => c.status === 'scheduled').length,
        completedClasses: classes.filter(c => c.status === 'completed').length,
        studyHours: classes.filter(c => c.status === 'completed').length * 1.5,
      };
    }

    if (role === 'tutor') {
      const classes = getStorage<Class[]>(STORAGE_KEYS.CLASSES, []).filter(
        c => c.tutorId === userId
      );

      return {
        totalClasses: classes.length,
        totalEarnings: classes.filter(c => c.status === 'completed').length * 50000,
        monthlyEarnings: classes.filter(c => c.status === 'completed').length * 25000,
        totalStudents: new Set(classes.map(c => c.studentId)).size,
      };
    }

    return {};
  },
};

export default {
  auth: authAPI,
  user: userAPI,
  post: postAPI,
  class: classAPI,
  tutor: tutorAPI,
  ai: aiAPI,
  payment: paymentAPI,
  dashboard: dashboardAPI,
};
