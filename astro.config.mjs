// @ts-check
import { defineConfig, fontProviders } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
	i18n: {
		locales: ['en', 'nl'],
		defaultLocale: 'en',
		routing: {
			prefixDefaultLocale: false,
		},
	},
	vite: {
		plugins: [tailwindcss()],
	},
	fonts: [
		{
			provider: fontProviders.google(),
			name: 'Geist',
			cssVariable: '--font-geist-sans',
			weights: [400, 500, 700],
			styles: ['normal'],
			fallbacks: ['sans-serif'],
		},
		{
			provider: fontProviders.google(),
			name: 'Geist Mono',
			cssVariable: '--font-geist-mono',
			weights: [400],
			styles: ['normal'],
			fallbacks: ['monospace'],
		},
		{
			provider: fontProviders.local(),
			name: 'Junicode',
			cssVariable: '--font-junicode',
			fallbacks: ['serif'],
			options: {
				variants: [
					{
						src: ['./src/assets/fonts/Junicode.ttf'],
						weight: 400,
						style: 'normal',
					},
					{
						src: ['./src/assets/fonts/Junicode-Italic.ttf'],
						weight: 400,
						style: 'italic',
					},
					{
						src: ['./src/assets/fonts/Junicode-Bold.ttf'],
						weight: 700,
						style: 'normal',
					},
					{
						src: ['./src/assets/fonts/Junicode-BoldItalic.ttf'],
						weight: 700,
						style: 'italic',
					},
				],
			},
		},
	],
});
