import { useAuth } from '../contexts/AuthContext';
import { motion } from 'framer-motion';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { Input } from '../components/common/Input';
import { PageTransition } from '../components/common/PageTransition';
import { staggerContainerVariants, staggerItemVariants } from '../utils/animations';
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
    <PageTransition>
      <div className="min-h-screen bg-bg-base py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-text-primary mb-2">마이페이지</h1>
            <p className="text-text-secondary">프로필 및 설정 관리</p>
          </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card animate delay={0.1}>
              <div className="text-center mb-6">
                <img
                  src={user?.avatar}
                  alt={user?.name}
                  className="w-24 h-24 rounded-full mx-auto mb-4 border-2 border-border"
                />
                <h2 className="text-xl font-bold text-text-primary">{user?.name}</h2>
                <p className="text-sm text-text-secondary">{user?.email}</p>
                <span className="inline-block mt-2 px-3 py-1 bg-primary-light dark:bg-primary-subtle text-primary border border-primary-light dark:border-primary-subtle text-sm rounded-full">
                  {user?.role === 'student' ? '학생' :
                   user?.role === 'parent' ? '학부모' : '튜터'}
                </span>
              </div>

              <motion.div
                className="space-y-2"
                variants={staggerContainerVariants}
                initial="hidden"
                animate="visible"
              >
                {[
                  { icon: User, label: '프로필 정보', active: true },
                  { icon: CreditCard, label: '구독 및 결제', active: false },
                  { icon: Bell, label: '알림 설정', active: false },
                  { icon: Shield, label: '보안 및 개인정보', active: false },
                  { icon: Settings, label: '환경 설정', active: false },
                ].map((item, index) => (
                  <motion.button
                    key={index}
                    variants={staggerItemVariants}
                    className={`w-full text-left px-4 py-3 rounded-lg font-medium transition-all ${
                      item.active
                        ? 'bg-primary-light dark:bg-primary-subtle text-primary'
                        : 'text-text-secondary hover:bg-bg-subtle hover:text-text-primary'
                    }`}
                    whileHover={{ x: 4 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <item.icon className="inline mr-2" size={18} />
                    {item.label}
                  </motion.button>
                ))}
              </motion.div>
            </Card>
          </div>

          {/* Main Content */}
          <motion.div
            className="lg:col-span-2 space-y-6"
            variants={staggerContainerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Profile Info */}
            <motion.div variants={staggerItemVariants}>
              <Card>
                <h2 className="text-xl font-bold text-text-primary mb-6">프로필 정보</h2>
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
            </motion.div>

            {/* Subscription */}
            <motion.div variants={staggerItemVariants}>
              <Card>
                <h2 className="text-xl font-bold text-text-primary mb-6">구독 정보</h2>

                <div className="bg-gradient-to-br from-primary-50 to-secondary-50 dark:from-primary-900/30 dark:to-secondary-900/30 rounded-lg p-6 mb-6 border border-primary-light dark:border-primary-subtle">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-2xl font-bold text-text-primary mb-1">{currentPlan?.name} 플랜</h3>
                      <p className="text-text-secondary mb-4">모든 기능을 무제한으로 이용하세요</p>
                      <div className="space-y-2">
                        <div className="flex justify-between gap-8">
                          <span className="text-sm text-text-tertiary">다음 결제일</span>
                          <span className="font-medium text-text-primary">2024-12-20</span>
                        </div>
                        <div className="flex justify-between gap-8">
                          <span className="text-sm text-text-tertiary">결제 금액</span>
                          <span className="font-medium text-text-primary">₩{currentPlan?.price.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-3xl font-bold text-primary">
                        ₩{currentPlan?.price.toLocaleString()}
                      </div>
                      <div className="text-sm text-text-tertiary">/월</div>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="font-bold text-text-primary mb-3">포함된 기능</h3>
                  {currentPlan?.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-2 text-sm text-text-secondary">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                      {feature}
                    </div>
                  ))}
                </div>

                <div className="flex gap-2 mt-6 pt-6 border-t border-border">
                  <Button variant="outline">플랜 변경</Button>
                  <Button variant="ghost" className="text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20">
                    구독 취소
                  </Button>
                </div>
              </Card>
            </motion.div>

            {/* Payment History */}
            <motion.div variants={staggerItemVariants}>
              <Card>
                <h2 className="text-xl font-bold text-text-primary mb-6">결제 내역</h2>
                <div className="space-y-3">
                  {[
                    { date: '2024-11-20', amount: 149000, status: '완료' },
                    { date: '2024-10-20', amount: 149000, status: '완료' },
                    { date: '2024-09-20', amount: 149000, status: '완료' },
                  ].map((payment, index) => (
                    <motion.div
                      key={index}
                      className="flex items-center justify-between p-4 bg-bg-subtle rounded-lg border border-border hover:border-border-strong transition-colors"
                      whileHover={{ x: 4 }}
                    >
                      <div>
                        <div className="font-medium text-text-primary">{currentPlan?.name} 플랜</div>
                        <div className="text-sm text-text-tertiary">{payment.date}</div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-text-primary">₩{payment.amount.toLocaleString()}</div>
                        <div className="text-sm text-green-600 dark:text-green-400">{payment.status}</div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </Card>
            </motion.div>
          </motion.div>
        </div>
        </div>
      </div>
    </PageTransition>
  );
};
