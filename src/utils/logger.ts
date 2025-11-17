/**
 * 애플리케이션 로거
 *
 * 개발 환경에서는 콘솔에 출력하고,
 * 프로덕션 환경에서는 외부 로깅 서비스로 전송할 수 있습니다.
 * (예: Sentry, LogRocket, DataDog 등)
 */

type LogLevel = 'debug' | 'info' | 'warn' | 'error';

interface LogEntry {
  level: LogLevel;
  message: string;
  timestamp: string;
  data?: any;
  error?: Error;
  userId?: string;
  sessionId?: string;
}

class Logger {
  private isDevelopment: boolean;
  private userId?: string;
  private sessionId: string;

  constructor() {
    this.isDevelopment = import.meta.env.DEV;
    this.sessionId = this.generateSessionId();
  }

  /**
   * 세션 ID 생성
   */
  private generateSessionId(): string {
    return `session-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }

  /**
   * 사용자 ID 설정 (로그인 시 호출)
   */
  setUserId(userId: string): void {
    this.userId = userId;
  }

  /**
   * 사용자 ID 초기화 (로그아웃 시 호출)
   */
  clearUserId(): void {
    this.userId = undefined;
  }

  /**
   * 로그 엔트리 생성
   */
  private createLogEntry(
    level: LogLevel,
    message: string,
    data?: any,
    error?: Error
  ): LogEntry {
    return {
      level,
      message,
      timestamp: new Date().toISOString(),
      data,
      error,
      userId: this.userId,
      sessionId: this.sessionId,
    };
  }

  /**
   * 로그 출력 (콘솔 또는 외부 서비스)
   */
  private log(entry: LogEntry): void {
    if (this.isDevelopment) {
      // 개발 환경: 콘솔 출력
      const style = this.getConsoleStyle(entry.level);
      console.log(
        `%c[${entry.level.toUpperCase()}] ${entry.message}`,
        style,
        entry.data || ''
      );
      if (entry.error) {
        console.error(entry.error);
      }
    } else {
      // 프로덕션 환경: 외부 서비스로 전송
      this.sendToExternalService(entry);
    }
  }

  /**
   * 콘솔 스타일 (개발 환경)
   */
  private getConsoleStyle(level: LogLevel): string {
    const styles = {
      debug: 'color: #9CA3AF',
      info: 'color: #3B82F6',
      warn: 'color: #F59E0B',
      error: 'color: #EF4444; font-weight: bold',
    };
    return styles[level];
  }

  /**
   * 외부 로깅 서비스로 전송 (프로덕션)
   */
  private sendToExternalService(entry: LogEntry): void {
    // TODO: 실제 로깅 서비스와 통합
    // 예: Sentry, LogRocket, DataDog 등

    // 현재는 에러만 브라우저 콘솔에 출력
    if (entry.level === 'error') {
      console.error('[Production Error]', entry);
    }

    // 예시: Sentry 통합
    // if (typeof Sentry !== 'undefined') {
    //   if (entry.error) {
    //     Sentry.captureException(entry.error, {
    //       extra: {
    //         message: entry.message,
    //         data: entry.data,
    //         userId: entry.userId,
    //         sessionId: entry.sessionId,
    //       },
    //     });
    //   } else {
    //     Sentry.captureMessage(entry.message, {
    //       level: entry.level,
    //       extra: entry.data,
    //     });
    //   }
    // }
  }

  /**
   * DEBUG 레벨 로그
   */
  debug(message: string, data?: any): void {
    const entry = this.createLogEntry('debug', message, data);
    this.log(entry);
  }

  /**
   * INFO 레벨 로그
   */
  info(message: string, data?: any): void {
    const entry = this.createLogEntry('info', message, data);
    this.log(entry);
  }

  /**
   * WARN 레벨 로그
   */
  warn(message: string, data?: any): void {
    const entry = this.createLogEntry('warn', message, data);
    this.log(entry);
  }

  /**
   * ERROR 레벨 로그
   */
  error(message: string, error?: Error, data?: any): void {
    const entry = this.createLogEntry('error', message, data, error);
    this.log(entry);
  }

  /**
   * API 요청 로깅
   */
  logApiRequest(method: string, url: string, data?: any): void {
    this.debug(`API Request: ${method} ${url}`, data);
  }

  /**
   * API 응답 로깅
   */
  logApiResponse(method: string, url: string, status: number, data?: any): void {
    if (status >= 200 && status < 300) {
      this.debug(`API Response: ${method} ${url} - ${status}`, data);
    } else {
      this.warn(`API Response: ${method} ${url} - ${status}`, data);
    }
  }

  /**
   * API 에러 로깅
   */
  logApiError(method: string, url: string, error: Error): void {
    this.error(`API Error: ${method} ${url}`, error);
  }

  /**
   * 사용자 액션 로깅 (분석용)
   */
  logUserAction(action: string, data?: any): void {
    this.info(`User Action: ${action}`, data);
  }

  /**
   * 페이지 뷰 로깅 (분석용)
   */
  logPageView(path: string): void {
    this.info(`Page View: ${path}`);
  }

  /**
   * 성능 메트릭 로깅
   */
  logPerformance(metric: string, value: number, unit: string = 'ms'): void {
    this.debug(`Performance: ${metric} = ${value}${unit}`);
  }
}

// 싱글톤 인스턴스
export const logger = new Logger();

/**
 * 전역 에러 핸들러 설정
 */
export const setupGlobalErrorHandling = (): void => {
  // 처리되지 않은 Promise rejection
  window.addEventListener('unhandledrejection', (event) => {
    logger.error(
      'Unhandled Promise Rejection',
      new Error(event.reason),
      { reason: event.reason }
    );
  });

  // 전역 에러
  window.addEventListener('error', (event) => {
    logger.error(
      'Global Error',
      event.error || new Error(event.message),
      {
        filename: event.filename,
        lineno: event.lineno,
        colno: event.colno,
      }
    );
  });
};
