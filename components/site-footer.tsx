"use client"

import Link from "next/link"
import React from "react"
import { cn } from "@/lib/utils"

type FontSize = "xs" | "sm" | "base" | "lg" | "xl"
type FontWeight = "light" | "normal" | "medium" | "semibold" | "bold"

export interface SiteFooterProps {
  links?: Array<{ label: string; href: string }>
  location?: string
  copyrightYear?: string
  backgroundColor?: string
  linkColor?: string
  linkHoverColor?: string
  textColor?: string
  paddingTop?: number
  paddingBottom?: number
  paddingX?: number
  fontSize?: FontSize
  fontWeight?: FontWeight
}

const fontSizeClass: Record<FontSize, string> = {
  xs: "text-xs",
  sm: "text-sm",
  base: "text-base",
  lg: "text-lg",
  xl: "text-xl",
}

const fontWeightClass: Record<FontWeight, string> = {
  light: "font-light",
  normal: "font-normal",
  medium: "font-medium",
  semibold: "font-semibold",
  bold: "font-bold",
}

export function SiteFooter({
  links = [
    { label: "Home", href: "/" },
    { label: "Components", href: "/components" },
    { label: "Colors", href: "/colors" },
    { label: "Fonts", href: "/fonts" },
    { label: "Icons", href: "/icons" },
    { label: "Scribe", href: "/subscribe" },
  ],
  location = "@NeoMa2025",
  copyrightYear,
  backgroundColor = "#000000",
  linkColor = "#404040",
  linkHoverColor = "#ffffff",
  textColor = "#ffffff",
  paddingTop = 64,
  paddingBottom = 64,
  paddingX = 24,
  fontSize = "base",
  fontWeight = "normal",
}: SiteFooterProps) {
  const list = links.filter((link) => link.label && link.href)

  return (
    <footer
      className="transition-all duration-300"
      style={{
        backgroundColor,
        paddingTop: `${paddingTop}px`,
        paddingBottom: `${paddingBottom}px`,
        paddingLeft: `${paddingX}px`,
        paddingRight: `${paddingX}px`,
      }}
    >
      <div className={cn("mx-auto max-w-6xl", fontSizeClass[fontSize], fontWeightClass[fontWeight])}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {list.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-5xl md:text-7xl font-black transition-transform duration-300"
              style={{ color: linkColor }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = linkHoverColor
                e.currentTarget.style.transform = "translateX(6px)"
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = linkColor
                e.currentTarget.style.transform = "translateX(0px)"
              }}
            >
              {item.label}.
            </Link>
          ))}
        </div>
        <div className="flex flex-col items-center text-center gap-2 text-sm" style={{ color: textColor }}>
          {location && <p>{location}</p>}
          {copyrightYear && <p>&copy; {copyrightYear}</p>}
        </div>
      </div>
    </footer>
  )
}


