"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Package, Palette, Type, Sparkles } from "lucide-react"
import { cn } from "@/lib/utils"

const mobileNavItems = [
    { name: "Home", href: "/", icon: Home },
    { name: "Components", href: "/components", icon: Package },
    { name: "Colors", href: "/colors", icon: Palette },
    { name: "Fonts", href: "/fonts", icon: Type },
    { name: "Icons", href: "/icons", icon: Sparkles },
]

export function MobileNav() {
    const pathname = usePathname()

    return (
        <nav className="fixed bottom-0 left-0 right-0 z-50 md:hidden border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 safe-bottom">
            <div className="grid grid-cols-5 h-16">
                {mobileNavItems.map((item) => {
                    const Icon = item.icon
                    const isActive = pathname === item.href || (item.href !== "/" && pathname?.startsWith(item.href))

                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "flex flex-col items-center justify-center gap-1 py-2 transition-colors",
                                isActive
                                    ? "text-primary"
                                    : "text-muted-foreground hover:text-foreground"
                            )}
                        >
                            <Icon className={cn("h-5 w-5", isActive && "fill-current")} />
                            <span className="text-[10px] font-medium leading-none">{item.name}</span>
                        </Link>
                    )
                })}
            </div>
        </nav>
    )
}
