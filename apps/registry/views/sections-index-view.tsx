import Link from "next/link"

import type { SectionsIndexModel } from "@/controllers/sections-controller"
import { EmptyStateView } from "@/views/empty-state-view"

type SectionsIndexViewProps = {
  model: SectionsIndexModel
}

export function SectionsIndexView({ model }: SectionsIndexViewProps) {
  if (model.isEmpty) {
    return (
      <EmptyStateView title={model.title} description={model.description} />
    )
  }

  return (
    <div className="flex flex-col gap-6 p-8">
      <header className="max-w-2xl">
        <h1 className="text-2xl font-medium tracking-tight">{model.title}</h1>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          {model.description}
        </p>
      </header>

      <ul className="flex max-w-2xl flex-col gap-3">
        {model.sections.map((section) => (
          <li key={section.slug}>
            <Link
              href={section.href}
              className="block rounded-lg border border-border px-4 py-3 hover:bg-muted/40"
            >
              <span className="text-sm font-medium">{section.title}</span>
              <p className="mt-1 text-sm text-muted-foreground">
                {section.description}
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
