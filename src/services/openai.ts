import OpenAI from 'openai';
import type { AIAnalysisResult, UniversityPrediction, StudyPlanItem } from '../types';

/**
 * OpenAI API Service
 * AI 입시 컨설팅 및 학습 분석 서비스
 */

// OpenAI 클라이언트 초기화
const getOpenAI = () => {
  const apiKey = import.meta.env.VITE_OPENAI_API_KEY;

  if (!apiKey) {
    console.warn('OpenAI API 키가 설정되지 않았습니다. Mock 데이터를 사용합니다.');
    return null;
  }

  return new OpenAI({
    apiKey,
    dangerouslyAllowBrowser: true, // 주의: 프로덕션에서는 백엔드에서 호출 권장
  });
};

interface StudentData {
  grade: number; // 학년
  gpa: number; // 내신 등급
  satScore?: number; // SAT 점수
  actScore?: number; // ACT 점수
  subjects: string[]; // 관심 과목
  targetMajor?: string; // 희망 전공
  extracurricular?: string; // 비교과 활동
}

/**
 * AI 기반 대학 입시 분석
 */
export const analyzeAdmissionProbability = async (
  studentData: StudentData
): Promise<AIAnalysisResult> => {
  const openai = getOpenAI();

  // OpenAI API를 사용할 수 없는 경우 Mock 데이터 반환
  if (!openai) {
    return generateMockAnalysis(studentData);
  }

  try {
    const prompt = `
당신은 대한민국 대학 입시 전문 컨설턴트입니다. 다음 학생의 정보를 분석하여 입시 전략을 제공해주세요.

학생 정보:
- 학년: ${studentData.grade}학년
- 내신 등급: ${studentData.gpa}
- SAT 점수: ${studentData.satScore || '없음'}
- ACT 점수: ${studentData.actScore || '없음'}
- 관심 과목: ${studentData.subjects.join(', ')}
- 희망 전공: ${studentData.targetMajor || '미정'}
- 비교과 활동: ${studentData.extracurricular || '없음'}

다음 형식의 JSON으로 응답해주세요:
{
  "universities": [
    {
      "name": "대학명",
      "department": "학과명",
      "probability": 합격 확률 (0-100),
      "requiredGPA": 필요 내신 등급,
      "competitionRate": 경쟁률
    }
  ],
  "weakSubjects": ["약점 과목1", "약점 과목2"],
  "recommendations": ["추천사항1", "추천사항2", "추천사항3"],
  "studyPlan": [
    {
      "subject": "과목명",
      "targetScore": 목표 점수,
      "currentScore": 현재 추정 점수,
      "tasks": ["할 일 1", "할 일 2"],
      "deadline": "2025-06-30"
    }
  ]
}
`;

    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini', // 비용 효율적인 모델
      messages: [
        {
          role: 'system',
          content:
            '당신은 대한민국 대학 입시 전문가입니다. 학생의 성적과 관심사를 분석하여 최적의 입시 전략을 제공합니다.',
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      temperature: 0.7,
      max_tokens: 2000,
      response_format: { type: 'json_object' },
    });

    const content = response.choices[0]?.message?.content;
    if (!content) {
      throw new Error('AI 응답이 비어있습니다.');
    }

    const aiResult = JSON.parse(content);

    // AIAnalysisResult 형식으로 변환
    const result: AIAnalysisResult = {
      studentId: '', // 호출하는 곳에서 설정
      predictions: aiResult.universities.map((u: any) => ({
        universityName: u.name,
        department: u.department,
        admissionProbability: u.probability,
        requiredScore: u.requiredGPA,
        competitionRate: u.competitionRate,
      })),
      weakSubjects: aiResult.weakSubjects || [],
      recommendations: aiResult.recommendations || [],
      studyPlan: aiResult.studyPlan || [],
      generatedAt: new Date().toISOString(),
    };

    return result;
  } catch (error) {
    console.error('OpenAI API 오류:', error);
    // 오류 시 Mock 데이터 반환
    return generateMockAnalysis(studentData);
  }
};

/**
 * AI 학습 계획 생성
 */
export const generateStudyPlan = async (
  currentGrades: Record<string, number>,
  targetGrades: Record<string, number>,
  deadline: string
): Promise<StudyPlanItem[]> => {
  const openai = getOpenAI();

  if (!openai) {
    return generateMockStudyPlan(currentGrades, targetGrades);
  }

  try {
    const prompt = `
다음 학생의 현재 성적과 목표 성적을 기반으로 학습 계획을 세워주세요.

현재 성적: ${JSON.stringify(currentGrades)}
목표 성적: ${JSON.stringify(targetGrades)}
마감일: ${deadline}

각 과목별로 구체적인 학습 계획을 JSON 배열로 제공해주세요:
[
  {
    "subject": "과목명",
    "targetScore": 목표 점수,
    "currentScore": 현재 점수,
    "tasks": ["구체적인 학습 과제1", "구체적인 학습 과제2"],
    "deadline": "${deadline}"
  }
]
`;

    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: '당신은 학습 전문가입니다. 학생의 현재 수준과 목표에 맞는 효과적인 학습 계획을 제공합니다.',
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      temperature: 0.7,
      max_tokens: 1500,
      response_format: { type: 'json_object' },
    });

    const content = response.choices[0]?.message?.content;
    if (!content) {
      throw new Error('AI 응답이 비어있습니다.');
    }

    const result = JSON.parse(content);
    return result.studyPlan || result.plans || [];
  } catch (error) {
    console.error('OpenAI API 오류:', error);
    return generateMockStudyPlan(currentGrades, targetGrades);
  }
};

/**
 * Mock 분석 데이터 생성 (API 키가 없거나 오류 시)
 */
const generateMockAnalysis = (studentData: StudentData): AIAnalysisResult => {
  const mockUniversities: UniversityPrediction[] = [
    {
      universityName: '서울대학교',
      department: '컴퓨터공학과',
      admissionProbability: Math.max(20, 100 - studentData.gpa * 20),
      requiredScore: 1.5,
      competitionRate: 15.2,
    },
    {
      universityName: '연세대학교',
      department: '전기전자공학부',
      admissionProbability: Math.max(30, 100 - studentData.gpa * 15),
      requiredScore: 2.0,
      competitionRate: 12.5,
    },
    {
      universityName: '고려대학교',
      department: '소프트웨어학부',
      admissionProbability: Math.max(40, 100 - studentData.gpa * 12),
      requiredScore: 2.3,
      competitionRate: 10.8,
    },
  ];

  return {
    studentId: '',
    predictions: mockUniversities,
    weakSubjects: ['수학', '영어'],
    recommendations: [
      '내신 성적 향상을 위해 수학 과목에 더 집중하세요.',
      '비교과 활동 (대회, 동아리 등)을 추가하면 유리합니다.',
      '희망 전공과 관련된 독서 및 프로젝트 활동을 권장합니다.',
    ],
    studyPlan: [
      {
        subject: '수학',
        targetScore: 90,
        currentScore: 75,
        tasks: [
          '미적분 기본 개념 복습',
          '일일 문제풀이 30문제',
          '주말 모의고사 응시',
        ],
        deadline: '2025-06-30',
      },
    ],
    generatedAt: new Date().toISOString(),
  };
};

/**
 * Mock 학습 계획 생성
 */
const generateMockStudyPlan = (
  currentGrades: Record<string, number>,
  targetGrades: Record<string, number>
): StudyPlanItem[] => {
  return Object.keys(targetGrades).map((subject) => ({
    subject,
    targetScore: targetGrades[subject],
    currentScore: currentGrades[subject] || 0,
    tasks: [
      `${subject} 기본 개념 정리`,
      `${subject} 문제집 풀이 (1일 20문제)`,
      `${subject} 모의고사 주 1회 응시`,
    ],
    deadline: '2025-06-30',
  }));
};

export const openAIService = {
  analyzeAdmissionProbability,
  generateStudyPlan,
};
