import { Moon, Sun, Monitor } from 'lucide-react';
import { useDarkMode, type Theme } from '../../hooks/useDarkMode';
import clsx from 'clsx';

/**
 * ✨ Theme Toggle Component
 *
 * Linear/Stripe 스타일의 테마 전환 토글
 * - Light, Dark, System 3가지 모드 지원
 * - 부드러운 애니메이션
 * - 깔끔한 segmented control 디자인
 *
 * @example
 * // Navbar에 추가
 * <ThemeToggle />
 */

interface ThemeButtonProps {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
}

function ThemeButton({ active, onClick, icon, label }: ThemeButtonProps) {
  return (
    <button
      onClick={onClick}
      className={clsx(
        'p-2 rounded-lg transition-all duration-200',
        'flex items-center justify-center',
        'relative group',
        active
          ? 'bg-bg-surface text-text-primary shadow-sm'
          : 'hover:bg-bg-surface/50 text-text-tertiary hover:text-text-secondary'
      )}
      aria-label={label}
      title={label}
    >
      {icon}
      {/* Tooltip */}
      <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-bg-surface border border-border rounded-md text-xs text-text-secondary whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
        {label}
      </span>
    </button>
  );
}

export function ThemeToggle() {
  const { theme, setTheme } = useDarkMode();

  const themes: Array<{ value: Theme; icon: React.ReactNode; label: string }> = [
    {
      value: 'light',
      icon: <Sun className="w-4 h-4" />,
      label: '라이트 모드',
    },
    {
      value: 'dark',
      icon: <Moon className="w-4 h-4" />,
      label: '다크 모드',
    },
    {
      value: 'system',
      icon: <Monitor className="w-4 h-4" />,
      label: '시스템 설정',
    },
  ];

  return (
    <div className="flex gap-1 p-1 bg-bg-subtle rounded-xl border border-border-subtle">
      {themes.map(({ value, icon, label }) => (
        <ThemeButton
          key={value}
          active={theme === value}
          onClick={() => setTheme(value)}
          icon={icon}
          label={label}
        />
      ))}
    </div>
  );
}
