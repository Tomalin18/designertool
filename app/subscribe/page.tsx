import dynamic from "next/dynamic"
import Loading from "../loading"

const SubscribePageClient = dynamic(
  () => import("./subscribe-page-client").then((mod) => mod.SubscribePageClient),
  {
    loading: () => <Loading />,
  }
)

export default function SubscribePage() {
  return <SubscribePageClient />
}


