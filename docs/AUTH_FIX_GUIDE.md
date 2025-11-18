# 회원가입 오류 해결 가이드

## 📋 문제 요약

현재 UniPath 회원가입 시 다음 오류들이 발생하고 있습니다:

1. **429 Too Many Requests** - Supabase Rate Limit (즉각적인 문제)
2. **Trigger 미설정** - 자동 프로필 생성 로직 누락 (근본 원인)
3. **RLS 정책 누락** - INSERT 권한 정책 미설정 (보안 문제)

---

## 🎯 즉시 해결 방법 (추천)

### ⏰ 429 오류가 있는 경우

Rate Limit은 **1-2시간 후 자동 해제**됩니다. 하지만 기다리지 않고 바로 테스트하려면 아래 방법을 사용하세요.

---

## 🔧 Step 1: Trigger 및 RLS 정책 수정 (필수)

### 1-1. Supabase Dashboard 접속

1. https://supabase.com/dashboard 접속
2. UniPath 프로젝트 클릭
3. 왼쪽 메뉴 → **SQL Editor** 클릭

### 1-2. Trigger 설정 SQL 실행

1. "New query" 버튼 클릭
2. 아래 파일 내용을 복사하여 붙여넣기:
   ```
   supabase/migrations/003_auth_trigger_and_rls_fix.sql
   ```
3. **"Run"** 버튼 클릭
4. 성공 메시지 확인:
   ```
   ✅ Auth Trigger 및 RLS 정책 수정 완료
   ✅ 이제 회원가입 시 자동으로 profiles가 생성됩니다
   ✅ students/tutors 테이블도 정상적으로 INSERT 가능합니다
   ```

### 1-3. 설정 확인

**Trigger 확인:**
1. SQL Editor에서 다음 쿼리 실행:
   ```sql
   SELECT trigger_name, event_manipulation, event_object_table
   FROM information_schema.triggers
   WHERE trigger_name = 'on_auth_user_created';
   ```
2. 결과가 나오면 성공!

**RLS 정책 확인:**
1. Dashboard → Table Editor → profiles 테이블
2. "Policies" 탭 클릭
3. "Enable insert for new users" 정책 확인

---

## 🧪 Step 2: 테스트 계정 생성 (429 오류 우회)

### 방법 A: GUI로 생성 (가장 쉬움)

1. Dashboard → **Authentication** → **Users**
2. 우측 상단 **"Add user"** 버튼 클릭
3. **"Create new user"** 선택
4. 정보 입력:
   - Email: `test@unipath.com`
   - Password: `test1234`
   - **Auto Confirm User**: ✅ 체크 (이메일 인증 생략)
5. **"Create user"** 클릭
6. 생성 완료!

### 방법 B: SQL로 프로필 추가

Trigger가 정상 작동하면 프로필이 자동 생성되지만, 혹시 안 되면:

1. SQL Editor로 이동
2. 사용자 ID 확인:
   ```sql
   SELECT id, email FROM auth.users WHERE email = 'test@unipath.com';
   ```
3. ID를 복사한 후 아래 SQL 실행:
   ```sql
   -- 프로필 추가 (Trigger가 이미 생성했을 수도 있음)
   INSERT INTO profiles (id, email, full_name, role)
   VALUES (
     'YOUR_USER_ID_HERE', -- 위에서 복사한 ID
     'test@unipath.com',
     '테스트 학생',
     'student'
   )
   ON CONFLICT (id) DO NOTHING;

   -- 학생 정보 추가
   INSERT INTO students (user_id, grade, school_name)
   VALUES (
     'YOUR_USER_ID_HERE', -- 같은 ID
     11, -- 고3
     '테스트고등학교'
   )
   ON CONFLICT (user_id) DO NOTHING;
   ```

---

## ✅ Step 3: 로그인 테스트

### 3-1. 브라우저 캐시 완전 삭제

**시크릿 창 사용 (권장):**
- Chrome: `Ctrl + Shift + N` (Windows) / `Cmd + Shift + N` (Mac)
- 또는 일반 창에서 F12 → Application → Clear site data

### 3-2. 로그인 시도

1. https://unipath-one.vercel.app/auth/login 접속
2. 로그인:
   - 이메일: `test@unipath.com`
   - 비밀번호: `test1234`
3. "로그인" 버튼 클릭

### 3-3. 예상 결과

✅ **성공 시:**
- "로그인 성공!" 메시지
- 자동으로 `/dashboard`로 리다이렉트
- 학생 대시보드 표시

❌ **실패 시:**
- 콘솔 오류 메시지 확인 (F12)
- 아래 "문제 해결" 섹션 참고

---

## 🔄 Step 4: 일반 회원가입 테스트 (Rate Limit 해제 후)

### 4-1. Rate Limit 해제 확인

**시간 경과:** 429 오류 발생 후 1-2시간 대기

**또는 새로운 이메일 사용:**
- Gmail의 `+` 기호 사용: `yourname+test1@gmail.com`
- 완전히 다른 이메일 사용

### 4-2. 회원가입 시도

1. https://unipath-one.vercel.app/auth/register
2. 새로운 정보 입력:
   - 이메일: 새 이메일 주소
   - 비밀번호: 6자 이상
   - 이름: 아무 이름
   - 역할: 학생 선택
3. "회원가입" 버튼 클릭

### 4-3. Trigger 작동 확인

**SQL Editor에서 확인:**
```sql
-- 방금 가입한 사용자 확인
SELECT
  a.id,
  a.email,
  a.created_at as auth_created,
  p.full_name,
  p.role,
  p.created_at as profile_created
FROM auth.users a
LEFT JOIN profiles p ON a.id = p.id
ORDER BY a.created_at DESC
LIMIT 5;
```

✅ **Trigger가 정상 작동하면:**
- `auth.users`와 `profiles`에 동시에 데이터 존재
- `created_at` 시간이 거의 동일 (몇 ms 차이)

---

## 🐛 문제 해결

### Q1: Trigger가 작동하지 않음

**확인 사항:**
```sql
-- Trigger 존재 확인
SELECT * FROM information_schema.triggers
WHERE trigger_name = 'on_auth_user_created';

-- Function 존재 확인
SELECT * FROM pg_proc
WHERE proname = 'handle_new_user';
```

**해결:**
- `003_auth_trigger_and_rls_fix.sql` 다시 실행
- SQL 실행 시 오류 메시지 확인

### Q2: RLS 정책 오류 (401 Unauthorized)

**확인:**
```sql
-- profiles 테이블 정책 확인
SELECT * FROM pg_policies WHERE tablename = 'profiles';
```

**해결:**
- "Enable insert for new users" 정책이 있는지 확인
- 없으면 `003_auth_trigger_and_rls_fix.sql` 다시 실행

### Q3: 여전히 429 오류

**원인:**
- Supabase Rate Limit (시간당 회원가입 시도 횟수 제한)

**해결:**
1. **즉시:** Step 2의 "테스트 계정 생성" 사용
2. **장기:** 1-2시간 대기 후 재시도
3. **다른 방법:** 완전히 새로운 이메일 사용

### Q4: "프로필을 가져올 수 없습니다" 오류

**원인:**
- Trigger가 실행되지 않아서 profiles 테이블에 데이터 없음

**해결:**
1. Step 1의 Trigger 설정 확인
2. Step 2 방법 B로 수동 프로필 추가

### Q5: students 테이블 INSERT 실패

**확인:**
```sql
SELECT * FROM pg_policies WHERE tablename = 'students';
```

**해결:**
- "Students can create their own profile" 정책 확인
- `003_auth_trigger_and_rls_fix.sql` 다시 실행

---

## 📊 완료 체크리스트

- [ ] `003_auth_trigger_and_rls_fix.sql` 실행 완료
- [ ] Trigger `on_auth_user_created` 생성 확인
- [ ] RLS 정책 `Enable insert for new users` 확인
- [ ] 테스트 계정 생성 완료
- [ ] 테스트 계정으로 로그인 성공
- [ ] 학생 대시보드 정상 작동
- [ ] (선택) 일반 회원가입 테스트 성공

---

## 📞 추가 도움이 필요한 경우

1. **Supabase 로그 확인:**
   - Dashboard → Logs → Postgres Logs
   - 에러 메시지 확인

2. **브라우저 콘솔 확인:**
   - F12 → Console 탭
   - 네트워크 요청 확인

3. **SQL 쿼리로 상태 확인:**
   ```sql
   -- 전체 사용자 현황
   SELECT
     COUNT(*) as total_users,
     COUNT(CASE WHEN p.id IS NOT NULL THEN 1 END) as with_profile,
     COUNT(CASE WHEN p.id IS NULL THEN 1 END) as without_profile
   FROM auth.users a
   LEFT JOIN profiles p ON a.id = p.id;
   ```

---

**작성일:** 2025-11-18
**버전:** 1.0.0
**작성자:** Claude Code
