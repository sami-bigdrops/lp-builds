import type { ComponentType } from "react"

export type SectionUsageNotes = {
  props: string[]
  customize: string[]
  leaveAsIs: string[]
}

export type SectionDefinition = {
  slug: string
  title: string
  description: string
  code: string
  usageNotes: SectionUsageNotes
  Preview?: ComponentType
}

/**
 * Central catalog of showcase sections.
 * Add a new entry here (plus the section component) — no core routing/shell changes needed.
 */
export const SECTIONS: SectionDefinition[] = []
