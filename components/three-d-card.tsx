"use client"

import React, { useRef, useState } from "react"

import { cn } from "@/lib/utils"

interface ThreeDCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  intensity?: number
  disabled?: boolean
}

export const ThreeDCard: React.FC<ThreeDCardProps> = ({
  children,
  className,
  intensity = 20,
  disabled = false,
  ...props
}) => {
  const ref = useRef<HTMLDivElement>(null)
  const [rotation, setRotation] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current || disabled) return
    const rect = ref.current.getBoundingClientRect()
    const width = rect.width
    const height = rect.height

    const mouseX = e.clientX - rect.left - width / 2
    const mouseY = e.clientY - rect.top - height / 2

    const yRotation = (mouseX / width) * intensity
    const xRotation = (mouseY / height) * -intensity

    setRotation({ x: xRotation, y: yRotation })
  }

  const handleMouseEnter = () => {
    if (disabled) return
    setIsHovering(true)
  }

  const handleMouseLeave = () => {
    if (disabled) return
    setIsHovering(false)
    setRotation({ x: 0, y: 0 })
  }

  return (
    <div
      className={cn("flex h-full w-full items-center justify-center bg-transparent", className)}
      style={{ perspective: disabled ? undefined : "1000px" }}
      onMouseMove={disabled ? undefined : handleMouseMove}
      onMouseEnter={disabled ? undefined : handleMouseEnter}
      onMouseLeave={disabled ? undefined : handleMouseLeave}
      {...props}
    >
      <div
        ref={ref}
        className="relative h-full w-full transition-transform duration-200 ease-out"
        style={{
          transform: disabled ? undefined : `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) scale3d(1, 1, 1)`,
          transformStyle: disabled ? undefined : "preserve-3d",
          transition: disabled
            ? undefined
            : isHovering
              ? "transform 0.1s ease-out"
              : "transform 0.5s ease-out",
        }}
      >
        {children}
      </div>
    </div>
  )
}


