/// <reference types="vite/client" />

/**
 * Vite Environment Variables Type Definitions
 * import.meta.env에 대한 타입 정의
 */

interface ImportMetaEnv {
  readonly VITE_SUPABASE_URL?: string;
  readonly VITE_SUPABASE_ANON_KEY?: string;
  readonly VITE_TOSS_CLIENT_KEY?: string;
  readonly VITE_OPENAI_API_KEY?: string;
  readonly VITE_APP_ENV?: string;
  readonly MODE: string;
  readonly DEV: boolean;
  readonly PROD: boolean;
  readonly SSR: boolean;
}
