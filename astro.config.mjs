// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';

// https://astro.build/config
export default defineConfig({
  integrations: [
    react(),
    tailwind(),
  ],
  experimental: {
    // Enable new image optimization features
    responsiveImages: true,
    // Enable new SVG components feature
    svg: true
  }
});
