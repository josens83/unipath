import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import {
  DollarSign,
  TrendingUp,
  Calendar,
  Users,
  Clock,
  Award,
  BookOpen,
  MessageSquare,
  Star,
} from 'lucide-react';
import { Line } from 'react-chartjs-2';
import { mockClasses } from '../services/mockData';

export const TutorDashboard = () => {
  const stats = {
    monthlyEarnings: 2450000,
    totalStudents: 15,
    completedClasses: 42,
    averageRating: 4.9,
    upcomingClasses: 8,
  };

  const earningsData = {
    labels: ['1주', '2주', '3주', '4주'],
    datasets: [
      {
        label: '주간 수익',
        data: [580000, 620000, 590000, 660000],
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
        ticks: {
          callback: (value: string | number) => {
            const numValue = typeof value === 'string' ? parseFloat(value) : value;
            return `₩${(numValue / 1000).toFixed(0)}k`;
          },
        },
      },
    },
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">튜터 대시보드</h1>
          <p className="text-gray-600">수업 관리 및 수익 현황</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          <Card>
            <div className="flex items-center gap-3 mb-2">
              <DollarSign className="text-primary-500" size={20} />
              <span className="text-sm text-gray-600">이번 달 수익</span>
            </div>
            <div className="text-2xl font-bold">₩{stats.monthlyEarnings.toLocaleString()}</div>
            <div className="text-xs text-secondary-500 mt-1">↑ 지난달 대비 +12%</div>
          </Card>

          <Card>
            <div className="flex items-center gap-3 mb-2">
              <Users className="text-secondary-500" size={20} />
              <span className="text-sm text-gray-600">총 학생 수</span>
            </div>
            <div className="text-2xl font-bold">{stats.totalStudents}명</div>
            <div className="text-xs text-gray-500 mt-1">활성 학생</div>
          </Card>

          <Card>
            <div className="flex items-center gap-3 mb-2">
              <BookOpen className="text-accent-500" size={20} />
              <span className="text-sm text-gray-600">완료한 수업</span>
            </div>
            <div className="text-2xl font-bold">{stats.completedClasses}회</div>
            <div className="text-xs text-gray-500 mt-1">이번 달</div>
          </Card>

          <Card>
            <div className="flex items-center gap-3 mb-2">
              <Star className="text-yellow-500" size={20} />
              <span className="text-sm text-gray-600">평균 평점</span>
            </div>
            <div className="text-2xl font-bold">{stats.averageRating}</div>
            <div className="text-xs text-gray-500 mt-1">5.0 만점</div>
          </Card>

          <Card>
            <div className="flex items-center gap-3 mb-2">
              <Calendar className="text-purple-500" size={20} />
              <span className="text-sm text-gray-600">예정된 수업</span>
            </div>
            <div className="text-2xl font-bold">{stats.upcomingClasses}회</div>
            <div className="text-xs text-gray-500 mt-1">이번 주</div>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Earnings Chart */}
            <Card>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold">주간 수익 추이</h2>
                <TrendingUp className="text-primary-500" size={24} />
              </div>
              <div className="h-64">
                <Line data={earningsData} options={chartOptions} />
              </div>
            </Card>

            {/* Upcoming Classes */}
            <Card>
              <h2 className="text-xl font-bold mb-4">다가오는 수업</h2>
              <div className="space-y-3">
                {mockClasses.map((classItem) => (
                  <div
                    key={classItem.id}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                        <BookOpen className="text-primary-500" size={24} />
                      </div>
                      <div>
                        <h3 className="font-bold">{classItem.subject}</h3>
                        <p className="text-sm text-gray-600">
                          {new Date(classItem.scheduledAt).toLocaleString('ko-KR', {
                            month: 'short',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <div className="text-sm text-gray-600">수업 시간</div>
                        <div className="font-bold">{classItem.duration}분</div>
                      </div>
                      <Button variant="outline" size="sm">
                        준비
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Students List */}
            <Card>
              <h2 className="text-xl font-bold mb-4">내 학생 목록</h2>
              <div className="space-y-3">
                {[
                  { name: '김학생', subject: '수학', sessions: 12, lastClass: '2일 전' },
                  { name: '이학생', subject: '영어', sessions: 8, lastClass: '3일 전' },
                  { name: '박학생', subject: '수학', sessions: 15, lastClass: '1일 전' },
                  { name: '최학생', subject: '물리', sessions: 6, lastClass: '4일 전' },
                ].map((student, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 border rounded-lg hover:border-primary-300 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <img
                        src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${student.name}`}
                        alt={student.name}
                        className="w-12 h-12 rounded-full"
                      />
                      <div>
                        <h3 className="font-bold">{student.name}</h3>
                        <p className="text-sm text-gray-600">{student.subject}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-gray-600">총 {student.sessions}회 수업</div>
                      <div className="text-xs text-gray-500">마지막 수업: {student.lastClass}</div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card>
              <h3 className="font-bold mb-4">빠른 작업</h3>
              <div className="space-y-2">
                <Button variant="primary" fullWidth className="justify-start">
                  <Calendar className="mr-2" size={18} />
                  일정 관리
                </Button>
                <Button variant="outline" fullWidth className="justify-start">
                  <MessageSquare className="mr-2" size={18} />
                  학생 메시지
                </Button>
                <Button variant="outline" fullWidth className="justify-start">
                  <Award className="mr-2" size={18} />
                  수업 자료
                </Button>
              </div>
            </Card>

            {/* This Week */}
            <Card>
              <h3 className="font-bold mb-4">이번 주 요약</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">예정된 수업</span>
                  <span className="font-bold text-primary-500">8회</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">예상 수익</span>
                  <span className="font-bold text-secondary-500">₩640,000</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">총 수업 시간</span>
                  <span className="font-bold">480분</span>
                </div>
              </div>
            </Card>

            {/* Recent Reviews */}
            <Card>
              <h3 className="font-bold mb-4">최근 리뷰</h3>
              <div className="space-y-4">
                {[
                  {
                    student: '김학생',
                    rating: 5,
                    comment: '설명이 정말 이해하기 쉬웠어요!',
                    date: '2일 전',
                  },
                  {
                    student: '이학생',
                    rating: 5,
                    comment: '덕분에 성적이 많이 올랐습니다.',
                    date: '5일 전',
                  },
                ].map((review, index) => (
                  <div key={index} className="p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-sm">{review.student}</span>
                      <div className="flex">
                        {[...Array(review.rating)].map((_, i) => (
                          <Star key={i} size={14} className="text-yellow-500 fill-yellow-500" />
                        ))}
                      </div>
                    </div>
                    <p className="text-xs text-gray-600 mb-1">{review.comment}</p>
                    <span className="text-xs text-gray-500">{review.date}</span>
                  </div>
                ))}
              </div>
            </Card>

            {/* Availability */}
            <Card>
              <h3 className="font-bold mb-4 flex items-center gap-2">
                <Clock className="text-primary-500" size={20} />
                수업 가능 시간
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">월요일</span>
                  <span className="font-medium">18:00 - 22:00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">수요일</span>
                  <span className="font-medium">18:00 - 22:00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">금요일</span>
                  <span className="font-medium">18:00 - 22:00</span>
                </div>
              </div>
              <Button variant="outline" size="sm" fullWidth className="mt-4">
                시간 설정 변경
              </Button>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};
