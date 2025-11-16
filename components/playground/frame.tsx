"use client"

import { usePlayground } from "@/lib/playground/store"
import type { Frame as FrameType } from "@/lib/playground/types"
import { ComponentRenderer } from "./component-renderer"
import { SelectionBox } from "./selection-box"
import { cn } from "@/lib/utils"
import { useDroppable } from "@dnd-kit/core"
import { useState, useEffect, useRef, useCallback } from "react"

interface FrameProps {
  frame: FrameType
  scale?: number
}

export function Frame({ frame, scale = 1 }: FrameProps) {
  const {
    state,
    selectedElementId,
    selectedElementIds,
    selectElement,
    selectElements,
    clearSelection,
    setSelectionBox,
    deleteElements,
    moveElements,
  } = usePlayground()
  const { setNodeRef, isOver } = useDroppable({
    id: `frame-${frame.id}`,
  })
  const [isSelecting, setIsSelecting] = useState(false)
  const [selectionStart, setSelectionStart] = useState<{ x: number; y: number } | null>(null)
  const frameRef = useRef<HTMLDivElement>(null)

  const frameStyles = {
    width: frame.width,
    minHeight: frame.height,
    maxHeight: 'calc(100vh - 4rem)',
    overflow: 'auto',
  } as React.CSSProperties

  const layoutClasses = {
    block: "",
    flex: "flex flex-col",
    grid: "grid",
  }

  // Handle selection box
  const handleMouseDown = (e: React.MouseEvent) => {
    // Only start selection on frame background, not on elements
    const target = e.target as HTMLElement
    if (target !== e.currentTarget) {
      // Check if clicking on an element or its children
      const elementContainer = target.closest('[data-element-container]')
      if (elementContainer) {
        // Clicking on an element, don't start selection
        return
      }
    }
    
    // Don't start selection if clicking on a draggable element
    if (target.closest('[data-element-id]')) return

    const rect = frameRef.current?.getBoundingClientRect()
    if (!rect) return

    // Account for scale when calculating coordinates
    const x = (e.clientX - rect.left) / scale
    const y = (e.clientY - rect.top) / scale

    setIsSelecting(true)
    setSelectionStart({ x, y })
    setSelectionBox({ startX: x, startY: y, endX: x, endY: y })
    clearSelection()
  }

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isSelecting || !selectionStart || !frameRef.current) return

    const rect = frameRef.current.getBoundingClientRect()
    // Account for scale when calculating coordinates
    const x = (e.clientX - rect.left) / scale
    const y = (e.clientY - rect.top) / scale

    setSelectionBox({
      startX: selectionStart.x,
      startY: selectionStart.y,
      endX: x,
      endY: y,
    })
  }, [isSelecting, selectionStart, setSelectionBox])

  const handleMouseUp = useCallback(() => {
    if (!isSelecting || !selectionStart) {
      setIsSelecting(false)
      setSelectionStart(null)
      return
    }

    setIsSelecting(false)

    // Get current selection box from state - use the latest state
    const currentSelectionBox = state.selectionBox
    if (!currentSelectionBox) {
      setSelectionStart(null)
      setSelectionBox(null)
      return
    }

    const minX = Math.min(currentSelectionBox.startX, currentSelectionBox.endX)
    const maxX = Math.max(currentSelectionBox.startX, currentSelectionBox.endX)
    const minY = Math.min(currentSelectionBox.startY, currentSelectionBox.endY)
    const maxY = Math.max(currentSelectionBox.startY, currentSelectionBox.endY)

    // Find elements within selection box (Figma-style: any overlap selects the element)
    const selectedIds = frame.elements
      .filter((element) => {
        const elLeft = element.position.x
        const elRight = element.position.x + element.size.width
        const elTop = element.position.y
        const elBottom = element.position.y + element.size.height

        // Figma-style selection: element is selected if it overlaps with selection box
        // This means any part of the element is within the selection box
        const overlaps = (
          elLeft < maxX && 
          elRight > minX && 
          elTop < maxY && 
          elBottom > minY
        )
        
        return overlaps
      })
      .map((el) => el.id)

    // Always update selection, even if empty (to clear previous selection)
    if (selectedIds.length > 0) {
      selectElements(selectedIds)
    } else {
      // If no elements selected, clear selection
      clearSelection()
    }

    setSelectionStart(null)
    setSelectionBox(null)
  }, [isSelecting, selectionStart, state.selectionBox, frame.elements, selectElements, clearSelection, setSelectionStart, setSelectionBox])

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Delete key to delete selected elements
      const currentSelectedIds = selectedElementIds || []
      if ((e.key === "Delete" || e.key === "Backspace") && currentSelectedIds.length > 0) {
        e.preventDefault()
        deleteElements(frame.id, currentSelectedIds)
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [selectedElementIds, frame.id, deleteElements])

  // Handle mouse events for selection
  useEffect(() => {
    if (isSelecting) {
      document.addEventListener("mousemove", handleMouseMove)
      document.addEventListener("mouseup", handleMouseUp)
      return () => {
        document.removeEventListener("mousemove", handleMouseMove)
        document.removeEventListener("mouseup", handleMouseUp)
      }
    }
  }, [isSelecting, handleMouseMove, handleMouseUp])

  // Handle dragging multiple selected elements
  const handleSelectedElementsDrag = (deltaX: number, deltaY: number) => {
    if (selectedElementIds.length > 0) {
      moveElements(frame.id, selectedElementIds, deltaX, deltaY)
    }
  }

  return (
    <div
      ref={(node) => {
        setNodeRef(node)
        ;(frameRef as any).current = node
      }}
      data-frame-id={frame.id}
      data-frame-scale={scale}
      className={cn(
        "bg-white rounded-lg shadow-2xl border-2 border-border relative",
        layoutClasses[frame.layout],
        isOver && "border-primary ring-2 ring-primary/20"
      )}
      style={frameStyles}
      onMouseDown={handleMouseDown}
      onClick={(e) => {
        // Click on frame background clears selection
        if (e.target === e.currentTarget && !isSelecting) {
          clearSelection()
        }
      }}
    >
        {/* Frame label */}
        <div className="absolute -top-8 left-0 text-sm font-medium text-muted-foreground">
          {frame.name} ({frame.type} • {frame.layout})
        </div>

        {/* Selection box */}
        <SelectionBox />

        {/* Render elements - only render root elements (no parentId) */}
        {frame.elements
          .filter((el) => !el.parentId)
          .map((element) => {
            const isElementSelected = selectedElementId === element.id || (selectedElementIds && selectedElementIds.includes(element.id))
            return (
              <ComponentRenderer
                key={element.id}
                element={element}
                isSelected={isElementSelected}
                allElements={frame.elements}
                onSelect={(e?: React.MouseEvent) => {
                  if (e && (e.shiftKey || e.metaKey || e.ctrlKey)) {
                    // Multi-select with Shift/Cmd/Ctrl
                    const currentIds = selectedElementIds || []
                    if (currentIds.includes(element.id)) {
                      selectElements(currentIds.filter((id) => id !== element.id))
                    } else {
                      selectElements([...currentIds, element.id])
                    }
                  } else {
                    selectElement(element.id)
                  }
                }}
              />
            )
          })}

        {frame.elements.length === 0 && (
          <div className="flex items-center justify-center h-full text-muted-foreground">
            <div className="text-center space-y-2">
              <p className="text-sm">Empty frame</p>
              <p className="text-xs">Drag components here to get started</p>
            </div>
          </div>
        )}
      </div>
  )
}

