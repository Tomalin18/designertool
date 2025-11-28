"use client"

import React, { useState } from "react"
import { cn } from "../../../lib/utils"
import { 
  Home, 
  Search, 
  User, 
  Bell, 
  Settings, 
  Plus, 
  Heart, 
  ShoppingBag, 
  Map, 
  Calendar, 
  MessageSquare, 
  Menu, 
  Compass, 
  Star, 
  Video, 
  Music, 
  Grid, 
  Layers, 
  Zap, 
  Radio,
  Scan,
  Box,
  TrendingUp,
  Mail,
  Send
} from "lucide-react"
import { tabbarSections } from "@/lib/tabbar-sections"

// Helper function to convert hex to rgb
const hexToRgb = (hex: string): string | undefined => {
  if (!hex) return undefined
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  if (!result) return hex
  const r = parseInt(result[1], 16)
  const g = parseInt(result[2], 16)
  const b = parseInt(result[3], 16)
  return `rgb(${r} ${g} ${b})`
}

// Helper function to process color props
const processColor = (color: string | undefined, defaultColor: string): string => {
  if (!color || color.trim() === "") return defaultColor
  return color.startsWith("rgb") ? color : (hexToRgb(color) || color)
}

// Helper to parse items from textarea
const parseItems = (itemsString?: string, defaultItems: string[] = []): string[] => {
  if (!itemsString || itemsString.trim() === "") return defaultItems
  return itemsString.split("\n").map(t => t.trim()).filter(t => t !== "")
}

// Helper to parse icons from textarea
const parseIcons = (iconsString?: string, defaultIcons: string[] = []): string[] => {
  if (!iconsString || iconsString.trim() === "") return defaultIcons
  return iconsString.split("\n").map(t => t.trim()).filter(t => t !== "")
}

// Icon mapping for all tabbars
const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string; strokeWidth?: number }>> = {
  Home,
  Search,
  User,
  Bell,
  Settings,
  Plus,
  Heart,
  ShoppingBag,
  Map,
  Calendar,
  MessageSquare,
  Menu,
  Compass,
  Star,
  Video,
  Music,
  Grid,
  Layers,
  Zap,
  Radio,
  Scan,
  TrendingUp,
  Mail,
  Send,
  Library: Layers,
  Reels: Video,
  Profile: User,
  Shop: ShoppingBag,
  Discover: Compass,
  Cart: ShoppingBag,
  Account: User,
}

// Helper for the phone frame
const PhoneFrame = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <div className={cn("relative mx-auto h-[200px] w-full max-w-[320px] overflow-hidden rounded-3xl border-8 border-neutral-900 bg-neutral-950 shadow-xl", className)}>
    <div className="absolute top-0 left-1/2 -translate-x-1/2 h-4 w-24 rounded-b-xl bg-neutral-900 z-20" />
    <div className="absolute inset-0 bg-neutral-900/50" />
    <div className="absolute bottom-0 w-full z-10">
      {children}
    </div>
  </div>
)

// Helper Icon Components
const BriefcaseIcon = (props: any) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="14" x="2" y="7" rx="2" ry="2"/>
    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
  </svg>
)

const WalletIcon = (props: any) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1"/>
    <path d="M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4"/>
  </svg>
)

const ClockIcon = (props: any) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/>
    <polyline points="12 6 12 12 16 14"/>
  </svg>
)

const ImageIcon = (props: any) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="18" height="18" x="3" y="3" rx="2" ry="2"/>
    <circle cx="9" cy="9" r="2"/>
    <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/>
  </svg>
)

// Component Interfaces
export interface IosTabBarProps {
  className?: string
  items?: string
  icons?: string
  showLabels?: boolean
  activeColor?: string
  inactiveColor?: string
}

export interface MaterialTabBarProps {
  className?: string
  items?: string
  icons?: string
  showLabels?: boolean
  activeColor?: string
  activeTextColor?: string
  inactiveColor?: string
}

export interface IslandTabBarProps {
  className?: string
  items?: string
  icons?: string
  showLabels?: boolean
  backgroundColor?: string
  activeColor?: string
  activeTextColor?: string
  inactiveColor?: string
}

export interface NotchedFabBarProps {
  className?: string
  items?: string
  icons?: string
  showLabels?: boolean
  fabColor?: string
  activeColor?: string
  inactiveColor?: string
}

export interface AnimatedIndicatorBarProps {
  className?: string
  items?: string
  icons?: string
  showLabels?: boolean
  indicatorColor?: string
  iconColor?: string
  backgroundColor?: string
}

export interface TextOnlyBarProps {
  className?: string
  items?: string
  showLabels?: boolean
  activeColor?: string
  inactiveColor?: string
  backgroundColor?: string
}

export interface GlassCurvedBarProps {
  className?: string
  items?: string
  icons?: string
  showLabels?: boolean
  backgroundColor?: string
  activeColor?: string
  inactiveColor?: string
}

export interface SlideGestureBarProps {
  className?: string
  backgroundColor?: string
  indicatorColor?: string
  textColor?: string
}

export interface LabeledIconsBarProps {
  className?: string
  items?: string
  icons?: string
  showLabels?: boolean
  activeColor?: string
  inactiveColor?: string
  backgroundColor?: string
}

export interface HamburgerHybridBarProps {
  className?: string
  items?: string
  icons?: string
  showLabels?: boolean
  activeColor?: string
  inactiveColor?: string
  backgroundColor?: string
  dividerColor?: string
}

export interface SocialMediaBarProps {
  className?: string
  items?: string
  icons?: string
  showLabels?: boolean
  backgroundColor?: string
  iconColor?: string
  borderColor?: string
}

export interface RetroPixelBarProps {
  className?: string
  items?: string
  showLabels?: boolean
  backgroundColor?: string
  activeBackgroundColor?: string
  borderColor?: string
  textColor?: string
}

export interface CyberpunkBarProps {
  className?: string
  items?: string
  icons?: string
  showLabels?: boolean
  activeColor?: string
  activeTextColor?: string
  inactiveColor?: string
  backgroundColor?: string
  borderColor?: string
}

export interface NeonGlowBarProps {
  className?: string
  items?: string
  icons?: string
  showLabels?: boolean
  activeColor?: string
  inactiveColor?: string
  backgroundColor?: string
  glowColor?: string
}

export interface MinimalLineBarProps {
  className?: string
  items?: string
  icons?: string
  showLabels?: boolean
  activeColor?: string
  inactiveColor?: string
  backgroundColor?: string
  dotColor?: string
}

export interface GradientMaskBarProps {
  className?: string
  items?: string
  icons?: string
  showLabels?: boolean
  activeColor?: string
  inactiveColor?: string
  backgroundColor?: string
  containerBackgroundColor?: string
  gradientFrom?: string
  gradientTo?: string
}

export interface PillIndicatorBarProps {
  className?: string
  items?: string
  icons?: string
  showLabels?: boolean
  activeColor?: string
  inactiveColor?: string
  backgroundColor?: string
  pillBackgroundColor?: string
  pillTextColor?: string
}

export interface CupertinoBlurredBarProps {
  className?: string
  items?: string
  icons?: string
  showLabels?: boolean
  activeColor?: string
  inactiveColor?: string
  backgroundColor?: string
  borderColor?: string
}

export interface VerticalMobileBarProps {
  className?: string
  items?: string
  icons?: string
  showLabels?: boolean
  activeColor?: string
  inactiveColor?: string
  backgroundColor?: string
  activeBackgroundColor?: string
}

export interface FabCenterBarProps {
  className?: string
  items?: string
  icons?: string
  showLabels?: boolean
  activeColor?: string
  inactiveColor?: string
  backgroundColor?: string
  fabColor?: string
  fabShadowColor?: string
}

// 1. Standard iOS Tab Bar
export const IosTabBar = ({
  className,
  items: itemsProp,
  icons: iconsProp,
  showLabels = true,
  activeColor = "#3b82f6",
  inactiveColor = "#737373",
}: IosTabBarProps) => {
  const defaultItems = ["Home", "Search", "Library"]
  const defaultIcons = ["Home", "Search", "Layers"]
  const items = parseItems(itemsProp, defaultItems)
  const iconNames = parseIcons(iconsProp, defaultIcons)
  const [active, setActive] = useState(items[0] || "Home")
  const activeRgb = processColor(activeColor, "#3b82f6")
  const inactiveRgb = processColor(inactiveColor, "#737373")

  return (
    <PhoneFrame className={className}>
      <div 
        className="flex justify-around items-center bg-black/90 backdrop-blur-md border-t border-white/10 pb-5 pt-3"
        style={{
          ...(activeColor && activeColor.trim() !== "" && {
            "--active-color": activeRgb,
          } as React.CSSProperties),
          ...(inactiveColor && inactiveColor.trim() !== "" && {
            "--inactive-color": inactiveRgb,
          } as React.CSSProperties),
        }}
      >
        {items.map((item, index) => {
          const iconName = iconNames[index] || defaultIcons[index] || "Home"
          const Icon = iconMap[iconName] || Home
          const isActive = active === item
          return (
            <button 
              key={item} 
              onClick={() => setActive(item)} 
              className={cn("flex flex-col items-center gap-1", isActive ? "text-blue-500" : "text-neutral-500")}
              style={{
                color: isActive ? activeRgb : inactiveRgb,
              }}
            >
              <Icon 
                size={24} 
                className={isActive ? "fill-current" : ""}
                strokeWidth={iconName === "Search" ? 3 : undefined}
              />
                {showLabels && <span className="text-[10px] font-medium">{item}</span>}
            </button>
          )
        })}
      </div>
    </PhoneFrame>
  )
}

// 2. Material 3 Bar
export const MaterialTabBar = ({
  className,
  items: itemsProp,
  icons: iconsProp,
  showLabels = true,
  activeColor = "#004A77",
  activeTextColor = "#C2E7FF",
  inactiveColor = "#ffffff",
}: MaterialTabBarProps) => {
  const defaultItems = ["Mail", "Chat", "Meet"]
  const defaultIcons = ["Mail", "MessageSquare", "Video"]
  const items = parseItems(itemsProp, defaultItems)
  const iconNames = parseIcons(iconsProp, defaultIcons)
  const [active, setActive] = useState(items[0] || "Mail")
  const activeRgb = processColor(activeColor, "#004A77")
  const activeTextRgb = processColor(activeTextColor, "#C2E7FF")
  const inactiveRgb = processColor(inactiveColor, "#ffffff")

  return (
    <PhoneFrame className={className}>
      <div className="flex justify-around items-center bg-[#1E1E1E] pb-4 pt-2">
        {items.map((item, index) => {
          const iconName = iconNames[index] || defaultIcons[index] || "Mail"
          const Icon = iconMap[iconName] || Mail
          const isActive = active === item
          return (
            <button key={item} onClick={() => setActive(item)} className="flex flex-col items-center gap-1 group">
              <div 
                className={cn("px-5 py-1 rounded-full transition-colors", isActive ? "" : "group-hover:bg-white/5")}
                style={{
                  ...(isActive && {
                    backgroundColor: activeRgb,
                  }),
                }}
              >
                <Icon 
                  size={24} 
                  className={isActive ? "fill-current" : ""}
                  style={{
                    color: isActive ? activeTextRgb : inactiveRgb,
                  }}
                />
              </div>
              {showLabels && (
                <div className="flex items-center gap-1">
                  <span 
                    className={cn("text-xs font-medium", isActive ? "" : "")}
                    style={{
                      color: isActive ? activeTextRgb : inactiveRgb,
                    }}
                  >
                    {item}
                  </span>
                </div>
              )}
            </button>
          )
        })}
      </div>
    </PhoneFrame>
  )
}

// 3. Floating Island Bar
export const IslandTabBar = ({
  className,
  items: itemsProp,
  icons: iconsProp,
  showLabels = false,
  backgroundColor = "rgba(255, 255, 255, 0.1)",
  activeColor = "#ffffff",
  activeTextColor = "#000000",
  inactiveColor = "#ffffff",
}: IslandTabBarProps) => {
  const defaultItems = ["Home", "Search", "Notifications", "Profile"]
  const defaultIcons = ["Home", "Search", "Bell", "User"]
  const items = parseItems(itemsProp, defaultItems)
  const iconNames = parseIcons(iconsProp, defaultIcons)
  const [active, setActive] = useState(0)
  const bgRgb = backgroundColor.startsWith("rgba") || backgroundColor.startsWith("rgb") 
    ? backgroundColor 
    : (hexToRgb(backgroundColor) || backgroundColor)
  const activeRgb = processColor(activeColor, "#ffffff")
  const activeTextRgb = processColor(activeTextColor, "#000000")
  const inactiveRgb = processColor(inactiveColor, "#ffffff")

  return (
    <PhoneFrame className={className}>
      <div className="flex justify-center pb-4 px-4">
        <div 
          className="flex w-full justify-between items-center backdrop-blur-xl border border-white/20 rounded-full px-2 py-2 shadow-2xl"
          style={{
            backgroundColor: bgRgb,
          }}
        >
          {items.map((item, i) => {
            const iconName = iconNames[i] || defaultIcons[i] || "Home"
            const Icon = iconMap[iconName] || Home
            return (
              <button 
                key={item} 
                onClick={() => setActive(i)} 
                className={cn("p-3 rounded-full transition-all flex flex-col items-center gap-1", active === i ? "" : "hover:bg-white/10")}
                style={{
                  ...(active === i && {
                    backgroundColor: activeRgb,
                    color: activeTextRgb,
                  }),
                  ...(active !== i && {
                    color: inactiveRgb,
                  }),
                }}
              >
                <Icon size={20} className={active === i ? "fill-current" : ""} />
                {showLabels && (
                  <div className="flex items-center gap-1">
                    <span className="text-[10px]">{item}</span>
                  </div>
                )}
              </button>
            )
          })}
        </div>
      </div>
    </PhoneFrame>
  )
}

// 4. Notched FAB Bar
export const NotchedFabBar = ({
  className,
  items: itemsProp,
  icons: iconsProp,
  showLabels = false,
  fabColor = "#4f46e5",
  activeColor = "#4f46e5",
  inactiveColor = "#a3a3a3",
}: NotchedFabBarProps) => {
  const defaultItems = ["Home", "Calendar", "Messages", "Profile"]
  const defaultIcons = ["Home", "Calendar", "MessageSquare", "User"]
  const items = parseItems(itemsProp, defaultItems)
  const iconNames = parseIcons(iconsProp, defaultIcons)
  const [active, setActive] = useState(0)
  const fabRgb = processColor(fabColor, "#4f46e5")
  const activeRgb = processColor(activeColor, "#4f46e5")
  const inactiveRgb = processColor(inactiveColor, "#a3a3a3")

  // Split items into left and right (FAB is in the center)
  const leftItems = items.slice(0, Math.floor(items.length / 2))
  const rightItems = items.slice(Math.floor(items.length / 2))
  const leftIcons = iconNames.slice(0, Math.floor(iconNames.length / 2))
  const rightIcons = iconNames.slice(Math.floor(iconNames.length / 2))

  return (
    <PhoneFrame className={className}>
      <div className="relative h-16 w-full bg-white">
        <div className="absolute -top-6 left-1/2 -translate-x-1/2 h-16 w-16 rounded-full bg-black p-1 shadow-lg ring-8 ring-neutral-900 border-4 border-neutral-900">
          <button 
            className="h-full w-full rounded-full flex items-center justify-center text-white shadow-inner"
            style={{
              backgroundColor: fabRgb,
            }}
          >
            <Plus size={32} />
          </button>
        </div>
        <div className="flex justify-between items-center h-full px-8 text-neutral-400">
          {leftItems.map((item, i) => {
            const iconName = leftIcons[i] || defaultIcons[i] || "Home"
            const Icon = iconMap[iconName] || Home
            return (
              <button 
                key={item}
                onClick={() => setActive(i)} 
                className="flex flex-col items-center gap-1"
                style={{
                  color: active === i ? activeRgb : inactiveRgb,
                }}
              >
                <Icon size={24} />
                {showLabels && (
                  <div className="flex items-center gap-1">
                    <span className="text-[10px]">{item}</span>
                  </div>
                )}
              </button>
            )
          })}
          <div className="w-12" />
          {rightItems.map((item, i) => {
            const iconName = rightIcons[i] || defaultIcons[leftItems.length + i] || "MessageSquare"
            const Icon = iconMap[iconName] || MessageSquare
            const index = leftItems.length + i
            return (
              <button 
                key={item}
                onClick={() => setActive(index)} 
                className="flex flex-col items-center gap-1"
                style={{
                  color: active === index ? activeRgb : inactiveRgb,
                }}
              >
                <Icon size={24} />
                {showLabels && (
                  <div className="flex items-center gap-1">
                    <span className="text-[10px]">{item}</span>
                  </div>
                )}
              </button>
            )
          })}
        </div>
      </div>
    </PhoneFrame>
  )
}

// 5. Animated Indicator Bar
export const AnimatedIndicatorBar = ({
  className,
  items: itemsProp,
  icons: iconsProp,
  showLabels = false,
  indicatorColor = "#ec4899",
  iconColor = "#ffffff",
  backgroundColor = "#000000",
}: AnimatedIndicatorBarProps) => {
  const defaultItems = ["Home", "Explore", "Favorites", "Profile"]
  const defaultIcons = ["Home", "Compass", "Heart", "User"]
  const items = parseItems(itemsProp, defaultItems)
  const iconNames = parseIcons(iconsProp, defaultIcons)
  const [active, setActive] = useState(0)
  const indicatorRgb = processColor(indicatorColor, "#ec4899")
  const iconRgb = processColor(iconColor, "#ffffff")
  const bgRgb = processColor(backgroundColor, "#000000")
  const itemWidth = 100 / items.length

  return (
    <PhoneFrame className={className}>
      <div 
        className="relative flex justify-around items-center pb-5 pt-4 px-2"
        style={{
          backgroundColor: bgRgb,
        }}
      >
        {items.map((item, i) => {
          const iconName = iconNames[i] || defaultIcons[i] || "Home"
          const Icon = iconMap[iconName] || Home
          return (
            <button 
              key={`${item}-${i}`}
              onClick={() => setActive(i)} 
              className="relative z-10 p-3 transition-colors duration-300 flex flex-col items-center gap-1"
              style={{
                color: iconRgb,
              }}
            >
              <Icon size={24} className={cn("transition-transform duration-300", active === i ? "-translate-y-1" : "")} />
              {showLabels && <span className="text-[10px]">{item}</span>}
            </button>
          )
        })}
        <div 
          className="absolute top-0 h-1 w-8 rounded-b-full shadow-[0_0_15px_rgba(236,72,153,1)] transition-all duration-300 ease-spring"
          style={{ 
            left: `calc(${active * itemWidth}% + ${itemWidth / 2}% - 16px)`,
            backgroundColor: indicatorRgb,
          }}
        />
      </div>
    </PhoneFrame>
  )
}

// 6. Text Only Minimalist
export const TextOnlyBar = ({
  className,
  items: itemsProp,
  showLabels = true,
  activeColor = "#000000",
  inactiveColor = "#a3a3a3",
  backgroundColor = "#F5F5F5",
}: TextOnlyBarProps) => {
  const defaultItems = ["Shop", "Discover", "Cart", "Account"]
  const items = parseItems(itemsProp, defaultItems)
  const [active, setActive] = useState(items[0] || "Shop")
  const activeRgb = processColor(activeColor, "#000000")
  const inactiveRgb = processColor(inactiveColor, "#a3a3a3")
  const bgRgb = processColor(backgroundColor, "#F5F5F5")

  return (
    <PhoneFrame className={className}>
      <div 
        className="flex justify-between items-end pb-6 pt-4 px-8 border-t border-neutral-200"
        style={{
          backgroundColor: bgRgb,
        }}
      >
        {items.map((item, i) => {
          const isActive = active === item
          // Parse item for badge format: "Item:badge" or just "Item"
          const itemParts = item.includes(":") ? item.split(":") : [item, ""]
          const itemLabel = itemParts[0]
          const itemBadge = itemParts[1] || null
          return (
            <button key={`${item}-${i}`} onClick={() => setActive(item)} className="relative group flex flex-col items-center gap-1">
              {showLabels && (
                <div className="flex items-center gap-1">
                  <span 
                    className={cn("text-xs font-bold uppercase tracking-wider transition-colors", isActive ? "" : "")}
                    style={{
                      color: isActive ? activeRgb : inactiveRgb,
                    }}
                  >
                    {itemLabel}
                  </span>
                  {itemBadge && (
                    <Badge className="text-[8px] h-4 px-1 bg-neutral-200 text-neutral-700">
                      {itemBadge}
                    </Badge>
                  )}
                </div>
              )}
              <span 
                className={cn("absolute -bottom-2 left-1/2 -translate-x-1/2 h-1 w-1 rounded-full transition-all", isActive ? "scale-100" : "scale-0")}
                style={{
                  backgroundColor: activeRgb,
                }}
              />
            </button>
          )
        })}
      </div>
    </PhoneFrame>
  )
}

// 7. Glassmorphic Curved
export const GlassCurvedBar = ({
  className,
  items: itemsProp,
  icons: iconsProp,
  showLabels = false,
  backgroundColor = "rgba(255, 255, 255, 0.1)",
  activeColor = "#000000",
  inactiveColor = "#ffffff",
}: GlassCurvedBarProps) => {
  const defaultItems = ["Lightning", "Search", "Home", "Notifications", "Settings"]
  const defaultIcons = ["Zap", "Search", "Home", "Bell", "Settings"]
  const items = parseItems(itemsProp, defaultItems)
  const iconNames = parseIcons(iconsProp, defaultIcons)
  const [active, setActive] = useState(1)
  const bgRgb = backgroundColor.startsWith("rgba") || backgroundColor.startsWith("rgb") 
    ? backgroundColor 
    : (hexToRgb(backgroundColor) || backgroundColor)
  const activeRgb = processColor(activeColor, "#000000")
  const inactiveRgb = processColor(inactiveColor, "#ffffff")

  return (
    <PhoneFrame className={className}>
      <div className="px-4 pb-4">
        <div 
          className="flex justify-between items-center rounded-2xl backdrop-blur-md border border-white/20 p-2 shadow-xl"
          style={{
            backgroundColor: bgRgb,
          }}
        >
          {items.map((item, i) => {
            const iconName = iconNames[i] || defaultIcons[i] || "Home"
            const Icon = iconMap[iconName] || Home
            return (
              <button 
                key={item} 
                onClick={() => setActive(i)} 
                className={cn(
                  "flex h-10 w-10 items-center justify-center rounded-xl transition-all duration-300 flex-col gap-1", 
                  active === i ? "shadow-lg scale-110" : "hover:bg-white/10"
                )}
                style={{
                  ...(active === i && {
                    backgroundColor: "#ffffff",
                    color: activeRgb,
                  }),
                  ...(active !== i && {
                    color: inactiveRgb,
                  }),
                }}
              >
                <Icon size={20} />
                {showLabels && <span className="text-[8px]">{item}</span>}
              </button>
            )
          })}
        </div>
      </div>
    </PhoneFrame>
  )
}

// 8. Slide Gesture Bar
export const SlideGestureBar = ({
  className,
  backgroundColor = "rgba(0, 0, 0, 0.8)",
  indicatorColor = "#525252",
  textColor = "#737373",
}: SlideGestureBarProps) => {
  const bgRgb = backgroundColor.startsWith("rgba") || backgroundColor.startsWith("rgb") 
    ? backgroundColor 
    : (hexToRgb(backgroundColor) || backgroundColor)
  const indicatorRgb = processColor(indicatorColor, "#525252")
  const textRgb = processColor(textColor, "#737373")

  return (
    <PhoneFrame className={className}>
      <div 
        className="relative h-14 backdrop-blur border-t border-white/10"
        style={{
          backgroundColor: bgRgb,
        }}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <div 
            className="h-1 w-32 rounded-full"
            style={{
              backgroundColor: indicatorRgb,
            }}
          />
        </div>
        <div className="absolute bottom-1 w-full text-center">
          <span 
            className="text-[10px] font-medium"
            style={{
              color: textRgb,
            }}
          >
            Swipe to switch apps
          </span>
        </div>
      </div>
    </PhoneFrame>
  )
}

// 9. Labeled Icons (Detailed)
export const LabeledIconsBar = ({
  className,
  items: itemsProp,
  icons: iconsProp,
  showLabels = true,
  activeColor = "#000000",
  inactiveColor = "#a3a3a3",
  backgroundColor = "#ffffff",
}: LabeledIconsBarProps) => {
  const defaultItems = ["Home", "Network", "Post", "Jobs", "Chat"]
  const defaultIcons = ["Home", "Grid", "Plus", "BriefcaseIcon", "MessageSquare"]
  const items = parseItems(itemsProp, defaultItems)
  const iconNames = parseIcons(iconsProp, defaultIcons)
  const [active, setActive] = useState(items[0] || "Home")
  const activeRgb = processColor(activeColor, "#000000")
  const inactiveRgb = processColor(inactiveColor, "#a3a3a3")
  const bgRgb = processColor(backgroundColor, "#ffffff")

  // Extended icon map for this component
  const extendedIconMap = {
    ...iconMap,
    BriefcaseIcon,
    Network: Grid,
    Post: Plus,
    Jobs: BriefcaseIcon,
  }

  return (
    <PhoneFrame className={className}>
      <div 
        className={cn("grid border-t border-neutral-100 pb-5 pt-2", `grid-cols-${items.length}`)}
        style={{
          backgroundColor: bgRgb,
        }}
      >
        {items.map((item, index) => {
          const iconName = iconNames[index] || defaultIcons[index] || "Home"
          const Icon = extendedIconMap[iconName] || Home
          const isSpecial = item.toLowerCase() === "post" || iconName === "Plus"
          
          return (
            <button key={item} onClick={() => setActive(item)} className="flex flex-col items-center gap-1">
              {isSpecial ? (
                <div className="mb-1 rounded-lg border-2 border-black px-2">
                  <Icon size={20} />
                </div>
              ) : (
                <Icon 
                  size={24} 
                  className={cn("transition-colors", active === item ? "fill-current" : "")}
                  style={{
                    color: active === item ? activeRgb : inactiveRgb,
                  }}
                />
              )}
              {showLabels && (
                <span 
                  className={cn("text-[10px]", active === item ? "font-bold" : "")}
                  style={{
                    color: active === item ? activeRgb : inactiveRgb,
                  }}
                >
                  {item}
                </span>
              )}
            </button>
          )
        })}
      </div>
    </PhoneFrame>
  )
}

// 10. Hamburger Hybrid
export const HamburgerHybridBar = ({
  className,
  items: itemsProp,
  icons: iconsProp,
  showLabels = false,
  activeColor = "#f97316",
  inactiveColor = "#ffffff",
  backgroundColor = "#171717",
  dividerColor = "#262626",
}: HamburgerHybridBarProps) => {
  const defaultItems = ["Home", "Search", "Shop"]
  const defaultIcons = ["Home", "Search", "ShoppingBag"]
  const items = parseItems(itemsProp, defaultItems)
  const iconNames = parseIcons(iconsProp, defaultIcons)
  const [active, setActive] = useState(0)
  const activeRgb = processColor(activeColor, "#f97316")
  const inactiveRgb = processColor(inactiveColor, "#ffffff")
  const bgRgb = processColor(backgroundColor, "#171717")
  const dividerRgb = processColor(dividerColor, "#262626")

  return (
    <PhoneFrame className={className}>
      <div 
        className="flex items-center justify-between px-6 py-4"
        style={{
          backgroundColor: bgRgb,
        }}
      >
        {items.map((item, i) => {
          const iconName = iconNames[i] || defaultIcons[i] || "Home"
          const Icon = iconMap[iconName] || Home
          return (
            <React.Fragment key={item}>
              <button 
                onClick={() => setActive(i)} 
                className="flex flex-col items-center gap-1"
                style={{
                  color: active === i ? activeRgb : inactiveRgb,
                }}
              >
                <Icon size={24} />
                {showLabels && (
                  <div className="flex items-center gap-1">
                    <span className="text-[10px]">{item}</span>
                  </div>
                )}
              </button>
              {i === items.length - 1 && (
                <>
                  <div 
                    className="h-8 w-px"
                    style={{
                      backgroundColor: dividerRgb,
                    }}
                  />
                  <button 
                    className="rounded-full p-2"
                    style={{
                      backgroundColor: dividerRgb,
                      color: inactiveRgb,
                    }}
                  >
                    <Menu size={20} />
                  </button>
                </>
              )}
            </React.Fragment>
          )
        })}
      </div>
    </PhoneFrame>
  )
}

// 11. Social Media Style
export const SocialMediaBar = ({
  className,
  items: itemsProp,
  icons: iconsProp,
  showLabels = false,
  backgroundColor = "#000000",
  iconColor = "#ffffff",
  borderColor = "#ffffff",
}: SocialMediaBarProps) => {
  const defaultItems = ["feed", "explore", "create", "reels", "profile"]
  const defaultIcons = ["Home", "Search", "Plus", "Video", "User"]
  const items = parseItems(itemsProp, defaultItems)
  const iconNames = parseIcons(iconsProp, defaultIcons)
  const [active, setActive] = useState(items[0] || "feed")
  const bgRgb = processColor(backgroundColor, "#000000")
  const iconRgb = processColor(iconColor, "#ffffff")
  const borderRgb = processColor(borderColor, "#ffffff")

  const getIconForItem = (item: string, index: number) => {
    const iconName = iconNames[index] || defaultIcons[index] || "Home"
    return iconMap[iconName] || Home
  }

  return (
    <PhoneFrame className={className}>
      <div 
        className="flex justify-between items-center px-6 pb-6 pt-3"
        style={{
          backgroundColor: bgRgb,
          color: iconRgb,
        }}
      >
        {items.map((item, index) => {
          const Icon = getIconForItem(item, index)
          const isCreate = item.toLowerCase() === "create"
          const isProfile = item.toLowerCase() === "profile"
          
          return (
            <button 
              key={item} 
              onClick={() => setActive(item)}
              className="flex flex-col items-center gap-1"
            >
              {isCreate ? (
                <div 
                  className="rounded-lg border-2 px-1"
                  style={{
                    borderColor: borderRgb,
                  }}
                >
                  <Icon size={16} style={{ color: iconRgb }} />
                </div>
              ) : isProfile ? (
                <div 
                  className={cn("h-7 w-7 rounded-full bg-neutral-700 border-2", active === item ? "" : "border-transparent")}
                  style={{
                    ...(active === item && {
                      borderColor: iconRgb,
                    }),
                  }}
                />
              ) : (
                <Icon 
                  size={26} 
                  className={active === item ? "fill-white" : ""} 
                  strokeWidth={active === item ? 0 : 2}
                  style={{ color: iconRgb }}
                />
              )}
              {showLabels && !isProfile && (
                <span className="text-[10px]">{item}</span>
              )}
            </button>
          )
        })}
      </div>
    </PhoneFrame>
  )
}

// 12. Retro Pixel Bar
export const RetroPixelBar = ({
  className,
  items: itemsProp,
  showLabels = true,
  backgroundColor = "#C3C3C3",
  activeBackgroundColor = "#ffffff",
  borderColor = "#000000",
  textColor = "#000000",
}: RetroPixelBarProps) => {
  const defaultItems = ["START", "ITEMS", "MAP", "SAVE"]
  const items = parseItems(itemsProp, defaultItems)
  const [active, setActive] = useState(0)
  const bgRgb = processColor(backgroundColor, "#C3C3C3")
  const activeBgRgb = processColor(activeBackgroundColor, "#ffffff")
  const borderRgb = processColor(borderColor, "#000000")
  const textRgb = processColor(textColor, "#000000")

  return (
    <PhoneFrame className={className}>
      <div 
        className="flex items-start border-t-4 px-2 py-2 font-mono"
        style={{
          backgroundColor: bgRgb,
          borderTopColor: borderRgb,
        }}
      >
        {items.map((item, i) => (
          <button 
            key={item} 
            onClick={() => setActive(i)}
            className={cn(
              "flex-1 border-2 py-2 text-[10px] font-bold shadow-sm active:translate-y-0.5 active:shadow-none",
              active === i 
                ? "border-t-black border-l-black border-r-white border-b-white translate-y-0.5" 
                : "border-t-white border-l-white border-r-black border-b-black"
            )}
            style={{
              ...(active === i && {
                backgroundColor: activeBgRgb,
                borderTopColor: borderRgb,
                borderLeftColor: borderRgb,
                borderRightColor: "#ffffff",
                borderBottomColor: "#ffffff",
              }),
              ...(active !== i && {
                backgroundColor: bgRgb,
                borderTopColor: "#ffffff",
                borderLeftColor: "#ffffff",
                borderRightColor: borderRgb,
                borderBottomColor: borderRgb,
              }),
              color: textRgb,
            }}
          >
            {showLabels && item}
          </button>
        ))}
      </div>
    </PhoneFrame>
  )
}

// 13. Cyberpunk Bar
export const CyberpunkBar = ({
  className,
  items: itemsProp,
  icons: iconsProp,
  showLabels = false,
  activeColor = "#facc15",
  activeTextColor = "#000000",
  inactiveColor = "#ca8a04",
  backgroundColor = "#050505",
  borderColor = "#eab308",
}: CyberpunkBarProps) => {
  const defaultItems = ["Home", "Map", "Radio", "Profile"]
  const defaultIcons = ["Home", "Map", "Radio", "User"]
  const items = parseItems(itemsProp, defaultItems)
  const iconNames = parseIcons(iconsProp, defaultIcons)
  const [active, setActive] = useState(0)
  const activeRgb = processColor(activeColor, "#facc15")
  const activeTextRgb = processColor(activeTextColor, "#000000")
  const inactiveRgb = processColor(inactiveColor, "#ca8a04")
  const bgRgb = processColor(backgroundColor, "#050505")
  const borderRgb = processColor(borderColor, "#eab308")

  return (
    <PhoneFrame className={className}>
      <div 
        className="px-2 pb-4 pt-2 border-t"
        style={{
          backgroundColor: bgRgb,
          borderTopColor: borderRgb,
        }}
      >
        <div className="flex justify-between items-end gap-1">
          {items.map((item, i) => {
            const iconName = iconNames[i] || defaultIcons[i] || "Home"
            const Icon = iconMap[iconName] || Home
            return (
              <button 
                key={item} 
                onClick={() => setActive(i)}
                className="flex-1 flex flex-col items-center gap-1 py-2"
                style={{ 
                  clipPath: "polygon(20% 0, 100% 0, 80% 100%, 0% 100%)",
                  ...(active === i && {
                    backgroundColor: activeRgb,
                    color: activeTextRgb,
                  }),
                  ...(active !== i && {
                    backgroundColor: "#171717",
                    color: inactiveRgb,
                  }),
                }}
              >
                <Icon size={20} />
                {showLabels && <span className="text-[8px]">{item}</span>}
              </button>
            )
          })}
        </div>
      </div>
    </PhoneFrame>
  )
}

// 14. Neon Glow Bar
export const NeonGlowBar = ({
  className,
  items: itemsProp,
  icons: iconsProp,
  showLabels = false,
  activeColor = "#60a5fa",
  inactiveColor = "#525252",
  backgroundColor = "#0a0a0a",
  glowColor = "#3b82f6",
}: NeonGlowBarProps) => {
  const defaultItems = ["Home", "Music", "Lightning", "Settings"]
  const defaultIcons = ["Home", "Music", "Zap", "Settings"]
  const items = parseItems(itemsProp, defaultItems)
  const iconNames = parseIcons(iconsProp, defaultIcons)
  const [active, setActive] = useState(2)
  const activeRgb = processColor(activeColor, "#60a5fa")
  const inactiveRgb = processColor(inactiveColor, "#525252")
  const bgRgb = processColor(backgroundColor, "#0a0a0a")
  const glowRgb = processColor(glowColor, "#3b82f6")
  const itemWidth = 100 / items.length

  return (
    <PhoneFrame className={className}>
      <div 
        className="flex justify-around items-center pb-6 pt-4 relative overflow-hidden"
        style={{
          backgroundColor: bgRgb,
        }}
      >
        <div 
          className="absolute bottom-0 h-20 w-32 blur-2xl rounded-full pointer-events-none" 
          style={{ 
            left: `calc(${active * itemWidth}% + ${itemWidth / 2}% - 64px)`,
            backgroundColor: glowRgb,
            opacity: 0.2,
          }} 
        />
        {items.map((item, i) => {
          const iconName = iconNames[i] || defaultIcons[i] || "Home"
          const Icon = iconMap[iconName] || Home
          return (
            <button 
              key={`${item}-${i}`}
              onClick={() => setActive(i)}
              className={cn("relative z-10 transition-all duration-300 flex flex-col items-center gap-1", active === i ? "drop-shadow-[0_0_8px_rgba(96,165,250,0.8)]" : "")}
              style={{
                color: active === i ? activeRgb : inactiveRgb,
              }}
            >
              <Icon size={28} />
              {showLabels && <span className="text-[10px]">{item}</span>}
            </button>
          )
        })}
      </div>
    </PhoneFrame>
  )
}

// 15. Minimal Line Bar
export const MinimalLineBar = ({
  className,
  items: itemsProp,
  icons: iconsProp,
  showLabels = false,
  activeColor = "#000000",
  inactiveColor = "#d4d4d4",
  backgroundColor = "#ffffff",
  dotColor = "#000000",
}: MinimalLineBarProps) => {
  const defaultItems = ["Home", "Search", "Favorites", "Profile"]
  const defaultIcons = ["Home", "Search", "Heart", "User"]
  const items = parseItems(itemsProp, defaultItems)
  const iconNames = parseIcons(iconsProp, defaultIcons)
  const [active, setActive] = useState(0)
  const activeRgb = processColor(activeColor, "#000000")
  const inactiveRgb = processColor(inactiveColor, "#d4d4d4")
  const bgRgb = processColor(backgroundColor, "#ffffff")
  const dotRgb = processColor(dotColor, "#000000")

  return (
    <PhoneFrame className={className}>
      <div 
        className="flex items-center justify-around pb-6 pt-4"
        style={{
          backgroundColor: bgRgb,
        }}
      >
        {items.map((item, i) => {
          const iconName = iconNames[i] || defaultIcons[i] || "Home"
          const Icon = iconMap[iconName] || Home
          return (
            <button 
              key={`${item}-${i}`}
              onClick={() => setActive(i)} 
              className="flex flex-col items-center gap-2 w-12"
            >
              <div 
                className="transition-colors duration-300"
                style={{
                  color: active === i ? activeRgb : inactiveRgb,
                }}
              >
                <Icon size={24} />
              </div>
              {showLabels && <span className="text-[10px]">{item}</span>}
              <div 
                className={cn("h-1 w-1 rounded-full transition-all duration-300", active === i ? "opacity-100 scale-100" : "opacity-0 scale-0")}
                style={{
                  backgroundColor: dotRgb,
                }}
              />
            </button>
          )
        })}
      </div>
    </PhoneFrame>
  )
}

// 16. Gradient Mask Bar
export const GradientMaskBar = ({
  className,
  items: itemsProp,
  icons: iconsProp,
  showLabels = false,
  activeColor = "#ffffff",
  inactiveColor = "#737373",
  backgroundColor = "#171717",
  containerBackgroundColor = "#262626",
  gradientFrom = "#a855f7",
  gradientTo = "#f97316",
}: GradientMaskBarProps) => {
  const defaultItems = ["Home", "Trending", "Wallet", "Profile"]
  const defaultIcons = ["Home", "TrendingUp", "WalletIcon", "User"]
  const items = parseItems(itemsProp, defaultItems)
  const iconNames = parseIcons(iconsProp, defaultIcons)
  const [active, setActive] = useState(0)
  const activeRgb = processColor(activeColor, "#ffffff")
  const inactiveRgb = processColor(inactiveColor, "#737373")
  const bgRgb = processColor(backgroundColor, "#171717")
  const containerBgRgb = processColor(containerBackgroundColor, "#262626")
  const gradientFromRgb = processColor(gradientFrom, "#a855f7")
  const gradientToRgb = processColor(gradientTo, "#f97316")

  const extendedIconMap = {
    ...iconMap,
    WalletIcon,
    Trending: TrendingUp,
  }

  return (
    <PhoneFrame className={className}>
      <div 
        className="pb-4 pt-2 px-6"
        style={{
          backgroundColor: bgRgb,
        }}
      >
        <div 
          className="flex justify-between items-center rounded-2xl p-2"
          style={{
            backgroundColor: containerBgRgb,
          }}
        >
          {items.map((item, i) => {
            const iconName = iconNames[i] || defaultIcons[i] || "Home"
            const Icon = extendedIconMap[iconName] || Home
            return (
              <button 
                key={item} 
                onClick={() => setActive(i)}
                className="rounded-xl p-3 transition-all relative overflow-hidden flex flex-col items-center gap-1"
                style={{
                  color: active === i ? activeRgb : inactiveRgb,
                }}
              >
                {active === i && (
                  <div 
                    className="absolute inset-0 opacity-20"
                    style={{
                      background: `linear-gradient(to top right, ${gradientFromRgb}, ${gradientToRgb})`,
                    }}
                  />
                )}
                <Icon size={20} />
                {showLabels && <span className="text-[8px]">{item}</span>}
              </button>
            )
          })}
        </div>
      </div>
    </PhoneFrame>
  )
}

// 17. Pill Indicator Bar
export const PillIndicatorBar = ({
  className,
  items: itemsProp,
  icons: iconsProp,
  showLabels = true,
  activeColor = "#ffffff",
  inactiveColor = "#525252",
  backgroundColor = "#000000",
  pillBackgroundColor = "#ffffff",
  pillTextColor = "#000000",
}: PillIndicatorBarProps) => {
  const defaultItems = ["Home", "Scan", "History"]
  const defaultIcons = ["Home", "Scan", "ClockIcon"]
  const items = parseItems(itemsProp, defaultItems)
  const iconNames = parseIcons(iconsProp, defaultIcons)
  const [active, setActive] = useState(items[1] || "Scan")
  const activeRgb = processColor(activeColor, "#ffffff")
  const inactiveRgb = processColor(inactiveColor, "#525252")
  const bgRgb = processColor(backgroundColor, "#000000")
  const pillBgRgb = processColor(pillBackgroundColor, "#ffffff")
  const pillTextRgb = processColor(pillTextColor, "#000000")
  const centerIndex = Math.floor(items.length / 2)

  const extendedIconMap = {
    ...iconMap,
    ClockIcon,
  }

  return (
    <PhoneFrame className={className}>
      <div 
        className="flex justify-around items-center pb-6 pt-4"
        style={{
          backgroundColor: bgRgb,
          color: activeRgb,
        }}
      >
        {items.map((item, i) => {
          const iconName = iconNames[i] || defaultIcons[i] || "Home"
          const Icon = extendedIconMap[iconName] || Home
          const isCenter = i === centerIndex
          
          if (isCenter && showLabels) {
            return (
              <div key={item} className="relative">
                <button 
                  onClick={() => setActive(item)}
                  className={cn(
                    "flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-bold transition-all",
                    active === item ? "" : ""
                  )}
                  style={{
                    ...(active === item && {
                      backgroundColor: pillBgRgb,
                      color: pillTextRgb,
                    }),
                    ...(active !== item && {
                      backgroundColor: "#262626",
                      color: inactiveRgb,
                    }),
                  }}
                >
                  <Icon size={18} />
                  {showLabels && active === item && <span>{item}</span>}
                </button>
              </div>
            )
          }
          
          return (
            <button 
              key={item}
              onClick={() => setActive(item)} 
              className="flex flex-col items-center gap-1"
              style={{
                color: active === item ? activeRgb : inactiveRgb,
              }}
            >
              <Icon size={24} />
              {showLabels && !isCenter && (
                <span className="text-[10px]">{item}</span>
              )}
            </button>
          )
        })}
      </div>
    </PhoneFrame>
  )
}

// 18. Cupertino Blurred
export const CupertinoBlurredBar = ({
  className,
  items: itemsProp,
  icons: iconsProp,
  showLabels = true,
  activeColor = "#3b82f6",
  inactiveColor = "#a3a3a3",
  backgroundColor = "rgba(255, 255, 255, 0.8)",
  borderColor = "#e5e5e5",
}: CupertinoBlurredBarProps) => {
  const defaultItems = ["Photos", "For You", "Albums", "Search"]
  const defaultIcons = ["ImageIcon", "Heart", "Layers", "Search"]
  const items = parseItems(itemsProp, defaultItems)
  const iconNames = parseIcons(iconsProp, defaultIcons)
  const [active, setActive] = useState(0)
  const activeRgb = processColor(activeColor, "#3b82f6")
  const inactiveRgb = processColor(inactiveColor, "#a3a3a3")
  const bgRgb = backgroundColor.startsWith("rgba") || backgroundColor.startsWith("rgb") 
    ? backgroundColor 
    : (hexToRgb(backgroundColor) || backgroundColor)
  const borderRgb = processColor(borderColor, "#e5e5e5")

  const extendedIconMap = {
    ...iconMap,
    ImageIcon,
  }

  return (
    <PhoneFrame className={className}>
      <div 
        className={cn("grid backdrop-blur-xl border-t pb-6 pt-2", `grid-cols-${items.length}`)}
        style={{
          backgroundColor: bgRgb,
          borderTopColor: borderRgb,
        }}
      >
        {items.map((item, i) => {
          const iconName = iconNames[i] || defaultIcons[i] || "ImageIcon"
          const Icon = extendedIconMap[iconName] || ImageIcon
          return (
            <button 
              key={`${item}-${i}`}
              onClick={() => setActive(i)}
              className={cn("flex flex-col items-center gap-1", active === i ? "" : "")}
              style={{
                color: active === i ? activeRgb : inactiveRgb,
              }}
            >
              <Icon 
                size={24} 
                className={active === i ? "fill-current" : ""}
                style={{
                  color: active === i ? activeRgb : inactiveRgb,
                }}
              />
                {showLabels && <span className="text-[10px] font-medium">{item}</span>}
            </button>
          )
        })}
      </div>
    </PhoneFrame>
  )
}

// 19. Vertical Sidebar (Mobile Landscape)
export const VerticalMobileBar = ({
  className,
  items: itemsProp,
  icons: iconsProp,
  showLabels = false,
  activeColor = "#000000",
  inactiveColor = "#737373",
  backgroundColor = "#171717",
  activeBackgroundColor = "#ffffff",
}: VerticalMobileBarProps) => {
  const defaultItems = ["Home", "Search", "Mail", "Profile"]
  const defaultIcons = ["Home", "Search", "Mail", "User"]
  const items = parseItems(itemsProp, defaultItems)
  const iconNames = parseIcons(iconsProp, defaultIcons)
  const [active, setActive] = useState(0)
  const activeRgb = processColor(activeColor, "#000000")
  const inactiveRgb = processColor(inactiveColor, "#737373")
  const bgRgb = processColor(backgroundColor, "#171717")
  const activeBgRgb = processColor(activeBackgroundColor, "#ffffff")

  return (
    <div 
      className={cn("relative mx-auto h-[200px] w-full max-w-[320px] overflow-hidden rounded-3xl border-8 border-neutral-900 bg-neutral-950 shadow-xl flex flex-row", className)}
    >
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-4 h-24 rounded-r-xl bg-neutral-900 z-20" />
      <div 
        className="h-full w-16 flex flex-col items-center justify-center gap-6 py-4"
        style={{
          backgroundColor: bgRgb,
        }}
      >
        {items.map((item, i) => {
          const iconName = iconNames[i] || defaultIcons[i] || "Home"
          const Icon = iconMap[iconName] || Home
          return (
            <button 
              key={`${item}-${i}`}
              onClick={() => setActive(i)} 
              className="p-2 rounded-xl transition-all flex flex-col items-center gap-1"
              style={{
                ...(active === i && {
                  backgroundColor: activeBgRgb,
                  color: activeRgb,
                }),
                ...(active !== i && {
                  color: inactiveRgb,
                }),
              }}
            >
              <Icon size={20} />
              {showLabels && <span className="text-[8px]">{item}</span>}
            </button>
          )
        })}
      </div>
      <div className="flex-1 bg-neutral-950/50" />
    </div>
  )
}

// 20. Floating Action Button Center
export const FabCenterBar = ({
  className,
  items: itemsProp,
  icons: iconsProp,
  showLabels = true,
  activeColor = "#ec4899",
  inactiveColor = "#a3a3a3",
  backgroundColor = "#ffffff",
  fabColor = "#ec4899",
  fabShadowColor = "#ec4899",
}: FabCenterBarProps) => {
  const defaultItems = ["Home", "Search", "Favorites", "Profile"]
  const defaultIcons = ["Home", "Search", "Heart", "User"]
  const items = parseItems(itemsProp, defaultItems)
  const iconNames = parseIcons(iconsProp, defaultIcons)
  const [active, setActive] = useState(0)
  const activeRgb = processColor(activeColor, "#ec4899")
  const inactiveRgb = processColor(inactiveColor, "#a3a3a3")
  const bgRgb = processColor(backgroundColor, "#ffffff")
  const fabRgb = processColor(fabColor, "#ec4899")
  const fabShadowRgb = processColor(fabShadowColor, "#ec4899")
  const centerIndex = Math.floor(items.length / 2)

  // Split items into left and right (FAB is in the center)
  const leftItems = items.slice(0, centerIndex)
  const rightItems = items.slice(centerIndex)
  const leftIcons = iconNames.slice(0, centerIndex)
  const rightIcons = iconNames.slice(centerIndex)

  return (
    <PhoneFrame className={className}>
      <div 
        className="relative pb-4 pt-2 px-6 shadow-[0_-5px_20px_rgba(0,0,0,0.05)]"
        style={{
          backgroundColor: bgRgb,
        }}
      >
        <div className="flex justify-between items-center">
          {leftItems.map((item, i) => {
            const iconName = leftIcons[i] || defaultIcons[i] || "Home"
            const Icon = iconMap[iconName] || Home
            return (
              <button 
                key={item}
                onClick={() => setActive(i)} 
                className="flex flex-col items-center gap-1"
                style={{
                  color: active === i ? activeRgb : inactiveRgb,
                }}
              >
                <Icon size={24} />
                {showLabels && (
                  <div className="flex items-center gap-1">
                    <span className="text-[10px]">{item}</span>
                  </div>
                )}
              </button>
            )
          })}
          <div className="w-12" />
          {rightItems.map((item, i) => {
            const iconName = rightIcons[i] || defaultIcons[centerIndex + i] || "Heart"
            const Icon = iconMap[iconName] || Heart
            const index = centerIndex + i
            return (
              <button 
                key={item}
                onClick={() => setActive(index)} 
                className="flex flex-col items-center gap-1"
                style={{
                  color: active === index ? activeRgb : inactiveRgb,
                }}
              >
                <Icon size={24} />
                {showLabels && (
                  <div className="flex items-center gap-1">
                    <span className="text-[10px]">{item}</span>
                  </div>
                )}
              </button>
            )
          })}
        </div>
        <button 
          className="absolute -top-6 left-1/2 -translate-x-1/2 h-14 w-14 rounded-full text-white shadow-lg flex items-center justify-center hover:scale-105 transition-transform"
          style={{
            backgroundColor: fabRgb,
            boxShadow: `0 10px 25px ${fabShadowRgb}40`,
          }}
        >
          <Send size={24} className="ml-1 mt-1" />
        </button>
      </div>
    </PhoneFrame>
  )
}

// Export all components by name for easy lookup
export const tabbarComponentsByName: Record<string, React.ComponentType<any>> = {
  IosTabBar,
  MaterialTabBar,
  IslandTabBar,
  NotchedFabBar,
  AnimatedIndicatorBar,
  TextOnlyBar,
  GlassCurvedBar,
  SlideGestureBar,
  LabeledIconsBar,
  HamburgerHybridBar,
  SocialMediaBar,
  RetroPixelBar,
  CyberpunkBar,
  NeonGlowBar,
  MinimalLineBar,
  GradientMaskBar,
  PillIndicatorBar,
  CupertinoBlurredBar,
  VerticalMobileBar,
  FabCenterBar,
}

