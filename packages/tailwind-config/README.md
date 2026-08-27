# `@workspace/tailwind-config`

Shared Tailwind v4 theme foundation for every landing page in this monorepo.

This package is **CSS-first** (Tailwind v4). There is no classic `tailwind.config.js` preset — apps import these stylesheets instead.

## Shared vs per-page

| Layer        | Where            | What                                                                                |
| ------------ | ---------------- | ----------------------------------------------------------------------------------- |
| **Shared**   | `preset.css`     | Spacing, shadows, breakpoints, transition durations                                 |
| **Shared**   | `contract.css`   | Maps Shadcn CSS variables → Tailwind `@theme` tokens (radius scale from `--radius`) |
| **Per page** | App `:root`      | Colors + `--radius` as **hex** (see `tokens.example.css`)                           |
| **Per page** | App `layout.tsx` | Fonts via `next/font` → `--font-sans` / `--font-mono`                               |

There is **no dark/light toggle**. Each landing page ships one static `:root` set.

## CSS-variable contract

Every landing page must define these on `:root` using hex (`#RRGGBB` or `#RRGGBBAA`):

| Variable                                | Role                                                        |
| --------------------------------------- | ----------------------------------------------------------- |
| `--background`, `--foreground`          | Page canvas and default text                                |
| `--card`, `--card-foreground`           | Card surfaces                                               |
| `--popover`, `--popover-foreground`     | Popovers / dropdowns                                        |
| `--primary`, `--primary-foreground`     | Primary actions                                             |
| `--secondary`, `--secondary-foreground` | Secondary actions                                           |
| `--muted`, `--muted-foreground`         | Muted surfaces / helper text                                |
| `--accent`, `--accent-foreground`       | Accent highlights                                           |
| `--destructive`                         | Destructive actions / errors                                |
| `--border`, `--input`, `--ring`         | Borders, inputs, focus rings                                |
| `--chart-1` … `--chart-5`               | Chart series                                                |
| `--radius`                              | Base corner radius (`rem`); scale derived in `contract.css` |
| `--sidebar*`                            | Sidebar tokens (Shadcn set; include even if unused)         |

Fonts are **not** hex tokens. In `layout.tsx`:

```tsx
const sans = SomeFont({ subsets: ["latin"], variable: "--font-sans" })
```

Apply `sans.variable` on `<html>` (and optionally `--font-mono`).

## Wire up a new landing page

1. Depend on the packages you need:

   ```bash
   pnpm add @workspace/tailwind-config @workspace/ui --filter your-app
   ```

2. In the app CSS entry (e.g. `app/globals.css`):

   ```css
   @import "tailwindcss";
   @import "tw-animate-css";
   @import "shadcn/tailwind.css";
   @import "@workspace/tailwind-config/preset.css";
   @import "@workspace/tailwind-config/contract.css";

   /* Paste and customize from tokens.example.css */
   :root {
     --background: #ffffff;
     --foreground: #0a0a0a;
     /* …full contract… */
     --radius: 0.625rem;
   }

   @layer base {
     * {
       @apply border-border outline-ring/50;
     }
     body {
       @apply bg-background text-foreground;
     }
   }
   ```

3. Or, if the app uses `@workspace/ui/globals.css`, that file already imports the shared preset + contract. Override `:root` in the app only when the page needs different brand colors.

4. Set fonts with `next/font` on `<html>` as above.

5. Do **not** add a `.dark` block or `next-themes` for landing pages.

## Exports

| Export                                          | Path                    |
| ----------------------------------------------- | ----------------------- |
| `@workspace/tailwind-config/preset.css`         | Shared scales           |
| `@workspace/tailwind-config/contract.css`       | Variable → theme bridge |
| `@workspace/tailwind-config/tokens.example.css` | Example hex `:root`     |
