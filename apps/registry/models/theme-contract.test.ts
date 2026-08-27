import { readFileSync } from "node:fs"
import { dirname, resolve } from "node:path"
import { fileURLToPath } from "node:url"

import { describe, expect, it } from "vitest"

import {
  hasDarkModeBlock,
  hasSharedThemeImports,
  missingRequiredTokens,
  nonHexColorTokens,
  parseCssVariables,
  RADIUS_PATTERN,
  usesForbiddenColorFunctions,
} from "@/models/theme-contract"

const __dirname = dirname(fileURLToPath(import.meta.url))
const repoRoot = resolve(__dirname, "../../..")

function readRepoFile(...segments: string[]) {
  return readFileSync(resolve(repoRoot, ...segments), "utf8")
}

describe("theme contract model", () => {
  it("parses CSS custom properties", () => {
    const vars = parseCssVariables(`
      :root {
        --background: #ffffff;
        --radius: 0.625rem;
      }
    `)

    expect(vars["--background"]).toBe("#ffffff")
    expect(vars["--radius"]).toBe("0.625rem")
  })

  it("detects missing required tokens", () => {
    expect(
      missingRequiredTokens({ "--background": "#fff" }).length
    ).toBeGreaterThan(0)
  })

  it("rejects non-hex color values", () => {
    expect(
      nonHexColorTokens({
        "--background": "oklch(1 0 0)",
        "--foreground": "#0a0a0a",
      })
    ).toContain("--background")
  })
})

describe("shared Tailwind foundation (current task)", () => {
  const tokensExample = readRepoFile(
    "packages/tailwind-config/src/tokens.example.css"
  )
  const contractCss = readRepoFile("packages/tailwind-config/src/contract.css")
  const presetCss = readRepoFile("packages/tailwind-config/src/preset.css")
  const uiGlobals = readRepoFile("packages/ui/src/styles/globals.css")
  const packageJson = JSON.parse(
    readRepoFile("packages/tailwind-config/package.json")
  ) as { exports: Record<string, string> }

  it("exports preset, contract, and tokens.example from the package", () => {
    expect(packageJson.exports["./preset.css"]).toBe("./src/preset.css")
    expect(packageJson.exports["./contract.css"]).toBe("./src/contract.css")
    expect(packageJson.exports["./tokens.example.css"]).toBe(
      "./src/tokens.example.css"
    )
  })

  it("defines shared structural tokens in the preset", () => {
    expect(presetCss).toContain("--breakpoint-md:")
    expect(presetCss).toContain("--spacing-section:")
    expect(presetCss).toContain("--shadow-md:")
    expect(presetCss).toContain("--duration-normal:")
  })

  it("maps Shadcn variables in the contract without a dark variant", () => {
    expect(contractCss).toContain("--color-background: var(--background)")
    expect(contractCss).toContain("--radius-lg: var(--radius)")
    expect(hasDarkModeBlock(contractCss)).toBe(false)
  })

  it("ships an example :root with full hex contract and no dark mode", () => {
    const vars = parseCssVariables(tokensExample)

    expect(missingRequiredTokens(vars)).toEqual([])
    expect(nonHexColorTokens(vars)).toEqual([])
    expect(vars["--radius"]).toMatch(RADIUS_PATTERN)
    expect(hasDarkModeBlock(tokensExample)).toBe(false)
    expect(usesForbiddenColorFunctions(tokensExample)).toBe(false)
  })

  it("wires ui globals to the shared preset/contract with hex tokens only", () => {
    const vars = parseCssVariables(uiGlobals)

    expect(hasSharedThemeImports(uiGlobals)).toBe(true)
    expect(missingRequiredTokens(vars)).toEqual([])
    expect(nonHexColorTokens(vars)).toEqual([])
    expect(hasDarkModeBlock(uiGlobals)).toBe(false)
    expect(usesForbiddenColorFunctions(uiGlobals)).toBe(false)
  })
})

describe("registry MVC home controller", () => {
  it("exposes contract metadata for the home view", async () => {
    const { getHomePageModel } = await import("@/controllers/home-controller")
    const model = getHomePageModel()

    expect(model.title).toBeTruthy()
    expect(model.contractTokenCount).toBeGreaterThan(0)
    expect(model.sampleTokens.length).toBeGreaterThan(0)
  })
})
