export const REQUIRED_COLOR_TOKENS = [
  "--background",
  "--foreground",
  "--card",
  "--card-foreground",
  "--popover",
  "--popover-foreground",
  "--primary",
  "--primary-foreground",
  "--secondary",
  "--secondary-foreground",
  "--muted",
  "--muted-foreground",
  "--accent",
  "--accent-foreground",
  "--destructive",
  "--border",
  "--input",
  "--ring",
  "--chart-1",
  "--chart-2",
  "--chart-3",
  "--chart-4",
  "--chart-5",
  "--sidebar",
  "--sidebar-foreground",
  "--sidebar-primary",
  "--sidebar-primary-foreground",
  "--sidebar-accent",
  "--sidebar-accent-foreground",
  "--sidebar-border",
  "--sidebar-ring",
] as const

export const REQUIRED_TOKENS = [...REQUIRED_COLOR_TOKENS, "--radius"] as const

export type ThemeToken = (typeof REQUIRED_TOKENS)[number]

/** Accepts #RGB, #RRGGBB, or #RRGGBBAA */
export const HEX_COLOR_PATTERN =
  /^#(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})$/

export const RADIUS_PATTERN = /^\d+(\.\d+)?rem$/

export type CssVariableMap = Record<string, string>

export function parseCssVariables(css: string): CssVariableMap {
  const vars: CssVariableMap = {}
  const re = /(--[\w-]+)\s*:\s*([^;]+);/g
  let match: RegExpExecArray | null

  while ((match = re.exec(css)) !== null) {
    const name = match[1]
    const value = match[2]
    if (!name || value === undefined) continue
    vars[name] = value.trim()
  }

  return vars
}

export function missingRequiredTokens(vars: CssVariableMap): ThemeToken[] {
  return REQUIRED_TOKENS.filter((token) => !(token in vars))
}

export function nonHexColorTokens(vars: CssVariableMap): string[] {
  return REQUIRED_COLOR_TOKENS.filter((token) => {
    const value = vars[token]
    return value !== undefined && !HEX_COLOR_PATTERN.test(value)
  })
}

export function hasDarkModeBlock(css: string): boolean {
  return (
    /(?:^|})\s*\.dark\s*\{/m.test(css) || /@custom-variant\s+dark\b/.test(css)
  )
}

export function usesForbiddenColorFunctions(css: string): boolean {
  const rootBlock = css.match(/:root\s*\{([\s\S]*?)\}/)
  if (!rootBlock?.[1]) return false
  return /\b(?:oklch|hsl|hsla|rgb|rgba)\s*\(/i.test(rootBlock[1])
}

export function hasSharedThemeImports(css: string): boolean {
  return (
    css.includes("@workspace/tailwind-config/preset.css") &&
    css.includes("@workspace/tailwind-config/contract.css")
  )
}
