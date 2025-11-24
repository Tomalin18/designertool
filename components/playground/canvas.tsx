"use client"

import { usePlayground } from "@/lib/playground/store"
import { Frame } from "./frame"
import { DndContext, DragOverlay, closestCenter, PointerSensor, useSensor, useSensors, DragEndEvent, DragStartEvent } from "@dnd-kit/core"
import { useState, useEffect } from "react"

export function Canvas() {
  const { state, getSelectedFrame, addElement, updateElement, selectedElementIds, moveElements } = usePlayground()
  const [activeId, setActiveId] = useState<string | null>(null)
  const [activeData, setActiveData] = useState<any>(null)
  const [mounted, setMounted] = useState(false)
  const [viewportSize, setViewportSize] = useState({ width: 0, height: 0 })
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  )

  useEffect(() => {
    setMounted(true)
    
    const updateViewport = () => {
      setViewportSize({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }
    
    updateViewport()
    window.addEventListener("resize", updateViewport)
    return () => window.removeEventListener("resize", updateViewport)
  }, [])

  const selectedFrame = getSelectedFrame()
  
  // Calculate responsive scale for frame
  // Account for sidebar (64px) + properties panel (320px) + padding (64px) = ~448px
  const availableWidth = viewportSize.width > 0 ? Math.max(320, viewportSize.width - 448) : selectedFrame?.width || 1440
  const scale = selectedFrame && viewportSize.width > 0 
    ? Math.min(1, availableWidth / selectedFrame.width)
    : 1

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string)
    setActiveData(event.active.data.current)
  }

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event
    setActiveId(null)
    setActiveData(null)

    if (!over || !selectedFrame) return

    const overId = over.id as string
    const activeData = active.data.current

    // Handle dropping new components/sections from sidebar
    if (overId === `frame-${selectedFrame.id}` && (activeData?.type === "component" || activeData?.type === "section")) {
      const componentId = activeData.componentId || activeData.sectionId
      
      // Get mouse position relative to frame
      const frameElement = document.querySelector(`[data-frame-id="${selectedFrame.id}"]`) as HTMLElement
      if (!frameElement) return
      
      // Calculate drop position based on mouse position
      const frameRect = frameElement.getBoundingClientRect()
      const frameScale = parseFloat(frameElement.getAttribute('data-frame-scale') || '1')
      const mouseX = event.activatorEvent?.clientX || frameRect.left + frameRect.width / 2
      const mouseY = event.activatorEvent?.clientY || frameRect.top + frameRect.height / 2
      
      // Account for scale when calculating relative position
      const relativeX = (mouseX - frameRect.left) / frameScale
      const relativeY = (mouseY - frameRect.top) / frameScale

      // Get component definition for default size and props
      const { getComponentDefinition } = await import("@/lib/playground/component-registry")
      const componentDef = getComponentDefinition(componentId)
      const size = componentDef?.defaultSize || { width: 200, height: 100 }
      const defaultProps = componentDef?.defaultProps || {}

      // Ensure element fits within frame
      const constrainedSize = {
        width: Math.min(size.width, selectedFrame.width),
        height: Math.min(size.height, selectedFrame.height),
      }
      
      addElement(selectedFrame.id, {
        type: componentId,
        position: {
          x: Math.max(0, Math.min(relativeX - constrainedSize.width / 2, selectedFrame.width - constrainedSize.width)),
          y: Math.max(0, Math.min(relativeY - constrainedSize.height / 2, selectedFrame.height - constrainedSize.height)),
        },
        size: constrainedSize,
        props: defaultProps,
        tagName: componentDef?.tagName,
        parentId: null,
      })
    }
    
    // Handle moving existing elements within frame
    if (activeData?.type === "element" && overId === `frame-${selectedFrame.id}`) {
      const elementId = active.id as string
      const element = selectedFrame.elements.find(e => e.id === elementId)
      if (element && event.delta) {
        // Account for frame scale when calculating delta
        const frameElement = document.querySelector(`[data-frame-id="${selectedFrame.id}"]`) as HTMLElement
        const frameScale = frameElement ? parseFloat(frameElement.getAttribute('data-frame-scale') || '1') : 1
        
        // Adjust delta for scale
        const adjustedDeltaX = event.delta.x / frameScale
        const adjustedDeltaY = event.delta.y / frameScale
        
        const currentSelectedIds = selectedElementIds || []
        // If this element is part of a multi-selection, move all selected elements
        if (currentSelectedIds.includes(elementId) && currentSelectedIds.length > 1) {
          moveElements(selectedFrame.id, currentSelectedIds, adjustedDeltaX, adjustedDeltaY)
        } else {
          // Single element move - constrain within frame boundaries
          const newX = element.position.x + adjustedDeltaX
          const newY = element.position.y + adjustedDeltaY
          
          updateElement(selectedFrame.id, elementId, {
            position: {
              x: Math.max(0, Math.min(newX, selectedFrame.width - element.size.width)),
              y: Math.max(0, Math.min(newY, selectedFrame.height - element.size.height)),
            },
          })
        }
      }
    }
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="flex-1 overflow-auto bg-muted/30 relative">
        {!mounted ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-center space-y-4">
              <div className="text-4xl font-bold text-muted-foreground">Loading...</div>
            </div>
          </div>
        ) : selectedFrame ? (
          <div className="p-8 flex items-start justify-center min-h-full">
            <div
              style={{ 
                transform: `scale(${scale})`,
                transformOrigin: 'top center',
                width: selectedFrame.width,
              }}
            >
              <Frame frame={selectedFrame} scale={scale} />
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center h-full">
            <div className="text-center space-y-4">
              <div className="text-4xl font-bold text-muted-foreground">Empty Canvas</div>
              <p className="text-muted-foreground">
                Create your first page to get started
              </p>
            </div>
          </div>
        )}
      </div>
      <DragOverlay>
        {activeId && (activeData?.type === "component" || activeData?.type === "section") ? (
          <div className="opacity-50 bg-primary text-primary-foreground px-4 py-2 rounded">
            {activeData.componentId || activeData.sectionId}
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  )
}

