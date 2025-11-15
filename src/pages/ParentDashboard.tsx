import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
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
import { mockGrades } from '../services/mockData';

export const ParentDashboard = () => {
  const childName = '김학생';

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            학부모 대시보드
          </h1>
          <p className="text-gray-600 mt-2">자녀의 학습 현황을 한눈에 확인하세요</p>
        </div>

        {/* Child Selector */}
        <div className="mb-6">
          <Card padding="sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Users className="text-primary-500" size={24} />
                <div>
                  <div className="text-sm text-gray-600">현재 보고 있는 자녀</div>
                  <div className="font-bold text-lg">{childName}</div>
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
              <BookOpen className="text-primary-500" size={20} />
              <span className="text-sm text-gray-600">이번 주 학습</span>
            </div>
            <div className="text-2xl font-bold">24시간</div>
            <div className="text-xs text-secondary-500 mt-1">↑ 지난주 대비 +3h</div>
          </Card>

          <Card>
            <div className="flex items-center gap-3 mb-2">
              <TrendingUp className="text-secondary-500" size={20} />
              <span className="text-sm text-gray-600">평균 성적</span>
            </div>
            <div className="text-2xl font-bold">87.5점</div>
            <div className="text-xs text-secondary-500 mt-1">백분위 88%</div>
          </Card>

          <Card>
            <div className="flex items-center gap-3 mb-2">
              <Calendar className="text-accent-500" size={20} />
              <span className="text-sm text-gray-600">완료한 수업</span>
            </div>
            <div className="text-2xl font-bold">42회</div>
            <div className="text-xs text-gray-600 mt-1">이번 달</div>
          </Card>

          <Card>
            <div className="flex items-center gap-3 mb-2">
              <DollarSign className="text-purple-500" size={20} />
              <span className="text-sm text-gray-600">이번 달 결제</span>
            </div>
            <div className="text-2xl font-bold">₩149,000</div>
            <div className="text-xs text-gray-600 mt-1">프리미엄 플랜</div>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Academic Performance */}
            <Card>
              <h2 className="text-xl font-bold mb-4">과목별 성적</h2>
              <div className="space-y-4">
                {mockGrades.map((grade) => (
                  <div key={grade.subject}>
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium">{grade.subject}</span>
                      <div className="flex items-center gap-4">
                        <span className="text-sm text-gray-600">
                          {grade.score}점
                        </span>
                        <span className="text-sm font-medium text-primary-500">
                          상위 {100 - grade.percentile}%
                        </span>
                      </div>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-primary-500 h-2 rounded-full"
                        style={{ width: `${grade.percentile}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Weekly Schedule */}
            <Card>
              <h2 className="text-xl font-bold mb-4">이번 주 수업 일정</h2>
              <div className="space-y-3">
                {[
                  { day: '월요일', subject: '수학', time: '18:00', tutor: '김수학' },
                  { day: '수요일', subject: '영어', time: '17:00', tutor: '이영어' },
                  { day: '금요일', subject: '수학', time: '18:00', tutor: '김수학' },
                  { day: '토요일', subject: '국어', time: '14:00', tutor: '박국어' },
                ].map((schedule, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="text-center">
                        <div className="text-xs text-gray-600">{schedule.day}</div>
                        <div className="font-bold">{schedule.time}</div>
                      </div>
                      <div className="h-10 w-px bg-gray-300" />
                      <div>
                        <div className="font-medium">{schedule.subject}</div>
                        <div className="text-sm text-gray-600">{schedule.tutor} 선생님</div>
                      </div>
                    </div>
                    <Clock className="text-gray-400" size={20} />
                  </div>
                ))}
              </div>
            </Card>

            {/* Tutor Feedback */}
            <Card>
              <h2 className="text-xl font-bold mb-4">튜터 피드백</h2>
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
                  <div key={index} className="p-4 bg-blue-50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <MessageSquare className="text-blue-500" size={16} />
                        <span className="font-medium">{feedback.subject} - {feedback.tutor}</span>
                      </div>
                      <span className="text-xs text-gray-600">{feedback.date}</span>
                    </div>
                    <p className="text-sm text-gray-700">{feedback.feedback}</p>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Learning Summary */}
            <Card>
              <h3 className="font-bold mb-4 flex items-center gap-2">
                <Award className="text-primary-500" size={20} />
                이번 달 성과
              </h3>
              <div className="space-y-3">
                <div className="p-3 bg-gradient-to-br from-primary-50 to-secondary-50 rounded-lg">
                  <div className="text-sm text-gray-600 mb-1">학습 목표 달성률</div>
                  <div className="text-2xl font-bold text-primary-500">85%</div>
                </div>
                <div className="p-3 bg-gradient-to-br from-secondary-50 to-accent-50 rounded-lg">
                  <div className="text-sm text-gray-600 mb-1">수업 출석률</div>
                  <div className="text-2xl font-bold text-secondary-500">100%</div>
                </div>
                <div className="p-3 bg-gradient-to-br from-accent-50 to-purple-50 rounded-lg">
                  <div className="text-sm text-gray-600 mb-1">과제 완료율</div>
                  <div className="text-2xl font-bold text-accent-500">92%</div>
                </div>
              </div>
            </Card>

            {/* Payment Info */}
            <Card>
              <h3 className="font-bold mb-4">구독 정보</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">현재 플랜</span>
                  <span className="font-medium">프리미엄</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">다음 결제일</span>
                  <span className="font-medium">2024-12-20</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">결제 금액</span>
                  <span className="font-medium">₩149,000</span>
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
              <h3 className="font-bold mb-4">빠른 메뉴</h3>
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
  );
};
