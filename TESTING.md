# TESTING.md

## Run locally (development)

1. Copy environment example files:

```bash
cp .env.example .env
cp firebase-applet-config.example firebase-applet-config.json
```

2. Edit `.env` and `firebase-applet-config.json` with real values **locally** (do not commit). Ensure `GEMINI_API_KEY` is set.

3. Install dependencies:

```bash
npm install
```

4. Run TypeScript check (lint):

```bash
npm run lint
# or
npx tsc --noEmit
```

5. Start dev server:

```bash
npm run dev
```


## Notes
- The public repository has had Firebase keys redacted. If you previously committed any API keys, rotate them immediately.
- Use secrets in your hosting environment rather than committing keys to the repo.
