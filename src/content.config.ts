import { defineConfig } from 'astro/config';

export default defineConfig({
  env: {
    // Public variables (available in both client and server)
    PUBLIC_SITE_URL: {
      clientPrefix: 'PUBLIC_',
      server: true,
      client: true,
    },
    // Private variables (server-only)
    PRIVATE_API_KEY: {
      server: true,
      client: false,
    }
  }
}); 