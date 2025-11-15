import { Link } from 'react-router-dom';
import { Button } from '../components/common/Button';
import { Card } from '../components/common/Card';
import {
  BookOpen,
  Users,
  MessageSquare,
  TrendingUp,
  CheckCircle,
  Award,
} from 'lucide-react';
import { pricingPlans } from '../services/mockData';

export const Landing = () => {
  const features = [
    {
      icon: BookOpen,
      title: '1:1 맞춤 과외',
      description: '검증된 우수 튜터와의 실시간 화상 수업',
    },
    {
      icon: Users,
      title: 'AI 입시 컨설팅',
      description: '성적 분석 기반 맞춤형 대학 추천',
    },
    {
      icon: MessageSquare,
      title: '커뮤니티',
      description: '수험생들과의 정보 공유 및 스터디 그룹',
    },
    {
      icon: TrendingUp,
      title: '학습 분석',
      description: '실시간 성적 추이 및 진도 관리',
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-500 via-primary-600 to-secondary-500 text-white py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            대학입시의 새로운 길,
            <br />
            <span className="text-accent-300">UniPath</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-100">
            AI 기반 입시 컨설팅과 1:1 맞춤 과외로
            <br />
            꿈의 대학 합격을 현실로 만드세요
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link to="/auth/register">
              <Button size="lg" className="bg-white text-primary-600 hover:bg-gray-100">
                무료로 시작하기
              </Button>
            </Link>
            <Link to="/auth/login">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                로그인
              </Button>
            </Link>
          </div>

          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <div className="text-4xl font-bold">10,000+</div>
              <div className="text-gray-200">수강생</div>
            </div>
            <div>
              <div className="text-4xl font-bold">500+</div>
              <div className="text-gray-200">우수 튜터</div>
            </div>
            <div>
              <div className="text-4xl font-bold">95%</div>
              <div className="text-gray-200">만족도</div>
            </div>
            <div>
              <div className="text-4xl font-bold">4.8/5</div>
              <div className="text-gray-200">평점</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">
            UniPath만의 <span className="text-primary-500">특별한 기능</span>
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center" hover>
                <div className="flex justify-center mb-4">
                  <div className="p-4 bg-primary-100 rounded-full">
                    <feature.icon size={32} className="text-primary-500" />
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6">
                왜 <span className="text-primary-500">UniPath</span>인가요?
              </h2>
              <div className="space-y-4">
                {[
                  '검증된 명문대 튜터와 1:1 맞춤 수업',
                  'AI 기반 정확한 입시 성공률 예측',
                  '실시간 학습 진도 및 성적 관리',
                  '합격생 멘토링 및 커뮤니티',
                  '언제 어디서나 화상 수업 가능',
                  '학부모 모니터링 대시보드 제공',
                ].map((benefit, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <CheckCircle className="text-secondary-500" size={24} />
                    <span className="text-lg">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Card className="text-center">
                <Award className="text-accent-500 mx-auto mb-2" size={48} />
                <div className="text-2xl font-bold">최우수</div>
                <div className="text-gray-600">에듀테크 어워드</div>
              </Card>
              <Card className="text-center">
                <TrendingUp className="text-primary-500 mx-auto mb-2" size={48} />
                <div className="text-2xl font-bold">평균 15%</div>
                <div className="text-gray-600">성적 향상</div>
              </Card>
              <Card className="text-center col-span-2">
                <div className="text-3xl font-bold text-secondary-500 mb-2">
                  2,341명
                </div>
                <div className="text-gray-600">2024년 명문대 합격생</div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-4">
            합리적인 <span className="text-primary-500">요금제</span>
          </h2>
          <p className="text-center text-gray-600 mb-12">
            학생에게 맞는 플랜을 선택하세요
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            {pricingPlans.map((plan) => (
              <Card
                key={plan.id}
                className={plan.popular ? 'border-2 border-primary-500 relative' : ''}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                    인기
                  </div>
                )}
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                  <div className="text-4xl font-bold text-primary-500">
                    {plan.price === 0 ? '무료' : `₩${plan.price.toLocaleString()}`}
                  </div>
                  {plan.price > 0 && (
                    <div className="text-gray-600">/월</div>
                  )}
                </div>
                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <CheckCircle className="text-secondary-500 flex-shrink-0 mt-0.5" size={20} />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link to="/auth/register">
                  <Button
                    variant={plan.popular ? 'primary' : 'outline'}
                    fullWidth
                  >
                    {plan.price === 0 ? '무료 체험하기' : '시작하기'}
                  </Button>
                </Link>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-primary-500 to-secondary-500 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">
            지금 시작하세요!
          </h2>
          <p className="text-xl mb-8">
            무료 체험으로 UniPath의 모든 기능을 경험해보세요
          </p>
          <Link to="/auth/register">
            <Button size="lg" className="bg-white text-primary-600 hover:bg-gray-100">
              무료로 시작하기
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};
