/// <reference types="astro/client" />

interface ImportMetaEnv {
  // Define your environment variables here
  readonly PUBLIC_SITE_URL: string;
  readonly PRIVATE_API_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
} 