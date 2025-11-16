# UniPath - 대학입시 올인원 온라인 컨설팅 플랫폼

UniPath는 고3 수험생과 학부모를 위한 **AI 기반 입시 컨설팅 및 1:1 맞춤 과외 플랫폼**입니다.

## 🌟 주요 기능

### 1. 듀얼 대시보드 시스템
- **학생 대시보드**: 학습 목표, 수업 일정, 성적 추이 그래프, AI 추천 콘텐츠
- **학부모 대시보드**: 자녀 학습 현황, 성적 변화, 튜터 피드백, 결제 관리
- **튜터 대시보드**: 수익 관리, 학생 관리, 일정 관리, 평점 및 리뷰

### 2. 온라인 1:1 과외
- 검증된 우수 튜터 매칭
- 과목별 전문 강사 검색
- 실시간 화상 수업 UI
- 수업 일정 캘린더 관리

### 3. AI 입시 컨설팅
- 성적 기반 합격 가능성 예측
- 맞춤형 대학 추천
- 과목별 학습 계획 제공
- 약점 과목 분석

### 4. 커뮤니티
- 게시판 (공지사항, 자유게시판, 합격수기, Q&A)
- 스터디 그룹 매칭
- 실시간 정보 공유

### 5. 결제 시스템
- 무료 체험 / 베이직 (₩49,000/월) / 프리미엄 (₩149,000/월)
- 안전한 결제 플로우
- 플랜 업그레이드/다운그레이드
- 자동 결제 및 구독 관리

## 🛠 기술 스택

- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS v3
- **Routing**: React Router v6
- **Charts**: Chart.js + react-chartjs-2
- **Icons**: Lucide React
- **State Management**: React Context API
- **PWA**: Service Worker + Manifest

## 📦 설치 및 실행

\`\`\`bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev

# 프로덕션 빌드
npm run build

# 빌드 프리뷰
npm run preview
\`\`\`

## 📱 주요 페이지

- **랜딩 페이지** (`/`) - 서비스 소개, 요금제
- **인증** (`/auth/*`) - 로그인/회원가입
- **대시보드** (`/dashboard`) - 학생/학부모/튜터 대시보드
- **튜터 검색** (`/tutoring`) - 과외 튜터 찾기
- **일정 관리** (`/tutoring/schedule`) - 캘린더
- **화상수업** (`/tutoring/classroom`) - 실시간 수업
- **AI 컨설팅** (`/consulting`) - 입시 분석
- **요금제** (`/pricing`) - 결제 플로우
- **커뮤니티** (`/community`) - 게시판, 스터디 그룹
- **마이페이지** (`/mypage`) - 프로필, 구독 관리

## 🚀 성능 최적화

- **Code Splitting**: React.lazy를 통한 페이지별 분할
- **PWA**: 오프라인 지원, 홈 화면 추가
- **Lazy Loading**: 지연 로딩으로 초기 로드 시간 단축

## 📊 프로젝트 통계

- **총 42개 파일** 생성
- **10,000+ 줄** 코드 작성
- **14개 주요 페이지** 구현
- **3개 역할** 지원 (학생/학부모/튜터)

---

**Made with ❤️ for Korean Students**
