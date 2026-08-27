import { Button } from "@workspace/ui/components/button"

import type { HomePageModel } from "@/controllers/home-controller"

const TOKEN_SWATCH_CLASS: Record<string, string> = {
  "--background": "bg-background border border-border",
  "--foreground": "bg-foreground",
  "--primary": "bg-primary",
  "--destructive": "bg-destructive",
  "--border": "bg-border border border-foreground/20",
}

type HomeViewProps = {
  model: HomePageModel
}

export function HomeView({ model }: HomeViewProps) {
  return (
    <div className="flex min-h-svh p-6">
      <div className="flex max-w-md min-w-0 flex-col gap-4 text-sm leading-loose">
        <div>
          <h1 className="font-medium">{model.title}</h1>
          <p>{model.description}</p>
          <p>
            Contract requires {model.contractTokenCount} tokens (colors +
            radius).
          </p>
          <Button className="mt-2">Button</Button>
        </div>

        <div>
          <p className="mb-2 font-mono text-xs text-muted-foreground">
            Sample theme tokens
          </p>
          <ul className="flex flex-wrap gap-3">
            {model.sampleTokens.map((token) => (
              <li
                key={token}
                className="flex items-center gap-2 font-mono text-xs"
              >
                <span
                  aria-hidden
                  className={`size-4 rounded-sm ${TOKEN_SWATCH_CLASS[token] ?? "bg-muted"}`}
                />
                {token}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
