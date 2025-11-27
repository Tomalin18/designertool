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
import { Plus, Trash2, GripVertical } from "lucide-react"
import { buttonSections } from "@/lib/button-sections"
import { cardSections } from "@/lib/card-sections"
import { badgeSections } from "@/lib/badge-sections"
import { inputSections } from "@/lib/input-sections"

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

