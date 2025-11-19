import { useState, useCallback } from 'react';
import toast from 'react-hot-toast';

/**
 * API 호출 상태 관리를 위한 커스텀 훅
 * 로딩, 에러, 성공 상태를 자동으로 관리하고 일관된 에러 처리 제공
 *
 * @example
 * const { execute, loading, error, data } = useApiCall(async (userId: string) => {
 *   return await userAPI.getUser(userId);
 * });
 *
 * // 사용
 * const handleClick = () => execute('user-123');
 */

export interface UseApiCallOptions<T> {
  /** 성공 시 표시할 토스트 메시지 */
  successMessage?: string;
  /** 에러 시 표시할 토스트 메시지 (기본: 에러 메시지 그대로 표시) */
  errorMessage?: string;
  /** 성공 시 실행할 콜백 */
  onSuccess?: (data: T) => void;
  /** 에러 시 실행할 콜백 */
  onError?: (error: Error) => void;
  /** 완료 시 실행할 콜백 (성공/실패 무관) */
  onFinally?: () => void;
  /** true면 에러 토스트를 자동으로 표시하지 않음 */
  suppressErrorToast?: boolean;
}

export interface UseApiCallResult<T, Args extends any[]> {
  /** API 호출 함수 */
  execute: (...args: Args) => Promise<T | null>;
  /** 로딩 상태 */
  loading: boolean;
  /** 에러 객체 */
  error: Error | null;
  /** 응답 데이터 */
  data: T | null;
  /** 상태 초기화 */
  reset: () => void;
}

export function useApiCall<T, Args extends any[] = []>(
  apiFunction: (...args: Args) => Promise<T>,
  options: UseApiCallOptions<T> = {}
): UseApiCallResult<T, Args> {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [data, setData] = useState<T | null>(null);

  const execute = useCallback(
    async (...args: Args): Promise<T | null> => {
      setLoading(true);
      setError(null);

      try {
        const result = await apiFunction(...args);
        setData(result);

        // 성공 토스트
        if (options.successMessage) {
          toast.success(options.successMessage);
        }

        // 성공 콜백
        options.onSuccess?.(result);

        return result;
      } catch (err) {
        const error = err instanceof Error ? err : new Error(String(err));
        setError(error);

        // 에러 토스트
        if (!options.suppressErrorToast) {
          const message = options.errorMessage || error.message;
          toast.error(message);
        }

        // 에러 콜백
        options.onError?.(error);

        return null;
      } finally {
        setLoading(false);
        options.onFinally?.();
      }
    },
    [apiFunction, options]
  );

  const reset = useCallback(() => {
    setLoading(false);
    setError(null);
    setData(null);
  }, []);

  return {
    execute,
    loading,
    error,
    data,
    reset,
  };
}
