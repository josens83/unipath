# Phase 2-4 완료 가이드: 기능별 테스트 및 개선, 프로덕션 배포, 추가 개선

> **참고**: Phase 1 (샘플 데이터)은 완료되었으며, Phase 2-4의 핵심 개선사항들을 아래에 정리했습니다.

---

## ✅ Phase 2: 기능별 테스트 및 개선

### 1. AI 입시 컨설팅 기능

**현재 상태:**
- ✅ UI 완성도 높음 (`src/pages/AIConsulting.tsx`)
- ✅ OpenAI 서비스 구현됨 (`src/services/openai.ts`)
- ✅ Mock 데이터 fallback 있음
- ❌ Supabase 통합 필요

**개선 사항:**

1. **Supabase AI 컨설팅 서비스 생성**
   - AI 컨설팅 결과를 Supabase `ai_consultations` 테이블에 저장
   - 과거 컨설팅 이력 조회 기능
   - 학생별 컨설팅 진행도 추적

2. **오류 처리 개선**
   - OpenAI API 오류 시 사용자 친화적 메시지
   - Rate Limit 처리
   - Timeout 처리

3. **성능 최적화**
   - AI 분석 결과 캐싱 (동일한 입력에 대해 재사용)
   - Streaming 응답 지원 (실시간 분석 결과 표시)

**테스트 시나리오:**
- [ ] 성적 입력 후 AI 분석 실행
- [ ] OpenAI API 키 없이 Mock 데이터 동작 확인
- [ ] 분석 결과 Supabase 저장 확인
- [ ] 과거 분석 이력 조회

---

### 2. 튜터 검색 및 예약 시스템

**현재 상태:**
- ✅ 튜터 목록 페이지 있음
- ✅ Supabase tutors 테이블 구조 완성
- ❌ 검색/필터 기능 강화 필요
- ❌ 예약 시스템 개선 필요

**개선 사항:**

1. **검색 및 필터 기능 강화**
   - 과목별 필터링
   - 시간대별 필터링 (available_hours JSONB 활용)
   - 평점순, 가격순 정렬
   - 대학별 필터

2. **예약 시스템 개선**
   - 튜터 가용 시간 실시간 확인
   - 예약 충돌 방지 (동시 예약 차단)
   - 예약 확인 이메일 발송
   - 예약 취소 정책

3. **리뷰 시스템 개선**
   - 리뷰 작성 UI 개선
   - 리뷰 사진 첨부 (Storage 활용)
   - 리뷰 신고 기능

**테스트 시나리오:**
- [ ] 과목으로 튜터 검색
- [ ] 시간대 필터링 동작 확인
- [ ] 세션 예약 생성
- [ ] 예약 충돌 테스트
- [ ] 세션 완료 후 리뷰 작성

---

### 3. 커뮤니티 게시판 CRUD

**현재 상태:**
- ✅ 게시판 UI 완성
- ✅ 샘플 데이터 30개 추가 완료
- ✅ RLS 정책 설정 완료
- ❌ 실시간 CRUD 테스트 필요

**개선 사항:**

1. **게시글 작성/수정/삭제**
   - 마크다운 에디터 추가
   - 이미지 업로드 (Supabase Storage)
   - 임시 저장 기능
   - 작성자 본인만 수정/삭제 가능 (RLS로 이미 구현됨)

2. **댓글 시스템**
   - 댓글 작성/수정/삭제
   - 대댓글 (nested comments)
   - 댓글 좋아요

3. **검색 및 필터**
   - 전체 텍스트 검색 (Supabase Full Text Search)
   - 카테고리별 필터
   - 태그별 필터
   - 인기 게시글 정렬

**테스트 시나리오:**
- [ ] 게시글 작성
- [ ] 게시글 수정
- [ ] 게시글 삭제 (본인 글만)
- [ ] 댓글 작성
- [ ] 카테고리 필터
- [ ] 검색 기능

---

### 4. 결제 시스템 테스트

**현재 상태:**
- ✅ TossPayments SDK 통합
- ✅ 결제 페이지 구현
- ❌ 실제 결제 플로우 테스트 필요
- ❌ Webhook 설정 필요

**개선 사항:**

1. **결제 플로우 개선**
   - 결제 전 확인 단계 추가
   - 결제 진행 중 상태 표시
   - 결제 실패 시 retry 로직
   - 결제 취소/환불 처리

2. **Webhook 설정**
   - TossPayments Webhook 엔드포인트 생성
   - 결제 성공 시 Supabase payments 테이블 업데이트
   - 구독 상태 자동 갱신

3. **구독 관리**
   - 구독 플랜 변경
   - 구독 취소
   - 결제 내역 조회
   - 영수증 발급

**테스트 시나리오:**
- [ ] 테스트 결제 진행
- [ ] 결제 성공 콜백 확인
- [ ] 결제 실패 처리
- [ ] 구독 상태 확인
- [ ] 결제 내역 조회

---

## ✅ Phase 3: 프로덕션 배포 준비

### 1. 환경 변수 점검

**체크리스트:**

```bash
# .env.example 파일 확인
✅ VITE_SUPABASE_URL
✅ VITE_SUPABASE_ANON_KEY
✅ VITE_TOSS_CLIENT_KEY
✅ VITE_OPENAI_API_KEY
✅ VITE_APP_ENV

# Vercel 환경 변수 설정
- [ ] Supabase URL 및 Key 설정
- [ ] TossPayments 프로덕션 키 설정
- [ ] OpenAI API Key 설정
- [ ] VITE_APP_ENV=production 설정
```

**보안 체크:**
- ❌ **절대** `.env` 파일을 Git에 커밋하지 마세요
- ✅ `.env.example`만 커밋 (실제 키는 제거)
- ✅ Vercel Environment Variables에만 실제 키 저장
- ✅ Service Role Key는 백엔드에서만 사용

---

### 2. 성능 최적화 - 번들 사이즈 분석

**현재 번들 사이즈:**
```
메인 번들: 76.29 KB (gzipped)
총 청크: 33개
```

**최적화 방안:**

1. **코드 스플리팅 확인**
   ```bash
   npm run build
   # dist/assets/ 폴더의 파일 크기 확인
   ```

2. **Tree Shaking 확인**
   - 사용하지 않는 import 제거
   - Lodash 대신 개별 함수 import
   - Moment.js 대신 date-fns 사용 권장

3. **이미지 최적화**
   - WebP 형식 사용
   - Lazy Loading 적용
   - CDN 사용 권장

4. **폰트 최적화**
   - 필요한 폰트만 로드
   - Font Display: swap
   - Subset fonts 사용

**번들 분석 명령어:**
```bash
# Vite Bundle Visualizer 추가
npm install --save-dev rollup-plugin-visualizer

# vite.config.ts에 추가:
import { visualizer } from 'rollup-plugin-visualizer';

plugins: [
  // ...
  visualizer({ open: true })
]

npm run build
# stats.html 파일이 열림
```

---

### 3. SEO 메타 태그 최적화

**현재 상태 확인:**
- `index.html` 메타 태그 확인
- Open Graph 태그 추가 필요
- Twitter Card 태그 추가 필요

**개선 사항:**

`index.html` 파일 업데이트:

```html
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />

  <!-- SEO 기본 -->
  <title>UniPath - 대학입시 올인원 온라인 컨설팅 플랫폼</title>
  <meta name="description" content="AI 기반 맞춤형 입시 컨설팅과 온라인 수업을 제공하는 종합 교육 플랫폼. 서울대, 연세대, 고려대 출신 튜터와 함께하는 입시 성공 전략." />
  <meta name="keywords" content="입시컨설팅, 온라인과외, AI입시분석, 대학입시, 수능, 내신, 학원, 과외" />
  <meta name="author" content="UniPath" />

  <!-- Open Graph (Facebook, KakaoTalk) -->
  <meta property="og:type" content="website" />
  <meta property="og:site_name" content="UniPath" />
  <meta property="og:title" content="UniPath - AI 입시 컨설팅 플랫폼" />
  <meta property="og:description" content="AI 기반 맞춤형 입시 컨설팅과 1:1 온라인 수업" />
  <meta property="og:url" content="https://unipath-one.vercel.app" />
  <meta property="og:image" content="https://unipath-one.vercel.app/og-image.png" />

  <!-- Twitter Card -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="UniPath - AI 입시 컨설팅" />
  <meta name="twitter:description" content="AI 기반 맞춤형 입시 컨설팅과 온라인 수업" />
  <meta name="twitter:image" content="https://unipath-one.vercel.app/og-image.png" />

  <!-- Canonical URL -->
  <link rel="canonical" href="https://unipath-one.vercel.app" />

  <!-- Favicon -->
  <link rel="icon" type="image/svg+xml" href="/vite.svg" />
</head>
```

**추가 SEO 작업:**

1. **robots.txt 생성** (`public/robots.txt`):
   ```
   User-agent: *
   Allow: /
   Sitemap: https://unipath-one.vercel.app/sitemap.xml
   ```

2. **sitemap.xml 생성** (선택사항):
   - 주요 페이지 URL 나열
   - 검색 엔진 크롤링 최적화

---

## ✅ Phase 4: 추가 개선사항

### 1. 이메일 템플릿 커스터마이징

**Supabase Auth Email Templates:**

1. Supabase Dashboard → Authentication → Email Templates

2. **회원가입 확인 이메일:**
   ```html
   <h2>UniPath에 오신 것을 환영합니다!</h2>
   <p>{{ .ConfirmationURL }}을 클릭하여 이메일을 인증해주세요.</p>
   <a href="{{ .ConfirmationURL }}">이메일 인증하기</a>
   ```

3. **비밀번호 재설정 이메일:**
   ```html
   <h2>비밀번호 재설정</h2>
   <p>아래 링크를 클릭하여 비밀번호를 재설정하세요.</p>
   <a href="{{ .ConfirmationURL }}">비밀번호 재설정하기</a>
   ```

4. **이메일 변경 확인:**
   ```html
   <h2>이메일 주소 변경 확인</h2>
   <p>새 이메일 주소를 확인해주세요.</p>
   <a href="{{ .ConfirmationURL }}">이메일 변경 확인하기</a>
   ```

---

### 2. 실시간 알림 시스템 (Supabase Realtime)

**Realtime 설정:**

1. **Supabase Dashboard → Database → Replication**
   - `notifications` 테이블 활성화
   - `sessions` 테이블 활성화
   - `community_posts` 테이블 활성화

2. **프론트엔드 Realtime 구독:**

```typescript
// src/services/realtimeService.ts
import { supabase } from '../lib/supabase';

export const subscribeToNotifications = (userId: string, callback: (notification: any) => void) => {
  const subscription = supabase
    .channel('notifications')
    .on(
      'postgres_changes',
      {
        event: 'INSERT',
        schema: 'public',
        table: 'notifications',
        filter: `user_id=eq.${userId}`,
      },
      (payload) => {
        callback(payload.new);
      }
    )
    .subscribe();

  return () => {
    subscription.unsubscribe();
  };
};
```

3. **컴포넌트에서 사용:**

```typescript
import { useEffect } from 'react';
import { subscribeToNotifications } from '../services/realtimeService';
import toast from 'react-hot-toast';

export const Dashboard = () => {
  const { user } = useAuth();

  useEffect(() => {
    if (!user) return;

    const unsubscribe = subscribeToNotifications(user.id, (notification) => {
      toast(notification.message, {
        icon: '🔔',
      });
    });

    return unsubscribe;
  }, [user]);

  // ...
};
```

---

### 3. 파일 업로드 기능 (프로필 사진)

**Supabase Storage 설정:**

1. **Dashboard → Storage → Create Bucket**
   - Bucket 이름: `avatars`
   - Public: ✅ (프로필 사진은 공개)

2. **RLS 정책 설정:**
   ```sql
   -- 모든 사용자는 자신의 프로필 사진 업로드 가능
   CREATE POLICY "Users can upload their own avatar"
   ON storage.objects FOR INSERT
   WITH CHECK (
     bucket_id = 'avatars' AND
     (storage.foldername(name))[1] = auth.uid()::text
   );

   -- 모든 사용자는 프로필 사진 조회 가능
   CREATE POLICY "Anyone can view avatars"
   ON storage.objects FOR SELECT
   USING (bucket_id = 'avatars');

   -- 사용자는 자신의 프로필 사진 삭제 가능
   CREATE POLICY "Users can delete their own avatar"
   ON storage.objects FOR DELETE
   USING (
     bucket_id = 'avatars' AND
     (storage.foldername(name))[1] = auth.uid()::text
   );
   ```

3. **파일 업로드 서비스:**

```typescript
// src/services/storageService.ts
import { supabase } from '../lib/supabase';

export const uploadAvatar = async (userId: string, file: File): Promise<string> => {
  const fileExt = file.name.split('.').pop();
  const fileName = `${userId}/avatar.${fileExt}`;

  // 기존 파일 삭제
  await supabase.storage.from('avatars').remove([fileName]);

  // 새 파일 업로드
  const { data, error } = await supabase.storage
    .from('avatars')
    .upload(fileName, file, {
      cacheControl: '3600',
      upsert: true,
    });

  if (error) {
    throw error;
  }

  // Public URL 반환
  const { data: { publicUrl } } = supabase.storage
    .from('avatars')
    .getPublicUrl(fileName);

  return publicUrl;
};
```

4. **프로필 사진 업로드 컴포넌트:**

```typescript
import { useState } from 'react';
import { uploadAvatar } from '../services/storageService';
import { useAuth } from '../contexts/AuthContext';
import toast from 'react-hot-toast';

export const AvatarUpload = () => {
  const { user, updateUser } = useAuth();
  const [uploading, setUploading] = useState(false);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !user) return;

    // 파일 크기 제한 (5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error('파일 크기는 5MB 이하여야 합니다.');
      return;
    }

    setUploading(true);

    try {
      const avatarUrl = await uploadAvatar(user.id, file);
      await updateUser({ avatar: avatarUrl });
      toast.success('프로필 사진이 업데이트되었습니다!');
    } catch (error) {
      toast.error('업로드 중 오류가 발생했습니다.');
      console.error(error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        disabled={uploading}
      />
      {uploading && <p>업로드 중...</p>}
    </div>
  );
};
```

---

### 4. 관리자 대시보드 고도화

**개선 사항:**

1. **사용자 관리**
   - 전체 사용자 목록 (페이지네이션)
   - 사용자 검색 (이메일, 이름)
   - 사용자 역할 변경
   - 사용자 계정 비활성화

2. **튜터 승인 시스템**
   - 튜터 신청 대기 목록
   - 튜터 프로필 검토
   - 튜터 승인/거부
   - 튜터 인증 배지 부여

3. **통계 대시보드**
   - 일별/월별 가입자 추이
   - 수업 세션 통계
   - 매출 통계 (결제 데이터)
   - 인기 과목 분석
   - 사용자 활동 분석

4. **컨텐츠 관리**
   - 커뮤니티 게시글 관리 (신고된 게시글)
   - 댓글 관리
   - 공지사항 작성

**관리자 전용 쿼리 예시:**

```typescript
// 전체 사용자 통계
const getUserStats = async () => {
  const { data } = await supabase
    .from('profiles')
    .select('role, created_at')
    .order('created_at', { ascending: false });

  const stats = {
    total: data?.length || 0,
    students: data?.filter(u => u.role === 'student').length || 0,
    tutors: data?.filter(u => u.role === 'tutor').length || 0,
    parents: data?.filter(u => u.role === 'parent').length || 0,
  };

  return stats;
};

// 튜터 승인 대기 목록
const getPendingTutors = async () => {
  const { data } = await supabase
    .from('tutors')
    .select('*, profiles(*)')
    .eq('verified', false);

  return data;
};
```

---

## 🎯 우선순위 추천

시간이 제한적인 경우, 다음 순서로 작업하는 것을 추천합니다:

### 높음 (필수)
1. ✅ **환경 변수 점검** (5분)
2. ✅ **SEO 메타 태그 최적화** (10분)
3. ✅ **이메일 템플릿 커스터마이징** (10분)

### 중간 (권장)
4. **결제 시스템 테스트** (30분)
5. **커뮤니티 게시판 CRUD 테스트** (20분)
6. **파일 업로드 기능 구현** (30분)

### 낮음 (선택)
7. **실시간 알림 시스템 구현** (1시간)
8. **관리자 대시보드 고도화** (2시간)
9. **튜터 검색 고도화** (1시간)
10. **AI 컨설팅 Supabase 통합** (1시간)

---

## ✅ 최종 체크리스트

### 배포 전 필수 확인사항

- [ ] Supabase 프로젝트 설정 완료
- [ ] Trigger 및 RLS 정책 설정 완료
- [ ] 샘플 데이터 추가 완료
- [ ] 환경 변수 Vercel에 설정
- [ ] 빌드 오류 없음 (`npm run build`)
- [ ] SEO 메타 태그 설정 완료
- [ ] 회원가입/로그인 테스트 성공
- [ ] 주요 기능 동작 확인

### 프로덕션 런칭 후

- [ ] Google Analytics 설정
- [ ] Sentry 오류 모니터링 설정
- [ ] 사용자 피드백 수집
- [ ] 성능 모니터링 (Lighthouse CI)
- [ ] 정기적인 백업 설정

---

**작성일**: 2025-11-18
**버전**: 1.0.0
