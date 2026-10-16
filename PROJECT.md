# CV site

Personal CV site built with Astro. One typed data file drives the web page; the same page is exported to `cv.pdf` on every build. Latest Hevy workouts are fetched at build time and shown on the web only.

## Stack

- Astro (static) + TypeScript (strict)
- Tailwind CSS v4
- Playwright (PDF generation)
- Hosting: Vercel

## Layout

| Path | Purpose |
|------|---------|
| `src/data/cv/en.ts` | English CV content |
| `src/data/cv/nl.ts` | Dutch CV content |
| `src/data/ui.ts` | UI labels (EN / NL) |
| `src/lib/hevy.ts` | Hevy API client + mapping |
| `src/lib/github.ts` | GitHub contribution graph data (build time) |
| `src/components/*` | Nav, intro, CV sections, GitHub graph, bookshelf, training, footer |
| `src/layouts/Base.astro` | HTML shell, fonts, meta |
| `src/pages/index.astro` | CV page |
| `src/styles/global.css` | Tailwind + print rules |
| `scripts/generate-pdf.ts` | Print conversion: `/` → `cv.pdf`, `/nl/` → `cv-nl.pdf` |
| `.github/workflows/daily-rebuild.yml` | Daily Vercel deploy hook |

## Scripts

```bash
npm run dev       # local preview
npm run build     # astro build + PDF
npm run pdf       # PDF only (expects dist/)
npm run preview   # serve dist/
```

## Environment

Copy `.env.example` to `.env`:

```
HEVY_API_KEY=
```

Set the same variable in the Vercel project. If the key is missing or the Hevy request fails, the Training block is omitted and the build still succeeds.

`VERCEL_DEPLOY_HOOK` is a **GitHub Actions secret** only (not a Vercel env var).

## Hevy

- Base: `https://api.hevyapp.com`
- `GET /v1/workouts?page=1&pageSize=2` and `GET /v1/workouts/count` with header `api-key`
- Docs: https://api.hevyapp.com/docs
- Requires Hevy Pro for an API key
- Profile link comes from `cv.contact.hevy`

## GitHub graph

The contribution graph uses the public `github-contributions-api.jogruber.de` API with the username from `cv.contact.github`. No token needed; if the request fails the graph is omitted.

## Deploy (Vercel)

1. Import this repo on Vercel (static Astro — no adapter needed).
2. Add `HEVY_API_KEY` in Project Settings → Environment Variables.
3. Create a Deploy Hook (Settings → Git → Deploy Hooks).
4. In the GitHub repo, add secret `VERCEL_DEPLOY_HOOK` with that URL.
5. Confirm `npm run build` produces `dist/index.html`, `dist/nl/index.html`, `dist/cv.pdf`, and `dist/cv-nl.pdf`.

Daily cron (06:17 UTC) POSTs the hook so Hevy data stays fresh.

### PDF conversion

Playwright/Chromium does **not** run on Vercel (too large / unsupported). Flow:

1. **Locally:** `npm run build` runs Playwright and writes `dist/cv.pdf` + `dist/cv-nl.pdf`, then copies them to `public/`.
2. **Commit** `public/cv.pdf` and `public/cv-nl.pdf`.
3. **Vercel:** `VERCEL=1` skips Playwright; Astro copies `public/*.pdf` into `dist/`.

| Locale | Page | PDF |
|--------|------|-----|
| `en` | `/` | `/cv.pdf` |
| `nl` | `/nl/` | `/cv-nl.pdf` |

Force-skip anywhere: `SKIP_PDF=1 npm run build`.

After CV content changes that should appear in the download, regenerate locally and commit the updated PDFs.

## Design notes

Single-page layout modeled on [balajmarius.com](https://balajmarius.com/): fixed glass nav, serif-italic emphasis, label/content grid sections, GitHub graph, bookshelf, Hevy card and a blue contact footer. Fonts: [Geist](https://vercel.com/font) (sans) and Junicode (serif, local files in `src/assets/fonts/`).

The PDF hides the nav, graph, bookshelf, training and quote, and adds a name/title header at the top.
