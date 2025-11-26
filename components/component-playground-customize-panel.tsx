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
      if (matches(['font', 'text', 'heading', 'lineheight']) && !matches(['texture', 'context'])) { 
         // exclude texture/context if they were to exist, mostly 'text' matches 'textColor'
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

    // Calculate if we have any style props
    const hasStyleProps = styleSubcategories.length > 0

    if (hasStyleProps) {
      return {
        type: "tabs",
        tabs: [
          { name: "content", label: "Content", keys: contentProps },
          { 
            name: "style", 
            label: "Style", 
            keys: [], // Keys are distributed in subcategories
            subcategories: styleSubcategories
          },
        ],
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
        <TabsList className="grid w-full grid-cols-2">
          {grouping.tabs.map((tab) => (
            <TabsTrigger key={tab.name} value={tab.name}>
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

