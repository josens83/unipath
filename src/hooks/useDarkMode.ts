import { useEffect, useState } from 'react';
import { useLocalStorage } from './useLocalStorage';

/**
 * ✨ Dark Mode Hook
 *
 * 다크 모드 상태를 관리하는 훅
 * - 시스템 설정 연동 (prefers-color-scheme)
 * - LocalStorage에 사용자 선택 저장
 * - 3가지 모드: 'light', 'dark', 'system'
 *
 * @example
 * const { theme, setTheme, resolvedTheme } = useDarkMode();
 *
 * // 테마 변경
 * <button onClick={() => setTheme('dark')}>다크 모드</button>
 *
 * // 현재 적용된 테마 확인
 * <p>현재 테마: {resolvedTheme}</p>
 */

export type Theme = 'light' | 'dark' | 'system';

export function useDarkMode() {
  const [theme, setTheme] = useLocalStorage<Theme>('theme', 'system');
  const [resolvedTheme, setResolvedTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');

    if (theme === 'system') {
      // 시스템 설정 가져오기
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light';
      root.classList.add(systemTheme);
      setResolvedTheme(systemTheme);
    } else {
      // 사용자가 직접 선택한 테마
      root.classList.add(theme);
      setResolvedTheme(theme);
    }
  }, [theme]);

  // 시스템 설정 변경 감지
  useEffect(() => {
    if (theme !== 'system') return;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const handleChange = (e: MediaQueryListEvent) => {
      const systemTheme = e.matches ? 'dark' : 'light';
      const root = window.document.documentElement;
      root.classList.remove('light', 'dark');
      root.classList.add(systemTheme);
      setResolvedTheme(systemTheme);
    };

    // 최신 브라우저용
    mediaQuery.addEventListener('change', handleChange);

    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, [theme]);

  return {
    theme,
    setTheme,
    resolvedTheme,
    /** 다크 모드 활성화 여부 */
    isDark: resolvedTheme === 'dark',
    /** 라이트 모드 활성화 여부 */
    isLight: resolvedTheme === 'light',
  };
}
