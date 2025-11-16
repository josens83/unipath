import { useState } from 'react';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import {
  Users,
  DollarSign,
  TrendingUp,
  BookOpen,
  UserCheck,
  Ban,
  Search,
  Filter,
} from 'lucide-react';
import { Line, Doughnut } from 'react-chartjs-2';

export const AdminDashboard = () => {
  const [timeRange, setTimeRange] = useState<'week' | 'month' | 'year'>('month');

  const stats = {
    totalUsers: 15234,
    activeUsers: 12891,
    totalRevenue: 45780000,
    monthlyRevenue: 8950000,
    totalClasses: 23456,
    activeTutors: 342,
  };

  const revenueData = {
    labels: ['1월', '2월', '3월', '4월', '5월', '6월'],
    datasets: [
      {
        label: '월간 매출',
        data: [7200000, 7800000, 8100000, 8400000, 8700000, 8950000],
        borderColor: '#4F46E5',
        backgroundColor: 'rgba(79, 70, 229, 0.1)',
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const userDistribution = {
    labels: ['학생', '학부모', '튜터'],
    datasets: [
      {
        data: [8234, 5892, 1108],
        backgroundColor: ['#4F46E5', '#10B981', '#F59E0B'],
        borderWidth: 0,
      },
    ],
  };

  const recentUsers = [
    {
      id: '1',
      name: '김학생',
      email: 'student@example.com',
      role: '학생',
      status: 'active',
      joinedAt: '2024-12-10',
    },
    {
      id: '2',
      name: '이학부모',
      email: 'parent@example.com',
      role: '학부모',
      status: 'active',
      joinedAt: '2024-12-09',
    },
    {
      id: '3',
      name: '박튜터',
      email: 'tutor@example.com',
      role: '튜터',
      status: 'pending',
      joinedAt: '2024-12-08',
    },
  ];

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">관리자 대시보드</h1>
          <p className="text-gray-600">플랫폼 전체 현황 및 관리</p>
        </div>

        {/* Time Range Selector */}
        <div className="mb-6 flex gap-2">
          {(['week', 'month', 'year'] as const).map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                timeRange === range
                  ? 'bg-primary-500 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              {range === 'week' ? '주간' : range === 'month' ? '월간' : '연간'}
            </button>
          ))}
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <div className="flex items-center gap-3 mb-2">
              <Users className="text-primary-500" size={20} />
              <span className="text-sm text-gray-600">전체 사용자</span>
            </div>
            <div className="text-2xl font-bold">{stats.totalUsers.toLocaleString()}</div>
            <div className="text-xs text-secondary-500 mt-1">
              활성: {stats.activeUsers.toLocaleString()}
            </div>
          </Card>

          <Card>
            <div className="flex items-center gap-3 mb-2">
              <DollarSign className="text-secondary-500" size={20} />
              <span className="text-sm text-gray-600">월간 매출</span>
            </div>
            <div className="text-2xl font-bold">₩{(stats.monthlyRevenue / 1000000).toFixed(1)}M</div>
            <div className="text-xs text-secondary-500 mt-1">↑ 전월 대비 +8.3%</div>
          </Card>

          <Card>
            <div className="flex items-center gap-3 mb-2">
              <BookOpen className="text-accent-500" size={20} />
              <span className="text-sm text-gray-600">총 수업</span>
            </div>
            <div className="text-2xl font-bold">{stats.totalClasses.toLocaleString()}회</div>
            <div className="text-xs text-gray-500 mt-1">누적</div>
          </Card>

          <Card>
            <div className="flex items-center gap-3 mb-2">
              <UserCheck className="text-purple-500" size={20} />
              <span className="text-sm text-gray-600">활성 튜터</span>
            </div>
            <div className="text-2xl font-bold">{stats.activeTutors}</div>
            <div className="text-xs text-gray-500 mt-1">승인 완료</div>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Revenue Chart */}
            <Card>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold">매출 추이</h2>
                <TrendingUp className="text-primary-500" size={24} />
              </div>
              <div className="h-64">
                <Line data={revenueData} options={chartOptions} />
              </div>
            </Card>

            {/* Recent Users */}
            <Card>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold">최근 가입 사용자</h2>
                <div className="flex gap-2">
                  <button className="p-2 hover:bg-gray-100 rounded-lg">
                    <Search size={20} />
                  </button>
                  <button className="p-2 hover:bg-gray-100 rounded-lg">
                    <Filter size={20} />
                  </button>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">
                        이름
                      </th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">
                        이메일
                      </th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">
                        역할
                      </th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">
                        상태
                      </th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">
                        가입일
                      </th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">
                        작업
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentUsers.map((user) => (
                      <tr key={user.id} className="border-b hover:bg-gray-50">
                        <td className="py-3 px-4 font-medium">{user.name}</td>
                        <td className="py-3 px-4 text-sm text-gray-600">{user.email}</td>
                        <td className="py-3 px-4">
                          <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
                            {user.role}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <span
                            className={`px-2 py-1 text-xs rounded-full ${
                              user.status === 'active'
                                ? 'bg-green-100 text-green-700'
                                : 'bg-yellow-100 text-yellow-700'
                            }`}
                          >
                            {user.status === 'active' ? '활성' : '대기'}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-sm text-gray-600">{user.joinedAt}</td>
                        <td className="py-3 px-4">
                          <div className="flex gap-2">
                            {user.status === 'pending' && (
                              <button className="p-1 text-green-600 hover:bg-green-50 rounded">
                                <UserCheck size={18} />
                              </button>
                            )}
                            <button className="p-1 text-red-600 hover:bg-red-50 rounded">
                              <Ban size={18} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* User Distribution */}
            <Card>
              <h3 className="font-bold mb-4">사용자 분포</h3>
              <div className="h-48 flex items-center justify-center">
                <Doughnut data={userDistribution} options={chartOptions} />
              </div>
              <div className="mt-4 space-y-2">
                {['학생', '학부모', '튜터'].map((role, index) => (
                  <div key={role} className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{
                          backgroundColor: ['#4F46E5', '#10B981', '#F59E0B'][index],
                        }}
                      />
                      <span>{role}</span>
                    </div>
                    <span className="font-medium">
                      {[8234, 5892, 1108][index].toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>
            </Card>

            {/* Quick Actions */}
            <Card>
              <h3 className="font-bold mb-4">빠른 작업</h3>
              <div className="space-y-2">
                <Button variant="primary" fullWidth className="justify-start">
                  <Users className="mr-2" size={18} />
                  사용자 관리
                </Button>
                <Button variant="outline" fullWidth className="justify-start">
                  <UserCheck className="mr-2" size={18} />
                  튜터 승인
                </Button>
                <Button variant="outline" fullWidth className="justify-start">
                  <DollarSign className="mr-2" size={18} />
                  매출 관리
                </Button>
                <Button variant="outline" fullWidth className="justify-start">
                  <BookOpen className="mr-2" size={18} />
                  수업 관리
                </Button>
              </div>
            </Card>

            {/* System Status */}
            <Card>
              <h3 className="font-bold mb-4">시스템 상태</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">서버 상태</span>
                  <span className="flex items-center gap-2 text-sm">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                    정상
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">DB 연결</span>
                  <span className="flex items-center gap-2 text-sm">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                    정상
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">API 응답</span>
                  <span className="text-sm font-medium">~45ms</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};
