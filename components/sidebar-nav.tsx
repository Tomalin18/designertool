"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ChevronDown, ChevronUp, Lock } from "lucide-react"
import { useTheme } from "@/components/theme-provider"
import { cn } from "@/lib/utils"

import { Badge } from "@/components/ui/badge"

interface SidebarNavProps {
  items: {
    title: string
    href: string
    items?: { title: string; href: string; isPremium?: boolean; count?: number }[]
  }[]
  defaultExpanded?: string[]
}

export function SidebarNav({ items, defaultExpanded = [] }: SidebarNavProps) {
  const pathname = usePathname()
  const { colorPalette, theme } = useTheme()
  const [expandedSections, setExpandedSections] = useState<Set<string>>(
    new Set(defaultExpanded)
  )
  const [isMounted, setIsMounted] = useState(false)
  const [currentTheme, setCurrentTheme] = useState<"light" | "dark">("light")
  const [themeColor, setThemeColor] = useState<string | null>(null)

  // Get current theme mode
  const getEffectiveTheme = (): "light" | "dark" => {
    if (theme === "system") {
      return typeof window !== "undefined" && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
    }
    return theme
  }

  // Initialize on client side only to avoid hydration mismatch
  useEffect(() => {
    setIsMounted(true)
    const effectiveTheme = getEffectiveTheme()
    setCurrentTheme(effectiveTheme)

    if (colorPalette) {
      const color = effectiveTheme === "dark" ? colorPalette.dark[0] : colorPalette.light[0]
      setThemeColor(color)
    }
  }, [colorPalette, theme])

  // Listen for system theme changes
  useEffect(() => {
    if (!isMounted) return

    if (theme !== "system") {
      setCurrentTheme(theme)
      if (colorPalette) {
        const color = theme === "dark" ? colorPalette.dark[0] : colorPalette.light[0]
        setThemeColor(color)
      }
      return
    }

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)")
    const handleChange = () => {
      const newTheme = mediaQuery.matches ? "dark" : "light"
      setCurrentTheme(newTheme)
      if (colorPalette) {
        const color = newTheme === "dark" ? colorPalette.dark[0] : colorPalette.light[0]
        setThemeColor(color)
      }
    }

    const newTheme = mediaQuery.matches ? "dark" : "light"
    setCurrentTheme(newTheme)
    if (colorPalette) {
      const color = newTheme === "dark" ? colorPalette.dark[0] : colorPalette.light[0]
      setThemeColor(color)
    }

    mediaQuery.addEventListener("change", handleChange)
    return () => mediaQuery.removeEventListener("change", handleChange)
  }, [theme, colorPalette, isMounted])

  const isDark = currentTheme === "dark"

  const toggleSection = (title: string) => {
    setExpandedSections(prev => {
      const newSet = new Set(prev)
      if (newSet.has(title)) {
        newSet.delete(title)
      } else {
        newSet.add(title)
      }
      return newSet
    })
  }

  const isExpanded = (title: string) => expandedSections.has(title)

  // Auto-expand section if current pathname matches any item in that section
  useEffect(() => {
    if (!pathname) return

    items.forEach((section) => {
      if (section.items) {
        const hasActiveItem = section.items.some(item => item.href === pathname)
        if (hasActiveItem) {
          setExpandedSections(prev => {
            if (prev.has(section.title)) return prev
            return new Set([...prev, section.title])
          })
        }
      }
    })
  }, [pathname, items])

  return (
    <nav className="grid gap-2">
      {items.map((section) => (
        <div key={section.title}>
          <button
            onClick={() => toggleSection(section.title)}
            className={cn(
              "mb-1 w-full flex items-center justify-between rounded-md px-2 py-1 font-semibold text-2xl transition-colors",
              !isMounted || !themeColor ? "bg-slate-300 hover:bg-slate-400 dark:bg-slate-700 dark:hover:bg-slate-600 dark:text-slate-100" : ""
            )}
            style={isMounted && themeColor ? {
              backgroundColor: isDark ? `${themeColor}30` : `${themeColor}15`,
              color: isDark ? '#f8fafc' : themeColor,
            } : undefined}
            onMouseEnter={(e) => {
              if (isMounted && themeColor) {
                e.currentTarget.style.backgroundColor = isDark ? `${themeColor}50` : `${themeColor}25`
              }
            }}
            onMouseLeave={(e) => {
              if (isMounted && themeColor) {
                e.currentTarget.style.backgroundColor = isDark ? `${themeColor}30` : `${themeColor}15`
              }
            }}
          >
            <span>{section.title}</span>
            {section.items && section.items.length > 0 && (
              isExpanded(section.title) ? (
                <ChevronUp className="h-5 w-5" />
              ) : (
                <ChevronDown className="h-5 w-5" />
              )
            )}
          </button>
          {section.items && isExpanded(section.title) && (
            <div className="grid grid-flow-row auto-rows-max text-sm">
              {section.items.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  scroll={true}
                  className={cn(
                    "group flex w-full items-center gap-2 rounded-md border border-transparent px-2 py-1.5 hover:underline text-2xl",
                    pathname === item.href ? "font-medium text-foreground" : "text-muted-foreground",
                  )}
                  onClick={() => {
                    // Scroll to top when navigating to a different page
                    if (item.href !== pathname) {
                      window.scrollTo({ top: 0, behavior: 'instant' })
                    }
                  }}
                >
                  <span className="flex-1">{item.title}</span>
                  {item.count !== undefined && (
                    <Badge variant="secondary" className="ml-auto text-sm shrink-0">
                      {item.count}
                    </Badge>
                  )}
                  {item.isPremium && (
                    <Lock className="h-4 w-4 text-primary shrink-0" />
                  )}
                </Link>
              ))}
            </div>
          )}
        </div>
      ))}
    </nav>
  )
}
