"use client"

import { useEffect, useRef, useState } from "react"
import { useTheme } from "./theme-provider"

interface Firefly {
  id: number
  x: number
  y: number
  size: number
  speedX: number
  speedY: number
  opacity: number
  color: string
  targetX: number
  targetY: number
}

export function FireflyBackground() {
  const { colorPalette, theme } = useTheme()
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationFrameRef = useRef<number | undefined>(undefined)
  const firefliesRef = useRef<Firefly[]>([])
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted || !colorPalette || !canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    // Get current theme mode
    const getCurrentThemeMode = () => {
      if (theme === "system") {
        return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
      }
      return theme
    }

    const currentMode = getCurrentThemeMode()
    const colors = currentMode === "dark" ? colorPalette.dark : colorPalette.light

    // Convert hex to rgba helper
    const hexToRgba = (hex: string, alpha: number) => {
      const r = parseInt(hex.slice(1, 3), 16)
      const g = parseInt(hex.slice(3, 5), 16)
      const b = parseInt(hex.slice(5, 7), 16)
      return `rgba(${r}, ${g}, ${b}, ${alpha})`
    }

    // Create fireflies
    const createFireflies = (count: number = 30) => {
      const fireflies: Firefly[] = []
      for (let i = 0; i < count; i++) {
        const randomColor = colors[Math.floor(Math.random() * colors.length)]
        fireflies.push({
          id: i,
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 4 + 2, // 2-6px
          speedX: (Math.random() - 0.5) * 0.5, // -0.25 to 0.25
          speedY: (Math.random() - 0.5) * 0.5,
          opacity: Math.random() * 0.5 + 0.3, // 0.3 to 0.8
          color: randomColor,
          targetX: Math.random() * canvas.width,
          targetY: Math.random() * canvas.height,
        })
      }
      return fireflies
    }

    firefliesRef.current = createFireflies(30)

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      firefliesRef.current.forEach((firefly) => {
        // Move towards target with some randomness
        const dx = firefly.targetX - firefly.x
        const dy = firefly.targetY - firefly.y
        const distance = Math.sqrt(dx * dx + dy * dy)

        if (distance < 5) {
          // Set new target
          firefly.targetX = Math.random() * canvas.width
          firefly.targetY = Math.random() * canvas.height
        } else {
          // Move towards target
          const speed = firefly.size * 0.02 // Larger fireflies move faster
          firefly.x += (dx / distance) * speed + firefly.speedX
          firefly.y += (dy / distance) * speed + firefly.speedY
        }

        // Wrap around edges
        if (firefly.x < 0) firefly.x = canvas.width
        if (firefly.x > canvas.width) firefly.x = 0
        if (firefly.y < 0) firefly.y = canvas.height
        if (firefly.y > canvas.height) firefly.y = 0

        // Flickering opacity (subtle)
        firefly.opacity += (Math.random() - 0.5) * 0.05
        firefly.opacity = Math.max(0.2, Math.min(0.9, firefly.opacity))

        // Draw firefly with glow effect
        const gradient = ctx.createRadialGradient(
          firefly.x,
          firefly.y,
          0,
          firefly.x,
          firefly.y,
          firefly.size * 3
        )
        gradient.addColorStop(0, hexToRgba(firefly.color, firefly.opacity))
        gradient.addColorStop(0.5, hexToRgba(firefly.color, firefly.opacity * 0.5))
        gradient.addColorStop(1, hexToRgba(firefly.color, 0))

        ctx.fillStyle = gradient
        ctx.beginPath()
        ctx.arc(firefly.x, firefly.y, firefly.size * 3, 0, Math.PI * 2)
        ctx.fill()

        // Draw bright center
        ctx.fillStyle = hexToRgba(firefly.color, firefly.opacity)
        ctx.beginPath()
        ctx.arc(firefly.x, firefly.y, firefly.size, 0, Math.PI * 2)
        ctx.fill()
      })

      animationFrameRef.current = requestAnimationFrame(animate)
    }

    animate()

    // Listen for theme changes
    let mediaQuery: MediaQueryList | null = null
    let mediaQueryHandler: ((e: MediaQueryListEvent) => void) | null = null

    if (theme === "system") {
      mediaQuery = window.matchMedia("(prefers-color-scheme: dark)")
      mediaQueryHandler = () => {
        const mode = mediaQuery!.matches ? "dark" : "light"
        const updatedColors = mode === "dark" ? colorPalette.dark : colorPalette.light
        firefliesRef.current.forEach((firefly) => {
          firefly.color = updatedColors[Math.floor(Math.random() * updatedColors.length)]
        })
      }
      mediaQuery.addEventListener("change", mediaQueryHandler)
    }

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
      window.removeEventListener("resize", resizeCanvas)
      if (mediaQuery && mediaQueryHandler) {
        mediaQuery.removeEventListener("change", mediaQueryHandler)
      }
    }
  }, [mounted, colorPalette, theme])

  if (!mounted || !colorPalette) return null

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ background: "transparent" }}
    />
  )
}

