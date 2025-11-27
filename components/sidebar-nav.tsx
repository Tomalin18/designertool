"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ChevronDown, ChevronUp } from "lucide-react"
import { useTheme } from "@/components/theme-provider"
import { cn } from "@/lib/utils"

interface SidebarNavProps {
  items: {
    title: string
    href: string
    items?: { title: string; href: string }[]
  }[]
}

export function SidebarNav({ items }: SidebarNavProps) {
  const pathname = usePathname()
  const { colorPalette, theme } = useTheme()
  const [expandedSections, setExpandedSections] = useState<Set<string>>(
    new Set()
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
                  className={cn(
                    "group flex w-full items-center rounded-md border border-transparent px-2 py-1.5 hover:underline text-2xl",
                    pathname === item.href ? "font-medium text-foreground" : "text-muted-foreground",
                  )}
                >
                  {item.title}
                </Link>
              ))}
            </div>
          )}
        </div>
      ))}
    </nav>
  )
}
