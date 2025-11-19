import { useState, useEffect } from 'react';

/**
 * 값의 업데이트를 지연시키는 디바운스 훅
 * 검색 입력 등에서 API 호출 빈도를 줄이는 데 유용
 *
 * @example
 * const [searchTerm, setSearchTerm] = useState('');
 * const debouncedSearchTerm = useDebounce(searchTerm, 500);
 *
 * useEffect(() => {
 *   // API 호출은 사용자가 입력을 멈춘 후 500ms 후에만 실행됨
 *   if (debouncedSearchTerm) {
 *     searchAPI(debouncedSearchTerm);
 *   }
 * }, [debouncedSearchTerm]);
 */

export function useDebounce<T>(value: T, delay: number = 500): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}
