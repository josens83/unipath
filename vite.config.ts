import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // 청크 크기 경고 임계값 (KB)
    chunkSizeWarningLimit: 500,
    rollupOptions: {
      output: {
        // 수동 청크 분할 최적화
        manualChunks: {
          // React 생태계
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          // 차트 라이브러리 (크기가 큼)
          'chart-vendor': ['chart.js', 'react-chartjs-2'],
          // 폼 관련 라이브러리
          'form-vendor': ['react-hook-form', '@hookform/resolvers', 'zod'],
          // 애니메이션 라이브러리 (Framer Motion은 큼)
          'animation-vendor': ['framer-motion'],
          // 아이콘 라이브러리
          'icon-vendor': ['lucide-react'],
          // 유틸리티 라이브러리
          'util-vendor': ['clsx', 'react-hot-toast'],
        },
      },
    },
    // 소스맵 생성 (프로덕션에서는 필요시만)
    sourcemap: false,
    // 최소화 옵션 (기본 esbuild가 빠르고 효율적)
    minify: 'esbuild',
  },
  // 프리뷰 서버 설정
  preview: {
    port: 4173,
    strictPort: true,
  },
})
