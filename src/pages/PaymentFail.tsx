import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import { XCircle, ArrowLeft } from 'lucide-react';
import { Button } from '../components/common/Button';
import { Card } from '../components/common/Card';

export const PaymentFail = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const errorCode = searchParams.get('code');
  const errorMessage = searchParams.get('message');

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-12">
      <div className="max-w-md w-full">
        <Card>
          <div className="text-center py-8">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
                <XCircle className="w-10 h-10 text-red-600" />
              </div>
            </div>

            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              결제에 실패했습니다
            </h1>
            <p className="text-gray-600 mb-8">
              결제 처리 중 문제가 발생했습니다.
            </p>

            {(errorCode || errorMessage) && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-8 text-left">
                <h3 className="font-semibold text-red-900 mb-2">오류 정보</h3>
                {errorCode && (
                  <p className="text-sm text-red-700 mb-1">
                    <span className="font-medium">오류 코드:</span> {errorCode}
                  </p>
                )}
                {errorMessage && (
                  <p className="text-sm text-red-700">
                    <span className="font-medium">오류 메시지:</span> {errorMessage}
                  </p>
                )}
              </div>
            )}

            <div className="space-y-3">
              <Button
                variant="primary"
                fullWidth
                onClick={() => navigate('/pricing')}
                className="flex items-center justify-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                요금제 선택으로 돌아가기
              </Button>

              <Link to="/support" className="block">
                <Button variant="outline" fullWidth>
                  고객 지원 문의
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
