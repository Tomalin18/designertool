import type React from "react"
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from "@vercel/analytics/next"
import { ThemeProvider } from "@/components/theme-provider"
import { SiteHeader } from "@/components/site-header"
import { componentsData } from "@/lib/components-data"
import "./globals.css"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

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
        href: `/components/${component.slug || component.href.replace("/components/", "")}`,
      })),
    },
  ]

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <title>ComponentUI - Beautiful React Components</title>
        <meta
          name="description"
          content="A collection of beautifully designed components for your React applications"
        />
        <meta name="generator" content="v0.app" />
        <link rel="icon" href="/icon-light-32x32.png" media="(prefers-color-scheme: light)" />
        <link rel="icon" href="/icon-dark-32x32.png" media="(prefers-color-scheme: dark)" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-icon.png" />
      </head>
      <body className={`font-sans antialiased`}>
        <ThemeProvider defaultTheme="system" storageKey="componentui-theme">
          <div className="relative min-h-screen flex flex-col">
            <SiteHeader />
            <main className="flex-1">{children}</main>
            <footer className="border-t py-6 md:py-0">
              
            </footer>
          </div>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}

export const metadata = {
      generator: 'v0.app'
    };
