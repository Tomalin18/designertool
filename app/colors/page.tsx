"use client"

import { useState } from "react"
import { Copy, Check, Info } from 'lucide-react'
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

const colorPalettes = [
  { name: "Pikachu", colors: ["#FFD700", "#FFA500", "#000000", "#FF0000"], description: "Electric yellow with bold accents" },
  { name: "Bulbasaur", colors: ["#49D0B0", "#78C850", "#5A9F8C", "#2B5E4E"], description: "Fresh green garden vibes" },
  { name: "Charmander", colors: ["#F08030", "#FF4500", "#FFD700", "#FFA500"], description: "Fiery warm orange palette" },
  { name: "Squirtle", colors: ["#6890F0", "#4F8EC9", "#9DD4FF", "#2B5E8C"], description: "Cool blue water tones" },
  { name: "Jigglypuff", colors: ["#FFB3D9", "#FF69B4", "#FFC0CB", "#FF1493"], description: "Soft pink dreamland" },
  { name: "Gengar", colors: ["#705898", "#9B4F96", "#483D8B", "#301934"], description: "Mysterious purple shadows" },
  { name: "Eevee", colors: ["#D4A373", "#8B6F47", "#F4E4C1", "#5C4033"], description: "Warm brown earthy tones" },
  { name: "Mewtwo", colors: ["#A95FA4", "#D291BC", "#7B5C8F", "#E8B4E8"], description: "Psychic lavender hues" },
  { name: "Charizard", colors: ["#FF6F00", "#D84315", "#FFA726", "#BF360C"], description: "Intense dragon fire" },
  { name: "Dragonite", colors: ["#FFB74D", "#FF9800", "#FFF3E0", "#F57C00"], description: "Sunset orange warmth" },
  { name: "Snorlax", colors: ["#37474F", "#263238", "#B0BEC5", "#546E7A"], description: "Calm slate gray" },
  { name: "Lapras", colors: ["#0288D1", "#01579B", "#B3E5FC", "#4FC3F7"], description: "Ocean blue depths" },
  { name: "Mew", colors: ["#F8BBD0", "#E91E63", "#FCE4EC", "#C2185B"], description: "Playful pink energy" },
  { name: "Gyarados", colors: ["#1976D2", "#0D47A1", "#D32F2F", "#B71C1C"], description: "Stormy blue and red" },
  { name: "Articuno", colors: ["#81D4FA", "#4FC3F7", "#E1F5FE", "#0277BD"], description: "Icy light blue" },
  { name: "Zapdos", colors: ["#FFF176", "#FBC02D", "#FFF9C4", "#F57F17"], description: "Electric bright yellow" },
  { name: "Moltres", colors: ["#FF7043", "#E64A19", "#FFCCBC", "#BF360C"], description: "Flame orange red" },
  { name: "Vaporeon", colors: ["#4DD0E1", "#00ACC1", "#B2EBF2", "#006064"], description: "Aqua teal waters" },
  { name: "Jolteon", colors: ["#FFEB3B", "#F9A825", "#FFF59D", "#F57F17"], description: "Lightning yellow spark" },
  { name: "Flareon", colors: ["#FF6F00", "#E65100", "#FFD54F", "#EF6C00"], description: "Blazing amber fire" },
  { name: "Umbreon", colors: ["#212121", "#000000", "#FFD600", "#616161"], description: "Dark night with gold" },
  { name: "Espeon", colors: ["#AB47BC", "#6A1B9A", "#E1BEE7", "#8E24AA"], description: "Mystic purple dawn" },
  { name: "Leafeon", colors: ["#66BB6A", "#388E3C", "#C8E6C9", "#2E7D32"], description: "Fresh leaf green" },
  { name: "Glaceon", colors: ["#4FC3F7", "#0288D1", "#B3E5FC", "#01579B"], description: "Frozen ice crystal" },
  { name: "Sylveon", colors: ["#F8BBD0", "#EC407A", "#FCE4EC", "#C2185B"], description: "Fairy pink ribbon" },
  { name: "Lucario", colors: ["#0277BD", "#01579B", "#78909C", "#37474F"], description: "Steel blue aura" },
  { name: "Rayquaza", colors: ["#558B2F", "#33691E", "#212121", "#1B5E20"], description: "Sky dragon emerald" },
  { name: "Kyogre", colors: ["#1565C0", "#0D47A1", "#E3F2FD", "#1976D2"], description: "Deep sea sapphire" },
  { name: "Groudon", colors: ["#D32F2F", "#B71C1C", "#FF6F00", "#E65100"], description: "Earth magma red" },
  { name: "Dialga", colors: ["#607D8B", "#455A64", "#90CAF9", "#1976D2"], description: "Time steel blue" },
  { name: "Palkia", colors: ["#AD1457", "#880E4F", "#E1BEE7", "#AB47BC"], description: "Space pearl purple" },
  { name: "Giratina", colors: ["#424242", "#212121", "#EF5350", "#C62828"], description: "Shadow realm dark" },
  { name: "Arceus", colors: ["#FAFAFA", "#BDBDBD", "#FDD835", "#F57F17"], description: "Divine white gold" },
  { name: "Victini", colors: ["#FFD54F", "#FFA000", "#FF6F00", "#E65100"], description: "Victory flame gold" },
  { name: "Zekrom", colors: ["#212121", "#000000", "#0288D1", "#01579B"], description: "Thunder black blue" },
  { name: "Reshiram", colors: ["#FAFAFA", "#E0E0E0", "#EF5350", "#D32F2F"], description: "Truth white fire" },
  { name: "Kyurem", colors: ["#4DD0E1", "#00ACC1", "#FFD54F", "#F9A825"], description: "Ice dragon cyan" },
  { name: "Xerneas", colors: ["#42A5F5", "#1976D2", "#F06292", "#C2185B"], description: "Life rainbow blue" },
  { name: "Yveltal", colors: ["#E53935", "#B71C1C", "#212121", "#424242"], description: "Destruction dark red" },
  { name: "Zygarde", colors: ["#66BB6A", "#388E3C", "#212121", "#00E676"], description: "Order earth green" },
  { name: "Solgaleo", colors: ["#FFECB3", "#FF8F00", "#FAFAFA", "#F57F17"], description: "Sun radiant gold" },
  { name: "Lunala", colors: ["#9C27B0", "#4A148C", "#7C4DFF", "#311B92"], description: "Moon cosmic purple" },
  { name: "Necrozma", colors: ["#424242", "#212121", "#FFD600", "#FBC02D"], description: "Prism dark light" },
  { name: "Ocean Breeze", colors: ["#006994", "#13ABC4", "#7FD1DE", "#B8E6F0"], description: "Calm ocean waves" },
  { name: "Sunset Glow", colors: ["#FF6B35", "#F7931E", "#FDC830", "#FFE66D"], description: "Golden hour warmth" },
  { name: "Forest Deep", colors: ["#2D4A2B", "#5C8D5A", "#9BCF99", "#D4E8D3"], description: "Dense woodland" },
  { name: "Lavender Dream", colors: ["#B39CD0", "#D4AADB", "#E6CEF0", "#F5E6FF"], description: "Soft purple haze" },
  { name: "Cherry Blossom", colors: ["#FFB7C5", "#FFC8DD", "#FFDDEB", "#FFF0F5"], description: "Spring petal pink" },
  { name: "Mint Fresh", colors: ["#3EB489", "#5FD3A5", "#8BE6C1", "#B8F2DD"], description: "Cool mint breeze" },
  { name: "Coral Reef", colors: ["#FF6F61", "#FF8F7F", "#FFAF9D", "#FFCFBB"], description: "Vibrant coral life" },
  { name: "Midnight Sky", colors: ["#191970", "#4169E1", "#6495ED", "#87CEEB"], description: "Starry night blue" },
  { name: "Golden Hour", colors: ["#C89F5F", "#E0C097", "#F5E1CF", "#FFF8E7"], description: "Warm sunset beige" },
  { name: "Berry Mix", colors: ["#8E44AD", "#C0392B", "#E74C3C", "#F39C12"], description: "Rich fruit tones" },
  { name: "Tropical", colors: ["#16A085", "#27AE60", "#F39C12", "#E74C3C"], description: "Exotic paradise" },
  { name: "Vintage", colors: ["#8B7355", "#A0826D", "#C9B299", "#E8DCC7"], description: "Classic sepia tone" },
]

export default function ColorsPage() {
  const [selectedPalette, setSelectedPalette] = useState(colorPalettes[0])
  const [copiedColor, setCopiedColor] = useState<string | null>(null)

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopiedColor(text)
    setTimeout(() => setCopiedColor(null), 2000)
  }

  const copyPaletteAsJSON = () => {
    const colorRoles = ["primary", "secondary", "accent", "highlight"]
    const paletteJSON = {
      name: selectedPalette.name,
      description: selectedPalette.description,
      colors: selectedPalette.colors.map((color, index) => ({
        role: colorRoles[index] || `color${index + 1}`,
        value: color
      }))
    }
    const jsonString = JSON.stringify(paletteJSON, null, 2)
    copyToClipboard(jsonString)
  }

  return (
    <div className="container flex-1 items-start md:grid md:grid-cols-[280px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[320px_minmax(0,1fr)] lg:gap-10">
      <style jsx global>{`
        .color-themed-switch[data-state="checked"] {
          background-color: ${selectedPalette.colors[0]} !important;
        }
        .color-themed-select:focus {
          border-color: ${selectedPalette.colors[0]} !important;
          box-shadow: 0 0 0 1px ${selectedPalette.colors[0]} !important;
        }
        .color-themed-dropdown-item:hover {
          background-color: ${selectedPalette.colors[0]}20 !important;
          color: ${selectedPalette.colors[0]} !important;
        }
      `}</style>

      <aside className="fixed top-14 z-30 -ml-2 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 overflow-y-auto border-r md:sticky md:block">
        <div className="py-6 pl-6 pr-4 lg:py-8 lg:pl-8">
          <h2 className="mb-4 text-lg font-semibold">Color Palettes</h2>
          <div className="space-y-2">
            {colorPalettes.map((palette) => (
              <button
                key={palette.name}
                onClick={() => setSelectedPalette(palette)}
                className={`w-full text-left rounded-lg p-3 transition-all ${
                  selectedPalette.name === palette.name
                    ? "bg-primary/10 border-2 border-primary"
                    : "bg-muted/50 hover:bg-muted border-2 border-transparent"
                }`}
              >
                <div className="flex gap-1 mb-2">
                  {palette.colors.map((color, idx) => (
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
            ))}
          </div>
        </div>
      </aside>

      <div className="py-8 md:py-12">
        {/* Color Info Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-4xl font-bold" style={{ color: selectedPalette.colors[0] }}>
              {selectedPalette.name}
            </h1>
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
          <div className="flex gap-2 mb-4">
            {selectedPalette.colors.map((color, idx) => (
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

        {/* Component Showcase */}
        <div className="space-y-8">
          {/* Buttons Section */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Buttons</h3>
            <div className="flex flex-wrap gap-4">
              <Button style={{ backgroundColor: selectedPalette.colors[0], color: "#fff" }}>
                Primary Button
              </Button>
              <Button
                variant="outline"
                style={{ borderColor: selectedPalette.colors[1], color: selectedPalette.colors[1] }}
              >
                Outline Button
              </Button>
              <Button
                variant="secondary"
                style={{ backgroundColor: selectedPalette.colors[2], color: "#fff" }}
              >
                Secondary
              </Button>
              <Button
                variant="ghost"
                style={{ color: selectedPalette.colors[0] }}
              >
                Ghost Button
              </Button>
            </div>
          </Card>

          {/* Cards Section */}
          <div className="grid gap-6 md:grid-cols-2">
            <Card className="p-6" style={{ borderColor: selectedPalette.colors[0] + "40" }}>
              <div className="flex items-center gap-2 mb-3">
                <Info className="h-5 w-5" style={{ color: selectedPalette.colors[0] }} />
                <h3 className="font-semibold" style={{ color: selectedPalette.colors[0] }}>
                  Information Card
                </h3>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                This is an example card component styled with the selected color palette.
              </p>
              <div className="flex gap-2">
                <Badge style={{ backgroundColor: selectedPalette.colors[1], color: "#fff" }}>
                  Badge
                </Badge>
                <Badge
                  variant="outline"
                  style={{ borderColor: selectedPalette.colors[2], color: selectedPalette.colors[2] }}
                >
                  Outline
                </Badge>
              </div>
            </Card>

            <Card className="p-6" style={{ borderColor: selectedPalette.colors[1] + "40" }}>
              <h3 className="font-semibold mb-4" style={{ color: selectedPalette.colors[1] }}>
                Form Elements
              </h3>
              <div className="space-y-4">
                <div>
                  <Label>Input Field</Label>
                  <Input
                    placeholder="Type something..."
                    style={{
                      borderColor: selectedPalette.colors[0],
                      "--tw-ring-color": selectedPalette.colors[0],
                    } as React.CSSProperties}
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Switch 
                    id="airplane-mode" 
                    className="color-themed-switch"
                    style={{
                      "--switch-checked-bg": selectedPalette.colors[0],
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
                    style={{ width: "65%", backgroundColor: selectedPalette.colors[0] }}
                  />
                </div>
              </div>

              <div className="flex gap-4">
                <Select>
                  <SelectTrigger 
                    className="w-[200px] color-themed-select"
                    style={{
                      borderColor: selectedPalette.colors[0],
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
                        e.currentTarget.style.backgroundColor = selectedPalette.colors[0] + "20"
                        e.currentTarget.style.color = selectedPalette.colors[0]
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
                        e.currentTarget.style.backgroundColor = selectedPalette.colors[0] + "20"
                        e.currentTarget.style.color = selectedPalette.colors[0]
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
                        e.currentTarget.style.backgroundColor = selectedPalette.colors[0] + "20"
                        e.currentTarget.style.color = selectedPalette.colors[0]
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
                        borderColor: selectedPalette.colors[0],
                        color: selectedPalette.colors[0],
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
                        e.currentTarget.style.backgroundColor = selectedPalette.colors[0] + "20"
                        e.currentTarget.style.color = selectedPalette.colors[0]
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
                        e.currentTarget.style.backgroundColor = selectedPalette.colors[0] + "20"
                        e.currentTarget.style.color = selectedPalette.colors[0]
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
                        e.currentTarget.style.backgroundColor = selectedPalette.colors[0] + "20"
                        e.currentTarget.style.color = selectedPalette.colors[0]
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
                borderColor: selectedPalette.colors[0],
                "--tw-ring-color": selectedPalette.colors[0],
              } as React.CSSProperties}
            />
          </Card>
        </div>
      </div>
    </div>
  )
}
