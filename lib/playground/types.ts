// TypeScript types for playground state

export type FrameType = "web" | "app"
export type LayoutType = "grid" | "flex" | "block"
export type PageTemplate = "blank" | "template"

export interface Position {
  x: number
  y: number
}

export interface Size {
  width: number
  height: number
}

export interface CanvasElement {
  id: string
  type: string // Component type (e.g., "Button", "Card", "Header", "div")
  position: Position
  size: Size
  props: Record<string, any>
  children?: CanvasElement[] // Nested components
  parentId?: string | null // Parent element ID for tree structure
  className?: string // CSS classes
  styles?: Record<string, string> // Inline styles
  tagName?: string // HTML tag name (e.g., "div", "section", "header")
}

export interface Frame {
  id: string
  name: string
  type: FrameType
  layout: LayoutType
  width: number
  height: number
  elements: CanvasElement[]
  createdAt: number
}

export interface SelectionBox {
  startX: number
  startY: number
  endX: number
  endY: number
}

export interface PlaygroundState {
  frames: Frame[]
  selectedFrameId: string | null
  selectedElementId: string | null
  selectedElementIds: string[] // Multiple selection
  selectionBox: SelectionBox | null
  zoom: number
}

export interface SidebarSection {
  id: string
  name: string
  icon?: string
  items: SidebarItem[]
}

export interface SidebarItem {
  id: string
  name: string
  type: "component" | "section" | "template"
  component?: string
  icon?: string
}

// Code generation types
export interface ComponentNode {
  id: string
  type: string
  tagName: string
  props: Record<string, any>
  children: ComponentNode[]
  styles: Record<string, string>
  className?: string
  textContent?: string
}

export type ExportFormat = "html" | "react" | "jsx"

