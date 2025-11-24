"use client"

import { useState, useEffect } from "react"
import { GripVertical } from "lucide-react"
import type { CanvasElement } from "@/lib/playground/types"
import { usePlayground } from "@/lib/playground/store"

interface TransformHandleProps {
  element: CanvasElement
  onResize: (width: number, height: number) => void
}

export function TransformHandle({ element, onResize }: TransformHandleProps) {
  const { getSelectedFrame } = usePlayground()
  const [isResizing, setIsResizing] = useState(false)
  const [startPos, setStartPos] = useState({ x: 0, y: 0 })
  const [startSize, setStartSize] = useState({ width: 0, height: 0 })

  const handleMouseDown = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsResizing(true)
    setStartPos({ x: e.clientX, y: e.clientY })
    setStartSize({ width: element.size.width, height: element.size.height })
  }

  useEffect(() => {
    if (!isResizing) return

    const handleMouseMove = (e: MouseEvent) => {
      const frame = getSelectedFrame()
      if (!frame) return

      // Get frame scale from DOM
      const frameElement = document.querySelector(`[data-frame-id="${frame.id}"]`) as HTMLElement
      const frameScale = frameElement ? parseFloat(frameElement.getAttribute('data-frame-scale') || '1') : 1

      const deltaX = (e.clientX - startPos.x) / frameScale
      const deltaY = (e.clientY - startPos.y) / frameScale

      // Calculate new size
      let newWidth = Math.max(50, startSize.width + deltaX)
      let newHeight = Math.max(50, startSize.height + deltaY)

      // Constrain within frame boundaries
      const maxWidth = frame.width - element.position.x
      const maxHeight = frame.height - element.position.y
      
      newWidth = Math.min(newWidth, maxWidth)
      newHeight = Math.min(newHeight, maxHeight)

      onResize(newWidth, newHeight)
    }

    const handleMouseUp = () => {
      setIsResizing(false)
    }

    document.addEventListener("mousemove", handleMouseMove)
    document.addEventListener("mouseup", handleMouseUp)

    return () => {
      document.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseup", handleMouseUp)
    }
  }, [isResizing, startPos, startSize, onResize, element.position, getSelectedFrame])

  return (
    <div
      className="absolute -bottom-1 -right-1 w-4 h-4 bg-primary border-2 border-background rounded cursor-se-resize flex items-center justify-center pointer-events-auto"
      onMouseDown={handleMouseDown}
    >
      <GripVertical className="h-3 w-3 text-primary-foreground" />
    </div>
  )
}

