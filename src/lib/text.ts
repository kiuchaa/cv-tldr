import type { RichText } from '../data/types';

export function toPlainText(content: RichText): string {
	return content.map((part) => (typeof part === 'string' ? part : part.text)).join('');
}
