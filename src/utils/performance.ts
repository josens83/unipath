/**
 * 성능 모니터링 유틸리티
 *
 * Web Vitals 및 커스텀 성능 메트릭 추적
 */

import { logger } from './logger';

interface PerformanceMetric {
  name: string;
  value: number;
  rating: 'good' | 'needs-improvement' | 'poor';
  timestamp: number;
}

/**
 * Web Vitals 임계값
 */
const THRESHOLDS = {
  // First Contentful Paint (FCP)
  FCP: {
    good: 1800,
    poor: 3000,
  },
  // Largest Contentful Paint (LCP)
  LCP: {
    good: 2500,
    poor: 4000,
  },
  // First Input Delay (FID)
  FID: {
    good: 100,
    poor: 300,
  },
  // Cumulative Layout Shift (CLS)
  CLS: {
    good: 0.1,
    poor: 0.25,
  },
  // Time to First Byte (TTFB)
  TTFB: {
    good: 800,
    poor: 1800,
  },
};

/**
 * 메트릭 등급 계산
 */
const getRating = (
  value: number,
  threshold: { good: number; poor: number }
): 'good' | 'needs-improvement' | 'poor' => {
  if (value <= threshold.good) return 'good';
  if (value <= threshold.poor) return 'needs-improvement';
  return 'poor';
};

/**
 * 성능 메트릭 리포트
 */
const reportMetric = (metric: PerformanceMetric): void => {
  logger.logPerformance(metric.name, metric.value);

  // 프로덕션 환경에서 분석 서비스로 전송
  if (!import.meta.env.DEV) {
    // TODO: Google Analytics, Vercel Analytics 등과 통합
    // gtag('event', metric.name, {
    //   value: metric.value,
    //   rating: metric.rating,
    // });
  }
};

/**
 * Largest Contentful Paint (LCP) 측정
 */
export const measureLCP = (): void => {
  if (!('PerformanceObserver' in window)) return;

  try {
    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const lastEntry = entries[entries.length - 1] as PerformanceEntry & {
        renderTime?: number;
        loadTime?: number;
      };

      const value = lastEntry.renderTime || lastEntry.loadTime || 0;
      const metric: PerformanceMetric = {
        name: 'LCP',
        value,
        rating: getRating(value, THRESHOLDS.LCP),
        timestamp: Date.now(),
      };

      reportMetric(metric);
    });

    observer.observe({ type: 'largest-contentful-paint', buffered: true });
  } catch (error) {
    logger.error('Failed to measure LCP', error as Error);
  }
};

/**
 * First Input Delay (FID) 측정
 */
export const measureFID = (): void => {
  if (!('PerformanceObserver' in window)) return;

  try {
    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      entries.forEach((entry: any) => {
        const value = entry.processingStart - entry.startTime;
        const metric: PerformanceMetric = {
          name: 'FID',
          value,
          rating: getRating(value, THRESHOLDS.FID),
          timestamp: Date.now(),
        };

        reportMetric(metric);
      });
    });

    observer.observe({ type: 'first-input', buffered: true });
  } catch (error) {
    logger.error('Failed to measure FID', error as Error);
  }
};

/**
 * Cumulative Layout Shift (CLS) 측정
 */
export const measureCLS = (): void => {
  if (!('PerformanceObserver' in window)) return;

  let clsValue = 0;

  try {
    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      entries.forEach((entry: any) => {
        if (!entry.hadRecentInput) {
          clsValue += entry.value;
        }
      });

      const metric: PerformanceMetric = {
        name: 'CLS',
        value: clsValue,
        rating: getRating(clsValue, THRESHOLDS.CLS),
        timestamp: Date.now(),
      };

      reportMetric(metric);
    });

    observer.observe({ type: 'layout-shift', buffered: true });
  } catch (error) {
    logger.error('Failed to measure CLS', error as Error);
  }
};

/**
 * Time to First Byte (TTFB) 측정
 */
export const measureTTFB = (): void => {
  if (!('performance' in window) || !performance.timing) return;

  try {
    window.addEventListener('load', () => {
      const { responseStart, requestStart } = performance.timing;
      const value = responseStart - requestStart;

      const metric: PerformanceMetric = {
        name: 'TTFB',
        value,
        rating: getRating(value, THRESHOLDS.TTFB),
        timestamp: Date.now(),
      };

      reportMetric(metric);
    });
  } catch (error) {
    logger.error('Failed to measure TTFB', error as Error);
  }
};

/**
 * 커스텀 타이머 클래스
 */
class PerformanceTimer {
  private startTime: number;
  private name: string;

  constructor(name: string) {
    this.name = name;
    this.startTime = performance.now();
  }

  /**
   * 타이머 종료 및 측정값 반환
   */
  end(): number {
    const duration = performance.now() - this.startTime;
    logger.logPerformance(this.name, duration);
    return duration;
  }
}

/**
 * 커스텀 성능 측정
 * @example
 * const timer = startTimer('API Call');
 * await fetchData();
 * timer.end();
 */
export const startTimer = (name: string): PerformanceTimer => {
  return new PerformanceTimer(name);
};

/**
 * 함수 실행 시간 측정 데코레이터
 */
export const measureExecutionTime = <T extends (...args: any[]) => any>(
  fn: T,
  name?: string
): T => {
  return ((...args: Parameters<T>) => {
    const functionName = name || fn.name || 'Anonymous Function';
    const timer = startTimer(functionName);
    const result = fn(...args);

    if (result instanceof Promise) {
      return result.finally(() => timer.end());
    } else {
      timer.end();
      return result;
    }
  }) as T;
};

/**
 * 리소스 로딩 시간 측정
 */
export const measureResourceTiming = (): void => {
  if (!('performance' in window)) return;

  try {
    window.addEventListener('load', () => {
      const resources = performance.getEntriesByType('resource');
      const resourceMetrics = resources.map((resource: any) => ({
        name: resource.name,
        duration: resource.duration,
        size: resource.transferSize,
      }));

      logger.debug('Resource Timing', resourceMetrics);
    });
  } catch (error) {
    logger.error('Failed to measure resource timing', error as Error);
  }
};

/**
 * 모든 Web Vitals 측정 시작
 */
export const initPerformanceMonitoring = (): void => {
  // Web Vitals 측정
  measureLCP();
  measureFID();
  measureCLS();
  measureTTFB();
  measureResourceTiming();

  logger.info('Performance monitoring initialized');
};

/**
 * Navigation Timing API를 사용한 페이지 로드 성능 측정
 */
export const getNavigationTiming = (): Record<string, number> | null => {
  if (!('performance' in window) || !performance.timing) return null;

  const timing = performance.timing;
  const navigationStart = timing.navigationStart;

  return {
    // DNS 조회 시간
    dnsLookup: timing.domainLookupEnd - timing.domainLookupStart,
    // TCP 연결 시간
    tcpConnection: timing.connectEnd - timing.connectStart,
    // 요청 시간
    request: timing.responseStart - timing.requestStart,
    // 응답 시간
    response: timing.responseEnd - timing.responseStart,
    // DOM 처리 시간
    domProcessing: timing.domComplete - timing.domLoading,
    // 페이지 로드 완료 시간
    pageLoad: timing.loadEventEnd - navigationStart,
  };
};
