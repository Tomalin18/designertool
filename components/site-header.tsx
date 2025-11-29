"use client"

import Link from "next/link"
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useState } from "react"
import { ThemeToggle } from "./theme-toggle"
import { useTheme } from "./theme-provider"
import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog"
import { LoginForm } from "@/components/auth/login-form"
import { SignupForm } from "@/components/auth/signup-form"
import { cn } from "@/lib/utils"
import { User, LogOut } from "lucide-react"
import { SubscribeButton } from "@/components/customize/buttons"

const navigation = [
  { name: "Home", href: "/" },
  { name: "Components", href: "/components" },
  { name: "Colors", href: "/colors" },
  { name: "Fonts", href: "/fonts" },
  { name: "Icons", href: "/icons" },
  // { name: "Playground", href: "/playground" },
]

export function SiteHeader() {
  const pathname = usePathname()
  const router = useRouter()
  const { colorPalette, theme } = useTheme()
  const { user, loading, signOut } = useAuth()
  const [mounted, setMounted] = useState(false)
  const [authOpen, setAuthOpen] = useState(false)
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login')

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
    <>
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex h-14 w-full items-center px-8 text-2xl">
          <div className="mr-4 flex">
            <Link href="/" className={cn("mr-6 flex items-center gap-2", shouldAnimate && "header-nav-animated")}>
              <span className="font-bold">DesignerTool</span>
            </Link>
          </div>

          <nav className="hidden md:flex items-center gap-6 text-2xl">
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
            {!loading && (
              <>
                {/* Member Button */}
                {user ? (
                  (() => {
                    const isPaidUser =
                      (user.user_metadata as any)?.is_paid === true ||
                      (user.user_metadata as any)?.isPaid === true ||
                      (user.user_metadata as any)?.is_pro === true ||
                      (user.user_metadata as any)?.plan === "pro" ||
                      (user.user_metadata as any)?.plan === "paid" ||
                      (user.user_metadata as any)?.tier === "pro" ||
                      (user.user_metadata as any)?.tier === "paid"
                    
                    return (
                      <SubscribeButton
                        className="!px-4 !py-2 text-sm"
                        style={{ fontSize: '0.875rem' }}
                        onClick={() => {
                          window.scrollTo({ top: 0, behavior: 'instant' })
                          router.push('/subscribe')
                        }}
                      >
                        {isPaidUser ? 'Member' : 'Upgrade'}
                      </SubscribeButton>
                    )
                  })()
                ) : (
                  <SubscribeButton
                    className="!px-4 !py-2 text-sm"
                    style={{ fontSize: '0.875rem' }}
                    onClick={() => {
                      setAuthMode('signup')
                      setAuthOpen(true)
                    }}
                  >
                    Sign up
                  </SubscribeButton>
                )}
                
                {user && (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={user.user_metadata?.avatar_url} alt={user.email || ''} />
                          <AvatarFallback>
                            {user.email?.charAt(0).toUpperCase() || 'U'}
                          </AvatarFallback>
                        </Avatar>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56" align="end" forceMount>
                      <DropdownMenuLabel className="font-normal">
                        <div className="flex flex-col space-y-1">
                          <p className="text-sm font-medium leading-none">
                            {user.user_metadata?.full_name || 'Not set'}
                          </p>
                          <p className="text-xs leading-none text-muted-foreground">
                            {user.email}
                          </p>
                        </div>
                      </DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem asChild>
                        <Link href="/profile" className="cursor-pointer">
                          <User className="mr-2 h-4 w-4" />
                          <span>Profile</span>
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        className="cursor-pointer"
                        onClick={async () => {
                          await signOut()
                          router.push('/')
                          router.refresh()
                        }}
                      >
                        <LogOut className="mr-2 h-4 w-4" />
                        <span>Sign out</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                )}
                {!user && (
                  <Button
                    variant="ghost"
                    onClick={() => {
                      setAuthMode('login')
                      setAuthOpen(true)
                    }}
                  >
                    Sign in
                  </Button>
                )}
              </>
            )}
          </div>
        </div>
      </header>

      <Dialog
        open={authOpen}
        onOpenChange={(open) => {
          setAuthOpen(open)
          if (!open) {
            setAuthMode('login')
          }
        }}
      >
        <DialogContent className="max-w-md">
          <DialogTitle className="sr-only">
            {authMode === 'login' && 'Sign in'}
            {authMode === 'signup' && 'Sign up'}
          </DialogTitle>
          {authMode === 'login' && (
            <LoginForm
              onSwitchToSignup={() => setAuthMode('signup')}
              onSuccess={() => {
                // 登入成功：關閉 Dialog，並重設為 login 模式
                setAuthOpen(false)
                setAuthMode('login')
              }}
            />
          )}
          {authMode === 'signup' && (
            <SignupForm
              onSwitchToLogin={() => setAuthMode('login')}
              onSuccess={() => {
                // 註冊成功：關閉 Dialog，並將模式重設為 login 方便之後再開啟
                setAuthOpen(false)
                setAuthMode('login')
              }}
            />
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}
