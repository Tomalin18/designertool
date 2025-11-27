"use client"

import { useState, useEffect } from "react"
import { 
  FileText, 
  Layout, 
  Component, 
  Palette, 
  Layers,
  Plus,
  ChevronRight
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { usePlayground } from "@/lib/playground/store"
import { PageDialog } from "./page-dialog"
import { ComponentPalette } from "./component-palette"
import { useDraggable } from "@dnd-kit/core"
import { getSectionTemplate } from "@/lib/playground/section-templates"

function DraggableSidebarItem({ item, sectionId, onClick }: { item: any; sectionId: string; onClick: () => void }) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: `${sectionId}-${item.id}`,
    data: {
      type: sectionId === "sections" ? "section" : item.type || "component",
      componentId: item.id,
      sectionId: sectionId === "sections" ? item.id : undefined,
    },
  })

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined

  return (
    <button
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      onClick={onClick}
      className={cn(
        "w-full text-left px-3 py-2 rounded hover:bg-accent text-sm flex items-center gap-2 cursor-grab active:cursor-grabbing",
        isDragging && "opacity-50"
      )}
    >
      {item.name}
    </button>
  )
}

const sidebarSections = [
  {
    id: "pages",
    name: "Pages",
    icon: FileText,
    items: [
      { id: "new-page", name: "New Page", action: "create" },
    ],
  },
  {
    id: "sections",
    name: "Sections",
    icon: Layout,
    items: [
      { id: "header", name: "Header", type: "section" },
      { id: "hero", name: "Hero", type: "section" },
      { id: "footer", name: "Footer", type: "section" },
      { id: "sidebar", name: "Sidebar", type: "section" },
      { id: "navbar", name: "Navbar", type: "section" },
      { id: "cta", name: "CTA", type: "section" },
      { id: "feature1", name: "Feature 1", type: "section" },
    ],
  },
  {
    id: "components",
    name: "Components",
    icon: Component,
    items: [
      { id: "button", name: "Button", type: "component" },
      { id: "card", name: "Card", type: "component" },
      { id: "input", name: "Input", type: "component" },
      { id: "select", name: "Select", type: "component" },
      { id: "textarea", name: "Textarea", type: "component" },
      { id: "toggle", name: "Toggle", type: "component" },
      { id: "tabs", name: "Tabs", type: "component" },
      { id: "sidebar", name: "Sidebar", type: "component" },
      { id: "checkbox", name: "Checkbox", type: "component" },
      { id: "radio", name: "Radio", type: "component" },
      { id: "badge", name: "Badge", type: "component" },
      { id: "avatar", name: "Avatar", type: "component" },
    ],
  },
  {
    id: "design",
    name: "Design",
    icon: Palette,
    items: [
      { id: "colors", name: "Colors", type: "design" },
      { id: "typography", name: "Typography", type: "design" },
      { id: "spacing", name: "Spacing", type: "design" },
      { id: "shadows", name: "Shadows", type: "design" },
    ],
  },
  {
    id: "elements",
    name: "Elements",
    icon: Layers,
    items: [
      { id: "div", name: "Div", type: "element" },
      { id: "text", name: "Text", type: "element" },
      { id: "image", name: "Image", type: "element" },
      { id: "icon", name: "Icon", type: "element" },
      { id: "link", name: "Link", type: "element" },
    ],
  },
]

export function Sidebar() {
  const [expandedSection, setExpandedSection] = useState<string | null>(null)
  const [hoveredSection, setHoveredSection] = useState<string | null>(null)
  const [showPageDialog, setShowPageDialog] = useState(false)
  const [mounted, setMounted] = useState(false)
  const { state, selectFrame, addSectionTemplate, getSelectedFrame } = usePlayground()

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleSectionClick = (sectionId: string) => {
    if (sectionId === "pages") {
      setShowPageDialog(true)
    } else {
      setExpandedSection(expandedSection === sectionId ? null : sectionId)
    }
  }

  const handleItemClick = (sectionId: string, item: any) => {
    if (item.action === "create") {
      setShowPageDialog(true)
      return
    }

    // Handle section clicks - create section template on selected frame
    if (sectionId === "sections" && item.type === "section") {
      const selectedFrame = getSelectedFrame()
      if (!selectedFrame) {
        // If no frame selected, show message or create one
        alert("Please create or select a frame first")
        return
      }

      // Get section template
      const templateElements = getSectionTemplate(item.id, selectedFrame)
      if (templateElements.length === 0) {
        return
      }

      // Calculate offset Y based on existing elements
      const maxY = selectedFrame.elements.reduce((max, el) => {
        return Math.max(max, el.position.y + el.size.height)
      }, 0)

      // Add section template with offset
      addSectionTemplate(selectedFrame.id, templateElements, maxY + 20)
    }
  }

  return (
    <>
      <div className="w-16 border-r bg-background flex flex-col">
        {sidebarSections.map((section) => {
          const Icon = section.icon
          const isExpanded = expandedSection === section.id
          const isHovered = hoveredSection === section.id
          const frameCount = section.id === "pages" ? state.frames.length : 0

          return (
            <div
              key={section.id}
              className="relative"
              onMouseEnter={() => setHoveredSection(section.id)}
              onMouseLeave={() => setHoveredSection(null)}
            >
              <button
                onClick={() => handleSectionClick(section.id)}
                className={cn(
                  "w-full h-16 flex flex-col items-center justify-center gap-1 transition-colors",
                  "hover:bg-accent",
                  isExpanded && "bg-accent"
                )}
                title={section.name}
              >
                <Icon className="h-5 w-5" />
                <span className="text-xs">{section.name}</span>
                {mounted && frameCount > 0 && (
                  <span className="absolute top-1 right-1 text-xs bg-primary text-primary-foreground rounded-full w-4 h-4 flex items-center justify-center">
                    {frameCount}
                  </span>
                )}
              </button>

              {/* Expanded panel on hover */}
              {isHovered && section.id !== "pages" && (
                <div className="absolute left-full top-0 ml-1 w-64 bg-popover border rounded-lg shadow-lg z-50 p-2">
                  <div className="font-semibold text-sm mb-2 px-2">{section.name}</div>
                  <div className="space-y-1">
                    {section.items.map((item) => (
                      <DraggableSidebarItem
                        key={item.id}
                        item={item}
                        sectionId={section.id}
                        onClick={() => handleItemClick(section.id, item)}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* Expanded sidebar for pages */}
      {expandedSection === "pages" && (
        <div className="w-64 border-r bg-background overflow-y-auto">
          <div className="p-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold">Pages</h2>
              <Button
                size="sm"
                onClick={() => setShowPageDialog(true)}
                className="h-8"
              >
                <Plus className="h-4 w-4 mr-1" />
                New
              </Button>
            </div>
            <div className="space-y-1">
              {state.frames.map((frame) => (
                <button
                  key={frame.id}
                  onClick={() => selectFrame(frame.id)}
                  className={cn(
                    "w-full text-left px-3 py-2 rounded hover:bg-accent text-sm",
                    state.selectedFrameId === frame.id && "bg-accent"
                  )}
                >
                  <div className="font-medium">{frame.name}</div>
                  <div className="text-xs text-muted-foreground">
                    {frame.type} • {frame.layout}
                  </div>
                </button>
              ))}
              {state.frames.length === 0 && (
                <div className="text-sm text-muted-foreground text-center py-8">
                  No pages yet. Create your first page!
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Expanded sidebar for components */}
      {expandedSection === "components" && (
        <ComponentPalette />
      )}

      <PageDialog open={showPageDialog} onOpenChange={setShowPageDialog} />
    </>
  )
}

