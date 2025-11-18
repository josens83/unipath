import { useAuth } from '../contexts/AuthContext';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import {
  Calendar,
  BookOpen,
  TrendingUp,
  Target,
  Clock,
  Award,
  Bell,
  ArrowRight,
} from 'lucide-react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { mockGrades } from '../services/mockData';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { classAPI, dashboardAPI } from '../services/api';
import { DashboardSkeleton } from '../components/common/Skeleton';
import type { Class } from '../types';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export const StudentDashboard = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<any>({
    totalClasses: 0,
    upcomingClasses: 0,
    completedClasses: 0,
    studyHours: 0,
  });
  const [classes, setClasses] = useState<Class[]>([]);

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

  const chartData = {
    labels: mockGrades.map(g => g.subject),
    datasets: [
      {
        label: '백분위',
        data: mockGrades.map(g => g.percentile),
        borderColor: '#4F46E5',
        backgroundColor: 'rgba(79, 70, 229, 0.1)',
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
      },
    },
  };

  const upcomingClass = classes.find(c => c.status === 'scheduled');

  return (
    <div className="min-h-screen bg-bg-base py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-text-primary">
            안녕하세요, {user?.name}님! 👋
          </h1>
          <p className="text-text-secondary mt-2">오늘도 목표를 향해 한 걸음 더 나아가요</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="flex items-center gap-4">
            <div className="p-3 bg-primary-light dark:bg-primary-subtle rounded-lg">
              <BookOpen className="text-primary" size={24} />
            </div>
            <div>
              <div className="text-2xl font-bold text-text-primary">{stats.totalClasses}</div>
              <div className="text-sm text-text-secondary">전체 수업</div>
            </div>
          </Card>

          <Card className="flex items-center gap-4">
            <div className="p-3 bg-pink-100 dark:bg-pink-900/30 rounded-lg">
              <TrendingUp className="text-secondary" size={24} />
            </div>
            <div>
              <div className="text-2xl font-bold text-text-primary">{mockGrades.reduce((sum, g) => sum + g.percentile, 0) / mockGrades.length || 0}</div>
              <div className="text-sm text-text-secondary">평균 백분위</div>
            </div>
          </Card>

          <Card className="flex items-center gap-4">
            <div className="p-3 bg-amber-100 dark:bg-amber-900/30 rounded-lg">
              <Target className="text-accent" size={24} />
            </div>
            <div>
              <div className="text-2xl font-bold text-text-primary">{stats.completedClasses}</div>
              <div className="text-sm text-text-secondary">완료한 수업</div>
            </div>
          </Card>

          <Card className="flex items-center gap-4">
            <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
              <Clock className="text-purple-500 dark:text-purple-400" size={24} />
            </div>
            <div>
              <div className="text-2xl font-bold text-text-primary">{stats.studyHours}h</div>
              <div className="text-sm text-text-secondary">학습 시간</div>
            </div>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Upcoming Class */}
            {upcomingClass && (
              <Card>
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h2 className="text-xl font-bold text-text-primary mb-1">다음 수업</h2>
                    <p className="text-sm text-text-secondary">곧 시작할 수업이 있어요</p>
                  </div>
                  <Calendar className="text-primary" size={24} />
                </div>
                <div className="bg-gradient-to-br from-primary-50 to-pink-50 dark:from-primary-900/30 dark:to-pink-900/30 rounded-lg p-6 border border-primary-light dark:border-primary-subtle">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-xl font-bold text-text-primary mb-2">{upcomingClass.subject}</h3>
                      <p className="text-text-primary mb-4">
                        {new Date(upcomingClass.scheduledAt).toLocaleString('ko-KR', {
                          month: 'long',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </p>
                      <div className="flex gap-2">
                        <Link to="/tutoring/classroom">
                          <Button variant="primary">수업 입장하기</Button>
                        </Link>
                        <Link to="/tutoring/schedule">
                          <Button variant="outline">일정 보기</Button>
                        </Link>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-text-secondary">수업 시간</div>
                      <div className="text-2xl font-bold text-primary">
                        {upcomingClass.duration}분
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            )}

            {/* Performance Chart */}
            <Card>
              <h2 className="text-xl font-bold text-text-primary mb-4">성적 추이</h2>
              <div className="h-64">
                <Line data={chartData} options={chartOptions} />
              </div>
              <div className="mt-6 grid grid-cols-5 gap-4">
                {mockGrades.map((grade) => (
                  <div key={grade.subject} className="text-center">
                    <div className="text-2xl font-bold text-primary">
                      {grade.percentile}
                    </div>
                    <div className="text-sm text-text-secondary">{grade.subject}</div>
                    <div className="text-xs text-text-tertiary">{grade.score}점</div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Study Goals */}
            <Card>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-text-primary">이번 주 학습 목표</h2>
                <Award className="text-accent" size={24} />
              </div>
              <div className="space-y-4">
                {[
                  { subject: '수학', target: '미적분 3단원 완료', progress: 80 },
                  { subject: '영어', target: '어휘 200개 암기', progress: 65 },
                  { subject: '국어', target: '고전문학 5편 분석', progress: 100 },
                ].map((goal, index) => (
                  <div key={index}>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="font-medium text-text-primary">{goal.subject}: {goal.target}</span>
                      <span className="text-text-secondary">{goal.progress}%</span>
                    </div>
                    <div className="w-full bg-border-subtle dark:bg-border rounded-full h-2">
                      <div
                        className="bg-secondary h-2 rounded-full transition-all duration-300"
                        style={{ width: `${goal.progress}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* AI Recommendations */}
            <Card>
              <h3 className="font-bold text-text-primary mb-4 flex items-center gap-2">
                <Target className="text-primary" size={20} />
                AI 추천
              </h3>
              <div className="space-y-3">
                <div className="p-3 bg-blue-50 dark:bg-blue-900/30 rounded-lg border border-blue-200 dark:border-blue-800">
                  <div className="text-sm font-medium text-text-primary mb-1">수학 집중 학습</div>
                  <div className="text-xs text-text-secondary">
                    최근 성적이 하락했어요. 미적분 보충이 필요합니다.
                  </div>
                </div>
                <div className="p-3 bg-green-50 dark:bg-green-900/30 rounded-lg border border-green-200 dark:border-green-800">
                  <div className="text-sm font-medium text-text-primary mb-1">영어 단어 암기</div>
                  <div className="text-xs text-text-secondary">
                    매일 30분씩 꾸준히 학습하면 다음 모의고사 90점 이상 가능!
                  </div>
                </div>
              </div>
              <Link to="/consulting/ai-analysis">
                <Button variant="outline" size="sm" fullWidth className="mt-4">
                  전체 분석 보기 <ArrowRight size={16} className="ml-1" />
                </Button>
              </Link>
            </Card>

            {/* Notifications */}
            <Card>
              <h3 className="font-bold text-text-primary mb-4 flex items-center gap-2">
                <Bell className="text-accent" size={20} />
                알림
              </h3>
              <div className="space-y-3">
                {[
                  { title: '새 과제가 등록되었어요', time: '10분 전' },
                  { title: '커뮤니티에 댓글이 달렸어요', time: '1시간 전' },
                  { title: '다음 수업까지 3시간', time: '2시간 전' },
                ].map((notif, index) => (
                  <div key={index} className="flex justify-between items-start">
                    <div className="text-sm text-text-primary">{notif.title}</div>
                    <div className="text-xs text-text-tertiary">{notif.time}</div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Community Preview */}
            <Card>
              <h3 className="font-bold text-text-primary mb-4">커뮤니티 인기글</h3>
              <div className="space-y-3">
                {[
                  '서울대 합격 수기',
                  '수학 공부법 공유',
                  '모의고사 후기',
                ].map((title, index) => (
                  <div
                    key={index}
                    className="text-sm text-text-primary hover:text-primary cursor-pointer transition-colors"
                  >
                    • {title}
                  </div>
                ))}
              </div>
              <Link to="/community">
                <Button variant="ghost" size="sm" fullWidth className="mt-4">
                  커뮤니티 가기
                </Button>
              </Link>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};
