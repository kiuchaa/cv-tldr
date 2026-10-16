export const locales = ['en', 'nl'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'en';

export function isLocale(value: string | undefined): value is Locale {
	return value === 'en' || value === 'nl';
}

export function getLocale(current: string | undefined): Locale {
	return isLocale(current) ? current : defaultLocale;
}

export function localePath(locale: Locale, path = ''): string {
	const clean = path.replace(/^\//, '');
	if (locale === defaultLocale) return clean ? `/${clean}` : '/';
	return clean ? `/${locale}/${clean}` : `/${locale}/`;
}

export function dateLocale(locale: Locale): string {
	return locale === 'nl' ? 'nl-NL' : 'en-US';
}

/** Public URL for the built CV PDF of a locale. */
export function cvPdfPath(locale: Locale): string {
	return locale === defaultLocale ? '/cv.pdf' : `/cv-${locale}.pdf`;
}

/** Page URL to print for a locale (relative to site root). */
export function cvPrintPath(locale: Locale): string {
	return localePath(locale);
}
