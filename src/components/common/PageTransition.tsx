import { motion } from 'framer-motion';
import type { ReactNode } from 'react';
import { pageVariants } from '../../utils/animations';

interface PageTransitionProps {
  children: ReactNode;
  className?: string;
}

/**
 * 페이지 전환 애니메이션 래퍼 컴포넌트
 * 모든 페이지를 이 컴포넌트로 감싸면 부드러운 전환 효과 적용
 */
export const PageTransition = ({ children, className = '' }: PageTransitionProps) => {
  return (
    <motion.div
      initial="initial"
      animate="enter"
      exit="exit"
      variants={pageVariants}
      className={className}
    >
      {children}
    </motion.div>
  );
};
