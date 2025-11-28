"use client"

import React from "react"
import { Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ColorPicker } from "@/components/ui/color-picker"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Plus, Trash2, GripVertical, Upload, X } from "lucide-react"
import * as LucideIcons from "lucide-react"
import { buttonSections } from "@/lib/button-sections"
import { cardSections } from "@/lib/card-sections"
import { badgeSections } from "@/lib/badge-sections"
import { inputSections } from "@/lib/input-sections"
import { tabsSections } from "@/lib/tabs-sections"
import { sidebarSections } from "@/lib/sidebar-sections"
import { tabbarSections } from "@/lib/tabbar-sections"

interface CustomizePanelProps {
  componentName: string
  props: Record<string, any>
  config: {
    props: Record<string, {
      type: string
      default?: any
      options?: string[]
      min?: number
      max?: number
    }>
  }
  updateProp: (key: string, value: any) => void
  // Configuration for how to group and display props
  groupingConfig?: {
    type: "tabs" | "sections"
    tabs?: {
      name: string
      label: string
      keys: string[]
      subcategories?: {
        name: string
        label: string
        keys: string[]
      }[]
    }[]
    sections?: {
      name: string
      label: string
      keys: string[]
    }[]
    hiddenProps?: string[]
  }
}

// Icon selector component for tabbar icons
const IconSelector = ({ 
  value, 
  onChange, 
  itemsValue 
}: { 
  value: string, 
  onChange: (val: string) => void,
  itemsValue?: string 
}) => {
  // Parse icons from newline-separated string
  const icons = value ? value.split("\n").filter((icon) => icon.trim() !== "") : []
  // Parse items to know how many icons we need
  const items = itemsValue ? itemsValue.split("\n").filter((item) => item.trim() !== "") : []
  const itemCount = items.length || icons.length || 1
  
  // Common icons used in tabbars (removed duplicates)
  const commonIcons = [
    "Home", "Search", "User", "Bell", "Settings", "Plus", "Heart", 
    "ShoppingBag", "Map", "Calendar", "MessageSquare", "Menu", "Compass", 
    "Star", "Video", "Music", "Grid", "Layers", "Zap", "Radio", "Scan", 
    "TrendingUp", "Mail", "Send", "Image", "File", "Folder", "Bookmark",
    "BookmarkCheck", "BookOpen", "Briefcase", "Camera", "Cast", "CheckCircle",
    "Clock", "CreditCard", "Download", "Edit", "Eye", "Filter", "Flag",
    "Gift", "Globe", "Headphones", "HelpCircle", "Inbox", "Info", "Key",
    "Link", "Lock", "Mic", "Moon", "MoreHorizontal", "MoreVertical", "Package",
    "Paperclip", "Phone", "Play", "Save", "Share", "Shield", "ShoppingCart",
    "Smile", "Sun", "Tag", "Target", "ThumbsUp", "Trash", "TrendingDown",
    "Upload", "UserPlus", "Volume2", "Wifi", "X"
  ]
  
  const [openIndex, setOpenIndex] = React.useState<number | null>(null)
  
  const updateIcon = (index: number, iconName: string) => {
    const newIcons = [...icons]
    // Ensure array is long enough
    while (newIcons.length < itemCount) {
      newIcons.push("")
    }
    newIcons[index] = iconName
    // Filter out empty strings but keep the structure
    const filtered = newIcons.map((icon, i) => i < itemCount ? icon : "").filter((icon, i) => i < itemCount)
    onChange(filtered.join("\n"))
    setOpenIndex(null)
  }
  
  // Ensure we have enough icon slots
  const displayIcons = Array.from({ length: itemCount }, (_, i) => icons[i] || "")
  
  return (
    <div className="space-y-3">
      {displayIcons.map((iconName, index) => {
        const IconComponent = iconName 
          ? (LucideIcons[iconName as keyof typeof LucideIcons] as any)
          : null
        
        return (
          <div key={index} className="flex items-center gap-2 relative">
            <span className="text-xs text-muted-foreground w-8">#{index + 1}</span>
            <Popover open={openIndex === index} onOpenChange={(open) => setOpenIndex(open ? index : null)}>
              <PopoverTrigger asChild>
                <button
                  className="flex-shrink-0 w-12 h-12 rounded-lg border-2 flex items-center justify-center transition-all hover:border-foreground/30 hover:bg-accent border-border bg-card"
                >
                  {IconComponent ? (
                    <IconComponent className="h-6 w-6" strokeWidth={1.5} />
                  ) : (
                    <Plus className="h-6 w-6 text-muted-foreground" />
                  )}
                </button>
              </PopoverTrigger>
              <PopoverContent className="w-80 p-4" align="start">
                <div className="grid grid-cols-6 gap-2 max-h-64 overflow-y-auto">
                  {commonIcons.map((icon) => {
                    const Icon = LucideIcons[icon as keyof typeof LucideIcons] as any
                    if (!Icon) return null
                    return (
                      <button
                        key={icon}
                        onClick={() => updateIcon(index, icon)}
                        className={`w-10 h-10 rounded-lg border-2 flex items-center justify-center transition-all hover:border-foreground/30 hover:bg-accent ${
                          iconName === icon ? "border-foreground bg-accent" : "border-border bg-card"
                        }`}
                        title={icon}
                      >
                        <Icon className="h-5 w-5" strokeWidth={1.5} />
                      </button>
                    )
                  })}
                </div>
              </PopoverContent>
            </Popover>
          </div>
        )
      })}
    </div>
  )
}

const TabsEditor = ({ value, onChange }: { value: string, onChange: (val: string) => void }) => {
  // Parse tabs from newline-separated string
  const tabs = value ? value.split("\n").filter((tab) => tab.trim() !== "") : []
  
  // Always show at least one empty input for adding new tabs
  const displayTabs = tabs.length === 0 ? [""] : [...tabs, ""]

  const updateTabs = (newTabs: string[]) => {
    // Remove empty tabs except the last one (for adding new items)
    // Filter out empty tabs, but keep the structure for display
    const nonEmptyTabs = newTabs.filter((tab, index) => {
      // Always keep the last item (for adding new tabs)
      if (index === newTabs.length - 1) return false
      // Keep non-empty tabs
      return tab.trim() !== ""
    })
    
    // Join with newlines - this is what gets saved
    onChange(nonEmptyTabs.join("\n"))
  }

  const updateTab = (index: number, val: string) => {
    const newTabs = [...displayTabs]
    newTabs[index] = val
    updateTabs(newTabs)
  }

  const removeTab = (index: number) => {
    const newTabs = displayTabs.filter((_, i) => i !== index)
    // Ensure at least one empty input remains
    if (newTabs.length === 0) {
      newTabs.push("")
    }
    updateTabs(newTabs)
  }

  const addTab = () => {
    const newTabs = [...displayTabs]
    // If the last item is not empty, add a new empty one
    if (newTabs[newTabs.length - 1].trim() !== "") {
      newTabs.push("")
    }
    updateTabs(newTabs)
  }

  return (
    <div className="space-y-4">
      {displayTabs.map((tab, index) => (
        <div key={index} className="flex items-center gap-2">
          <Input
            value={tab}
            onChange={(e) => updateTab(index, e.target.value)}
            placeholder="Tab label"
            className="h-8"
            onKeyDown={(e) => {
              // Allow Enter to add a new tab
              if (e.key === "Enter" && tab.trim() !== "") {
                e.preventDefault()
                addTab()
              }
              // Allow Backspace to remove empty tabs
              if (e.key === "Backspace" && tab.trim() === "" && displayTabs.length > 1) {
                e.preventDefault()
                removeTab(index)
              }
            }}
          />
          {tab.trim() !== "" && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => removeTab(index)}
              className="h-8 w-8 text-muted-foreground hover:text-destructive"
            >
              <Trash2 size={14} />
            </Button>
          )}
        </div>
      ))}
      {displayTabs[displayTabs.length - 1]?.trim() !== "" && (
        <Button variant="outline" size="sm" onClick={addTab} className="w-full h-8 text-xs gap-1">
          <Plus size={12} /> Add Tab
        </Button>
      )}
    </div>
  )
}

const TreeItemsEditor = ({ value, onChange }: { value: string, onChange: (val: string) => void }) => {
  // Parse tree items from format "Parent:Child1,Child2" or "Parent"
  const parseTreeItems = (val: string): Array<{ parent: string; children: string[] }> => {
    if (!val || val.trim() === "") return []
    
    return val.split("\n").filter(item => item.trim() !== "").map(item => {
      const parts = item.split(":")
      if (parts.length > 1) {
        const children = parts[1].split(",").map(c => c.trim()).filter(c => c !== "")
        return { parent: parts[0]?.trim() || "", children }
      }
      return { parent: parts[0]?.trim() || "", children: [] }
    })
  }

  // Initialize state with parsed items + one empty item for adding
  const [displayItems, setDisplayItems] = React.useState<Array<{ parent: string; children: string[] }>>(() => {
    const items = parseTreeItems(value)
    return items.length === 0 ? [{ parent: "", children: [] }] : [...items, { parent: "", children: [] }]
  })

  // Track the last value we processed to avoid unnecessary updates
  const lastValueRef = React.useRef(value)

  // Update state when value prop changes (from external source)
  React.useEffect(() => {
    if (value !== lastValueRef.current) {
      lastValueRef.current = value
      const items = parseTreeItems(value)
      setDisplayItems(items.length === 0 ? [{ parent: "", children: [] }] : [...items, { parent: "", children: [] }])
    }
  }, [value])

  const updateItems = (newItems: Array<{ parent: string; children: string[] }>) => {
    // Remove empty items except the last one (for adding new items)
    const nonEmptyItems = newItems.filter((item, index) => {
      // Always keep the last item (for adding new items)
      if (index === newItems.length - 1) return false
      // Keep non-empty items
      return item.parent.trim() !== ""
    })
    
    // Convert to format: "Parent:Child1,Child2" or "Parent"
    const formatted = nonEmptyItems.map(item => {
      if (item.children.length > 0) {
        return `${item.parent}:${item.children.join(",")}`
      }
      return item.parent
    }).join("\n")
    
    onChange(formatted)
  }

  const updateParent = (index: number, val: string) => {
    const newItems = [...displayItems]
    newItems[index] = { ...newItems[index], parent: val }
    setDisplayItems(newItems)
    updateItems(newItems)
  }

  const updateChild = (parentIndex: number, childIndex: number, val: string) => {
    const newItems = [...displayItems]
    const children = [...newItems[parentIndex].children]
    children[childIndex] = val
    newItems[parentIndex] = { ...newItems[parentIndex], children }
    setDisplayItems(newItems)
    updateItems(newItems)
  }

  const addChild = (parentIndex: number) => {
    const newItems = [...displayItems]
    const children = [...newItems[parentIndex].children, ""]
    newItems[parentIndex] = { ...newItems[parentIndex], children }
    setDisplayItems(newItems)
    updateItems(newItems)
  }

  const removeChild = (parentIndex: number, childIndex: number) => {
    const newItems = [...displayItems]
    const children = newItems[parentIndex].children.filter((_, i) => i !== childIndex)
    newItems[parentIndex] = { ...newItems[parentIndex], children }
    setDisplayItems(newItems)
    updateItems(newItems)
  }

  const removeItem = (index: number) => {
    const newItems = displayItems.filter((_, i) => i !== index)
    if (newItems.length === 0) {
      newItems.push({ parent: "", children: [] })
    }
    setDisplayItems(newItems)
    updateItems(newItems)
  }

  const addItem = () => {
    const newItems = [...displayItems]
    if (newItems[newItems.length - 1].parent.trim() !== "") {
      newItems.push({ parent: "", children: [] })
    }
    setDisplayItems(newItems)
    updateItems(newItems)
  }

  return (
    <div className="space-y-4">
      {displayItems.map((item, index) => (
        <div key={index} className="border rounded-md p-3 space-y-2 bg-muted/30">
          <div className="flex items-center gap-2">
            <Input
              value={item.parent}
              onChange={(e) => updateParent(index, e.target.value)}
              placeholder="Parent item"
              className="h-8 flex-1"
              onKeyDown={(e) => {
                if (e.key === "Enter" && item.parent.trim() !== "") {
                  e.preventDefault()
                  addItem()
                }
                if (e.key === "Backspace" && item.parent.trim() === "" && displayItems.length > 1) {
                  e.preventDefault()
                  removeItem(index)
                }
              }}
            />
            {item.parent.trim() !== "" && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => removeItem(index)}
                className="h-8 w-8 text-muted-foreground hover:text-destructive"
              >
                <Trash2 size={14} />
              </Button>
            )}
          </div>
          {item.parent.trim() !== "" && (
            <div className="space-y-2 pl-4 border-l-2 border-muted">
              <div className="space-y-2">
                {item.children.map((child, childIndex) => (
                  <div key={childIndex} className="flex items-center gap-2">
                    <Input
                      value={child}
                      onChange={(e) => updateChild(index, childIndex, e.target.value)}
                      placeholder="Child item"
                      className="h-7 text-xs flex-1"
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && child.trim() !== "") {
                          e.preventDefault()
                          addChild(index)
                        }
                        if (e.key === "Backspace" && child.trim() === "" && item.children.length > 1) {
                          e.preventDefault()
                          removeChild(index, childIndex)
                        }
                      }}
                    />
                    {item.children.length > 1 && (
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeChild(index, childIndex)}
                        className="h-7 w-7 text-muted-foreground hover:text-destructive"
                      >
                        <X size={12} />
                      </Button>
                    )}
                  </div>
                ))}
                {item.children.length === 0 || item.children[item.children.length - 1]?.trim() !== "" ? (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => addChild(index)}
                    className="w-full h-7 text-xs gap-1"
                  >
                    <Plus size={12} /> Add Child
                  </Button>
                ) : null}
              </div>
            </div>
          )}
        </div>
      ))}
      {displayItems[displayItems.length - 1]?.parent.trim() !== "" && (
        <Button variant="outline" size="sm" onClick={addItem} className="w-full h-8 text-xs gap-1">
          <Plus size={12} /> Add Item
        </Button>
      )}
    </div>
  )
}

const SidebarNavigationEditor = ({ value, onChange }: { value: string, onChange: (val: string) => void }) => {
  // Parse items from newline-separated string
  const parseItems = (val: string): Array<{ label: string; badge?: string }> => {
    if (!val || val.trim() === "") return []
    
    try {
      // Try to parse as JSON first
      const parsed = JSON.parse(val)
      if (Array.isArray(parsed)) {
        return parsed.map(item => {
          if (typeof item === 'string') {
            const parts = item.split(':')
            return { label: parts[0]?.trim() || "", badge: parts[1]?.trim() || undefined }
          }
          return { label: item.label || item.title || "", badge: item.badge }
        })
      }
    } catch (e) {
      // Not JSON, treat as newline-separated string
    }
    
    // Fallback to newline-separated string
    return val.split("\n").filter(item => item.trim() !== "").map(item => {
      const parts = item.split(':')
      return { label: parts[0]?.trim() || "", badge: parts[1]?.trim() || undefined }
    })
  }

  // Initialize state with parsed items + one empty item for adding
  const [displayItems, setDisplayItems] = React.useState<Array<{ label: string; badge?: string }>>(() => {
    const items = parseItems(value)
    return items.length === 0 ? [{ label: "", badge: undefined }] : [...items, { label: "", badge: undefined }]
  })

  // Track the last value we processed to avoid unnecessary updates
  const lastValueRef = React.useRef(value)

  // Update state when value prop changes (from external source), but only if it's different from what we last processed
  React.useEffect(() => {
    if (value !== lastValueRef.current) {
      lastValueRef.current = value
      const items = parseItems(value)
      setDisplayItems(items.length === 0 ? [{ label: "", badge: undefined }] : [...items, { label: "", badge: undefined }])
    }
  }, [value])

  const updateItems = (newItems: Array<{ label: string; badge?: string }>) => {
    // Remove empty items except the last one (for adding new items)
    const nonEmptyItems = newItems.filter((item, index) => {
      // Always keep the last item (for adding new items)
      if (index === newItems.length - 1) return false
      // Keep non-empty items
      return item.label.trim() !== ""
    })
    
    // Convert to newline-separated string format: "Label" or "Label:Badge"
    const formatted = nonEmptyItems.map(item => {
      if (item.badge && item.badge.trim() !== "") {
        return `${item.label}:${item.badge}`
      }
      return item.label
    }).join("\n")
    
    onChange(formatted)
  }

  const updateItem = (index: number, field: "label" | "badge", val: string) => {
    const newItems = [...displayItems]
    newItems[index] = { ...newItems[index], [field]: val }
    // Update local state immediately for UI responsiveness
    setDisplayItems(newItems)
    // Trigger onChange to save to parent component immediately
    updateItems(newItems)
  }

  const removeItem = (index: number) => {
    const newItems = displayItems.filter((_, i) => i !== index)
    // Ensure at least one empty input remains
    if (newItems.length === 0) {
      newItems.push({ label: "", badge: undefined })
    }
    setDisplayItems(newItems)
    updateItems(newItems)
  }

  const addItem = () => {
    const newItems = [...displayItems]
    // If the last item is not empty, add a new empty one
    if (newItems[newItems.length - 1].label.trim() !== "") {
      newItems.push({ label: "", badge: undefined })
    }
    setDisplayItems(newItems)
    updateItems(newItems)
  }

  return (
    <div className="space-y-4">
      {displayItems.map((item, index) => (
        <div key={index} className="border rounded-md p-3 space-y-2 bg-muted/30">
          <div className="flex items-center gap-2">
            <Input
              value={item.label}
              onChange={(e) => updateItem(index, "label", e.target.value)}
              placeholder="Item label"
              className="h-8 flex-1"
              onKeyDown={(e) => {
                // Allow Enter to add a new item
                if (e.key === "Enter" && item.label.trim() !== "") {
                  e.preventDefault()
                  addItem()
                }
                // Allow Backspace to remove empty items
                if (e.key === "Backspace" && item.label.trim() === "" && displayItems.length > 1) {
                  e.preventDefault()
                  removeItem(index)
                }
              }}
            />
            {item.label.trim() !== "" && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => removeItem(index)}
                className="h-8 w-8 text-muted-foreground hover:text-destructive"
              >
                <Trash2 size={14} />
              </Button>
            )}
          </div>
          {item.label.trim() !== "" && (
            <div className="flex items-center gap-2">
              <Input
                value={item.badge || ""}
                onChange={(e) => updateItem(index, "badge", e.target.value)}
                placeholder="Badge (optional)"
                className="h-7 text-xs flex-1"
              />
              <span className="text-xs text-muted-foreground whitespace-nowrap">Badge</span>
            </div>
          )}
        </div>
      ))}
      {displayItems[displayItems.length - 1]?.label.trim() !== "" && (
        <Button variant="outline" size="sm" onClick={addItem} className="w-full h-8 text-xs gap-1">
          <Plus size={12} /> Add Item
        </Button>
      )}
    </div>
  )
}

const NavigationConfigEditor = ({ value, onChange }: { value: string, onChange: (val: string) => void }) => {
  let items: any[] = []
  try {
    items = JSON.parse(value)
  } catch (e) {
    items = []
  }

  const updateItems = (newItems: any[], shouldCleanEmpty = false) => {
    // 只有在需要清理時才清理末尾空項目（比如保存時）
    // 平時保留空項目，以便用戶可以繼續添加
    let processedItems = newItems
    if (shouldCleanEmpty) {
      processedItems = newItems.map((item) => {
        if (!item.items || item.items.length === 0) return item
        
        const nonEmptyItems = item.items.filter((s: string) => s.trim() !== "")
        
        // 如果沒有非空項目，只保留一個空項目
        if (nonEmptyItems.length === 0) {
          return { ...item, items: [""] }
        }
        
        // 如果有非空項目，移除所有末尾的空項目
        const cleaned = [...item.items]
        while (cleaned.length > 0 && cleaned[cleaned.length - 1].trim() === "") {
          cleaned.pop()
        }
        
        return { ...item, items: cleaned }
      })
    }
    
    onChange(JSON.stringify(processedItems, null, 2))
  }

  const addItem = () => {
    updateItems([...items, { title: "New Item" }])
  }

  const removeItem = (index: number) => {
    const newItems = [...items]
    newItems.splice(index, 1)
    updateItems(newItems)
  }

  const updateItem = (index: number, field: string, val: any) => {
    const newItems = [...items]
    newItems[index] = { ...newItems[index], [field]: val }
    updateItems(newItems)
  }

  const updateSubitem = (itemIndex: number, subIndex: number, val: string) => {
    const newItems = [...items]
    if (!newItems[itemIndex].items) newItems[itemIndex].items = []
    
    // 如果清空一個項目，移除它
    if (val.trim() === "") {
      newItems[itemIndex].items.splice(subIndex, 1)
    } else {
      newItems[itemIndex].items[subIndex] = val
    }
    
    updateItems(newItems)
  }

  const addSubitem = (itemIndex: number) => {
    const newItems = [...items]
    if (!newItems[itemIndex].items) newItems[itemIndex].items = []
    newItems[itemIndex].items.push("")
    updateItems(newItems)
  }

  return (
    <div className="space-y-4">
      {items.map((item, index) => (
        <div key={index} className="border rounded-md p-3 space-y-3 bg-muted/30">
           <div className="flex items-center gap-2">
             <Input 
               value={item.title} 
               onChange={(e) => updateItem(index, 'title', e.target.value)}
               placeholder="Item Title"
               className="h-8"
             />
             <Button variant="ghost" size="icon" onClick={() => removeItem(index)} className="h-8 w-8 text-muted-foreground hover:text-destructive">
               <Trash2 size={14} />
             </Button>
           </div>
           <div className="flex items-center space-x-2">
             <Checkbox 
               id={`submenu-${index}`} 
               checked={!!item.items}
               onCheckedChange={(checked) => {
                 if (checked) {
                   updateItem(index, 'items', [])
                 } else {
                   const newItems = [...items]
                   delete newItems[index].items
                   updateItems(newItems)
                 }
               }}
             />
             <Label htmlFor={`submenu-${index}`} className="text-xs font-normal text-muted-foreground">Has Submenu</Label>
           </div>
           {item.items && (
             <div className="pl-4 space-y-2 border-l-2 border-muted ml-1">
               {item.items
                 .map((subItem: string, subIndex: number) => ({ subItem, subIndex }))
                 .filter(({ subItem, subIndex }: { subItem: string; subIndex: number }) => {
                   // 渲染非空的項目
                   if (subItem.trim() !== "") return true
                   // 如果是空項目，只有在是最後一個項目時才渲染（用於輸入新項目）
                   return subIndex === item.items.length - 1
                 })
                 .map(({ subItem, subIndex }: { subItem: string; subIndex: number }) => (
                   <div key={subIndex} className="flex gap-2">
                     <Input
                       value={subItem}
                       onChange={(e) => updateSubitem(index, subIndex, e.target.value)}
                       placeholder="Subitem Title"
                       className="h-7 text-xs"
                     />
                     {subItem.trim() !== "" && (
                       <Button 
                         variant="ghost" 
                         size="icon" 
                         className="h-7 w-7"
                         onClick={() => {
                           const newItems = [...items]
                           newItems[index].items.splice(subIndex, 1)
                           updateItems(newItems)
                         }}
                       >
                         <Trash2 size={12} />
                       </Button>
                     )}
                   </div>
                 ))}
               <Button
                 variant="outline"
                 size="sm"
                 onClick={() => addSubitem(index)}
                 className="h-7 text-xs gap-1 w-full"
               >
                 <Plus size={12} /> Add Subitem
               </Button>
             </div>
           )}
        </div>
      ))}
      <Button variant="outline" size="sm" onClick={addItem} className="w-full h-8 text-xs gap-1">
        <Plus size={12} /> Add Item
      </Button>
    </div>
  )
}

// Features Editor for PricingCard
const FeaturesEditor = ({ value, onChange }: { value: string, onChange: (val: string) => void }) => {
  const items = value ? value.split("\n").filter((item) => item.trim() !== "") : []
  
  const updateItems = (newItems: string[]) => {
    onChange(newItems.join("\n"))
  }

  const addItem = () => {
    updateItems([...items, ""])
  }

  const removeItem = (index: number) => {
    const newItems = [...items]
    newItems.splice(index, 1)
    updateItems(newItems)
  }

  const updateItem = (index: number, val: string) => {
    const newItems = [...items]
    newItems[index] = val
    updateItems(newItems)
  }

  return (
    <div className="space-y-2">
      {items.map((item, index) => (
        <div key={index} className="flex gap-2">
          <Input
            value={item}
            onChange={(e) => updateItem(index, e.target.value)}
            placeholder="Feature name"
            className="flex-1"
          />
          <Button
            variant="ghost"
            size="icon"
            onClick={() => removeItem(index)}
            className="h-10 w-10 text-muted-foreground hover:text-destructive"
          >
            <Trash2 size={14} />
          </Button>
        </div>
      ))}
      <Button variant="outline" size="sm" onClick={addItem} className="w-full h-8 text-xs gap-1">
        <Plus size={12} /> Add Feature
      </Button>
    </div>
  )
}

// Skills Editor for SkillCard (similar to FeaturesEditor)
const SkillsEditor = ({ value, onChange }: { value: string, onChange: (val: string) => void }) => {
  const items = value ? value.split("\n").filter((item) => item.trim() !== "") : []
  
  const updateItems = (newItems: string[]) => {
    onChange(newItems.join("\n"))
  }

  const addItem = () => {
    updateItems([...items, ""])
  }

  const removeItem = (index: number) => {
    const newItems = [...items]
    newItems.splice(index, 1)
    updateItems(newItems)
  }

  const updateItem = (index: number, val: string) => {
    const newItems = [...items]
    newItems[index] = val
    updateItems(newItems)
  }

  return (
    <div className="space-y-2">
      {items.map((item, index) => (
        <div key={index} className="flex gap-2">
          <Input
            value={item}
            onChange={(e) => updateItem(index, e.target.value)}
            placeholder="Skill name"
            className="flex-1"
          />
          <Button
            variant="ghost"
            size="icon"
            onClick={() => removeItem(index)}
            className="h-10 w-10 text-muted-foreground hover:text-destructive"
          >
            <Trash2 size={14} />
          </Button>
        </div>
      ))}
      <Button variant="outline" size="sm" onClick={addItem} className="w-full h-8 text-xs gap-1">
        <Plus size={12} /> Add Skill
      </Button>
    </div>
  )
}

// Comparison Rows Editor for ComparisonCard
const ComparisonRowsEditor = ({ value, onChange }: { value: string, onChange: (val: string) => void }) => {
  const parseRows = (val: string): Array<{ label: string; left: string; right: string }> => {
    if (!val) return []
    return val.split("\n").map((row) => {
      const parts = row.split(":")
      return {
        label: parts[0]?.trim() || "",
        left: parts[1]?.trim() || "",
        right: parts[2]?.trim() || "",
      }
    }).filter((r) => r.label || r.left || r.right)
  }

  const items = parseRows(value)

  const updateItems = (newItems: Array<{ label: string; left: string; right: string }>) => {
    const formatted = newItems.map((item) => `${item.label}:${item.left}:${item.right}`).join("\n")
    onChange(formatted)
  }

  const addItem = () => {
    updateItems([...items, { label: "", left: "", right: "" }])
  }

  const removeItem = (index: number) => {
    const newItems = [...items]
    newItems.splice(index, 1)
    updateItems(newItems)
  }

  const updateItem = (index: number, field: "label" | "left" | "right", val: string) => {
    const newItems = [...items]
    newItems[index] = { ...newItems[index], [field]: val }
    updateItems(newItems)
  }

  return (
    <div className="space-y-2">
      {items.map((item, index) => (
        <div key={index} className="space-y-2 p-3 border rounded-md bg-muted/30">
          <div className="grid grid-cols-3 gap-2">
            <Input
              value={item.label}
              onChange={(e) => updateItem(index, "label", e.target.value)}
              placeholder="Label"
              className="text-xs"
            />
            <Input
              value={item.left}
              onChange={(e) => updateItem(index, "left", e.target.value)}
              placeholder="Left value"
              className="text-xs"
            />
            <div className="flex gap-2">
              <Input
                value={item.right}
                onChange={(e) => updateItem(index, "right", e.target.value)}
                placeholder="Right value"
                className="text-xs flex-1"
              />
              <Button
                variant="ghost"
                size="icon"
                onClick={() => removeItem(index)}
                className="h-8 w-8 text-muted-foreground hover:text-destructive"
              >
                <Trash2 size={12} />
              </Button>
            </div>
          </div>
        </div>
      ))}
      <Button variant="outline" size="sm" onClick={addItem} className="w-full h-8 text-xs gap-1">
        <Plus size={12} /> Add Row
      </Button>
    </div>
  )
}

// Roadmap Items Editor for RoadmapCard
const RoadmapItemsEditor = ({ value, onChange }: { value: string, onChange: (val: string) => void }) => {
  const parseItems = (val: string): Array<{ title: string; status: string; color: string }> => {
    if (!val) return []
    return val.split("\n").map((item) => {
      const parts = item.split(":")
      return {
        title: parts[0]?.trim() || "",
        status: parts[1]?.trim() || "",
        color: parts[2]?.trim() || "green",
      }
    }).filter((i) => i.title || i.status)
  }

  const items = parseItems(value)

  const updateItems = (newItems: Array<{ title: string; status: string; color: string }>) => {
    const formatted = newItems.map((item) => `${item.title}:${item.status}:${item.color}`).join("\n")
    onChange(formatted)
  }

  const addItem = () => {
    updateItems([...items, { title: "", status: "", color: "green" }])
  }

  const removeItem = (index: number) => {
    const newItems = [...items]
    newItems.splice(index, 1)
    updateItems(newItems)
  }

  const updateItem = (index: number, field: "title" | "status" | "color", val: string) => {
    const newItems = [...items]
    newItems[index] = { ...newItems[index], [field]: val }
    updateItems(newItems)
  }

  return (
    <div className="space-y-2">
      {items.map((item, index) => (
        <div key={index} className="space-y-2 p-3 border rounded-md bg-muted/30">
          <Input
            value={item.title}
            onChange={(e) => updateItem(index, "title", e.target.value)}
            placeholder="Title"
            className="text-xs"
          />
          <div className="grid grid-cols-2 gap-2">
            <Select
              value={item.status}
              onValueChange={(val) => updateItem(index, "status", val)}
            >
              <SelectTrigger className="text-xs h-8">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="in-progress">In Progress</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
              </SelectContent>
            </Select>
            <div className="flex gap-2">
              <Select
                value={item.color}
                onValueChange={(val) => updateItem(index, "color", val)}
              >
                <SelectTrigger className="text-xs h-8 flex-1">
                  <SelectValue placeholder="Color" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="green">Green</SelectItem>
                  <SelectItem value="yellow">Yellow</SelectItem>
                  <SelectItem value="red">Red</SelectItem>
                </SelectContent>
              </Select>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => removeItem(index)}
                className="h-8 w-8 text-muted-foreground hover:text-destructive"
              >
                <Trash2 size={12} />
              </Button>
            </div>
          </div>
        </div>
      ))}
      <Button variant="outline" size="sm" onClick={addItem} className="w-full h-8 text-xs gap-1">
        <Plus size={12} /> Add Item
      </Button>
    </div>
  )
}

// Hourly Forecast Editor for WeatherCard
const HourlyForecastEditor = ({ value, onChange }: { value: string, onChange: (val: string) => void }) => {
  const parseForecast = (val: string): Array<{ time: string; temp: number }> => {
    if (!val) return []
    return val.split("\n").map((forecast) => {
      const parts = forecast.split(":")
      return {
        time: parts[0]?.trim() || "",
        temp: parseInt(parts[1]?.trim() || "0") || 0,
      }
    }).filter((f) => f.time)
  }

  const items = parseForecast(value)

  const updateItems = (newItems: Array<{ time: string; temp: number }>) => {
    const formatted = newItems.map((item) => `${item.time}:${item.temp}`).join("\n")
    onChange(formatted)
  }

  const addItem = () => {
    updateItems([...items, { time: "", temp: 0 }])
  }

  const removeItem = (index: number) => {
    const newItems = [...items]
    newItems.splice(index, 1)
    updateItems(newItems)
  }

  const updateItem = (index: number, field: "time" | "temp", val: string | number) => {
    const newItems = [...items]
    newItems[index] = { ...newItems[index], [field]: field === "temp" ? (typeof val === "number" ? val : parseInt(String(val)) || 0) : val }
    updateItems(newItems)
  }

  return (
    <div className="space-y-2">
      {items.map((item, index) => (
        <div key={index} className="flex gap-2">
          <Input
            value={item.time}
            onChange={(e) => updateItem(index, "time", e.target.value)}
            placeholder="Time (e.g., 12:00)"
            className="flex-1"
          />
          <Input
            type="number"
            value={item.temp}
            onChange={(e) => updateItem(index, "temp", parseInt(e.target.value) || 0)}
            placeholder="Temperature"
            className="w-24"
          />
          <Button
            variant="ghost"
            size="icon"
            onClick={() => removeItem(index)}
            className="h-10 w-10 text-muted-foreground hover:text-destructive"
          >
            <Trash2 size={14} />
          </Button>
        </div>
      ))}
      <Button variant="outline" size="sm" onClick={addItem} className="w-full h-8 text-xs gap-1">
        <Plus size={12} /> Add Forecast
      </Button>
    </div>
  )
}

export function CustomizePanel({
  componentName,
  props,
  config,
  updateProp,
  groupingConfig,
}: CustomizePanelProps) {
  const renderProp = (key: string, propConfig: any, isLast: boolean) => {
    const label = key.replace(/^(header|body|footer)/, '').replace(/([A-Z])/g, ' $1').trim()

    if (key === "navigationConfig") {
      return (
        <div key={key} className="space-y-2">
          <Label className="capitalize">{label}</Label>
          <NavigationConfigEditor 
            value={props[key] || "[]"} 
            onChange={(val) => updateProp(key, val)} 
          />
          {!isLast && <Separator className="!mt-4" />}
        </div>
      )
    }

    // Special editor for tree items (tree sidebar)
    if (key === "treeItems" && propConfig.type === "textarea") {
      return (
        <div key={key} className="space-y-2">
          <Label>Tree Items</Label>
          <TreeItemsEditor 
            value={props[key] || ""} 
            onChange={(val) => updateProp(key, val)} 
          />
          {propConfig.description && (
            <p className="text-xs text-muted-foreground mt-1">{propConfig.description}</p>
          )}
          {!isLast && <Separator className="!mt-4" />}
        </div>
      )
    }

    // Special editor for sidebar navigation items (textarea type with "Items" in key name or specific sidebar props)
    if ((key === "overviewItems" || key === "managementItems" || key === "quickActions" || key === "favoritesItems" || key === "privateItems" || key === "primaryMenuItems" || key === "secondaryMenuItems" || key === "menuItems" || key.endsWith("Items")) && propConfig.type === "textarea") {
      return (
        <div key={key} className="space-y-2">
          <Label className="capitalize">{label}</Label>
          <SidebarNavigationEditor 
            value={props[key] || ""} 
            onChange={(val) => updateProp(key, val)} 
          />
          {propConfig.description && (
            <p className="text-xs text-muted-foreground mt-1">{propConfig.description}</p>
          )}
          {!isLast && <Separator className="!mt-4" />}
        </div>
      )
    }

    // Special editor for sidebar icons prop (textarea type) - use IconSelector
    const sidebarSection = sidebarSections.find((sidebar: { componentName: string; name: string }) =>
      sidebar.componentName === componentName || sidebar.name === componentName
    )
    if (sidebarSection && key.endsWith("Icons") && propConfig.type === "textarea") {
      // Use default value from metadata if current value is empty
      const displayValue = props[key] && props[key].trim() !== "" 
        ? props[key] 
        : (propConfig.default || sidebarSection.props[key]?.default || "")
      // Find corresponding items prop (e.g., overviewIcons -> overviewItems)
      const itemsKey = key.replace("Icons", "Items")
      const itemsValue = props[itemsKey] && props[itemsKey].trim() !== ""
        ? props[itemsKey]
        : (sidebarSection.props[itemsKey]?.default || "")
      return (
        <div key={key} className="space-y-2 relative">
          <Label className="capitalize">{label}</Label>
          <IconSelector 
            value={displayValue} 
            onChange={(val) => updateProp(key, val)}
            itemsValue={itemsValue}
          />
          {propConfig.description && (
            <p className="text-xs text-muted-foreground mt-1">{propConfig.description}</p>
          )}
          {!isLast && <Separator className="!mt-4" />}
        </div>
      )
    }

    // Special editor for tabbar items prop (textarea type) - use TabsEditor instead of SidebarNavigationEditor
    const tabbarSection = tabbarSections.find((tabbar: { componentName: string; name: string }) =>
      tabbar.componentName === componentName || tabbar.name === componentName
    )
    if (tabbarSection && key === "items" && propConfig.type === "textarea") {
      // Use default value from metadata if current value is empty
      const displayValue = props[key] && props[key].trim() !== "" 
        ? props[key] 
        : (propConfig.default || tabbarSection.props.items?.default || "")
      return (
        <div key={key} className="space-y-2">
          <Label className="capitalize">{label}</Label>
          <TabsEditor 
            value={displayValue} 
            onChange={(val) => updateProp(key, val)} 
          />
          {propConfig.description && (
            <p className="text-xs text-muted-foreground mt-1">{propConfig.description}</p>
          )}
          {!isLast && <Separator className="!mt-4" />}
        </div>
      )
    }

    // Special editor for tabbar icons prop (textarea type) - use IconSelector
    if (tabbarSection && key === "icons" && propConfig.type === "textarea") {
      // Use default value from metadata if current value is empty
      const displayValue = props[key] && props[key].trim() !== "" 
        ? props[key] 
        : (propConfig.default || tabbarSection.props.icons?.default || "")
      const itemsValue = props["items"] && props["items"].trim() !== ""
        ? props["items"]
        : (tabbarSection.props.items?.default || "")
      return (
        <div key={key} className="space-y-2 relative">
          <Label className="capitalize">{label}</Label>
          <IconSelector 
            value={displayValue} 
            onChange={(val) => updateProp(key, val)}
            itemsValue={itemsValue}
          />
          {propConfig.description && (
            <p className="text-xs text-muted-foreground mt-1">{propConfig.description}</p>
          )}
          {!isLast && <Separator className="!mt-4" />}
        </div>
      )
    }

    // Special editor for tabs prop (textarea type)
    if (key === "tabs" && propConfig.type === "textarea") {
      return (
        <div key={key} className="space-y-2">
          <Label className="capitalize">{label}</Label>
          <TabsEditor 
            value={props[key] || ""} 
            onChange={(val) => updateProp(key, val)} 
          />
          {propConfig.description && (
            <p className="text-xs text-muted-foreground mt-1">{propConfig.description}</p>
          )}
          {!isLast && <Separator className="!mt-4" />}
        </div>
      )
    }

    // Special editors for card components
    if (key === "features" && componentName === "PricingCard") {
      return (
        <div key={key} className="space-y-2">
          <Label className="capitalize">{label}</Label>
          <FeaturesEditor 
            value={props[key] || ""} 
            onChange={(val) => updateProp(key, val)} 
          />
          {propConfig.description && (
            <p className="text-xs text-muted-foreground mt-1">{propConfig.description}</p>
          )}
          {!isLast && <Separator className="!mt-4" />}
        </div>
      )
    }

    if (key === "skills" && componentName === "SkillCard") {
      return (
        <div key={key} className="space-y-2">
          <Label className="capitalize">{label}</Label>
          <SkillsEditor 
            value={props[key] || ""} 
            onChange={(val) => updateProp(key, val)} 
          />
          {propConfig.description && (
            <p className="text-xs text-muted-foreground mt-1">{propConfig.description}</p>
          )}
          {!isLast && <Separator className="!mt-4" />}
        </div>
      )
    }

    if (key === "rows" && componentName === "ComparisonCard") {
      return (
        <div key={key} className="space-y-2">
          <Label className="capitalize">{label}</Label>
          <ComparisonRowsEditor 
            value={props[key] || ""} 
            onChange={(val) => updateProp(key, val)} 
          />
          {propConfig.description && (
            <p className="text-xs text-muted-foreground mt-1">{propConfig.description}</p>
          )}
          {!isLast && <Separator className="!mt-4" />}
        </div>
      )
    }

    if (key === "items" && componentName === "RoadmapCard") {
      return (
        <div key={key} className="space-y-2">
          <Label className="capitalize">{label}</Label>
          <RoadmapItemsEditor 
            value={props[key] || ""} 
            onChange={(val) => updateProp(key, val)} 
          />
          {propConfig.description && (
            <p className="text-xs text-muted-foreground mt-1">{propConfig.description}</p>
          )}
          {!isLast && <Separator className="!mt-4" />}
        </div>
      )
    }

    if (key === "hourlyForecast" && componentName === "WeatherCard") {
      return (
        <div key={key} className="space-y-2">
          <Label className="capitalize">{label}</Label>
          <HourlyForecastEditor 
            value={props[key] || ""} 
            onChange={(val) => updateProp(key, val)} 
          />
          {propConfig.description && (
            <p className="text-xs text-muted-foreground mt-1">{propConfig.description}</p>
          )}
          {!isLast && <Separator className="!mt-4" />}
        </div>
      )
    }

    return (
      <div key={key} className="space-y-2">
        <Label className="capitalize">{label}</Label>

        {propConfig.type === "select" && (
          <>
            <Select
              value={props[key] || propConfig.default || ""}
              onValueChange={(value) => {
                updateProp(key, value)
                // Special handling for ChatInterface status
                if (key === "headerUserStatus" && value !== "Other") {
                  updateProp("headerUserStatusCustom", "")
                  updateProp("headerStatusColor", "")
                }
              }}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {propConfig.options?.map((option: string) => (
                  <SelectItem key={option} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {key === "headerUserStatus" && props[key] === "Other" && (
              <>
                <Input
                  value={props.headerUserStatusCustom || ""}
                  onChange={(e) => updateProp("headerUserStatusCustom", e.target.value)}
                  placeholder="Enter custom status..."
                  className="mt-2"
                />
                <div className="mt-2 space-y-2">
                  <Label className="text-xs text-muted-foreground">Custom Status Color</Label>
                  <ColorPicker
                    value={props.headerStatusColor || ""}
                    onChange={(value) => updateProp("headerStatusColor", value)}
                    placeholder="#32814f"
                    outputFormat="tailwind-text"
                    defaultColor="#22c55e"
                  />
                  <p className="text-xs text-muted-foreground">Use color picker or enter hex color code (e.g., #22c55e)</p>
                </div>
              </>
            )}
          </>
        )}

        {propConfig.type === "boolean" && (
          <div className="flex items-center space-x-2">
            <Switch
              checked={props[key] === true || props[key] === "true"}
              onCheckedChange={(checked) => updateProp(key, checked)}
            />
            <span className="text-sm text-muted-foreground">
              {props[key] === true || props[key] === "true" ? "Enabled" : "Disabled"}
            </span>
          </div>
        )}

        {propConfig.type === "text" && (
          <Input
            value={props[key] || ""}
            onChange={(e) => updateProp(key, e.target.value)}
            placeholder={propConfig.default}
          />
        )}

        {propConfig.type === "textarea" && (
          <Textarea
            value={props[key] || ""}
            onChange={(e) => updateProp(key, e.target.value)}
            placeholder={propConfig.default}
            className="min-h-[120px]"
          />
        )}

        {propConfig.type === "slider" && (
          <div className="space-y-2">
            <Slider
              value={[props[key] !== undefined ? props[key] : propConfig.default]}
              onValueChange={([value]: number[]) => updateProp(key, value)}
              min={propConfig.min}
              max={propConfig.max}
              step={1}
            />
            <div className="text-xs text-muted-foreground text-right">
              {props[key] !== undefined ? props[key] : propConfig.default}
            </div>
          </div>
        )}

        {propConfig.type === "number" && (
          <Input
            type="number"
            value={props[key] !== undefined ? props[key] : propConfig.default || 0}
            onChange={(e) => updateProp(key, e.target.value === "" ? undefined : parseFloat(e.target.value) || 0)}
            placeholder={propConfig.default?.toString() || "0"}
            min={propConfig.min}
            max={propConfig.max}
          />
        )}

        {propConfig.type === "file" && (
          <div className="space-y-2">
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0]
                if (file) {
                  const reader = new FileReader()
                  reader.onloadend = () => {
                    const result = reader.result as string
                    updateProp(key, result)
                  }
                  reader.readAsDataURL(file)
                }
              }}
              className="hidden"
              id={`file-upload-${key}`}
            />
            {props[key] ? (
              <div className="relative">
                <div className="relative w-full h-32 border rounded-lg overflow-hidden bg-muted">
                  <img
                    src={props[key]}
                    alt={label}
                    className="w-full h-full object-cover"
                  />
                  <Button
                    variant="destructive"
                    size="icon"
                    className="absolute top-2 right-2 h-6 w-6"
                    onClick={() => updateProp(key, "")}
                  >
                    <X size={12} />
                  </Button>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full mt-2"
                  onClick={() => {
                    document.getElementById(`file-upload-${key}`)?.click()
                  }}
                >
                  <Upload size={14} className="mr-2" />
                  Change Image
                </Button>
              </div>
            ) : (
              <label
                htmlFor={`file-upload-${key}`}
                className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-muted hover:bg-muted/80 transition-colors"
              >
                <Upload size={24} className="mb-2 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Click to upload image</span>
                <span className="text-xs text-muted-foreground mt-1">or drag and drop</span>
              </label>
            )}
          </div>
        )}

        {propConfig.type === "color" && (
          <ColorPicker
            value={props[key] || ""}
            onChange={(value) => updateProp(key, value)}
            placeholder={propConfig.default && propConfig.default.trim() !== "" ? propConfig.default : ""}
            outputFormat="hex"
            defaultColor={(() => {
              // If value exists and is hex, use it
              if (props[key] && /^#[0-9A-Fa-f]{6}$/.test(props[key])) {
                return props[key]
              }
              // If value is rgb format, convert to hex
              if (props[key] && props[key].includes('rgb')) {
                const rgbMatch = props[key].match(/\d+/g)
                if (rgbMatch && rgbMatch.length >= 3) {
                  const r = parseInt(rgbMatch[0]).toString(16).padStart(2, '0')
                  const g = parseInt(rgbMatch[1]).toString(16).padStart(2, '0')
                  const b = parseInt(rgbMatch[2]).toString(16).padStart(2, '0')
                  return `#${r}${g}${b}`
                }
              }
              // If default is empty string, don't show a color (use transparent/empty)
              // Only use default color if it's actually a color value
              if (propConfig.default && propConfig.default.trim() !== "" && propConfig.default.startsWith('#')) {
                return propConfig.default
              }
              // For empty defaults, return empty string so ColorPicker shows as empty
              return ""
            })()}
          />
        )}

        {propConfig.type === "color-tailwind-bg" && (
          <ColorPicker
            value={props[key] || ""}
            onChange={(value) => updateProp(key, value)}
            placeholder={propConfig.default || "#000000"}
            outputFormat="tailwind-bg"
            defaultColor={(() => {
              const colorValue = props[key] || propConfig.default || ""
              const hexMatch = colorValue.match(/\[#([0-9A-Fa-f]{6})\]/)
              if (hexMatch) return `#${hexMatch[1]}`
              const colorMap: Record<string, string> = {
                "bg-indigo-600": "#4f46e5",
                "bg-neutral-800": "#262626",
                "bg-neutral-900": "#171717",
                "bg-green-500": "#22c55e",
                "bg-blue-500": "#3b82f6",
                "bg-purple-500": "#a855f7",
                "bg-pink-500": "#ec4899",
                "bg-yellow-500": "#eab308",
                "bg-red-500": "#ef4444",
                "bg-orange-500": "#f97316",
              }
              return colorMap[colorValue] || "#000000"
            })()}
          />
        )}

        {propConfig.type === "color-tailwind-text" && (
          <ColorPicker
            value={props[key] || ""}
            onChange={(value) => updateProp(key, value)}
            placeholder={propConfig.default || "#000000"}
            outputFormat="tailwind-text"
            defaultColor={(() => {
              const colorValue = props[key] || propConfig.default || ""
              const hexMatch = colorValue.match(/\[#([0-9A-Fa-f]{6})\]/)
              if (hexMatch) return `#${hexMatch[1]}`
              const colorMap: Record<string, string> = {
                "text-neutral-500": "#737373",
                "text-neutral-200": "#e5e5e5",
                "text-white": "#ffffff",
                "text-neutral-100": "#f5f5f5",
              }
              return colorMap[colorValue] || "#000000"
            })()}
          />
        )}

        {propConfig.type === "color-tailwind-border" && (
          <ColorPicker
            value={props[key] || ""}
            onChange={(value) => updateProp(key, value)}
            placeholder={propConfig.default || "#000000"}
            outputFormat="tailwind-border"
            defaultColor={(() => {
              const colorValue = props[key] || propConfig.default || ""
              const hexMatch = colorValue.match(/\[#([0-9A-Fa-f]{6})\]/)
              if (hexMatch) return `#${hexMatch[1]}`
              const colorMap: Record<string, string> = {
                "border-indigo-500/50": "#6366f1",
                "border-neutral-800": "#262626",
                "border-neutral-500": "#737373",
              }
              return colorMap[colorValue] || "#000000"
            })()}
          />
        )}

        {propConfig.type === "color-tailwind-gradient" && (
          <ColorPicker
            value={props[key] || ""}
            onChange={(value) => updateProp(key, value)}
            placeholder={propConfig.default || "#000000"}
            outputFormat="tailwind-gradient"
            gradientPrefix={(() => {
              // Determine prefix based on key name
              if (key.includes("From") || key.endsWith("From")) return "from"
              if (key.includes("Via") || key.endsWith("Via")) return "via"
              if (key.includes("To") || key.endsWith("To")) return "to"
              return "from"
            })()}
            defaultColor={(() => {
              const colorValue = props[key] || propConfig.default || ""
              // Extract color from Tailwind gradient classes like "from-indigo-500", "via-purple-500", "to-pink-500"
              const colorMap: Record<string, string> = {
                "from-indigo-500": "#6366f1",
                "from-purple-500": "#a855f7",
                "from-pink-500": "#ec4899",
                "from-blue-500": "#3b82f6",
                "from-green-500": "#22c55e",
                "from-yellow-500": "#eab308",
                "from-red-500": "#ef4444",
                "from-orange-500": "#f97316",
                "via-indigo-500": "#6366f1",
                "via-purple-500": "#a855f7",
                "via-pink-500": "#ec4899",
                "via-blue-500": "#3b82f6",
                "via-green-500": "#22c55e",
                "via-yellow-500": "#eab308",
                "via-red-500": "#ef4444",
                "via-orange-500": "#f97316",
                "to-indigo-500": "#6366f1",
                "to-purple-500": "#a855f7",
                "to-pink-500": "#ec4899",
                "to-blue-500": "#3b82f6",
                "to-green-500": "#22c55e",
                "to-yellow-500": "#eab308",
                "to-red-500": "#ef4444",
                "to-orange-500": "#f97316",
              }
              return colorMap[colorValue] || "#6366f1"
            })()}
          />
        )}

        {propConfig.description && (
          <p className="text-xs text-muted-foreground mt-1">{propConfig.description}</p>
        )}
        {!isLast && <Separator className="!mt-4" />}
      </div>
    )
  }

  // Get grouping configuration based on component
  const getGroupingConfig = (): {
    type: "tabs" | "sections"
    tabs?: {
      name: string
      label: string
      keys: string[]
      subcategories?: {
        name: string
        label: string
        keys: string[]
      }[]
    }[]
    sections?: { name: string; label: string; keys: string[] }[]
    hiddenProps?: string[]
  } => {
    if (groupingConfig) {
      return groupingConfig
    }

    // Default configurations for each component
    if (componentName === "MediaPlayer") {
      const colorRelatedKeys = [
        'backgroundColor', 'borderColor', 'borderRadius',
        'glowColor1', 'glowColor2',
        'gradientFrom', 'gradientTo', 'gradientWidth', 'gradientAnimated'
      ]
      const hiddenProps = ['isPlaying', 'isLoved', 'isShuffle', 'isRepeat']

      const generalProps: string[] = []
      const colorProps: string[] = []

      Object.entries(config.props).forEach(([key]) => {
        if (hiddenProps.includes(key)) return
        if (colorRelatedKeys.includes(key)) {
          colorProps.push(key)
        } else {
          generalProps.push(key)
        }
      })

      return {
        type: "tabs",
        tabs: [
          { name: "general", label: "General", keys: generalProps },
          { name: "color", label: "Color", keys: colorProps },
        ],
        hiddenProps,
      }
    }

    // For SocialProfileCard, group props into General and Color tabs
    if (componentName === "SocialProfileCard") {
      const colorRelatedKeys = [
        'statusColor', 'bannerGradientFrom', 'bannerGradientVia', 'bannerGradientTo',
        'backgroundColor', 'borderColor', 'borderRadius',
        'gradientFrom', 'gradientTo', 'gradientWidth', 'gradientAnimated'
      ]

      const generalProps: string[] = []
      const colorProps: string[] = []

      Object.entries(config.props).forEach(([key]) => {
        if (colorRelatedKeys.includes(key)) {
          colorProps.push(key)
        } else {
          generalProps.push(key)
        }
      })

      return {
        type: "tabs",
        tabs: [
          { name: "general", label: "General", keys: generalProps },
          { name: "color", label: "Color", keys: colorProps },
        ],
      }
    }

    // For UrlInput, group props into General and Color tabs
    if (componentName === "UrlInput") {
      const colorRelatedKeys = [
        'gradientFrom', 'gradientTo', 'gradientWidth', 'gradientAnimated',
        'backgroundColor', 'borderColor', 'borderRadius'
      ]

      const generalProps: string[] = []
      const colorProps: string[] = []

      Object.entries(config.props).forEach(([key]) => {
        if (colorRelatedKeys.includes(key)) {
          colorProps.push(key)
        } else {
          generalProps.push(key)
        }
      })

      return {
        type: "tabs",
        tabs: [
          { name: "general", label: "General", keys: generalProps },
          { name: "color", label: "Color", keys: colorProps },
        ],
      }
    }

    // For Button components, use the grouping config from buttonSections if available
    const buttonSection = buttonSections.find((button: { componentName: string }) => button.componentName === componentName)
    if (buttonSection && buttonSection.groupingConfig) {
      return buttonSection.groupingConfig
    }

    // For Badge components, use detailed grouping (similar to Card components)
    // Try to find by componentName first, then by name
    const badgeSection = badgeSections.find((badge: { componentName: string; name: string }) => 
      badge.componentName === componentName || badge.name === componentName
    )
    if (badgeSection) {
      // Define style-related keys for badges
      const colorKeys = [
        'backgroundColor', 'borderColor', 'textColor', 'iconColor', 'dotColor',
        'glowColor', 'pulseColor', 'shadowColor', 'gradientFrom', 'gradientTo'
      ]
      const spacingKeys = ['padding']
      const borderKeys = ['borderRadius', 'borderWidth', 'borderOpacity']
      const otherStyleKeys = [
        'backdropBlur', 'glowIntensity', 'pulseSpeed', 'shadowOffsetX', 'shadowOffsetY',
        'size', 'maxCount'
      ]

      const contentProps: string[] = []
      const colorProps: string[] = []
      const spacingProps: string[] = []
      const borderProps: string[] = []
      const otherStyleProps: string[] = []

      Object.entries(config.props).forEach(([key, propConfig]) => {
        // Only include props that are actually defined in badgeSection.props
        // This ensures we don't show props that the component doesn't use
        if (!badgeSection.props[key]) {
          return
        }
        
        const lowerKey = key.toLowerCase()
        const propType = propConfig.type
        
        // Check for style props first
        if (colorKeys.includes(key) || lowerKey.includes('color') || propType === 'color') {
          colorProps.push(key)
        } 
        else if (spacingKeys.some(k => lowerKey.includes(k))) {
          spacingProps.push(key)
        } 
        else if (borderKeys.some(k => lowerKey.includes(k)) || lowerKey.includes('border') || lowerKey.includes('radius')) {
          borderProps.push(key)
        } 
        else if (
          otherStyleKeys.includes(key) || 
          lowerKey.includes('blur') || 
          lowerKey.includes('opacity') || 
          lowerKey.includes('gradient') ||
          lowerKey.includes('shadow') ||
          lowerKey.includes('speed') ||
          lowerKey.includes('intensity') ||
          (propType === 'slider' && (lowerKey.includes('opacity') || lowerKey.includes('blur') || lowerKey.includes('width') || lowerKey.includes('speed') || lowerKey.includes('intensity')))
        ) {
          otherStyleProps.push(key)
        } 
        else {
          contentProps.push(key)
        }
      })

      // Build style subcategories
      const styleSubcategories = []
      if (colorProps.length > 0) {
        styleSubcategories.push({ name: "colors", label: "Colors", keys: colorProps })
      }
      if (spacingProps.length > 0) {
        styleSubcategories.push({ name: "spacing", label: "Spacing", keys: spacingProps })
      }
      if (borderProps.length > 0) {
        styleSubcategories.push({ name: "border", label: "Border", keys: borderProps })
      }
      if (otherStyleProps.length > 0) {
        styleSubcategories.push({ name: "other", label: "Other", keys: otherStyleProps })
      }

      const tabs = []
      
      // Content tab
      if (contentProps.length > 0) {
        tabs.push({ name: "content", label: "Content", keys: contentProps })
      }

      // Style tab with subcategories
      if (styleSubcategories.length > 0) {
        tabs.push({
          name: "style",
          label: "Style",
          keys: [],
          subcategories: styleSubcategories
        })
      }

      if (tabs.length > 0) {
        return {
          type: "tabs",
          tabs
        }
      }
    }

    // For Input components, use detailed grouping (similar to Badge components)
    // Try to find by componentName first, then by name
    const inputSection = inputSections.find((input: { componentName: string; name: string }) =>
      input.componentName === componentName || input.name === componentName
    )
    if (inputSection) {
      // Define style-related keys for inputs
      const colorKeys = [
        'backgroundColor', 'borderColor', 'textColor', 'focusBorderColor', 'focusRingColor',
        'errorColor', 'successColor', 'glowColor', 'buttonColor', 'currencyColor', 'accentColor',
        'promptColor', 'pathColor', 'gradientFrom', 'gradientVia', 'gradientTo',
        'hoverBorderColor', 'buttonHoverColor'
      ]
      const spacingKeys = ['padding']
      const borderKeys = ['borderRadius', 'borderWidth']
      const otherStyleKeys = ['digits', 'min', 'max', 'defaultValue']

      const contentProps: string[] = []
      const colorProps: string[] = []
      const spacingProps: string[] = []
      const borderProps: string[] = []
      const otherStyleProps: string[] = []

      Object.entries(config.props).forEach(([key, propConfig]) => {
        // Only include props that are actually defined in inputSection.props
        // This ensures we don't show props that the component doesn't use
        if (!inputSection.props[key]) {
          return
        }
        
        const lowerKey = key.toLowerCase()
        const propType = propConfig.type
        
        // Check for style props first
        if (colorKeys.includes(key) || lowerKey.includes('color') || propType === 'color') {
          colorProps.push(key)
        } 
        else if (spacingKeys.some(k => lowerKey.includes(k))) {
          spacingProps.push(key)
        } 
        else if (borderKeys.some(k => lowerKey.includes(k)) || lowerKey.includes('border') || lowerKey.includes('radius')) {
          borderProps.push(key)
        } 
        else if (
          otherStyleKeys.includes(key) || 
          lowerKey.includes('gradient') ||
          (propType === 'slider' && (lowerKey.includes('radius') || lowerKey.includes('width')))
        ) {
          otherStyleProps.push(key)
        } 
        else {
          contentProps.push(key)
        }
      })

      // Build style subcategories
      const styleSubcategories = []
      if (colorProps.length > 0) {
        styleSubcategories.push({ name: "colors", label: "Colors", keys: colorProps })
      }
      if (spacingProps.length > 0) {
        styleSubcategories.push({ name: "spacing", label: "Spacing", keys: spacingProps })
      }
      if (borderProps.length > 0) {
        styleSubcategories.push({ name: "border", label: "Border", keys: borderProps })
      }
      if (otherStyleProps.length > 0) {
        styleSubcategories.push({ name: "other", label: "Other", keys: otherStyleProps })
      }

      const tabs = []
      
      // Content tab
      if (contentProps.length > 0) {
        tabs.push({ name: "content", label: "Content", keys: contentProps })
      }

      // Style tab with subcategories
      if (styleSubcategories.length > 0) {
        tabs.push({
          name: "style",
          label: "Style",
          keys: [],
          subcategories: styleSubcategories
        })
      }

      if (tabs.length > 0) {
        return {
          type: "tabs",
          tabs
        }
      }
    }

    // For Tabs components, use detailed grouping (similar to Badge and Input components)
    // Try to find by componentName first, then by name
    const tabsSection = tabsSections.find((tab: { componentName: string; name: string }) =>
      tab.componentName === componentName || tab.name === componentName
    )
    if (tabsSection) {
      // Define style-related keys for tabs
      const colorKeys = [
        'activeColor', 'inactiveColor', 'backgroundColor'
      ]

      const contentProps: string[] = []
      const colorProps: string[] = []

      Object.entries(config.props).forEach(([key, propConfig]) => {
        // Only include props that are actually defined in tabsSection.props
        // This ensures we don't show props that the component doesn't use
        if (!tabsSection.props[key]) {
          return
        }
        
        const lowerKey = key.toLowerCase()
        const propType = propConfig.type
        
        // Check for color props
        if (colorKeys.includes(key) || lowerKey.includes('color') || propType === 'color') {
          colorProps.push(key)
        } 
        // Content props: everything else
        else {
          contentProps.push(key)
        }
      })

      // Build style subcategories
      const styleSubcategories = []
      if (colorProps.length > 0) {
        styleSubcategories.push({ name: "colors", label: "Colors", keys: colorProps })
      }

      const tabs = []
      
      // Content tab
      if (contentProps.length > 0) {
        tabs.push({ name: "content", label: "Content", keys: contentProps })
      }

      // Style tab with subcategories
      if (styleSubcategories.length > 0) {
        tabs.push({
          name: "style",
          label: "Style",
          keys: [],
          subcategories: styleSubcategories
        })
      }

      if (tabs.length > 0) {
        return {
          type: "tabs",
          tabs
        }
      }
    }

    // For Sidebar components, use detailed grouping (similar to Tabs components)
    // Try to find by componentName first, then by name
    const sidebarSection = sidebarSections.find((sidebar: { componentName: string; name: string }) =>
      sidebar.componentName === componentName || sidebar.name === componentName
    )
    if (sidebarSection) {
      // Define style-related keys for sidebars
      const colorKeys = [
        'backgroundColor', 'borderColor', 'textColor', 'activeColor', 'inactiveColor',
        'hoverColor', 'iconColor', 'accentColor', 'gradientFrom', 'gradientTo'
      ]
      const spacingKeys = ['padding', 'margin', 'gap', 'width']
      const borderKeys = ['borderRadius', 'borderWidth']
      const otherStyleKeys = ['backdropBlur', 'opacity', 'shadow']

      const contentProps: string[] = []
      const colorProps: string[] = []
      const spacingProps: string[] = []
      const borderProps: string[] = []
      const otherStyleProps: string[] = []

      Object.entries(config.props).forEach(([key, propConfig]) => {
        // Only include props that are actually defined in sidebarSection.props
        // This ensures we don't show props that the component doesn't use
        if (!sidebarSection.props[key]) {
          return // Skip props not in metadata
        }
        
        const lowerKey = key.toLowerCase()
        const propType = propConfig.type
        
        // Check for style props first
        // Color props: explicit color keys or keys containing 'color', or prop type is 'color'
        if (colorKeys.includes(key) || lowerKey.includes('color') || propType === 'color') {
          colorProps.push(key)
        } 
        // Spacing props: explicit spacing keys or keys containing spacing keywords
        else if (spacingKeys.some(k => lowerKey.includes(k))) {
          spacingProps.push(key)
        } 
        // Border props: explicit border keys or keys containing 'border' or 'radius'
        else if (borderKeys.some(k => lowerKey.includes(k)) || lowerKey.includes('border') || lowerKey.includes('radius')) {
          borderProps.push(key)
        } 
        // Other style props: explicit other style keys or keys containing style keywords
        else if (
          otherStyleKeys.includes(key) || 
          lowerKey.includes('blur') || 
          lowerKey.includes('opacity') || 
          lowerKey.includes('gradient') ||
          lowerKey.includes('shadow') ||
          (propType === 'slider' && (lowerKey.includes('opacity') || lowerKey.includes('blur') || lowerKey.includes('width')))
        ) {
          otherStyleProps.push(key)
        } 
        // Content props: everything else (text, textarea, number, boolean, select that aren't style-related)
        else {
          contentProps.push(key)
        }
      })
      
      // Debug: Log if no props were found
      if (contentProps.length === 0 && colorProps.length === 0 && spacingProps.length === 0 && borderProps.length === 0 && otherStyleProps.length === 0) {
        console.warn(`Sidebar ${componentName}: No props found in config.props that match sidebarSection.props.`, {
          configProps: Object.keys(config.props),
          sidebarSectionProps: Object.keys(sidebarSection.props),
        })
      }

      // Build style subcategories
      const styleSubcategories = []
      if (colorProps.length > 0) {
        styleSubcategories.push({ name: "colors", label: "Colors", keys: colorProps })
      }
      if (spacingProps.length > 0) {
        styleSubcategories.push({ name: "spacing", label: "Spacing", keys: spacingProps })
      }
      if (borderProps.length > 0) {
        styleSubcategories.push({ name: "border", label: "Border", keys: borderProps })
      }
      if (otherStyleProps.length > 0) {
        styleSubcategories.push({ name: "other", label: "Other", keys: otherStyleProps })
      }

      const tabs = []
      
      // Content tab
      if (contentProps.length > 0) {
        tabs.push({ name: "content", label: "Content", keys: contentProps })
      }

      // Style tab with subcategories
      if (styleSubcategories.length > 0) {
        tabs.push({
          name: "style",
          label: "Style",
          keys: [],
          subcategories: styleSubcategories
        })
      }

      // If no tabs were created (e.g., only className prop), create a simple tab structure
      if (tabs.length === 0) {
        // Collect all props that are defined in sidebarSection.props
        const allProps: string[] = []
        Object.entries(config.props).forEach(([key]) => {
          // Only include props that are actually defined in sidebarSection.props
          if (sidebarSection.props[key]) {
            allProps.push(key)
          }
        })
        
        if (allProps.length > 0) {
          tabs.push({ name: "general", label: "General", keys: allProps })
        } else {
          // If still no props, something is wrong - log for debugging
          console.warn(`Sidebar ${componentName}: No props found after filtering.`, {
            configProps: Object.keys(config.props),
            sidebarSectionProps: Object.keys(sidebarSection.props),
            sidebarSectionName: sidebarSection.name,
            sidebarSectionComponentName: sidebarSection.componentName,
          })
        }
      }

      if (tabs.length > 0) {
        return {
          type: "tabs",
          tabs
        }
      } else {
        // Fallback: return empty grouping to trigger fallback rendering
        console.warn(`Sidebar ${componentName}: No tabs created, falling back to default rendering.`)
      }
    }

    // For Tabbar components, use detailed grouping (similar to Sidebar components)
    // Try to find by componentName first, then by name
    const tabbarSection = tabbarSections.find((tabbar: { componentName: string; name: string }) =>
      tabbar.componentName === componentName || tabbar.name === componentName
    )
    if (tabbarSection) {
      // Define style-related keys for tabbars
      const colorKeys = [
        'backgroundColor', 'borderColor', 'textColor', 'activeColor', 'inactiveColor',
        'activeTextColor', 'iconColor', 'fabColor', 'fabShadowColor', 'glowColor',
        'gradientFrom', 'gradientTo', 'pillBackgroundColor', 'pillTextColor',
        'activeBackgroundColor', 'containerBackgroundColor', 'indicatorColor',
        'dotColor', 'dividerColor', 'borderColor', 'textColor'
      ]
      const spacingKeys = ['padding', 'margin', 'gap', 'width']
      const borderKeys = ['borderRadius', 'borderWidth']
      const otherStyleKeys = ['backdropBlur', 'opacity', 'shadow']

      const contentProps: string[] = []
      const colorProps: string[] = []
      const spacingProps: string[] = []
      const borderProps: string[] = []
      const otherStyleProps: string[] = []

      Object.entries(config.props).forEach(([key, propConfig]) => {
        // Only include props that are actually defined in tabbarSection.props
        // This ensures we don't show props that the component doesn't use
        if (!tabbarSection.props[key]) {
          return // Skip props not in metadata
        }
        
        const lowerKey = key.toLowerCase()
        const propType = propConfig.type
        
        // Check for style props first
        // Color props: explicit color keys or keys containing 'color', or prop type is 'color'
        if (colorKeys.includes(key) || lowerKey.includes('color') || propType === 'color') {
          colorProps.push(key)
        } 
        // Spacing props: explicit spacing keys or keys containing spacing keywords
        // But exclude 'className' which should always be in content
        else if (key !== 'className' && spacingKeys.some(k => lowerKey.includes(k))) {
          spacingProps.push(key)
        } 
        // Border props: explicit border keys or keys containing 'border' or 'radius'
        // But exclude 'className' which should always be in content
        else if (key !== 'className' && (borderKeys.some(k => lowerKey.includes(k)) || lowerKey.includes('border') || lowerKey.includes('radius'))) {
          borderProps.push(key)
        } 
        // Other style props: explicit other style keys or keys containing style keywords
        // But exclude 'className' which should always be in content
        else if (
          key !== 'className' &&
          (otherStyleKeys.includes(key) || 
          lowerKey.includes('blur') || 
          lowerKey.includes('opacity') || 
          lowerKey.includes('gradient') ||
          lowerKey.includes('shadow') ||
          (propType === 'slider' && (lowerKey.includes('opacity') || lowerKey.includes('blur') || lowerKey.includes('width'))))
        ) {
          otherStyleProps.push(key)
        } 
        // Content props: everything else (text, textarea, number, boolean, select that aren't style-related)
        // This includes className and any other non-style props
        else {
          contentProps.push(key)
        }
      })
      
      // Debug: Log if no props were found
      if (contentProps.length === 0 && colorProps.length === 0 && spacingProps.length === 0 && borderProps.length === 0 && otherStyleProps.length === 0) {
        console.warn(`Tabbar ${componentName}: No props found in config.props that match tabbarSection.props.`, {
          configProps: Object.keys(config.props),
          tabbarSectionProps: Object.keys(tabbarSection.props),
        })
      }

      // Build style subcategories
      const styleSubcategories = []
      if (colorProps.length > 0) {
        styleSubcategories.push({ name: "colors", label: "Colors", keys: colorProps })
      }
      if (spacingProps.length > 0) {
        styleSubcategories.push({ name: "spacing", label: "Spacing", keys: spacingProps })
      }
      if (borderProps.length > 0) {
        styleSubcategories.push({ name: "border", label: "Border", keys: borderProps })
      }
      if (otherStyleProps.length > 0) {
        styleSubcategories.push({ name: "other", label: "Other", keys: otherStyleProps })
      }

      const tabs = []
      
      // Always create Content tab if there are any content props, even if it's just className
      // Collect all props that should be in content (including className)
      const allContentProps = [...contentProps]
      
      // Ensure className is always in content if it exists in props and metadata
      if (config.props.className && tabbarSection.props.className && !allContentProps.includes('className')) {
        allContentProps.push('className')
      }
      
      // Content tab - always show if there are content props
      if (allContentProps.length > 0) {
        tabs.push({ name: "content", label: "Content", keys: allContentProps })
      }

      // Style tab with subcategories
      if (styleSubcategories.length > 0) {
        tabs.push({
          name: "style",
          label: "Style",
          keys: [],
          subcategories: styleSubcategories
        })
      }

      // If no tabs were created (shouldn't happen, but fallback just in case)
      if (tabs.length === 0) {
        // Collect all props that are defined in tabbarSection.props
        const allProps: string[] = []
        Object.entries(config.props).forEach(([key]) => {
          // Only include props that are actually defined in tabbarSection.props
          if (tabbarSection.props[key]) {
            allProps.push(key)
          }
        })
        
        if (allProps.length > 0) {
          tabs.push({ name: "general", label: "General", keys: allProps })
        } else {
          // If still no props, something is wrong - log for debugging
          console.warn(`Tabbar ${componentName}: No props found after filtering.`, {
            configProps: Object.keys(config.props),
            tabbarSectionProps: Object.keys(tabbarSection.props),
            tabbarSectionName: tabbarSection.name,
            tabbarSectionComponentName: tabbarSection.componentName,
          })
        }
      }

      if (tabs.length > 0) {
        return {
          type: "tabs",
          tabs
        }
      } else {
        // Fallback: return empty grouping to trigger fallback rendering
        console.warn(`Tabbar ${componentName}: No tabs created, falling back to default rendering.`)
      }
    }

    // For Card components, use detailed grouping
    // Try to find by componentName first, then by name
    const cardSection = cardSections.find((card: { componentName: string; name: string }) => 
      card.componentName === componentName || card.name === componentName
    )
    if (cardSection) {
      // Define style-related keys
      const colorKeys = [
        'backgroundColor', 'borderColor', 'textColor', 'linkColor', 'accentColor', 
        'buttonColor', 'overlayColor', 'glowColor1', 'glowColor2', 'revealColor', 
        'statusColor', 'categoryColor', 'badgeColor', 'iconColor', 'gradientFrom', 
        'gradientTo', 'bannerGradientFrom', 'bannerGradientVia', 'bannerGradientTo',
        'cardGradientFrom', 'cardGradientTo', 'outerGradientFrom', 'outerGradientTo'
      ]
      const spacingKeys = ['padding', 'margin', 'gap']
      const borderKeys = ['borderRadius', 'borderWidth']
      const otherStyleKeys = [
        'backdropBlur', 'overlayOpacity', 'gradientAnimated', 'gradientWidth',
        'cardGradientWidth', 'cardGradientAnimated', 'outerGradientWidth', 'outerGradientAnimated',
        'blur', 'opacity', 'shadow'
      ]

      const contentProps: string[] = []
      const colorProps: string[] = []
      const spacingProps: string[] = []
      const borderProps: string[] = []
      const otherStyleProps: string[] = []

      Object.entries(config.props).forEach(([key, propConfig]) => {
        const lowerKey = key.toLowerCase()
        const propType = propConfig.type
        
        // Check for style props first
        // Color props: explicit color keys or keys containing 'color', or prop type is 'color'
        if (colorKeys.includes(key) || lowerKey.includes('color') || propType === 'color') {
          colorProps.push(key)
        } 
        // Spacing props: explicit spacing keys or keys containing spacing keywords
        else if (spacingKeys.some(k => lowerKey.includes(k))) {
          spacingProps.push(key)
        } 
        // Border props: explicit border keys or keys containing 'border' or 'radius'
        else if (borderKeys.some(k => lowerKey.includes(k)) || lowerKey.includes('border') || lowerKey.includes('radius')) {
          borderProps.push(key)
        } 
        // Other style props: explicit other style keys or keys containing style keywords, or slider/number props that are style-related
        else if (
          otherStyleKeys.includes(key) || 
          lowerKey.includes('blur') || 
          lowerKey.includes('opacity') || 
          lowerKey.includes('gradient') ||
          lowerKey.includes('shadow') ||
          (propType === 'slider' && (lowerKey.includes('opacity') || lowerKey.includes('blur') || lowerKey.includes('width')))
        ) {
          otherStyleProps.push(key)
        } 
        // Content props: everything else (text, textarea, number, boolean, select that aren't style-related)
        else {
          contentProps.push(key)
        }
      })

      // Build style subcategories
      const styleSubcategories = []
      if (colorProps.length > 0) {
        styleSubcategories.push({ name: "colors", label: "Colors", keys: colorProps })
      }
      if (spacingProps.length > 0) {
        styleSubcategories.push({ name: "spacing", label: "Spacing", keys: spacingProps })
      }
      if (borderProps.length > 0) {
        styleSubcategories.push({ name: "border", label: "Border", keys: borderProps })
      }
      if (otherStyleProps.length > 0) {
        styleSubcategories.push({ name: "other", label: "Other", keys: otherStyleProps })
      }

      const tabs = []
      
      // Content tab with subcategories for special cards
      if (contentProps.length > 0) {
        const contentSubcategories: Array<{ name: string; label: string; keys: string[] }> = []
        
        // Special handling for specific cards
        if (componentName === "PricingCard") {
          const featuresKey = contentProps.find(k => k === "features")
          const otherContent = contentProps.filter(k => k !== "features")
          if (featuresKey) {
            contentSubcategories.push({ name: "features", label: "Features", keys: [featuresKey] })
          }
          if (otherContent.length > 0) {
            contentSubcategories.push({ name: "general", label: "General", keys: otherContent })
          }
        } else if (componentName === "SkillCard") {
          const skillsKey = contentProps.find(k => k === "skills")
          const otherContent = contentProps.filter(k => k !== "skills")
          if (skillsKey) {
            contentSubcategories.push({ name: "skills", label: "Skills", keys: [skillsKey] })
          }
          if (otherContent.length > 0) {
            contentSubcategories.push({ name: "general", label: "General", keys: otherContent })
          }
        } else if (componentName === "ComparisonCard") {
          const rowsKey = contentProps.find(k => k === "rows")
          const otherContent = contentProps.filter(k => k !== "rows")
          if (rowsKey) {
            contentSubcategories.push({ name: "rows", label: "Comparison Rows", keys: [rowsKey] })
          }
          if (otherContent.length > 0) {
            contentSubcategories.push({ name: "general", label: "General", keys: otherContent })
          }
        } else if (componentName === "RoadmapCard") {
          const itemsKey = contentProps.find(k => k === "items")
          const otherContent = contentProps.filter(k => k !== "items")
          if (itemsKey) {
            contentSubcategories.push({ name: "items", label: "Roadmap Items", keys: [itemsKey] })
          }
          if (otherContent.length > 0) {
            contentSubcategories.push({ name: "general", label: "General", keys: otherContent })
          }
        } else if (componentName === "WeatherCard") {
          const forecastKey = contentProps.find(k => k === "hourlyForecast")
          const otherContent = contentProps.filter(k => k !== "hourlyForecast")
          if (forecastKey) {
            contentSubcategories.push({ name: "forecast", label: "Hourly Forecast", keys: [forecastKey] })
          }
          if (otherContent.length > 0) {
            contentSubcategories.push({ name: "general", label: "General", keys: otherContent })
          }
        }

        if (contentSubcategories.length > 0) {
          tabs.push({
            name: "content",
            label: "Content",
            keys: [],
            subcategories: contentSubcategories
          })
        } else {
          tabs.push({ name: "content", label: "Content", keys: contentProps })
        }
      }

      // Style tab with subcategories
      if (styleSubcategories.length > 0) {
        tabs.push({
          name: "style",
          label: "Style",
          keys: [],
          subcategories: styleSubcategories
        })
      }

      if (tabs.length > 0) {
        return {
          type: "tabs",
          tabs
        }
      }
    }

    // For ChatInterface, group props into General and Color tabs
    if (componentName === "ChatInterface") {
      const colorRelatedKeys = [
        'headerBgColor', 'headerBorderColor', 'headerTextColor', 'headerStatusColor',
        'bodyBgColor',
        'ownMessageColor', 'otherMessageColor', 'messageTextColor', 'timeTextColor',
        'footerBgColor', 'footerBorderColor', 'footerInputBgColor', 'footerButtonColor', 'footerFocusBorderColor'
      ]
      const hiddenProps = ['headerUserStatusCustom'] // Handled inline with headerUserStatus

      const generalProps: string[] = []
      const colorProps: string[] = []

      Object.entries(config.props).forEach(([key]) => {
        if (hiddenProps.includes(key)) return
        if (colorRelatedKeys.includes(key)) {
          colorProps.push(key)
        } else {
          generalProps.push(key)
        }
      })

      return {
        type: "tabs",
        tabs: [
          { name: "general", label: "General", keys: generalProps },
          { name: "color", label: "Color", keys: colorProps },
        ],
        hiddenProps,
      }
    }

    // For GlassAuthForm, group props into General and Color tabs
    if (componentName === "GlassAuthForm") {
      const colorRelatedKeys = [
        'backgroundColor', 'borderColor', 'textColor',
        'iconGradientFrom', 'iconGradientTo',
        'orb1Color', 'orb2Color',
        'buttonColor',
        'socialButtonBgColor', 'socialButtonBorderColor',
        'inputLabelColor', 'inputBgColor', 'inputBorderColor', 'inputTextColor', 'focusBorderColor',
        'cardGradientFrom', 'cardGradientTo', 'cardGradientWidth', 'cardGradientAnimated',
        'outerGradientFrom', 'outerGradientTo', 'outerGradientWidth', 'outerGradientAnimated',
        'borderRadius', 'padding', 'backdropBlur'
      ]

      const generalProps: string[] = []
      const colorProps: string[] = []

      Object.entries(config.props).forEach(([key]) => {
        if (colorRelatedKeys.includes(key)) {
          colorProps.push(key)
        } else {
          generalProps.push(key)
        }
      })

      return {
        type: "tabs",
        tabs: [
          { name: "general", label: "General", keys: generalProps },
          { name: "color", label: "Color", keys: colorProps },
        ],
      }
    }

    // Generic grouping for Hero sections and other components
    const contentProps: string[] = []
    const elementsPropsMap: Record<string, string[]> = {}
    
    // Sub-component prefixes to identify properties belonging to specific elements
    const elementPrefixes = [
      { prefix: 'button', group: 'Button' },
      { prefix: 'cta', group: 'Button' },
      { prefix: 'primaryCta', group: 'Button' },
      { prefix: 'secondaryCta', group: 'Button' },
      { prefix: 'primaryStore', group: 'Button' },
      { prefix: 'secondaryStore', group: 'Button' },
      { prefix: 'playButton', group: 'Button' },
      { prefix: 'pill', group: 'Badge' },
      { prefix: 'badge', group: 'Badge' },
      { prefix: 'tag', group: 'Badge' },
      { prefix: 'input', group: 'Input' },
      { prefix: 'placeholder', group: 'Input' },
      { prefix: 'card', group: 'Card' },
      { prefix: 'preview', group: 'Card' },
      { prefix: 'terminal', group: 'Card' },
      { prefix: 'phone', group: 'Mockup' },
      { prefix: 'icon', group: 'Icon' },
      { prefix: 'link', group: 'Navbar' },
      { prefix: 'menu', group: 'Navbar' },
    ]
    
    // Separate maps for Navbar and Submenu
    const navbarProps: string[] = []
    const submenuProps: string[] = []
    
    // Style subcategories
    const stylePropsMap: Record<string, string[]> = {
      spacing: [],
      typography: [],
      border: [],
      shadow: [],
      animation: [],
      layout: [],
      other: []
    }

    Object.keys(config.props).forEach((key) => {
      const lowerKey = key.toLowerCase()
      
      // Special case: navigationConfig stays in Content tab
      if (key === 'navigationConfig') {
        contentProps.push(key)
        return
      }
      
      // Special case: navInteractionMode and navbar props (nav*, link*, menu* but not submenu*)
      if (key === 'navInteractionMode' || (key.startsWith('nav') && !key.startsWith('submenu'))) {
        navbarProps.push(key)
        return
      }
      
      // Special case: submenu props go to Submenu
      if (key.startsWith('submenu')) {
        submenuProps.push(key)
        return
      }
      
      // 1. Check for Elements first
      // But exclude some common content keys that might accidentally match like 'icon' in 'showIcon' if we are not careful
      // We should check if it STARTS with the prefix.
      const elementMatch = elementPrefixes.find(item => key.startsWith(item.prefix))
      
      // Special case: don't capture "show..." props into elements unless it's style related? 
      // Actually "showPill" usually goes to Content. 
      // Let's exclude "show" prefixes from elements grouping to keep them in Content.
      if (elementMatch && !key.startsWith('show')) {
        const groupName = elementMatch.group
        if (!elementsPropsMap[groupName]) elementsPropsMap[groupName] = []
        elementsPropsMap[groupName].push(key)
        return
      }
      
      // Helper to check containment
      const matches = (keywords: string[]) => keywords.some(k => lowerKey.includes(k))

      // Spacing
      if (matches(['padding', 'margin', 'gap'])) {
        stylePropsMap.spacing.push(key)
        return
      }

      // Border (check before typography/color because matches 'border')
      if (matches(['border'])) {
        stylePropsMap.border.push(key)
        return
      }

      // Shadow
      if (matches(['shadow'])) {
        stylePropsMap.shadow.push(key)
        return
      }

      // Typography
      if (
        matches(['font', 'lineheight', 'letterspacing']) ||
        (matches(['text']) && matches(['size', 'align', 'decoration', 'transform', 'indent', 'overflow', 'weight', 'style']))
      ) { 
         stylePropsMap.typography.push(key)
         return
      }

      // Animation
      if (matches(['transition', 'duration', 'timing', 'ease'])) {
        stylePropsMap.animation.push(key)
        return
      }

      // Layout
      if (matches(['flex', 'justify', 'align', 'direction'])) {
        stylePropsMap.layout.push(key)
        return
      }

      // Other Style Props
      if (
        lowerKey.includes("color") ||
        lowerKey.includes("background") ||
        lowerKey.includes("gradient") ||
        lowerKey.includes("opacity") ||
        lowerKey.includes("blur") ||
        lowerKey.includes("overlay") ||
        config.props[key].type === "color" ||
        config.props[key].type.startsWith("color-")
      ) {
        stylePropsMap.other.push(key)
        return
      }

      // If none of the above, it's content
      contentProps.push(key)
    })

    // Create style subcategories configuration
    const styleSubcategories = [
      { name: "spacing", label: "Spacing", keys: stylePropsMap.spacing },
      { name: "typography", label: "Typography", keys: stylePropsMap.typography },
      { name: "border", label: "Border", keys: stylePropsMap.border },
      { name: "shadow", label: "Shadow", keys: stylePropsMap.shadow },
      { name: "animation", label: "Animation", keys: stylePropsMap.animation },
      { name: "layout", label: "Layout", keys: stylePropsMap.layout },
      { name: "other", label: "Other", keys: stylePropsMap.other },
    ].filter(sub => sub.keys.length > 0)

    // Remove 'Navbar' from elementsPropsMap if it exists, since we handle it separately
    if (elementsPropsMap['Navbar']) {
      delete elementsPropsMap['Navbar']
    }
    
    // Create element subcategories
    const elementSubcategories = Object.entries(elementsPropsMap).map(([name, keys]) => ({
      name: name.toLowerCase(),
      label: name,
      keys
    }))
    
    // Add Navbar and Submenu as separate subcategories if they have props
    if (navbarProps.length > 0) {
      elementSubcategories.push({
        name: 'navbar',
        label: 'Navbar',
        keys: navbarProps
      })
    }
    if (submenuProps.length > 0) {
      elementSubcategories.push({
        name: 'submenu',
        label: 'Submenu',
        keys: submenuProps
      })
    }

    // Calculate states
    const hasStyleProps = styleSubcategories.length > 0
    // const hasElementProps = elementSubcategories.length > 0 // No longer needed as a single group

    const tabs = []
    if (contentProps.length > 0) {
      tabs.push({ name: "content", label: "Content", keys: contentProps })
    }
    
    if (hasStyleProps) {
      tabs.push({ 
        name: "style", 
        label: "Style", 
        keys: [], 
        subcategories: styleSubcategories
      })
    }

    // Add Components tab with subcategories for each element group
    if (elementSubcategories.length > 0) {
      tabs.push({
        name: "components",
        label: "Components",
        keys: [],
        subcategories: elementSubcategories
      })
    }

    if (tabs.length > 0) {
      return {
        type: "tabs",
        tabs
      }
    }

    // Default: show all props in General section
    return {
      type: "sections",
      sections: [
        {
          name: "general",
          label: "General",
          keys: Object.keys(config.props),
        },
      ],
    }
  }

  const grouping = getGroupingConfig()

  // Filter out hidden props
  const visibleProps = Object.entries(config.props).filter(
    ([key]) => !grouping.hiddenProps?.includes(key)
  )

  // Show message if there are no customizable props
  if (visibleProps.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-8 text-center">
        <p className="text-sm text-muted-foreground mb-2">
          This component has no customizable properties.
        </p>
        <p className="text-xs text-muted-foreground">
          Copy the code below and modify it directly in your project.
        </p>
      </div>
    )
  }

  if (grouping.type === "tabs" && grouping.tabs) {
    return (
      <Tabs defaultValue={grouping.tabs[0]?.name || "general"} className="w-full">
        <TabsList className="grid w-full grid-flow-col auto-cols-fr h-auto">
          {grouping.tabs.map((tab) => (
            <TabsTrigger key={tab.name} value={tab.name} className="whitespace-normal h-full py-2">
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>
        {grouping.tabs.map((tab) => (
          <TabsContent key={tab.name} value={tab.name} className="space-y-4 mt-4">
            {tab.subcategories && tab.subcategories.length > 0 ? (
              <Tabs defaultValue={tab.subcategories[0]?.name} className="w-full">
                <div className="overflow-x-auto pb-2 -mx-1 px-1">
                  <TabsList className="inline-flex h-9 items-center justify-start rounded-lg bg-muted p-1 w-auto min-w-full">
                    {tab.subcategories.map((sub) => (
                      <TabsTrigger 
                        key={sub.name} 
                        value={sub.name} 
                        className="text-xs px-3 py-1 h-7 flex-1 whitespace-nowrap"
                      >
                        {sub.label}
                      </TabsTrigger>
                    ))}
                  </TabsList>
                </div>
                {tab.subcategories.map((sub) => (
                  <TabsContent key={sub.name} value={sub.name} className="space-y-4 mt-2">
                    {sub.keys.map((key, index) => {
                      const propConfig = config.props[key]
                      if (!propConfig) return null
                      return renderProp(key, propConfig, index === sub.keys.length - 1)
                    })}
                  </TabsContent>
                ))}
              </Tabs>
            ) : (
              tab.keys.map((key, index) => {
                const propConfig = config.props[key]
                if (!propConfig) return null
                return renderProp(key, propConfig, index === tab.keys.length - 1)
              })
            )}
          </TabsContent>
        ))}
      </Tabs>
    )
  }

  // Sections layout
  if (grouping.type === "sections" && grouping.sections) {
    return (
      <div className="space-y-6">
        {grouping.sections.map((section) => (
          <div key={section.name} className="space-y-4">
            <div className="flex items-center gap-2">
              <h4 className="font-medium text-sm text-muted-foreground">{section.label}</h4>
              <Separator className="flex-1" />
            </div>
            {section.keys.map((key, index) => {
              const propConfig = config.props[key]
              if (!propConfig) return null
              return renderProp(key, propConfig, index === section.keys.length - 1)
            })}
          </div>
        ))}
      </div>
    )
  }

  // Fallback: show all props
  return (
    <div className="space-y-4">
      {visibleProps.map(([key, propConfig], index) =>
        renderProp(key, propConfig, index === visibleProps.length - 1)
      )}
    </div>
  )
}

