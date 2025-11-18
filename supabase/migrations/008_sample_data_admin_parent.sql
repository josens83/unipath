-- 샘플 데이터: 관리자 및 학부모 계정
-- 시스템 관리를 위한 관리자 계정과 학생 학부모 계정

-- ============================================
-- 1. 관리자 계정
-- ============================================

-- 시스템 관리자: admin@unipath.kr
INSERT INTO profiles (id, email, full_name, role, phone, created_at)
VALUES (
  '30000000-0000-0000-0000-000000000001',
  'admin@unipath.kr',
  '관리자',
  'admin',
  '02-1234-5678',
  NOW() - INTERVAL '1 year'
) ON CONFLICT (id) DO NOTHING;

-- ============================================
-- 2. 학부모 계정 (학생 3명의 부모)
-- ============================================

-- 학부모 1: 김수민 학생의 어머니
INSERT INTO profiles (id, email, full_name, role, phone, created_at)
VALUES (
  '30000000-0000-0000-0000-000000000002',
  'parent1@unipath.com',
  '김영희',
  'parent',
  '010-1111-2222',
  NOW() - INTERVAL '8 months'
) ON CONFLICT (id) DO NOTHING;

-- 학부모 2: 이지은 학생의 아버지
INSERT INTO profiles (id, email, full_name, role, phone, created_at)
VALUES (
  '30000000-0000-0000-0000-000000000003',
  'parent2@unipath.com',
  '이철수',
  'parent',
  '010-3333-4444',
  NOW() - INTERVAL '6 months'
) ON CONFLICT (id) DO NOTHING;

-- 학부모 3: 박준혁 학생의 어머니
INSERT INTO profiles (id, email, full_name, role, phone, created_at)
VALUES (
  '30000000-0000-0000-0000-000000000004',
  'parent3@unipath.com',
  '박미경',
  'parent',
  '010-5555-6666',
  NOW() - INTERVAL '3 months'
) ON CONFLICT (id) DO NOTHING;

-- ============================================
-- 3. 학생-학부모 연결 (students 테이블 업데이트)
-- ============================================

-- 김수민 학생에게 어머니 연결
UPDATE students
SET parent_id = '30000000-0000-0000-0000-000000000002'
WHERE user_id = '20000000-0000-0000-0000-000000000001';

-- 이지은 학생에게 아버지 연결
UPDATE students
SET parent_id = '30000000-0000-0000-0000-000000000003'
WHERE user_id = '20000000-0000-0000-0000-000000000002';

-- 박준혁 학생에게 어머니 연결
UPDATE students
SET parent_id = '30000000-0000-0000-0000-000000000004'
WHERE user_id = '20000000-0000-0000-0000-000000000003';

-- ============================================
-- 4. 알림 샘플 데이터 추가
-- ============================================

-- 학생 1에게 알림 (수업 예정)
INSERT INTO notifications (user_id, type, title, message, read, link, created_at)
VALUES (
  '20000000-0000-0000-0000-000000000001',
  'session_reminder',
  '수업 3일 전 알림',
  '김민준 튜터와의 수학 수업이 3일 후 예정되어 있습니다.',
  false,
  '/tutoring',
  NOW() - INTERVAL '1 hour'
);

-- 학생 1에게 알림 (세션 완료)
INSERT INTO notifications (user_id, type, title, message, read, link, created_at)
VALUES (
  '20000000-0000-0000-0000-000000000001',
  'session_completed',
  '수업 완료',
  '강태민 튜터와의 물리 수업이 완료되었습니다. 리뷰를 남겨주세요!',
  true,
  '/tutoring',
  NOW() - INTERVAL '10 days'
);

-- 학생 2에게 알림 (새 메시지)
INSERT INTO notifications (user_id, type, title, message, read, link, created_at)
VALUES (
  '20000000-0000-0000-0000-000000000002',
  'new_message',
  '새 메시지',
  '박서연 튜터님이 메시지를 보냈습니다.',
  false,
  '/messages',
  NOW() - INTERVAL '2 hours'
);

-- 학부모 1에게 알림 (자녀 수업 완료)
INSERT INTO notifications (user_id, type, title, message, read, link, created_at)
VALUES (
  '30000000-0000-0000-0000-000000000002',
  'child_session_completed',
  '자녀 수업 완료',
  '김수민 학생의 수학 수업이 완료되었습니다. (튜터: 김민준)',
  false,
  '/dashboard',
  NOW() - INTERVAL '2 weeks'
);

-- 학부모 2에게 알림 (자녀 성적 업데이트)
INSERT INTO notifications (user_id, type, title, message, read, link, created_at)
VALUES (
  '30000000-0000-0000-0000-000000000003',
  'grade_update',
  '성적 업데이트',
  '이지은 학생의 성적이 업데이트되었습니다.',
  true,
  '/dashboard',
  NOW() - INTERVAL '5 days'
);

-- 튜터 1에게 알림 (새 수업 예약)
INSERT INTO notifications (user_id, type, title, message, read, link, created_at)
VALUES (
  '10000000-0000-0000-0000-000000000001',
  'new_booking',
  '새 수업 예약',
  '김수민 학생이 수학 수업을 예약했습니다.',
  false,
  '/tutoring',
  NOW() - INTERVAL '1 week'
);

-- 관리자에게 알림 (신규 회원 가입)
INSERT INTO notifications (user_id, type, title, message, read, link, created_at)
VALUES (
  '30000000-0000-0000-0000-000000000001',
  'new_user',
  '신규 회원 가입',
  '새로운 사용자가 가입했습니다. (총 사용자 수: 24명)',
  true,
  '/admin/users',
  NOW() - INTERVAL '1 day'
);

-- 관리자에게 알림 (튜터 신청)
INSERT INTO notifications (user_id, type, title, message, read, link, created_at)
VALUES (
  '30000000-0000-0000-0000-000000000001',
  'tutor_application',
  '튜터 승인 대기',
  '새로운 튜터 신청이 있습니다. 검토가 필요합니다.',
  false,
  '/admin/tutors',
  NOW() - INTERVAL '3 hours'
);

-- ============================================
-- 5. AI 컨설팅 샘플 데이터
-- ============================================

-- 학생 1의 AI 입시 컨설팅 결과
INSERT INTO ai_consultations (student_id, consultation_type, input_data, ai_response, created_at)
SELECT
  s.id,
  'university_recommendation',
  jsonb_build_object(
    'gpa', 1.5,
    'subjects', ARRAY['수학', '물리', '화학'],
    'target_field', '공학',
    'extracurricular', ARRAY['수학 동아리', '과학 봉사'],
    'preferred_location', '서울'
  ),
  jsonb_build_object(
    'recommended_universities', jsonb_build_array(
      jsonb_build_object('name', '서울대학교', 'department', '기계공학부', 'probability', 85, 'reason', '내신 성적과 과목 선택이 우수합니다'),
      jsonb_build_object('name', 'KAIST', 'department', '전산학과', 'probability', 90, 'reason', '수학/과학 성적이 매우 우수하며, KAIST 입학 가능성이 높습니다'),
      jsonb_build_object('name', '연세대학교', 'department', '전기전자공학부', 'probability', 95, 'reason', '안정적인 합격이 가능한 학과입니다')
    ),
    'study_plan', '수능까지 3개월, 수학 심화 학습과 과학 탐구 실력 강화에 집중하세요',
    'tips', ARRAY['내신 관리 유지', '모의고사 꾸준히 응시', '면접 준비 시작']
  ),
  NOW() - INTERVAL '1 month'
FROM students s
WHERE s.user_id = '20000000-0000-0000-0000-000000000001'
LIMIT 1;

-- 학생 2의 AI 학습 계획 컨설팅
INSERT INTO ai_consultations (student_id, consultation_type, input_data, ai_response, created_at)
SELECT
  s.id,
  'study_plan',
  jsonb_build_object(
    'gpa', 1.8,
    'weak_subjects', ARRAY['수학', '영어'],
    'strong_subjects', ARRAY['국어', '사회'],
    'available_hours', 6,
    'exam_date', '2025-03-15'
  ),
  jsonb_build_object(
    'weekly_plan', jsonb_build_object(
      'monday', ARRAY['수학 개념 2시간', '영어 단어 1시간', '복습 1시간'],
      'tuesday', ARRAY['영어 독해 2시간', '수학 문제 풀이 2시간'],
      'wednesday', ARRAY['수학 심화 2시간', '영어 문법 1시간', '복습 1시간'],
      'thursday', ARRAY['영어 듣기 1시간', '수학 기출 2시간', '자율 1시간'],
      'friday', ARRAY['주간 복습 3시간', '오답 정리 2시간'],
      'saturday', ARRAY['모의고사 3시간', '오답 분석 2시간'],
      'sunday', ARRAY['휴식 및 가벼운 복습 2시간']
    ),
    'focus_areas', ARRAY['수학 기초 개념 다시 잡기', '영어 독해 속도 향상', '꾸준한 복습'],
    'milestones', ARRAY['1개월 후: 수학 3등급 목표', '2개월 후: 영어 2등급 목표', '3개월 후: 전체 2등급 달성']
  ),
  NOW() - INTERVAL '2 weeks'
FROM students s
WHERE s.user_id = '20000000-0000-0000-0000-000000000002'
LIMIT 1;

-- 학생 3의 AI 진로 상담
INSERT INTO ai_consultations (student_id, consultation_type, input_data, ai_response, created_at)
SELECT
  s.id,
  'career_advice',
  jsonb_build_object(
    'interests', ARRAY['수학', '컴퓨터', '물리'],
    'strengths', ARRAY['논리적 사고', '문제 해결'],
    'personality', 'INTJ',
    'goals', '연구자'
  ),
  jsonb_build_object(
    'recommended_careers', jsonb_build_array(
      jsonb_build_object('career', '컴퓨터 과학자', 'fit_score', 95, 'reason', '논리적 사고와 문제 해결 능력이 뛰어납니다'),
      jsonb_build_object('career', '수학자', 'fit_score', 90, 'reason', '수학에 대한 깊은 이해와 탐구 정신이 있습니다'),
      jsonb_build_object('career', 'AI 연구원', 'fit_score', 93, 'reason', '컴퓨터와 수학을 융합한 분야에 적합합니다')
    ),
    'recommended_majors', ARRAY['전산학', '수학과', '물리학과', '통계학과'],
    'preparation_tips', ARRAY['올림피아드 참여', '연구 프로젝트 경험', '대학원 진학 준비', '논문 읽기 습관']
  ),
  NOW() - INTERVAL '1 week'
FROM students s
WHERE s.user_id = '20000000-0000-0000-0000-000000000003'
LIMIT 1;

-- ============================================
-- 완료 메시지
-- ============================================

DO $$
DECLARE
  total_users INTEGER;
  total_tutors INTEGER;
  total_students INTEGER;
  total_parents INTEGER;
  total_admins INTEGER;
  total_sessions INTEGER;
  total_posts INTEGER;
BEGIN
  SELECT COUNT(*) INTO total_users FROM profiles;
  SELECT COUNT(*) INTO total_tutors FROM profiles WHERE role = 'tutor';
  SELECT COUNT(*) INTO total_students FROM profiles WHERE role = 'student';
  SELECT COUNT(*) INTO total_parents FROM profiles WHERE role = 'parent';
  SELECT COUNT(*) INTO total_admins FROM profiles WHERE role = 'admin';
  SELECT COUNT(*) INTO total_sessions FROM sessions;
  SELECT COUNT(*) INTO total_posts FROM community_posts;

  RAISE NOTICE '🎉 ========================================';
  RAISE NOTICE '🎉 UniPath 샘플 데이터 생성 완료!';
  RAISE NOTICE '🎉 ========================================';
  RAISE NOTICE '';
  RAISE NOTICE '📊 전체 통계:';
  RAISE NOTICE '   👥 총 사용자: % 명', total_users;
  RAISE NOTICE '   👨‍🏫 튜터: % 명', total_tutors;
  RAISE NOTICE '   👨‍🎓 학생: % 명', total_students;
  RAISE NOTICE '   👪 학부모: % 명', total_parents;
  RAISE NOTICE '   ⚙️  관리자: % 명', total_admins;
  RAISE NOTICE '   📚 수업 세션: % 개', total_sessions;
  RAISE NOTICE '   💬 커뮤니티 게시글: % 개', total_posts;
  RAISE NOTICE '   🔔 알림: 8 개';
  RAISE NOTICE '   🤖 AI 컨설팅: 3 개';
  RAISE NOTICE '';
  RAISE NOTICE '✅ 계정 정보:';
  RAISE NOTICE '   관리자: admin@unipath.kr';
  RAISE NOTICE '   학생 1: student1@unipath.com (김수민)';
  RAISE NOTICE '   학생 2: student2@unipath.com (이지은)';
  RAISE NOTICE '   학생 3: student3@unipath.com (박준혁)';
  RAISE NOTICE '   학부모 1: parent1@unipath.com (김영희)';
  RAISE NOTICE '   학부모 2: parent2@unipath.com (이철수)';
  RAISE NOTICE '   학부모 3: parent3@unipath.com (박미경)';
  RAISE NOTICE '   튜터 1-10: tutor1~10@unipath.com';
  RAISE NOTICE '';
  RAISE NOTICE '🔔 참고: 로그인하려면 Supabase Dashboard에서';
  RAISE NOTICE '   위 이메일로 사용자를 생성하고 비밀번호를 설정하세요!';
  RAISE NOTICE '';
  RAISE NOTICE '🚀 이제 서비스가 풍성하게 준비되었습니다!';
END $$;
