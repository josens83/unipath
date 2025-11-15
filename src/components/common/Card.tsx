import type { ReactNode } from 'react';
import clsx from 'clsx';

interface CardProps {
  children: ReactNode;
  className?: string;
  padding?: 'none' | 'sm' | 'md' | 'lg';
  hover?: boolean;
}

export const Card = ({
  children,
  className,
  padding = 'md',
  hover = false
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
        'bg-white rounded-xl shadow-md',
        paddings[padding],
        hover && 'transition-shadow duration-200 hover:shadow-lg',
        className
      )}
    >
      {children}
    </div>
  );
};
