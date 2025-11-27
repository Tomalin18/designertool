"use client"

import dynamic from "next/dynamic"
import { useState, useEffect, useRef } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { Search, List } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { componentsData, categories, ComponentInfo } from "@/lib/components-data"
import { componentDetails } from "@/lib/component-details"
import { SidebarNav } from "@/components/sidebar-nav"
import { headerSections } from "@/lib/header-sections"
import { heroSections } from "@/lib/hero-sections"
import { featureSections } from "@/lib/feature-sections"
import { paymentSections } from "@/lib/payment-sections"
import { ctaSections } from "@/lib/cta-sections"
import { footerSections } from "@/lib/footer-sections"
import { buttonSections } from "@/lib/button-sections"
import { cardSections } from "@/lib/card-sections"
import { badgeSections } from "@/lib/badge-sections"
import { cn } from "@/lib/utils"

// Lazy load heavy components
const ComponentPreview = dynamic(() => import("@/components/component-preview").then(mod => mod.ComponentPreview), { ssr: false })

export function ComponentsPageClient() {
    const searchParams = useSearchParams()
    const router = useRouter()
    const [selectedCategory, setSelectedCategory] = useState("All")
    const [selectedCustomCategory, setSelectedCustomCategory] = useState("All")
    const [searchQuery, setSearchQuery] = useState("")
    const [componentsSearch, setComponentsSearch] = useState("")
    const [sectionSearch, setSectionSearch] = useState("")

    // Get initial tab from URL parameter, default to "components"
    const tabFromUrl = searchParams.get("tab") || "components"
    const [activeTab, setActiveTab] = useState(tabFromUrl)

    // Sync activeTab with URL parameter when it changes (e.g., from browser back/forward)
    useEffect(() => {
        const currentTab = searchParams.get("tab") || "components"
        if (currentTab !== activeTab) {
            setActiveTab(currentTab)
        }
    }, [searchParams])

    // Update URL when tab changes
    const handleTabChange = (value: string) => {
        setActiveTab(value)
        const params = new URLSearchParams()
        params.set("tab", value)
        router.replace(`/components?${params.toString()}`, { scroll: false })
    }

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
            category: "Input",
            tags: componentDetails["url-input"]?.tags || [],
        },
        {
            name: "MediaPlayer",
            description: "A beautiful media player component with album art, playback controls, and progress bar.",
            href: "/components/media-player",
            category: "Card",
            tags: componentDetails["media-player"]?.tags || [],
        },
        {
            name: "ChatInterface",
            description: "A modern chat interface component with message bubbles, typing indicator, and input area.",
            href: "/components/chat-interface",
            category: "Card",
            tags: componentDetails["chat-interface"]?.tags || [],
        },
        {
            name: "SocialProfileCard",
            description: "A beautiful social profile card component with avatar, stats, and action buttons.",
            href: "/components/social-profile-card",
            category: "Card",
            tags: componentDetails["social-profile-card"]?.tags || [],
        },
        {
            name: "GlassAuthForm",
            description: "A beautiful glassmorphism authentication form component with floating label inputs and social login buttons.",
            href: "/components/glass-auth-form",
            category: "Card",
            tags: componentDetails["glass-auth-form"]?.tags || [],
        },
        ...buttonSections.map(button => ({
            name: button.name,
            description: button.description,
            href: `/components/${button.slug}`,
            category: "Button",
            tags: button.tags || [],
        })),
        ...cardSections.map(card => ({
            name: card.name,
            description: card.description,
            href: `/components/${card.slug}`,
            category: "Card",
            tags: componentDetails[card.slug]?.tags || card.tags || [],
        })),
        ...badgeSections.map(badge => ({
            name: badge.name,
            description: badge.description,
            href: `/components/${badge.slug}`,
            category: "Badge",
            tags: badge.tags || [],
        }))
    ]

    const customCategories = ["All", "Special", "Button", "Card", "Badge", "Input", "Dialog", "Switch", "Tabs"]

    // Calculate tag frequency from custom components
    const tagFrequency = new Map<string, number>()
    customComponents.forEach(component => {
        (component.tags || []).forEach(tag => {
            tagFrequency.set(tag, (tagFrequency.get(tag) || 0) + 1)
        })
    })

    // Filter tags: only show high frequency (50+) and medium-high frequency (10-49)
    // Lowered threshold to 10 to show more relevant tags
    const allTags = Array.from(tagFrequency.entries())
        .filter(([_, count]) => count >= 10)
        .sort((a, b) => b[1] - a[1]) // Sort by frequency descending
        .map(([tag]) => tag)
        .sort() // Then sort alphabetically

    const filteredCustomComponents = customComponents.filter((component) => {
        const matchesCategory = selectedCustomCategory === "All" || component.category === selectedCustomCategory
        const searchLower = componentsSearch.toLowerCase()
        const matchesSearch =
            component.name.toLowerCase().includes(searchLower) ||
            component.description.toLowerCase().includes(searchLower) ||
            (component.tags && component.tags.some(tag => tag.toLowerCase().includes(searchLower)))
        return matchesCategory && matchesSearch
    })

    const filteredHeaderSections = headerSections.filter((header) => {
        const searchLower = sectionSearch.toLowerCase()
        const matchesSearch =
            header.name.toLowerCase().includes(searchLower) ||
            header.description.toLowerCase().includes(searchLower) ||
            header.tags.some(tag => tag.toLowerCase().includes(searchLower))
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

    const filteredFeatureSections = featureSections.filter((feature) => {
        const searchLower = sectionSearch.toLowerCase()
        const matchesSearch =
            feature.name.toLowerCase().includes(searchLower) ||
            feature.description.toLowerCase().includes(searchLower) ||
            feature.tags.some(tag => tag.toLowerCase().includes(searchLower))
        return matchesSearch
    })

    const filteredPaymentSections = paymentSections.filter((payment) => {
        const searchLower = sectionSearch.toLowerCase()
        const matchesSearch =
            payment.name.toLowerCase().includes(searchLower) ||
            payment.description.toLowerCase().includes(searchLower) ||
            payment.tags.some(tag => tag.toLowerCase().includes(searchLower))
        return matchesSearch
    })

    const filteredCtaSections = ctaSections.filter((cta) => {
        const searchLower = sectionSearch.toLowerCase()
        const matchesSearch =
            cta.name.toLowerCase().includes(searchLower) ||
            cta.description.toLowerCase().includes(searchLower) ||
            cta.tags.some(tag => tag.toLowerCase().includes(searchLower))
        return matchesSearch
    })

    const filteredFooterSections = footerSections.filter((footer) => {
        const searchLower = sectionSearch.toLowerCase()
        const matchesSearch =
            footer.name.toLowerCase().includes(searchLower) ||
            footer.description.toLowerCase().includes(searchLower) ||
            footer.tags.some(tag => tag.toLowerCase().includes(searchLower))
        return matchesSearch
    })

    const filteredButtonSections = buttonSections.filter((button) => {
        const searchLower = sectionSearch.toLowerCase()
        const matchesSearch =
            button.name.toLowerCase().includes(searchLower) ||
            button.description.toLowerCase().includes(searchLower) ||
            button.tags.some(tag => tag.toLowerCase().includes(searchLower))
        return matchesSearch
    })

    // Combine all sections for display
    const allFilteredSections = [
        ...filteredHeaderSections.map(header => ({
            slug: header.slug,
            name: header.name,
            description: header.description,
            type: 'header' as const,
        })),
        ...filteredHeroSections.map(hero => ({
            slug: hero.slug,
            name: hero.name,
            description: hero.description,
            type: 'hero' as const,
        })),
        ...filteredFeatureSections.map(feature => ({
            slug: feature.slug,
            name: feature.name,
            description: feature.description,
            type: 'feature' as const,
        })),
        ...filteredPaymentSections.map(payment => ({
            slug: payment.slug,
            name: payment.name,
            description: payment.description,
            type: 'payment' as const,
        })),
        ...filteredCtaSections.map(cta => ({
            slug: cta.slug,
            name: cta.name,
            description: cta.description,
            type: 'cta' as const,
        })),
        ...filteredFooterSections.map(footer => ({
            slug: footer.slug,
            name: footer.name,
            description: footer.description,
            type: 'footer' as const,
        })),
        ...filteredButtonSections.map(button => ({
            slug: button.slug,
            name: button.name,
            description: button.description,
            type: 'button' as const,
        })),
    ]

    // Calculate tag frequency from sections
    const sectionTagFrequency = new Map<string, number>()
    const allSectionTagsArray = [
        ...headerSections.flatMap(header => header.tags),
        ...heroSections.flatMap(hero => hero.tags),
        ...featureSections.flatMap(feature => feature.tags),
        ...paymentSections.flatMap(payment => payment.tags),
        ...ctaSections.flatMap(cta => cta.tags),
        ...footerSections.flatMap(footer => footer.tags),
        ...buttonSections.flatMap(button => button.tags),
    ]
    allSectionTagsArray.forEach(tag => {
        sectionTagFrequency.set(tag, (sectionTagFrequency.get(tag) || 0) + 1)
    })

    // Filter tags: only show high frequency (50+) and medium-high frequency (10-49)
    // Lowered threshold to 10 to show more relevant tags
    const allSectionTags = Array.from(sectionTagFrequency.entries())
        .filter(([_, count]) => count >= 10)
        .sort((a, b) => b[1] - a[1]) // Sort by frequency descending
        .map(([tag]) => tag)
        .sort() // Then sort alphabetically

    // Organize sidebar items by category
    const getSpecialComponents = () => {
        return customComponents.filter(c => 
            c.name === "UrlInput" || 
            c.name === "MediaPlayer" || 
            c.name === "ChatInterface" || 
            c.name === "SocialProfileCard" || 
            c.name === "GlassAuthForm"
        )
    }

    const getButtonComponents = () => {
        return customComponents.filter(c => c.category === "Button")
    }

    const getCardComponents = () => {
        return customComponents.filter(c => c.category === "Card")
    }

    const getInputComponents = () => {
        return customComponents.filter(c => c.category === "Input")
    }

    const getBadgeComponents = () => {
        return customComponents.filter(c => c.category === "Badge")
    }

    const getSectionComponentsByType = (type: string) => {
        return allFilteredSections
            .filter(section => section.type === type)
            .map(section => ({
                name: section.name,
                href: `/components/${section.slug}`,
            }))
    }

    const sidebarItems = [
        {
            title: "Special",
            href: "/components",
            items: getSpecialComponents().map((component) => ({
                title: component.name,
                href: component.href,
            })),
        },
        {
            title: "Button",
            href: "/components",
            items: getButtonComponents().map((component) => ({
                title: component.name,
                href: component.href,
            })),
        },
        {
            title: "Card",
            href: "/components",
            items: getCardComponents().map((component) => ({
                title: component.name,
                href: component.href,
            })),
        },
        {
            title: "Badge",
            href: "/components",
            items: [
                ...componentsData.filter(c => c.name === "Badge").map((component) => ({
                    title: component.name,
                    href: component.href,
                })),
                ...getBadgeComponents().map((component) => ({
                    title: component.name,
                    href: component.href,
                })),
            ],
        },
        {
            title: "Input",
            href: "/components",
            items: getInputComponents().map((component) => ({
                title: component.name,
                href: component.href,
            })),
        },
        {
            title: "Dialog",
            href: "/components",
            items: componentsData.filter(c => c.name === "Dialog").map((component) => ({
                title: component.name,
                href: component.href,
            })),
        },
        {
            title: "Switch",
            href: "/components",
            items: componentsData.filter(c => c.name === "Switch").map((component) => ({
                title: component.name,
                href: component.href,
            })),
        },
        {
            title: "Tabs",
            href: "/components",
            items: componentsData.filter(c => c.name === "Tabs").map((component) => ({
                title: component.name,
                href: component.href,
            })),
        },
        {
            title: "Header",
            href: "/components",
            items: getSectionComponentsByType("header").map((component) => ({
                title: component.name,
                href: component.href,
            })),
        },
        {
            title: "Hero",
            href: "/components",
            items: getSectionComponentsByType("hero").map((component) => ({
                title: component.name,
                href: component.href,
            })),
        },
        {
            title: "Feature",
            href: "/components",
            items: getSectionComponentsByType("feature").map((component) => ({
                title: component.name,
                href: component.href,
            })),
        },
        {
            title: "Payment",
            href: "/components",
            items: getSectionComponentsByType("payment").map((component) => ({
                title: component.name,
                href: component.href,
            })),
        },
        {
            title: "CTA",
            href: "/components",
            items: getSectionComponentsByType("cta").map((component) => ({
                title: component.name,
                href: component.href,
            })),
        },
        {
            title: "Footer",
            href: "/components",
            items: getSectionComponentsByType("footer").map((component) => ({
                title: component.name,
                href: component.href,
            })),
        },
    ]

    // Section TOC state
    const [activeSection, setActiveSection] = useState<string | null>(null)
    const [showToc, setShowToc] = useState(false)
    const headerRef = useRef<HTMLDivElement>(null)
    const heroRef = useRef<HTMLDivElement>(null)
    const featureRef = useRef<HTMLDivElement>(null)
    const paymentRef = useRef<HTMLDivElement>(null)
    const ctaRef = useRef<HTMLDivElement>(null)
    const footerRef = useRef<HTMLDivElement>(null)

    // Section categories for TOC
    const sectionCategories = [
        { id: 'header', label: 'Header', count: filteredHeaderSections.length, ref: headerRef },
        { id: 'hero', label: 'Hero', count: filteredHeroSections.length, ref: heroRef },
        { id: 'feature', label: 'Features', count: filteredFeatureSections.length, ref: featureRef },
        { id: 'payment', label: 'Payment', count: filteredPaymentSections.length, ref: paymentRef },
        { id: 'cta', label: 'CTA', count: filteredCtaSections.length, ref: ctaRef },
        { id: 'footer', label: 'Footer', count: filteredFooterSections.length, ref: footerRef },
    ]

    // Scroll to section
    const scrollToSection = (sectionId: string) => {
        const category = sectionCategories.find(c => c.id === sectionId)
        if (category?.ref.current) {
            category.ref.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
    }


    // Update active section on scroll
    useEffect(() => {
        const handleScroll = () => {
            const headerTop = headerRef.current?.getBoundingClientRect().top ?? Infinity
            const heroTop = heroRef.current?.getBoundingClientRect().top ?? Infinity
            const featureTop = featureRef.current?.getBoundingClientRect().top ?? Infinity
            const paymentTop = paymentRef.current?.getBoundingClientRect().top ?? Infinity
            const ctaTop = ctaRef.current?.getBoundingClientRect().top ?? Infinity
            const footerTop = footerRef.current?.getBoundingClientRect().top ?? Infinity

            if (footerTop <= 200) {
                setActiveSection('footer')
            } else if (ctaTop <= 200) {
                setActiveSection('cta')
            } else if (paymentTop <= 200) {
                setActiveSection('payment')
            } else if (featureTop <= 200) {
                setActiveSection('feature')
            } else if (heroTop <= 200) {
                setActiveSection('hero')
            } else if (headerTop <= 200) {
                setActiveSection('header')
            } else {
                setActiveSection(null)
            }
        }

        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    return (
        <div className="container flex-1 items-start md:grid md:grid-cols-[220px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10 px-4 md:px-8">
            <aside className="fixed top-14 z-30 -ml-2 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 overflow-y-auto border-r md:sticky md:block">
                <div className="py-6 pl-6 pr-6 lg:py-8 lg:pl-8">
                    <SidebarNav items={sidebarItems} />
                </div>
            </aside>

            <section className="py-6 md:py-8">
                <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
                    <TabsList className="mb-6">
                        <TabsTrigger value="preview" className="hidden">Preview</TabsTrigger>
                        <TabsTrigger value="components">Components</TabsTrigger>
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

                    {/* Components Tab */}
                    <TabsContent value="components" className="mt-0">
                        <div className="flex flex-col gap-4 mb-8">
                            {/* Categories Filter */}
                            <div className="flex flex-wrap gap-2">
                                {customCategories.map((category) => (
                                    <Button
                                        key={category}
                                        variant={selectedCustomCategory === category ? "default" : "outline"}
                                        size="sm"
                                        onClick={() => setSelectedCustomCategory(category)}
                                    >
                                        {category}
                                    </Button>
                                ))}
                            </div>

                            {/* Search */}
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                                <Input
                                    type="search"
                                    placeholder="Search custom components by name, description, or tags..."
                                    className="pl-10"
                                    value={componentsSearch}
                                    onChange={(e) => setComponentsSearch(e.target.value)}
                                />
                            </div>

                            {/* Tags Filter */}
                            {allTags.length > 0 && (
                                <div className="flex flex-wrap gap-2">
                                    {allTags.map((tag) => {
                                        const isSelected = componentsSearch.toLowerCase() === tag.toLowerCase()
                                        return (
                                            <Badge
                                                key={tag}
                                                variant={isSelected ? "default" : "secondary"}
                                                asChild
                                            >
                                                <button
                                                    type="button"
                                                    className="cursor-pointer hover:opacity-80 transition-opacity"
                                                    onClick={() => setComponentsSearch(isSelected ? "" : tag)}
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

                            {/* Section Tags Filter */}
                            {allSectionTags.length > 0 && (
                                <div className="flex flex-wrap gap-1.5">
                                    {allSectionTags.map((tag) => {
                                        const isSelected = sectionSearch.toLowerCase() === tag.toLowerCase()
                                        return (
                                            <Badge
                                                key={tag}
                                                variant={isSelected ? "default" : "secondary"}
                                                asChild
                                            >
                                                <button
                                                    type="button"
                                                    className="cursor-pointer hover:opacity-80 transition-opacity text-xs"
                                                    onClick={() => setSectionSearch(isSelected ? "" : tag)}
                                                >
                                                    {tag}
                                                </button>
                                            </Badge>
                                        )
                                    })}
                                </div>
                            )}
                        </div>

                        {/* Table of Contents - Fixed on the right */}
                        <div className="hidden lg:block fixed right-8 top-24 z-40">
                            <div className="bg-background/80 backdrop-blur-sm border rounded-lg shadow-lg p-4 w-40">
                                <div className="flex items-center gap-2 mb-3 pb-2 border-b">
                                    <List className="h-4 w-4 text-muted-foreground" />
                                    <span className="text-sm font-semibold">Section</span>
                                </div>
                                <nav className="flex flex-col gap-1">
                                    {sectionCategories.map((category) => (
                                        <button
                                            key={category.id}
                                            onClick={() => scrollToSection(category.id)}
                                            className={cn(
                                                "flex items-center justify-between px-2 py-1.5 rounded-md text-sm transition-colors text-left",
                                                activeSection === category.id
                                                    ? "bg-primary/10 text-primary font-medium"
                                                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                                            )}
                                        >
                                            <span>{category.label}</span>
                                            <span className="text-xs opacity-60">{category.count}</span>
                                        </button>
                                    ))}
                                </nav>
                            </div>
                        </div>

                        {allFilteredSections.length > 0 ? (
                            <div className="relative">
                                {/* Header Sections */}
                                {filteredHeaderSections.length > 0 && (
                                    <div ref={headerRef} className="scroll-mt-20">
                                        <div className="grid gap-6 grid-cols-1">
                                            {filteredHeaderSections.map((header, index) => (
                                                <div key={header.slug} className="relative">
                                                    <ComponentPreview
                                                        name={header.name}
                                                        description={header.description}
                                                        href={`/components/${header.slug}`}
                                                        category="Sections"
                                                    />
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Hero Sections */}
                                {filteredHeroSections.length > 0 && (
                                    <div ref={heroRef} className="scroll-mt-20 mt-6">
                                        <div className="grid gap-6 grid-cols-1">
                                            {filteredHeroSections.map((hero, index) => (
                                                <div key={hero.slug} className="relative">
                                                    <ComponentPreview
                                                        name={hero.name}
                                                        description={hero.description}
                                                        href={`/components/${hero.slug}`}
                                                        category="Sections"
                                                    />
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Features Sections */}
                                {filteredFeatureSections.length > 0 && (
                                    <div ref={featureRef} className="scroll-mt-20 mt-6">
                                        <div className="grid gap-6 grid-cols-1">
                                            {filteredFeatureSections.map((feature, index) => (
                                                <div key={feature.slug} className="relative">
                                                    <ComponentPreview
                                                        name={feature.name}
                                                        description={feature.description}
                                                        href={`/components/${feature.slug}`}
                                                        category="Sections"
                                                    />
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Payment Sections */}
                                {filteredPaymentSections.length > 0 && (
                                    <div ref={paymentRef} className="scroll-mt-20 mt-6">
                                        <div className="grid gap-6 grid-cols-1">
                                            {filteredPaymentSections.map((payment, index) => (
                                                <div key={payment.slug} className="relative">
                                                    <ComponentPreview
                                                        name={payment.name}
                                                        description={payment.description}
                                                        href={`/components/${payment.slug}`}
                                                        category="Sections"
                                                    />
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* CTA Sections */}
                                {filteredCtaSections.length > 0 && (
                                    <div ref={ctaRef} className="scroll-mt-20 mt-6">
                                        <div className="grid gap-6 grid-cols-1">
                                            {filteredCtaSections.map((cta, index) => (
                                                <div key={cta.slug} className="relative">
                                                    <ComponentPreview
                                                        name={cta.name}
                                                        description={cta.description}
                                                        href={`/components/${cta.slug}`}
                                                        category="Sections"
                                                    />
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Footer Sections */}
                                {filteredFooterSections.length > 0 && (
                                    <div ref={footerRef} className="scroll-mt-20 mt-6">
                                        <div className="grid gap-6 grid-cols-1">
                                            {filteredFooterSections.map((footer, index) => (
                                                <div key={footer.slug} className="relative">
                                                    <ComponentPreview
                                                        name={footer.name}
                                                        description={footer.description}
                                                        href={`/components/${footer.slug}`}
                                                        category="Sections"
                                                    />
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed py-12 text-center text-muted-foreground">
                                <p className="text-lg font-medium">No sections found</p>
                                <p className="text-sm">Try adjusting your search.</p>
                            </div>
                        )}
                    </TabsContent>
                </Tabs>
            </section>
        </div>
    )
}
