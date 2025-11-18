import { useEffect, useState } from 'react';

/**
 * 숫자 카운터 애니메이션 훅
 * @param end - 최종 목표 숫자
 * @param duration - 애니메이션 지속 시간 (ms)
 * @param start - 시작 숫자 (기본값: 0)
 * @returns 현재 애니메이션 중인 숫자
 */
export const useCountUp = (end: number, duration: number = 2000, start: number = 0) => {
  const [count, setCount] = useState(start);

  useEffect(() => {
    let startTime: number;
    let animationFrame: number;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);

      // Easing function: easeOutQuart
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);

      const currentCount = start + (end - start) * easeOutQuart;
      setCount(Math.floor(currentCount));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [end, duration, start]);

  return count;
};
