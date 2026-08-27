import { REQUIRED_COLOR_TOKENS, type ThemeToken } from "@/models/theme-contract"

export type HomePageModel = {
  title: string
  description: string
  contractTokenCount: number
  sampleTokens: ThemeToken[]
}

export function getHomePageModel(): HomePageModel {
  return {
    title: "Project ready!",
    description:
      "Shared Tailwind contract is wired. Landing pages override hex tokens on :root.",
    contractTokenCount: REQUIRED_COLOR_TOKENS.length + 1,
    sampleTokens: [
      "--background",
      "--foreground",
      "--primary",
      "--destructive",
      "--border",
    ],
  }
}
