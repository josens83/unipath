import { useState } from 'react';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { PageTransition } from '../components/common/PageTransition';
import {
  TrendingUp,
  Target,
  BookOpen,
  Award,
  AlertCircle,
  CheckCircle,
  Sparkles,
  Clock,
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { aiAPI } from '../services/api';
import toast from 'react-hot-toast';
import type { AIAnalysisResult, GradeData } from '../types';

export const AIConsulting = () => {
  const { user } = useAuth();
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState<AIAnalysisResult | null>(null);
  const [grades, setGrades] = useState<GradeData[]>([
    { subject: '국어', score: 85, percentile: 85, date: new Date().toISOString() },
    { subject: '수학', score: 88, percentile: 88, date: new Date().toISOString() },
    { subject: '영어', score: 82, percentile: 82, date: new Date().toISOString() },
    { subject: '탐구1', score: 90, percentile: 90, date: new Date().toISOString() },
    { subject: '탐구2', score: 87, percentile: 87, date: new Date().toISOString() },
  ]);
  const [targetUniversity, setTargetUniversity] = useState('');
  const [targetDepartment, setTargetDepartment] = useState('');

  const handleGradeChange = (index: number, value: string) => {
    const newGrades = [...grades];
    const score = parseInt(value) || 0;
    newGrades[index] = {
      ...newGrades[index],
      score,
      percentile: score, // 간단하게 점수를 백분위로 사용
    };
    setGrades(newGrades);
  };

  const handleAnalyze = async () => {
    if (!user) {
      toast.error('로그인이 필요합니다.');
      return;
    }

    setAnalyzing(true);

    try {
      // AI 분석 요청
      const analysisResult = await aiAPI.analyzeStudent(user.id);
      setResult(analysisResult);
      toast.success('AI 분석이 완료되었습니다!');
    } catch (error) {
      toast.error('분석 중 오류가 발생했습니다.');
      console.error('Analysis error:', error);
    } finally {
      setAnalyzing(false);
    }
  };

  const getProbabilityColor = (prob: number) => {
    if (prob >= 80) return 'text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800';
    if (prob >= 60) return 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800';
    if (prob >= 40) return 'text-yellow-600 dark:text-yellow-400 bg-yellow-50 dark:bg-yellow-900/30 border border-yellow-200 dark:border-yellow-800';
    return 'text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800';
  };

  const getProbabilityBadge = (prob: number) => {
    if (prob >= 80) return '안전';
    if (prob >= 60) return '적정';
    if (prob >= 40) return '소신';
    return '도전';
  };

  return (
    <PageTransition>
      <div className="min-h-screen bg-bg-base py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
          <h1 className="text-3xl font-bold text-text-primary mb-2 flex items-center gap-2">
            <Sparkles className="text-primary" size={32} />
            AI 입시 컨설팅
          </h1>
          <p className="text-text-secondary">성적 기반 맞춤형 대학 추천 및 학습 계획</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Input Section */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <h2 className="text-xl font-bold text-text-primary mb-4">성적 입력</h2>
              <div className="space-y-4">
                {grades.map((grade, index) => (
                  <div key={grade.subject}>
                    <label className="block text-sm font-medium text-text-primary mb-1">
                      {grade.subject}
                    </label>
                    <input
                      type="number"
                      value={grade.score}
                      onChange={(e) => handleGradeChange(index, e.target.value)}
                      min="0"
                      max="100"
                      className="w-full px-4 py-2 border border-border rounded-lg bg-bg-base text-text-primary focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                    />
                  </div>
                ))}

                <div className="pt-4 border-t border-border">
                  <label className="text-sm font-medium text-text-primary mb-2 block">
                    희망 대학 (선택)
                  </label>
                  <input
                    type="text"
                    value={targetUniversity}
                    onChange={(e) => setTargetUniversity(e.target.value)}
                    placeholder="예: 서울대학교"
                    className="w-full px-4 py-2 border border-border rounded-lg bg-bg-base text-text-primary focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-text-primary mb-2 block">
                    희망 학과
                  </label>
                  <input
                    type="text"
                    value={targetDepartment}
                    onChange={(e) => setTargetDepartment(e.target.value)}
                    placeholder="예: 경영학과"
                    className="w-full px-4 py-2 border border-border rounded-lg bg-bg-base text-text-primary focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                  />
                </div>

                <Button
                  variant="primary"
                  fullWidth
                  onClick={handleAnalyze}
                  disabled={analyzing}
                  className="flex items-center justify-center gap-2"
                >
                  {analyzing ? (
                    <>
                      <Clock className="animate-spin" size={20} />
                      분석 중...
                    </>
                  ) : (
                    <>
                      <Sparkles size={20} />
                      AI 분석 시작하기
                    </>
                  )}
                </Button>

                {result && (
                  <div className="text-xs text-text-tertiary text-center pt-2">
                    마지막 분석: {new Date(result.generatedAt).toLocaleString()}
                  </div>
                )}
              </div>
            </Card>
          </div>

          {/* Results Section */}
          <div className="lg:col-span-2 space-y-6">
            {!result ? (
              <Card className="text-center py-12">
                <TrendingUp className="text-primary mx-auto mb-4" size={64} />
                <h3 className="text-xl font-bold text-text-primary mb-2">AI 분석을 시작해보세요</h3>
                <p className="text-text-secondary">
                  성적을 입력하고 AI 분석을 통해<br />
                  합격 가능한 대학을 확인하세요
                </p>
              </Card>
            ) : (
              <>
                {/* University Predictions */}
                <Card>
                  <h2 className="text-xl font-bold text-text-primary mb-4 flex items-center gap-2">
                    <Target className="text-primary" />
                    추천 대학
                  </h2>
                  <div className="space-y-4">
                    {result.predictions.map((pred, index) => (
                      <div
                        key={index}
                        className="border border-border rounded-lg p-4 hover:shadow-md transition-shadow bg-bg-surface"
                      >
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <h3 className="text-lg font-bold text-text-primary">{pred.universityName}</h3>
                            <p className="text-text-secondary">{pred.department}</p>
                          </div>
                          <div className={`px-3 py-1 rounded-full text-sm font-medium ${getProbabilityColor(pred.admissionProbability)}`}>
                            {getProbabilityBadge(pred.admissionProbability)}
                          </div>
                        </div>

                        <div className="grid grid-cols-3 gap-4 text-sm">
                          <div>
                            <div className="text-text-secondary">합격 확률</div>
                            <div className="text-lg font-bold text-primary">
                              {pred.admissionProbability}%
                            </div>
                          </div>
                          <div>
                            <div className="text-text-secondary">요구 점수</div>
                            <div className="text-lg font-bold text-text-primary">{pred.requiredScore}점</div>
                          </div>
                          <div>
                            <div className="text-text-secondary">경쟁률</div>
                            <div className="text-lg font-bold text-text-primary">{pred.competitionRate}:1</div>
                          </div>
                        </div>

                        {/* Progress Bar */}
                        <div className="mt-3">
                          <div className="w-full bg-border-subtle dark:bg-border rounded-full h-2">
                            <div
                              className={`h-2 rounded-full ${pred.admissionProbability >= 80 ? 'bg-green-500' :
                                pred.admissionProbability >= 60 ? 'bg-blue-500' :
                                  pred.admissionProbability >= 40 ? 'bg-yellow-500' : 'bg-red-500'
                                }`}
                              style={{ width: `${pred.admissionProbability}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>

                {/* Weak Subjects */}
                {result.weakSubjects.length > 0 && (
                  <Card>
                    <h2 className="text-xl font-bold text-text-primary mb-4 flex items-center gap-2">
                      <AlertCircle className="text-orange-500 dark:text-orange-400" />
                      보완이 필요한 과목
                    </h2>
                    <div className="flex flex-wrap gap-2">
                      {result.weakSubjects.map((subject, index) => (
                        <span
                          key={index}
                          className="px-4 py-2 bg-orange-50 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400 border border-orange-200 dark:border-orange-800 rounded-full text-sm font-medium"
                        >
                          {subject}
                        </span>
                      ))}
                    </div>
                  </Card>
                )}

                {/* Recommendations */}
                <Card>
                  <h2 className="text-xl font-bold text-text-primary mb-4 flex items-center gap-2">
                    <Award className="text-blue-500 dark:text-blue-400" />
                    AI 추천사항
                  </h2>
                  <div className="space-y-3">
                    {result.recommendations.map((rec, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <CheckCircle className="text-blue-500 dark:text-blue-400 flex-shrink-0 mt-0.5" size={20} />
                        <p className="text-text-primary">{rec}</p>
                      </div>
                    ))}
                  </div>
                </Card>

                {/* Study Plan */}
                <Card>
                  <h2 className="text-xl font-bold text-text-primary mb-4 flex items-center gap-2">
                    <BookOpen className="text-green-500 dark:text-green-400" />
                    맞춤 학습 계획
                  </h2>
                  <div className="space-y-6">
                    {result.studyPlan.map((plan, index) => (
                      <div key={index} className="border-l-4 border-primary pl-4">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-bold text-lg text-text-primary">{plan.subject}</h3>
                          <span className="text-sm text-text-secondary">
                            D-{Math.ceil((new Date(plan.deadline).getTime() - Date.now()) / (1000 * 60 * 60 * 24))}
                          </span>
                        </div>

                        <div className="flex gap-4 text-sm mb-3">
                          <div>
                            <span className="text-text-secondary">현재: </span>
                            <span className="font-medium text-text-primary">{plan.currentScore}점</span>
                          </div>
                          <div>
                            <span className="text-text-secondary">목표: </span>
                            <span className="font-medium text-primary">{plan.targetScore}점</span>
                          </div>
                          <div>
                            <span className="text-text-secondary">필요 상승: </span>
                            <span className="font-medium text-green-600 dark:text-green-400">+{plan.targetScore - plan.currentScore}점</span>
                          </div>
                        </div>

                        <div className="space-y-2">
                          {plan.tasks.map((task, taskIndex) => (
                            <div key={taskIndex} className="flex items-center gap-2 text-sm">
                              <input
                                type="checkbox"
                                className="w-4 h-4 text-primary rounded"
                              />
                              <span className="text-text-primary">{task}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              </>
            )}
          </div>
        </div>
        </div>
      </div>
    </PageTransition>
  );
};
