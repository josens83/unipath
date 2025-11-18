import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import toast from 'react-hot-toast';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '../components/common/Button';
import { Card } from '../components/common/Card';
import { PageTransition } from '../components/common/PageTransition';
import { loginSchema } from '../utils/validation';
import type { LoginFormData } from '../utils/validation';

export const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      await login(data.email, data.password);
      toast.success('로그인에 성공했습니다!');
      navigate('/dashboard');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : '로그인에 실패했습니다.');
    }
  };

  return (
    <PageTransition>
      <div className="min-h-screen flex items-center justify-center bg-bg-base px-4 py-12">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-lg" />
          </div>
          <h1 className="text-3xl font-bold text-text-primary">UniPath</h1>
          <p className="text-text-secondary mt-2">로그인하여 시작하세요</p>
        </div>

        <Card>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-text-primary mb-1">
                이메일
              </label>
              <input
                id="email"
                type="email"
                {...register('email')}
                className={`w-full px-4 py-2 border rounded-lg bg-bg-base text-text-primary focus:ring-2 focus:ring-primary focus:border-transparent transition-all ${
                  errors.email ? 'border-red-500 dark:border-red-400' : 'border-border'
                }`}
                placeholder="example@email.com"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.email.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-text-primary mb-1">
                비밀번호
              </label>
              <input
                id="password"
                type="password"
                {...register('password')}
                className={`w-full px-4 py-2 border rounded-lg bg-bg-base text-text-primary focus:ring-2 focus:ring-primary focus:border-transparent transition-all ${
                  errors.password ? 'border-red-500 dark:border-red-400' : 'border-border'
                }`}
                placeholder="••••••••"
              />
              {errors.password && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.password.message}</p>
              )}
            </div>

            <div className="pt-2 space-y-2">
              <p className="text-sm text-text-secondary">
                <strong>테스트 계정:</strong>
              </p>
              <div className="text-xs text-text-secondary space-y-1 bg-bg-subtle p-3 rounded-lg border border-border-subtle">
                <p>• 학생: student@test.com (비밀번호: 6자 이상)</p>
                <p>• 학부모: parent@test.com (비밀번호: 6자 이상)</p>
                <p>• 튜터: tutor@test.com (비밀번호: 6자 이상)</p>
                <p>• 관리자: admin@unipath.kr (비밀번호: 6자 이상)</p>
              </div>
            </div>

            <Button
              type="submit"
              variant="primary"
              fullWidth
              disabled={isSubmitting}
            >
              {isSubmitting ? '로그인 중...' : '로그인'}
            </Button>

            <div className="text-center text-sm text-text-secondary">
              계정이 없으신가요?{' '}
              <Link to="/auth/register" className="text-primary hover:text-primary-hover font-medium">
                회원가입
              </Link>
            </div>
          </form>
        </Card>

        <div className="mt-6 text-center">
          <Link to="/" className="text-sm text-text-secondary hover:text-text-primary transition-colors">
            ← 홈으로 돌아가기
          </Link>
        </div>
        </div>
      </div>
    </PageTransition>
  );
};
