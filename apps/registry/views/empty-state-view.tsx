import Link from "next/link"

type EmptyStateViewProps = {
  title: string
  description: string
  showCatalogHint?: boolean
  sectionsHref?: string
}

export function EmptyStateView({
  title,
  description,
  showCatalogHint = true,
  sectionsHref,
}: EmptyStateViewProps) {
  return (
    <div className="flex flex-col gap-4 p-8">
      <div className="max-w-xl">
        <h1 className="text-2xl font-medium tracking-tight">{title}</h1>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          {description}
        </p>
      </div>

      {showCatalogHint ? (
        <div className="max-w-xl rounded-lg border border-border bg-muted/30 p-4 text-sm leading-relaxed">
          <p className="font-medium">Add a section</p>
          <p className="mt-1 text-muted-foreground">
            Register a new entry in{" "}
            <code className="font-mono text-xs">
              models/sections-catalog.ts
            </code>
            . The dynamic route at{" "}
            <code className="font-mono text-xs">/sections/[slug]</code> will
            pick it up — no shell or routing changes required.
          </p>
        </div>
      ) : null}

      {sectionsHref ? (
        <div>
          <Link
            href={sectionsHref}
            className="inline-flex h-8 items-center rounded-lg bg-primary px-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/80"
          >
            Browse sections
          </Link>
        </div>
      ) : null}
    </div>
  )
}
