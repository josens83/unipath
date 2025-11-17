import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // 청크 크기 경고 임계값 (KB)
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        // 수동 청크 분할 최적화
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'chart-vendor': ['chart.js', 'react-chartjs-2'],
          'form-vendor': ['react-hook-form', '@hookform/resolvers', 'zod'],
        },
      },
    },
    // 소스맵 생성 (프로덕션에서는 필요시만)
    sourcemap: false,
  },
  // 프리뷰 서버 설정
  preview: {
    port: 4173,
    strictPort: true,
  },
})
