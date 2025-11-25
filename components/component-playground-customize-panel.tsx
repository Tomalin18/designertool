"use client"

import React from "react"
import { Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ColorPicker } from "@/components/ui/color-picker"

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
    }[]
    sections?: {
      name: string
      label: string
      keys: string[]
    }[]
    hiddenProps?: string[]
  }
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

        {propConfig.type === "slider" && (
          <div className="space-y-2">
            <Slider
              value={[props[key] !== undefined ? props[key] : propConfig.default]}
              onValueChange={([value]) => updateProp(key, value)}
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
            placeholder={propConfig.default || "#000000"}
            outputFormat="hex"
            defaultColor={propConfig.default || "#000000"}
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

        {!isLast && <Separator className="!mt-4" />}
      </div>
    )
  }

  // Get grouping configuration based on component
  const getGroupingConfig = (): {
    type: "tabs" | "sections"
    tabs?: { name: string; label: string; keys: string[] }[]
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

  if (grouping.type === "tabs" && grouping.tabs) {
    return (
      <Tabs defaultValue={grouping.tabs[0]?.name || "general"} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          {grouping.tabs.map((tab) => (
            <TabsTrigger key={tab.name} value={tab.name}>
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>
        {grouping.tabs.map((tab) => (
          <TabsContent key={tab.name} value={tab.name} className="space-y-4 mt-4">
            {tab.keys.map((key, index) => {
              const propConfig = config.props[key]
              if (!propConfig) return null
              return renderProp(key, propConfig, index === tab.keys.length - 1)
            })}
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

