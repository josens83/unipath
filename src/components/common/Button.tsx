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
  // ✨ Stripe 스타일의 마이크로 인터랙션
  const baseStyles = `
    font-medium rounded-lg
    transition-all duration-200 ease-out
    focus:outline-none focus:ring-2 focus:ring-offset-2
    disabled:opacity-50 disabled:cursor-not-allowed
    transform active:scale-[0.98]
  `;

  const variants = {
    primary: `
      bg-primary-500 hover:bg-primary-600 active:bg-primary-700
      text-white
      shadow-md hover:shadow-lg hover:shadow-primary-500/25
      hover:-translate-y-0.5 active:translate-y-0
      focus:ring-primary-500
    `,
    secondary: `
      bg-secondary-500 hover:bg-secondary-600 active:bg-secondary-700
      text-white
      shadow-md hover:shadow-lg hover:shadow-secondary-500/25
      hover:-translate-y-0.5 active:translate-y-0
      focus:ring-secondary-500
    `,
    outline: `
      border-2 border-primary-500
      text-primary-500 hover:text-primary-600 active:text-primary-700
      hover:bg-primary-50 active:bg-primary-100
      hover:-translate-y-0.5 active:translate-y-0
      focus:ring-primary-500
    `,
    ghost: `
      text-gray-700 hover:text-gray-900 active:text-gray-950
      hover:bg-gray-100 active:bg-gray-200
      focus:ring-gray-500
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
