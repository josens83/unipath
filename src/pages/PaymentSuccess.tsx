import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import { CheckCircle, ArrowRight } from 'lucide-react';
import { Button } from '../components/common/Button';
import { Card } from '../components/common/Card';
import { paymentService } from '../services/payment';
import { paymentAPI } from '../services/api';
import { useAuth } from '../contexts/AuthContext';
import toast from 'react-hot-toast';

export const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [processing, setProcessing] = useState(true);
  const [paymentInfo, setPaymentInfo] = useState<{
    orderId: string;
    amount: number;
    orderName: string;
  } | null>(null);

  useEffect(() => {
    const confirmPayment = async () => {
      const paymentKey = searchParams.get('paymentKey');
      const orderId = searchParams.get('orderId');
      const amount = searchParams.get('amount');

      if (!paymentKey || !orderId || !amount) {
        toast.error('잘못된 결제 정보입니다.');
        navigate('/pricing');
        return;
      }

      try {
        // 1. 토스페이먼츠 결제 승인
        const result = await paymentService.confirmPayment(
          paymentKey,
          orderId,
          parseInt(amount)
        );

        if (!result.success) {
          throw new Error(result.error);
        }

        // 2. 서버에 결제 정보 저장 (Mock API)
        if (user) {
          await paymentAPI.createPayment({
            userId: user.id,
            plan: 'premium', // URL에서 plan 정보를 받아야 하지만 여기서는 premium으로 고정
            amount: parseInt(amount),
            method: 'card',
          });
        }

        setPaymentInfo({
          orderId,
          amount: parseInt(amount),
          orderName: '유료 플랜 구독',
        });

        toast.success('결제가 완료되었습니다!');
      } catch (error) {
        toast.error(error instanceof Error ? error.message : '결제 처리 중 오류가 발생했습니다.');
        navigate('/pricing');
      } finally {
        setProcessing(false);
      }
    };

    confirmPayment();
  }, [searchParams, navigate, user]);

  if (processing) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Card className="max-w-md w-full">
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto mb-4"></div>
            <p className="text-gray-600">결제를 처리 중입니다...</p>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-12">
      <div className="max-w-md w-full">
        <Card>
          <div className="text-center py-8">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle className="w-10 h-10 text-green-600" />
              </div>
            </div>

            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              결제가 완료되었습니다!
            </h1>
            <p className="text-gray-600 mb-8">
              UniPath Premium 서비스를 이용하실 수 있습니다.
            </p>

            {paymentInfo && (
              <div className="bg-gray-50 rounded-lg p-6 mb-8 text-left">
                <h3 className="font-semibold text-gray-900 mb-4">결제 정보</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">주문번호</span>
                    <span className="font-medium text-gray-900">{paymentInfo.orderId}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">상품명</span>
                    <span className="font-medium text-gray-900">{paymentInfo.orderName}</span>
                  </div>
                  <div className="flex justify-between border-t pt-3">
                    <span className="text-gray-600">결제금액</span>
                    <span className="font-bold text-primary-600">
                      {paymentInfo.amount.toLocaleString()}원
                    </span>
                  </div>
                </div>
              </div>
            )}

            <div className="space-y-3">
              <Button
                variant="primary"
                fullWidth
                onClick={() => navigate('/dashboard')}
                className="flex items-center justify-center gap-2"
              >
                대시보드로 이동
                <ArrowRight className="w-4 h-4" />
              </Button>

              <Link to="/mypage" className="block">
                <Button variant="outline" fullWidth>
                  구독 관리
                </Button>
              </Link>
            </div>
          </div>
        </Card>

        <div className="mt-6 text-center">
          <Link to="/" className="text-sm text-gray-600 hover:text-gray-900">
            ← 홈으로 돌아가기
          </Link>
        </div>
      </div>
    </div>
  );
};
