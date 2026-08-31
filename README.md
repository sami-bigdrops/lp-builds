# Landing pages monorepo

Next.js monorepo for shared UI and landing pages, built with shadcn/ui and Tailwind CSS v4.

## Structure

| Path                         | Purpose                                           |
| ---------------------------- | ------------------------------------------------- |
| `apps/registry`              | Registry app (MVC layout + theme contract tests)  |
| `apps/demo-landing`          | Minimal landing page validating preset + contract |
| `packages/ui`                | Shared shadcn components and `globals.css`        |
| `packages/tailwind-config`   | Shared Tailwind preset + CSS-variable contract    |
| `packages/eslint-config`     | Shared ESLint configs                             |
| `packages/typescript-config` | Shared TypeScript configs                         |

## Adding components

From the repo root, target the `registry` app:

```bash
pnpm dlx shadcn@latest add button -c apps/registry
```

UI components land in `packages/ui/src/components`.

## Using components

```tsx
import { Button } from "@workspace/ui/components/button"
```

## Theming

Shared structural theme (spacing, shadows, breakpoints, durations) and the Shadcn CSS-variable bridge live in `@workspace/tailwind-config`. Brand colors and `--radius` are set per app on `:root` as **hex** values. Fonts are wired with `next/font` (`--font-sans`, `--font-mono`). There is no dark/light toggle — one static theme per landing page.

`packages/ui/src/styles/globals.css` already imports the shared preset and contract for apps that use the default neutral theme. Landing pages with their own brand colors should follow `apps/demo-landing` (import preset + contract in app CSS). Full wiring guide: [`packages/tailwind-config/README.md`](packages/tailwind-config/README.md).

## Demo landing page

`apps/demo-landing` is a throwaway page that proves the contract works end-to-end: hero + content section, Shadcn `Button`, preset spacing/shadows, and page-owned hex tokens.

```bash
pnpm --filter demo-landing dev
pnpm --filter demo-landing test
```

## Registry app (MVC)

`apps/registry` follows a simple MVC split:

| Layer      | Location                                          |
| ---------- | ------------------------------------------------- |
| Model      | `models/` — theme contract helpers and validation |
| Controller | `controllers/` — page data                        |
| View       | `views/` — presentational UI                      |
| Route      | `app/` — thin Next.js entry points                |

## Code quality

| Command             | Description                                |
| ------------------- | ------------------------------------------ |
| `pnpm lint`         | Run ESLint across all workspaces via Turbo |
| `pnpm lint:fix`     | Auto-fix ESLint issues where possible      |
| `pnpm format`       | Format the repo with Prettier              |
| `pnpm format:check` | Check formatting without writing           |
| `pnpm test`         | Run Vitest (registry theme contract tests) |
| `pnpm typecheck`    | Typecheck workspaces via Turbo             |

Shared ESLint lives in `@workspace/eslint-config`:

- `next-js` — Next.js apps (`apps/registry`)
- `react-internal` — shared React packages (`packages/ui`)

A root `eslint.config.js` (using `next-js`) supports lint-staged when hooks run from the repo root. Each workspace still has its own `eslint.config.js` for `pnpm lint`.

Prettier is configured at the repo root (`.prettierrc`). `eslint-config-prettier` disables ESLint rules that conflict with Prettier.

### Pre-commit hooks

[Husky](https://typicode.github.io/husky/) + [lint-staged](https://github.com/lint-staged/lint-staged) run on every commit:

1. ESLint `--fix` on staged JS/TS files (fails the commit on remaining errors)
2. Prettier on staged JS/TS/JSON/MD/CSS files

After `pnpm install`, the `prepare` script installs Git hooks automatically.

### CI

GitHub Actions runs lint and build on every pull request to `dev` or `main`, and on every push to those branches (see [`.github/workflows/ci.yml`](.github/workflows/ci.yml)).

| Detail   | Value                                                               |
| -------- | ------------------------------------------------------------------- |
| Job name | **Lint and Build** (required status check for branch protection)    |
| Command  | `turbo run lint build` across the monorepo                          |
| Caching  | pnpm store via `actions/setup-node`; Turbo local cache via `.turbo` |

Local hooks can be skipped with `--no-verify`. CI cannot — a failing lint or build fails the check.

### Branch protection

`main` is protected by a GitHub ruleset so merges stay gated on review workflow and CI:

| Rule                         | Setting                                    |
| ---------------------------- | ------------------------------------------ |
| Direct pushes                | Blocked — changes must go through a PR     |
| Required status check        | **Lint and Build** must pass               |
| Branch up to date            | Required before merge                      |
| Approving reviews            | Optional for now (solo); raise to 1+ later |
| Force pushes / branch delete | Restricted on `main`                       |

A PR with a red **Lint and Build** check cannot be merged. Merge only when the check is green and the branch is up to date with `main`.
