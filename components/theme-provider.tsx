"use client"

import * as React from "react"
import {
  type ColorPalette,
  getPaletteByName,
  applyPaletteToDocument,
  resetPaletteToDefault,
} from "@/lib/color-palette-utils"

type Theme = "dark" | "light" | "system"

type ThemeProviderProps = {
  children: React.ReactNode
  defaultTheme?: Theme
  storageKey?: string
  defaultPalette?: string | null
  paletteStorageKey?: string
}

type ThemeProviderState = {
  theme: Theme
  setTheme: (theme: Theme) => void
  colorPalette: ColorPalette | null
  setColorPalette: (paletteName: string | null) => void
}

const initialState: ThemeProviderState = {
  theme: "system",
  setTheme: () => null,
  colorPalette: null,
  setColorPalette: () => null,
}

const ThemeProviderContext = React.createContext<ThemeProviderState>(initialState)

export function ThemeProvider({
  children,
  defaultTheme = "system",
  storageKey = "ui-theme",
  defaultPalette = null,
  paletteStorageKey = "componentui-color-palette",
  ...props
}: ThemeProviderProps) {
  const [theme, setTheme] = React.useState<Theme>(
    () => (typeof window !== "undefined" && (localStorage.getItem(storageKey) as Theme)) || defaultTheme,
  )

  // Load color palette from localStorage
  const [colorPalette, setColorPaletteState] = React.useState<ColorPalette | null>(() => {
    if (typeof window === "undefined") return null
    const savedPaletteName = localStorage.getItem(paletteStorageKey)
    if (savedPaletteName) {
      const palette = getPaletteByName(savedPaletteName)
      return palette || null
    }
    return defaultPalette ? getPaletteByName(defaultPalette) || null : null
  })

  // Get current effective theme mode (light or dark)
  const getEffectiveTheme = React.useCallback((): "light" | "dark" => {
    if (theme === "system") {
      return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
    }
    return theme
  }, [theme])

  // Apply theme class
  React.useEffect(() => {
    const root = window.document.documentElement
    root.classList.remove("light", "dark")

    const effectiveTheme = getEffectiveTheme()
    root.classList.add(effectiveTheme)
  }, [theme, getEffectiveTheme])

  // Apply color palette when palette or theme changes
  React.useEffect(() => {
    if (colorPalette) {
      const effectiveTheme = getEffectiveTheme()
      applyPaletteToDocument(colorPalette, effectiveTheme)
    } else {
      resetPaletteToDefault()
    }
  }, [colorPalette, theme, getEffectiveTheme])

  // Listen for system theme changes
  React.useEffect(() => {
    if (theme !== "system") return

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)")
    const handleChange = () => {
      if (colorPalette) {
        const effectiveTheme = getEffectiveTheme()
        applyPaletteToDocument(colorPalette, effectiveTheme)
      }
    }

    mediaQuery.addEventListener("change", handleChange)
    return () => mediaQuery.removeEventListener("change", handleChange)
  }, [theme, colorPalette, getEffectiveTheme])

  const value = {
    theme,
    setTheme: (theme: Theme) => {
      localStorage.setItem(storageKey, theme)
      setTheme(theme)
    },
    colorPalette,
    setColorPalette: (paletteName: string | null) => {
      if (paletteName) {
        const palette = getPaletteByName(paletteName)
        if (palette) {
          localStorage.setItem(paletteStorageKey, paletteName)
          setColorPaletteState(palette)
        }
      } else {
        localStorage.removeItem(paletteStorageKey)
        setColorPaletteState(null)
      }
    },
  }

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  )
}

export const useTheme = () => {
  const context = React.useContext(ThemeProviderContext)

  if (context === undefined) throw new Error("useTheme must be used within a ThemeProvider")

  return context
}
