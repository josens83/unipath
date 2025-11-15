import { useAuth } from '../contexts/AuthContext';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { Input } from '../components/common/Input';
import {
  User,
  CreditCard,
  Settings,
  Bell,
  Shield,
} from 'lucide-react';
import { pricingPlans } from '../services/mockData';

export const MyPage = () => {
  const { user } = useAuth();

  const currentPlan = pricingPlans.find(p => p.id === 'premium');

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">마이페이지</h1>
          <p className="text-gray-600">프로필 및 설정 관리</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card>
              <div className="text-center mb-6">
                <img
                  src={user?.avatar}
                  alt={user?.name}
                  className="w-24 h-24 rounded-full mx-auto mb-4"
                />
                <h2 className="text-xl font-bold">{user?.name}</h2>
                <p className="text-sm text-gray-600">{user?.email}</p>
                <span className="inline-block mt-2 px-3 py-1 bg-primary-100 text-primary-700 text-sm rounded-full">
                  {user?.role === 'student' ? '학생' :
                   user?.role === 'parent' ? '학부모' : '튜터'}
                </span>
              </div>

              <div className="space-y-2">
                <button className="w-full text-left px-4 py-3 rounded-lg bg-primary-50 text-primary-700 font-medium">
                  <User className="inline mr-2" size={18} />
                  프로필 정보
                </button>
                <button className="w-full text-left px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100">
                  <CreditCard className="inline mr-2" size={18} />
                  구독 및 결제
                </button>
                <button className="w-full text-left px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100">
                  <Bell className="inline mr-2" size={18} />
                  알림 설정
                </button>
                <button className="w-full text-left px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100">
                  <Shield className="inline mr-2" size={18} />
                  보안 및 개인정보
                </button>
                <button className="w-full text-left px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100">
                  <Settings className="inline mr-2" size={18} />
                  환경 설정
                </button>
              </div>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Profile Info */}
            <Card>
              <h2 className="text-xl font-bold mb-6">프로필 정보</h2>
              <div className="space-y-4">
                <Input
                  label="이름"
                  defaultValue={user?.name}
                  fullWidth
                />
                <Input
                  label="이메일"
                  type="email"
                  defaultValue={user?.email}
                  fullWidth
                />
                <Input
                  label="전화번호"
                  type="tel"
                  placeholder="010-0000-0000"
                  fullWidth
                />
                {user?.role === 'student' && (
                  <Input
                    label="학교"
                    defaultValue="대한고등학교"
                    fullWidth
                  />
                )}

                <div className="flex gap-2 pt-4">
                  <Button variant="primary">변경사항 저장</Button>
                  <Button variant="outline">취소</Button>
                </div>
              </div>
            </Card>

            {/* Subscription */}
            <Card>
              <h2 className="text-xl font-bold mb-6">구독 정보</h2>

              <div className="bg-gradient-to-br from-primary-50 to-secondary-50 rounded-lg p-6 mb-6">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-2xl font-bold mb-1">{currentPlan?.name} 플랜</h3>
                    <p className="text-gray-600 mb-4">모든 기능을 무제한으로 이용하세요</p>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">다음 결제일</span>
                        <span className="font-medium">2024-12-20</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">결제 금액</span>
                        <span className="font-medium">₩{currentPlan?.price.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-primary-500">
                      ₩{currentPlan?.price.toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-600">/월</div>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="font-bold mb-3">포함된 기능</h3>
                {currentPlan?.features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-2 text-sm text-gray-700">
                    <div className="w-1.5 h-1.5 bg-primary-500 rounded-full" />
                    {feature}
                  </div>
                ))}
              </div>

              <div className="flex gap-2 mt-6 pt-6 border-t">
                <Button variant="outline">플랜 변경</Button>
                <Button variant="ghost" className="text-red-600 hover:bg-red-50">
                  구독 취소
                </Button>
              </div>
            </Card>

            {/* Payment History */}
            <Card>
              <h2 className="text-xl font-bold mb-6">결제 내역</h2>
              <div className="space-y-3">
                {[
                  { date: '2024-11-20', amount: 149000, status: '완료' },
                  { date: '2024-10-20', amount: 149000, status: '완료' },
                  { date: '2024-09-20', amount: 149000, status: '완료' },
                ].map((payment, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                  >
                    <div>
                      <div className="font-medium">{currentPlan?.name} 플랜</div>
                      <div className="text-sm text-gray-600">{payment.date}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold">₩{payment.amount.toLocaleString()}</div>
                      <div className="text-sm text-green-600">{payment.status}</div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};
