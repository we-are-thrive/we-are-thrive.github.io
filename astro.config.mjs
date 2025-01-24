// @ts-check
import { defineConfig, envField } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://thrivegroup.ai',
  integrations: [
    react(),
    tailwind(),
    sitemap(),
  ],
  experimental: {
    responsiveImages: true,
    svg: true
  },
  env: {
    schema: {
      TAG_MANAGER_ID: envField.string({ context: "client", access: "public", optional: true }),
    }
  }
});
