-- Row Level Security Policies
-- 각 테이블에 대한 접근 권한 설정

-- Enable RLS on all tables
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE students ENABLE ROW LEVEL SECURITY;
ALTER TABLE tutors ENABLE ROW LEVEL SECURITY;
ALTER TABLE sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_consultations ENABLE ROW LEVEL SECURITY;
ALTER TABLE community_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE study_groups ENABLE ROW LEVEL SECURITY;
ALTER TABLE study_group_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

-- Profiles Policies
-- 모든 사용자는 자신의 프로필을 읽고 수정할 수 있음
CREATE POLICY "Users can view their own profile"
  ON profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id);

CREATE POLICY "Users can view other users' basic info"
  ON profiles FOR SELECT
  USING (TRUE);

-- Students Policies
CREATE POLICY "Students can view their own data"
  ON students FOR SELECT
  USING (user_id = auth.uid() OR EXISTS (
    SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('admin', 'parent')
  ));

CREATE POLICY "Students can update their own data"
  ON students FOR UPDATE
  USING (user_id = auth.uid());

CREATE POLICY "Parents can view their children's data"
  ON students FOR SELECT
  USING (parent_id = auth.uid());

-- Tutors Policies
CREATE POLICY "Everyone can view verified tutors"
  ON tutors FOR SELECT
  USING (verified = TRUE OR user_id = auth.uid() OR EXISTS (
    SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'
  ));

CREATE POLICY "Tutors can update their own data"
  ON tutors FOR UPDATE
  USING (user_id = auth.uid());

-- Sessions Policies
CREATE POLICY "Students can view their own sessions"
  ON sessions FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM students WHERE id = sessions.student_id AND user_id = auth.uid()
  ) OR EXISTS (
    SELECT 1 FROM tutors WHERE id = sessions.tutor_id AND user_id = auth.uid()
  ) OR EXISTS (
    SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'
  ));

CREATE POLICY "Students can create sessions"
  ON sessions FOR INSERT
  WITH CHECK (EXISTS (
    SELECT 1 FROM students WHERE id = sessions.student_id AND user_id = auth.uid()
  ));

CREATE POLICY "Students and tutors can update sessions"
  ON sessions FOR UPDATE
  USING (EXISTS (
    SELECT 1 FROM students WHERE id = sessions.student_id AND user_id = auth.uid()
  ) OR EXISTS (
    SELECT 1 FROM tutors WHERE id = sessions.tutor_id AND user_id = auth.uid()
  ));

-- Payments Policies
CREATE POLICY "Users can view their own payments"
  ON payments FOR SELECT
  USING (user_id = auth.uid() OR EXISTS (
    SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'
  ));

CREATE POLICY "Users can create their own payments"
  ON payments FOR INSERT
  WITH CHECK (user_id = auth.uid());

-- AI Consultations Policies
CREATE POLICY "Students can view their own consultations"
  ON ai_consultations FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM students WHERE id = ai_consultations.student_id AND user_id = auth.uid()
  ) OR EXISTS (
    SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'
  ));

CREATE POLICY "Students can create consultations"
  ON ai_consultations FOR INSERT
  WITH CHECK (EXISTS (
    SELECT 1 FROM students WHERE id = ai_consultations.student_id AND user_id = auth.uid()
  ));

-- Community Posts Policies
CREATE POLICY "Everyone can view posts"
  ON community_posts FOR SELECT
  USING (TRUE);

CREATE POLICY "Authenticated users can create posts"
  ON community_posts FOR INSERT
  WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Authors can update their own posts"
  ON community_posts FOR UPDATE
  USING (author_id = auth.uid());

CREATE POLICY "Authors can delete their own posts"
  ON community_posts FOR DELETE
  USING (author_id = auth.uid() OR EXISTS (
    SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'
  ));

-- Comments Policies
CREATE POLICY "Everyone can view comments"
  ON comments FOR SELECT
  USING (TRUE);

CREATE POLICY "Authenticated users can create comments"
  ON comments FOR INSERT
  WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Authors can update their own comments"
  ON comments FOR UPDATE
  USING (author_id = auth.uid());

CREATE POLICY "Authors can delete their own comments"
  ON comments FOR DELETE
  USING (author_id = auth.uid() OR EXISTS (
    SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'
  ));

-- Study Groups Policies
CREATE POLICY "Everyone can view study groups"
  ON study_groups FOR SELECT
  USING (TRUE);

CREATE POLICY "Authenticated users can create study groups"
  ON study_groups FOR INSERT
  WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Creators can update their study groups"
  ON study_groups FOR UPDATE
  USING (creator_id = auth.uid());

-- Study Group Members Policies
CREATE POLICY "Everyone can view group members"
  ON study_group_members FOR SELECT
  USING (TRUE);

CREATE POLICY "Users can join study groups"
  ON study_group_members FOR INSERT
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can leave study groups"
  ON study_group_members FOR DELETE
  USING (user_id = auth.uid() OR EXISTS (
    SELECT 1 FROM study_groups sg
    WHERE sg.id = study_group_members.group_id AND sg.creator_id = auth.uid()
  ));

-- Notifications Policies
CREATE POLICY "Users can view their own notifications"
  ON notifications FOR SELECT
  USING (user_id = auth.uid());

CREATE POLICY "Users can update their own notifications"
  ON notifications FOR UPDATE
  USING (user_id = auth.uid());

CREATE POLICY "System can create notifications"
  ON notifications FOR INSERT
  WITH CHECK (TRUE);
