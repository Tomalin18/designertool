import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
    return (
        <div className="flex flex-col md:flex-row container flex-1 items-start md:grid md:grid-cols-[280px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[320px_minmax(0,1fr)] lg:gap-10 px-4 md:px-8">
            {/* Mobile: Top horizontal scroll skeleton */}
            <div className="md:hidden w-full border-b bg-card mb-4">
                <div className="p-4">
                    <Skeleton className="h-4 w-24 mb-3" />
                    <div className="flex gap-3 overflow-x-auto pb-2">
                        {Array.from({ length: 4 }).map((_, i) => (
                            <Skeleton key={i} className="h-24 w-32 shrink-0 rounded-lg" />
                        ))}
                    </div>
                </div>
            </div>

            {/* Desktop: Left sidebar skeleton */}
            <aside className="hidden md:block fixed top-14 z-30 -ml-2 h-[calc(100vh-3.5rem)] w-full shrink-0 overflow-y-auto border-r md:sticky">
                <div className="py-6 pl-6 pr-4 lg:py-8 lg:pl-8">
                    <Skeleton className="h-6 w-32 mb-4" />
                    <div className="space-y-2">
                        {Array.from({ length: 6 }).map((_, i) => (
                            <Skeleton key={i} className="h-20 w-full rounded-lg" />
                        ))}
                    </div>
                </div>
            </aside>

            <div className="py-4 md:py-8 lg:py-12 w-full">
                {/* Color Info Header */}
                <div className="mb-8">
                    <div className="flex items-center gap-3 mb-2">
                        <Skeleton className="h-10 w-48" />
                        <Skeleton className="h-6 w-20 rounded-full" />
                    </div>
                    <Skeleton className="h-4 w-full max-w-md mb-4" />

                    {/* Color Swatches */}
                    <div className="space-y-4 mb-4">
                        <div>
                            <Skeleton className="h-4 w-32 mb-2" />
                            <div className="flex gap-2">
                                {Array.from({ length: 4 }).map((_, i) => (
                                    <Skeleton key={i} className="h-32 flex-1 rounded-lg" />
                                ))}
                            </div>
                        </div>
                        <div>
                            <Skeleton className="h-4 w-32 mb-2" />
                            <div className="flex gap-2">
                                {Array.from({ length: 4 }).map((_, i) => (
                                    <Skeleton key={i} className="h-32 flex-1 rounded-lg" />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Component Showcase Skeleton */}
                <div className="space-y-8">
                    <Skeleton className="h-[200px] w-full rounded-xl" />
                    <div className="grid gap-6 md:grid-cols-2">
                        <Skeleton className="h-[200px] w-full rounded-xl" />
                        <Skeleton className="h-[200px] w-full rounded-xl" />
                    </div>
                </div>
            </div>
        </div>
    )
}
