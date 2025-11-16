"use client"

import { usePlayground } from "@/lib/playground/store"
import type { CanvasElement } from "@/lib/playground/types"
import { SelectionHandle } from "./selection-handle"
import { TransformHandle } from "./transform-handle"
import { cn } from "@/lib/utils"
import { useDraggable } from "@dnd-kit/core"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Progress } from "@/components/ui/progress"
import { Switch } from "@/components/ui/switch"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"
import { Slider } from "@/components/ui/slider"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { getComponentDefinition } from "@/lib/playground/component-registry"

interface ComponentRendererProps {
  element: CanvasElement
  isSelected: boolean
  onSelect: (e?: React.MouseEvent) => void
  allElements?: CanvasElement[] // All elements in the frame for nested rendering
}

const componentMap: Record<string, React.ComponentType<any>> = {
  button: Button,
  card: Card,
  input: Input,
  badge: Badge,
  avatar: Avatar,
  alert: Alert,
  progress: Progress,
  switch: Switch,
  checkbox: Checkbox,
  textarea: Textarea,
  slider: Slider,
  tabs: Tabs,
  accordion: Accordion,
}

export function ComponentRenderer({ element, isSelected, onSelect, allElements = [] }: ComponentRendererProps) {
  const { updateElement, getSelectedFrame } = usePlayground()
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: element.id,
    data: {
      type: "element",
      elementId: element.id,
    },
  })

  const frame = getSelectedFrame()
  const allFrameElements = allElements.length > 0 ? allElements : (frame?.elements || [])
  
  // Get child elements (nested components)
  const childElements = allFrameElements.filter((el) => el.parentId === element.id)

  // Get component definition for tagName
  const componentDef = getComponentDefinition(element.type)
  const tagName = element.tagName || componentDef?.tagName || "div"

  // Build style object combining position, size, and custom styles
  const baseStyle = {
    position: "absolute" as const,
    left: element.position.x,
    top: element.position.y,
    width: element.size.width,
    height: element.size.height,
    ...(element.styles || {}),
  }

  const style = {
    ...baseStyle,
    transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : undefined,
    zIndex: isSelected ? 10 : 1,
    pointerEvents: "auto" as const,
  }

  const Component = componentMap[element.type.toLowerCase()]

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    onSelect(e)
  }

  // Render nested children
  const renderChildren = () => {
    if (childElements.length === 0) {
      // No nested children, render text content if available
      return element.props?.children || element.props?.text || null
    }
    
    // Render nested components
    return childElements.map((child) => (
      <ComponentRenderer
        key={child.id}
        element={child}
        isSelected={false} // Children are not directly selectable in this context
        onSelect={onSelect}
        allElements={allFrameElements}
      />
    ))
  }

  // Render the actual component with real HTML structure
  const renderComponent = () => {
    // If it's a UI component (Button, Card, etc.), use the React component
    if (Component) {
      return (
        <Component
          {...element.props}
          className={cn(element.className, element.props?.className)}
          style={{ ...element.props?.style, ...element.styles }}
        >
          {renderChildren()}
        </Component>
      )
    }

    // Otherwise, render as HTML element with proper tag
    const Tag = tagName as keyof JSX.IntrinsicElements
    
    // Build props for HTML element
    const htmlProps: any = {
      className: cn(element.className, element.props?.className),
      style: { ...element.styles, ...element.props?.style },
      ...element.props,
    }
    
    // Remove React-specific props
    delete htmlProps.children
    delete htmlProps.text

    // Self-closing tags
    const selfClosingTags = ["input", "img", "br", "hr"]
    if (selfClosingTags.includes(tagName)) {
      return <Tag {...htmlProps} />
    }

    // Regular tags with content
    return (
      <Tag {...htmlProps}>
        {renderChildren()}
      </Tag>
    )
  }

  return (
    <div
      ref={setNodeRef}
      data-element-container
      data-element-id={element.id}
      style={style}
      {...listeners}
      {...attributes}
      onClick={handleClick}
      className={cn(
        "cursor-move",
        isSelected && "ring-2 ring-primary ring-offset-2",
        isDragging && "opacity-50"
      )}
    >
      {renderComponent()}

      {isSelected && (
        <>
          <SelectionHandle />
          <TransformHandle
            element={element}
            onResize={(width, height) => {
              const frame = getSelectedFrame()
              if (frame) {
                // Ensure element stays within frame boundaries
                const maxWidth = frame.width - element.position.x
                const maxHeight = frame.height - element.position.y
                const constrainedWidth = Math.min(width, maxWidth)
                const constrainedHeight = Math.min(height, maxHeight)
                
                updateElement(frame.id, element.id, { 
                  size: { 
                    width: Math.max(50, constrainedWidth), 
                    height: Math.max(50, constrainedHeight) 
                  } 
                })
              }
            }}
          />
        </>
      )}
    </div>
  )
}

