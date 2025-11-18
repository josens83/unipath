import { useState, useEffect } from 'react';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { PageTransition } from '../components/common/PageTransition';
import { useCountUp } from '../hooks/useCountUp';
import {
  Users,
  TrendingUp,
  Calendar,
  DollarSign,
  BookOpen,
  Award,
  Clock,
  MessageSquare,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { dashboardAPI, classAPI } from '../services/api';
import { DashboardSkeleton } from '../components/common/Skeleton';
import type { Class, GradeData } from '../types';

export const ParentDashboard = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<any>({
    studyHours: 0,
    averageScore: 0,
    averagePercentile: 0,
    completedClasses: 0,
    monthlyPayment: 0,
    subscriptionPlan: 'Free',
  });
  const [classes, setClasses] = useState<Class[]>([]);
  const [grades, setGrades] = useState<GradeData[]>([]);
  const childName = user?.name || '학생';

  useEffect(() => {
    const loadDashboardData = async () => {
      if (!user) return;

      try {
        const [dashboardStats, userClasses] = await Promise.all([
          dashboardAPI.getStats(user.id, user.role),
          classAPI.getClasses(user.id, user.role),
        ]);

        setStats(dashboardStats);
        setClasses(userClasses);

        // Mock grades data for parent view
        setGrades([
          { subject: '국어', score: 85, percentile: 85, date: new Date().toISOString() },
          { subject: '수학', score: 88, percentile: 88, date: new Date().toISOString() },
          { subject: '영어', score: 82, percentile: 82, date: new Date().toISOString() },
          { subject: '탐구1', score: 90, percentile: 90, date: new Date().toISOString() },
          { subject: '탐구2', score: 87, percentile: 87, date: new Date().toISOString() },
        ]);
      } catch (error) {
        console.error('Failed to load dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadDashboardData();
  }, [user]);

  if (loading) {
    return <DashboardSkeleton />;
  }

  // 숫자 카운터 애니메이션
  const animatedStudyHours = useCountUp(stats.studyHours || 0, 1500);
  const animatedAverageScore = useCountUp(stats.averageScore || 0, 1500);
  const animatedPercentile = useCountUp(stats.averagePercentile || 0, 1500);
  const animatedCompletedClasses = useCountUp(stats.completedClasses || 0, 1500);
  const animatedPayment = useCountUp(stats.monthlyPayment || 0, 1500);

  return (
    <PageTransition>
      <div className="min-h-screen bg-bg-base py-8 px-4">
        <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-text-primary">
            학부모 대시보드
          </h1>
          <p className="text-text-secondary mt-2">자녀의 학습 현황을 한눈에 확인하세요</p>
        </div>

        {/* Child Selector */}
        <div className="mb-6">
          <Card padding="sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Users className="text-primary" size={24} />
                <div>
                  <div className="text-sm text-text-secondary">현재 보고 있는 자녀</div>
                  <div className="font-bold text-lg text-text-primary">{childName}</div>
                </div>
              </div>
              <Button variant="outline" size="sm">자녀 변경</Button>
            </div>
          </Card>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <div className="flex items-center gap-3 mb-2">
              <BookOpen className="text-primary" size={20} />
              <span className="text-sm text-text-secondary">이번 주 학습</span>
            </div>
            <div className="text-2xl font-bold text-text-primary">{animatedStudyHours}시간</div>
            <div className="text-xs text-secondary mt-1">↑ 지난주 대비 +3h</div>
          </Card>

          <Card>
            <div className="flex items-center gap-3 mb-2">
              <TrendingUp className="text-secondary" size={20} />
              <span className="text-sm text-text-secondary">평균 성적</span>
            </div>
            <div className="text-2xl font-bold text-text-primary">{animatedAverageScore}점</div>
            <div className="text-xs text-secondary mt-1">백분위 {animatedPercentile}%</div>
          </Card>

          <Card>
            <div className="flex items-center gap-3 mb-2">
              <Calendar className="text-accent" size={20} />
              <span className="text-sm text-text-secondary">완료한 수업</span>
            </div>
            <div className="text-2xl font-bold text-text-primary">{animatedCompletedClasses}회</div>
            <div className="text-xs text-text-secondary mt-1">이번 달</div>
          </Card>

          <Card>
            <div className="flex items-center gap-3 mb-2">
              <DollarSign className="text-purple-500 dark:text-purple-400" size={20} />
              <span className="text-sm text-text-secondary">이번 달 결제</span>
            </div>
            <div className="text-2xl font-bold text-text-primary">₩{animatedPayment.toLocaleString()}</div>
            <div className="text-xs text-text-secondary mt-1">{stats.subscriptionPlan || 'Free'} 플랜</div>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Academic Performance */}
            <Card>
              <h2 className="text-xl font-bold text-text-primary mb-4">과목별 성적</h2>
              <div className="space-y-4">
                {grades.map((grade) => (
                  <div key={grade.subject}>
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium text-text-primary">{grade.subject}</span>
                      <div className="flex items-center gap-4">
                        <span className="text-sm text-text-secondary">
                          {grade.score}점
                        </span>
                        <span className="text-sm font-medium text-primary">
                          상위 {100 - grade.percentile}%
                        </span>
                      </div>
                    </div>
                    <div className="w-full bg-border-subtle dark:bg-border rounded-full h-2">
                      <div
                        className="bg-primary h-2 rounded-full"
                        style={{ width: `${grade.percentile}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Weekly Schedule */}
            <Card>
              <h2 className="text-xl font-bold text-text-primary mb-4">다가오는 수업</h2>
              <div className="space-y-3">
                {classes.length === 0 ? (
                  <div className="text-center py-8 text-text-tertiary">
                    예정된 수업이 없습니다.
                  </div>
                ) : (
                  classes.slice(0, 5).map((classItem) => (
                    <div key={classItem.id} className="flex items-center justify-between p-4 bg-bg-subtle rounded-lg border border-border-subtle">
                      <div className="flex items-center gap-4">
                        <div className="text-center">
                          <div className="text-xs text-text-secondary">
                            {new Date(classItem.scheduledAt).toLocaleDateString('ko-KR', { weekday: 'short' })}
                          </div>
                          <div className="font-bold text-text-primary">
                            {new Date(classItem.scheduledAt).toLocaleTimeString('ko-KR', {
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </div>
                        </div>
                        <div className="h-10 w-px bg-border" />
                        <div>
                          <div className="font-medium text-text-primary">{classItem.subject}</div>
                          <div className="text-sm text-text-secondary">{classItem.duration}분</div>
                        </div>
                      </div>
                      <Clock className="text-text-quaternary" size={20} />
                    </div>
                  ))
                )}
              </div>
            </Card>

            {/* Tutor Feedback */}
            <Card>
              <h2 className="text-xl font-bold text-text-primary mb-4">튜터 피드백</h2>
              <div className="space-y-4">
                {[
                  {
                    tutor: '김수학',
                    subject: '수학',
                    date: '2024-12-10',
                    feedback: '미적분 학습 속도가 빨라졌습니다. 다음 주부터 심화 문제 풀이를 진행하겠습니다.',
                  },
                  {
                    tutor: '이영어',
                    subject: '영어',
                    date: '2024-12-09',
                    feedback: '어휘력이 많이 향상되었어요. 독해 속도도 개선이 필요합니다.',
                  },
                ].map((feedback, index) => (
                  <div key={index} className="p-4 bg-blue-50 dark:bg-blue-900/30 rounded-lg border border-blue-200 dark:border-blue-800">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <MessageSquare className="text-blue-500 dark:text-blue-400" size={16} />
                        <span className="font-medium text-text-primary">{feedback.subject} - {feedback.tutor}</span>
                      </div>
                      <span className="text-xs text-text-secondary">{feedback.date}</span>
                    </div>
                    <p className="text-sm text-text-primary">{feedback.feedback}</p>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Learning Summary */}
            <Card>
              <h3 className="font-bold text-text-primary mb-4 flex items-center gap-2">
                <Award className="text-primary" size={20} />
                이번 달 성과
              </h3>
              <div className="space-y-3">
                <div className="p-3 bg-gradient-to-br from-primary-50 to-pink-50 dark:from-primary-900/30 dark:to-pink-900/30 rounded-lg border border-primary-light dark:border-primary-subtle">
                  <div className="text-sm text-text-secondary mb-1">학습 목표 달성률</div>
                  <div className="text-2xl font-bold text-primary">85%</div>
                </div>
                <div className="p-3 bg-gradient-to-br from-pink-50 to-amber-50 dark:from-pink-900/30 dark:to-amber-900/30 rounded-lg border border-secondary-light dark:border-pink-800">
                  <div className="text-sm text-text-secondary mb-1">수업 출석률</div>
                  <div className="text-2xl font-bold text-secondary">100%</div>
                </div>
                <div className="p-3 bg-gradient-to-br from-amber-50 to-purple-50 dark:from-amber-900/30 dark:to-purple-900/30 rounded-lg border border-accent-light dark:border-amber-800">
                  <div className="text-sm text-text-secondary mb-1">과제 완료율</div>
                  <div className="text-2xl font-bold text-accent">92%</div>
                </div>
              </div>
            </Card>

            {/* Payment Info */}
            <Card>
              <h3 className="font-bold text-text-primary mb-4">구독 정보</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-text-secondary">현재 플랜</span>
                  <span className="font-medium text-text-primary">프리미엄</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-text-secondary">다음 결제일</span>
                  <span className="font-medium text-text-primary">2024-12-20</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-text-secondary">결제 금액</span>
                  <span className="font-medium text-text-primary">₩149,000</span>
                </div>
              </div>
              <Link to="/mypage/payment">
                <Button variant="outline" size="sm" fullWidth className="mt-4">
                  결제 관리
                </Button>
              </Link>
            </Card>

            {/* Quick Actions */}
            <Card>
              <h3 className="font-bold text-text-primary mb-4">빠른 메뉴</h3>
              <div className="space-y-2">
                <Link to="/tutoring">
                  <Button variant="ghost" fullWidth className="justify-start">
                    <BookOpen size={18} className="mr-2" />
                    수업 일정 보기
                  </Button>
                </Link>
                <Link to="/consulting">
                  <Button variant="ghost" fullWidth className="justify-start">
                    <TrendingUp size={18} className="mr-2" />
                    AI 입시 분석
                  </Button>
                </Link>
                <Link to="/mypage">
                  <Button variant="ghost" fullWidth className="justify-start">
                    <Users size={18} className="mr-2" />
                    프로필 관리
                  </Button>
                </Link>
              </div>
            </Card>
          </div>
        </div>
        </div>
      </div>
    </PageTransition>
  );
};
