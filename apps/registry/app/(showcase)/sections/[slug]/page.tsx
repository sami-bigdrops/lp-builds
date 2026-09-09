import { notFound } from "next/navigation"

import { getSectionBySlug } from "@/controllers/sections-controller"
import { SectionDetailView } from "@/views/section-detail-view"

type SectionPageProps = {
  params: Promise<{ slug: string }>
}

export default async function SectionPage({ params }: SectionPageProps) {
  const { slug } = await params
  const section = getSectionBySlug(slug)

  if (!section) {
    notFound()
  }

  return <SectionDetailView section={section} />
}
