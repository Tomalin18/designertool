import dynamic from "next/dynamic"
import Loading from "./loading"

const IconsPageClient = dynamic(
  () => import("./icons-page-client").then((mod) => mod.IconsPageClient),
  {
    loading: () => <Loading />,
  }
)

export default function IconsPage() {
  return <IconsPageClient />
}
