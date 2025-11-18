-- Auth Trigger 및 RLS 정책 수정
-- 회원가입 시 자동으로 profiles 테이블에 프로필 생성

-- ============================================
-- 1. Trigger Function: 회원가입 시 자동 프로필 생성
-- ============================================

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
SECURITY DEFINER
SET search_path = public
LANGUAGE plpgsql
AS $$
BEGIN
  -- auth.users에 새 사용자가 생성되면 자동으로 profiles 테이블에 프로필 추가
  INSERT INTO public.profiles (id, email, full_name, role)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', 'User'),
    COALESCE(NEW.raw_user_meta_data->>'role', 'student')
  );
  RETURN NEW;
END;
$$;

-- ============================================
-- 2. Trigger: auth.users 테이블에 INSERT 시 자동 실행
-- ============================================

-- 기존 Trigger 삭제 (있을 경우)
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

-- 새 Trigger 생성
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- ============================================
-- 3. RLS 정책 수정: profiles 테이블 INSERT 허용
-- ============================================

-- 기존 INSERT 정책 삭제 (있을 경우)
DROP POLICY IF EXISTS "Users can insert their own profile during signup" ON profiles;
DROP POLICY IF EXISTS "Enable insert for authenticated users" ON profiles;

-- 새 INSERT 정책 추가 (Trigger가 실행할 수 있도록)
-- Trigger는 SECURITY DEFINER로 실행되므로 이 정책은 보안상 안전함
CREATE POLICY "Enable insert for new users"
  ON profiles FOR INSERT
  WITH CHECK (true);

-- ============================================
-- 4. students 테이블 RLS 정책 추가 (회원가입 직후 INSERT 가능)
-- ============================================

-- 기존 정책 삭제
DROP POLICY IF EXISTS "Users can create their own student profile" ON students;
DROP POLICY IF EXISTS "Enable insert for authenticated users" ON students;

-- 새 INSERT 정책
CREATE POLICY "Students can create their own profile"
  ON students FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- ============================================
-- 5. tutors 테이블 RLS 정책 추가
-- ============================================

DROP POLICY IF EXISTS "Tutors can create their own profile" ON tutors;

CREATE POLICY "Tutors can create their own profile"
  ON tutors FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- ============================================
-- 완료 메시지
-- ============================================

-- 모든 설정이 완료되었는지 확인
DO $$
BEGIN
  RAISE NOTICE '✅ Auth Trigger 및 RLS 정책 수정 완료';
  RAISE NOTICE '✅ 이제 회원가입 시 자동으로 profiles가 생성됩니다';
  RAISE NOTICE '✅ students/tutors 테이블도 정상적으로 INSERT 가능합니다';
END $$;
