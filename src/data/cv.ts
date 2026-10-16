import type { Locale } from '../i18n';
import { getLocale } from '../i18n';
import { cvEn } from './cv/en';
import { cvNl } from './cv/nl';
import type { Cv } from './types';

export type {
	Book,
	Cv,
	Education,
	Experience,
	Inline,
	RichText,
	Ui,
} from './types';

const cvByLocale: Record<Locale, Cv> = {
	en: cvEn,
	nl: cvNl,
};

export function getCv(locale?: string): Cv {
	return cvByLocale[getLocale(locale)];
}

/** @deprecated Prefer getCv(Astro.currentLocale) */
export const cv = cvEn;
