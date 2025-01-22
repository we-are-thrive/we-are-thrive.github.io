// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';

// https://astro.build/config
export default defineConfig({
  site: 'https://thrivegroup.ai',
  integrations: [
    react(),
    tailwind(),
  ],
  experimental: {
    responsiveImages: true,
    svg: true
  }
});
