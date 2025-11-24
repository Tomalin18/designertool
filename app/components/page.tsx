```javascript
"use client"

import dynamic from "next/dynamic"
import { useState } from "react"
import { Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { componentsData, categories } from "@/lib/components-data"
import { SidebarNav } from "@/components/sidebar-nav"

// Lazy load heavy components
const ComponentPreview = dynamic(() => import("@/components/component-preview"), { ssr: false })
// Placeholder components for code and properties (could be replaced with actual implementations)
const CodeView = dynamic(() => import("@/components/code-view"), {
  ssr: false,
  loading: () => <p className="text-muted-foreground">Loading code...</p>,
})
const PropertiesView = dynamic(() => import("@/components/properties-view"), {
  ssr: false,
  loading: () => <p className="text-muted-foreground">Loading properties...</p>,
})

export default function ComponentsPage() {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [searchQuery, setSearchQuery] = useState("")
  const [customizeCategory, setCustomizeCategory] = useState("All")
  const [customizeSearch, setCustomizeSearch] = useState("")

  const filteredComponents = componentsData.filter((component) => {
    const matchesCategory = selectedCategory === "All" || component.category === selectedCategory
    const matchesSearch =
      component.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      component.description.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const customComponents: any[] = []

  const filteredCustomComponents = customComponents.filter((component) => {
    const matchesCategory = customizeCategory === "All" || component.category === customizeCategory
    const matchesSearch =
      component.name.toLowerCase().includes(customizeSearch.toLowerCase()) ||
      component.description.toLowerCase().includes(customizeSearch.toLowerCase())
    return matchesCategory && matchesSearch
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
        <Tabs defaultValue="preview" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="preview">Preview</TabsTrigger>
            <TabsTrigger value="customize">Customize</TabsTrigger>
            <TabsTrigger value="code">Code</TabsTrigger>
            <TabsTrigger value="properties">Properties</TabsTrigger>
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
                  placeholder="Search custom components..."
                  className="pl-10"
                  value={customizeSearch}
                  onChange={(e) => setCustomizeSearch(e.target.value)}
                />
              </div>

              {/* Category Filter */}
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={customizeCategory === category ? "default" : "outline"}
                    size="sm"
                    onClick={() => setCustomizeCategory(category)}
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </div>

            {/* Custom Components Grid */}
            {filteredCustomComponents.length > 0 ? (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
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

          {/* Code Tab */}
          <TabsContent value="code" className="mt-0">
            <CodeView />
          </TabsContent>

          {/* Properties Tab */}
          <TabsContent value="properties" className="mt-0">
            <PropertiesView />
          </TabsContent>
        </Tabs>
      </section>
    </div>
  )
}
