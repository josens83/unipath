# UniPath - 대학입시 올인원 온라인 컨설팅 플랫폼

> AI 기반 맞춤형 입시 컨설팅과 온라인 수업을 제공하는 종합 교육 플랫폼

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/import/project?template=https://github.com/YOUR_USERNAME/unipath)

## 🚀 빠른 시작 (Vercel 배포)

```bash
# 1. 저장소 클론
git clone https://github.com/YOUR_USERNAME/unipath.git
cd unipath

# 2. 의존성 설치
npm install

# 3. 환경 변수 설정
cp .env.example .env.local
# VITE_TOSS_CLIENT_KEY에 TossPayments 키 입력

# 4. 개발 서버 실행
npm run dev

# 5. Vercel 배포 (프로덕션)
npm install -g vercel
vercel --prod
```

**상세 가이드**: [배포 문서](./docs/DEPLOYMENT.md) | [런칭 체크리스트](./docs/LAUNCH_CHECKLIST.md)

---

## 프로젝트 개요

UniPath는 대학 입시를 준비하는 학생들을 위한 종합 온라인 컨설팅 플랫폼입니다. AI 기반 성적 분석, 맞춤형 학습 계획, 실시간 온라인 수업, 커뮤니티 기능을 통합하여 제공합니다.

### 주요 기능

- **AI 입시 컨설팅**: 성적 기반 대학 합격 가능성 분석 및 맞춤형 학습 계획 제공
- **온라인 화상 수업**: 화상 회의 시스템을 통한 1:1 및 그룹 과외
- **커뮤니티**: 수험생 간 정보 공유 게시판 (자유게시판, 합격수기, Q&A)
- **대시보드**: 역할별 맞춤 대시보드 (학생/학부모/튜터/관리자)
- **결제 시스템**: TossPayments 연동 구독 관리
- **진도 관리**: 학습 진행도 추적 및 성적 분석
- **일정 관리**: 수업 스케줄링 및 알림

## 기술 스택

### Frontend
- **Framework**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS v3
- **State Management**: React Context API
- **Routing**: React Router v6
- **Form Handling**: React Hook Form + Zod
- **Charts**: Chart.js + react-chartjs-2
- **Notifications**: react-hot-toast
- **Icons**: Lucide React

### 결제 및 서비스
- **Payment**: TossPayments SDK
- **PWA**: Service Worker (오프라인 지원)

### 개발 도구
- **Linting**: ESLint
- **TypeScript**: Strict mode with verbatimModuleSyntax

## 프로젝트 구조

```
unipath/
├── public/              # 정적 파일
│   ├── service-worker.js
│   └── manifest.json
├── src/
│   ├── components/      # 재사용 가능한 컴포넌트
│   │   ├── common/      # 공통 UI 컴포넌트
│   │   │   ├── Button.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── Input.tsx
│   │   │   ├── Skeleton.tsx
│   │   │   └── ErrorBoundary.tsx
│   │   └── ...
│   ├── contexts/        # React Context
│   │   └── AuthContext.tsx
│   ├── pages/           # 페이지 컴포넌트
│   │   ├── Landing.tsx
│   │   ├── Login.tsx
│   │   ├── Register.tsx
│   │   ├── StudentDashboard.tsx
│   │   ├── ParentDashboard.tsx
│   │   ├── TutorDashboard.tsx
│   │   ├── AdminDashboard.tsx
│   │   ├── Community.tsx
│   │   ├── AIConsulting.tsx
│   │   ├── PaymentSuccess.tsx
│   │   └── PaymentFail.tsx
│   ├── services/        # API 및 서비스
│   │   ├── api.ts       # Mock API (LocalStorage 기반)
│   │   └── payment.ts   # 결제 서비스
│   ├── types/           # TypeScript 타입 정의
│   │   └── index.ts
│   ├── utils/           # 유틸리티 함수
│   │   └── validation.ts # Zod 스키마
│   ├── App.tsx          # 메인 앱 컴포넌트
│   └── main.tsx         # 엔트리 포인트
├── tailwind.config.js
├── tsconfig.json
├── vite.config.ts
└── package.json
```

## 설치 및 실행

### 1. 필수 요구사항

- Node.js 18+
- npm 또는 yarn

### 2. 설치

```bash
# 저장소 클론
git clone <repository-url>
cd unipath

# 의존성 설치
npm install
```

### 3. 개발 서버 실행

```bash
npm run dev
```

브라우저에서 `http://localhost:5173` 접속

### 4. 프로덕션 빌드

```bash
npm run build
```

빌드된 파일은 `dist/` 디렉토리에 생성됩니다.

### 5. 프리뷰

```bash
npm run preview
```

## 테스트 계정

개발 환경에서 아래 테스트 계정을 사용할 수 있습니다 (비밀번호는 모두 6자 이상):

| 역할 | 이메일 | 비밀번호 | 설명 |
|------|--------|----------|------|
| 학생 | student@test.com | password | 학생 대시보드 접근 |
| 학부모 | parent@test.com | password | 학부모 대시보드 접근 |
| 튜터 | tutor@test.com | password | 튜터 대시보드 접근 |
| 관리자 | admin@unipath.kr | password | 관리자 대시보드 접근 |

**참고**: Mock API는 LocalStorage를 사용하므로 데이터는 브라우저에 저장됩니다.

## 주요 페이지 및 라우트

### 공개 페이지
- `/` - 랜딩 페이지
- `/auth/login` - 로그인
- `/auth/register` - 회원가입
- `/pricing` - 요금제

### 인증 필요 페이지
- `/dashboard` - 역할별 대시보드
- `/tutoring` - 수업 관리
- `/consulting` - AI 입시 컨설팅
- `/community` - 커뮤니티 게시판
- `/profile` - 프로필 관리
- `/payment/success` - 결제 성공
- `/payment/fail` - 결제 실패

## Mock API 사용법

프로젝트는 LocalStorage 기반 Mock API를 사용합니다. 실제 백엔드 서버 없이 모든 기능을 테스트할 수 있습니다.

### API 모듈

```typescript
import {
  authAPI,      // 인증 관련
  userAPI,      // 사용자 관리
  postAPI,      // 게시글 CRUD
  classAPI,     // 수업 관리
  tutorAPI,     // 튜터 정보
  aiAPI,        // AI 분석
  paymentAPI,   // 결제 및 구독
  dashboardAPI  // 통계
} from './services/api';
```

### 예시: 게시글 작성

```typescript
const newPost = await postAPI.createPost({
  authorId: user.id,
  authorName: user.name,
  title: '게시글 제목',
  content: '게시글 내용',
  category: 'free',
  tags: ['입시', '질문'],
});
```

### 데이터 초기화

LocalStorage 데이터를 초기화하려면:

```javascript
localStorage.clear();
window.location.reload();
```

## 결제 시스템

### TossPayments 연동

프로젝트는 TossPayments SDK를 사용하여 결제를 처리합니다.

**테스트 모드**: 현재 테스트 클라이언트 키를 사용 중입니다.

```typescript
// src/services/payment.ts
const CLIENT_KEY = 'test_ck_D5GePWvyJnrK0W0k6q8gLzN97Eoq';
```

### 요금제

| 플랜 | 가격 | 기능 |
|------|------|------|
| Free | 무료 | 기본 진도 추적, 성적 관리 |
| Basic | 49,000원/월 | AI 추천, 기본 분석, 월 4회 수업 |
| Premium | 99,000원/월 | 전체 기능, 무제한 수업, 화상 수업, 우선 지원 |

### 결제 플로우

1. 사용자가 요금제 선택
2. `paymentService.requestPayment()` 호출
3. TossPayments 결제창 리다이렉트
4. 결제 완료 후 `/payment/success` 콜백
5. `paymentService.confirmPayment()` 서버 승인
6. 구독 정보 LocalStorage 저장

## 폼 검증

프로젝트는 Zod + React Hook Form을 사용합니다.

### 검증 스키마 예시

```typescript
// src/utils/validation.ts
export const loginSchema = z.object({
  email: z.string().email('올바른 이메일을 입력하세요'),
  password: z.string().min(6, '비밀번호는 최소 6자 이상이어야 합니다'),
});
```

### 사용 예시

```typescript
const { register, handleSubmit, formState: { errors } } = useForm({
  resolver: zodResolver(loginSchema),
});

const onSubmit = async (data: LoginFormData) => {
  await login(data.email, data.password);
};
```

## 컴포넌트 라이브러리

### 공통 컴포넌트

#### Button
```tsx
<Button variant="primary" size="lg" fullWidth>
  클릭
</Button>
```

**Props**: `variant`, `size`, `fullWidth`, `disabled`, `loading`

#### Card
```tsx
<Card>
  <h2>제목</h2>
  <p>내용</p>
</Card>
```

#### Skeleton
```tsx
<Skeleton />              // 단일 스켈레톤
<CardSkeleton />          // 카드 형태
<DashboardSkeleton />     // 대시보드 전체
<ListSkeleton items={5} /> // 리스트 (5개)
```

## 빌드 최적화

### 코드 스플리팅

모든 라우트는 React.lazy()를 사용하여 lazy loading됩니다:

```typescript
const StudentDashboard = lazy(() =>
  import('./pages/StudentDashboard').then(m => ({ default: m.StudentDashboard }))
);
```

**결과**: 31개 청크로 분리, 메인 번들 ~114KB (gzipped)

### 번들 분석

```bash
npm run build
```

출력 예시:
```
dist/assets/StudentDashboard-a1b2c3d4.js    12.34 KB │ gzip:  4.56 KB
dist/assets/Community-e5f6g7h8.js            8.91 KB │ gzip:  3.12 KB
dist/assets/AIConsulting-i9j0k1l2.js         8.57 KB │ gzip:  2.75 KB
...
```

## PWA 기능

### Service Worker

오프라인 캐싱을 지원합니다:

```javascript
// public/service-worker.js
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
```

### 설치 가능

사용자는 홈 화면에 앱을 추가할 수 있습니다 (manifest.json 설정됨).

## 에러 처리

### ErrorBoundary

모든 라우트는 ErrorBoundary로 감싸져 있습니다:

```tsx
<ErrorBoundary>
  <Suspense fallback={<PageLoader />}>
    <Routes>
      {/* ... */}
    </Routes>
  </Suspense>
</ErrorBoundary>
```

### Toast 알림

```typescript
import toast from 'react-hot-toast';

toast.success('성공 메시지');
toast.error('에러 메시지');
toast('정보 메시지', { icon: 'ℹ️' });
```

## 유틸리티 함수

### 날짜/시간 처리

```typescript
import { formatDate, formatDateTime, formatRelativeTime, getDDay } from '@/utils/helpers';

formatDate(new Date())              // "2024년 1월 15일"
formatDateTime(new Date())          // "2024년 1월 15일 오후 3:30"
formatRelativeTime(new Date())      // "5분 전", "2시간 전"
getDDay('2024-12-31')              // "D-30"
```

### 통화/숫자 포맷팅

```typescript
import { formatCurrency, formatCompactNumber } from '@/utils/helpers';

formatCurrency(1000000)     // "₩1,000,000"
formatCompactNumber(1500)   // "1.5K"
```

### 문자열 처리

```typescript
import { truncate, maskEmail, formatPhoneNumber } from '@/utils/helpers';

truncate("긴 텍스트입니다", 5)              // "긴 텍스..."
maskEmail("user@example.com")              // "u***@example.com"
formatPhoneNumber("01012345678")           // "010-1234-5678"
```

### 성능 최적화

```typescript
import { debounce, throttle } from '@/utils/helpers';

const debouncedSearch = debounce((query) => {
  // 검색 로직
}, 300);

const throttledScroll = throttle(() => {
  // 스크롤 로직
}, 100);
```

### LocalStorage 헬퍼

```typescript
import { storage } from '@/utils/helpers';

storage.set('key', { data: 'value' });
const data = storage.get('key', defaultValue);
storage.remove('key');
storage.clear();
```

## 로깅 및 모니터링

### 에러 로깅

```typescript
import { logger } from '@/utils/logger';

// 로그 레벨
logger.debug('디버그 메시지', { data });
logger.info('정보 메시지', { data });
logger.warn('경고 메시지', { data });
logger.error('에러 메시지', error, { data });

// 전문 로깅
logger.logApiRequest('GET', '/api/users');
logger.logApiResponse('GET', '/api/users', 200, data);
logger.logApiError('GET', '/api/users', error);
logger.logUserAction('button_click', { buttonId: 'submit' });
logger.logPageView('/dashboard');
logger.logPerformance('API Call', 150, 'ms');
```

### 성능 측정

```typescript
import { startTimer, measureExecutionTime } from '@/utils/performance';

// 타이머 사용
const timer = startTimer('Data Processing');
// ... 처리 로직
timer.end();  // 자동으로 로깅

// 함수 래핑
const optimizedFunction = measureExecutionTime(myFunction, 'MyFunction');
```

### Web Vitals

애플리케이션 시작 시 자동으로 측정됩니다:
- **LCP** (Largest Contentful Paint) - 최대 콘텐츠 렌더링 시간
- **FID** (First Input Delay) - 최초 입력 지연
- **CLS** (Cumulative Layout Shift) - 누적 레이아웃 이동
- **TTFB** (Time to First Byte) - 첫 바이트 수신 시간

성능 등급: good / needs-improvement / poor

## 개발 가이드

### 새 페이지 추가

1. `src/pages/NewPage.tsx` 생성
2. `src/App.tsx`에 라우트 추가:
   ```tsx
   const NewPage = lazy(() => import('./pages/NewPage').then(m => ({ default: m.NewPage })));

   // Routes에 추가
   <Route path="/new-page" element={<NewPage />} />
   ```

### 새 API 엔드포인트 추가

`src/services/api.ts`에 추가:

```typescript
export const newAPI = {
  getData: async (): Promise<DataType[]> => {
    await delay();
    const data = getStorage<DataType[]>(STORAGE_KEYS.NEW_DATA, []);
    return data;
  },

  createData: async (input: CreateDataInput): Promise<DataType> => {
    await delay();
    const data = getStorage<DataType[]>(STORAGE_KEYS.NEW_DATA, []);
    const newData: DataType = { id: uuidv4(), ...input };
    data.push(newData);
    setStorage(STORAGE_KEYS.NEW_DATA, data);
    return newData;
  },
};
```

### TypeScript 타입 추가

`src/types/index.ts`에 추가:

```typescript
export interface NewType {
  id: string;
  name: string;
  createdAt: string;
}
```

## 배포

### Vercel 배포 (권장)

1. GitHub에 푸시
2. Vercel 프로젝트 생성
3. 빌드 설정:
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`

### 환경 변수

프로덕션 환경에서는 다음 환경 변수를 설정하세요:

```bash
VITE_TOSS_CLIENT_KEY=your_production_client_key
VITE_API_URL=your_backend_api_url  # Mock API 대체 시
```

## 개발 로드맵

### ✅ Phase 1-2: 기본 구조 및 UX 고도화 (완료)
- 랜딩/인증/대시보드 기본 구조
- Toast/Skeleton/ErrorBoundary/PWA
- 관리자 대시보드

### ✅ Phase 3: API 레이어 및 결제 통합 (완료)
- LocalStorage 기반 Mock API 완전 구현
- TossPayments 결제 연동
- React Hook Form + Zod 검증
- 반응형 네비게이션

### ✅ Phase 4: 실제 데이터 연동 및 커뮤니티 (완료)
- StudentDashboard API 통합
- Community 게시판 완전 구현 (CRUD)
- 검색/필터링/카테고리 기능

### ✅ Phase 5: AI 컨설팅 고도화 (완료)
- AI 분석 시스템 완전 구현
- 대학 추천 알고리즘
- 맞춤형 학습 계획
- 약점 과목 분석

### ✅ Phase 6: 종합 문서화 (완료)
- README 문서 작성 (설치/사용법/배포 가이드)
- 개발 가이드 및 API 문서
- 프로젝트 통계 정리

### ✅ Phase 7: 부모/튜터 대시보드 API 연동 (완료)
- ParentDashboard API 통합 및 로딩 상태
- TutorDashboard API 통합 및 로딩 상태
- 4개 역할 모든 대시보드 완전 연동
- 빈 상태 UI 추가

### ✅ Phase 8: 프로덕션 배포 준비 (완료)
- .env.example 환경 변수 템플릿
- vercel.json 배포 설정
- .gitignore 보안 설정
- SPA 라우팅 및 캐싱 최적화

### ✅ Phase 9: CI/CD 및 성능 최적화 (완료)
- GitHub Actions CI/CD 파이프라인
- SEO 최적화 (robots.txt, meta 태그)
- Vite 청크 분할 최적화 (vendor 번들 분리)
- 메인 번들 33% 감소 (359KB → 238KB)

### ✅ Phase 10: 관찰성(Observability) 시스템 (완료)
- 유틸리티 함수 라이브러리 (70+ 함수)
- 에러 로깅 시스템 (logger.ts)
- 성능 모니터링 (Web Vitals: LCP, FID, CLS, TTFB)
- 전역 에러 핸들러 및 사용자 추적

### 📋 향후 개선 사항
- 실제 백엔드 API 연동 (Node.js/Express 또는 Supabase)
- WebRTC 기반 실시간 화상 수업 구현
- 실시간 채팅 기능 (Socket.io)
- 파일 업로드 (프로필 사진, 과제 제출)
- AI 챗봇 통합 (OpenAI API)
- 모바일 앱 (React Native)
- E2E 테스트 추가 (Playwright/Cypress)
- 단위 테스트 (Vitest)
- 접근성 개선 (WCAG 2.1 AA)
- 다크모드 지원

## 프로젝트 통계

- **총 60+ 파일** 생성
- **15,000+ 줄** 코드 작성
- **14개 주요 페이지** 구현
- **4개 역할** 지원 (학생/학부모/튜터/관리자)
- **33개 청크** 코드 스플리팅
- **8개 API 모듈** 구현
- **70+ 유틸리티 함수** 제공
- **Web Vitals 4개** 측정 (LCP, FID, CLS, TTFB)
- **메인 번들** 76.29 KB (gzipped)

## 라이선스

This project is private and proprietary.

## 기여

현재 비공개 프로젝트입니다.

---

**Built with ❤️ using React + TypeScript + Vite**
