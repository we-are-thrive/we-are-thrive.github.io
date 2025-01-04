/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      // Add your custom theme extensions here
      colors: {
        // Example custom colors
        'primary': '#FF0000',
        'secondary': '#00FF00',
      },
      // Add other theme customizations
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}