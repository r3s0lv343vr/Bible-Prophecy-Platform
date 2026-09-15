# Revelation Expedition

An interactive learning platform for students, teenagers, and young adults. It turns Revelation study into an investigation: maps, symbols, evidence, history, and labelled Seventh-day Adventist historicist conclusions — not a digitized textbook.

The product name is intentionally not locked yet. The working line in the interface is **Revelation Expedition**.

## What this build is

Phase-1 signature prototype of the architecture document:

- Expedition table (home desk)
- Prophecy map of 23 chambers from the Interpreter's Chamber through Revelation 22
- Persistent explorer kit: journal, decoder, symbol codex, evidence board, timeline, artifacts, ranks
- Prophecy lab that scores reasoning paths
- Great Controversy war room
- Public investigation briefs (666, mark, 1844, Babylon, and more)
- Live news ticker/page (Adventist Review, world, archaeology RSS)
- Relics gallery + dark map using free APIs: Met Museum, Cleveland Museum of Art, Wikipedia/Wikimedia, OpenStreetMap/CARTO
- Content-driven engine so expeditions, symbols, and nav can change without rewriting the app shell

Theology is historicist / SDA, with text, history, SDA claim, and other Christian schools kept on separate layers.

## Stack

- Next.js (App Router) + TypeScript + Tailwind CSS v4
- Local progress in `localStorage` (no login required yet)
- Ready for Vercel

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
npm run lint
npm run build
```

## Vercel

This repo is configured as a Next.js project (`vercel.json`). There are **no required secrets** for the current APIs.

### Deploy from the Vercel dashboard (recommended)

1. Sign in at [vercel.com](https://vercel.com)
2. **Add New Project** and import `Bible-Prophecy-Platform`
3. Framework preset: Next.js
4. Deploy

### Deploy from the CLI

The Vercel CLI requires authentication. If you see a login prompt, that is expected — this environment has no `VERCEL_TOKEN`.

```bash
npx vercel login
npx vercel
npx vercel --prod
```

To let an agent deploy without an interactive login, create a token at [vercel.com/account/tokens](https://vercel.com/account/tokens) and set:

- `VERCEL_TOKEN`
- `VERCEL_ORG_ID`
- `VERCEL_PROJECT_ID`

Then: `npx vercel --token $VERCEL_TOKEN --yes`

## What will evolve

The UI shell is driven by `lib/nav.ts`. Expeditions live in `content/`. Progress, ranks, and kit state live in `lib/progress.ts`. Later phases can add accounts, classroom codes, grounded AI, PWA offline packs, and a native client without replacing the content model.
