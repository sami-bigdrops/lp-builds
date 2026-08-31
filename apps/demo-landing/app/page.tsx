import { ArrowRight } from "lucide-react"

import { Button } from "@workspace/ui/components/button"

export default function Page() {
  return (
    <main>
      <section className="bg-primary px-gutter-lg py-section text-primary-foreground shadow-md">
        <div className="mx-auto max-w-3xl">
          <p className="text-sm font-medium tracking-wide uppercase opacity-90">
            Contract validation
          </p>
          <h1 className="mt-gutter text-4xl font-semibold tracking-tight">
            Shared preset, page-owned colors
          </h1>
          <p className="mt-gutter max-w-xl text-primary-foreground/90">
            Spacing, radius, and shadows come from the shared preset. Colors and
            font are defined only in this app&apos;s CSS variables.
          </p>
          <Button
            variant="secondary"
            className="mt-gutter-lg bg-primary-foreground text-primary hover:bg-primary-foreground/90"
          >
            Get started
            <ArrowRight data-icon="inline-end" />
          </Button>
        </div>
      </section>

      <section className="px-gutter-lg py-section-sm">
        <div className="mx-auto grid max-w-3xl gap-gutter">
          <h2 className="text-2xl font-semibold">What this page proves</h2>
          <div className="grid gap-gutter sm:grid-cols-2">
            <article className="flex flex-col gap-gutter rounded-lg border bg-card p-gutter text-card-foreground shadow-sm">
              <h3 className="font-medium">Preset inheritance</h3>
              <p className="text-sm text-muted-foreground">
                Section padding uses <code>py-section</code> and{" "}
                <code>px-gutter-lg</code> from the shared preset — not local
                pixel values.
              </p>
            </article>
            <article className="flex flex-col gap-gutter rounded-lg border bg-card p-gutter text-card-foreground shadow-md">
              <h3 className="font-medium">Variable re-theming</h3>
              <p className="text-sm text-muted-foreground">
                Change <code>:root</code> hex values in{" "}
                <code>app/globals.css</code> to re-skin this page without
                touching component code.
              </p>
            </article>
          </div>
          <div className="rounded-lg bg-muted p-gutter shadow-xs">
            <p className="text-sm text-muted-foreground">
              Primary is{" "}
              <span className="font-medium text-primary">#2563eb</span> here —
              distinct from the registry default neutral theme.
            </p>
          </div>
        </div>
      </section>
    </main>
  )
}
