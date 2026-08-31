import { readFileSync } from "node:fs"
import { dirname, resolve } from "node:path"
import { fileURLToPath } from "node:url"

import { describe, expect, it } from "vitest"

const __dirname = dirname(fileURLToPath(import.meta.url))
const appRoot = __dirname

function readAppFile(...segments: string[]) {
  return readFileSync(resolve(appRoot, ...segments), "utf8")
}

const FORBIDDEN_LAYOUT_PATTERNS = [
  /\bp-\[\d/,
  /\bpx-\[\d/,
  /\bpy-\[\d/,
  /\bpt-\[\d/,
  /\bpb-\[\d/,
  /\bpl-\[\d/,
  /\bpr-\[\d/,
  /\bshadow-\[/,
  /\brounded-\[\d/,
  /\b(?:p|px|py|pt|pb|pl|pr|gap|m|mx|my|mt|mb|ml|mr)-(?:0\.5|1|1\.5|2|2\.5|3|3\.5|4|5|6|7|8|9|10|11|12|14|16|20|24|28|32|36|40|48|56|64|72|80|96)\b/,
]

describe("demo-landing contract validation", () => {
  const globalsCss = readAppFile("app", "globals.css")
  const pageTsx = readAppFile("app", "page.tsx")

  it("imports shared preset and contract instead of ui globals", () => {
    expect(globalsCss).toContain("@workspace/tailwind-config/preset.css")
    expect(globalsCss).toContain("@workspace/tailwind-config/contract.css")
    expect(globalsCss).not.toContain("@workspace/ui/globals.css")
  })

  it("defines a distinct brand palette on :root", () => {
    expect(globalsCss).toContain("--primary: #2563eb")
    expect(globalsCss).toContain("--background: #f8fafc")
  })

  it("uses preset spacing and shadow utilities on the page", () => {
    expect(pageTsx).toMatch(/py-section/)
    expect(pageTsx).toMatch(/px-gutter-lg/)
    expect(pageTsx).toMatch(/shadow-md/)
    expect(pageTsx).toMatch(/rounded-lg/)
    expect(pageTsx).toMatch(/gap-gutter/)
  })

  it("does not hardcode spacing, radius, or shadow values on the page", () => {
    for (const pattern of FORBIDDEN_LAYOUT_PATTERNS) {
      expect(pageTsx).not.toMatch(pattern)
    }
  })
})
