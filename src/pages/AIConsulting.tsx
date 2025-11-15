import { useState } from 'react';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { Input } from '../components/common/Input';
import {
  TrendingUp,
  Target,
  BookOpen,
  Award,
  AlertCircle,
  CheckCircle,
} from 'lucide-react';
import { mockUniversityPredictions, mockGrades } from '../services/mockData';

export const AIConsulting = () => {
  const [analyzed, setAnalyzed] = useState(false);

  const handleAnalyze = () => {
    setAnalyzed(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">AI 입시 컨설팅</h1>
          <p className="text-gray-600">성적 기반 맞춤형 대학 추천 및 학습 계획</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Input Section */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <h2 className="text-xl font-bold mb-4">성적 입력</h2>
              <div className="space-y-4">
                {mockGrades.map(grade => (
                  <Input
                    key={grade.subject}
                    label={grade.subject}
                    type="number"
                    defaultValue={grade.score}
                    fullWidth
                  />
                ))}

                <div className="pt-4 border-t">
                  <label className="text-sm font-medium text-gray-700 mb-2 block">
                    희망 대학 (선택)
                  </label>
                  <Input
                    type="text"
                    placeholder="예: 서울대학교"
                    fullWidth
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">
                    희망 학과
                  </label>
                  <Input
                    type="text"
                    placeholder="예: 경영학과"
                    fullWidth
                  />
                </div>

                <Button
                  variant="primary"
                  fullWidth
                  onClick={handleAnalyze}
                >
                  AI 분석 시작하기
                </Button>
              </div>
            </Card>
          </div>

          {/* Results Section */}
          <div className="lg:col-span-2 space-y-6">
            {!analyzed ? (
              <Card className="text-center py-12">
                <TrendingUp className="text-primary-500 mx-auto mb-4" size={64} />
                <h3 className="text-xl font-bold mb-2">AI 분석을 시작해보세요</h3>
                <p className="text-gray-600">
                  성적을 입력하고 AI 분석을 통해<br />
                  합격 가능한 대학을 확인하세요
                </p>
              </Card>
            ) : (
              <>
                {/* University Predictions */}
                <Card>
                  <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <Target className="text-primary-500" />
                    추천 대학
                  </h2>
                  <div className="space-y-4">
                    {mockUniversityPredictions.map((pred, index) => (
                      <div
                        key={index}
                        className="p-4 border-2 rounded-lg hover:border-primary-300 transition-all"
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h3 className="font-bold text-lg">{pred.universityName}</h3>
                            <p className="text-gray-600">{pred.department}</p>
                          </div>
                          <div className="text-right">
                            <div className="text-2xl font-bold text-primary-500">
                              {pred.admissionProbability}%
                            </div>
                            <div className="text-xs text-gray-600">합격 가능성</div>
                          </div>
                        </div>

                        <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
                          <div
                            className={`h-2 rounded-full ${
                              pred.admissionProbability >= 80
                                ? 'bg-green-500'
                                : pred.admissionProbability >= 60
                                ? 'bg-yellow-500'
                                : 'bg-red-500'
                            }`}
                            style={{ width: `${pred.admissionProbability}%` }}
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="text-gray-600">요구 성적:</span>
                            <span className="font-medium ml-2">{pred.requiredScore}점</span>
                          </div>
                          <div>
                            <span className="text-gray-600">경쟁률:</span>
                            <span className="font-medium ml-2">{pred.competitionRate}:1</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>

                {/* Weak Subjects */}
                <Card>
                  <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <AlertCircle className="text-accent-500" />
                    집중 보완 과목
                  </h2>
                  <div className="space-y-3">
                    {['수학', '영어'].map((subject, index) => (
                      <div key={index} className="p-4 bg-red-50 border border-red-200 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium">{subject}</span>
                          <span className="text-sm text-red-600">보완 필요</span>
                        </div>
                        <p className="text-sm text-gray-700">
                          목표 대학 진학을 위해 최소 {index === 0 ? '5' : '8'}점 향상이 필요합니다.
                        </p>
                      </div>
                    ))}
                  </div>
                </Card>

                {/* Study Plan */}
                <Card>
                  <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <BookOpen className="text-secondary-500" />
                    맞춤 학습 계획
                  </h2>
                  <div className="space-y-4">
                    {[
                      {
                        subject: '수학',
                        current: 78,
                        target: 85,
                        tasks: ['미적분 기본 개념 복습', '심화 문제 풀이', '모의고사 3회 이상'],
                        deadline: '2주',
                      },
                      {
                        subject: '영어',
                        current: 92,
                        target: 95,
                        tasks: ['고난도 독해 연습', '어휘 200개 추가 암기'],
                        deadline: '1주',
                      },
                    ].map((plan, index) => (
                      <div key={index} className="p-4 bg-blue-50 rounded-lg">
                        <div className="flex items-center justify-between mb-3">
                          <h3 className="font-bold">{plan.subject}</h3>
                          <div className="text-sm">
                            <span className="text-gray-600">{plan.current}점</span>
                            <span className="mx-2">→</span>
                            <span className="font-bold text-primary-500">{plan.target}점</span>
                          </div>
                        </div>

                        <ul className="space-y-2 mb-3">
                          {plan.tasks.map((task, taskIndex) => (
                            <li key={taskIndex} className="flex items-start gap-2 text-sm">
                              <CheckCircle className="text-secondary-500 flex-shrink-0 mt-0.5" size={16} />
                              <span>{task}</span>
                            </li>
                          ))}
                        </ul>

                        <div className="text-xs text-gray-600">
                          ⏰ 목표 기간: {plan.deadline}
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>

                {/* Success Tips */}
                <Card>
                  <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <Award className="text-accent-500" />
                    AI 추천 사항
                  </h2>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
                      <CheckCircle className="text-green-500 flex-shrink-0 mt-1" size={20} />
                      <div className="text-sm">
                        <strong>영어 강점 유지:</strong> 현재 영어 성적이 우수합니다.
                        이 강점을 계속 유지하면서 다른 과목에 집중하세요.
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
                      <CheckCircle className="text-blue-500 flex-shrink-0 mt-1" size={20} />
                      <div className="text-sm">
                        <strong>수학 집중 학습:</strong> 주 3회 이상 수학 튜터링을 추천합니다.
                        미적분 개념 정리가 우선입니다.
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-3 bg-purple-50 rounded-lg">
                      <CheckCircle className="text-purple-500 flex-shrink-0 mt-1" size={20} />
                      <div className="text-sm">
                        <strong>모의고사 활용:</strong> 매주 1회 이상 모의고사를 풀고
                        오답 노트를 작성하세요.
                      </div>
                    </div>
                  </div>
                </Card>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
