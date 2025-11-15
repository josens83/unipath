import { useState } from 'react';
import type { FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '../components/common/Button';
import { Input } from '../components/common/Input';
import { Card } from '../components/common/Card';
import type { UserRole } from '../types';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<UserRole>('student');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await login(email, password, role);
      navigate('/dashboard');
    } catch (error) {
      console.error('Login failed:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-lg" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900">UniPath</h1>
          <p className="text-gray-600 mt-2">로그인하여 시작하세요</p>
        </div>

        <Card>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Role Selection */}
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">
                사용자 유형
              </label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setRole('student')}
                  className={`py-2 px-4 rounded-lg border-2 transition-all ${
                    role === 'student'
                      ? 'border-primary-500 bg-primary-50 text-primary-700 font-medium'
                      : 'border-gray-300 text-gray-700 hover:border-gray-400'
                  }`}
                >
                  학생
                </button>
                <button
                  type="button"
                  onClick={() => setRole('parent')}
                  className={`py-2 px-4 rounded-lg border-2 transition-all ${
                    role === 'parent'
                      ? 'border-primary-500 bg-primary-50 text-primary-700 font-medium'
                      : 'border-gray-300 text-gray-700 hover:border-gray-400'
                  }`}
                >
                  학부모
                </button>
                <button
                  type="button"
                  onClick={() => setRole('tutor')}
                  className={`py-2 px-4 rounded-lg border-2 transition-all ${
                    role === 'tutor'
                      ? 'border-primary-500 bg-primary-50 text-primary-700 font-medium'
                      : 'border-gray-300 text-gray-700 hover:border-gray-400'
                  }`}
                >
                  튜터
                </button>
              </div>
            </div>

            <Input
              type="email"
              label="이메일"
              placeholder="example@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
              required
            />

            <Input
              type="password"
              label="비밀번호"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              fullWidth
              required
            />

            <Button
              type="submit"
              variant="primary"
              fullWidth
              disabled={loading}
            >
              {loading ? '로그인 중...' : '로그인'}
            </Button>

            <div className="text-center text-sm text-gray-600">
              계정이 없으신가요?{' '}
              <Link to="/auth/register" className="text-primary-500 hover:text-primary-600 font-medium">
                회원가입
              </Link>
            </div>
          </form>
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
