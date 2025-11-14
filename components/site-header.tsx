"use client"

import Link from "next/link"
import { usePathname } from 'next/navigation'
import { Package2 } from 'lucide-react'
import { ThemeToggle } from "./theme-toggle"
import { cn } from "@/lib/utils"

const navigation = [
  { name: "Home", href: "/" },
  { name: "Components", href: "/components" },
  { name: "Colors", href: "/colors" },
  { name: "Fonts", href: "/fonts" },
  { name: "Icons", href: "/icons" },
]

export function SiteHeader() {
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center text-2xl">
        <div className="mr-4 flex">
          <Link href="/" className="mr-6 flex items-center gap-2">
            <Package2 className="h-6 w-6" />
            <span className="font-bold">ComponentUI</span>
          </Link>
        </div>
        
        <nav className="flex items-center gap-6 text-2xl">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "transition-colors hover:text-foreground/80",
                pathname === item.href || (item.href !== "/" && pathname?.startsWith(item.href))
                  ? "text-foreground font-medium"
                  : "text-foreground/60"
              )}
            >
              {item.name}
            </Link>
          ))}
        </nav>

        <div className="flex flex-1 items-center justify-end gap-2">
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}
