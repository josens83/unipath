import type { ReactNode } from 'react';
import clsx from 'clsx';

interface CardProps {
  children: ReactNode;
  className?: string;
  padding?: 'none' | 'sm' | 'md' | 'lg';
  hover?: boolean;
  gradient?: boolean; // ✨ 그라데이션 테두리 옵션
}

export const Card = ({
  children,
  className,
  padding = 'md',
  hover = false,
  gradient = false,
}: CardProps) => {
  const paddings = {
    none: 'p-0',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  };

  return (
    <div
      className={clsx(
        // ✨ Linear 스타일 개선 + 다크 모드 대응
        'bg-bg-surface rounded-xl shadow-md',
        'border border-border-subtle',

        // ✨ 호버 효과 강화
        hover && `
          transition-all duration-300 ease-out
          hover:shadow-xl hover:shadow-primary/10
          hover:border-primary-light
          hover:-translate-y-1
          dark:hover:shadow-primary/20
          dark:hover:border-primary
        `,

        // ✨ 그라데이션 테두리 (옵션)
        gradient && `
          relative
          before:absolute before:inset-0
          before:rounded-xl before:p-[1px]
          before:bg-gradient-to-br before:from-primary-400 before:to-secondary-400
          before:-z-10
          bg-clip-padding
        `,

        paddings[padding],
        className
      )}
    >
      {children}
    </div>
  );
};
