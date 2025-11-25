import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
    return (
        <div className="flex flex-col h-[calc(100vh-3.5rem)] md:grid md:grid-cols-[240px_minmax(0,1fr)] lg:grid-cols-[280px_minmax(0,1fr)]">
            {/* Mobile Filter Skeleton */}
            <div className="md:hidden border-b p-4">
                <div className="flex gap-2 mb-4">
                    <Skeleton className="h-10 flex-1" />
                    <Skeleton className="h-10 w-10" />
                </div>
            </div>

            {/* Desktop Sidebar Skeleton */}
            <aside className="hidden md:block border-r bg-muted/10">
                <div className="flex flex-col h-full">
                    <div className="p-6 border-b">
                        <Skeleton className="h-4 w-20 mb-4" />
                        <Skeleton className="h-10 w-full mb-6" />
                        <Skeleton className="h-4 w-24 mb-4" />
                        <div className="flex gap-2">
                            <Skeleton className="h-9 flex-1" />
                            <Skeleton className="h-9 flex-1" />
                        </div>
                    </div>
                    <div className="flex-1 p-6">
                        <Skeleton className="h-4 w-24 mb-4" />
                        <div className="space-y-1">
                            {Array.from({ length: 8 }).map((_, i) => (
                                <Skeleton key={i} className="h-8 w-full" />
                            ))}
                        </div>
                    </div>
                </div>
            </aside>

            {/* Main Content Skeleton */}
            <div className="flex-1 p-4 md:p-8 overflow-hidden">
                <div className="space-y-8">
                    {Array.from({ length: 3 }).map((_, i) => (
                        <div key={i}>
                            <Skeleton className="h-5 w-32 mb-4" />
                            <div className="flex gap-3 overflow-hidden">
                                {Array.from({ length: 8 }).map((_, j) => (
                                    <Skeleton key={j} className="h-12 w-12 rounded-lg shrink-0" />
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
