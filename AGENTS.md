<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Bangla News 24

Bengali-language news portal: Next.js App Router frontend reading from a public news API, plus Better Auth + MongoDB for accounts. Node >= 20.9.

## Commands

- `npm run dev` — dev server at `http://localhost:3000`; also regenerates route types and the block above.
- `npm run build` / `npm start`
- `npm run lint` — ESLint flat config (Next core-web-vitals + TS). No Prettier/formatter script; don't add one unprompted.
- `npx tsc --noEmit` — typecheck. On a fresh clone run `npx next typegen` first; `LayoutProps`/`PageProps` are generated into `.next/types`.
- No test runner or test files exist. Don't invent `npm test`.

## Setup and external services

- `.env` is gitignored. Required keys: `MONGODB_URL`, `BETTER_AUTH_SECRET`, `BETTER_AUTH_URL`, `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`.
- Auth DB name `news24-auth-db` is hardcoded in `src/lib/db.ts` (shared by `src/lib/auth.ts`); the Better Auth handler is `src/app/api/auth/[...all]/route.ts`.
- Personalized data lives in the same database: `bookmarks` and `history` collections, written only through `/api/bookmarks` and `/api/history` (session-checked with `getCurrentUserId` in `src/lib/session.ts`).
- All news comes from `https://news-api-v2.vercel.app`, hardcoded in `src/lib/news.ts`, with `cache: "no-store"` on every fetch. News is not stored in MongoDB. `getNews(limit, offset, category, query)` supports both category-title filtering and full-text search (`q`); `/search` uses the latter.
- When the news API fails (network error, timeout, 402/5xx), `src/lib/news.ts` serves the last successful response from `.cache/news-api` (24h for news, 7d for categories). The cache is best-effort, gitignored, and only used as a fallback — never instead of a fresh request. With no cache, news pages render Bengali unavailable states instead of throwing.
- Remote `next/image` hosts must be added to `images.remotePatterns` in `next.config.ts` (currently only `ichef.bbci.co.uk`); otherwise article images fail to render.
- `src/app/globals.css` is the entire CSS setup: Tailwind v4 + daisyUI (`@plugin`, `toast` excluded) + HeroUI styles. daisyUI classes (`btn`, `btn-outline`) and HeroUI components are both in use.

## Next 16 / React 19 specifics

- Route protection lives in `src/proxy.ts` — Next 16 renamed the `middleware` file convention to `proxy`. It only guards paths in its exported `config.matcher` (currently `/profile`); add new protected paths there, not in a new `middleware.ts`.
- Dynamic route `params` are Promises: type as `{ params: Promise<{ id: string }> }` and `await params` (see `news/[newsId]`, `category/[categoryId]`).
- `LayoutProps`, `PageProps`, and `RouteContext` are global generated types — never import them.
- React Compiler is enabled (`reactCompiler: true` in `next.config.ts`).
- Consult `node_modules/next/dist/docs/` (especially `03-file-conventions/proxy.md`) before using unfamiliar Next APIs.

## Code layout and conventions

- `src/app` holds routes only: `(auth)/sign-in|sign-up`, `profile`, `news/[newsId]`, `category/[categoryId]`. Shared code is in `src/components/{homepage,shared}`, `src/lib`, `src/types`.
- Server components call `src/lib/news.ts` directly; there is no app-level news API route. Add `"use client"` only for interactivity/session hooks (`AuthButton`, `profile`, auth pages).
- `src/lib/auth.ts` is server-only. Browser code must import `src/lib/auth-client.ts` (`authClient`, `signIn`, `signUp`, `signOut`, `useSession`); pulling `auth.ts` into a client component breaks the build.
- API shapes live in `src/types/news.ts` as `I*` interfaces. `INewsItem.description` is a plain string, while `IArticle.description` is a rich block tree — don't treat them as interchangeable.
- Link cards to `/news/{id}` only when `type === "article" && !isLive`; otherwise use the external `link` field.
- User-facing copy is Bengali and dates use the `bn-BD` locale; brand color is `red-700`. Keep both when editing UI.
- `@gravity-ui/icons` is imported by client components but declared in `devDependencies`; production installs that omit dev dependencies will break.
- `CLAUDE.md` only re-exports this file (`@AGENTS.md`); make changes here.
