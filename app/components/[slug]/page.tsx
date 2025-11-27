import { notFound } from 'next/navigation'
import { ComponentPlayground } from "@/components/component-playground"
import { componentDetails } from "@/lib/component-details"
import { componentsData } from "@/lib/components-data"
import { SidebarNav } from "@/components/sidebar-nav"
import { Badge } from "@/components/ui/badge"
import { BackToComponentsButton } from "@/components/back-to-components-button"
import { heroSections } from "@/lib/hero-sections"
import { featureSections } from "@/lib/feature-sections"
import { paymentSections } from "@/lib/payment-sections"
import { ctaSections } from "@/lib/cta-sections"
import { footerSections } from "@/lib/footer-sections"
import { headerSections } from "@/lib/header-sections"
import { buttonSections } from "@/lib/button-sections"
import fs from 'fs'
import path from 'path'

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

  // Read hero component code if it's a hero section
  let initialCode = ""
  const heroMeta = heroSections.find(h => h.slug === slug)
  const featureMeta = featureSections.find(f => f.slug === slug)
  const paymentMeta = paymentSections.find(p => p.slug === slug)
  const ctaMeta = ctaSections.find(c => c.slug === slug)
  const footerMeta = footerSections.find(f => f.slug === slug)
  const headerMeta = headerSections.find(h => h.slug === slug)
  const buttonMeta = buttonSections.find(b => b.slug === slug)

  if (heroMeta) {
    try {
      const filePath = path.join(process.cwd(), 'components', 'customize', 'heroes', 'index.tsx')
      const fileContent = fs.readFileSync(filePath, 'utf-8')

      // Extract the specific component function
      const functionStartRegex = new RegExp(`export function ${heroMeta.componentName}\\s*\\(`, 'm')
      const match = fileContent.match(functionStartRegex)

      if (match && match.index !== undefined) {
        const startIndex = match.index
        // Find the end of this function (start of next export or end of file)
        const nextExportMatch = fileContent.slice(startIndex + 1).match(/^export (type|function|const)/m)
        const endIndex = nextExportMatch && nextExportMatch.index
          ? startIndex + 1 + nextExportMatch.index
          : fileContent.length

        let componentCode = fileContent.slice(startIndex, endIndex).trim()
        initialCode = componentCode
      }
    } catch (e) {
      console.error("Error reading hero component code:", e)
    }
  }

  // Read feature component code if it's a feature section
  if (featureMeta) {
    try {
      const filePath = path.join(process.cwd(), 'components', 'customize', 'features', 'index.tsx')
      const fileContent = fs.readFileSync(filePath, 'utf-8')

      // Extract the specific component function
      const functionStartRegex = new RegExp(`export function ${featureMeta.componentName}\\s*\\(`, 'm')
      const match = fileContent.match(functionStartRegex)

      if (match && match.index !== undefined) {
        const startIndex = match.index
        // Find the end of this function (start of next export or end of file)
        const nextExportMatch = fileContent.slice(startIndex + 1).match(/^export (type|function|const)/m)
        const endIndex = nextExportMatch && nextExportMatch.index
          ? startIndex + 1 + nextExportMatch.index
          : fileContent.length

        let componentCode = fileContent.slice(startIndex, endIndex).trim()
        initialCode = componentCode
      }
    } catch (e) {
      console.error("Error reading feature component code:", e)
    }
  }

  // Read payment component code if it's a payment section
  if (paymentMeta) {
    try {
      const filePath = path.join(process.cwd(), 'components', 'customize', 'payments', 'index.tsx')
      const fileContent = fs.readFileSync(filePath, 'utf-8')

      // Extract the specific component function
      const functionStartRegex = new RegExp(`export function ${paymentMeta.componentName}\\s*\\(`, 'm')
      const match = fileContent.match(functionStartRegex)

      if (match && match.index !== undefined) {
        const startIndex = match.index
        // Find the end of this function (start of next export or end of file)
        const nextExportMatch = fileContent.slice(startIndex + 1).match(/^export (type|function|const)/m)
        const endIndex = nextExportMatch && nextExportMatch.index
          ? startIndex + 1 + nextExportMatch.index
          : fileContent.length

        let componentCode = fileContent.slice(startIndex, endIndex).trim()
        initialCode = componentCode
      }
    } catch (e) {
      console.error("Error reading payment component code:", e)
    }
  }

  // Read CTA component code if it's a CTA section
  if (ctaMeta) {
    try {
      const filePath = path.join(process.cwd(), 'components', 'customize', 'ctas', 'index.tsx')
      const fileContent = fs.readFileSync(filePath, 'utf-8')

      // Extract the specific component function
      const functionStartRegex = new RegExp(`export function ${ctaMeta.componentName}\\s*\\(`, 'm')
      const match = fileContent.match(functionStartRegex)

      if (match && match.index !== undefined) {
        const startIndex = match.index
        // Find the end of this function (start of next export or end of file)
        const nextExportMatch = fileContent.slice(startIndex + 1).match(/^export (type|function|const)/m)
        const endIndex = nextExportMatch && nextExportMatch.index
          ? startIndex + 1 + nextExportMatch.index
          : fileContent.length

        let componentCode = fileContent.slice(startIndex, endIndex).trim()
        initialCode = componentCode
      }
    } catch (e) {
      console.error("Error reading CTA component code:", e)
    }
  }

  // Read Footer component code if it's a footer section
  if (footerMeta) {
    try {
      const filePath = path.join(process.cwd(), 'components', 'customize', 'footers', 'index.tsx')
      const fileContent = fs.readFileSync(filePath, 'utf-8')

      // Extract the specific component function (footer components use function declarations)
      const functionStartRegex = new RegExp(`export function ${footerMeta.componentName}\\s*\\(`, 'm')
      const match = fileContent.match(functionStartRegex)

      if (match && match.index !== undefined) {
        const startIndex = match.index
        // Find the end of this function component
        // Look for the closing of the function by finding the next export statement
        const nextExportMatch = fileContent.slice(startIndex + 1).match(/^export (type|function|const)/m)
        const endIndex = nextExportMatch && nextExportMatch.index
          ? startIndex + 1 + nextExportMatch.index
          : fileContent.length

        let componentCode = fileContent.slice(startIndex, endIndex).trim()
        initialCode = componentCode
      }
    } catch (e) {
      console.error("Error reading footer component code:", e)
    }
  }

  // Read Header component code if it's a header section
  if (headerMeta) {
    try {
      const filePath = path.join(process.cwd(), 'components', 'customize', 'headers', 'index.tsx')
      // console.log("Reading header file from:", filePath)
      const fileContent = fs.readFileSync(filePath, 'utf-8')

      // Extract the specific component function
      const functionStartRegex = new RegExp(`export function ${headerMeta.componentName}\\s*\\(`, 'm')
      const match = fileContent.match(functionStartRegex)

      if (match && match.index !== undefined) {
        const startIndex = match.index
        // Find the end of this function component
        // Look for the closing of the function by finding the next export statement
        const nextExportMatch = fileContent.slice(startIndex + 1).match(/^export (type|function|const)/m)
        const endIndex = nextExportMatch && nextExportMatch.index
          ? startIndex + 1 + nextExportMatch.index
          : fileContent.length

        let componentCode = fileContent.slice(startIndex, endIndex).trim()
        initialCode = componentCode
      }
    } catch (e) {
      console.error("Error reading header component code:", e)
    }
  }

  // Read Button component code if it's a button section
  if (buttonMeta) {
    try {
      const filePath = path.join(process.cwd(), 'components', 'customize', 'buttons', 'index.tsx')
      const fileContent = fs.readFileSync(filePath, 'utf-8')

      // Extract the specific component function
      const functionStartRegex = new RegExp(`export const ${buttonMeta.componentName}\\s*=`, 'm')
      const match = fileContent.match(functionStartRegex)

      if (match && match.index !== undefined) {
        const startIndex = match.index
        // Find the end of this function component
        // Look for the closing of the function by finding the next export statement
        const nextExportMatch = fileContent.slice(startIndex + 1).match(/^export (type|function|const)/m)
        const endIndex = nextExportMatch && nextExportMatch.index
          ? startIndex + 1 + nextExportMatch.index
          : fileContent.length

        let componentCode = fileContent.slice(startIndex, endIndex).trim()
        initialCode = componentCode
      }
    } catch (e) {
      console.error("Error reading button component code:", e)
    }
  }

  const sidebarItems = [
    {
      title: "Components",
      href: "/components",
      items: componentsData.map((c) => ({
        title: c.name,
        href: c.href,
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
          <BackToComponentsButton
            href={heroMeta || featureMeta || paymentMeta || ctaMeta || footerMeta || headerMeta || buttonMeta ? "/components?tab=section" : "/components"}
            isSection={!!(heroMeta || featureMeta || paymentMeta || ctaMeta || footerMeta || headerMeta || buttonMeta)}
          />
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
          initialCode={initialCode}
        />
      </div>
    </div>
  )
}
