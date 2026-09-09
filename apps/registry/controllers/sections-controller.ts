import { SECTIONS, type SectionDefinition } from "@/models/sections-catalog"

export type SectionNavItem = {
  slug: string
  title: string
  href: string
}

export function listSections(): SectionDefinition[] {
  return SECTIONS
}

export function getSectionBySlug(slug: string): SectionDefinition | undefined {
  return SECTIONS.find((section) => section.slug === slug)
}

export function getSectionNavItems(): SectionNavItem[] {
  return SECTIONS.map((section) => ({
    slug: section.slug,
    title: section.title,
    href: `/sections/${section.slug}`,
  }))
}

export function getSectionsIndexModel() {
  const sections = listSections()
  return {
    title: "Sections",
    description:
      sections.length === 0
        ? "No sections are registered yet. Add an entry to the sections catalog to get started."
        : "Browse reusable landing page sections. Each page includes a live preview, source, and usage notes.",
    sections: sections.map((section) => ({
      slug: section.slug,
      title: section.title,
      description: section.description,
      href: `/sections/${section.slug}`,
    })),
    isEmpty: sections.length === 0,
  }
}

export type SectionsIndexModel = ReturnType<typeof getSectionsIndexModel>

export function getHomePageModel() {
  return {
    title: "Section registry",
    description:
      "Internal showcase for reusable landing page sections — live preview, source code, and usage notes in one place.",
    isEmpty: listSections().length === 0,
    sectionsHref: "/sections",
  }
}

export type HomePageModel = ReturnType<typeof getHomePageModel>
