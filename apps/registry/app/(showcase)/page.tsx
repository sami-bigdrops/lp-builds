import { getHomePageModel } from "@/controllers/sections-controller"
import { HomeView } from "@/views/home-view"

export default function Page() {
  const model = getHomePageModel()
  return <HomeView model={model} />
}
