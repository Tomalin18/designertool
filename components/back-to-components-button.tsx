"use client"

import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

interface BackToComponentsButtonProps {
  href: string
  isSection?: boolean
}

export function BackToComponentsButton({ href, isSection = false }: BackToComponentsButtonProps) {
  return (
    <Link 
      href={href}
      scroll={true}
      onClick={() => {
        window.scrollTo({ top: 0, behavior: 'instant' })
      }}
    >
      <Button variant="ghost" size="sm" className="mb-4 -ml-2">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Components
      </Button>
    </Link>
  )
}

