import type { ReactNode } from 'react';
import clsx from 'clsx';

interface DividerProps {
  variant?: 'default' | 'gradient' | 'dashed' | 'dotted';
  orientation?: 'horizontal' | 'vertical';
  className?: string;
  children?: ReactNode;
}

/**
 * ✨ Modern Divider Component
 *
 * Features:
 * - Multiple variants (default, gradient, dashed, dotted)
 * - Horizontal and vertical orientations
 * - Optional label/text support
 * - Stripe/Linear-inspired design
 */
export const Divider = ({
  variant = 'default',
  orientation = 'horizontal',
  className,
  children,
}: DividerProps) => {
  const baseStyles = orientation === 'horizontal'
    ? 'w-full'
    : 'h-full';

  const variants = {
    default: orientation === 'horizontal'
      ? 'border-t border-gray-200'
      : 'border-l border-gray-200',
    gradient: orientation === 'horizontal'
      ? 'h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent'
      : 'w-px bg-gradient-to-b from-transparent via-gray-300 to-transparent',
    dashed: orientation === 'horizontal'
      ? 'border-t border-dashed border-gray-300'
      : 'border-l border-dashed border-gray-300',
    dotted: orientation === 'horizontal'
      ? 'border-t border-dotted border-gray-300'
      : 'border-l border-dotted border-gray-300',
  };

  // If children provided, render as label divider
  if (children) {
    return (
      <div className={clsx('flex items-center gap-4 w-full', className)}>
        <div className={clsx(variants[variant], 'flex-1')} />
        <div className="text-sm font-medium text-gray-500">{children}</div>
        <div className={clsx(variants[variant], 'flex-1')} />
      </div>
    );
  }

  return (
    <div
      className={clsx(
        baseStyles,
        variants[variant],
        className
      )}
    />
  );
};
