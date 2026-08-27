# shadcn/ui monorepo template

This is a Next.js monorepo template with shadcn/ui.

## Adding components

To add components to your app, run the following command at the root of your `registry` app:

```bash
pnpm dlx shadcn@latest add button -c apps/registry
```

This will place the UI components in the `packages/ui/src/components` directory.

## Using components

To use the components in your app, import them from the `ui` package:

```tsx
import { Button } from "@workspace/ui/components/button"
```

## Code quality

Linting and formatting are enforced from the repo root across all workspaces.

| Command             | Description                                |
| ------------------- | ------------------------------------------ |
| `pnpm lint`         | Run ESLint across all workspaces via Turbo |
| `pnpm lint:fix`     | Auto-fix ESLint issues where possible      |
| `pnpm format`       | Format the repo with Prettier              |
| `pnpm format:check` | Check formatting without writing           |

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
