import dynamic from "next/dynamic"
import Loading from "./loading"

const FontsPageClient = dynamic(
  () => import("./fonts-page-client").then((mod) => mod.FontsPageClient),
  {
    loading: () => <Loading />,
  }
)

export default function FontsPage() {
  return <FontsPageClient />
}
