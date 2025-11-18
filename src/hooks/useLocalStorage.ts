import { useState, useEffect, useCallback } from 'react';
import { storage } from '../utils/helpers';

/**
 * localStorage와 동기화되는 상태 관리 훅
 * 값이 변경되면 자동으로 localStorage에 저장됨
 *
 * @example
 * const [theme, setTheme] = useLocalStorage('theme', 'light');
 *
 * // 사용
 * <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
 *   테마 변경
 * </button>
 */

export function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T | ((prev: T) => T)) => void, () => void] {
  // 초기값 로드 (localStorage에서)
  const [storedValue, setStoredValue] = useState<T>(() => {
    return storage.get<T>(key, initialValue);
  });

  // 값 업데이트 및 localStorage 저장
  const setValue = useCallback(
    (value: T | ((prev: T) => T)) => {
      setStoredValue((prev) => {
        const newValue = value instanceof Function ? value(prev) : value;
        storage.set(key, newValue);
        return newValue;
      });
    },
    [key]
  );

  // localStorage에서 제거
  const removeValue = useCallback(() => {
    storage.remove(key);
    setStoredValue(initialValue);
  }, [key, initialValue]);

  // 다른 탭에서 변경 감지 (storage event)
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === key && e.newValue !== null) {
        try {
          const newValue = JSON.parse(e.newValue);
          setStoredValue(newValue);
        } catch {
          // JSON parse 실패 시 무시
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [key]);

  return [storedValue, setValue, removeValue];
}
