import type React from "react"
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from "@vercel/analytics/next"
import { ThemeProvider } from "@/components/theme-provider"
import { ScrollToTop } from "@/components/scroll-to-top"
import { AuthProvider } from "@/contexts/auth-context"
import { SiteHeader } from "@/components/site-header"
import { MobileNav } from "@/components/mobile-nav"
import { SiteFooter } from "@/components/site-footer"
import { Toaster } from "@/components/ui/sonner"
import { componentsData } from "@/lib/components-data"
import Script from "next/script"
import "./globals.css"

const _geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
})
const _geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const sidebarItems = [
    {
      title: "Components",
      href: "/",
      items: componentsData.map((component) => ({
        title: component.name,
        href: component.href,
      })),
    },
  ]

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <title>DesignerTool - Beautiful React Components</title>
        <meta
          name="description"
          content="A collection of beautifully designed components for your React applications"
        />
        <meta name="generator" content="v0.app" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5, user-scalable=yes, viewport-fit=cover" />
        <meta name="theme-color" content="#000000" media="(prefers-color-scheme: dark)" />
        <meta name="theme-color" content="#ffffff" media="(prefers-color-scheme: light)" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="DesignerTool" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" href="/icon-maskable-192x192.png" />
        <link rel="apple-touch-icon" href="/icon-maskable-192x192.png" />
      </head>
      <body className={`${_geist.variable} ${_geistMono.variable} font-sans antialiased`}>
        {process.env.NODE_ENV === "development" && (
          <Script
            src="//unpkg.com/react-grab/dist/index.global.js"
            crossOrigin="anonymous"
            strategy="afterInteractive"
            data-enabled="true"
          />
        )}
        <ThemeProvider defaultTheme="system" storageKey="componentui-theme">
          <AuthProvider>
            <div className="relative min-h-screen flex flex-col">
              <SiteHeader />
              <main className="flex-1 pb-16 md:pb-0">
                {children}
              </main>
              {/* 全站共用的 Scroll to Top 按鈕：在向下捲動一段距離後顯示，點擊平滑捲回頁面頂部 */}
              <ScrollToTop />
              <MobileNav />
              <SiteFooter />
            </div>
          </AuthProvider>
        </ThemeProvider>
        <Toaster />
        <Analytics />
      </body>
    </html>
  )
}

export const metadata = {
  generator: 'v0.app'
};
