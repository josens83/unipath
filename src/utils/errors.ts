/**
 * Error Handling Utilities
 * 일관된 에러 처리 및 사용자 친화적 메시지 제공
 */

/**
 * 커스텀 에러 클래스
 */
export class AppError extends Error {
  code?: string;
  statusCode?: number;

  constructor(
    message: string,
    code?: string,
    statusCode?: number
  ) {
    super(message);
    this.name = 'AppError';
    this.code = code;
    this.statusCode = statusCode;
  }
}

/**
 * 인증 관련 에러
 */
export class AuthError extends AppError {
  constructor(message: string, code?: string) {
    super(message, code, 401);
    this.name = 'AuthError';
  }
}

/**
 * 권한 관련 에러
 */
export class PermissionError extends AppError {
  constructor(message: string = '접근 권한이 없습니다.') {
    super(message, 'PERMISSION_DENIED', 403);
    this.name = 'PermissionError';
  }
}

/**
 * 리소스를 찾을 수 없는 에러
 */
export class NotFoundError extends AppError {
  constructor(resource: string = '리소스') {
    super(`${resource}를 찾을 수 없습니다.`, 'NOT_FOUND', 404);
    this.name = 'NotFoundError';
  }
}

/**
 * 유효성 검사 에러
 */
export class ValidationError extends AppError {
  fields?: Record<string, string>;

  constructor(
    message: string,
    fields?: Record<string, string>
  ) {
    super(message, 'VALIDATION_ERROR', 400);
    this.name = 'ValidationError';
    this.fields = fields;
  }
}

/**
 * 네트워크 에러
 */
export class NetworkError extends AppError {
  constructor(message: string = '네트워크 연결을 확인해주세요.') {
    super(message, 'NETWORK_ERROR', 0);
    this.name = 'NetworkError';
  }
}

/**
 * 에러 코드별 한국어 메시지 매핑
 */
const ERROR_MESSAGES: Record<string, string> = {
  // Auth errors
  'auth/invalid-email': '유효하지 않은 이메일 주소입니다.',
  'auth/user-disabled': '비활성화된 계정입니다.',
  'auth/user-not-found': '등록되지 않은 이메일입니다.',
  'auth/wrong-password': '잘못된 비밀번호입니다.',
  'auth/email-already-in-use': '이미 사용 중인 이메일입니다.',
  'auth/weak-password': '비밀번호는 6자 이상이어야 합니다.',
  'auth/too-many-requests': '너무 많은 시도가 있었습니다. 잠시 후 다시 시도해주세요.',
  'auth/network-request-failed': '네트워크 연결을 확인해주세요.',

  // Supabase errors
  'PGRST116': '리소스를 찾을 수 없습니다.',
  '23505': '이미 존재하는 데이터입니다.',
  '23503': '참조 무결성 제약 조건 위반입니다.',
  '42501': '권한이 없습니다.',

  // Common errors
  VALIDATION_ERROR: '입력값을 확인해주세요.',
  NETWORK_ERROR: '네트워크 연결을 확인해주세요.',
  PERMISSION_DENIED: '접근 권한이 없습니다.',
  NOT_FOUND: '요청한 리소스를 찾을 수 없습니다.',
  INTERNAL_ERROR: '일시적인 오류가 발생했습니다. 잠시 후 다시 시도해주세요.',
};

/**
 * 에러를 사용자 친화적인 메시지로 변환
 */
export function getErrorMessage(error: unknown): string {
  // 이미 우리가 정의한 커스텀 에러인 경우
  if (error instanceof AppError) {
    return error.message;
  }

  // Error 객체인 경우
  if (error instanceof Error) {
    // 에러 코드가 있으면 매핑 테이블에서 찾기
    const errorCode = (error as any).code;
    if (errorCode && ERROR_MESSAGES[errorCode]) {
      return ERROR_MESSAGES[errorCode];
    }

    // 에러 메시지 그대로 반환
    return error.message;
  }

  // 문자열인 경우
  if (typeof error === 'string') {
    return error;
  }

  // 알 수 없는 에러
  return '알 수 없는 오류가 발생했습니다.';
}

/**
 * Supabase 에러를 AppError로 변환
 */
export function handleSupabaseError(error: any): AppError {
  const message = getErrorMessage(error);
  const code = error?.code || 'UNKNOWN_ERROR';

  // 인증 관련 에러
  if (code.startsWith('auth/') || code === '42501') {
    return new AuthError(message, code);
  }

  // Not found 에러
  if (code === 'PGRST116') {
    return new NotFoundError();
  }

  // 일반 에러
  return new AppError(message, code);
}

/**
 * API 에러를 AppError로 변환
 */
export function handleApiError(error: unknown): AppError {
  // 이미 AppError면 그대로 반환
  if (error instanceof AppError) {
    return error;
  }

  // Fetch/Axios 에러 처리
  if (typeof error === 'object' && error !== null) {
    const err = error as any;

    // 네트워크 에러
    if (err.message === 'Network Error' || !navigator.onLine) {
      return new NetworkError();
    }

    // HTTP 상태 코드별 처리
    if (err.response?.status) {
      const status = err.response.status;
      const message = err.response.data?.message || getErrorMessage(error);

      switch (status) {
        case 400:
          return new ValidationError(message);
        case 401:
          return new AuthError(message);
        case 403:
          return new PermissionError(message);
        case 404:
          return new NotFoundError();
        default:
          return new AppError(message, 'API_ERROR', status);
      }
    }
  }

  // 기본 에러
  const message = getErrorMessage(error);
  return new AppError(message);
}

/**
 * 비동기 함수를 에러 핸들링으로 감싸기
 */
export async function withErrorHandling<T>(
  fn: () => Promise<T>,
  options: {
    /** 에러 발생 시 기본값 반환 */
    fallback?: T;
    /** 에러 발생 시 실행할 콜백 */
    onError?: (error: AppError) => void;
  } = {}
): Promise<T | undefined> {
  try {
    return await fn();
  } catch (error) {
    const appError = handleApiError(error);

    // 에러 콜백 실행
    options.onError?.(appError);

    // fallback이 있으면 반환
    if (options.fallback !== undefined) {
      return options.fallback;
    }

    // 에러 다시 던지기
    throw appError;
  }
}

/**
 * 여러 에러를 하나로 합치기
 */
export function combineErrors(errors: Error[]): AppError {
  if (errors.length === 0) {
    return new AppError('에러가 없습니다.');
  }

  if (errors.length === 1) {
    return handleApiError(errors[0]);
  }

  const messages = errors.map((e) => e.message).join('\n');
  return new AppError(`다음 오류가 발생했습니다:\n${messages}`, 'MULTIPLE_ERRORS');
}

/**
 * 에러 로깅 (개발 환경에서만)
 */
export function logError(error: unknown, context?: string): void {
  if (import.meta.env.DEV) {
    console.group(`❌ Error${context ? ` in ${context}` : ''}`);
    console.error(error);
    if (error instanceof Error) {
      console.error('Stack:', error.stack);
    }
    console.groupEnd();
  }
}
