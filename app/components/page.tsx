import dynamic from "next/dynamic"
import Loading from "./loading"

const ComponentsPageClient = dynamic(
  () => import("./components-page-client").then((mod) => mod.ComponentsPageClient),
  {
    loading: () => <Loading />,
  }
)

export default function ComponentsPage() {
  return <ComponentsPageClient />
}
