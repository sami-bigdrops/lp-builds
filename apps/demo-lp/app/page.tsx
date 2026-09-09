import { Button } from "@workspace/ui/components/button"

export default function Page() {
  return (
    <main>
      <section className="px-gutter py-section-lg md:px-gutter-lg">
        <p className="text-sm font-medium text-primary">demo-lp</p>
        <h1 className="mt-4 max-w-2xl text-4xl font-semibold tracking-tight md:text-5xl">
          Token contract validation
        </h1>
        <p className="mt-4 max-w-xl text-lg text-muted-foreground">
          Minimal landing page wired to the shared Tailwind preset and per-page
          CSS variable contract.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button size="lg">Primary CTA</Button>
          <Button size="lg" variant="outline">
            Secondary
          </Button>
        </div>
      </section>

      <section className="border-t border-border bg-card px-gutter py-section md:px-gutter-lg">
        <div className="max-w-xl rounded-lg border border-border bg-background p-gutter shadow-md">
          <h2 className="text-2xl font-semibold tracking-tight">
            Shared structural tokens
          </h2>
          <p className="mt-3 text-muted-foreground">
            Spacing, radius, and shadows come from the shared preset. Brand
            colors and fonts are defined only in this app&apos;s globals and
            layout.
          </p>
          <Button className="mt-6" variant="secondary">
            Learn more
          </Button>
        </div>
      </section>
    </main>
  )
}
