import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import toast from 'react-hot-toast';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '../components/common/Button';
import { Card } from '../components/common/Card';
import { PageTransition } from '../components/common/PageTransition';
import { registerSchema } from '../utils/validation';
import type { RegisterFormData } from '../utils/validation';

export const Register = () => {
  const [selectedRole, setSelectedRole] = useState<'student' | 'parent' | 'tutor'>('student');
  const { register: registerUser } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormData) => {
    try {
      await registerUser({
        ...data,
        role: selectedRole,
      });
      toast.success('회원가입에 성공했습니다!');
      navigate('/dashboard');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : '회원가입에 실패했습니다.');
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
          <p className="text-text-secondary mt-2">지금 바로 시작하세요</p>
        </div>

        <Card>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Role Selection */}
            <div>
              <label className="text-sm font-medium text-text-primary mb-2 block">
                사용자 유형 선택
              </label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedRole('student')}
                  className={`py-2 px-4 rounded-lg border-2 transition-all ${
                    selectedRole === 'student'
                      ? 'border-primary bg-primary-subtle text-primary font-medium'
                      : 'border-border text-text-secondary hover:border-border-strong hover:text-text-primary'
                  }`}
                >
                  학생
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedRole('parent')}
                  className={`py-2 px-4 rounded-lg border-2 transition-all ${
                    selectedRole === 'parent'
                      ? 'border-primary bg-primary-subtle text-primary font-medium'
                      : 'border-border text-text-secondary hover:border-border-strong hover:text-text-primary'
                  }`}
                >
                  학부모
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedRole('tutor')}
                  className={`py-2 px-4 rounded-lg border-2 transition-all ${
                    selectedRole === 'tutor'
                      ? 'border-primary bg-primary-subtle text-primary font-medium'
                      : 'border-border text-text-secondary hover:border-border-strong hover:text-text-primary'
                  }`}
                >
                  튜터
                </button>
              </div>
            </div>

            <div>
              <label htmlFor="name" className="block text-sm font-medium text-text-primary mb-1">
                이름
              </label>
              <input
                id="name"
                type="text"
                {...register('name')}
                className={`w-full px-4 py-2 border rounded-lg bg-bg-base text-text-primary focus:ring-2 focus:ring-primary focus:border-transparent transition-all ${
                  errors.name ? 'border-red-500 dark:border-red-400' : 'border-border'
                }`}
                placeholder="홍길동"
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.name.message}</p>
              )}
            </div>

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

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-text-primary mb-1">
                비밀번호 확인
              </label>
              <input
                id="confirmPassword"
                type="password"
                {...register('confirmPassword')}
                className={`w-full px-4 py-2 border rounded-lg bg-bg-base text-text-primary focus:ring-2 focus:ring-primary focus:border-transparent transition-all ${
                  errors.confirmPassword ? 'border-red-500 dark:border-red-400' : 'border-border'
                }`}
                placeholder="••••••••"
              />
              {errors.confirmPassword && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.confirmPassword.message}</p>
              )}
            </div>

            <Button
              type="submit"
              variant="primary"
              fullWidth
              disabled={isSubmitting}
            >
              {isSubmitting ? '가입 중...' : '회원가입'}
            </Button>

            <div className="text-center text-sm text-text-secondary">
              이미 계정이 있으신가요?{' '}
              <Link to="/auth/login" className="text-primary hover:text-primary-hover font-medium">
                로그인
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
