import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
    return (
        <div className="container flex-1 items-start md:grid md:grid-cols-[220px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10 px-4 md:px-8">
            <aside className="fixed top-14 z-30 -ml-2 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 overflow-y-auto border-r md:sticky md:block">
                <div className="py-6 pl-6 pr-6 lg:py-8 lg:pl-8">
                    <div className="space-y-4">
                        <Skeleton className="h-4 w-24" />
                        <div className="space-y-2">
                            {Array.from({ length: 8 }).map((_, i) => (
                                <Skeleton key={i} className="h-8 w-full" />
                            ))}
                        </div>
                    </div>
                </div>
            </aside>

            <div className="py-8 md:py-12 w-full">
                <div className="mb-6">
                    <Skeleton className="h-6 w-20 rounded-md mb-3" />
                    <Skeleton className="h-10 w-48 mb-2" />
                    <Skeleton className="h-5 w-full max-w-lg" />
                </div>

                <div className="grid lg:grid-cols-[1fr_320px] gap-6">
                    <div className="space-y-6">
                        <Skeleton className="h-[400px] w-full rounded-xl" />
                        <Skeleton className="h-[200px] w-full rounded-xl" />
                        <Skeleton className="h-[300px] w-full rounded-xl" />
                    </div>
                    <div className="space-y-6">
                        <Skeleton className="h-[600px] w-full rounded-xl" />
                    </div>
                </div>
            </div>
        </div>
    )
}
