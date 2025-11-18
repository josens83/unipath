-- 테스트 계정 생성 SQL
-- 429 오류 해결 전에 직접 테스트 계정을 만들어서 서비스를 테스트할 수 있습니다

-- ============================================
-- 1. 테스트 사용자 생성 (auth.users 테이블에 직접 INSERT)
-- ============================================

-- 비밀번호 해시 생성 함수 (비밀번호: test1234)
-- Supabase는 bcrypt를 사용하므로 여기서는 간단한 예시만 제공

-- 참고: Supabase Dashboard의 Authentication > Users에서
-- "Add user" 버튼을 클릭하여 GUI로 생성하는 것이 더 쉽습니다!

-- ============================================
-- 2. 수동으로 프로필 및 학생 데이터 추가
-- ============================================

-- 먼저 Supabase Dashboard에서 테스트 사용자를 생성하세요:
-- 1. Authentication > Users > "Add user" 클릭
-- 2. Email: test@unipath.com
-- 3. Password: test1234
-- 4. Auto Confirm User: ✅ 체크
-- 5. "Create user" 클릭

-- 그 다음 아래 SQL을 실행하여 프로필과 학생 정보를 추가하세요
-- (USER_ID는 위에서 생성한 사용자의 ID로 변경)

/*
-- 예시: 사용자 ID 확인
SELECT id, email FROM auth.users WHERE email = 'test@unipath.com';

-- 프로필 추가 (Trigger가 이미 생성했을 수도 있음)
INSERT INTO profiles (id, email, full_name, role)
VALUES (
  'USER_ID_HERE', -- 위에서 복사한 ID
  'test@unipath.com',
  '테스트 학생',
  'student'
)
ON CONFLICT (id) DO NOTHING;

-- 학생 정보 추가
INSERT INTO students (user_id, grade, school_name)
VALUES (
  'USER_ID_HERE', -- 같은 ID
  11, -- 고3
  '테스트고등학교'
)
ON CONFLICT (user_id) DO NOTHING;
*/

-- ============================================
-- 3. 여러 테스트 계정 생성 (선택사항)
-- ============================================

-- 튜터 계정 예시:
/*
-- 1. Dashboard에서 사용자 생성:
--    Email: tutor@unipath.com
--    Password: test1234

-- 2. 프로필 추가
INSERT INTO profiles (id, email, full_name, role)
VALUES (
  'TUTOR_USER_ID_HERE',
  'tutor@unipath.com',
  '김튜터',
  'tutor'
)
ON CONFLICT (id) DO NOTHING;

-- 3. 튜터 정보 추가
INSERT INTO tutors (user_id, university, major, subjects, hourly_rate, verified)
VALUES (
  'TUTOR_USER_ID_HERE',
  '서울대학교',
  '수학교육과',
  ARRAY['수학', '물리'],
  50000,
  true
)
ON CONFLICT (user_id) DO NOTHING;
*/

-- ============================================
-- 완료 메시지
-- ============================================

DO $$
BEGIN
  RAISE NOTICE '📝 테스트 계정 생성 가이드';
  RAISE NOTICE '1. Supabase Dashboard > Authentication > Users';
  RAISE NOTICE '2. "Add user" 버튼 클릭';
  RAISE NOTICE '3. 이메일/비밀번호 입력 + Auto Confirm 체크';
  RAISE NOTICE '4. 생성된 사용자 ID로 위의 SQL 실행';
  RAISE NOTICE '';
  RAISE NOTICE '✅ 이렇게 하면 429 오류 없이 바로 테스트 가능합니다!';
END $$;
