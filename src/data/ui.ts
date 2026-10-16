import type { Locale } from '../i18n';
import type { Ui } from './types';

const en: Ui = {
	menu: 'Menu',
	close: 'Close',
	intro: 'Intro',
	experience: 'Experience',
	education: 'Education',
	skills: 'Skills',
	bookshelf: 'Bookshelf',
	training: 'Training',
	contact: 'Contact',
	downloadCv: 'Download CV',
	moreBooks: 'More books',
	viewOnGithub: 'View on GitHub',
	latestTraining: 'Latest training sessions',
	date: 'Date',
	duration: 'Duration',
	volume: 'Volume',
	workouts: 'workouts',
	present: 'Present',
	email: 'Email',
	langEn: 'EN',
	langNl: 'NL',
};

const nl: Ui = {
	menu: 'Menu',
	close: 'Sluiten',
	intro: 'Intro',
	experience: 'Ervaring',
	education: 'Opleiding',
	skills: 'Skills',
	bookshelf: 'Boekenplank',
	training: 'Training',
	contact: 'Contact',
	downloadCv: 'Download CV',
	moreBooks: 'Meer boeken',
	viewOnGithub: 'Bekijk op GitHub',
	latestTraining: 'Laatste trainingen',
	date: 'Datum',
	duration: 'Duur',
	volume: 'Volume',
	workouts: 'workouts',
	present: 'Heden',
	email: 'E-mail',
	langEn: 'EN',
	langNl: 'NL',
};

const uiByLocale: Record<Locale, Ui> = { en, nl };

export function getUi(locale: Locale): Ui {
	return uiByLocale[locale];
}
