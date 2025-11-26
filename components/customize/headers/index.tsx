"use client"

import React, { useState } from "react"
import { Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { headerSections, HeaderPropDefinition } from "@/lib/header-sections"

type HeaderDefinition = (typeof headerSections)[number]
export type HeaderSlug = HeaderDefinition["slug"]

type ExtractHeaderDefinition<Slug extends HeaderSlug> = Extract<HeaderDefinition, { slug: Slug }>
type ExtractHeaderProps<Slug extends HeaderSlug> = ExtractHeaderDefinition<Slug>["props"]

type HeaderPropValue<T extends HeaderPropDefinition> = T["default"] extends boolean
  ? boolean
  : T["default"] extends number
  ? number
  : string

export type HeaderComponentProps<Slug extends HeaderSlug> = {
  [K in keyof ExtractHeaderProps<Slug>]: HeaderPropValue<ExtractHeaderProps<Slug>[K]>
}

export const headerDefaultProps: Record<HeaderSlug, Record<string, string | number | boolean>> =
  headerSections.reduce((acc, header) => {
    acc[header.slug] = Object.fromEntries(
      Object.entries(header.props).map(([key, definition]) => [key, definition.default])
    )
    return acc
  }, {} as Record<HeaderSlug, Record<string, string | number | boolean>>)

// --- 1. Simple Header ---
export type SimpleHeaderProps = HeaderComponentProps<"simple-header">
export function SimpleHeader({
  logoText,
  link1Text,
  link2Text,
  link3Text,
  link4Text,
  buttonText,
  backgroundColor = "#ffffff",
  logoColor = "#000000",
  linkColor = "#4b5563",
  linkHoverColor = "#000000",
  buttonBackgroundColor = "#000000",
  buttonTextColor = "#ffffff",
  buttonBorderRadius = 6,
  paddingY = 16,
  paddingX = 24,
}: SimpleHeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const links = [link1Text, link2Text, link3Text, link4Text]

  return (
    <header
      className="w-full border-b transition-all duration-300"
      style={{ backgroundColor, paddingLeft: `${paddingX}px`, paddingRight: `${paddingX}px` }}
    >
      <div className="mx-auto max-w-7xl" style={{ paddingTop: `${paddingY}px`, paddingBottom: `${paddingY}px` }}>
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="text-xl font-bold" style={{ color: logoColor }}>
            {logoText}
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {links.map((link, i) => (
              <a
                key={i}
                href="#"
                className="text-sm font-medium transition-colors"
                style={{ color: linkColor }}
                onMouseEnter={(e) => (e.currentTarget.style.color = linkHoverColor)}
                onMouseLeave={(e) => (e.currentTarget.style.color = linkColor)}
              >
                {link}
              </a>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:block">
            <button
              className="px-4 py-2 text-sm font-medium transition-opacity hover:opacity-90"
              style={{
                backgroundColor: buttonBackgroundColor,
                color: buttonTextColor,
                borderRadius: `${buttonBorderRadius}px`,
              }}
            >
              {buttonText}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            style={{ color: logoColor }}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="mt-4 flex flex-col gap-4 md:hidden pb-4">
            {links.map((link, i) => (
              <a
                key={i}
                href="#"
                className="text-sm font-medium"
                style={{ color: linkColor }}
              >
                {link}
              </a>
            ))}
            <button
              className="w-full px-4 py-2 text-sm font-medium transition-opacity hover:opacity-90"
              style={{
                backgroundColor: buttonBackgroundColor,
                color: buttonTextColor,
                borderRadius: `${buttonBorderRadius}px`,
              }}
            >
              {buttonText}
            </button>
          </div>
        )}
      </div>
    </header>
  )
}

export const headerComponentsByName: Record<string, React.ComponentType<any>> = {
  SimpleHeader,
}

