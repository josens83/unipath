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
  return (
    <div className="min-h-screen">
      {/* ✨ Enhanced Hero Section with Glow Effects + Dark Mode */}
      <section className="relative overflow-hidden">
        {/* 그라데이션 배경 */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary-600 via-primary-700 to-secondary-600 dark:from-primary dark:via-primary-hover dark:to-secondary" />

        {/* ✨ Linear 스타일 글로우 효과 */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-primary-400/30 dark:bg-primary/20 rounded-full blur-3xl opacity-20 animate-pulse"
          style={{ animationDuration: '4s' }}
        />
        <div
          className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-secondary-400/30 dark:bg-secondary/20 rounded-full blur-3xl opacity-20 animate-pulse"
          style={{ animationDuration: '5s', animationDelay: '1s' }}
        />

        {/* ✨ 그리드 패턴 오버레이 */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px',
          }}
        />

        {/* 컨텐츠 */}
        <div className="relative z-10 text-white py-20 px-4">
          <div className="max-w-6xl mx-auto text-center">
            {/* ✨ 개선된 헤드라인 */}
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              대학입시의 새로운 길,
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-300 via-accent-200 to-accent-300 dark:from-accent dark:via-accent-hover dark:to-accent bg-size-200 animate-gradient">
                UniPath
              </span>
            </h1>

            <p className="text-xl md:text-2xl mb-8 text-white/90 dark:text-white/80 max-w-3xl mx-auto leading-relaxed">
              AI 기반 입시 컨설팅과 1:1 맞춤 과외로
              <br />
              꿈의 대학 합격을 현실로 만드세요
            </p>

            {/* ✨ 개선된 CTA 버튼 */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a href="/auth/register">
                <Button
                  size="lg"
                  className="bg-white dark:bg-bg-surface text-primary-600 dark:text-primary hover:bg-gray-50 dark:hover:bg-bg-subtle hover:text-primary-700 dark:hover:text-primary-hover shadow-2xl hover:shadow-white/20 dark:hover:shadow-primary/30 font-bold px-8 py-4 border-2 border-white/20 dark:border-border"
                >
                  무료로 시작하기 →
                </Button>
              </a>

              <a href="/auth/login">
                <Button
                  size="lg"
                  variant="ghost"
                  className="border-2 border-white/30 dark:border-white/20 text-white hover:text-white hover:bg-white/10 dark:hover:bg-white/5 hover:border-white/50 dark:hover:border-white/30 backdrop-blur-sm px-8 py-4"
                >
                  로그인
                </Button>
              </a>
            </div>

            {/* ✨ 개선된 통계 섹션 */}
            <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { value: '10,000+', label: '수강생', icon: '👨‍🎓' },
                { value: '500+', label: '우수 튜터', icon: '👨‍🏫' },
                { value: '95%', label: '만족도', icon: '⭐' },
                { value: '4.8/5', label: '평점', icon: '🏆' },
              ].map((stat, index) => (
                <div
                  key={index}
                  className="relative group bg-white/10 dark:bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/20 dark:border-white/10 hover:bg-white/15 dark:hover:bg-white/10 hover:border-white/30 dark:hover:border-white/20 transition-all duration-300 hover:-translate-y-1"
                >
                  {/* 아이콘 */}
                  <div className="text-4xl mb-2 transform group-hover:scale-110 transition-transform">
                    {stat.icon}
                  </div>

                  {/* 숫자 */}
                  <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-white to-white/80">
                    {stat.value}
                  </div>

                  {/* 라벨 */}
                  <div className="text-sm text-white/90 dark:text-white/70 mt-1">{stat.label}</div>

                  {/* 호버 글로우 */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/0 via-white/5 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ✨ Bento Grid Features Section + Dark Mode */}
      <section className="py-20 px-4 bg-bg-subtle">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 text-text-primary">
            UniPath만의 <span className="text-primary">특별한 기능</span>
          </h2>

          {/* ✨ Apple-style Bento Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 auto-rows-[200px]">
            {/* Large Featured Card - AI 입시 컨설팅 (2x2) */}
            <div className="md:col-span-2 md:row-span-2 group relative overflow-hidden bg-gradient-to-br from-primary-500 to-primary-600 dark:from-primary dark:to-primary-hover rounded-3xl p-8 text-white transition-all duration-500 hover:shadow-2xl hover:shadow-primary-500/30 dark:hover:shadow-primary/40 hover:-translate-y-1">
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-10">
                <div
                  style={{
                    backgroundImage: `
                      linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px),
                      linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px)
                    `,
                    backgroundSize: '30px 30px',
                  }}
                  className="w-full h-full"
                />
              </div>

              {/* Content */}
              <div className="relative z-10 h-full flex flex-col justify-between">
                <div>
                  <div className="inline-flex p-4 bg-white/20 backdrop-blur-sm rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300">
                    <Users size={48} className="text-white" />
                  </div>
                  <h3 className="text-3xl font-bold mb-4">AI 입시 컨설팅</h3>
                  <p className="text-lg text-white/90 leading-relaxed">
                    성적 분석 기반 맞춤형 대학 추천
                    <br />
                    <span className="text-sm text-white/70 mt-2 block">
                      실시간 합격률 예측 및 최적 전략 제시
                    </span>
                  </p>
                </div>

                {/* Hover Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-t from-white/0 via-white/0 to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            </div>

            {/* Medium Card - 1:1 맞춤 과외 (1x2) */}
            <div className="md:col-span-2 md:row-span-1 group relative overflow-hidden bg-gradient-to-br from-secondary-500 to-secondary-600 dark:from-secondary dark:to-secondary-hover rounded-3xl p-6 text-white transition-all duration-500 hover:shadow-2xl hover:shadow-secondary-500/30 dark:hover:shadow-secondary/40 hover:-translate-y-1">
              <div className="relative z-10 h-full flex items-center gap-6">
                <div className="flex-shrink-0 p-4 bg-white/20 dark:bg-white/10 backdrop-blur-sm rounded-2xl group-hover:scale-110 transition-transform duration-300">
                  <BookOpen size={40} className="text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-2">1:1 맞춤 과외</h3>
                  <p className="text-white/90 dark:text-white/80">
                    검증된 우수 튜터와의 실시간 화상 수업
                  </p>
                </div>
              </div>

              {/* Hover Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 to-white/10 dark:to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>

            {/* Small Card - 커뮤니티 (1x1) */}
            <div className="md:col-span-1 md:row-span-1 group relative overflow-hidden bg-gradient-to-br from-accent-400 to-accent-500 dark:from-accent dark:to-accent-hover rounded-3xl p-6 text-white transition-all duration-500 hover:shadow-2xl hover:shadow-accent-500/30 dark:hover:shadow-accent/40 hover:-translate-y-1">
              <div className="relative z-10 h-full flex flex-col justify-between">
                <div className="inline-flex p-3 bg-white/20 dark:bg-white/10 backdrop-blur-sm rounded-xl w-fit group-hover:scale-110 transition-transform duration-300">
                  <MessageSquare size={32} className="text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">커뮤니티</h3>
                  <p className="text-sm text-white/90 dark:text-white/80">
                    수험생 정보 공유 및 스터디
                  </p>
                </div>
              </div>

              {/* Hover Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-tl from-white/10 dark:from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>

            {/* Small Card - 학습 분석 (1x1) */}
            <div className="md:col-span-1 md:row-span-1 group relative overflow-hidden bg-gradient-to-br from-gray-700 to-gray-800 dark:from-gray-800 dark:to-gray-900 rounded-3xl p-6 text-white transition-all duration-500 hover:shadow-2xl hover:shadow-gray-700/30 dark:hover:shadow-gray-800/40 hover:-translate-y-1">
              <div className="relative z-10 h-full flex flex-col justify-between">
                <div className="inline-flex p-3 bg-white/20 dark:bg-white/10 backdrop-blur-sm rounded-xl w-fit group-hover:scale-110 transition-transform duration-300">
                  <TrendingUp size={32} className="text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">학습 분석</h3>
                  <p className="text-sm text-white/90 dark:text-white/80">
                    실시간 성적 추이 및 진도 관리
                  </p>
                </div>
              </div>

              {/* Hover Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-tr from-white/10 dark:from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section + Dark Mode */}
      <section className="py-20 px-4 bg-bg-base">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6 text-text-primary">
                왜 <span className="text-primary">UniPath</span>인가요?
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
                    <CheckCircle className="text-secondary" size={24} />
                    <span className="text-lg text-text-primary">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Card className="text-center" hover>
                <Award className="text-accent mx-auto mb-2" size={48} />
                <div className="text-2xl font-bold text-text-primary">최우수</div>
                <div className="text-text-secondary">에듀테크 어워드</div>
              </Card>
              <Card className="text-center" hover>
                <TrendingUp className="text-primary mx-auto mb-2" size={48} />
                <div className="text-2xl font-bold text-text-primary">평균 15%</div>
                <div className="text-text-secondary">성적 향상</div>
              </Card>
              <Card className="text-center col-span-2" hover>
                <div className="text-3xl font-bold text-secondary mb-2">
                  2,341명
                </div>
                <div className="text-text-secondary">2024년 명문대 합격생</div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section + Dark Mode */}
      <section className="py-20 px-4 bg-bg-subtle">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-4 text-text-primary">
            합리적인 <span className="text-primary">요금제</span>
          </h2>
          <p className="text-center text-text-secondary mb-12">
            학생에게 맞는 플랜을 선택하세요
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            {pricingPlans.map((plan) => (
              <Card
                key={plan.id}
                className={plan.popular ? 'border-2 border-primary dark:border-primary relative' : ''}
                hover
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-white px-4 py-1 rounded-full text-sm font-medium shadow-lg">
                    인기
                  </div>
                )}
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold mb-2 text-text-primary">{plan.name}</h3>
                  <div className="text-4xl font-bold text-primary">
                    {plan.price === 0 ? '무료' : `₩${plan.price.toLocaleString()}`}
                  </div>
                  {plan.price > 0 && (
                    <div className="text-text-secondary">/월</div>
                  )}
                </div>
                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <CheckCircle className="text-secondary flex-shrink-0 mt-0.5" size={20} />
                      <span className="text-text-primary">{feature}</span>
                    </li>
                  ))}
                </ul>
                <a href="/auth/register">
                  <Button
                    variant={plan.popular ? 'primary' : 'outline'}
                    fullWidth
                  >
                    {plan.price === 0 ? '무료 체험하기' : '시작하기'}
                  </Button>
                </a>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section + Dark Mode */}
      <section className="py-20 px-4 bg-gradient-to-br from-primary-500 to-secondary-500 dark:from-primary dark:to-secondary text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">
            지금 시작하세요!
          </h2>
          <p className="text-xl mb-8 text-white/90 dark:text-white/80">
            무료 체험으로 UniPath의 모든 기능을 경험해보세요
          </p>
          <a href="/auth/register">
            <Button
              size="lg"
              variant="ghost"
              className="bg-accent dark:bg-accent-hover text-gray-900 dark:text-gray-900 hover:bg-accent-500 dark:hover:bg-accent shadow-xl font-bold"
            >
              무료로 시작하기
            </Button>
          </a>
        </div>
      </section>
    </div>
  );
};
