"use client"

import { useState } from "react"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { useDraggable } from "@dnd-kit/core"

const components = [
  { id: "button", name: "Button", category: "Form" },
  { id: "card", name: "Card", category: "Layout" },
  { id: "input", name: "Input", category: "Form" },
  { id: "select", name: "Select", category: "Form" },
  { id: "textarea", name: "Textarea", category: "Form" },
  { id: "toggle", name: "Toggle", category: "Form" },
  { id: "checkbox", name: "Checkbox", category: "Form" },
  { id: "radio", name: "Radio", category: "Form" },
  { id: "badge", name: "Badge", category: "Display" },
  { id: "avatar", name: "Avatar", category: "Display" },
  { id: "alert", name: "Alert", category: "Feedback" },
  { id: "dialog", name: "Dialog", category: "Overlay" },
  { id: "dropdown", name: "Dropdown", category: "Overlay" },
  { id: "tooltip", name: "Tooltip", category: "Overlay" },
  { id: "progress", name: "Progress", category: "Feedback" },
  { id: "slider", name: "Slider", category: "Form" },
  { id: "tabs", name: "Tabs", category: "Navigation" },
  { id: "accordion", name: "Accordion", category: "Display" },
]

function DraggableComponent({ id, name }: { id: string; name: string }) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: `component-${id}`,
    data: {
      type: "component",
      componentId: id,
    },
  })

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className={`
        p-3 rounded border bg-background hover:bg-accent cursor-grab active:cursor-grabbing
        transition-colors
        ${isDragging ? "opacity-50" : ""}
      `}
    >
      <div className="text-sm font-medium">{name}</div>
    </div>
  )
}

export function ComponentPalette() {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredComponents = components.filter((component) =>
    component.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const categories = Array.from(new Set(components.map((c) => c.category)))

  return (
    <div className="w-64 border-r bg-background overflow-y-auto">
      <div className="p-4">
        <div className="mb-4">
          <h2 className="font-semibold mb-2">Components</h2>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search components..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="space-y-4">
          {categories.map((category) => {
            const categoryComponents = filteredComponents.filter(
              (c) => c.category === category
            )
            if (categoryComponents.length === 0) return null

            return (
              <div key={category}>
                <div className="text-xs font-semibold text-muted-foreground uppercase mb-2">
                  {category}
                </div>
                <div className="grid grid-cols-1 gap-2">
                  {categoryComponents.map((component) => (
                    <DraggableComponent
                      key={component.id}
                      id={component.id}
                      name={component.name}
                    />
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

