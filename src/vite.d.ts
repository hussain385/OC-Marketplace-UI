/// <reference types="vite/client" />
/// <reference types="vite-plugin-svgr/client" />

interface ImportMetaEnv {
  readonly VITE_ENCRYPTION_KEY: string;
  readonly VITE_API_SERVER_URL: string;
  readonly VITE_SERVER_URL: string;
  readonly VITE_PAYMENT_URL: string;
  readonly VITE_SINGPASS: string;
  readonly VITE_API_VERSION: string;
  readonly VITE_BUILD_NUMBER: string;
  readonly VITE_ENVIRONMENT: 'develop' | 'staging' | 'production';
}

// eslint-disable-next-line no-unused-vars
interface ImportMeta {
  readonly env: ImportMetaEnv;
}
