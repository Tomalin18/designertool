"use client"

import * as React from "react"
import { ChevronUp } from "lucide-react"
import { cn } from "@/lib/utils"

interface ScrollToTopProps {
  /** 捲到多高（px）才顯示按鈕，預設 300 */
  threshold?: number
}

export function ScrollToTop({ threshold = 300 }: ScrollToTopProps) {
  const [visible, setVisible] = React.useState(false)

  React.useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > threshold) {
        setVisible(true)
      } else {
        setVisible(false)
      }
    }

    // 初次掛載時先算一次
    handleScroll()
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [threshold])

  const handleClick = () => {
    // 平滑捲動回頂部
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label="Scroll to top"
      className={cn(
        "fixed z-40 right-4 bottom-20 md:right-6 md:bottom-6 inline-flex h-10 w-10 items-center justify-center rounded-full border border-neutral-800 bg-neutral-900/80 text-neutral-200 shadow-lg backdrop-blur-sm transition-all",
        "hover:bg-neutral-800 hover:text-white hover:border-neutral-700",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-neutral-500",
        visible
          ? "opacity-100 translate-y-0 pointer-events-auto"
          : "opacity-0 translate-y-4 pointer-events-none"
      )}
    >
      <ChevronUp className="h-4 w-4" />
    </button>
  )
}


