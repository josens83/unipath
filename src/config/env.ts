/**
 * Environment Variables Configuration
 * 환경 변수 검증 및 타입 안전성 제공
 */

interface EnvConfig {
  supabase: {
    url: string;
    anonKey: string;
  };
  toss: {
    clientKey: string;
  };
  openai: {
    apiKey: string;
  };
  app: {
    env: 'development' | 'production' | 'test';
  };
}

/**
 * 필수 환경 변수 검증
 */
function validateEnv(): EnvConfig {
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
  const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
  const tossClientKey = import.meta.env.VITE_TOSS_CLIENT_KEY;
  const openaiApiKey = import.meta.env.VITE_OPENAI_API_KEY;
  const appEnv = import.meta.env.VITE_APP_ENV || 'development';

  const errors: string[] = [];

  // Supabase 필수 체크
  if (!supabaseUrl) {
    errors.push('VITE_SUPABASE_URL이 설정되지 않았습니다.');
  } else if (!supabaseUrl.startsWith('https://')) {
    errors.push('VITE_SUPABASE_URL은 https://로 시작해야 합니다.');
  }

  if (!supabaseAnonKey) {
    errors.push('VITE_SUPABASE_ANON_KEY가 설정되지 않았습니다.');
  }

  // TossPayments 필수 체크
  if (!tossClientKey) {
    errors.push('VITE_TOSS_CLIENT_KEY가 설정되지 않았습니다.');
  }

  // OpenAI 선택적 (없으면 경고만)
  if (!openaiApiKey) {
    console.warn(
      '[ENV] VITE_OPENAI_API_KEY가 설정되지 않았습니다. AI 컨설팅 기능이 Mock 데이터로 작동합니다.'
    );
  }

  // 환경 변수 검증
  if (!['development', 'production', 'test'].includes(appEnv)) {
    errors.push(
      `VITE_APP_ENV 값이 올바르지 않습니다: ${appEnv}. development, production, test 중 하나여야 합니다.`
    );
  }

  // 에러가 있으면 앱 시작 중단
  if (errors.length > 0) {
    const errorMessage =
      '환경 변수 설정 오류:\n\n' +
      errors.map((err, i) => `${i + 1}. ${err}`).join('\n') +
      '\n\n.env 파일을 확인하세요. .env.example을 참고하여 필요한 환경 변수를 설정하세요.';

    throw new Error(errorMessage);
  }

  return {
    supabase: {
      url: supabaseUrl!,
      anonKey: supabaseAnonKey!,
    },
    toss: {
      clientKey: tossClientKey!,
    },
    openai: {
      apiKey: openaiApiKey || '',
    },
    app: {
      env: appEnv as 'development' | 'production' | 'test',
    },
  };
}

// 환경 변수 검증 및 export
export const env = validateEnv();

// 개발 환경 체크 유틸리티
export const isDevelopment = env.app.env === 'development';
export const isProduction = env.app.env === 'production';
export const isTest = env.app.env === 'test';
