/**
 * CV conversion: print each locale page to A4 PDF in dist/.
 *
 *   /      → dist/cv.pdf
 *   /nl/   → dist/cv-nl.pdf
 */
import { spawn, type ChildProcess } from 'node:child_process';
import { access, mkdir } from 'node:fs/promises';
import path from 'node:path';
import { chromium, type Browser, type Page } from 'playwright';
import { cvPdfPath, cvPrintPath, locales, type Locale } from '../src/i18n';

const ROOT = process.cwd();
const DIST = path.join(ROOT, 'dist');
const PREVIEW_HOST = '127.0.0.1';
const PREVIEW_PORT = 4321;
const PREVIEW_ORIGIN = `http://${PREVIEW_HOST}:${PREVIEW_PORT}`;

async function ensureDistExists() {
	try {
		await access(DIST);
	} catch {
		throw new Error('dist/ not found. Run `astro build` before generating PDFs.');
	}
}

async function ensureChromiumInstalled() {
	try {
		const browser = await chromium.launch({ headless: true });
		await browser.close();
		return;
	} catch {
		console.log('[pdf] Chromium not found — installing Playwright browser...');
	}

	await new Promise<void>((resolve, reject) => {
		const installer = spawn('npx', ['playwright', 'install', 'chromium'], {
			cwd: ROOT,
			stdio: 'inherit',
			shell: process.platform === 'win32',
		});
		installer.on('exit', (code) => {
			if (code === 0) resolve();
			else reject(new Error(`playwright install chromium exited with code ${code}`));
		});
		installer.on('error', reject);
	});
}

async function waitForServer(url: string, timeoutMs = 30_000) {
	const start = Date.now();
	while (Date.now() - start < timeoutMs) {
		try {
			const response = await fetch(url);
			if (response.ok || response.status === 404) return;
		} catch {
			// not ready
		}
		await new Promise((r) => setTimeout(r, 250));
	}
	throw new Error(`Timed out waiting for preview server at ${url}`);
}

function startPreview(): ChildProcess {
	return spawn(
		'npx',
		['astro', 'preview', '--host', PREVIEW_HOST, '--port', String(PREVIEW_PORT)],
		{
			cwd: ROOT,
			stdio: ['ignore', 'pipe', 'pipe'],
			shell: process.platform === 'win32',
			env: { ...process.env, FORCE_COLOR: '0' },
		},
	);
}

async function renderLocalePdf(browser: Browser, locale: Locale) {
	const pageUrl = `${PREVIEW_ORIGIN}${cvPrintPath(locale)}`;
	const outRel = cvPdfPath(locale);
	const outPath = path.join(DIST, outRel.replace(/^\//, ''));
	await mkdir(path.dirname(outPath), { recursive: true });

	const page: Page = await browser.newPage();
	try {
		// A4 CSS px at 96dpi ≈ 794×1123 — keeps layout consistent for print
		await page.setViewportSize({ width: 794, height: 1123 });
		await page.emulateMedia({ media: 'print' });
		await page.goto(pageUrl, { waitUntil: 'networkidle' });
		await page.evaluate(async () => {
			if (document.fonts?.ready) await document.fonts.ready;

			// Absolute http(s) URLs for reliable PDF link annotations
			for (const anchor of document.querySelectorAll<HTMLAnchorElement>('a[href]')) {
				const href = anchor.getAttribute('href');
				if (!href || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:')) {
					continue;
				}
				try {
					anchor.setAttribute('href', new URL(href, window.location.href).href);
				} catch {
					// leave as-is
				}
			}

			// Remove screen-only chrome so it cannot steal / skew link boxes
			document.querySelectorAll('.no-print').forEach((el) => el.remove());
		});
		await page.pdf({
			path: outPath,
			format: 'A4',
			printBackground: true,
			preferCSSPageSize: true,
			margin: { top: '0', right: '0', bottom: '0', left: '0' },
		});
		console.log(`[pdf] ${locale}: ${pageUrl} → ${outPath}`);
	} finally {
		await page.close();
	}
}

async function generatePdfs() {
	await ensureDistExists();
	await ensureChromiumInstalled();

	const preview = startPreview();
	let previewLogs = '';
	preview.stdout?.on('data', (chunk: Buffer) => {
		previewLogs += chunk.toString();
	});
	preview.stderr?.on('data', (chunk: Buffer) => {
		previewLogs += chunk.toString();
	});

	try {
		await waitForServer(`${PREVIEW_ORIGIN}/`);

		const browser = await chromium.launch({ headless: true });
		try {
			for (const locale of locales) {
				await renderLocalePdf(browser, locale);
			}
		} finally {
			await browser.close();
		}
	} catch (error) {
		if (previewLogs) console.error('[pdf] preview logs:\n', previewLogs);
		throw error;
	} finally {
		preview.kill('SIGTERM');
	}
}

generatePdfs().catch((error) => {
	console.error('[pdf] failed:', error);
	process.exit(1);
});
