/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	darkMode: 'class',
	theme: {
		extend: {
      colors: {
        primaryAccent: { light: '#0A2463', dark: '#00FFFF' },
        primaryText: { light: '#1A1A1A', dark: '#E9ECEF' },
        secondaryAccent: { light: '#B5179E', dark: '#FF6B6B' },
        background: { light: '#F8F9FA', dark: '#0A2463' },
        neutral: { light: '#E0E0E0', dark: '#2D3436' },
      },
    },
	},
	plugins: [],
}
