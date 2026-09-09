import type { HomePageModel } from "@/controllers/sections-controller"
import { EmptyStateView } from "@/views/empty-state-view"

type HomeViewProps = {
  model: HomePageModel
}

export function HomeView({ model }: HomeViewProps) {
  return (
    <EmptyStateView
      title={model.title}
      description={model.description}
      sectionsHref={model.sectionsHref}
      showCatalogHint={model.isEmpty}
    />
  )
}
