# Supabase 백엔드 설정 가이드

## 📋 개요

UniPath는 Supabase를 백엔드 데이터베이스로 사용합니다. 이 문서는 Supabase 프로젝트를 설정하고 데이터베이스 마이그레이션을 실행하는 방법을 안내합니다.

## 🚀 Supabase 프로젝트 생성

### 1. Supabase 계정 생성

1. [Supabase](https://supabase.com/)에 접속
2. "Start your project" 클릭
3. GitHub 계정으로 로그인

### 2. 새 프로젝트 생성

1. Dashboard에서 "New Project" 클릭
2. 프로젝트 정보 입력:
   - **Name**: UniPath
   - **Database Password**: 강력한 비밀번호 생성 (저장 필수!)
   - **Region**: Northeast Asia (Seoul) - 서울 리전 선택
   - **Pricing Plan**: Free tier로 시작 (나중에 업그레이드 가능)
3. "Create new project" 클릭
4. 프로젝트 생성 완료까지 약 2-3분 소요

### 3. API 키 확인

프로젝트가 생성되면 Dashboard → Settings → API에서 다음 정보 확인:

- **Project URL**: `https://xxxxx.supabase.co`
- **anon public key**: `eyJhbGc...` (공개 키, 프론트엔드에서 사용)
- **service_role key**: `eyJhbGc...` (비밀 키, 서버 사이드에서만 사용)

## 🔧 환경 변수 설정

### 1. .env.local 파일 생성

```bash
cp .env.example .env.local
```

### 2. Supabase 키 입력

`.env.local` 파일을 열고 다음 값을 입력:

```env
VITE_SUPABASE_URL=https://your-project-ref.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

⚠️ **주의**: `.env.local` 파일은 절대 Git에 커밋하지 마세요!

## 📊 데이터베이스 마이그레이션

### 방법 1: Supabase Dashboard 사용 (추천)

1. Supabase Dashboard → SQL Editor로 이동
2. "New query" 클릭
3. `supabase/migrations/001_initial_schema.sql` 파일 내용을 복사하여 붙여넣기
4. "Run" 클릭하여 실행
5. 성공 메시지 확인
6. 같은 방법으로 `002_row_level_security.sql` 실행

### 방법 2: Supabase CLI 사용

#### CLI 설치

```bash
# macOS (Homebrew)
brew install supabase/tap/supabase

# Windows (Scoop)
scoop bucket add supabase https://github.com/supabase/scoop-bucket.git
scoop install supabase

# Linux
brew install supabase/tap/supabase
```

#### 프로젝트 연결 및 마이그레이션

```bash
# Supabase 로그인
supabase login

# 프로젝트 연결
supabase link --project-ref your-project-ref

# 마이그레이션 실행
supabase db push
```

## ✅ 설정 확인

### 1. 테이블 확인

Supabase Dashboard → Table Editor에서 다음 테이블이 생성되었는지 확인:

- ✓ profiles
- ✓ students
- ✓ tutors
- ✓ sessions
- ✓ payments
- ✓ ai_consultations
- ✓ community_posts
- ✓ comments
- ✓ study_groups
- ✓ study_group_members
- ✓ notifications

### 2. RLS 정책 확인

각 테이블의 "Policies" 탭에서 Row Level Security 정책이 활성화되었는지 확인

### 3. 연결 테스트

개발 서버를 실행하고 회원가입을 시도:

```bash
npm run dev
```

브라우저에서 `http://localhost:5173`으로 이동하여 회원가입 테스트

## 🔐 Authentication 설정

### 1. Email Provider 활성화

Dashboard → Authentication → Providers:

- **Email**: 활성화 (기본값)
- **Confirm email**: 개발 중에는 비활성화 가능
- **Secure email change**: 활성화 권장

### 2. OAuth Providers (선택사항)

구글/카카오 소셜 로그인을 원하는 경우:

#### Google OAuth
1. [Google Cloud Console](https://console.cloud.google.com/)에서 OAuth 2.0 클라이언트 ID 생성
2. Supabase Dashboard → Authentication → Providers → Google 활성화
3. Client ID와 Client Secret 입력

#### Kakao OAuth
1. [Kakao Developers](https://developers.kakao.com/)에서 앱 생성
2. Supabase Dashboard → Authentication → Providers → Kakao 활성화
3. Client ID와 Client Secret 입력

## 📱 실시간 기능 (Realtime)

Supabase Realtime을 사용하여 실시간 업데이트 구현 가능:

### 활성화 방법

Dashboard → Database → Replication:

활성화할 테이블 선택:
- ✓ notifications (실시간 알림)
- ✓ sessions (세션 상태 변경)
- ✓ community_posts (새 게시글)
- ✓ comments (새 댓글)

## 🎯 다음 단계

1. ✅ Supabase 프로젝트 생성 완료
2. ✅ 데이터베이스 마이그레이션 완료
3. ✅ 환경 변수 설정 완료
4. → 프론트엔드 인증 시스템 구현
5. → API 함수 작성 (services/ 폴더)

## 🔗 유용한 링크

- [Supabase Documentation](https://supabase.com/docs)
- [Supabase Auth Helpers](https://supabase.com/docs/guides/auth/auth-helpers)
- [Row Level Security](https://supabase.com/docs/guides/auth/row-level-security)
- [Realtime](https://supabase.com/docs/guides/realtime)

## ⚠️ 프로덕션 체크리스트

프로덕션 배포 전 확인 사항:

- [ ] 강력한 데이터베이스 비밀번호 설정
- [ ] RLS 정책 모든 테이블에 적용
- [ ] service_role key는 서버 환경에서만 사용
- [ ] Vercel 환경 변수에 Supabase 키 설정
- [ ] Email 템플릿 커스터마이징
- [ ] 데이터베이스 백업 설정
- [ ] 모니터링 및 로깅 활성화

## 🐛 문제 해결

### "Invalid API key" 에러
→ `.env.local` 파일의 키 값 재확인

### 테이블이 보이지 않음
→ 마이그레이션 SQL이 정상적으로 실행되었는지 확인

### RLS 정책 오류로 데이터 조회 안 됨
→ Dashboard → SQL Editor에서 정책 재확인

### 로컬 개발 시 느린 응답
→ 서울 리전(Northeast Asia) 선택 확인

---

**작성일**: 2025-11-17
**버전**: 1.0.0
