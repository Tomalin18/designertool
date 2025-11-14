"use client"

import { useState } from "react"
import { Search, Bold, Italic, Underline, Strikethrough, Copy, Check } from 'lucide-react'
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Toggle } from "@/components/ui/toggle"
import { getAllLineiconNames, filterLineicons } from "@/lib/lineicons-utils"

const fonts = [
  { name: "Inter", category: "Sans Serif", weights: [400, 500, 600, 700] },
  { name: "Roboto", category: "Sans Serif", weights: [300, 400, 500, 700] },
  { name: "Open Sans", category: "Sans Serif", weights: [400, 600, 700] },
  { name: "Lato", category: "Sans Serif", weights: [400, 700, 900] },
  { name: "Montserrat", category: "Sans Serif", weights: [400, 500, 600, 700, 800] },
  { name: "Poppins", category: "Sans Serif", weights: [400, 500, 600, 700] },
  { name: "Playfair Display", category: "Serif", weights: [400, 600, 700, 900] },
  { name: "Merriweather", category: "Serif", weights: [400, 700, 900] },
  { name: "Lora", category: "Serif", weights: [400, 500, 600, 700] },
  { name: "Crimson Text", category: "Serif", weights: [400, 600, 700] },
  { name: "Fira Code", category: "Monospace", weights: [400, 500, 600, 700] },
  { name: "JetBrains Mono", category: "Monospace", weights: [400, 500, 700] },
  { name: "Source Code Pro", category: "Monospace", weights: [400, 600, 700] },
  { name: "Dancing Script", category: "Handwriting", weights: [400, 700] },
  { name: "Pacifico", category: "Handwriting", weights: [400] },
]

const categories = ["All", "Sans Serif", "Serif", "Monospace", "Handwriting"]

export default function FontsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [fontSize, setFontSize] = useState([24])
  const [previewText, setPreviewText] = useState("The quick brown fox jumps over the lazy dog")
  const [fontStyles, setFontStyles] = useState<Record<string, { bold: boolean; italic: boolean; underline: boolean; strikethrough: boolean }>>({})
  const [copiedFont, setCopiedFont] = useState<string | null>(null)
  const [lineiconSearchQuery, setLineiconSearchQuery] = useState("")
  const [copiedLineicon, setCopiedLineicon] = useState<string | null>(null)
  
  const allLineicons = getAllLineiconNames()
  const filteredLineicons = lineiconSearchQuery 
    ? filterLineicons(lineiconSearchQuery)
    : allLineicons.slice(0, 50) // 預設顯示前 50 個

  const filteredFonts = fonts.filter((font) => {
    const matchesSearch = font.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "All" || font.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const toggleStyle = (fontName: string, style: 'bold' | 'italic' | 'underline' | 'strikethrough') => {
    setFontStyles(prev => ({
      ...prev,
      [fontName]: {
        ...prev[fontName],
        [style]: !prev[fontName]?.[style]
      }
    }))
  }

  const getTextStyle = (fontName: string) => {
    const styles = fontStyles[fontName] || {}
    const decorations = []
    if (styles.underline) decorations.push('underline')
    if (styles.strikethrough) decorations.push('line-through')
    
    return {
      fontWeight: styles.bold ? 'bold' : undefined,
      fontStyle: styles.italic ? 'italic' : undefined,
      textDecoration: decorations.length > 0 ? decorations.join(' ') : undefined,
    }
  }

  const copyFontInfo = async (fontName: string, weight: number) => {
    const styles = fontStyles[fontName] || {}
    const fontInfo = {
      fontFamily: fontName,
      fontSize: fontSize[0],
      fontWeight: weight,
      bold: styles.bold || false,
      italic: styles.italic || false,
      underline: styles.underline || false,
      strikethrough: styles.strikethrough || false,
    }
    
    try {
      await navigator.clipboard.writeText(JSON.stringify(fontInfo, null, 2))
      setCopiedFont(`${fontName}-${weight}`)
      setTimeout(() => setCopiedFont(null), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  const copyLineiconInfo = async (iconName: string) => {
    const className = iconName.startsWith("lni-") ? iconName : `lni-${iconName}`
    const code = `<i class="lni ${className}"></i>`
    
    try {
      await navigator.clipboard.writeText(code)
      setCopiedLineicon(iconName)
      setTimeout(() => setCopiedLineicon(null), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  return (
    <div className="container flex-1 items-start md:grid md:grid-cols-[240px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[280px_minmax(0,1fr)] lg:gap-10">
      {/* Left Sidebar */}
      <aside className="fixed top-14 z-30 -ml-2 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 overflow-y-auto border-r md:sticky md:block">
        <div className="py-6 pl-6 pr-6 lg:py-8 lg:pl-8">
          <div className="space-y-6">
            {/* Search */}
            <div>
              <h3 className="mb-3 text-sm font-semibold">Search</h3>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search fonts..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            {/* Categories */}
            <div>
              <h3 className="mb-3 text-sm font-semibold">Categories</h3>
              <div className="space-y-1">
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? "secondary" : "ghost"}
                    className="w-full justify-start"
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category}
                    {category === "All" && (
                      <Badge variant="outline" className="ml-auto">
                        {fonts.length}
                      </Badge>
                    )}
                    {category !== "All" && (
                      <Badge variant="outline" className="ml-auto">
                        {fonts.filter(f => f.category === category).length}
                      </Badge>
                    )}
                  </Button>
                ))}
              </div>
            </div>

            {/* Font List Overview */}
            <div>
              <h3 className="mb-3 text-sm font-semibold">
                Fonts ({filteredFonts.length})
              </h3>
              <div className="space-y-1 text-sm">
                {filteredFonts.slice(0, 10).map((font) => (
                  <button
                    key={font.name}
                    onClick={() => {
                      const element = document.getElementById(`font-${font.name}`)
                      element?.scrollIntoView({ behavior: 'smooth', block: 'start' })
                    }}
                    className="w-full text-left px-2 py-1.5 rounded hover:bg-accent transition-colors truncate"
                  >
                    {font.name}
                  </button>
                ))}
                {filteredFonts.length > 10 && (
                  <p className="px-2 py-1.5 text-muted-foreground text-xs">
                    +{filteredFonts.length - 10} more
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="relative py-6 lg:py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold tracking-tight mb-2">Font Library</h1>
          <p className="text-muted-foreground">Preview and explore different font families</p>
        </div>

        {/* Controls */}
        <div className="mb-8 space-y-4">
          <div className="flex items-center gap-4 max-w-2xl">
            <span className="text-sm font-medium min-w-[100px]">Preview Text:</span>
            <Input
              value={previewText}
              onChange={(e) => setPreviewText(e.target.value)}
              placeholder="Enter preview text..."
            />
          </div>

          <div className="flex items-center gap-4 max-w-2xl">
            <span className="text-sm font-medium min-w-[100px]">Font Size: {fontSize}px</span>
            <Slider
              value={fontSize}
              onValueChange={setFontSize}
              min={12}
              max={72}
              step={1}
              className="flex-1"
            />
          </div>
        </div>

        {/* Fonts List */}
        <div className="space-y-4">
          {filteredFonts.map((font) => (
            <Card key={font.name} id={`font-${font.name}`} className="p-6 scroll-mt-20">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-lg">{font.name}</h3>
                  <p className="text-sm text-muted-foreground">{font.category}</p>
                </div>
                <div className="flex gap-1">
                  <Toggle
                    size="sm"
                    pressed={fontStyles[font.name]?.bold}
                    onPressedChange={() => toggleStyle(font.name, 'bold')}
                    aria-label="Toggle bold"
                  >
                    <Bold className="h-4 w-4" />
                  </Toggle>
                  <Toggle
                    size="sm"
                    pressed={fontStyles[font.name]?.italic}
                    onPressedChange={() => toggleStyle(font.name, 'italic')}
                    aria-label="Toggle italic"
                  >
                    <Italic className="h-4 w-4" />
                  </Toggle>
                  <Toggle
                    size="sm"
                    pressed={fontStyles[font.name]?.underline}
                    onPressedChange={() => toggleStyle(font.name, 'underline')}
                    aria-label="Toggle underline"
                  >
                    <Underline className="h-4 w-4" />
                  </Toggle>
                  <Toggle
                    size="sm"
                    pressed={fontStyles[font.name]?.strikethrough}
                    onPressedChange={() => toggleStyle(font.name, 'strikethrough')}
                    aria-label="Toggle strikethrough"
                  >
                    <Strikethrough className="h-4 w-4" />
                  </Toggle>
                </div>
              </div>

              <div className="space-y-3">
                {font.weights.map((weight) => (
                  <div
                    key={weight}
                    className="border-b pb-3 last:border-0 group relative"
                    style={{
                      fontFamily: font.name,
                      fontSize: `${fontSize}px`,
                      fontWeight: weight,
                      ...getTextStyle(font.name),
                    }}
                  >
                    <span className="text-xs text-muted-foreground mr-3">{weight}</span>
                    {previewText}
                    <Button
                      variant="ghost"
                      size="sm"
                      className="absolute right-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={() => copyFontInfo(font.name, weight)}
                    >
                      {copiedFont === `${font.name}-${weight}` ? (
                        <Check className="h-4 w-4 text-green-500" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                ))}
              </div>
            </Card>
          ))}
          
          {filteredFonts.length === 0 && (
            <div className="text-center py-12 text-muted-foreground">
              No fonts found matching your criteria
            </div>
          )}
        </div>

        {/* Lineicons Icon Font Section */}
        <div className="mt-12 space-y-4">
          <div className="flex items-center gap-3 mb-6">
            <h2 className="text-3xl font-bold tracking-tight">Lineicons Icon Font</h2>
            <Badge variant="secondary">Icon Font</Badge>
          </div>
          
          <div className="mb-6">
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search Lineicons..."
                className="pl-10"
                value={lineiconSearchQuery}
                onChange={(e) => setLineiconSearchQuery(e.target.value)}
              />
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              Showing {filteredLineicons.length} of {allLineicons.length} icons
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {filteredLineicons.map((iconName) => {
              const className = iconName.startsWith("lni-") ? iconName : `lni-${iconName}`
              const displayName = iconName.replace(/^lni-/, "")
              
              return (
                <Card key={iconName} className="p-4 group relative">
                  <div className="flex flex-col items-center justify-center space-y-3">
                    <div 
                      className={`lni ${className}`}
                      style={{ fontSize: `${fontSize[0]}px` }}
                    />
                    <p className="text-xs text-center text-muted-foreground truncate w-full">
                      {displayName}
                    </p>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="absolute right-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity h-6 w-6 p-0"
                      onClick={() => copyLineiconInfo(iconName)}
                    >
                      {copiedLineicon === iconName ? (
                        <Check className="h-3 w-3 text-green-500" />
                      ) : (
                        <Copy className="h-3 w-3" />
                      )}
                    </Button>
                  </div>
                </Card>
              )
            })}
          </div>

          {filteredLineicons.length === 0 && (
            <div className="text-center py-12 text-muted-foreground">
              No icons found matching your search
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
