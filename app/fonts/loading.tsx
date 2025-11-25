import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
    return (
        <div className="container flex-1 items-start md:grid md:grid-cols-[240px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[280px_minmax(0,1fr)] lg:gap-10 px-4 md:px-8">
            {/* Left Sidebar Skeleton */}
            <aside className="fixed top-14 z-30 -ml-2 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 overflow-y-auto border-r md:sticky md:block">
                <div className="py-6 pl-6 pr-6 lg:py-8 lg:pl-8">
                    <div className="space-y-6">
                        <div>
                            <Skeleton className="h-4 w-16 mb-3" />
                            <Skeleton className="h-10 w-full" />
                        </div>
                        <div>
                            <Skeleton className="h-4 w-24 mb-3" />
                            <div className="space-y-1">
                                {Array.from({ length: 5 }).map((_, i) => (
                                    <Skeleton key={i} className="h-9 w-full" />
                                ))}
                            </div>
                        </div>
                        <div>
                            <Skeleton className="h-4 w-20 mb-3" />
                            <div className="space-y-1">
                                {Array.from({ length: 10 }).map((_, i) => (
                                    <Skeleton key={i} className="h-8 w-full" />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Main Content Skeleton */}
            <main className="relative py-6 lg:py-8">
                {/* Header */}
                <div className="mb-8">
                    <Skeleton className="h-10 w-48 mb-2" />
                    <Skeleton className="h-5 w-64" />
                </div>

                {/* Controls */}
                <div className="mb-8 space-y-4">
                    <div className="flex items-center gap-4 max-w-2xl">
                        <Skeleton className="h-5 w-[100px]" />
                        <Skeleton className="h-10 flex-1" />
                    </div>
                    <div className="flex items-center gap-4 max-w-2xl">
                        <Skeleton className="h-5 w-[100px]" />
                        <Skeleton className="h-10 flex-1" />
                    </div>
                </div>

                {/* Fonts List */}
                <div className="space-y-4">
                    {Array.from({ length: 5 }).map((_, i) => (
                        <div key={i} className="rounded-xl border p-6">
                            <div className="mb-4 flex items-center justify-between">
                                <div>
                                    <Skeleton className="h-7 w-32 mb-1" />
                                    <Skeleton className="h-4 w-20" />
                                </div>
                                <div className="flex gap-1">
                                    {Array.from({ length: 4 }).map((_, j) => (
                                        <Skeleton key={j} className="h-8 w-8" />
                                    ))}
                                </div>
                            </div>
                            <div className="space-y-3">
                                {Array.from({ length: 3 }).map((_, k) => (
                                    <div key={k} className="border-b pb-3 last:border-0">
                                        <Skeleton className="h-8 w-full" />
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    )
}
