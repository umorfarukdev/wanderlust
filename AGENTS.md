<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# wanderlust-client

Next.js 16.4.3 (App Router, `src/app`) + React 19.3 client app. No test suite, no CI — verify with lint + typecheck + build.

## Commands

- `npm run dev` — dev server (Turbopack) at localhost:3000
- `npm run lint` — runs flat `eslint` (no args needed); config is `eslint.config.mjs`
- `npx tsc --noEmit` — there is no `typecheck` script; tsconfig has `noEmit: true`
- `npm run build` — final verification
- Recommended order: lint → tsc → build

## Conventions that differ from defaults

- shadcn/ui components use **Base UI** (`@base-ui/react`), not Radix — import primitives from `@base-ui/react/*` and style `[style=base-nova]` (see `components.json`). Do not substitute Radix imports or radix `data-*` attributes.
- Tailwind **v4** with CSS-first config: there is no `tailwind.config.js`; theme tokens and CSS variables live in `src/app/globals.css`. Tailwind is loaded as a Turbopack rule in `next.config.ts`, not a PostCSS setup.
- `cn` is re-exported from the `cn` package (`src/lib/utils.ts`) — shadcn's drop-in replacement for clsx + tailwind-merge, so className overrides merge correctly.
- Path alias `@/*` → `src/*` (components `@/components/ui`, hooks `@/hooks`, lib `@/lib`).
- React Compiler is enabled (`reactCompiler: true` in `next.config.ts` + babel plugin): do not hand-write `useMemo`/`useCallback`/manual memoization.
- Layouts/pages use Next 16 types, e.g. `LayoutProps<"/">` instead of hand-typed `children`. Check `node_modules/next/dist/docs/` for current APIs before writing framework code.

## Project

A travel-destinations landing app ("Wanderlust").

- `/` — landing page; composed of section components: `Banner`, `Features`, `Testimonials`, `CallToAction`
- `/add-destination` — placeholder page (to be built out)
- `Navbar`/`Footer` are rendered once in `src/app/layout.tsx`, which wraps all routes in a `min-h-full flex flex-col` body
- Font: **Josefin Sans** via `next/font/google`, loaded as CSS variable `--font-geist-mono` (name is as-is; referenced by `--font-mono` in `globals.css`)
- Static images live in `public/images/` (incl. `destinations/`); `next/image` remote loading only from `images.unsplash.com` (see `next.config.ts`)

## Structure

- `src/app/` — routes (`page.tsx`, `layout.tsx`, `globals.css`)
- `src/components/layout/` — page sections (`banner`, `features`, `testimonials`, `cta`, `navbar`, `footer`)
- `src/components/ui/` — generated shadcn components; add new ones via the shadcn CLI (`components.json` holds the schema and aliases); avoid hand-editing except for custom variants. All accept `data-slot` attributes and use `cva` variants.
- `src/hooks/`, `src/lib/` — hooks (`use-mobile`) and shared utilities

## Gotchas

- Path: `E:\Ai power web\milestone08\wanderlust-client` (contains a space — quote paths in shell commands)
- Icons: `lucide-react` (per `components.json`)
- Extra libs in use: `embla-carousel-react`, `react-resizable-panels`, `recharts`, `class-variance-authority`

