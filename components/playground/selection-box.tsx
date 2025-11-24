"use client"

import { usePlayground } from "@/lib/playground/store"
import { cn } from "@/lib/utils"

export function SelectionBox() {
  const { state } = usePlayground()
  const { selectionBox } = state

  if (!selectionBox) return null

  const left = Math.min(selectionBox.startX, selectionBox.endX)
  const top = Math.min(selectionBox.startY, selectionBox.endY)
  const width = Math.abs(selectionBox.endX - selectionBox.startX)
  const height = Math.abs(selectionBox.endY - selectionBox.startY)

  return (
    <div
      className="absolute border-2 border-primary bg-primary/10 pointer-events-none z-50"
      style={{
        left: `${left}px`,
        top: `${top}px`,
        width: `${width}px`,
        height: `${height}px`,
      }}
    />
  )
}

