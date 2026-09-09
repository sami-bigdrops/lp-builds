import type { SectionDefinition } from "@/models/sections-catalog"
import { CodeBlock } from "@/views/code-block"
import { SectionPreview } from "@/views/section-preview"

type SectionDetailViewProps = {
  section: SectionDefinition
}

export async function SectionDetailView({ section }: SectionDetailViewProps) {
  const Preview = section.Preview

  return (
    <div className="flex flex-col gap-8 p-8">
      <header className="max-w-3xl">
        <h1 className="text-2xl font-medium tracking-tight">{section.title}</h1>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          {section.description}
        </p>
      </header>

      <section
        className="flex flex-col gap-3"
        aria-labelledby="preview-heading"
      >
        <h2 id="preview-heading" className="text-sm font-medium">
          Live preview
        </h2>
        <SectionPreview>
          {Preview ? (
            <Preview />
          ) : (
            <p className="text-sm text-muted-foreground">
              No preview component registered for this section.
            </p>
          )}
        </SectionPreview>
      </section>

      <section className="flex flex-col gap-3" aria-labelledby="code-heading">
        <h2 id="code-heading" className="text-sm font-medium">
          Source
        </h2>
        <CodeBlock code={section.code} language="tsx" />
      </section>

      <section
        className="flex max-w-3xl flex-col gap-4"
        aria-labelledby="usage-heading"
      >
        <h2 id="usage-heading" className="text-sm font-medium">
          Usage notes
        </h2>

        <UsageList title="Props" items={section.usageNotes.props} />
        <UsageList
          title="Meant to be customized"
          items={section.usageNotes.customize}
        />
        <UsageList title="Leave as-is" items={section.usageNotes.leaveAsIs} />
      </section>
    </div>
  )
}

function UsageList({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <h3 className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
        {title}
      </h3>
      {items.length === 0 ? (
        <p className="mt-1 text-sm text-muted-foreground">None listed.</p>
      ) : (
        <ul className="mt-1 list-disc space-y-1 pl-5 text-sm leading-relaxed">
          {items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      )}
    </div>
  )
}
