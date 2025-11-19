import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { PageTransition } from '../components/common/PageTransition';
import { CheckCircle, CreditCard, Lock, ArrowLeft } from 'lucide-react';
import { pricingPlans } from '../services/mockData';
import { paymentService } from '../services/payment';
import { useAuth } from '../contexts/AuthContext';
import type { PlanType } from '../types';

export const Pricing = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const [selectedPlan, setSelectedPlan] = useState<PlanType | null>(null);
  const [paymentStep, setPaymentStep] = useState<'select' | 'payment' | 'success'>('select');
  const [processing, setProcessing] = useState(false);

  const handleSelectPlan = (planId: PlanType) => {
    if (!isAuthenticated) {
      toast.error('로그인이 필요합니다.');
      navigate('/auth/login');
      return;
    }

    if (planId === 'free') {
      toast('이미 무료 플랜을 이용 중입니다.', { icon: 'ℹ️' });
      return;
    }

    setSelectedPlan(planId);
    setPaymentStep('payment');
  };

  const handlePayment = async () => {
    if (!user || !selectedPlan) return;

    setProcessing(true);

    try {
      const plan = pricingPlans.find(p => p.id === selectedPlan)!;
      const amount = Math.floor(plan.price * 1.1); // VAT 포함

      await paymentService.requestPayment({
        amount,
        orderId: paymentService.generateOrderId(),
        orderName: `${plan.name} 플랜 구독`,
        customerName: user.name,
        customerEmail: user.email,
        plan: selectedPlan,
      });
    } catch (error) {
      console.error('Payment error:', error);
      toast.error('결제 요청 중 오류가 발생했습니다.');
      setProcessing(false);
    }
  };

  if (paymentStep === 'success') {
    return (
      <div className="min-h-screen bg-bg-base flex items-center justify-center px-4 py-12">
        <Card className="max-w-md text-center">
          <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="text-green-500 dark:text-green-400" size={40} />
          </div>
          <h1 className="text-3xl font-bold text-text-primary mb-4">결제가 완료되었습니다!</h1>
          <p className="text-text-secondary mb-8">
            {pricingPlans.find(p => p.id === selectedPlan)?.name} 플랜이 활성화되었습니다.
            <br />
            이제 UniPath의 모든 기능을 이용하실 수 있습니다.
          </p>
          <div className="space-y-3">
            <Button variant="primary" fullWidth onClick={() => navigate('/dashboard')}>
              대시보드로 이동
            </Button>
            <Button variant="outline" fullWidth onClick={() => navigate('/')}>
              홈으로 이동
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  if (paymentStep === 'payment' && selectedPlan) {
    const plan = pricingPlans.find(p => p.id === selectedPlan)!;

    return (
      <div className="min-h-screen bg-bg-base px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <button
            onClick={() => setPaymentStep('select')}
            className="flex items-center gap-2 text-text-secondary hover:text-text-primary transition-colors mb-6"
          >
            <ArrowLeft size={20} />
            플랜 선택으로 돌아가기
          </button>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Order Summary */}
            <div className="lg:col-span-1">
              <Card>
                <h2 className="text-xl font-bold text-text-primary mb-4">주문 요약</h2>
                <div className="space-y-3">
                  <div className="pb-3 border-b border-border">
                    <div className="font-medium text-text-primary">{plan.name} 플랜</div>
                    <div className="text-sm text-text-secondary">월간 구독</div>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-secondary">월 이용료</span>
                    <span className="font-medium text-text-primary">₩{plan.price.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-secondary">VAT (10%)</span>
                    <span className="font-medium text-text-primary">₩{(plan.price * 0.1).toLocaleString()}</span>
                  </div>
                  <div className="pt-3 border-t border-border flex justify-between text-lg font-bold">
                    <span className="text-text-primary">총 결제금액</span>
                    <span className="text-primary">₩{(plan.price * 1.1).toLocaleString()}</span>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-primary-subtle rounded-lg border border-primary-light">
                  <div className="text-sm text-text-primary">
                    <div className="font-medium mb-2">포함된 기능</div>
                    <ul className="space-y-1">
                      {plan.features.slice(0, 3).map((feature, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <CheckCircle size={16} className="mt-0.5 flex-shrink-0 text-primary" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Card>
            </div>

            {/* Payment Form */}
            <div className="lg:col-span-2">
              <Card>
                <h2 className="text-xl font-bold text-text-primary mb-6">결제 정보</h2>

                <form className="space-y-6">
                  {/* Card Information */}
                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-2">
                      카드 번호
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="1234 5678 9012 3456"
                        className="w-full px-4 py-3 border border-border rounded-lg pl-12 bg-bg-base text-text-primary focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                        maxLength={19}
                      />
                      <CreditCard className="absolute left-4 top-3.5 text-text-quaternary" size={20} />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-text-primary mb-2">
                        유효기간
                      </label>
                      <input
                        type="text"
                        placeholder="MM/YY"
                        className="w-full px-4 py-3 border border-border rounded-lg bg-bg-base text-text-primary focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                        maxLength={5}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-text-primary mb-2">
                        CVC
                      </label>
                      <input
                        type="text"
                        placeholder="123"
                        className="w-full px-4 py-3 border border-border rounded-lg bg-bg-base text-text-primary focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                        maxLength={3}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-2">
                      카드 소유자 이름
                    </label>
                    <input
                      type="text"
                      placeholder="홍길동"
                      className="w-full px-4 py-3 border border-border rounded-lg bg-bg-base text-text-primary focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                    />
                  </div>

                  {/* Billing Information */}
                  <div className="pt-6 border-t border-border">
                    <h3 className="font-bold text-text-primary mb-4">청구 정보</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-text-primary mb-2">
                          이메일
                        </label>
                        <input
                          type="email"
                          placeholder="your@email.com"
                          className="w-full px-4 py-3 border border-border rounded-lg bg-bg-base text-text-primary focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-text-primary mb-2">
                          전화번호
                        </label>
                        <input
                          type="tel"
                          placeholder="010-0000-0000"
                          className="w-full px-4 py-3 border border-border rounded-lg bg-bg-base text-text-primary focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Terms */}
                  <div className="flex items-start gap-3 p-4 bg-bg-subtle rounded-lg border border-border-subtle">
                    <input type="checkbox" className="mt-1" id="terms" />
                    <label htmlFor="terms" className="text-sm text-text-primary">
                      <span className="font-medium">서비스 이용약관</span> 및{' '}
                      <span className="font-medium">개인정보처리방침</span>에 동의합니다.
                      매월 자동으로 결제되며, 언제든지 구독을 취소할 수 있습니다.
                    </label>
                  </div>

                  {/* Submit */}
                  <div className="pt-4">
                    <Button
                      type="button"
                      variant="primary"
                      fullWidth
                      size="lg"
                      onClick={handlePayment}
                      disabled={processing}
                      className="flex items-center justify-center gap-2"
                    >
                      <Lock size={20} />
                      {processing ? '결제 준비 중...' : `₩${(plan.price * 1.1).toLocaleString()} 결제하기`}
                    </Button>
                    <p className="text-xs text-center text-text-tertiary mt-3">
                      안전한 결제를 위해 토스페이먼츠 PG를 사용합니다
                    </p>
                  </div>
                </form>
              </Card>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Plan Selection View
  return (
    <PageTransition>
      <div className="min-h-screen bg-bg-base py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-text-primary mb-4">플랜 선택</h1>
          <p className="text-xl text-text-secondary">
            나에게 맞는 플랜을 선택하고 UniPath를 시작하세요
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {pricingPlans.map((plan) => (
            <Card
              key={plan.id}
              className={`relative ${plan.popular ? 'border-2 border-primary shadow-xl' : ''}`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-white px-6 py-1 rounded-full text-sm font-medium">
                  가장 인기있는 플랜
                </div>
              )}

              <div className="text-center mb-6 pt-4">
                <h3 className="text-2xl font-bold text-text-primary mb-3">{plan.name}</h3>
                <div className="mb-2">
                  {plan.price === 0 ? (
                    <div className="text-5xl font-bold text-text-primary">무료</div>
                  ) : (
                    <>
                      <span className="text-5xl font-bold text-primary">
                        ₩{plan.price.toLocaleString()}
                      </span>
                      <span className="text-text-secondary ml-2">/월</span>
                    </>
                  )}
                </div>
                {plan.price > 0 && (
                  <p className="text-sm text-text-tertiary">VAT 별도</p>
                )}
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle className="text-secondary flex-shrink-0 mt-0.5" size={20} />
                    <span className="text-text-primary">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                variant={plan.popular ? 'primary' : 'outline'}
                fullWidth
                size="lg"
                onClick={() => handleSelectPlan(plan.id)}
              >
                {plan.price === 0 ? '무료로 시작하기' : '플랜 선택하기'}
              </Button>
            </Card>
          ))}
        </div>

        {/* FAQ */}
        <Card className="mt-12">
          <h2 className="text-2xl font-bold text-text-primary mb-6 text-center">자주 묻는 질문</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                q: '언제든지 플랜을 변경할 수 있나요?',
                a: '네, 언제든지 플랜을 업그레이드하거나 다운그레이드할 수 있습니다. 변경사항은 다음 결제일부터 적용됩니다.',
              },
              {
                q: '구독을 취소하면 어떻게 되나요?',
                a: '구독을 취소하시면 현재 결제 기간이 끝날 때까지 서비스를 계속 이용하실 수 있습니다. 이후 자동으로 무료 플랜으로 전환됩니다.',
              },
              {
                q: '환불이 가능한가요?',
                a: '서비스 이용 후 7일 이내에는 전액 환불이 가능합니다. 이후에는 남은 기간에 대해 일할 계산하여 환불해드립니다.',
              },
              {
                q: '결제 수단은 무엇이 있나요?',
                a: '신용카드, 체크카드, 계좌이체 등 다양한 결제 수단을 지원합니다. 안전한 PG사를 통해 결제가 진행됩니다.',
              },
            ].map((faq, index) => (
              <div key={index}>
                <h3 className="font-bold text-text-primary mb-2">{faq.q}</h3>
                <p className="text-text-secondary text-sm">{faq.a}</p>
              </div>
            ))}
          </div>
        </Card>
        </div>
      </div>
    </PageTransition>
  );
};
