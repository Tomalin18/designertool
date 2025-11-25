"use client"

import dynamic from "next/dynamic"
import { useState } from "react"
import { Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { componentsData, categories, ComponentInfo } from "@/lib/components-data"
import { componentDetails } from "@/lib/component-details"
import { SidebarNav } from "@/components/sidebar-nav"
import { heroSections } from "@/lib/hero-sections"

// Lazy load heavy components
const ComponentPreview = dynamic(() => import("@/components/component-preview").then(mod => mod.ComponentPreview), { ssr: false })

export function ComponentsPageClient() {
    const [selectedCategory, setSelectedCategory] = useState("All")
    const [searchQuery, setSearchQuery] = useState("")
    const [customizeSearch, setCustomizeSearch] = useState("")
    const [sectionSearch, setSectionSearch] = useState("")

    const filteredComponents = componentsData.filter((component) => {
        const matchesCategory = selectedCategory === "All" || component.category === selectedCategory
        const matchesSearch =
            component.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            component.description.toLowerCase().includes(searchQuery.toLowerCase())
        return matchesCategory && matchesSearch
    })

    const customComponents: ComponentInfo[] = [
      {
        name: "UrlInput",
        description: "A URL input component with gradient border effect and generate button.",
        href: "/components/url-input",
        category: "Forms",
        tags: componentDetails["url-input"]?.tags || [],
      },
      {
        name: "MediaPlayer",
        description: "A beautiful media player component with album art, playback controls, and progress bar.",
        href: "/components/media-player",
        category: "Display",
        tags: componentDetails["media-player"]?.tags || [],
      },
      {
        name: "ChatInterface",
        description: "A modern chat interface component with message bubbles, typing indicator, and input area.",
        href: "/components/chat-interface",
        category: "Display",
        tags: componentDetails["chat-interface"]?.tags || [],
      },
      {
        name: "SocialProfileCard",
        description: "A beautiful social profile card component with avatar, stats, and action buttons.",
        href: "/components/social-profile-card",
        category: "Display",
        tags: componentDetails["social-profile-card"]?.tags || [],
      },
      {
        name: "GlassAuthForm",
        description: "A beautiful glassmorphism authentication form component with floating label inputs and social login buttons.",
        href: "/components/glass-auth-form",
        category: "Forms",
        tags: componentDetails["glass-auth-form"]?.tags || [],
      },
    ]

    // Get all unique tags from custom components
    const allTags = Array.from(new Set(
        customComponents.flatMap(component => component.tags || [])
    )).sort()

    const filteredCustomComponents = customComponents.filter((component) => {
        const searchLower = customizeSearch.toLowerCase()
        const matchesSearch =
            component.name.toLowerCase().includes(searchLower) ||
            component.description.toLowerCase().includes(searchLower) ||
            (component.tags && component.tags.some(tag => tag.toLowerCase().includes(searchLower)))
        return matchesSearch
    })

    const filteredHeroSections = heroSections.filter((hero) => {
        const searchLower = sectionSearch.toLowerCase()
        const matchesSearch =
            hero.name.toLowerCase().includes(searchLower) ||
            hero.description.toLowerCase().includes(searchLower) ||
            hero.tags.some(tag => tag.toLowerCase().includes(searchLower))
        return matchesSearch
    })

    const sidebarItems = [
        {
            title: "Components",
            href: "/components",
            items: componentsData.map((component) => ({
                title: component.name,
                href: component.href,
            })),
        },
    ]

    return (
        <div className="container flex-1 items-start md:grid md:grid-cols-[220px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10 px-4 md:px-8">
            <aside className="fixed top-14 z-30 -ml-2 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 overflow-y-auto border-r md:sticky md:block">
                <div className="py-6 pl-6 pr-6 lg:py-8 lg:pl-8">
                    <SidebarNav items={sidebarItems} />
                </div>
            </aside>

            <section className="py-6 md:py-8">
                <Tabs defaultValue="customize" className="w-full">
                    <TabsList className="mb-6">
                        <TabsTrigger value="preview" className="hidden">Preview</TabsTrigger>
                        <TabsTrigger value="customize">Customize</TabsTrigger>
                        <TabsTrigger value="section">Section</TabsTrigger>
                    </TabsList>

                    {/* Preview Tab */}
                    <TabsContent value="preview" className="mt-0">
                        {/* Search and Filter */}
                        <div className="flex flex-col gap-4 mb-8">
                            {/* Search */}
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                                <Input
                                    type="search"
                                    placeholder="Search components..."
                                    className="pl-10"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>

                            {/* Category Filter */}
                            <div className="flex flex-wrap gap-2">
                                {categories.map((category) => (
                                    <Button
                                        key={category}
                                        variant={selectedCategory === category ? "default" : "outline"}
                                        size="sm"
                                        onClick={() => setSelectedCategory(category)}
                                    >
                                        {category}
                                    </Button>
                                ))}
                            </div>
                        </div>

                        {/* Components Grid */}
                        {filteredComponents.length > 0 ? (
                            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
                                {filteredComponents.map((component) => (
                                    <ComponentPreview key={component.name} {...component} />
                                ))}
                            </div>
                        ) : (
                            <div className="flex flex-col items-center justify-center py-12 text-center">
                                <p className="text-lg text-muted-foreground">No components found</p>
                                <p className="text-sm text-muted-foreground">Try adjusting your search or filter</p>
                            </div>
                        )}
                    </TabsContent>

                    {/* Customize Tab */}
                    <TabsContent value="customize" className="mt-0">
                        <div className="flex flex-col gap-4 mb-8">
                            {/* Search */}
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                                <Input
                                    type="search"
                                    placeholder="Search custom components by name, description, or tags..."
                                    className="pl-10"
                                    value={customizeSearch}
                                    onChange={(e) => setCustomizeSearch(e.target.value)}
                                />
                            </div>

                            {/* Tags Filter */}
                            {allTags.length > 0 && (
                                <div className="flex flex-wrap gap-2">
                                    {allTags.map((tag) => {
                                        const isSelected = customizeSearch.toLowerCase() === tag.toLowerCase()
                                        return (
                                            <Badge
                                                key={tag}
                                                variant={isSelected ? "default" : "secondary"}
                                                asChild
                                            >
                                                <button
                                                    type="button"
                                                    className="cursor-pointer hover:opacity-80 transition-opacity"
                                                    onClick={() => setCustomizeSearch(isSelected ? "" : tag)}
                                                >
                                                    {tag}
                                                </button>
                                            </Badge>
                                        )
                                    })}
                                </div>
                            )}
                        </div>

                        {/* Custom Components */}
                        {filteredCustomComponents.length > 0 ? (
                            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                                {filteredCustomComponents.map((component) => (
                                    <ComponentPreview key={component.name} {...component} />
                                ))}
                            </div>
                        ) : (
                            <div className="flex flex-col items-center justify-center py-12 text-center border-2 border-dashed rounded-lg">
                                <p className="text-lg font-medium mb-2">Your Custom Components</p>
                                <p className="text-sm text-muted-foreground">Custom components you create will appear here</p>
                            </div>
                        )}
                    </TabsContent>

                    {/* Section Tab */}
                    <TabsContent value="section" className="mt-0">
                        <div className="flex flex-col gap-4 mb-8">
                            {/* Search */}
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                                <Input
                                    type="search"
                                    placeholder="Search section components..."
                                    className="pl-10"
                                    value={sectionSearch}
                                    onChange={(e) => setSectionSearch(e.target.value)}
                                />
                            </div>
                        </div>

                        {filteredHeroSections.length > 0 ? (
                            <div className="grid gap-6 grid-cols-1">
                                {filteredHeroSections.map((hero) => (
                                    <ComponentPreview
                                        key={hero.slug}
                                        name={hero.name}
                                        description={hero.description}
                                        href={`/components/${hero.slug}`}
                                        category="Sections"
                                    />
                                ))}
                            </div>
                        ) : (
                            <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed py-12 text-center text-muted-foreground">
                                <p className="text-lg font-medium">No hero sections found</p>
                                <p className="text-sm">Try adjusting your search.</p>
                            </div>
                        )}
                    </TabsContent>
                </Tabs>
            </section>
        </div>
    )
}
