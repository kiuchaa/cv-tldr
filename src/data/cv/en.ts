import type { Cv } from '../types';

export const cvEn: Cv = {
	name: 'KCJ Liu',
	title: 'Software Engineer',
	location: 'Arnhem, The Netherlands',
	headline: [
		[{ text: 'Creative', em: true, accent: true }, ' turned ', { text: 'engineer', em: true }, '.'],
		['I build ', { text: 'digital products', em: true }, ' and ', { text: 'motion', em: true, accent: true }, '.'],
	],
	summary: [
		[
			'I’m a software engineer at ',
			{ text: 'Pixel Creation', href: 'https://pixelcreation.nl', em: true },
			', a web agency in the Netherlands, where I build client websites, internal tooling and AI features. Alongside that I’m finishing my HBO-ICT bachelor at HAN.',
		],
		[
			'I built Pixel Core, the CMS and block system behind our client sites, and Pixie, an AI assistant inside our internal DMS.',
		],
		[
			'Outside of work, I train. I also read a lot. Before engineering, I made edits and motion graphics on Instagram, growing it to around 5k followers.',
		],
		[
			'For more information about my works, please visit my ',
			{ text: 'portfolio', href: 'https://kiucha.com', em: true },
			'.',
		],
	],
	contact: {
		email: 'liukcj.dev@gmail.com',
		linkedin: 'https://linkedin.com/in/liu-kcj',
		github: 'https://github.com/kiuchaa',
		hevy: 'https://hevy.com/user/k1u',
		x: '',
		portfolio: 'https://kiucha.com',
	},
	experience: [
		{
			company: 'Pixel Creation',
			role: 'Software Engineer',
			start: '2025',
			description:
				'Build client websites, internal tooling and AI features. Own Pixel Core (CMS / blocks) and Pixie (AI assistant in the DMS).',
		},
		{
			company: 'WebIQ',
			role: 'Intern Developer',
			start: '2024',
			end: '2024',
			description: 'Internship, learned about Vue.js and Nuxt.js.',
		},
		{
			company: 'AB-Solutions',
			role: 'Intern Developer',
			start: '2022',
			end: '2023',
			description: 'Internship, focus on backend development with Laravel and PHP.',
		},
	],
	education: [
		{
			school: 'HAN University of Applied Sciences',
			program: 'HBO-ICT',
			start: '2024',
			end: '2027',
			description: 'Bachelor, software architecture and design, patterns, and algorithms.',
		},
		{
			school: 'Rijn IJssel College',
			program: 'Software Developer',
			start: '2020',
			end: '2024',
			description: 'MBO, AGILE software development and project management, basics of C#, PHP, HTML & CSS.',
		},
	],
	skills: [
		{
			group: 'Languages',
			items: [
				{ name: 'Laravel' },
				{ name: 'PHP' },
				{ name: 'JavaScript' },
				{ name: 'Python' },
			],
		},
		{
			group: 'Tools',
			items: [
				{ name: 'PHPStorm', text: 'Daily IDE for Laravel and PHP work.' },
				{ name: 'Cursor IDE', text: 'AI workflows and project rules established to help the team work more efficiently.' },
				{ name: 'Bruno', text: 'API client for testing and exploring endpoints.' },
				{ name: 'Figma', text: 'Design handoff and light UI prototyping.' },
			],
		},
	],
	books: [
		{ title: 'MASTERY', author: 'Robert Greene', background: '#000010', color: '#e8e8ee' },
		{ title: 'YOUR FACE BELONGS TO US', author: 'Kashmir Hill', background: '#B2B9C9', color: '#2e2c1f' },
		{ title: 'INFLUENCE EMPIRE', author: 'LULU YILUN CHEN', background: '#DE2E19', color: '#eee8e8' },
	],
	booksHref: '',
	quote: ['Every great thing starts as a rough draft.'],
};
