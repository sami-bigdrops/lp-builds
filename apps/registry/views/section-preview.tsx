import { cn } from "@workspace/ui/lib/utils"

type SectionPreviewProps = {
  children: React.ReactNode
  className?: string
}

export function SectionPreview({ children, className }: SectionPreviewProps) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-lg border border-border bg-background",
        className
      )}
    >
      <div className="border-b border-border bg-muted/40 px-3 py-2">
        <p className="text-xs font-medium text-muted-foreground">Preview</p>
      </div>
      <div className="bg-background p-gutter py-section-sm">{children}</div>
    </div>
  )
}
