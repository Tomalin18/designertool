"use client"

import Link from "next/link"
import { usePathname } from 'next/navigation'
import { Package2 } from 'lucide-react'
import { ThemeToggle } from "./theme-toggle"
import { useTheme } from "./theme-provider"
import { cn } from "@/lib/utils"
import { useEffect, useState } from "react"

const navigation = [
  { name: "Home", href: "/" },
  { name: "Components", href: "/components" },
  { name: "Colors", href: "/colors" },
  { name: "Fonts", href: "/fonts" },
  { name: "Icons", href: "/icons" },
]

export function SiteHeader() {
  const pathname = usePathname()
  const { colorPalette, theme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  // Set up CSS animation for color cycling
  useEffect(() => {
    if (!colorPalette || typeof window === "undefined") return

    // Get current theme mode (light or dark)
    const getCurrentThemeMode = () => {
      if (theme === "system") {
        return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
      }
      return theme
    }

    const currentMode = getCurrentThemeMode()
    const colors = currentMode === "dark" ? colorPalette.dark : colorPalette.light

    // Create or update style element for the animation
    let styleElement = document.getElementById("header-nav-animation")
    if (!styleElement) {
      styleElement = document.createElement("style")
      styleElement.id = "header-nav-animation"
      document.head.appendChild(styleElement)
    }

    // Create keyframes that cycle through the palette colors
    // Use a smooth 10s animation that cycles through all 4 colors
    const keyframes = `
      @keyframes headerNavColorCycle {
        0% { color: ${colors[0]}; }
        25% { color: ${colors[1]}; }
        50% { color: ${colors[2]}; }
        75% { color: ${colors[3]}; }
        100% { color: ${colors[0]}; }
      }
    `

    styleElement.textContent = `
      ${keyframes}
      .header-nav-animated {
        animation: headerNavColorCycle 10s ease-in-out infinite;
      }
      .header-nav-animated:hover {
        animation-play-state: paused;
      }
    `

    // Listen for system theme changes if theme is "system"
    let mediaQuery: MediaQueryList | null = null
    let mediaQueryHandler: ((e: MediaQueryListEvent) => void) | null = null

    if (theme === "system") {
      mediaQuery = window.matchMedia("(prefers-color-scheme: dark)")
      mediaQueryHandler = () => {
        const mode = mediaQuery!.matches ? "dark" : "light"
        const updatedColors = mode === "dark" ? colorPalette.dark : colorPalette.light
        styleElement!.textContent = `
          @keyframes headerNavColorCycle {
            0% { color: ${updatedColors[0]}; }
            25% { color: ${updatedColors[1]}; }
            50% { color: ${updatedColors[2]}; }
            75% { color: ${updatedColors[3]}; }
            100% { color: ${updatedColors[0]}; }
          }
          .header-nav-animated {
            animation: headerNavColorCycle 10s ease-in-out infinite;
          }
          .header-nav-animated:hover {
            animation-play-state: paused;
          }
        `
      }
      mediaQuery.addEventListener("change", mediaQueryHandler)
    }

    return () => {
      // Cleanup on unmount
      if (mediaQuery && mediaQueryHandler) {
        mediaQuery.removeEventListener("change", mediaQueryHandler)
      }
      const element = document.getElementById("header-nav-animation")
      if (element) {
        element.remove()
      }
    }
  }, [colorPalette, theme])

  // Only apply animation class after mount to avoid hydration mismatch
  const shouldAnimate = mounted && colorPalette

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center text-2xl">
        <div className="mr-4 flex">
          <Link href="/" className={cn("mr-6 flex items-center gap-2", shouldAnimate && "header-nav-animated")}>
            <Package2 className="h-6 w-6" />
            <span className="font-bold">DesignerTool</span>
          </Link>
        </div>
        
        <nav className="flex items-center gap-6 text-2xl">
          {navigation.map((item) => {
            const isActive = pathname === item.href || (item.href !== "/" && pathname?.startsWith(item.href))
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "transition-colors hover:text-foreground/80",
                  isActive
                    ? "text-foreground font-medium"
                    : "text-foreground/60",
                  shouldAnimate && "header-nav-animated"
                )}
              >
                {item.name}
              </Link>
            )
          })}
        </nav>

        <div className="flex flex-1 items-center justify-end gap-2">
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}
