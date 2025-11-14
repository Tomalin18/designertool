"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
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

  return (
    <nav className="grid gap-2">
      {items.map((section) => (
        <div key={section.title}>
          <h4 className="mb-1 rounded-md px-2 py-1 font-semibold text-2xl bg-slate-300">{section.title}</h4>
          {section.items && (
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
