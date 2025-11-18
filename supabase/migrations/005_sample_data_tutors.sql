-- 샘플 데이터: 튜터 10명 추가
-- 실제 서비스를 풍성하게 보이도록 만들기 위한 샘플 데이터

-- ============================================
-- 참고: 로그인 가능한 튜터 계정 만들기
-- ============================================
-- 이 SQL은 표시용 데이터만 추가합니다.
-- 실제 로그인이 필요한 경우:
-- 1. Supabase Dashboard > Authentication > Users
-- 2. "Add user" 버튼으로 계정 생성
-- 3. 생성된 user_id를 아래 SQL의 UUID와 매칭

-- ============================================
-- 1. 튜터 프로필 추가 (profiles 테이블)
-- ============================================

-- 튜터 1: 서울대 수학교육과
INSERT INTO profiles (id, email, full_name, role, phone, created_at)
VALUES (
  '10000000-0000-0000-0000-000000000001',
  'tutor1@unipath.com',
  '김민준',
  'tutor',
  '010-1234-5001',
  NOW() - INTERVAL '6 months'
) ON CONFLICT (id) DO NOTHING;

INSERT INTO tutors (user_id, university, major, subjects, hourly_rate, rating, total_sessions, bio, education_background, teaching_style, verified)
VALUES (
  '10000000-0000-0000-0000-000000000001',
  '서울대학교',
  '수학교육과',
  ARRAY['수학', '물리', '과학'],
  60000,
  4.9,
  156,
  '서울대 수학교육과 졸업 후 5년간 입시 수학 지도 경험이 있습니다. 개념 이해 중심의 체계적인 수업을 진행합니다.',
  '서울대학교 수학교육과 학사 졸업 (2019)',
  '개념 이해 중심, 단계별 심화 학습',
  true
) ON CONFLICT (user_id) DO NOTHING;

-- 튜터 2: 연세대 영어영문학과
INSERT INTO profiles (id, email, full_name, role, phone, created_at)
VALUES (
  '10000000-0000-0000-0000-000000000002',
  'tutor2@unipath.com',
  '박서연',
  'tutor',
  '010-1234-5002',
  NOW() - INTERVAL '5 months'
) ON CONFLICT (id) DO NOTHING;

INSERT INTO tutors (user_id, university, major, subjects, hourly_rate, rating, total_sessions, bio, education_background, teaching_style, verified)
VALUES (
  '10000000-0000-0000-0000-000000000002',
  '연세대학교',
  '영어영문학과',
  ARRAY['영어', '영문법', '영작문'],
  55000,
  4.8,
  132,
  '연세대 영문과 재학 중이며, TOEFL 115점 보유. 영어 내신 및 수능 전문 강사입니다.',
  '연세대학교 영어영문학과 3학년 재학',
  '원어민 수준의 발음 교정, 문법 완벽 마스터',
  true
) ON CONFLICT (user_id) DO NOTHING;

-- 튜터 3: 고려대 화학과
INSERT INTO profiles (id, email, full_name, role, phone, created_at)
VALUES (
  '10000000-0000-0000-0000-000000000003',
  'tutor3@unipath.com',
  '이준호',
  'tutor',
  '010-1234-5003',
  NOW() - INTERVAL '4 months'
) ON CONFLICT (id) DO NOTHING;

INSERT INTO tutors (user_id, university, major, subjects, hourly_rate, rating, total_sessions, bio, education_background, teaching_style, verified)
VALUES (
  '10000000-0000-0000-0000-000000000003',
  '고려대학교',
  '화학과',
  ARRAY['화학', '생명과학', '과학'],
  58000,
  4.7,
  98,
  '고려대 화학과 졸업. 과학고 출신으로 과학 과목에 특화된 수업을 제공합니다.',
  '고려대학교 화학과 학사 졸업 (2020), 서울과학고 졸업',
  '실험 원리 이해, 암기보다 개념 중심',
  true
) ON CONFLICT (user_id) DO NOTHING;

-- 튜터 4: KAIST 전산학과
INSERT INTO profiles (id, email, full_name, role, phone, created_at)
VALUES (
  '10000000-0000-0000-0000-000000000004',
  'tutor4@unipath.com',
  '최지우',
  'tutor',
  '010-1234-5004',
  NOW() - INTERVAL '8 months'
) ON CONFLICT (id) DO NOTHING;

INSERT INTO tutors (user_id, university, major, subjects, hourly_rate, rating, total_sessions, bio, education_background, teaching_style, verified)
VALUES (
  '10000000-0000-0000-0000-000000000004',
  'KAIST',
  '전산학과',
  ARRAY['수학', '물리', '정보과학'],
  65000,
  5.0,
  210,
  'KAIST 전산학과 재학 중. 수학 올림피아드 금메달 수상 경력. 수학적 사고력 향상에 중점을 둡니다.',
  'KAIST 전산학과 2학년 재학, 국제수학올림피아드 금메달',
  '문제 해결 능력 중심, 사고력 확장',
  true
) ON CONFLICT (user_id) DO NOTHING;

-- 튜터 5: 서울대 경제학과
INSERT INTO profiles (id, email, full_name, role, phone, created_at)
VALUES (
  '10000000-0000-0000-0000-000000000005',
  'tutor5@unipath.com',
  '정다은',
  'tutor',
  '010-1234-5005',
  NOW() - INTERVAL '3 months'
) ON CONFLICT (id) DO NOTHING;

INSERT INTO tutors (user_id, university, major, subjects, hourly_rate, rating, total_sessions, bio, education_background, teaching_style, verified)
VALUES (
  '10000000-0000-0000-0000-000000000005',
  '서울대학교',
  '경제학부',
  ARRAY['수학', '사회', '경제'],
  62000,
  4.9,
  145,
  '서울대 경제학부 재학. 수능 수학 만점자로, 수학과 사회탐구 통합 지도가 가능합니다.',
  '서울대학교 경제학부 4학년 재학, 수능 수학 백분위 100',
  '개념 연결 학습, 실생활 응용',
  true
) ON CONFLICT (user_id) DO NOTHING;

-- 튜터 6: 포스텍 물리학과
INSERT INTO profiles (id, email, full_name, role, phone, created_at)
VALUES (
  '10000000-0000-0000-0000-000000000006',
  'tutor6@unipath.com',
  '강태민',
  'tutor',
  '010-1234-5006',
  NOW() - INTERVAL '7 months'
) ON CONFLICT (id) DO NOTHING;

INSERT INTO tutors (user_id, university, major, subjects, hourly_rate, rating, total_sessions, bio, education_background, teaching_style, verified)
VALUES (
  '10000000-0000-0000-0000-000000000006',
  'POSTECH',
  '물리학과',
  ARRAY['물리', '수학', '과학'],
  63000,
  4.8,
  178,
  'POSTECH 물리학과 석사 재학 중. 물리 올림피아드 은메달 수상. 물리 개념의 본질을 이해시키는 수업을 합니다.',
  'POSTECH 물리학과 석사과정, 국제물리올림피아드 은메달',
  '물리 현상의 본질 이해, 수식 유도 중심',
  true
) ON CONFLICT (user_id) DO NOTHING;

-- 튜터 7: 이화여대 국어국문학과
INSERT INTO profiles (id, email, full_name, role, phone, created_at)
VALUES (
  '10000000-0000-0000-0000-000000000007',
  'tutor7@unipath.com',
  '윤서아',
  'tutor',
  '010-1234-5007',
  NOW() - INTERVAL '2 months'
) ON CONFLICT (id) DO NOTHING;

INSERT INTO tutors (user_id, university, major, subjects, hourly_rate, rating, total_sessions, bio, education_background, teaching_style, verified)
VALUES (
  '10000000-0000-0000-0000-000000000007',
  '이화여자대학교',
  '국어국문학과',
  ARRAY['국어', '문학', '논술'],
  52000,
  4.7,
  89,
  '이화여대 국문과 졸업. 논술 전문 강사로 3년간 활동. 독해력과 논리적 사고력 향상에 집중합니다.',
  '이화여자대학교 국어국문학과 학사 졸업 (2021)',
  '독해력 강화, 논리적 글쓰기',
  true
) ON CONFLICT (user_id) DO NOTHING;

-- 튜터 8: 성균관대 생명과학과
INSERT INTO profiles (id, email, full_name, role, phone, created_at)
VALUES (
  '10000000-0000-0000-0000-000000000008',
  'tutor8@unipath.com',
  '임현우',
  'tutor',
  '010-1234-5008',
  NOW() - INTERVAL '9 months'
) ON CONFLICT (id) DO NOTHING;

INSERT INTO tutors (user_id, university, major, subjects, hourly_rate, rating, total_sessions, bio, education_background, teaching_style, verified)
VALUES (
  '10000000-0000-0000-0000-000000000008',
  '성균관대학교',
  '생명과학과',
  ARRAY['생명과학', '화학', '과학'],
  54000,
  4.6,
  112,
  '성균관대 생명과학과 재학. 의대 준비생 대상 과학 과목 전문 지도 3년 경력.',
  '성균관대학교 생명과학과 3학년 재학',
  '암기보다 이해, 그림과 도표 활용',
  true
) ON CONFLICT (user_id) DO NOTHING;

-- 튜터 9: 한양대 전기공학과
INSERT INTO profiles (id, email, full_name, role, phone, created_at)
VALUES (
  '10000000-0000-0000-0000-000000000009',
  'tutor9@unipath.com',
  '송민재',
  'tutor',
  '010-1234-5009',
  NOW() - INTERVAL '1 month'
) ON CONFLICT (id) DO NOTHING;

INSERT INTO tutors (user_id, university, major, subjects, hourly_rate, rating, total_sessions, bio, education_background, teaching_style, verified)
VALUES (
  '10000000-0000-0000-0000-000000000009',
  '한양대학교',
  '전기전자공학부',
  ARRAY['수학', '물리'],
  57000,
  4.5,
  67,
  '한양대 전기공학부 재학. 수학과 물리의 연결성을 강조하며, 공학도 관점의 실용적인 수업을 제공합니다.',
  '한양대학교 전기전자공학부 2학년 재학',
  '공학적 사고, 실생활 응용',
  true
) ON CONFLICT (user_id) DO NOTHING;

-- 튜터 10: 서강대 경영학과
INSERT INTO profiles (id, email, full_name, role, phone, created_at)
VALUES (
  '10000000-0000-0000-0000-000000000010',
  'tutor10@unipath.com',
  '한예린',
  'tutor',
  '010-1234-5010',
  NOW() - INTERVAL '10 months'
) ON CONFLICT (id) DO NOTHING;

INSERT INTO tutors (user_id, university, major, subjects, hourly_rate, rating, total_sessions, bio, education_background, teaching_style, verified)
VALUES (
  '10000000-0000-0000-0000-000000000010',
  '서강대학교',
  '경영학부',
  ARRAY['수학', '사회', '영어'],
  56000,
  4.8,
  134,
  '서강대 경영학부 졸업. 상경계 진학 희망 학생들을 위한 맞춤 수업. 수능 국영수사 통합 지도 가능.',
  '서강대학교 경영학부 학사 졸업 (2022)',
  '통합 사고력, 시간 관리 전략',
  true
) ON CONFLICT (user_id) DO NOTHING;

-- ============================================
-- 2. 가용 시간대 업데이트 (JSONB)
-- ============================================

UPDATE tutors SET available_hours = '{
  "mon": ["09:00-12:00", "14:00-18:00"],
  "tue": ["10:00-13:00", "15:00-19:00"],
  "wed": ["09:00-12:00", "14:00-18:00"],
  "thu": ["10:00-13:00", "15:00-19:00"],
  "fri": ["09:00-12:00", "14:00-17:00"],
  "sat": ["10:00-14:00"],
  "sun": []
}'::jsonb
WHERE user_id = '10000000-0000-0000-0000-000000000001';

UPDATE tutors SET available_hours = '{
  "mon": ["14:00-18:00"],
  "tue": ["14:00-18:00"],
  "wed": ["14:00-18:00"],
  "thu": ["14:00-18:00"],
  "fri": ["14:00-18:00"],
  "sat": ["09:00-17:00"],
  "sun": ["09:00-17:00"]
}'::jsonb
WHERE user_id = '10000000-0000-0000-0000-000000000002';

UPDATE tutors SET available_hours = '{
  "mon": ["18:00-22:00"],
  "tue": ["18:00-22:00"],
  "wed": ["18:00-22:00"],
  "thu": ["18:00-22:00"],
  "fri": ["18:00-22:00"],
  "sat": ["10:00-18:00"],
  "sun": []
}'::jsonb
WHERE user_id = '10000000-0000-0000-0000-000000000003';

UPDATE tutors SET available_hours = '{
  "mon": ["09:00-22:00"],
  "tue": ["09:00-22:00"],
  "wed": ["09:00-22:00"],
  "thu": ["09:00-22:00"],
  "fri": ["09:00-22:00"],
  "sat": ["09:00-22:00"],
  "sun": ["09:00-22:00"]
}'::jsonb
WHERE user_id = '10000000-0000-0000-0000-000000000004';

UPDATE tutors SET available_hours = '{
  "mon": ["16:00-20:00"],
  "tue": ["16:00-20:00"],
  "wed": [],
  "thu": ["16:00-20:00"],
  "fri": ["16:00-20:00"],
  "sat": ["10:00-18:00"],
  "sun": ["13:00-18:00"]
}'::jsonb
WHERE user_id = '10000000-0000-0000-0000-000000000005';

UPDATE tutors SET available_hours = '{
  "mon": ["10:00-15:00"],
  "tue": ["10:00-15:00"],
  "wed": ["10:00-15:00"],
  "thu": ["10:00-15:00"],
  "fri": ["10:00-15:00"],
  "sat": [],
  "sun": []
}'::jsonb
WHERE user_id = '10000000-0000-0000-0000-000000000006';

UPDATE tutors SET available_hours = '{
  "mon": ["13:00-19:00"],
  "tue": ["13:00-19:00"],
  "wed": ["13:00-19:00"],
  "thu": ["13:00-19:00"],
  "fri": ["13:00-19:00"],
  "sat": ["09:00-15:00"],
  "sun": []
}'::jsonb
WHERE user_id = '10000000-0000-0000-0000-000000000007';

UPDATE tutors SET available_hours = '{
  "mon": ["15:00-21:00"],
  "tue": ["15:00-21:00"],
  "wed": ["15:00-21:00"],
  "thu": ["15:00-21:00"],
  "fri": ["15:00-21:00"],
  "sat": ["10:00-16:00"],
  "sun": ["10:00-16:00"]
}'::jsonb
WHERE user_id = '10000000-0000-0000-0000-000000000008';

UPDATE tutors SET available_hours = '{
  "mon": ["18:00-22:00"],
  "tue": ["18:00-22:00"],
  "wed": [],
  "thu": ["18:00-22:00"],
  "fri": ["18:00-22:00"],
  "sat": ["14:00-20:00"],
  "sun": []
}'::jsonb
WHERE user_id = '10000000-0000-0000-0000-000000000009';

UPDATE tutors SET available_hours = '{
  "mon": ["09:00-18:00"],
  "tue": ["09:00-18:00"],
  "wed": ["09:00-18:00"],
  "thu": ["09:00-18:00"],
  "fri": ["09:00-18:00"],
  "sat": ["09:00-13:00"],
  "sun": []
}'::jsonb
WHERE user_id = '10000000-0000-0000-0000-000000000010';

-- ============================================
-- 완료 메시지
-- ============================================

DO $$
BEGIN
  RAISE NOTICE '✅ 튜터 샘플 데이터 10명 추가 완료';
  RAISE NOTICE '📊 대학: 서울대, 연세대, 고려대, KAIST, POSTECH, 이화여대, 성균관대, 한양대, 서강대';
  RAISE NOTICE '📚 과목: 수학, 영어, 물리, 화학, 생명과학, 국어, 사회, 경제, 정보과학';
  RAISE NOTICE '⭐ 평균 평점: 4.7 / 5.0';
  RAISE NOTICE '';
  RAISE NOTICE '🔔 참고: 이 데이터는 표시용입니다.';
  RAISE NOTICE '   실제 로그인이 필요한 경우 Supabase Dashboard에서 사용자 생성 후';
  RAISE NOTICE '   해당 ID로 profiles 데이터를 업데이트하세요.';
END $$;
