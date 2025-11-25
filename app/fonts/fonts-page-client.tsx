"use client"

import { useState, useEffect } from "react"
import { Search, Bold, Italic, Underline, Strikethrough, Copy, Check } from 'lucide-react'
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Toggle } from "@/components/ui/toggle"

import { useTheme } from "@/components/theme-provider"

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
    // Chinese (Traditional)
    { name: "Noto Sans TC", category: "Sans Serif", weights: [100, 300, 400, 500, 700, 900], previewText: "天地玄黃 宇宙洪荒 敏捷的棕色狐狸跳過了懶狗" },
    { name: "Noto Serif TC", category: "Serif", weights: [200, 300, 400, 500, 600, 700, 900], previewText: "天地玄黃 宇宙洪荒 敏捷的棕色狐狸跳過了懶狗" },
    // Japanese
    { name: "Noto Sans JP", category: "Sans Serif", weights: [100, 300, 400, 500, 700, 900], previewText: "いろはにほへと ちりぬるを わかよたれそ つねならむ" },
    { name: "Noto Serif JP", category: "Serif", weights: [200, 300, 400, 500, 600, 700, 900], previewText: "いろはにほへと ちりぬるを わかよたれそ つねならむ" },
    { name: "Zen Maru Gothic", category: "Sans Serif", weights: [300, 400, 500, 700, 900], previewText: "雨ニモマケズ 風ニモマケズ" },
    { name: "Kiwi Maru", category: "Serif", weights: [300, 400, 500], previewText: "吾輩は猫である。名前はまだ無い。" },
]

const categories = ["All", "Sans Serif", "Serif", "Monospace", "Handwriting"]

const DEFAULT_PREVIEW = "The quick brown fox jumps over the lazy dog"

import { GoogleFontLoader } from "@/components/google-font-loader"

export function FontsPageClient() {
    const { colorPalette, theme } = useTheme()

    const [searchQuery, setSearchQuery] = useState("")
    const [selectedCategory, setSelectedCategory] = useState("All")
    const [fontSize, setFontSize] = useState([24])
    const [previewText, setPreviewText] = useState(DEFAULT_PREVIEW)
    const [fontStyles, setFontStyles] = useState<Record<string, { bold: boolean; italic: boolean; underline: boolean; strikethrough: boolean }>>({})
    const [copiedFont, setCopiedFont] = useState<string | null>(null)

    const [mounted, setMounted] = useState(false)

    // Only run on client
    useEffect(() => {
        setMounted(true)
    }, [])

    // Get current theme mode colors
    const getCurrentColors = () => {
        if (!mounted || !colorPalette) return null

        const currentMode = theme === "system"
            ? (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light")
            : theme
        return currentMode === "dark" ? colorPalette.dark : colorPalette.light
    }

    const colors = getCurrentColors()

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

    return (
        <div className="container flex-1 items-start md:grid md:grid-cols-[240px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[280px_minmax(0,1fr)] lg:gap-10 px-4 md:px-8">
            <GoogleFontLoader fonts={fonts} />
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
                                        style={
                                            selectedCategory === category && colors
                                                ? {
                                                    backgroundColor: colors[0] + "20",
                                                    color: colors[0],
                                                    borderColor: colors[0] + "40",
                                                }
                                                : {}
                                        }
                                    >
                                        {category}
                                        {category === "All" && (
                                            <Badge
                                                variant="outline"
                                                className="ml-auto"
                                                style={colors ? { borderColor: colors[0] + "40", color: colors[0] } : {}}
                                            >
                                                {fonts.length}
                                            </Badge>
                                        )}
                                        {category !== "All" && (
                                            <Badge
                                                variant="outline"
                                                className="ml-auto"
                                                style={colors ? { borderColor: colors[0] + "40", color: colors[0] } : {}}
                                            >
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
                    <h1
                        className="text-4xl font-bold tracking-tight mb-2"
                        style={colors ? { color: colors[0] } : {}}
                    >
                        Font Library
                    </h1>
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
                        <Card
                            key={font.name}
                            id={`font-${font.name}`}
                            className="p-6 scroll-mt-20"
                            style={colors ? { borderColor: colors[0] + "20" } : {}}
                        >
                            <div className="mb-4 flex items-center justify-between">
                                <div>
                                    <h3
                                        className="font-semibold text-lg"
                                        style={colors ? { color: colors[0] } : {}}
                                    >
                                        {font.name}
                                    </h3>
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
                                            ...getTextStyle(font.name),
                                            fontWeight: getTextStyle(font.name).fontWeight || weight,
                                        }}
                                    >
                                        <span className="text-xs text-muted-foreground mr-3">{weight}</span>
                                        {previewText === DEFAULT_PREVIEW && (font as any).previewText ? (font as any).previewText : previewText}
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


            </main>
        </div>
    )
}
