import { getSectionsIndexModel } from "@/controllers/sections-controller"
import { SectionsIndexView } from "@/views/sections-index-view"

export default function SectionsPage() {
  const model = getSectionsIndexModel()
  return <SectionsIndexView model={model} />
}
