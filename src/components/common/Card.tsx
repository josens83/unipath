import type { ReactNode } from 'react';
import clsx from 'clsx';
import { motion } from 'framer-motion';

interface CardProps {
  children: ReactNode;
  className?: string;
  padding?: 'none' | 'sm' | 'md' | 'lg';
  hover?: boolean;
  gradient?: boolean; // ✨ 그라데이션 테두리 옵션
  animate?: boolean; // ✨ 페이드인 애니메이션 옵션
  delay?: number; // ✨ 애니메이션 지연 시간
}

export const Card = ({
  children,
  className,
  padding = 'md',
  hover = false,
  gradient = false,
  animate = false,
  delay = 0,
}: CardProps) => {
  const paddings = {
    none: 'p-0',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  };

  const Component = animate ? motion.div : 'div';

  return (
    <Component
      {...(animate && {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.4, delay, ease: [0.25, 0.1, 0.25, 1] },
      })}
      {...(hover && {
        whileHover: {
          y: -4,
          transition: { duration: 0.2, ease: 'easeOut' }
        },
        whileTap: { scale: 0.98 },
      })}
      className={clsx(
        // ✨ Linear 스타일 개선 + 다크 모드 대응
        'bg-bg-surface rounded-xl shadow-md',
        'border border-border-subtle',

        // ✨ 호버 효과 강화
        hover && `
          transition-shadow duration-300 ease-out
          hover:shadow-xl hover:shadow-primary/10
          hover:border-primary-light
          dark:hover:shadow-primary/20
          dark:hover:border-primary
          cursor-pointer
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
    </Component>
  );
};
