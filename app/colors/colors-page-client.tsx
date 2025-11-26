"use client"

import { useState, useEffect } from "react"
import { Copy, Check, Info } from 'lucide-react'
import { useTheme } from "@/components/theme-provider"
import { colorPalettes, type ColorPalette } from "@/lib/color-palette-utils"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function ColorsPageClient() {
    const { colorPalette, setColorPalette } = useTheme()
    // Always start with the first palette to ensure SSR/client hydration match
    const [selectedPalette, setSelectedPalette] = useState<ColorPalette>(colorPalettes[0])
    const [copiedColor, setCopiedColor] = useState<string | null>(null)

    // Sync selectedPalette with global colorPalette after hydration
    useEffect(() => {
        if (colorPalette) {
            setSelectedPalette(colorPalette)
        }
    }, [colorPalette])

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text)
        setCopiedColor(text)
        setTimeout(() => setCopiedColor(null), 2000)
    }

    const copyPaletteAsJSON = () => {
        const colorRoles = ["primary", "secondary", "accent", "ring"]
        const paletteJSON = {
            name: selectedPalette.name,
            description: selectedPalette.description,
            light: selectedPalette.light.map((color, index) => ({
                role: colorRoles[index] || `color${index + 1}`,
                value: color
            })),
            dark: selectedPalette.dark.map((color, index) => ({
                role: colorRoles[index] || `color${index + 1}`,
                value: color
            }))
        }
        const jsonString = JSON.stringify(paletteJSON, null, 2)
        copyToClipboard(jsonString)
    }

    return (
        <div className="flex flex-col md:flex-row container flex-1 items-start md:grid md:grid-cols-[280px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[320px_minmax(0,1fr)] lg:gap-10 px-4 md:px-8">
            <style jsx global>{`
        .color-themed-switch[data-state="checked"] {
          background-color: ${selectedPalette.light[0]} !important;
        }
        .color-themed-select:focus {
          border-color: ${selectedPalette.light[0]} !important;
          box-shadow: 0 0 0 1px ${selectedPalette.light[0]} !important;
        }
        .color-themed-dropdown-item:hover {
          background-color: ${selectedPalette.light[0]}20 !important;
          color: ${selectedPalette.light[0]} !important;
        }
      `}</style>

            {/* Mobile: Top horizontal scroll */}
            <div className="md:hidden w-full border-b bg-card mb-4">
                <div className="p-4">
                    <h2 className="text-sm font-semibold mb-3 text-muted-foreground uppercase tracking-wider">
                        Color Palettes
                    </h2>
                    <div className="flex gap-3 overflow-x-auto pb-2">
                        {colorPalettes.map((palette) => {
                            const isSelected = selectedPalette.name === palette.name
                            const isActive = colorPalette?.name === palette.name
                            return (
                                <button
                                    key={palette.name}
                                    onClick={() => {
                                        setSelectedPalette(palette)
                                        setColorPalette(palette.name)
                                    }}
                                    className={`flex-shrink-0 w-32 rounded-lg p-3 transition-all relative ${isSelected
                                        ? "bg-accent border-2 border-primary"
                                        : "bg-muted/50 hover:bg-muted border-2 border-transparent"
                                        }`}
                                >
                                    {isActive && (
                                        <div className="absolute top-2 right-2">
                                            <div className="h-2 w-2 rounded-full bg-primary" />
                                        </div>
                                    )}
                                    <div className="flex gap-1 mb-2">
                                        {palette.light.map((color, idx) => (
                                            <div
                                                key={idx}
                                                className="h-6 flex-1 rounded"
                                                style={{ backgroundColor: color }}
                                            />
                                        ))}
                                    </div>
                                    <div className="text-xs font-medium truncate">{palette.name}</div>
                                </button>
                            )
                        })}
                    </div>
                </div>
            </div>

            {/* Desktop: Left sidebar */}
            <aside className="hidden md:block fixed top-14 z-30 -ml-2 h-[calc(100vh-3.5rem)] w-full shrink-0 overflow-y-auto border-r md:sticky">
                <div className="py-6 pl-6 pr-4 lg:py-8 lg:pl-8">
                    <h2 className="mb-4 text-lg font-semibold">Color Palettes</h2>
                    <div className="space-y-2">
                        {colorPalettes.map((palette) => {
                            const isSelected = selectedPalette.name === palette.name
                            const isActive = colorPalette?.name === palette.name
                            return (
                                <button
                                    key={palette.name}
                                    onClick={() => {
                                        setSelectedPalette(palette)
                                        setColorPalette(palette.name)
                                    }}
                                    className={`w-full text-left rounded-lg p-3 transition-all relative ${isSelected
                                        ? "bg-primary/10 border-2 border-primary"
                                        : "bg-muted/50 hover:bg-muted border-2 border-transparent"
                                        }`}
                                >
                                    {isActive && (
                                        <div className="absolute top-2 right-2">
                                            <div className="h-2 w-2 rounded-full bg-primary" />
                                        </div>
                                    )}
                                    <div className="flex gap-1 mb-2">
                                        {palette.light.map((color, idx) => (
                                            <div
                                                key={idx}
                                                className="h-6 flex-1 rounded"
                                                style={{ backgroundColor: color }}
                                            />
                                        ))}
                                    </div>
                                    <div className="text-sm font-medium">{palette.name}</div>
                                    <div className="text-xs text-muted-foreground mt-1">
                                        {palette.description}
                                    </div>
                                </button>
                            )
                        })}
                    </div>
                </div>
            </aside>

            <div className="py-4 md:py-8 lg:py-12 w-full">
                {/* Color Info Header */}
                <div className="mb-8">
                    <div className="flex items-center gap-3 mb-2">
                        <h1 className="text-4xl font-bold" style={{ color: selectedPalette.light[0] }}>
                            {selectedPalette.name}
                        </h1>
                        {colorPalette?.name === selectedPalette.name && (
                            <Badge variant="outline" className="text-xs">
                                Active Theme
                            </Badge>
                        )}
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={copyPaletteAsJSON}
                            className="h-8 w-8 p-0"
                        >
                            {copiedColor && copiedColor.includes('"name"') ? (
                                <Check className="h-4 w-4 text-green-600" />
                            ) : (
                                <Copy className="h-4 w-4" />
                            )}
                        </Button>
                    </div>
                    <p className="text-muted-foreground mb-4">{selectedPalette.description}</p>

                    {/* Color Swatches */}
                    <div className="space-y-4 mb-4">
                        <div>
                            <h3 className="text-sm font-medium mb-2">Light Mode Colors</h3>
                            <div className="flex gap-2">
                                {selectedPalette.light.map((color, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => copyToClipboard(color)}
                                        className="flex-1 group relative"
                                    >
                                        <div
                                            className="h-24 rounded-lg transition-transform hover:scale-105"
                                            style={{ backgroundColor: color }}
                                        />
                                        <div className="mt-2 flex items-center justify-center gap-1 text-sm font-mono">
                                            {color}
                                            {copiedColor === color ? (
                                                <Check className="h-3 w-3 text-green-600" />
                                            ) : (
                                                <Copy className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                                            )}
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div>
                            <h3 className="text-sm font-medium mb-2">Dark Mode Colors</h3>
                            <div className="flex gap-2">
                                {selectedPalette.dark.map((color, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => copyToClipboard(color)}
                                        className="flex-1 group relative"
                                    >
                                        <div
                                            className="h-24 rounded-lg transition-transform hover:scale-105"
                                            style={{ backgroundColor: color }}
                                        />
                                        <div className="mt-2 flex items-center justify-center gap-1 text-sm font-mono">
                                            {color}
                                            {copiedColor === color ? (
                                                <Check className="h-3 w-3 text-green-600" />
                                            ) : (
                                                <Copy className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                                            )}
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Component Showcase */}
                <div className="space-y-8">
                    {/* Buttons Section */}
                    <Card className="p-6">
                        <h3 className="text-lg font-semibold mb-4">Buttons</h3>
                        <div className="flex flex-wrap gap-4">
                            <Button style={{ backgroundColor: selectedPalette.light[0], color: "#fff" }}>
                                Primary Button
                            </Button>
                            <Button
                                variant="outline"
                                style={{ borderColor: selectedPalette.light[1], color: selectedPalette.light[1] }}
                            >
                                Outline Button
                            </Button>
                            <Button
                                variant="secondary"
                                style={{ backgroundColor: selectedPalette.light[2], color: "#fff" }}
                            >
                                Secondary
                            </Button>
                            <Button
                                variant="ghost"
                                style={{ color: selectedPalette.light[0] }}
                            >
                                Ghost Button
                            </Button>
                        </div>
                    </Card>

                    {/* Cards Section */}
                    <div className="grid gap-6 md:grid-cols-2">
                        <Card className="p-6" style={{ borderColor: selectedPalette.light[0] + "40" }}>
                            <div className="flex items-center gap-2 mb-3">
                                <Info className="h-5 w-5" style={{ color: selectedPalette.light[0] }} />
                                <h3 className="font-semibold" style={{ color: selectedPalette.light[0] }}>
                                    Information Card
                                </h3>
                            </div>
                            <p className="text-sm text-muted-foreground mb-4">
                                This is an example card component styled with the selected color palette.
                            </p>
                            <div className="flex gap-2">
                                <Badge style={{ backgroundColor: selectedPalette.light[1], color: "#fff" }}>
                                    Badge
                                </Badge>
                                <Badge
                                    variant="outline"
                                    style={{ borderColor: selectedPalette.light[2], color: selectedPalette.light[2] }}
                                >
                                    Outline
                                </Badge>
                            </div>
                        </Card>

                        <Card className="p-6" style={{ borderColor: selectedPalette.light[1] + "40" }}>
                            <h3 className="font-semibold mb-4" style={{ color: selectedPalette.light[1] }}>
                                Form Elements
                            </h3>
                            <div className="space-y-4">
                                <div>
                                    <Label>Input Field</Label>
                                    <Input
                                        placeholder="Type something..."
                                        style={{
                                            borderColor: selectedPalette.light[0],
                                            "--tw-ring-color": selectedPalette.light[0],
                                        } as React.CSSProperties}
                                    />
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Switch
                                        id="airplane-mode"
                                        className="color-themed-switch"
                                        style={{
                                            "--switch-checked-bg": selectedPalette.light[0],
                                        } as React.CSSProperties}
                                    />
                                    <Label htmlFor="airplane-mode">Toggle Switch</Label>
                                </div>
                            </div>
                        </Card>
                    </div>

                    {/* Progress and Dropdown */}
                    <Card className="p-6">
                        <h3 className="text-lg font-semibold mb-4">Progress & Interactions</h3>
                        <div className="space-y-6">
                            <div>
                                <div className="flex justify-between mb-2">
                                    <span className="text-sm font-medium">Loading Progress</span>
                                    <span className="text-sm text-muted-foreground">65%</span>
                                </div>
                                <div className="h-2 bg-muted rounded-full overflow-hidden">
                                    <div
                                        className="h-full transition-all"
                                        style={{ width: "65%", backgroundColor: selectedPalette.light[0] }}
                                    />
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <Select>
                                    <SelectTrigger
                                        className="w-[200px] color-themed-select"
                                        style={{
                                            borderColor: selectedPalette.light[0],
                                        }}
                                    >
                                        <SelectValue placeholder="Select option" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem
                                            value="1"
                                            style={{
                                                backgroundColor: "transparent",
                                            }}
                                            onMouseEnter={(e) => {
                                                e.currentTarget.style.backgroundColor = selectedPalette.light[0] + "20"
                                                e.currentTarget.style.color = selectedPalette.light[0]
                                            }}
                                            onMouseLeave={(e) => {
                                                e.currentTarget.style.backgroundColor = "transparent"
                                                e.currentTarget.style.color = ""
                                            }}
                                        >
                                            Option 1
                                        </SelectItem>
                                        <SelectItem
                                            value="2"
                                            onMouseEnter={(e) => {
                                                e.currentTarget.style.backgroundColor = selectedPalette.light[0] + "20"
                                                e.currentTarget.style.color = selectedPalette.light[0]
                                            }}
                                            onMouseLeave={(e) => {
                                                e.currentTarget.style.backgroundColor = "transparent"
                                                e.currentTarget.style.color = ""
                                            }}
                                        >
                                            Option 2
                                        </SelectItem>
                                        <SelectItem
                                            value="3"
                                            onMouseEnter={(e) => {
                                                e.currentTarget.style.backgroundColor = selectedPalette.light[0] + "20"
                                                e.currentTarget.style.color = selectedPalette.light[0]
                                            }}
                                            onMouseLeave={(e) => {
                                                e.currentTarget.style.backgroundColor = "transparent"
                                                e.currentTarget.style.color = ""
                                            }}
                                        >
                                            Option 3
                                        </SelectItem>
                                    </SelectContent>
                                </Select>

                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button
                                            variant="outline"
                                            style={{
                                                borderColor: selectedPalette.light[0],
                                                color: selectedPalette.light[0],
                                            }}
                                        >
                                            Open Menu
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent>
                                        <DropdownMenuLabel>Menu Items</DropdownMenuLabel>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem
                                            className="color-themed-dropdown-item"
                                            onMouseEnter={(e) => {
                                                e.currentTarget.style.backgroundColor = selectedPalette.light[0] + "20"
                                                e.currentTarget.style.color = selectedPalette.light[0]
                                            }}
                                            onMouseLeave={(e) => {
                                                e.currentTarget.style.backgroundColor = "transparent"
                                                e.currentTarget.style.color = ""
                                            }}
                                        >
                                            Item 1
                                        </DropdownMenuItem>
                                        <DropdownMenuItem
                                            onMouseEnter={(e) => {
                                                e.currentTarget.style.backgroundColor = selectedPalette.light[0] + "20"
                                                e.currentTarget.style.color = selectedPalette.light[0]
                                            }}
                                            onMouseLeave={(e) => {
                                                e.currentTarget.style.backgroundColor = "transparent"
                                                e.currentTarget.style.color = ""
                                            }}
                                        >
                                            Item 2
                                        </DropdownMenuItem>
                                        <DropdownMenuItem
                                            onMouseEnter={(e) => {
                                                e.currentTarget.style.backgroundColor = selectedPalette.light[0] + "20"
                                                e.currentTarget.style.color = selectedPalette.light[0]
                                            }}
                                            onMouseLeave={(e) => {
                                                e.currentTarget.style.backgroundColor = "transparent"
                                                e.currentTarget.style.color = ""
                                            }}
                                        >
                                            Item 3
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>
                        </div>
                    </Card>

                    {/* Textarea */}
                    <Card className="p-6">
                        <h3 className="text-lg font-semibold mb-4">Text Area</h3>
                        <Textarea
                            placeholder="Enter your message here..."
                            rows={4}
                            style={{
                                borderColor: selectedPalette.light[0],
                                "--tw-ring-color": selectedPalette.light[0],
                            } as React.CSSProperties}
                        />
                    </Card>
                </div>
            </div>
        </div>
    )
}
