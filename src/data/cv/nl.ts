import type { Cv } from '../types';

export const cvNl: Cv = {
	name: 'KCJ Liu',
	title: 'Software Engineer',
	location: 'Arnhem, Nederland',
	headline: [
		[{ text: 'Creative', em: true, accent: true }, ' turned ', { text: 'engineer', em: true }, '.'],
		['Ik bouw ', { text: 'digitale producten', em: true }, ' en ', { text: 'motion', em: true, accent: true }, '.'],
	],
	summary: [
		[
			'Ik ben software engineer bij ',
			{ text: 'Pixel Creation', href: 'https://pixelcreation.nl', em: true },
			', een webagency in Nederland, waar ik websites voor klanten, interne tooling en AI-features bouw. Daarnaast rond ik mijn HBO-ICT bachelor af aan de HAN.',
		],
		[
			'Ik bouwde Pixel Core, het CMS- en blocksysteem achter onze klantensites, en Pixie, een AI-assistent in ons interne DMS.',
		],
		[
			'Buiten werk train ik. Ik lees ook veel. Voor ik engineer werd, maakte ik edits en motion graphics op Instagram, tot zo’n 5k volgers.',
		],
		[
			'Voor meer informatie over mijn werk, neem een kijkje op mijn ',
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
				'Bouw websites voor klanten, interne tooling en AI-features. Verantwoordelijk voor Pixel Core (CMS / blocks) en Pixie (AI-assistent in het DMS).',
		},
		{
			company: 'WebIQ',
			role: 'Stagiair Developer',
			start: '2024',
			end: '2024',
			description: 'Stage, geleerd over Storybook, Sentry CI/CD, Vue.js en Nuxt.js. Documentatie voor interne API geschreven en gekeken naar LLM-ondersteunde documentatie.',
		},
		{
			company: 'AB-Solutions',
			role: 'Stagiair Developer',
			start: '2022',
			end: '2023',
			description: 'Stage, focus op backend-ontwikkeling met Laravel en PHP. Introductie en cursus gevolgd in PHP en Laravel.',
		},
	],
	education: [
		{
			school: 'Hogeschool van Arnhem en Nijmegen',
			program: 'HBO-ICT',
			start: '2024',
			end: '2027',
			description: 'Bachelor, softwarearchitectuur en ontwerp, patterns en algoritmen.',
		},
		{
			school: 'Rijn IJssel College',
			program: 'Software Developer',
			start: '2020',
			end: '2024',
			description: 'MBO, AGILE softwareontwikkeling en projectmanagement, basis van C#, PHP, HTML & CSS.',
		},
	],
	skills: [
		{
			group: 'Talen',
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
				{ name: 'PHPStorm', text: 'Dagelijkse IDE voor Laravel- en PHP-werk.' },
				{ name: 'Cursor IDE', text: 'AI-workflows en project rules opgezet om het team efficiënter te laten werken.' },
				{ name: 'Bruno', text: 'API client voor het testen en verkennen van endpoints.' },
				{ name: 'Figma', text: 'Design-handoff en lichte UI-prototypes.' },
			],
		},
	],
	books: [
		{ title: 'MASTERY', author: 'Robert Greene', background: '#000010', color: '#e8e8ee' },
		{ title: 'YOUR FACE BELONGS TO US', author: 'Kashmir Hill', background: '#B2B9C9', color: '#2e2c1f' },
		{ title: 'INFLUENCE EMPIRE', author: 'LULU YILUN CHEN', background: '#DE2E19', color: '#eee8e8' },
	],
	booksHref: '',
	quote: ['Iets groots begint altijd met een eerste ontwerp.'],
};
