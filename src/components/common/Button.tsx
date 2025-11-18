import type { ButtonHTMLAttributes, ReactNode } from 'react';
import clsx from 'clsx';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: ReactNode;
  fullWidth?: boolean;
  animate?: boolean; // ✨ 페이드인 애니메이션 옵션
  loading?: boolean; // ✨ 로딩 상태 옵션
}

export const Button = ({
  variant = 'primary',
  size = 'md',
  children,
  fullWidth = false,
  animate = false,
  loading = false,
  disabled,
  className,
  ...props
}: ButtonProps) => {
  // ✨ Stripe 스타일의 마이크로 인터랙션 + 다크 모드 대응
  const baseStyles = `
    font-medium rounded-lg
    transition-all duration-200 ease-out
    focus:outline-none focus:ring-2 focus:ring-offset-2
    dark:focus:ring-offset-bg-surface
    disabled:opacity-50 disabled:cursor-not-allowed
    relative inline-flex items-center justify-center gap-2
  `;

  const variants = {
    primary: `
      bg-primary hover:bg-primary-hover
      text-white
      shadow-md hover:shadow-lg hover:shadow-primary/25
      focus:ring-primary
      dark:shadow-primary/10 dark:hover:shadow-primary/20
    `,
    secondary: `
      bg-secondary hover:bg-secondary-hover
      text-white
      shadow-md hover:shadow-lg hover:shadow-secondary/25
      focus:ring-secondary
      dark:shadow-secondary/10 dark:hover:shadow-secondary/20
    `,
    outline: `
      border-2 border-primary
      text-primary hover:text-primary-hover
      hover:bg-primary-subtle
      focus:ring-primary
      dark:border-primary dark:text-primary dark:hover:text-primary-hover
      dark:hover:bg-primary-subtle
    `,
    ghost: `
      text-text-secondary hover:text-text-primary
      hover:bg-bg-subtle active:bg-border-subtle
      focus:ring-text-tertiary
    `,
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  };

  const classNames = clsx(
    baseStyles,
    variants[variant],
    sizes[size],
    fullWidth && 'w-full',
    className
  );

  const content = (
    <>
      {loading && (
        <Loader2 className="animate-spin" size={size === 'sm' ? 14 : size === 'lg' ? 20 : 16} />
      )}
      {children}
    </>
  );

  // Use motion.button for animations, regular button otherwise
  if (animate) {
    // Exclude all event handlers that conflict with Framer Motion
    const {
      onDrag, onDragEnd, onDragStart,
      onAnimationStart, onAnimationEnd, onAnimationIteration,
      ...safeProps
    } = props;

    return (
      <motion.button
        className={classNames}
        disabled={disabled || loading}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
        whileHover={!disabled && !loading ? {
          y: -2,
          transition: { duration: 0.2, ease: 'easeOut' }
        } : undefined}
        whileTap={!disabled && !loading ? {
          scale: 0.98,
          y: 0
        } : undefined}
        {...(safeProps as any)}
      >
        {content}
      </motion.button>
    );
  }

  return (
    <button
      className={classNames}
      disabled={disabled || loading}
      {...props}
    >
      {content}
    </button>
  );
};
