# UniPath 배포 가이드

> Vercel을 사용한 프로덕션 배포 단계별 가이드

## 목차

1. [사전 준비](#사전-준비)
2. [Vercel 배포](#vercel-배포)
3. [환경 변수 설정](#환경-변수-설정)
4. [도메인 연결](#도메인-연결)
5. [배포 확인](#배포-확인)
6. [모니터링 설정](#모니터링-설정)

---

## 사전 준비

### 1. GitHub 저장소 확인

```bash
# 현재 브랜치 확인
git branch

# 최신 커밋 확인
git log --oneline -5

# 리모트 확인
git remote -v
```

### 2. 로컬 빌드 테스트

```bash
# 의존성 설치
npm install

# 프로덕션 빌드
npm run build

# 빌드 결과 확인
npm run preview
```

브라우저에서 `http://localhost:4173` 접속하여 정상 동작 확인

### 3. 환경 변수 준비

프로덕션 환경 변수를 미리 준비하세요:

- **필수**: TossPayments 프로덕션 클라이언트 키
- **선택**: 백엔드 API URL (Mock API 대체 시)
- **선택**: 분석 도구 키 (Google Analytics, Sentry 등)

---

## Vercel 배포

### 방법 1: Vercel 웹사이트 사용 (권장)

#### Step 1: Vercel 계정 생성

1. [vercel.com](https://vercel.com) 접속
2. "Sign Up" 클릭
3. GitHub 계정으로 로그인

#### Step 2: 프로젝트 Import

1. Vercel 대시보드에서 "Add New..." → "Project" 클릭
2. GitHub 저장소 연결
3. `unipath` 저장소 선택
4. Import 클릭

#### Step 3: 프로젝트 설정

**Framework Preset**: Vite 자동 감지됨

**Build Settings**:
- Build Command: `npm run build` (자동 감지됨)
- Output Directory: `dist` (자동 감지됨)
- Install Command: `npm install` (자동 감지됨)

**Root Directory**: `.` (루트)

#### Step 4: 환경 변수 추가

"Environment Variables" 섹션에서:

```
VITE_TOSS_CLIENT_KEY = live_ck_YOUR_PRODUCTION_KEY
```

**중요**: `test_ck_`로 시작하는 테스트 키를 실제 프로덕션 키로 교체하세요!

#### Step 5: 배포 시작

"Deploy" 버튼 클릭

⏱️ 배포 시간: 약 2-3분

---

### 방법 2: Vercel CLI 사용

#### Step 1: Vercel CLI 설치

```bash
npm install -g vercel
```

#### Step 2: 로그인

```bash
vercel login
```

#### Step 3: 프로젝트 초기화

```bash
# 프로젝트 루트에서 실행
vercel

# 질문에 답변:
# Set up and deploy? Yes
# Which scope? (개인 계정 선택)
# Link to existing project? No
# Project name? unipath
# In which directory? ./
# Override settings? No
```

#### Step 4: 환경 변수 추가

```bash
# 프로덕션 환경 변수 추가
vercel env add VITE_TOSS_CLIENT_KEY production

# 값 입력: live_ck_YOUR_PRODUCTION_KEY
```

#### Step 5: 프로덕션 배포

```bash
vercel --prod
```

---

## 환경 변수 설정

### Vercel 대시보드에서 설정

1. 프로젝트 선택
2. "Settings" 탭
3. "Environment Variables" 메뉴
4. 변수 추가:

| Name | Value | Environment |
|------|-------|-------------|
| `VITE_TOSS_CLIENT_KEY` | `live_ck_...` | Production |
| `VITE_API_URL` | `https://api.unipath.kr` | Production (선택) |

### 환경별 변수 설정

- **Production**: 실제 서비스용
- **Preview**: PR 미리보기용
- **Development**: 로컬 개발용

### TossPayments 프로덕션 키 발급

1. [TossPayments 개발자 센터](https://developers.tosspayments.com) 로그인
2. "결제위젯 → 내 결제위젯" 메뉴
3. 프로덕션 클라이언트 키 복사
4. Vercel에 `VITE_TOSS_CLIENT_KEY`로 등록

---

## 도메인 연결

### 기본 도메인

배포 완료 후 자동으로 제공되는 도메인:
```
https://unipath-xxxx.vercel.app
```

### 커스텀 도메인 연결

#### Step 1: 도메인 구매

- [가비아](https://www.gabia.com)
- [Cloudflare](https://www.cloudflare.com)
- [Route53](https://aws.amazon.com/route53)

#### Step 2: Vercel에 도메인 추가

1. 프로젝트 Settings → Domains
2. "Add" 버튼 클릭
3. 도메인 입력 (예: `unipath.kr`)
4. "Add" 클릭

#### Step 3: DNS 설정

Vercel이 제공하는 DNS 레코드를 도메인 제공업체에 추가:

**A 레코드**:
```
Type: A
Name: @
Value: 76.76.21.21
```

**CNAME 레코드** (www):
```
Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

#### Step 4: SSL 인증서

Vercel이 자동으로 Let's Encrypt SSL 인증서를 발급합니다.
⏱️ 발급 시간: 5-10분

---

## 배포 확인

### 1. 기본 동작 확인

✅ 체크리스트:
- [ ] 랜딩 페이지 로딩
- [ ] 로그인/회원가입 동작
- [ ] 대시보드 접근
- [ ] AI 컨설팅 기능
- [ ] 커뮤니티 게시판
- [ ] 결제 페이지 (TossPayments 위젯 로딩)

### 2. 성능 확인

Chrome DevTools → Lighthouse 실행:

**목표 점수**:
- Performance: 90+ ✅
- Accessibility: 90+ ✅
- Best Practices: 90+ ✅
- SEO: 90+ ✅

### 3. Web Vitals 확인

브라우저 콘솔에서 확인:
```javascript
// 개발자 도구 콘솔에서 자동으로 로깅됨
// LCP, FID, CLS, TTFB
```

### 4. 에러 확인

- 브라우저 콘솔 에러 없는지 확인
- 404 에러 없는지 확인
- API 호출 정상 동작 확인

---

## 모니터링 설정

### 1. Vercel Analytics (무료)

Vercel 대시보드에서 자동으로 제공:
- 페이지 뷰
- 트래픽 소스
- 디바이스 정보
- 성능 메트릭

### 2. Google Analytics 추가 (선택)

#### Step 1: GA4 속성 생성

1. [Google Analytics](https://analytics.google.com) 로그인
2. 속성 만들기
3. 측정 ID 복사 (예: `G-XXXXXXXXXX`)

#### Step 2: 코드 추가

`index.html`에 추가:

```html
<head>
  <!-- Google Analytics -->
  <script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-XXXXXXXXXX');
  </script>
</head>
```

### 3. Sentry 에러 추적 (선택)

#### Step 1: Sentry 프로젝트 생성

1. [sentry.io](https://sentry.io) 가입
2. 프로젝트 생성 (React 선택)
3. DSN 복사

#### Step 2: 패키지 설치

```bash
npm install @sentry/react
```

#### Step 3: 초기화

`src/main.tsx`에 추가:

```typescript
import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: "YOUR_SENTRY_DSN",
  environment: import.meta.env.MODE,
  integrations: [
    new Sentry.BrowserTracing(),
    new Sentry.Replay(),
  ],
  tracesSampleRate: 1.0,
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,
});
```

### 4. LogRocket 세션 리플레이 (선택)

사용자 행동 녹화 및 디버깅:

```bash
npm install logrocket
```

---

## 지속적 배포 (Continuous Deployment)

### 자동 배포 설정

Vercel은 GitHub와 자동으로 연동됩니다:

**Production 배포**:
- `main` 브랜치에 push → 자동 배포
- 도메인: `https://unipath.kr`

**Preview 배포**:
- PR 생성 → 자동 미리보기 배포
- 도메인: `https://unipath-git-branch-name.vercel.app`

### GitHub Actions CI

`.github/workflows/ci.yml`이 이미 설정되어 있어, 모든 PR에서 자동으로:
- TypeScript 타입 체크
- 프로덕션 빌드 테스트

---

## 롤백 (Rollback)

### 이전 배포로 되돌리기

1. Vercel 대시보드 → Deployments
2. 되돌릴 배포 선택
3. "..." 메뉴 → "Promote to Production"

⏱️ 롤백 시간: 즉시 (약 10초)

---

## 트러블슈팅

### 빌드 실패

**증상**: 배포 시 빌드 에러

**해결**:
```bash
# 로컬에서 빌드 테스트
npm run build

# 의존성 정리 후 재설치
rm -rf node_modules package-lock.json
npm install
```

### 환경 변수 적용 안됨

**증상**: `VITE_` 변수가 undefined

**해결**:
- Vercel 대시보드에서 환경 변수 확인
- 변수명이 `VITE_`로 시작하는지 확인
- 재배포 (Settings → Deployments → Redeploy)

### 404 에러 (페이지 새로고침 시)

**증상**: `/dashboard` 같은 경로에서 새로고침 시 404

**해결**: `vercel.json`이 이미 설정되어 있음 (확인)
```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

### SSL 인증서 발급 실패

**증상**: HTTPS 접속 불가

**해결**:
- DNS 전파 대기 (최대 24시간)
- Vercel 대시보드에서 "Renew Certificate" 클릭

---

## 다음 단계

배포가 완료되면:

1. ✅ 베타 테스터 모집
2. ✅ 실제 결제 테스트
3. ✅ 성능 모니터링
4. ✅ 사용자 피드백 수집
5. ✅ 실제 백엔드 API 구축
6. ✅ 마케팅 시작

---

**축하합니다! 🎉 UniPath가 이제 실제 서비스로 운영됩니다!**
