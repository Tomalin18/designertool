"use client"
import { useEffect, useState } from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "./theme-provider"
import { Switch } from "./ui/switch"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [resolvedTheme, setResolvedTheme] = useState<"light" | "dark">("light")

  // 避免 hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)")
    const resolveTheme = () => {
      if (theme === "system") {
        setResolvedTheme(mediaQuery.matches ? "dark" : "light")
      } else {
        setResolvedTheme(theme)
      }
    }

    resolveTheme()

    if (theme === "system") {
      mediaQuery.addEventListener("change", resolveTheme)
      return () => mediaQuery.removeEventListener("change", resolveTheme)
    }
  }, [theme, mounted])

  if (!mounted) {
    // 服務器端渲染時返回一個佔位符，避免 hydration mismatch
    return (
      <div className="flex items-center gap-2">
        <Sun className="h-4 w-4 text-muted-foreground" />
        <Switch checked={false} disabled aria-label="Toggle theme" />
        <Moon className="h-4 w-4 text-muted-foreground" />
      </div>
    )
  }

  const isDark = resolvedTheme === "dark"

  return (
    <div className="flex items-center gap-2">
      <Sun className="h-4 w-4 text-muted-foreground" />
      <Switch
        checked={isDark}
        onCheckedChange={(checked) => setTheme(checked ? "dark" : "light")}
        aria-label="Toggle theme"
      />
      <Moon className="h-4 w-4 text-muted-foreground" />
    </div>
  )
}
