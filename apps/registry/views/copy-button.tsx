"use client"

import { useState } from "react"
import { CheckIcon, ClipboardIcon } from "lucide-react"

import { Button } from "@workspace/ui/components/button"

type CopyButtonProps = {
  value: string
}

export function CopyButton({ value }: CopyButtonProps) {
  const [copied, setCopied] = useState(false)

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(value)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2000)
    } catch {
      setCopied(false)
    }
  }

  return (
    <Button
      type="button"
      variant="outline"
      size="sm"
      onClick={handleCopy}
      aria-label={copied ? "Copied" : "Copy code"}
    >
      {copied ? (
        <>
          <CheckIcon data-icon="inline-start" />
          Copied
        </>
      ) : (
        <>
          <ClipboardIcon data-icon="inline-start" />
          Copy
        </>
      )}
    </Button>
  )
}
