import { codeToHtml } from "shiki"

import { CopyButton } from "@/views/copy-button"

type CodeBlockProps = {
  code: string
  language?: string
}

export async function CodeBlock({ code, language = "tsx" }: CodeBlockProps) {
  const highlighted = await codeToHtml(code, {
    lang: language,
    theme: "github-light",
  })

  return (
    <div className="overflow-hidden rounded-lg border border-border">
      <div className="flex items-center justify-between border-b border-border bg-muted/40 px-3 py-2">
        <p className="text-xs font-medium text-muted-foreground">
          {language.toUpperCase()}
        </p>
        <CopyButton value={code} />
      </div>
      <div
        className="overflow-x-auto bg-[#ffffff] p-4 text-sm [&_code]:font-mono [&_code]:text-[0.8125rem] [&_code]:leading-relaxed [&_pre]:m-0 [&_pre]:bg-transparent! [&_pre]:p-0"
        dangerouslySetInnerHTML={{ __html: highlighted }}
      />
    </div>
  )
}
