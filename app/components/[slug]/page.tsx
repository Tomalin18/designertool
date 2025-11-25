import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { ComponentPlayground } from "@/components/component-playground"
import { componentDetails } from "@/lib/component-details"
import { componentsData } from "@/lib/components-data"
import { SidebarNav } from "@/components/sidebar-nav"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export function generateStaticParams() {
  return Object.keys(componentDetails).map((slug) => ({
    slug,
  }))
}

interface ComponentPageProps {
  params: Promise<{ slug: string }>
}

export default async function ComponentPage({ params }: ComponentPageProps) {
  const { slug } = await params
  const component = componentDetails[slug]

  if (!component) {
    notFound()
  }

  const sidebarItems = [
    {
      title: "Components",
      href: "/components",
      items: componentsData.map((c) => ({
        title: c.name,
        href: `/components/${c.slug || c.href.replace("/components/", "")}`,
      })),
    },
  ]

  return (
    <div className="container flex-1 items-start md:grid md:grid-cols-[220px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10">
      <aside className="fixed top-14 z-30 -ml-2 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 overflow-y-auto border-r md:sticky md:block">
        <div className="py-6 pl-6 pr-6 lg:py-8 lg:pl-8">
          <SidebarNav items={sidebarItems} />
        </div>
      </aside>

      <div className="py-8 md:py-12">
        <div className="mb-6">
          <Link href="/components">
            <Button variant="ghost" size="sm" className="mb-4 -ml-2">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Components
            </Button>
          </Link>
          <div className="inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold mb-3">
            {component.category}
          </div>
          <h1 className="text-3xl font-bold tracking-tight mb-2">{component.name}</h1>
          <p className="text-muted-foreground mb-4">{component.description}</p>
          {component.tags && component.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-6">
              {component.tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
          )}
        </div>

        <ComponentPlayground
          componentName={component.name}
          slug={slug}
        />
      </div>
    </div>
  )
}
