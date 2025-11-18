-- 샘플 데이터: 수업 세션 및 리뷰
-- 튜터-학생 간의 수업 세션 및 리뷰 데이터

-- ============================================
-- 1. 샘플 학생 계정 생성 (표시용)
-- ============================================

-- 학생 1: 김수민 (고3, 이공계)
INSERT INTO profiles (id, email, full_name, role, phone, created_at)
VALUES (
  '20000000-0000-0000-0000-000000000001',
  'student1@unipath.com',
  '김수민',
  'student',
  '010-9876-5001',
  NOW() - INTERVAL '8 months'
) ON CONFLICT (id) DO NOTHING;

INSERT INTO students (user_id, grade, school_name, target_universities, subjects, gpa)
VALUES (
  '20000000-0000-0000-0000-000000000001',
  12,
  '서울고등학교',
  ARRAY['서울대학교', '연세대학교', 'KAIST'],
  ARRAY['수학', '물리', '화학'],
  1.5
) ON CONFLICT (user_id) DO NOTHING;

-- 학생 2: 이지은 (고2, 인문계)
INSERT INTO profiles (id, email, full_name, role, phone, created_at)
VALUES (
  '20000000-0000-0000-0000-000000000002',
  'student2@unipath.com',
  '이지은',
  'student',
  '010-9876-5002',
  NOW() - INTERVAL '6 months'
) ON CONFLICT (id) DO NOTHING;

INSERT INTO students (user_id, grade, school_name, target_universities, subjects, gpa)
VALUES (
  '20000000-0000-0000-0000-000000000002',
  11,
  '경기여자고등학교',
  ARRAY['연세대학교', '고려대학교', '이화여자대학교'],
  ARRAY['영어', '국어', '사회'],
  1.8
) ON CONFLICT (user_id) DO NOTHING;

-- 학생 3: 박준혁 (고1, 이공계)
INSERT INTO profiles (id, email, full_name, role, phone, created_at)
VALUES (
  '20000000-0000-0000-0000-000000000003',
  'student3@unipath.com',
  '박준혁',
  'student',
  '010-9876-5003',
  NOW() - INTERVAL '3 months'
) ON CONFLICT (id) DO NOTHING;

INSERT INTO students (user_id, grade, school_name, target_universities, subjects, gpa)
VALUES (
  '20000000-0000-0000-0000-000000000003',
  10,
  '대전과학고등학교',
  ARRAY['KAIST', 'POSTECH', '서울대학교'],
  ARRAY['수학', '물리', '정보과학'],
  1.2
) ON CONFLICT (user_id) DO NOTHING;

-- ============================================
-- 2. 수업 세션 데이터 (학생별로 다양한 세션 생성)
-- ============================================

-- 학생 1 (김수민)의 세션들

-- 완료된 세션 1: 수학 (김민준 튜터)
INSERT INTO sessions (id, student_id, tutor_id, subject, scheduled_at, duration_minutes, status, meeting_url, notes, rating, review, created_at)
SELECT
  's0000000-0000-0000-0000-000000000001',
  s.id,
  t.id,
  '수학',
  NOW() - INTERVAL '2 weeks',
  90,
  'completed',
  'https://meet.unipath.com/session-001',
  '미적분 2단원 완료. 극한 개념 이해 완료. 로피탈 정리 연습문제 풀이.',
  5,
  '설명이 너무 명확하고 이해하기 쉬웠어요! 복잡한 미적분 개념도 쉽게 풀어주셔서 완벽하게 이해했습니다. 다음 수업도 기대됩니다!',
  NOW() - INTERVAL '2 weeks'
FROM students s
CROSS JOIN tutors t
WHERE s.user_id = '20000000-0000-0000-0000-000000000001'
  AND t.user_id = '10000000-0000-0000-0000-000000000001'
LIMIT 1;

-- 완료된 세션 2: 물리 (강태민 튜터)
INSERT INTO sessions (id, student_id, tutor_id, subject, scheduled_at, duration_minutes, status, meeting_url, notes, rating, review, created_at)
SELECT
  's0000000-0000-0000-0000-000000000002',
  s.id,
  t.id,
  '물리',
  NOW() - INTERVAL '10 days',
  60,
  'completed',
  'https://meet.unipath.com/session-002',
  '역학 에너지 보존 법칙 학습. 문제 풀이 10문제 완료. 실수하기 쉬운 부분 체크.',
  5,
  '물리 현상의 본질을 이해시켜주시는 수업이었습니다. 단순 암기가 아니라 원리부터 이해하니 문제 풀이가 훨씬 쉬워졌어요.',
  NOW() - INTERVAL '10 days'
FROM students s
CROSS JOIN tutors t
WHERE s.user_id = '20000000-0000-0000-0000-000000000001'
  AND t.user_id = '10000000-0000-0000-0000-000000000006'
LIMIT 1;

-- 완료된 세션 3: 화학 (이준호 튜터)
INSERT INTO sessions (id, student_id, tutor_id, subject, scheduled_at, duration_minutes, status, meeting_url, notes, rating, review, created_at)
SELECT
  's0000000-0000-0000-0000-000000000003',
  s.id,
  t.id,
  '화학',
  NOW() - INTERVAL '5 days',
  60,
  'completed',
  'https://meet.unipath.com/session-003',
  '산화-환원 반응 개념 정리. 반응식 완성 연습. 화학 반응식 균형 맞추기 10문제.',
  4,
  '개념 설명이 명확했어요. 다만 조금 더 천천히 설명해주시면 더 좋을 것 같습니다.',
  NOW() - INTERVAL '5 days'
FROM students s
CROSS JOIN tutors t
WHERE s.user_id = '20000000-0000-0000-0000-000000000001'
  AND t.user_id = '10000000-0000-0000-0000-000000000003'
LIMIT 1;

-- 예정된 세션 4: 수학 (김민준 튜터)
INSERT INTO sessions (id, student_id, tutor_id, subject, scheduled_at, duration_minutes, status, meeting_url, created_at)
SELECT
  's0000000-0000-0000-0000-000000000004',
  s.id,
  t.id,
  '수학',
  NOW() + INTERVAL '3 days',
  90,
  'scheduled',
  'https://meet.unipath.com/session-004',
  NOW() - INTERVAL '1 week'
FROM students s
CROSS JOIN tutors t
WHERE s.user_id = '20000000-0000-0000-0000-000000000001'
  AND t.user_id = '10000000-0000-0000-0000-000000000001'
LIMIT 1;

-- 예정된 세션 5: 물리 (강태민 튜터)
INSERT INTO sessions (id, student_id, tutor_id, subject, scheduled_at, duration_minutes, status, meeting_url, created_at)
SELECT
  's0000000-0000-0000-0000-000000000005',
  s.id,
  t.id,
  '물리',
  NOW() + INTERVAL '1 week',
  60,
  'scheduled',
  'https://meet.unipath.com/session-005',
  NOW() - INTERVAL '3 days'
FROM students s
CROSS JOIN tutors t
WHERE s.user_id = '20000000-0000-0000-0000-000000000001'
  AND t.user_id = '10000000-0000-0000-0000-000000000006'
LIMIT 1;

-- 학생 2 (이지은)의 세션들

-- 완료된 세션 6: 영어 (박서연 튜터)
INSERT INTO sessions (id, student_id, tutor_id, subject, scheduled_at, duration_minutes, status, meeting_url, notes, rating, review, created_at)
SELECT
  's0000000-0000-0000-0000-000000000006',
  s.id,
  t.id,
  '영어',
  NOW() - INTERVAL '1 week',
  60,
  'completed',
  'https://meet.unipath.com/session-006',
  '영어 독해 전략 학습. 지문 구조 파악 연습. 내신 대비 문법 정리.',
  5,
  '영어 발음도 정말 좋으시고, 문법 설명이 체계적이에요. 내신 대비에 큰 도움이 되었습니다!',
  NOW() - INTERVAL '1 week'
FROM students s
CROSS JOIN tutors t
WHERE s.user_id = '20000000-0000-0000-0000-000000000002'
  AND t.user_id = '10000000-0000-0000-0000-000000000002'
LIMIT 1;

-- 완료된 세션 7: 국어 (윤서아 튜터)
INSERT INTO sessions (id, student_id, tutor_id, subject, scheduled_at, duration_minutes, status, meeting_url, notes, rating, review, created_at)
SELECT
  's0000000-0000-0000-0000-000000000007',
  s.id,
  t.id,
  '국어',
  NOW() - INTERVAL '3 days',
  60,
  'completed',
  'https://meet.unipath.com/session-007',
  '비문학 독해 훈련. 키워드 중심 읽기 연습. 문단별 요약 훈련.',
  5,
  '비문학 독해 속도가 정말 빨라졌어요! 키워드 찾는 방법을 알려주셔서 시간도 많이 단축되었습니다.',
  NOW() - INTERVAL '3 days'
FROM students s
CROSS JOIN tutors t
WHERE s.user_id = '20000000-0000-0000-0000-000000000002'
  AND t.user_id = '10000000-0000-0000-0000-000000000007'
LIMIT 1;

-- 완료된 세션 8: 사회 (정다은 튜터)
INSERT INTO sessions (id, student_id, tutor_id, subject, scheduled_at, duration_minutes, status, meeting_url, notes, rating, review, created_at)
SELECT
  's0000000-0000-0000-0000-000000000008',
  s.id,
  t.id,
  '사회',
  NOW() - INTERVAL '6 days',
  60,
  'completed',
  'https://meet.unipath.com/session-008',
  '경제 기본 개념 학습. 수요-공급 그래프 분석. 탄력성 개념 정리.',
  4,
  '개념 설명은 좋았는데, 문제 풀이 시간이 부족했어요. 다음엔 문제 풀이 시간을 더 늘려주시면 감사하겠습니다.',
  NOW() - INTERVAL '6 days'
FROM students s
CROSS JOIN tutors t
WHERE s.user_id = '20000000-0000-0000-0000-000000000002'
  AND t.user_id = '10000000-0000-0000-0000-000000000005'
LIMIT 1;

-- 예정된 세션 9: 영어 (박서연 튜터)
INSERT INTO sessions (id, student_id, tutor_id, subject, scheduled_at, duration_minutes, status, meeting_url, created_at)
SELECT
  's0000000-0000-0000-0000-000000000009',
  s.id,
  t.id,
  '영어',
  NOW() + INTERVAL '2 days',
  60,
  'scheduled',
  'https://meet.unipath.com/session-009',
  NOW() - INTERVAL '5 days'
FROM students s
CROSS JOIN tutors t
WHERE s.user_id = '20000000-0000-0000-0000-000000000002'
  AND t.user_id = '10000000-0000-0000-0000-000000000002'
LIMIT 1;

-- 취소된 세션 10: 국어 (윤서아 튜터)
INSERT INTO sessions (id, student_id, tutor_id, subject, scheduled_at, duration_minutes, status, notes, created_at)
SELECT
  's0000000-0000-0000-0000-000000000010',
  s.id,
  t.id,
  '국어',
  NOW() - INTERVAL '1 day',
  60,
  'cancelled',
  '학생 개인 사정으로 취소',
  NOW() - INTERVAL '2 days'
FROM students s
CROSS JOIN tutors t
WHERE s.user_id = '20000000-0000-0000-0000-000000000002'
  AND t.user_id = '10000000-0000-0000-0000-000000000007'
LIMIT 1;

-- 학생 3 (박준혁)의 세션들

-- 완료된 세션 11: 수학 (최지우 튜터 - KAIST)
INSERT INTO sessions (id, student_id, tutor_id, subject, scheduled_at, duration_minutes, status, meeting_url, notes, rating, review, created_at)
SELECT
  's0000000-0000-0000-0000-000000000011',
  s.id,
  t.id,
  '수학',
  NOW() - INTERVAL '1 week',
  90,
  'completed',
  'https://meet.unipath.com/session-011',
  '올림피아드 기출 문제 풀이. 정수론 기초 개념. 증명 방법 학습.',
  5,
  '정말 어려운 문제도 쉽게 설명해주셔서 감동받았어요. 수학적 사고력이 정말 많이 늘었습니다. 최고의 튜터님!',
  NOW() - INTERVAL '1 week'
FROM students s
CROSS JOIN tutors t
WHERE s.user_id = '20000000-0000-0000-0000-000000000003'
  AND t.user_id = '10000000-0000-0000-0000-000000000004'
LIMIT 1;

-- 완료된 세션 12: 물리 (강태민 튜터)
INSERT INTO sessions (id, student_id, tutor_id, subject, scheduled_at, duration_minutes, status, meeting_url, notes, rating, review, created_at)
SELECT
  's0000000-0000-0000-0000-000000000012',
  s.id,
  t.id,
  '물리',
  NOW() - INTERVAL '4 days',
  90,
  'completed',
  'https://meet.unipath.com/session-012',
  '역학 고급 문제 풀이. 회전 운동 개념. 각운동량 보존 법칙.',
  5,
  '물리 올림피아드 준비하는데 정말 큰 도움이 되었습니다. 문제 접근 방법을 배울 수 있었어요.',
  NOW() - INTERVAL '4 days'
FROM students s
CROSS JOIN tutors t
WHERE s.user_id = '20000000-0000-0000-0000-000000000003'
  AND t.user_id = '10000000-0000-0000-0000-000000000006'
LIMIT 1;

-- 완료된 세션 13: 정보과학 (송민재 튜터)
INSERT INTO sessions (id, student_id, tutor_id, subject, scheduled_at, duration_minutes, status, meeting_url, notes, rating, review, created_at)
SELECT
  's0000000-0000-0000-0000-000000000013',
  s.id,
  t.id,
  '정보과학',
  NOW() - INTERVAL '8 days',
  60,
  'completed',
  'https://meet.unipath.com/session-013',
  '알고리즘 기초. 정렬 알고리즘 비교. 시간 복잡도 개념.',
  4,
  '기본 개념은 잘 배웠는데, 코딩 실습 시간이 더 있었으면 좋았을 것 같아요.',
  NOW() - INTERVAL '8 days'
FROM students s
CROSS JOIN tutors t
WHERE s.user_id = '20000000-0000-0000-0000-000000000003'
  AND t.user_id = '10000000-0000-0000-0000-000000000009'
LIMIT 1;

-- 예정된 세션 14: 수학 (최지우 튜터)
INSERT INTO sessions (id, student_id, tutor_id, subject, scheduled_at, duration_minutes, status, meeting_url, created_at)
SELECT
  's0000000-0000-0000-0000-000000000014',
  s.id,
  t.id,
  '수학',
  NOW() + INTERVAL '4 days',
  90,
  'scheduled',
  'https://meet.unipath.com/session-014',
  NOW() - INTERVAL '2 days'
FROM students s
CROSS JOIN tutors t
WHERE s.user_id = '20000000-0000-0000-0000-000000000003'
  AND t.user_id = '10000000-0000-0000-0000-000000000004'
LIMIT 1;

-- 예정된 세션 15: 물리 (강태민 튜터)
INSERT INTO sessions (id, student_id, tutor_id, subject, scheduled_at, duration_minutes, status, meeting_url, created_at)
SELECT
  's0000000-0000-0000-0000-000000000015',
  s.id,
  t.id,
  '물리',
  NOW() + INTERVAL '6 days',
  90,
  'scheduled',
  'https://meet.unipath.com/session-015',
  NOW() - INTERVAL '1 day'
FROM students s
CROSS JOIN tutors t
WHERE s.user_id = '20000000-0000-0000-0000-000000000003'
  AND t.user_id = '10000000-0000-0000-0000-000000000006'
LIMIT 1;

-- ============================================
-- 3. 튜터 평균 평점 및 총 세션 수 업데이트
-- ============================================

-- 각 튜터의 실제 리뷰 기반 평점 업데이트는 트리거로 처리하는 것이 좋지만,
-- 여기서는 이미 tutors 테이블에 샘플 데이터로 평점과 세션 수가 들어가 있으므로 생략합니다.

-- ============================================
-- 완료 메시지
-- ============================================

DO $$
BEGIN
  RAISE NOTICE '✅ 수업 세션 15개 추가 완료';
  RAISE NOTICE '📊 세션 상태 분포:';
  RAISE NOTICE '   - 완료: 10개 (리뷰 포함)';
  RAISE NOTICE '   - 예정: 4개';
  RAISE NOTICE '   - 취소: 1개';
  RAISE NOTICE '';
  RAISE NOTICE '👥 샘플 학생 3명 추가:';
  RAISE NOTICE '   - 김수민 (고3, 이공계)';
  RAISE NOTICE '   - 이지은 (고2, 인문계)';
  RAISE NOTICE '   - 박준혁 (고1, 과학고)';
  RAISE NOTICE '';
  RAISE NOTICE '⭐ 평균 평점: 4.7 / 5.0';
  RAISE NOTICE '📚 과목: 수학, 영어, 물리, 화학, 국어, 사회, 정보과학';
END $$;
