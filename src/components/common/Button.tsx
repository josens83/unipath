import type { ButtonHTMLAttributes, ReactNode } from 'react';
import clsx from 'clsx';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: ReactNode;
  fullWidth?: boolean;
}

export const Button = ({
  variant = 'primary',
  size = 'md',
  children,
  fullWidth = false,
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
    transform active:scale-[0.98]
  `;

  const variants = {
    primary: `
      bg-primary hover:bg-primary-hover
      text-white
      shadow-md hover:shadow-lg hover:shadow-primary/25
      hover:-translate-y-0.5 active:translate-y-0
      focus:ring-primary
      dark:shadow-primary/10 dark:hover:shadow-primary/20
    `,
    secondary: `
      bg-secondary hover:bg-secondary-hover
      text-white
      shadow-md hover:shadow-lg hover:shadow-secondary/25
      hover:-translate-y-0.5 active:translate-y-0
      focus:ring-secondary
      dark:shadow-secondary/10 dark:hover:shadow-secondary/20
    `,
    outline: `
      border-2 border-primary
      text-primary hover:text-primary-hover
      hover:bg-primary-subtle
      hover:-translate-y-0.5 active:translate-y-0
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

  return (
    <button
      className={clsx(
        baseStyles,
        variants[variant],
        sizes[size],
        fullWidth && 'w-full',
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};
