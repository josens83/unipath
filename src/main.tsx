import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { setupGlobalErrorHandling, logger } from './utils/logger'
import { initPerformanceMonitoring } from './utils/performance'

// 전역 에러 핸들링 설정
setupGlobalErrorHandling()

// 성능 모니터링 초기화
initPerformanceMonitoring()

// 앱 시작 로그
logger.info('UniPath application started', {
  environment: import.meta.env.MODE,
  timestamp: new Date().toISOString(),
})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
