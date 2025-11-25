import dynamic from "next/dynamic"
import Loading from "./loading"

const ColorsPageClient = dynamic(
  () => import("./colors-page-client").then((mod) => mod.ColorsPageClient),
  {
    loading: () => <Loading />,
  }
)

export default function ColorsPage() {
  return <ColorsPageClient />
}
