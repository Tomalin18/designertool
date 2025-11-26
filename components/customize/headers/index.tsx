"use client"

import React, { useState, useRef } from "react"
import {
  Menu,
  X,
  ChevronDown,
  Search,
  Bell,
  Zap,
  ShoppingBag,
  Command,
  Moon,
  Globe,
  Mic,
  Video,
  TrendingUp,
  HelpCircle,
  Home,
  Tv,
  Users,
  Gamepad2,
  MenuSquare,
  MessageCircle,
  Terminal,
  Shield,
  Wallet,
  MapPin,
  Phone,
  Music,
  Heart,
  GraduationCap,
  Plane,
  Calendar,
  LayoutGrid,
  Github,
} from "lucide-react"
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
  navigationConfig = '[{"title":"Features","items":["Analytics","Automation","Security"]},{"title":"Pricing"},{"title":"About"},{"title":"Blog"}]',
  navInteractionMode = "hover",
  buttonText,
  backgroundColor = "#ffffff",
  logoColor = "#000000",
  linkColor = "#4b5563",
  linkHoverColor = "#000000",
  buttonBackgroundColor = "#000000",
  buttonTextColor = "#ffffff",
  buttonBorderRadius = 6,
  paddingTop = 20,
  paddingBottom = 20,
  paddingX = 24,
  fontSize = "base",
  fontWeight = "medium",
  borderBottomWidth = 1,
}: SimpleHeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<number | null>(null)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  const handleMouseEnter = (index: number) => {
    if (navInteractionMode !== 'hover') return
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    setActiveDropdown(index)
  }

  const handleMouseLeave = () => {
    if (navInteractionMode !== 'hover') return
    timeoutRef.current = setTimeout(() => {
      setActiveDropdown(null)
    }, 150)
  }

  let navItems: any[] = []
  try {
    navItems = JSON.parse(navigationConfig)
  } catch (e) {
    navItems = []
  }

  return (
    <header
      className={cn(
        "w-full transition-all duration-300",
        fontSize === "sm" ? "text-sm" : fontSize === "lg" ? "text-lg" : fontSize === "xl" ? "text-xl" : "text-base",
        fontWeight === "normal" ? "font-normal" : fontWeight === "semibold" ? "font-semibold" : fontWeight === "bold" ? "font-bold" : "font-medium"
      )}
      style={{ 
        backgroundColor, 
        paddingLeft: `${paddingX}px`, 
        paddingRight: `${paddingX}px`,
        borderBottomWidth: `${borderBottomWidth}px`,
        borderBottomStyle: 'solid',
        borderBottomColor: '#e5e7eb' // default border color
      }}
    >
      <div className="mx-auto max-w-7xl" style={{ paddingTop: `${paddingTop}px`, paddingBottom: `${paddingBottom}px` }}>
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="text-xl font-bold" style={{ color: logoColor }}>
            {logoText}
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item, index) => (
              <div
                key={index}
                className="relative group"
                onMouseEnter={() => handleMouseEnter(index)}
                onMouseLeave={handleMouseLeave}
              >
                <button
                  className="flex items-center gap-1 transition-colors hover:opacity-80"
                  style={{ color: linkColor }}
                  onClick={() => navInteractionMode === 'click' && setActiveDropdown(activeDropdown === index ? null : index)}
                >
                  {item.title}
                  {item.items && item.items.length > 0 && (
                    <ChevronDown size={14} className={cn("transition-transform", activeDropdown === index ? "rotate-180" : "")} />
                  )}
                </button>

                {/* Dropdown */}
                {item.items && item.items.length > 0 && activeDropdown === index && (
                  <div 
                    className="absolute top-full left-0 mt-2 w-48 rounded-xl border p-2 shadow-xl z-50 animate-in fade-in zoom-in-95 duration-200"
                    style={{ 
                      backgroundColor: backgroundColor === '#000000' || backgroundColor === '#0a0a0a' ? '#171717' : '#ffffff',
                      borderColor: backgroundColor === '#000000' || backgroundColor === '#0a0a0a' ? '#262626' : '#e5e7eb'
                    }}
                  >
                    {item.items.map((subItem: string, subIndex: number) => (
                      <a 
                        key={subIndex} 
                        href="#" 
                        className="block rounded-lg px-4 py-2 text-sm transition-colors hover:bg-neutral-100 dark:hover:bg-neutral-800"
                        style={{ color: linkColor }}
                      >
                        {subItem}
                      </a>
                    ))}
                  </div>
                )}
              </div>
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
            {navItems.map((item, i) => (
              <div key={i} className="flex flex-col gap-2">
                <a href="#" style={{ color: linkColor }} className="font-medium">{item.title}</a>
                {item.items && item.items.length > 0 && (
                  <div className="pl-4 flex flex-col gap-2 border-l border-neutral-200">
                    {item.items.map((subItem: string, j: number) => (
                      <a key={j} href="#" className="text-sm text-neutral-500">{subItem}</a>
                    ))}
                  </div>
                )}
              </div>
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

// --- 2. Floating Capsule Nav ---
export type FloatingNavProps = HeaderComponentProps<"floating-capsule-nav">
export function FloatingNav({
  logoText,
  heading,
  subHeading,
  buttonText,
  backgroundColor,
  navBackgroundColor,
  activeItemColor,
  itemColor,
  buttonBackgroundColor,
  buttonTextColor,
  glowColor,
  paddingTop = 32,
  paddingBottom = 20,
  paddingX = 24,
  fontSize = "base",
  fontWeight = "medium",
}: FloatingNavProps) {
  const [active, setActive] = useState("Home")
  const navItems = ["Home", "Features", "Pricing", "About"]

  return (
    <div 
      className={cn(
        "relative flex w-full flex-col items-center overflow-hidden",
        fontSize === "sm" ? "text-sm" : fontSize === "lg" ? "text-lg" : fontSize === "xl" ? "text-xl" : "text-base",
      )}
      style={{ 
        backgroundColor,
        paddingTop: `${paddingTop}px`,
        paddingBottom: `${paddingBottom}px`,
        paddingLeft: `${paddingX}px`,
        paddingRight: `${paddingX}px`,
        height: '300px' // Keep fixed height for preview consistency
      }}
    >
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none" />
      <div className="absolute top-0 h-[200px] w-[200px] rounded-full blur-[60px]" style={{ backgroundColor: glowColor }} />
      <nav
        className="relative flex items-center gap-1 rounded-full border border-white/10 p-2 px-2 shadow-2xl backdrop-blur-xl transition-all hover:border-white/20 z-10"
        style={{ backgroundColor: navBackgroundColor, boxShadow: `0 25px 50px -12px ${glowColor}` }}
      >
        <div className="mr-4 flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 font-bold text-white">
          {logoText}
        </div>
        <div className="hidden md:flex items-center">
          {navItems.map((item) => (
            <button
              key={item}
              onClick={() => setActive(item)}
              className={cn(
                "relative rounded-full px-4 py-2 font-medium transition-colors hover:text-white",
                fontWeight === "normal" ? "font-normal" : fontWeight === "semibold" ? "font-semibold" : fontWeight === "bold" ? "font-bold" : "font-medium"
              )}
              style={{ color: active === item ? activeItemColor : itemColor }}
            >
              {active === item && (
                <span className="absolute inset-0 -z-10 rounded-full bg-neutral-800 transition-all duration-300" />
              )}
              {item}
            </button>
          ))}
        </div>
        <div className="mx-2 hidden md:block h-4 w-px bg-neutral-800" />
        <button
          className="flex items-center gap-2 rounded-full px-4 py-2 font-semibold transition-transform hover:scale-105 active:scale-95"
          style={{ backgroundColor: buttonBackgroundColor, color: buttonTextColor }}
        >
          {buttonText}
        </button>
      </nav>
      <div className="mt-12 text-center space-y-2 relative z-10 px-4">
        <h2 className="text-3xl font-bold text-white">{heading}</h2>
        <p className="text-neutral-500">{subHeading}</p>
      </div>
    </div>
  )
}

// --- 3. SaaS Header ---
export type SaaSHeaderProps = HeaderComponentProps<"saas-header">
export function SaaSHeader({
  companyName,
  bannerText,
  bannerLinkText,
  primaryButtonText,
  secondaryButtonText,
  backgroundColor,
  bannerGradientFrom,
  bannerGradientTo,
  textColor,
  linkColor,
  paddingTop = 0,
  paddingBottom = 0,
  paddingX = 24,
  fontSize = "base",
  fontWeight = "medium",
  borderBottomWidth = 1,
  navigationConfig = '[{"title":"Products","items":["Analytics","Automation","Security"]},{"title":"Customers","items":["Case Studies","Reviews"]},{"title":"Pricing"}]',
  navInteractionMode = "hover",
}: SaaSHeaderProps) {
  const [activeDropdown, setActiveDropdown] = useState<number | null>(null)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  const handleMouseEnter = (index: number) => {
    if (navInteractionMode !== 'hover') return
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    setActiveDropdown(index)
  }

  const handleMouseLeave = () => {
    if (navInteractionMode !== 'hover') return
    timeoutRef.current = setTimeout(() => {
      setActiveDropdown(null)
    }, 150)
  }

  let navItems: any[] = []
  try {
    navItems = JSON.parse(navigationConfig)
  } catch (e) {
    // Fallback
    navItems = []
  }

  // Internal helper for self-contained code export
  const ShinyButton = ({
    children,
    className,
    ...props
  }: React.ButtonHTMLAttributes<HTMLButtonElement>) => {
    return (
      <button
        className={cn(
          "relative overflow-hidden rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 px-6 py-2 font-medium text-white transition-all hover:scale-105 hover:shadow-lg hover:shadow-indigo-500/30 active:scale-95 group",
          className
        )}
        {...props}
      >
        <span className="relative z-10 flex items-center gap-2">{children}</span>
        <div className="absolute inset-0 -z-10 translate-x-[-100%] bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-1000 group-hover:translate-x-[100%]" />
      </button>
    )
  }

  return (
    <div 
      className={cn(
        "flex h-[250px] w-full flex-col",
        fontSize === "sm" ? "text-sm" : fontSize === "lg" ? "text-lg" : fontSize === "xl" ? "text-xl" : "text-base",
      )}
      style={{ 
        backgroundColor,
        paddingTop: `${paddingTop}px`,
        paddingBottom: `${paddingBottom}px`
      }}
    >
      <div
        className="relative z-20 flex h-9 items-center justify-center px-4 text-xs font-medium text-indigo-100"
        style={{ background: `linear-gradient(to right, ${bannerGradientFrom}, ${bannerGradientTo})` }}
      >
        <span className="flex items-center gap-2 text-center">
          <Zap size={12} className="fill-current" />
          {bannerText}
          <span className="ml-1 cursor-pointer underline hover:text-white">{bannerLinkText}</span>
        </span>
      </div>
      <header 
        className="sticky top-0 z-10 w-full bg-opacity-80 backdrop-blur-md" 
        style={{ 
          backgroundColor: `${backgroundColor}cc`,
          borderBottomWidth: `${borderBottomWidth}px`,
          borderBottomStyle: 'solid',
          borderBottomColor: '#262626'
        }}
      >
        <div className="flex h-16 items-center justify-between" style={{ paddingLeft: `${paddingX}px`, paddingRight: `${paddingX}px` }}>
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2 text-xl font-bold" style={{ color: textColor }}>
              <div className="h-6 w-6 rounded bg-white" /> {companyName}
            </div>
            <nav className="hidden items-center gap-6 md:flex">
              {navItems.map((item, index) => (
                <div 
                  key={index} 
                  className="relative group"
                  onMouseEnter={() => handleMouseEnter(index)}
                  onMouseLeave={handleMouseLeave}
                >
                  <button 
                    className={cn(
                      "flex items-center gap-1 font-medium transition-colors hover:text-white",
                      fontWeight === "normal" ? "font-normal" : fontWeight === "semibold" ? "font-semibold" : fontWeight === "bold" ? "font-bold" : "font-medium"
                    )}
                    style={{ color: linkColor }}
                    onClick={() => navInteractionMode === 'click' && setActiveDropdown(activeDropdown === index ? null : index)}
                  >
                    {item.title} {(item.items && item.items.length > 0) && <ChevronDown size={14} className={cn("transition-transform", activeDropdown === index ? "rotate-180" : "")} />}
                  </button>
                  
                  {/* Dropdown Menu */}
                  {(item.items && item.items.length > 0 && activeDropdown === index) && (
                    <div 
                      className="absolute top-full left-0 mt-2 w-48 rounded-xl border p-2 shadow-xl animate-in fade-in zoom-in-95 duration-200"
                      style={{ 
                        backgroundColor: backgroundColor === '#000000' || backgroundColor === '#0a0a0a' ? '#171717' : '#ffffff',
                        borderColor: backgroundColor === '#000000' || backgroundColor === '#0a0a0a' ? '#262626' : '#e5e7eb'
                      }}
                    >
                      {item.items.map((subItem: string, subIndex: number) => (
                        <a 
                          key={subIndex} 
                          href="#" 
                          className="block rounded-lg px-4 py-2 text-sm transition-colors hover:bg-white/10"
                          style={{ color: linkColor }}
                        >
                          {subItem}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <button className="hidden font-medium hover:text-white md:block" style={{ color: linkColor }}>
              {secondaryButtonText}
            </button>
            <ShinyButton className="h-9 px-4 text-xs">{primaryButtonText}</ShinyButton>
          </div>
        </div>
      </header>
      <div className="flex-1 p-8">
        <div className="h-full w-full rounded-xl border border-dashed border-neutral-800 bg-neutral-900/30" />
      </div>
    </div>
  )
}

// --- 4. Dashboard Header ---
export type DashboardHeaderProps = HeaderComponentProps<"dashboard-header">
export function DashboardHeader({
  teamName,
  userName,
  searchPlaceholder,
  backgroundColor,
  borderColor,
  accentColor,
  notificationColor,
  paddingTop = 0,
  paddingBottom = 0,
  paddingX = 24,
  fontSize = "base",
  fontWeight = "medium",
  borderBottomWidth = 1,
}: DashboardHeaderProps) {
  return (
    <div className="flex h-[250px] w-full flex-col" style={{ backgroundColor, paddingTop: `${paddingTop}px`, paddingBottom: `${paddingBottom}px` }}>
      <header
        className={cn(
          "flex h-16 items-center justify-between",
          fontSize === "sm" ? "text-sm" : fontSize === "lg" ? "text-lg" : fontSize === "xl" ? "text-xl" : "text-base",
        )}
        style={{ 
          borderColor, 
          backgroundColor,
          borderBottomWidth: `${borderBottomWidth}px`,
          borderBottomStyle: 'solid',
          paddingLeft: `${paddingX}px`, 
          paddingRight: `${paddingX}px`
        }}
      >
        <div className="flex items-center gap-4">
          <button className="rounded-lg p-1.5 text-neutral-400 hover:bg-neutral-800 hover:text-white">
            <LayoutGrid size={20} />
          </button>
          <div className="h-6 w-px bg-neutral-800" />
          <nav className="flex items-center">
            <span className="text-neutral-400 hover:text-neutral-200 cursor-pointer">Team</span>
            <span className="mx-2 text-neutral-600">/</span>
            <span 
              className={cn("text-white", fontWeight === "normal" ? "font-normal" : fontWeight === "semibold" ? "font-semibold" : fontWeight === "bold" ? "font-bold" : "font-medium")}
            >{teamName}</span>
          </nav>
        </div>
        <div className="mx-4 hidden max-w-md flex-1 md:block">
          <div className="relative group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500 transition-colors group-focus-within:text-indigo-400" size={16} />
            <input
              type="text"
              placeholder={searchPlaceholder}
              className="w-full rounded-xl border border-neutral-800 bg-neutral-900 py-2 pl-10 pr-4 text-neutral-200 placeholder-neutral-600 focus:border-indigo-500/50 focus:bg-neutral-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all"
              style={{ caretColor: accentColor }}
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 flex gap-1">
              <kbd className="hidden rounded bg-neutral-800 px-1.5 py-0.5 text-[10px] font-bold text-neutral-500 sm:inline-block">⌘K</kbd>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="relative rounded-lg p-2 text-neutral-400 hover:bg-neutral-800 hover:text-white transition-colors">
            <Bell size={20} />
            <span className="absolute right-2 top-2 h-2 w-2 rounded-full ring-2 ring-neutral-950" style={{ backgroundColor: notificationColor }} />
          </button>
          <div className="mx-2 h-6 w-px bg-neutral-800" />
          <button className="flex items-center gap-2 rounded-full border border-neutral-800 bg-neutral-900 py-1 pl-1 pr-3 hover:bg-neutral-800 transition-colors">
            <img
              src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=1000&auto=format&fit=crop"
              alt="User"
              className="h-7 w-7 rounded-full object-cover"
            />
            <span className="text-xs font-medium text-neutral-300">{userName}</span>
          </button>
        </div>
      </header>
      <div className="flex-1 bg-neutral-950 p-6">
        <div className="grid grid-cols-4 gap-4 h-full">
          <div className="h-full rounded-xl bg-neutral-900/50 border border-neutral-800" />
          <div className="h-full rounded-xl bg-neutral-900/50 border border-neutral-800" />
          <div className="col-span-2 h-full rounded-xl bg-neutral-900/50 border border-neutral-800" />
        </div>
      </div>
    </div>
  )
}

// --- 5. Neo-Brutalist Header ---
export type NeoBrutalistHeaderProps = HeaderComponentProps<"neo-brutalist-header">
export function NeoBrutalistHeader({
  brandName,
  buttonText,
  backgroundColor,
  primaryColor,
  secondaryColor,
  textColor,
  borderColor,
  paddingTop = 0,
  paddingBottom = 0,
  paddingX = 24,
  fontSize = "base",
  fontWeight = "bold",
  borderBottomWidth = 4,
}: NeoBrutalistHeaderProps) {
  return (
    <div className="flex h-[200px] w-full flex-col" style={{ backgroundColor, paddingTop: `${paddingTop}px`, paddingBottom: `${paddingBottom}px` }}>
      <header
        className={cn(
          "flex h-20 items-center justify-between",
          fontSize === "sm" ? "text-sm" : fontSize === "lg" ? "text-lg" : fontSize === "xl" ? "text-xl" : "text-base",
        )}
        style={{ 
          borderColor, 
          backgroundColor,
          borderBottomWidth: `${borderBottomWidth}px`,
          borderBottomStyle: 'solid',
          paddingLeft: `${paddingX}px`,
          paddingRight: `${paddingX}px`
        }}
      >
        <div className="flex items-center gap-2">
          <div
            className="h-10 w-10 border-2 shadow-[4px_4px_0px_0px_currentColor]"
            style={{ borderColor, backgroundColor: primaryColor, color: borderColor }}
          />
          <span className="text-2xl font-black uppercase tracking-tighter" style={{ color: textColor }}>
            {brandName}
          </span>
        </div>
        <nav className="hidden items-center gap-8 md:flex">
          {["Manifesto", "Works", "Contact"].map((item) => (
            <a
              key={item}
              href="#"
              className={cn(
                "uppercase hover:underline decoration-4 underline-offset-4",
                fontWeight === "normal" ? "font-normal" : fontWeight === "semibold" ? "font-semibold" : fontWeight === "bold" ? "font-bold" : "font-black"
              )}
              style={{ color: textColor, textDecorationColor: primaryColor }}
            >
              {item}
            </a>
          ))}
        </nav>
        <button
          className="border-2 px-6 py-2 font-bold uppercase transition-transform active:translate-x-[2px] active:translate-y-[2px] hover:-translate-y-1"
          style={{
            borderColor,
            backgroundColor: secondaryColor,
            color: textColor,
            boxShadow: `4px 4px 0px 0px ${borderColor}`,
          }}
        >
          {buttonText}
        </button>
      </header>
      <div className="flex-1 p-6 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-50" />
    </div>
  )
}

// --- 6. Ecommerce Mega Header ---
export type EcommerceMegaHeaderProps = HeaderComponentProps<"ecommerce-mega-header">
export function EcommerceMegaHeader({
  brandName,
  topBarText,
  searchPlaceholder,
  backgroundColor,
  topBarColor,
  textColor,
  accentColor,
  paddingTop = 0,
  paddingBottom = 0,
  paddingX = 24,
  fontSize = "base",
  fontWeight = "medium",
  borderBottomWidth = 1,
}: EcommerceMegaHeaderProps) {
  return (
    <div className="flex h-[200px] w-full flex-col" style={{ backgroundColor, paddingTop: `${paddingTop}px`, paddingBottom: `${paddingBottom}px` }}>
      <div className="flex h-8 items-center justify-between px-6 text-[10px] font-medium text-neutral-400" style={{ backgroundColor: topBarColor, paddingLeft: `${paddingX}px`, paddingRight: `${paddingX}px` }}>
        <div className="flex gap-4">
          <span>{topBarText}</span>
          <span>30-day returns</span>
        </div>
        <div className="flex gap-4">
          <span className="hover:text-white cursor-pointer">Track Order</span>
          <span className="hover:text-white cursor-pointer">Help</span>
          <span className="hover:text-white cursor-pointer">USD ($)</span>
        </div>
      </div>
      <div 
        className="flex h-20 items-center justify-between border-b border-neutral-800"
        style={{ paddingLeft: `${paddingX}px`, paddingRight: `${paddingX}px`, borderBottomWidth: `${borderBottomWidth}px` }}
      >
        <div className="text-2xl font-serif italic" style={{ color: textColor }}>{brandName}</div>
        <div className="mx-8 hidden flex-1 max-w-lg md:block">
          <div className="relative">
            <input
              type="text"
              placeholder={searchPlaceholder}
              className="w-full rounded-full border border-neutral-800 bg-neutral-900 py-2.5 pl-4 pr-10 text-sm focus:border-neutral-600 focus:outline-none"
              style={{ color: textColor }}
            />
            <Search size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500" />
          </div>
        </div>
        <div className="flex items-center gap-6">
          <div className="flex flex-col items-center gap-0.5 text-neutral-400 hover:text-white cursor-pointer">
            <Users size={20} />
            <span className="text-[10px]">Account</span>
          </div>
          <div className="relative flex flex-col items-center gap-0.5 text-neutral-400 hover:text-white cursor-pointer">
            <ShoppingBag size={20} />
            <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-white text-[9px] font-bold text-black">3</span>
            <span className="text-[10px]">Cart</span>
          </div>
        </div>
      </div>
      <div 
        className={cn(
          "flex h-12 items-center justify-center gap-8 border-b border-neutral-800 text-neutral-400",
          fontSize === "sm" ? "text-sm" : fontSize === "lg" ? "text-lg" : fontSize === "xl" ? "text-xl" : "text-base",
          fontWeight === "normal" ? "font-normal" : fontWeight === "semibold" ? "font-semibold" : fontWeight === "bold" ? "font-bold" : "font-medium"
        )}
        style={{ paddingLeft: `${paddingX}px`, paddingRight: `${paddingX}px`, borderBottomWidth: `${borderBottomWidth}px` }}
      >
        {["New In", "Clothing", "Shoes", "Accessories", "Sale"].map((item) => (
          <a
            key={item}
            href="#"
            className="transition-colors hover:text-white"
            style={item === "Sale" ? { color: accentColor } : {}}
          >
            {item}
          </a>
        ))}
      </div>
    </div>
  )
}

// --- 7. Developer Docs Header ---
export type DeveloperDocsHeaderProps = HeaderComponentProps<"developer-docs-header">
export function DeveloperDocsHeader({
  brandName,
  version,
  backgroundColor,
  borderColor,
  textColor,
  secondaryTextColor,
  paddingTop = 0,
  paddingBottom = 0,
  paddingX = 24,
  fontSize = "base",
  fontWeight = "medium",
  borderBottomWidth = 1,
}: DeveloperDocsHeaderProps) {
  return (
    <div className="flex h-[200px] w-full flex-col" style={{ backgroundColor, paddingTop: `${paddingTop}px`, paddingBottom: `${paddingBottom}px` }}>
      <header 
        className="flex h-16 items-center justify-between border-b" 
        style={{ 
          backgroundColor, 
          borderColor,
          borderBottomWidth: `${borderBottomWidth}px`,
          paddingLeft: `${paddingX}px`,
          paddingRight: `${paddingX}px`
        }}
      >
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2 font-bold" style={{ color: textColor }}>
            <div className="rounded-md bg-white/10 p-1"><Command size={18} /></div>
            {brandName}
          </div>
          <div className="hidden h-6 w-px md:block" style={{ backgroundColor: borderColor }} />
          <nav 
            className={cn(
              "hidden items-center gap-4 md:flex",
              fontSize === "sm" ? "text-sm" : fontSize === "lg" ? "text-lg" : fontSize === "xl" ? "text-xl" : "text-base",
              fontWeight === "normal" ? "font-normal" : fontWeight === "semibold" ? "font-semibold" : fontWeight === "bold" ? "font-bold" : "font-medium"
            )}
            style={{ color: secondaryTextColor }}
          >
            <span style={{ color: textColor }}>Documentation</span>
            <span className="cursor-pointer hover:text-white">API Reference</span>
            <span className="cursor-pointer hover:text-white">Showcase</span>
          </nav>
        </div>
        <div className="flex items-center gap-3">
          <button className="hidden items-center gap-2 rounded-md border border-neutral-700 bg-neutral-800/50 px-3 py-1.5 text-sm text-neutral-400 hover:border-neutral-600 hover:text-neutral-200 md:flex">
            <Search size={14} />
            Search...
            <span className="ml-2 rounded bg-neutral-800 px-1 text-[10px] border border-neutral-700">/</span>
          </button>
          <div className="h-6 w-px" style={{ backgroundColor: borderColor }} />
          <div className="flex items-center gap-1 text-sm" style={{ color: secondaryTextColor }}>
            <span>{version}</span>
            <ChevronDown size={12} />
          </div>
          <div className="flex items-center gap-2" style={{ color: secondaryTextColor }}>
            <button className="p-2 hover:text-white"><Github size={20} /></button>
            <button className="p-2 hover:text-white"><Moon size={20} /></button>
          </div>
        </div>
      </header>
      <div className="flex flex-1">
        <div className="w-64 border-r p-4" style={{ borderColor }}>
          <div className="h-4 w-3/4 rounded bg-neutral-800 mb-3" />
          <div className="h-4 w-1/2 rounded bg-neutral-800 mb-3" />
          <div className="h-4 w-2/3 rounded bg-neutral-800" />
        </div>
        <div className="flex-1 p-6">
          <div className="h-8 w-1/3 rounded bg-neutral-800 mb-4" />
          <div className="space-y-2">
            <div className="h-4 w-full rounded bg-neutral-800/50" />
            <div className="h-4 w-full rounded bg-neutral-800/50" />
            <div className="h-4 w-2/3 rounded bg-neutral-800/50" />
          </div>
        </div>
      </div>
    </div>
  )
}

// --- 8. Creative Portfolio Header ---
export type CreativePortfolioHeaderProps = HeaderComponentProps<"creative-portfolio-header">
export function CreativePortfolioHeader({
  name,
  title,
  backgroundColor,
  textColor,
  accentColor,
  secondaryTextColor,
  paddingTop = 32,
  paddingBottom = 20,
  paddingX = 32,
  fontSize = "base",
  fontWeight = "medium",
}: CreativePortfolioHeaderProps) {
  return (
    <div 
      className="flex h-[200px] w-full flex-col" 
      style={{ 
        backgroundColor,
        paddingTop: `${paddingTop}px`,
        paddingBottom: `${paddingBottom}px`,
        paddingLeft: `${paddingX}px`,
        paddingRight: `${paddingX}px`
      }}
    >
      <header className="flex w-full justify-between items-start">
        <div className="flex flex-col gap-1">
          <h1 className="text-xl font-bold tracking-tight" style={{ color: textColor }}>{name}</h1>
          <span className="text-xs" style={{ color: secondaryTextColor }}>{title}</span>
        </div>
        <nav 
          className={cn(
            "flex gap-8",
            fontSize === "sm" ? "text-sm" : fontSize === "lg" ? "text-lg" : fontSize === "xl" ? "text-xl" : "text-base",
            fontWeight === "normal" ? "font-normal" : fontWeight === "semibold" ? "font-semibold" : fontWeight === "bold" ? "font-bold" : "font-medium"
          )}
        >
          {["Work", "About", "Playground", "Contact"].map(item => (
            <a key={item} href="#" className="relative transition-colors group" style={{ color: secondaryTextColor }}>
              <span className="group-hover:text-white transition-colors">{item}</span>
              <span className="absolute -bottom-1 left-0 h-px w-0 transition-all duration-300 group-hover:w-full" style={{ backgroundColor: accentColor }} />
            </a>
          ))}
        </nav>
      </header>
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center">
          <p className="text-4xl font-light" style={{ color: secondaryTextColor }}>Selected Works (2024)</p>
        </div>
      </div>
      <div className="flex justify-between items-end text-xs uppercase tracking-widest" style={{ color: secondaryTextColor }}>
        <span>Based in Tokyo</span>
        <span>Scroll to explore</span>
      </div>
    </div>
  )
}

// --- 9. Gaming Header ---
export type GamingHeaderProps = HeaderComponentProps<"gaming-header">
export function GamingHeader({
  brandName,
  statusText,
  backgroundColor,
  accentColor,
  secondaryAccentColor,
  textColor,
  paddingTop = 0,
  paddingBottom = 0,
  paddingX = 24,
  fontSize = "base",
  fontWeight = "bold",
  borderBottomWidth = 1,
}: GamingHeaderProps) {
  return (
    <div className="flex h-[200px] w-full flex-col" style={{ backgroundColor, paddingTop: `${paddingTop}px`, paddingBottom: `${paddingBottom}px` }}>
      <div className="h-1 w-full" style={{ background: `linear-gradient(to right, ${accentColor}, ${secondaryAccentColor}, purple)` }} />
      <header 
        className="relative flex h-20 items-center justify-between border-b border-white/10" 
        style={{ 
          paddingLeft: `${paddingX}px`, 
          paddingRight: `${paddingX}px`,
          borderBottomWidth: `${borderBottomWidth}px`,
          borderBottomStyle: 'solid',
          borderBottomColor: 'rgba(255,255,255,0.1)'
        }}
      >
        <div className="absolute left-0 top-0 h-full w-32 -skew-x-12 bg-white/5" />
        <div className="relative z-10 flex items-center gap-8">
          <div className="text-2xl font-black italic tracking-tighter" style={{ color: textColor, textShadow: `0 0 10px ${accentColor}80` }}>
            {brandName}
          </div>
          <nav className="hidden items-center gap-6 md:flex">
            {["Games", "Esports", "Community", "Store"].map(item => (
              <a 
                key={item} 
                href="#" 
                className={cn(
                  "uppercase text-neutral-400 transition-colors hover:text-cyan-400",
                  fontWeight === "normal" ? "font-normal" : fontWeight === "semibold" ? "font-semibold" : fontWeight === "bold" ? "font-bold" : "font-medium",
                  fontSize === "sm" ? "text-sm" : fontSize === "lg" ? "text-lg" : fontSize === "xl" ? "text-xl" : "text-base"
                )}
              >
                {item}
              </a>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <div
            className="flex items-center gap-2 rounded bg-neutral-900 px-3 py-1 text-xs font-bold border border-neutral-800"
            style={{ color: accentColor }}
          >
            <div className="h-2 w-2 rounded-full" style={{ backgroundColor: accentColor, boxShadow: `0 0 8px ${accentColor}cc` }} />
            {statusText}
          </div>
          <button
            className="h-10 w-10 p-[1px] clip-path-polygon-[0_0,100%_0,100%_80%,80%_100%,0_100%]"
            style={{ background: `linear-gradient(to bottom right, ${accentColor}, ${secondaryAccentColor})` }}
          >
            <div className="h-full w-full bg-black flex items-center justify-center text-white hover:bg-transparent transition-colors">
              <Users size={18} />
            </div>
          </button>
        </div>
      </header>
      <div className="flex-1 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />
    </div>
  )
}

// --- 10. News Portal Header ---
export type NewsPortalHeaderProps = HeaderComponentProps<"news-portal-header">
export function NewsPortalHeader({
  brandName,
  dateText,
  subscribeText,
  backgroundColor,
  topBarColor,
  textColor,
  accentColor,
  paddingTop = 0,
  paddingBottom = 0,
  paddingX = 24,
  borderBottomWidth = 4,
}: NewsPortalHeaderProps) {
  return (
    <div className="flex h-[200px] w-full flex-col" style={{ backgroundColor, color: textColor, paddingTop: `${paddingTop}px`, paddingBottom: `${paddingBottom}px` }}>
      <div className="flex h-8 items-center justify-between border-b border-neutral-200 px-6 text-xs font-medium text-neutral-500" style={{ backgroundColor: topBarColor, paddingLeft: `${paddingX}px`, paddingRight: `${paddingX}px` }}>
        <div className="flex items-center gap-4">
          <span>{dateText}</span>
          <span className="hidden md:inline">London 14°C, Cloudy</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="hover:text-black cursor-pointer">Subscribe</span>
          <span className="hover:text-black cursor-pointer">Sign In</span>
        </div>
      </div>
      <header 
        className="flex h-24 items-center justify-between border-b-4 border-black" 
        style={{ 
          paddingLeft: `${paddingX}px`, 
          paddingRight: `${paddingX}px`,
          borderBottomWidth: `${borderBottomWidth}px`,
          borderBottomColor: 'black',
          borderBottomStyle: 'solid'
        }}
      >
        <div className="text-4xl font-serif font-black tracking-tight">{brandName}</div>
        <div className="hidden items-center gap-4 md:flex">
          <button className="flex items-center gap-2 rounded-full border border-neutral-300 px-4 py-2 text-sm font-medium hover:bg-neutral-100">
            <Search size={16} /> Search
          </button>
          <button
            className="rounded px-4 py-2 text-sm font-bold text-white hover:opacity-90"
            style={{ backgroundColor: accentColor }}
          >
            {subscribeText}
          </button>
        </div>
      </header>
      <nav className="flex h-10 items-center justify-center gap-6 border-b border-neutral-200 text-xs font-bold uppercase tracking-wider text-neutral-600 overflow-x-auto px-4">
        {["World", "Politics", "Business", "Tech", "Science", "Health", "Sports", "Opinion"].map(item => (
          <a key={item} href="#" className="hover:text-black whitespace-nowrap">{item}</a>
        ))}
      </nav>
    </div>
  )
}

// --- 11. Video Platform Header ---
export type VideoPlatformHeaderProps = HeaderComponentProps<"video-platform-header">
export function VideoPlatformHeader({
  brandName,
  searchPlaceholder,
  backgroundColor,
  textColor,
  accentColor,
  searchBarColor,
  paddingTop = 0,
  paddingBottom = 0,
  paddingX = 16,
}: VideoPlatformHeaderProps) {
  return (
    <div className="flex h-[200px] w-full flex-col" style={{ backgroundColor, paddingTop: `${paddingTop}px`, paddingBottom: `${paddingBottom}px` }}>
      <header className="flex h-14 items-center justify-between" style={{ paddingLeft: `${paddingX}px`, paddingRight: `${paddingX}px` }}>
        <div className="flex items-center gap-4">
          <button className="p-2 hover:bg-neutral-800 rounded-full" style={{ color: textColor }}><Menu size={20} /></button>
          <div className="flex items-center gap-1 text-lg font-bold tracking-tighter" style={{ color: textColor }}>
            <div className="h-5 w-7 rounded-lg flex items-center justify-center" style={{ backgroundColor: accentColor }}>
              <div className="w-0 h-0 border-t-[3px] border-t-transparent border-l-[6px] border-l-white border-b-[3px] border-b-transparent ml-0.5"/>
            </div>
            {brandName}
          </div>
        </div>
        <div className="hidden flex-1 max-w-xl items-center gap-4 md:flex">
          <div className="flex w-full">
            <input
              type="text"
              placeholder={searchPlaceholder}
              className="w-full rounded-l-full border border-neutral-700 px-4 py-2 text-neutral-200 placeholder-neutral-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              style={{ backgroundColor: searchBarColor }}
            />
            <button className="flex items-center justify-center rounded-r-full border border-l-0 border-neutral-700 bg-neutral-800 px-5 text-neutral-400 hover:text-white">
              <Search size={20} />
            </button>
          </div>
          <button className="flex h-10 w-10 items-center justify-center rounded-full bg-[#181818] text-white hover:bg-[#202020]">
            <Mic size={20} />
          </button>
        </div>
        <div className="flex items-center gap-2">
          <button className="p-2 hover:bg-neutral-800 rounded-full" style={{ color: textColor }}><Video size={20} /></button>
          <button className="p-2 hover:bg-neutral-800 rounded-full" style={{ color: textColor }}><Bell size={20} /></button>
          <div className="ml-2 h-8 w-8 rounded-full bg-purple-600 text-sm font-medium text-white flex items-center justify-center">A</div>
        </div>
      </header>
      <div className="flex gap-3 py-3 overflow-x-auto scrollbar-hide" style={{ paddingLeft: `${paddingX}px`, paddingRight: `${paddingX}px` }}>
        {["All", "Gaming", "Live", "Music", "Mixes", "Computers", "Programming", "Podcasts"].map((tag, i) => (
          <button
            key={tag}
            className={cn("whitespace-nowrap rounded-lg px-3 py-1.5 text-sm font-medium transition-colors")}
            style={i === 0 ? { backgroundColor: textColor, color: backgroundColor } : { backgroundColor: "rgba(255,255,255,0.1)", color: textColor }}
          >
            {tag}
          </button>
        ))}
      </div>
    </div>
  )
}

// --- 12. Crypto Exchange Header ---
export type CryptoExchangeHeaderProps = HeaderComponentProps<"crypto-exchange-header">
export function CryptoExchangeHeader({
  brandName,
  ticker1,
  backgroundColor,
  accentColor,
  textColor,
  upColor,
  downColor,
  paddingTop = 0,
  paddingBottom = 0,
  paddingX = 24,
  borderBottomWidth = 1,
}: CryptoExchangeHeaderProps) {
  return (
    <div className="flex h-[200px] w-full flex-col" style={{ backgroundColor, paddingTop: `${paddingTop}px`, paddingBottom: `${paddingBottom}px` }}>
      <div className="flex h-8 items-center gap-8 border-b border-neutral-800 px-4 text-xs overflow-hidden whitespace-nowrap font-mono" style={{ backgroundColor, paddingLeft: `${paddingX}px`, paddingRight: `${paddingX}px` }}>
        <span className="flex items-center gap-1" style={{ color: upColor }}>{ticker1} <TrendingUp size={10} /></span>
        <span className="flex items-center gap-1" style={{ color: downColor }}>ETH/USD $3,450.20 <TrendingUp size={10} className="rotate-180" /> -1.2%</span>
        <span className="flex items-center gap-1" style={{ color: upColor }}>SOL/USD $145.80 <TrendingUp size={10} /> +5.8%</span>
        <span className="flex items-center gap-1 text-neutral-400">DOGE/USD $0.12 <TrendingUp size={10} /> +0.1%</span>
      </div>
      <header 
        className="flex h-16 items-center justify-between border-b border-neutral-800"
        style={{ 
          paddingLeft: `${paddingX}px`, 
          paddingRight: `${paddingX}px`,
          borderBottomWidth: `${borderBottomWidth}px`
        }}
      >
        <div className="flex items-center gap-8">
          <div className="text-xl font-bold flex items-center gap-2" style={{ color: textColor }}>
            <div className="h-6 w-6 rounded-full" style={{ backgroundColor: accentColor }} />
            {brandName}
          </div>
          <nav className="hidden items-center gap-6 text-sm font-medium text-neutral-400 md:flex">
            {["Markets", "Trade", "Futures", "Earn"].map(item => (
              <span key={item} className="cursor-pointer hover:text-white" style={item === "Markets" ? { color: textColor } : {}}>
                {item}
              </span>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <button className="text-sm font-medium text-neutral-400 hover:text-white">Log In</button>
          <button className="rounded px-4 py-2 text-sm font-bold text-black hover:opacity-90" style={{ backgroundColor: accentColor }}>Sign Up</button>
          <button className="p-2 text-neutral-400 hover:text-white"><Globe size={20} /></button>
        </div>
      </header>
      <div className="flex-1 p-6 flex items-center gap-4">
        <div className="flex-1">
          <div className="text-2xl font-bold mb-1" style={{ color: textColor }}>Buy Crypto</div>
          <p className="text-sm text-neutral-500">Sign up to buy 100+ cryptocurrencies with 50+ fiat currencies.</p>
        </div>
      </div>
    </div>
  )
}

// --- 13. Help Center Header ---
export type HelpCenterHeaderProps = HeaderComponentProps<"help-center-header">
export function HelpCenterHeader({
  title,
  heroTitle,
  searchPlaceholder,
  backgroundColor,
  textColor,
  accentColor,
  secondaryBackgroundColor,
  paddingTop = 0,
  paddingBottom = 0,
  paddingX = 24,
  borderBottomWidth = 1,
}: HelpCenterHeaderProps) {
  return (
    <div className="flex h-[250px] w-full flex-col" style={{ backgroundColor, paddingTop: `${paddingTop}px`, paddingBottom: `${paddingBottom}px` }}>
      <header 
        className="flex h-16 items-center justify-between border-b border-neutral-100 lg:px-12"
        style={{ 
          paddingLeft: `${paddingX}px`, 
          paddingRight: `${paddingX}px`,
          borderBottomWidth: `${borderBottomWidth}px`
        }}
      >
        <div className="flex items-center gap-2 text-lg font-bold" style={{ color: textColor }}>
          <HelpCircle className="text-blue-600" style={{ color: accentColor }} />
          {title}
        </div>
        <div className="flex items-center gap-4 text-sm font-medium">
          <a href="#" className="text-neutral-500 hover:text-neutral-900">Go to Website</a>
          <div className="h-4 w-px bg-neutral-200" />
          <a href="#" className="hover:underline" style={{ color: textColor }}>Submit a request</a>
          <button className="rounded-md border border-neutral-200 px-3 py-1.5 hover:bg-neutral-50">Sign in</button>
        </div>
      </header>
      <div className="flex flex-1 flex-col items-center justify-center gap-6 px-4 text-center" style={{ backgroundColor: secondaryBackgroundColor }}>
        <h2 className="text-3xl font-bold" style={{ color: textColor }}>{heroTitle}</h2>
        <div className="relative w-full max-w-xl">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400" size={20} />
          <input
            type="text"
            placeholder={searchPlaceholder}
            className="w-full rounded-full border border-neutral-200 bg-white py-3 pl-12 pr-4 text-neutral-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>
      </div>
    </div>
  )
}

// --- 14. Social Media Header ---
export type SocialMediaHeaderProps = HeaderComponentProps<"social-media-header">
export function SocialMediaHeader({
  logoText,
  backgroundColor,
  containerBackgroundColor,
  iconColor,
  activeIconColor,
  buttonBackgroundColor,
  paddingTop = 0,
  paddingBottom = 0,
  paddingX = 16,
  borderBottomWidth = 1,
}: SocialMediaHeaderProps) {
  return (
    <div className="flex h-[200px] w-full flex-col" style={{ backgroundColor: containerBackgroundColor, paddingTop: `${paddingTop}px`, paddingBottom: `${paddingBottom}px` }}>
      <header 
        className="flex h-14 items-center justify-between border-b border-[#2e3034] shadow-sm" 
        style={{ 
          backgroundColor, 
          paddingLeft: `${paddingX}px`, 
          paddingRight: `${paddingX}px`,
          borderBottomWidth: `${borderBottomWidth}px`
        }}
      >
        <div className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-500 text-2xl font-bold text-white">{logoText}</div>
          <div className="hidden h-10 w-10 items-center justify-center rounded-full bg-[#3a3b3c] text-neutral-400 hover:bg-[#4e4f50] lg:flex">
            <Search size={20} />
          </div>
        </div>
        <nav className="hidden flex-1 justify-center gap-2 md:flex max-w-xl">
          {[Home, Tv, Users, Gamepad2].map((Icon, i) => (
            <button
              key={i}
              className={cn("flex h-12 flex-1 items-center justify-center rounded-lg transition-colors hover:bg-[#3a3b3c]")}
              style={i === 0 ? { borderBottom: `3px solid ${activeIconColor}`, color: activeIconColor, borderRadius: 0 } : { color: iconColor }}
            >
              <Icon size={24} className={i === 0 ? "fill-current" : ""} />
            </button>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          {[MenuSquare, MessageCircle, Bell].map((Icon, i) => (
            <button
              key={i}
              className="rounded-full p-2.5 text-white hover:bg-[#4e4f50]"
              style={{ backgroundColor: buttonBackgroundColor }}
            >
              <Icon size={20} />
            </button>
          ))}
          <div className="h-10 w-10 rounded-full bg-neutral-700 relative">
            <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1000&auto=format&fit=crop" className="h-full w-full rounded-full object-cover" alt="Me" />
            <div className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-neutral-700 flex items-center justify-center">
              <div className="h-2.5 w-2.5 rounded-full bg-green-500" />
            </div>
          </div>
        </div>
      </header>
      <div className="flex-1 bg-[#18191a]" />
    </div>
  )
}

// --- 15. Split Minimal Header ---
export type SplitMinimalHeaderProps = HeaderComponentProps<"split-minimal-header">
export function SplitMinimalHeader({
  brandName,
  ctaText,
  heroText,
  backgroundColor,
  textColor,
  secondaryTextColor,
  buttonBorderColor,
  paddingTop = 32,
  paddingBottom = 32,
  paddingX = 32,
  fontSize = "base",
  fontWeight = "medium",
}: SplitMinimalHeaderProps) {
  return (
    <div 
      className="flex h-[200px] w-full flex-col" 
      style={{ 
        backgroundColor,
        paddingTop: `${paddingTop}px`,
        paddingBottom: `${paddingBottom}px`,
        paddingLeft: `${paddingX}px`,
        paddingRight: `${paddingX}px`
      }}
    >
      <header className="flex w-full items-center justify-between">
        <div className="flex items-center gap-2 text-xl font-bold tracking-tight" style={{ color: textColor }}>
          <div className="h-2 w-2 rounded-full bg-white"/>
          {brandName}
        </div>
        <nav 
          className={cn(
            "hidden md:flex gap-8",
            fontSize === "sm" ? "text-sm" : fontSize === "lg" ? "text-lg" : fontSize === "xl" ? "text-xl" : "text-base",
            fontWeight === "normal" ? "font-normal" : fontWeight === "semibold" ? "font-semibold" : fontWeight === "bold" ? "font-bold" : "font-medium"
          )}
          style={{ color: secondaryTextColor }}
        >
          {["Work", "Agency", "Expertise", "Insights"].map(i => (
            <a key={i} href="#" className="hover:text-white transition-colors">{i}</a>
          ))}
        </nav>
        <button
          className="rounded-full border px-6 py-2 text-sm hover:bg-neutral-900 transition-colors"
          style={{ borderColor: buttonBorderColor, color: textColor }}
        >
          {ctaText}
        </button>
      </header>
      <div className="flex-1 flex items-center justify-center">
        <h2 className="text-3xl font-light" style={{ color: secondaryTextColor }}>{heroText}</h2>
      </div>
    </div>
  )
}

// --- 16. Stacked Classic Header ---
export type StackedClassicHeaderProps = HeaderComponentProps<"stacked-classic-header">
export function StackedClassicHeader({
  brandName,
  topBarText,
  backgroundColor,
  topBarBackgroundColor,
  topBarTextColor,
  textColor,
  borderColor,
  paddingTop = 24,
  paddingBottom = 24,
  paddingX = 24,
  borderBottomWidth = 1,
}: StackedClassicHeaderProps) {
  return (
    <div className="flex h-[200px] w-full flex-col" style={{ backgroundColor, color: textColor }}>
      <div className="flex h-10 items-center justify-center text-[10px] font-bold uppercase tracking-widest" style={{ backgroundColor: topBarBackgroundColor, color: topBarTextColor }}>
        {topBarText}
      </div>
      <header 
        className="flex flex-col items-center border-b" 
        style={{ 
          borderColor,
          paddingTop: `${paddingTop}px`,
          paddingBottom: `${paddingBottom}px`,
          borderBottomWidth: `${borderBottomWidth}px`
        }}
      >
        <h1 className="text-3xl font-serif font-bold tracking-tight mb-4">{brandName}</h1>
        <div className="h-px w-full max-w-4xl mb-4" style={{ backgroundColor: borderColor }} />
        <nav className="flex gap-6 text-xs font-bold uppercase tracking-wider text-neutral-600">
          {["World", "U.S.", "Politics", "N.Y.", "Business", "Opinion", "Tech", "Science"].map(item => (
            <a key={item} href="#" className="hover:text-black transition-colors">{item}</a>
          ))}
        </nav>
      </header>
      <div className="flex-1 bg-neutral-100" />
    </div>
  )
}

// --- 17. Architectural Header ---
export type ArchitecturalHeaderProps = HeaderComponentProps<"architectural-header">
export function ArchitecturalHeader({
  brandName,
  backgroundColor,
  borderColor,
  textColor,
  secondaryTextColor,
  paddingTop = 0,
  paddingBottom = 0,
  paddingX = 24,
  borderBottomWidth = 1,
}: ArchitecturalHeaderProps) {
  return (
    <div className="flex h-[200px] w-full flex-col border" style={{ backgroundColor, borderColor, paddingTop: `${paddingTop}px`, paddingBottom: `${paddingBottom}px` }}>
      <header 
        className="grid grid-cols-12 border-b" 
        style={{ 
          borderColor,
          borderBottomWidth: `${borderBottomWidth}px`
        }}
      >
        <div className="col-span-3 flex h-16 items-center border-r text-lg font-bold uppercase tracking-widest" style={{ borderColor, color: textColor, paddingLeft: `${paddingX}px`, paddingRight: `${paddingX}px` }}>
          {brandName}
        </div>
        <div className="col-span-6 flex h-16 items-center justify-center border-r" style={{ borderColor }}>
          <nav className="flex gap-8 text-xs font-mono uppercase" style={{ color: secondaryTextColor }}>
            {["Projects", "Studio", "News", "Contact"].map(item => (
              <a key={item} href="#" className="hover:text-white transition-colors">[{item}]</a>
            ))}
          </nav>
        </div>
        <div className="col-span-3 flex h-16 items-center justify-between" style={{ paddingLeft: `${paddingX}px`, paddingRight: `${paddingX}px` }}>
          <span className="text-xs font-mono" style={{ color: secondaryTextColor }}>EN / JP</span>
          <Menu size={20} style={{ color: textColor }} />
        </div>
      </header>
      <div className="flex-1 grid grid-cols-12">
        <div className="col-span-3 border-r" style={{ borderColor }} />
        <div className="col-span-6 border-r" style={{ borderColor }} />
        <div className="col-span-3" />
      </div>
    </div>
  )
}

// --- 18. Fashion Editorial Header ---
export type FashionEditorialHeaderProps = HeaderComponentProps<"fashion-editorial-header">
export function FashionEditorialHeader({
  brandName,
  imageUrl,
  textColor,
  overlayColor,
  paddingTop = 24,
  paddingBottom = 24,
  paddingX = 24,
}: FashionEditorialHeaderProps) {
  return (
    <div 
      className="relative flex h-[250px] w-full flex-col justify-between overflow-hidden"
      style={{
        paddingTop: `${paddingTop}px`,
        paddingBottom: `${paddingBottom}px`,
        paddingLeft: `${paddingX}px`,
        paddingRight: `${paddingX}px`
      }}
    >
      <img src={imageUrl} className="absolute inset-0 h-full w-full object-cover" alt="Fashion background" />
      <div className="absolute inset-0" style={{ backgroundColor: overlayColor }} />
      <header className="relative z-10 flex w-full items-center justify-between" style={{ color: textColor }}>
        <Menu size={24} />
        <h1 className="text-4xl font-serif italic font-bold">{brandName}</h1>
        <Search size={24} />
      </header>
      <div className="relative z-10 flex justify-center gap-6 text-sm font-bold uppercase tracking-widest" style={{ color: `${textColor}e6` }}>
        {["Fashion", "Beauty", "Culture", "Living"].map(item => (
          <span key={item}>{item}</span>
        ))}
      </div>
    </div>
  )
}

// --- 19. App Store Header ---
export type AppStoreHeaderProps = HeaderComponentProps<"app-store-header">
export function AppStoreHeader({
  storeName,
  searchPlaceholder,
  backgroundColor,
  textColor,
  accentColor,
  borderColor,
  paddingTop = 0,
  paddingBottom = 0,
  paddingX = 24,
  borderBottomWidth = 1,
}: AppStoreHeaderProps) {
  return (
    <div className="flex h-[200px] w-full flex-col" style={{ backgroundColor, paddingTop: `${paddingTop}px`, paddingBottom: `${paddingBottom}px` }}>
      <header 
        className="flex h-16 items-center justify-between border-b" 
        style={{ 
          borderColor,
          borderBottomWidth: `${borderBottomWidth}px`,
          paddingLeft: `${paddingX}px`,
          paddingRight: `${paddingX}px`
        }}
      >
        <div className="flex items-center gap-2 font-bold text-xl" style={{ color: textColor }}>
          <div className="h-8 w-8 rounded-lg flex items-center justify-center text-white" style={{ backgroundColor: accentColor }}>A</div>
          {storeName}
        </div>
        <div className="flex-1 max-w-md mx-8 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500" size={16} />
          <input
            type="text"
            placeholder={searchPlaceholder}
            className="w-full rounded-lg bg-neutral-800 py-2 pl-10 pr-4 text-sm text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>
        <div className="flex gap-4">
          <span className="text-neutral-400 hover:text-white cursor-pointer">Developers</span>
          <div className="h-8 w-8 rounded-full bg-neutral-700" />
        </div>
      </header>
      <div className="flex items-center gap-6 py-4 border-b overflow-x-auto" style={{ borderColor, paddingLeft: `${paddingX}px`, paddingRight: `${paddingX}px` }}>
        {["Discover", "Arcade", "Create", "Work", "Play", "Develop", "Categories"].map((item, idx) => (
          <button
            key={item}
            className={cn("text-sm font-medium transition-colors")}
            style={idx === 0 ? { color: accentColor } : { color: "#a3a3a3" }}
          >
            {item}
          </button>
        ))}
      </div>
    </div>
  )
}

// --- 20. University Header ---
export type UniversityHeaderProps = HeaderComponentProps<"university-header">
export function UniversityHeader({
  universityName,
  subtitle,
  backgroundColor,
  primaryColor,
  textColor,
  borderColor,
  paddingTop = 0,
  paddingBottom = 0,
  paddingX = 32,
  borderBottomWidth = 1,
}: UniversityHeaderProps) {
  return (
    <div className="flex h-[200px] w-full flex-col" style={{ backgroundColor, paddingTop: `${paddingTop}px`, paddingBottom: `${paddingBottom}px` }}>
      <div className="flex h-8 justify-end items-center px-8 text-xs font-medium text-white/90 gap-4" style={{ backgroundColor: primaryColor, paddingLeft: `${paddingX}px`, paddingRight: `${paddingX}px` }}>
        <span>Students</span>
        <span>Faculty & Staff</span>
        <span>Alumni</span>
        <span>Parents</span>
        <div className="h-4 w-px bg-white/20" />
        <span>Give</span>
        <Search size={12} />
      </div>
      <header 
        className="flex h-20 items-center justify-between border-b" 
        style={{ 
          borderColor,
          borderBottomWidth: `${borderBottomWidth}px`,
          paddingLeft: `${paddingX}px`,
          paddingRight: `${paddingX}px`
        }}
      >
        <div className="flex items-center gap-3">
          <GraduationCap size={32} style={{ color: primaryColor }} />
          <div className="flex flex-col leading-none">
            <span className="text-xl font-serif font-bold" style={{ color: primaryColor }}>{universityName}</span>
            <span className="text-xs uppercase tracking-widest text-neutral-500">{subtitle}</span>
          </div>
        </div>
        <nav className="hidden md:flex gap-6 text-sm font-bold uppercase" style={{ color: textColor }}>
          {["Admissions", "Academics", "Research", "Campus Life", "About"].map(item => (
            <a key={item} href="#" className="hover:opacity-80 transition-opacity" style={{ color: textColor }}>{item}</a>
          ))}
        </nav>
        <Menu size={24} className="md:hidden" style={{ color: textColor }} />
      </header>
      <div className="h-1 w-full" style={{ backgroundColor: primaryColor }} />
    </div>
  )
}

// --- 21. Restaurant Header ---
export type RestaurantHeaderProps = HeaderComponentProps<"restaurant-header">
export function RestaurantHeader({
  restaurantName,
  address,
  phone,
  backgroundColor,
  textColor,
  accentColor,
  paddingTop = 0,
  paddingBottom = 0,
  paddingX = 32,
}: RestaurantHeaderProps) {
  return (
    <div className="flex h-[200px] w-full flex-col" style={{ backgroundColor, color: textColor, paddingTop: `${paddingTop}px`, paddingBottom: `${paddingBottom}px` }}>
      <header className="flex h-24 items-center justify-between" style={{ paddingLeft: `${paddingX}px`, paddingRight: `${paddingX}px` }}>
        <nav className="hidden md:flex gap-8 text-sm font-medium tracking-widest uppercase">
          <a href="#" className="hover:text-white transition-colors">Menu</a>
          <a href="#" className="hover:text-white transition-colors">Wines</a>
        </nav>
        <div className="text-3xl font-serif italic">{restaurantName}</div>
        <nav className="hidden md:flex gap-8 text-sm font-medium tracking-widest uppercase items-center">
          <a href="#" className="hover:text-white transition-colors">Private Dining</a>
          <button
            className="border px-6 py-2 hover:bg-opacity-10 transition-colors"
            style={{ borderColor: accentColor, color: accentColor }}
          >
            Reservations
          </button>
        </nav>
      </header>
      <div className="flex-1 flex justify-center pt-8 border-t border-white/10">
        <div className="flex items-center gap-8 text-xs uppercase tracking-widest text-neutral-500">
          <span className="flex gap-2"><MapPin size={14} /> {address}</span>
          <span className="flex gap-2"><Phone size={14} /> {phone}</span>
        </div>
      </div>
    </div>
  )
}

// --- 22. Artist / Band Header ---
export type ArtistHeaderProps = HeaderComponentProps<"artist-band-header">
export function ArtistHeader({
  artistName,
  backgroundColor,
  marqueeBackgroundColor,
  textColor,
  marqueeTextColor,
  paddingTop = 0,
  paddingBottom = 0,
  paddingX = 24,
}: ArtistHeaderProps) {
  return (
    <div className="flex h-[200px] w-full flex-col" style={{ backgroundColor, paddingTop: `${paddingTop}px`, paddingBottom: `${paddingBottom}px` }}>
      <header className="flex h-20 items-center justify-between" style={{ color: textColor, paddingLeft: `${paddingX}px`, paddingRight: `${paddingX}px` }}>
        <Menu size={24} />
        <h1 className="text-4xl font-black uppercase tracking-tighter mix-blend-difference">{artistName}</h1>
        <div className="flex gap-4">
          <Music size={24} />
          <ShoppingBag size={24} />
        </div>
      </header>
      <div className="w-full py-2 overflow-hidden" style={{ backgroundColor: marqueeBackgroundColor }}>
        <div className="flex whitespace-nowrap gap-8 text-xs font-bold uppercase animate-marquee" style={{ color: marqueeTextColor }}>
          <span>San Francisco • Oct 24</span>
          <span>Los Angeles • Oct 28</span>
          <span>Las Vegas • Nov 02</span>
          <span>Chicago • Nov 05</span>
          <span>New York • Nov 10</span>
          <span>London • Nov 15</span>
        </div>
      </div>
      <div className="flex-1 bg-[url('https://images.unsplash.com/photo-1493225255756-d9584f8606e9?q=80&w=1000&auto=format&fit=crop')] bg-cover bg-center opacity-50 grayscale" />
    </div>
  )
}

// --- 23. Non-Profit Header ---
export type NonProfitHeaderProps = HeaderComponentProps<"non-profit-header">
export function NonProfitHeader({
  orgName,
  donateText,
  urgentMessage,
  backgroundColor,
  primaryColor,
  textColor,
  secondaryBackgroundColor,
  paddingTop = 0,
  paddingBottom = 0,
  paddingX = 24, // Using px-6 (24px) default from design
}: NonProfitHeaderProps) {
  return (
    <div className="flex h-[200px] w-full flex-col" style={{ backgroundColor, paddingTop: `${paddingTop}px`, paddingBottom: `${paddingBottom}px` }}>
      <header className="flex h-20 items-center justify-between shadow-sm relative z-10" style={{ paddingLeft: `${paddingX}px`, paddingRight: `${paddingX}px` }}>
        <div className="flex items-center gap-2">
          <Heart className="fill-current" size={32} style={{ color: primaryColor }} />
          <span className="text-xl font-bold" style={{ color: textColor }}>{orgName}</span>
        </div>
        <nav className="hidden md:flex gap-8 text-sm font-semibold text-neutral-600">
          {["Our Work", "Stories", "Financials", "About Us"].map(item => (
            <a key={item} href="#" className="hover:text-neutral-900 transition-colors">{item}</a>
          ))}
        </nav>
        <button
          className="rounded-full px-6 py-2.5 font-bold text-white shadow-lg hover:-translate-y-0.5 transition-all"
          style={{ backgroundColor: primaryColor, boxShadow: `0 10px 15px -3px ${primaryColor}4d` }}
        >
          {donateText}
        </button>
      </header>
      <div className="flex-1 flex items-center justify-center" style={{ backgroundColor: secondaryBackgroundColor }}>
        <p className="text-sm font-medium text-neutral-500">{urgentMessage}</p>
      </div>
    </div>
  )
}

// --- 24. Web3 Dapp Header ---
export type Web3DappHeaderProps = HeaderComponentProps<"web3-dapp-header">
export function Web3DappHeader({
  appName,
  connectText,
  backgroundColor,
  textColor,
  accentColor,
  borderColor,
  paddingTop = 0,
  paddingBottom = 0,
  paddingX = 24,
  borderBottomWidth = 1,
}: Web3DappHeaderProps) {
  return (
    <div className="flex h-[200px] w-full flex-col" style={{ backgroundColor, paddingTop: `${paddingTop}px`, paddingBottom: `${paddingBottom}px` }}>
      <header 
        className="flex h-20 items-center justify-between border-b" 
        style={{ 
          borderColor,
          borderBottomWidth: `${borderBottomWidth}px`,
          paddingLeft: `${paddingX}px`,
          paddingRight: `${paddingX}px`
        }}
      >
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded bg-gradient-to-tr from-pink-500 to-violet-500" />
          <span className="text-xl font-bold" style={{ color: textColor }}>{appName}</span>
        </div>
        <div className="hidden md:flex items-center rounded-xl bg-neutral-900 p-1 border border-neutral-800">
          {["Swap", "Tokens", "NFTs", "Pools"].map((item, idx) => (
            <button
              key={item}
              className={cn("px-4 py-1.5 rounded-lg text-sm font-medium transition-colors")}
              style={idx === 0 ? { backgroundColor: "#262626", color: "white" } : { color: "#a3a3a3" }}
            >
              {item}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <div className="hidden md:flex items-center gap-2 rounded-xl bg-neutral-900 px-3 py-2 text-sm font-medium text-white border border-neutral-800">
            <div className="h-2 w-2 rounded-full bg-blue-500" />
            Ethereum
            <ChevronDown size={14} className="text-neutral-500" />
          </div>
          <button
            className="flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-bold border hover:bg-opacity-20 transition-colors"
            style={{ borderColor: `${accentColor}33`, color: accentColor, backgroundColor: `${accentColor}1a` }}
          >
            <Wallet size={16} /> {connectText}
          </button>
        </div>
      </header>
      <div className="flex-1 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-pink-900/20 via-neutral-950 to-neutral-950" />
    </div>
  )
}

// --- 25. Cyber Security Header ---
export type CyberSecurityHeaderProps = HeaderComponentProps<"cyber-security-header">
export function CyberSecurityHeader({
  brandName,
  statusText,
  backgroundColor,
  primaryColor,
  borderColor,
  paddingTop = 0,
  paddingBottom = 0,
  paddingX = 24,
  borderBottomWidth = 1,
}: CyberSecurityHeaderProps) {
  return (
    <div className="flex h-[200px] w-full flex-col font-mono" style={{ backgroundColor, paddingTop: `${paddingTop}px`, paddingBottom: `${paddingBottom}px` }}>
      <div className="h-1 w-full" style={{ backgroundColor: primaryColor }} />
      <header 
        className="flex h-16 items-center justify-between border-b" 
        style={{ 
          borderColor,
          borderBottomWidth: `${borderBottomWidth}px`,
          paddingLeft: `${paddingX}px`,
          paddingRight: `${paddingX}px`
        }}
      >
        <div className="flex items-center gap-2" style={{ color: primaryColor }}>
          <Terminal size={20} />
          <span className="font-bold tracking-widest">{brandName}</span>
          <span className="animate-pulse block h-4 w-2" style={{ backgroundColor: primaryColor }} />
        </div>
        <nav className="hidden md:flex gap-8 text-xs" style={{ color: "#15803d" }}>
          <a href="#" className="hover:text-green-400 transition-colors">[SERVICES]</a>
          <a href="#" className="hover:text-green-400 transition-colors">[INTELLIGENCE]</a>
          <a href="#" className="hover:text-green-400 transition-colors">[ABOUT]</a>
        </nav>
        <div className="flex items-center gap-2 text-xs border px-3 py-1" style={{ color: primaryColor, borderColor }}>
          <Shield size={12} /> {statusText}
        </div>
      </header>
      <div className="flex-1 p-6 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: `linear-gradient(0deg, transparent 24%, ${primaryColor}4d 25%, ${primaryColor}4d 26%, transparent 27%, transparent 74%, ${primaryColor}4d 75%, ${primaryColor}4d 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, ${primaryColor}4d 25%, ${primaryColor}4d 26%, transparent 27%, transparent 74%, ${primaryColor}4d 75%, ${primaryColor}4d 76%, transparent 77%, transparent)`, backgroundSize: "50px 50px" }} />
      </div>
    </div>
  )
}

// --- 26. Course Platform Header ---
export type CoursePlatformHeaderProps = HeaderComponentProps<"course-platform-header">
export function CoursePlatformHeader({
  platformName,
  userName,
  courseName,
  backgroundColor,
  secondaryBackgroundColor,
  textColor,
  accentColor,
  paddingTop = 0,
  paddingBottom = 0,
  paddingX = 24,
  borderBottomWidth = 1,
}: CoursePlatformHeaderProps) {
  return (
    <div className="flex h-[200px] w-full flex-col" style={{ backgroundColor, paddingTop: `${paddingTop}px`, paddingBottom: `${paddingBottom}px` }}>
      <header 
        className="flex h-16 items-center justify-between border-b border-neutral-800"
        style={{ 
          paddingLeft: `${paddingX}px`, 
          paddingRight: `${paddingX}px`,
          borderBottomWidth: `${borderBottomWidth}px`
        }}
      >
        <div className="flex items-center gap-8">
          <div className="font-bold text-lg" style={{ color: textColor }}>{platformName}</div>
          <span className="text-sm text-neutral-400 hover:text-white cursor-pointer">Categories</span>
        </div>
        <div className="flex-1 max-w-lg mx-4 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500" size={16} />
          <input
            type="text"
            placeholder="Search for anything"
            className="w-full rounded-full border border-neutral-700 bg-neutral-950 py-2 pl-10 pr-4 text-sm text-white focus:border-white focus:outline-none"
          />
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm font-medium hover:text-neutral-300 cursor-pointer" style={{ color: textColor }}>Instructor</span>
          <span className="text-sm font-medium hover:text-neutral-300 cursor-pointer" style={{ color: textColor }}>My Learning</span>
          <div className="relative">
            <ShoppingBag size={20} style={{ color: textColor }} />
            <div className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full text-[10px] font-bold text-white" style={{ backgroundColor: accentColor }}>2</div>
          </div>
          <div className="h-8 w-8 rounded-full bg-neutral-700 flex items-center justify-center text-xs font-bold text-white">JD</div>
        </div>
      </header>
      <div className="py-3 flex items-center justify-between" style={{ backgroundColor: secondaryBackgroundColor, paddingLeft: `${paddingX}px`, paddingRight: `${paddingX}px` }}>
        <div className="flex items-center gap-4">
          <span className="text-sm font-bold" style={{ color: textColor }}>Welcome back, {userName}</span>
          <div className="h-4 w-px bg-neutral-600" />
          <span className="text-xs text-neutral-400">Complete your "{courseName}" course</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-32 h-2 bg-neutral-700 rounded-full overflow-hidden">
            <div className="h-full w-[65%]" style={{ backgroundColor: accentColor }} />
          </div>
          <span className="text-xs text-neutral-400">65%</span>
        </div>
      </div>
    </div>
  )
}

// --- 27. Magazine Modern Header ---
export type MagazineModernHeaderProps = HeaderComponentProps<"magazine-modern-header">
export function MagazineModernHeader({
  brandName,
  categoryText,
  headlineText,
  backgroundColor,
  textColor,
  accentColor,
  paddingTop = 0,
  paddingBottom = 0,
  paddingX = 24,
}: MagazineModernHeaderProps) {
  return (
    <div className="flex h-[200px] w-full flex-col relative" style={{ backgroundColor, color: textColor, paddingTop: `${paddingTop}px`, paddingBottom: `${paddingBottom}px` }}>
      <header className="absolute top-0 left-0 w-full h-20 flex items-center justify-between z-10" style={{ paddingLeft: `${paddingX}px`, paddingRight: `${paddingX}px` }}>
        <div className="flex items-center gap-4">
          <Menu size={32} strokeWidth={1.5} />
          <Search size={24} strokeWidth={1.5} />
        </div>
        <div className="text-4xl font-serif font-bold tracking-tighter">{brandName}</div>
        <button className="border border-black px-4 py-1.5 text-xs font-bold uppercase tracking-widest hover:bg-black hover:text-white transition-colors">
          Subscribe
        </button>
      </header>
      <div className="h-full w-full pt-20 flex items-center justify-center border-b border-black">
        <div className="text-center px-6">
          <span className="text-xs font-bold uppercase tracking-widest mb-2 block" style={{ color: accentColor }}>{categoryText}</span>
          <h2 className="text-2xl font-bold leading-tight">{headlineText}</h2>
        </div>
      </div>
    </div>
  )
}

// --- 28. Travel Booking Header ---
export type TravelBookingHeaderProps = HeaderComponentProps<"travel-booking-header">
export function TravelBookingHeader({
  brandName,
  backgroundColor,
  textColor,
  searchBoxColor,
  searchButtonColor,
  paddingTop = 0,
  paddingBottom = 0,
  paddingX = 24,
}: TravelBookingHeaderProps) {
  return (
    <div className="flex h-[200px] w-full flex-col" style={{ backgroundColor, color: textColor, paddingTop: `${paddingTop}px`, paddingBottom: `${paddingBottom}px` }}>
      <header className="flex h-16 items-center justify-between max-w-5xl mx-auto w-full" style={{ paddingLeft: `${paddingX}px`, paddingRight: `${paddingX}px` }}>
        <span className="text-xl font-bold">{brandName}</span>
        <div className="flex gap-4 items-center text-sm font-medium">
          <span>USD</span>
          <div className="h-6 w-6 rounded-full bg-cover bg-[url('https://flagcdn.com/w40/us.png')]" />
          <HelpCircle size={20} />
          <button className="border border-white bg-white/10 px-4 py-1.5 rounded-sm hover:bg-white/20">List your property</button>
          <button className="bg-white px-4 py-1.5 rounded-sm font-bold" style={{ color: backgroundColor }}>Sign in</button>
        </div>
      </header>
      <div className="flex gap-6 max-w-5xl mx-auto w-full mt-2 text-sm overflow-x-auto pb-4" style={{ paddingLeft: `${paddingX}px`, paddingRight: `${paddingX}px` }}>
        <button className="flex items-center gap-2 rounded-full border border-white bg-white/10 px-4 py-2 hover:bg-white/20">
          <Home size={16} /> Stays
        </button>
        <button className="flex items-center gap-2 rounded-full border border-transparent px-4 py-2 hover:bg-white/10">
          <Plane size={16} /> Flights
        </button>
        <button className="flex items-center gap-2 rounded-full border border-transparent px-4 py-2 hover:bg-white/10">
          <Globe size={16} /> Flight + Hotel
        </button>
      </div>
      <div className="relative mt-4 max-w-5xl mx-auto w-full" style={{ paddingLeft: `${paddingX}px`, paddingRight: `${paddingX}px` }}>
        <div className="flex p-1 rounded-md gap-1" style={{ backgroundColor: searchBoxColor }}>
          <div className="flex-1 bg-white rounded-sm flex items-center px-3 py-3 text-black gap-2">
            <Home size={20} className="text-neutral-400" />
            <input type="text" placeholder="Where are you going?" className="w-full text-sm outline-none placeholder-neutral-500" />
          </div>
          <div className="flex-1 bg-white rounded-sm flex items-center px-3 py-3 text-black gap-2">
            <Calendar size={20} className="text-neutral-400" />
            <span className="text-sm text-neutral-500">Check-in — Check-out</span>
          </div>
          <button className="text-white px-6 font-bold text-lg rounded-sm" style={{ backgroundColor: searchButtonColor }}>Search</button>
        </div>
      </div>
    </div>
  )
}

// --- 29. Gradient Blur Header ---
export type GradientBlurHeaderProps = HeaderComponentProps<"gradient-blur-header">
export function GradientBlurHeader({
  buttonText,
  backgroundColor,
  navBackgroundColor,
  textColor,
  accentColor,
  paddingTop = 0,
  paddingBottom = 0,
}: GradientBlurHeaderProps) {
  return (
    <div className="flex h-[200px] w-full flex-col items-center justify-center relative overflow-hidden" style={{ backgroundColor, paddingTop: `${paddingTop}px`, paddingBottom: `${paddingBottom}px` }}>
      <div className="absolute top-[-50%] left-[-10%] h-[200%] w-[120%] bg-[radial-gradient(circle_at_50%_50%,#e9d5ff,#fae8ff,#ffffff)] blur-3xl opacity-60" />
      <header className="relative z-10 w-full max-w-2xl mt-8">
        <nav className="flex items-center justify-between rounded-2xl border border-white/20 p-2 shadow-xl shadow-purple-500/5 backdrop-blur-xl" style={{ backgroundColor: navBackgroundColor }}>
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white shadow-sm font-bold" style={{ color: accentColor }}>
            G
          </div>
          <div className="flex items-center gap-1 bg-neutral-100/50 p-1 rounded-xl">
            {["Product", "Solutions", "Resources", "Pricing"].map(item => (
              <button key={item} className="px-4 py-1.5 text-sm font-medium text-neutral-600 hover:bg-white hover:text-black hover:shadow-sm rounded-lg transition-all">
                {item}
              </button>
            ))}
          </div>
          <button className="rounded-xl bg-black px-4 py-2 text-sm font-bold text-white hover:bg-neutral-800 transition-colors">
            {buttonText}
          </button>
        </nav>
      </header>
    </div>
  )
}

export const headerComponentsByName: Record<string, React.ComponentType<any>> = {
  SimpleHeader,
  FloatingNav,
  SaaSHeader,
  DashboardHeader,
  NeoBrutalistHeader,
  EcommerceMegaHeader,
  DeveloperDocsHeader,
  CreativePortfolioHeader,
  GamingHeader,
  NewsPortalHeader,
  VideoPlatformHeader,
  CryptoExchangeHeader,
  HelpCenterHeader,
  SocialMediaHeader,
  SplitMinimalHeader,
  StackedClassicHeader,
  ArchitecturalHeader,
  FashionEditorialHeader,
  AppStoreHeader,
  UniversityHeader,
  RestaurantHeader,
  ArtistHeader,
  NonProfitHeader,
  Web3DappHeader,
  CyberSecurityHeader,
  CoursePlatformHeader,
  MagazineModernHeader,
  TravelBookingHeader,
  GradientBlurHeader,
}
