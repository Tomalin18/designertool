import { notFound } from 'next/navigation'
import { ComponentPlayground } from "@/components/component-playground"
import { componentDetails } from "@/lib/component-details"
import { componentsData } from "@/lib/components-data"
import { SidebarNav } from "@/components/sidebar-nav"
import { TagsList } from "@/components/tags-list"
import { BackToComponentsButton } from "@/components/back-to-components-button"
import { ComponentNavigation } from "@/components/component-navigation"
import { heroSections } from "@/lib/hero-sections"
import { featureSections } from "@/lib/feature-sections"
import { paymentSections } from "@/lib/payment-sections"
import { ctaSections } from "@/lib/cta-sections"
import { footerSections } from "@/lib/footer-sections"
import { headerSections } from "@/lib/header-sections"
import { buttonSections } from "@/lib/button-sections"
import { cardSections } from "@/lib/card-sections"
import { badgeSections } from "@/lib/badge-sections"
import { inputSections } from "@/lib/input-sections"
import { dialogSections } from "@/lib/dialog-sections"
import { toggleSections } from "@/lib/toggle-sections"
import { tabsSections } from "@/lib/tabs-sections"
import { sidebarSections } from "@/lib/sidebar-sections"
import { tabbarSections } from "@/lib/tabbar-sections"
import { sheetSections } from "@/lib/sheet-sections"
import { tableSections } from "@/lib/table-sections"
import { chartSections } from "@/lib/chart-sections"
import { ComponentInfo } from "@/lib/components-data"
import fs from 'fs'
import path from 'path'

export function generateStaticParams() {
  const componentSlugs = Object.keys(componentDetails)
  const inputSlugs = inputSections.map(input => input.slug)
  const dialogSlugs = dialogSections.map(dialog => dialog.slug)
  const toggleSlugs = toggleSections.map(toggle => toggle.slug)
  const tabsSlugs = tabsSections.map(tab => tab.slug)
  const sidebarSlugs = sidebarSections.map(sidebar => sidebar.slug)
  const tabbarSlugs = tabbarSections.map(tabbar => tabbar.slug)
  const sheetSlugs = sheetSections.map(sheet => sheet.slug)
  const tableSlugs = tableSections.map(table => table.slug)
  const chartSlugs = chartSections.map(chart => chart.slug)
  return [...componentSlugs, ...inputSlugs, ...dialogSlugs, ...toggleSlugs, ...tabsSlugs, ...sidebarSlugs, ...tabbarSlugs, ...sheetSlugs, ...tableSlugs, ...chartSlugs].map((slug) => ({
    slug,
  }))
}

interface ComponentPageProps {
  params: Promise<{ slug: string }>
}

export default async function ComponentPage({ params }: ComponentPageProps) {
  const { slug } = await params
  
  // Read hero component code if it's a hero section
  let initialCode = ""
  const heroMeta = heroSections.find(h => h.slug === slug)
  const featureMeta = featureSections.find(f => f.slug === slug)
  const paymentMeta = paymentSections.find(p => p.slug === slug)
  const ctaMeta = ctaSections.find(c => c.slug === slug)
  const footerMeta = footerSections.find(f => f.slug === slug)
  const headerMeta = headerSections.find(h => h.slug === slug)
  const cardMeta = cardSections.find(c => c.slug === slug)
  const buttonMeta = buttonSections.find(b => b.slug === slug)
  const badgeMeta = badgeSections.find(b => b.slug === slug)
  const inputMeta = inputSections.find(i => i.slug === slug)
  const dialogMeta = dialogSections.find(d => d.slug === slug)
  const toggleMeta = toggleSections.find(t => t.slug === slug)
  const tabsMeta = tabsSections.find(t => t.slug === slug)
  const sidebarMeta = sidebarSections.find(s => s.slug === slug)
  const tabbarMeta = tabbarSections.find(t => t.slug === slug)
  const sheetMeta = sheetSections.find(s => s.slug === slug)
  const tableMeta = tableSections.find(t => t.slug === slug)
  const chartMeta = chartSections.find(c => c.slug === slug)

  // Get component from componentDetails or create from inputMeta/dialogMeta/toggleMeta/tabsMeta
  let component = componentDetails[slug]
  
  // For input components, create component detail if not in componentDetails
  if (inputMeta && !component) {
    component = {
      name: inputMeta.name,
      description: inputMeta.description,
      category: "Input",
      hasPlayground: true,
      installation: `import { ${inputMeta.componentName} } from "@/components/customize/inputs"`,
      usage: `<${inputMeta.componentName} />`,
      tags: inputMeta.tags,
      props: Object.entries(inputMeta.props).map(([key, prop]) => ({
        name: key,
        type: prop.control,
        default: String(prop.default || ""),
        description: prop.description,
      })),
    }
  }

  // For dialog components, create component detail if not in componentDetails
  if (dialogMeta && !component) {
    component = {
      name: dialogMeta.name,
      description: dialogMeta.description,
      category: "Dialog",
      hasPlayground: true,
      installation: `import { ${dialogMeta.componentName} } from "@/components/customize/dialogs"`,
      usage: `<${dialogMeta.componentName} />`,
      tags: dialogMeta.tags,
      props: Object.entries(dialogMeta.props).map(([key, prop]) => ({
        name: key,
        type: prop.control,
        default: String(prop.default || ""),
        description: prop.description,
      })),
    }
  }

  // For toggle components, create component detail if not in componentDetails
  if (toggleMeta && !component) {
    component = {
      name: toggleMeta.name,
      description: toggleMeta.description,
      category: "Toggle",
      hasPlayground: true,
      installation: `import { ${toggleMeta.componentName} } from "@/components/customize/toggles"`,
      usage: `<${toggleMeta.componentName} />`,
      tags: toggleMeta.tags,
      props: Object.entries(toggleMeta.props).map(([key, prop]) => ({
        name: key,
        type: prop.control,
        default: String(prop.default || ""),
        description: prop.description,
      })),
    }
  }

  // For tabs components, create component detail if not in componentDetails
  if (tabsMeta && !component) {
    component = {
      name: tabsMeta.name,
      description: tabsMeta.description,
      category: "Tabs",
      hasPlayground: true,
      installation: `import { ${tabsMeta.componentName} } from "@/components/customize/tabs"`,
      usage: `<${tabsMeta.componentName} />`,
      tags: tabsMeta.tags,
      props: Object.entries(tabsMeta.props).map(([key, prop]) => ({
        name: key,
        type: prop.control,
        default: String(prop.default || ""),
        description: prop.description,
      })),
    }
  }

  // For sidebar components, create component detail if not in componentDetails
  if (sidebarMeta && !component) {
    component = {
      name: sidebarMeta.name,
      description: sidebarMeta.description,
      category: "Sidebar",
      hasPlayground: true,
      installation: `import { ${sidebarMeta.componentName} } from "@/components/customize/sidebars"`,
      usage: `<${sidebarMeta.componentName} />`,
      tags: sidebarMeta.tags,
      props: Object.entries(sidebarMeta.props).map(([key, prop]) => ({
        name: key,
        type: prop.control,
        default: String(prop.default || ""),
        description: prop.description,
      })),
    }
  }

  // For tabbar components, create component detail if not in componentDetails
  if (tabbarMeta && !component) {
    component = {
      name: tabbarMeta.name,
      description: tabbarMeta.description,
      category: "Navigation",
      hasPlayground: true,
      installation: `import { ${tabbarMeta.componentName} } from "@/components/customize/tabbars"`,
      usage: `<${tabbarMeta.componentName} />`,
      tags: tabbarMeta.tags,
      props: Object.entries(tabbarMeta.props).map(([key, prop]) => ({
        name: key,
        type: prop.control,
        default: String(prop.default || ""),
        description: prop.description,
      })),
    }
  }

  // For sheet components, create component detail if not in componentDetails
  if (sheetMeta && !component) {
    component = {
      name: sheetMeta.name,
      description: sheetMeta.description,
      category: "Sheet",
      hasPlayground: true,
      installation: `import { ${sheetMeta.componentName} } from "@/components/customize/sheets"`,
      usage: `<${sheetMeta.componentName} />`,
      tags: sheetMeta.tags,
      props: Object.entries(sheetMeta.props).map(([key, prop]) => ({
        name: key,
        type: prop.control,
        default: String(prop.default || ""),
        description: prop.description,
      })),
    }
  }

  if (tableMeta && !component) {
    component = {
      name: tableMeta.name,
      description: tableMeta.description,
      category: "Table",
      hasPlayground: true,
      installation: `import { ${tableMeta.componentName} } from "@/components/customize/tables"`,
      usage: `<${tableMeta.componentName} />`,
      tags: tableMeta.tags,
      props: Object.entries(tableMeta.props).map(([key, prop]) => ({
        name: key,
        type: prop.control,
        default: String(prop.default || ""),
        description: prop.description,
      })),
    }
  }

  if (chartMeta && !component) {
    component = {
      name: chartMeta.name,
      description: chartMeta.description,
      category: "Chart",
      hasPlayground: true,
      installation: `import { ${chartMeta.componentName} } from "@/components/customize/charts"`,
      usage: `<${chartMeta.componentName} />`,
      tags: chartMeta.tags,
      props: Object.entries(chartMeta.props).map(([key, prop]) => ({
        name: key,
        type: prop.control,
        default: String(prop.default || ""),
        description: prop.description,
      })),
    }
  }

  if (!component) {
    notFound()
  }

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

  // Read Card component code if it's a card section
  if (cardMeta) {
    try {
      const filePath = path.join(process.cwd(), 'components', 'customize', 'cards', 'index.tsx')
      const fileContent = fs.readFileSync(filePath, 'utf-8')

      // Extract the specific component function (could be export const or export function)
      const functionStartRegex = new RegExp(`export (const|function) ${cardMeta.componentName}\\s*[=(]`, 'm')
      const match = fileContent.match(functionStartRegex)

      if (match && match.index !== undefined) {
        const startIndex = match.index
        // Find the end of this component
        // Look for the closing by finding the next export statement
        const nextExportMatch = fileContent.slice(startIndex + 1).match(/^export (type|function|const|interface)/m)
        const endIndex = nextExportMatch && nextExportMatch.index
          ? startIndex + 1 + nextExportMatch.index
          : fileContent.length

        let componentCode = fileContent.slice(startIndex, endIndex).trim()
        initialCode = componentCode
      }
    } catch (e) {
      console.error("Error reading card component code:", e)
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

  // Read Badge component code if it's a badge section
  if (badgeMeta) {
    try {
      const filePath = path.join(process.cwd(), 'components', 'customize', 'badges', 'index.tsx')
      const fileContent = fs.readFileSync(filePath, 'utf-8')

      // Extract the specific component function (could be export const or export function)
      const functionStartRegex = new RegExp(`export (const|function) ${badgeMeta.componentName}\\s*[=(]`, 'm')
      const match = fileContent.match(functionStartRegex)

      if (match && match.index !== undefined) {
        const startIndex = match.index
        // Find the end of this component
        // Look for the closing by finding the next export statement
        const nextExportMatch = fileContent.slice(startIndex + 1).match(/^export (type|function|const|interface)/m)
        const endIndex = nextExportMatch && nextExportMatch.index
          ? startIndex + 1 + nextExportMatch.index
          : fileContent.length

        let componentCode = fileContent.slice(startIndex, endIndex).trim()
        initialCode = componentCode
      }
    } catch (e) {
      console.error("Error reading badge component code:", e)
    }
  }

  // Read Input component code if it's an input section
  if (inputMeta) {
    try {
      const filePath = path.join(process.cwd(), 'components', 'customize', 'inputs', 'index.tsx')
      const fileContent = fs.readFileSync(filePath, 'utf-8')

      // Extract the specific component function (could be export const or export function)
      const functionStartRegex = new RegExp(`export (const|function) ${inputMeta.componentName}\\s*[=(]`, 'm')
      const match = fileContent.match(functionStartRegex)

      if (match && match.index !== undefined) {
        const startIndex = match.index
        // Find the end of this component
        // Look for the closing by finding the next export statement
        const nextExportMatch = fileContent.slice(startIndex + 1).match(/^export (type|function|const|interface)/m)
        const endIndex = nextExportMatch && nextExportMatch.index
          ? startIndex + 1 + nextExportMatch.index
          : fileContent.length

        let componentCode = fileContent.slice(startIndex, endIndex).trim()
        initialCode = componentCode
      }
    } catch (e) {
      console.error("Error reading input component code:", e)
    }
  }

  // Read Dialog component code if it's a dialog section
  if (dialogMeta) {
    try {
      const filePath = path.join(process.cwd(), 'components', 'customize', 'dialogs', 'index.tsx')
      const fileContent = fs.readFileSync(filePath, 'utf-8')

      // Extract the specific component function (could be export const or export function)
      const functionStartRegex = new RegExp(`export (const|function) ${dialogMeta.componentName}\\s*[=(]`, 'm')
      const match = fileContent.match(functionStartRegex)

      if (match && match.index !== undefined) {
        const startIndex = match.index
        // Find the end of this component
        // Look for the closing by finding the next export statement
        const nextExportMatch = fileContent.slice(startIndex + 1).match(/^export (type|function|const|interface)/m)
        const endIndex = nextExportMatch && nextExportMatch.index
          ? startIndex + 1 + nextExportMatch.index
          : fileContent.length

        let componentCode = fileContent.slice(startIndex, endIndex).trim()
        initialCode = componentCode
      }
    } catch (e) {
      console.error("Error reading dialog component code:", e)
    }
  }

  // Read Toggle component code if it's a toggle section
  if (toggleMeta) {
    try {
      const filePath = path.join(process.cwd(), 'components', 'customize', 'toggles', 'index.tsx')
      const fileContent = fs.readFileSync(filePath, 'utf-8')

      // Extract the specific component function (could be export const or export function)
      const functionStartRegex = new RegExp(`export (const|function) ${toggleMeta.componentName}\\s*[=(]`, 'm')
      const match = fileContent.match(functionStartRegex)

      if (match && match.index !== undefined) {
        const startIndex = match.index
        // Find the end of this component
        // Look for the closing by finding the next export statement
        const nextExportMatch = fileContent.slice(startIndex + 1).match(/^export (type|function|const|interface)/m)
        const endIndex = nextExportMatch && nextExportMatch.index
          ? startIndex + 1 + nextExportMatch.index
          : fileContent.length

        let componentCode = fileContent.slice(startIndex, endIndex).trim()
        initialCode = componentCode
      }
    } catch (e) {
      console.error("Error reading toggle component code:", e)
    }
  }

  if (tabsMeta) {
    try {
      const filePath = path.join(process.cwd(), 'components', 'customize', 'tabs', 'index.tsx')
      const fileContent = fs.readFileSync(filePath, 'utf-8')

      // Extract the specific component function (could be export const or export function)
      const functionStartRegex = new RegExp(`export (const|function) ${tabsMeta.componentName}\\s*[=(]`, 'm')
      const match = fileContent.match(functionStartRegex)

      if (match && match.index !== undefined) {
        const startIndex = match.index
        // Find the end of this component
        // Look for the closing by finding the next export statement
        const nextExportMatch = fileContent.slice(startIndex + 1).match(/^export (type|function|const|interface)/m)
        const endIndex = nextExportMatch && nextExportMatch.index
          ? startIndex + 1 + nextExportMatch.index
          : fileContent.length

        let componentCode = fileContent.slice(startIndex, endIndex).trim()
        initialCode = componentCode
      }
    } catch (e) {
      console.error("Error reading tabs component code:", e)
    }
  }

  if (sidebarMeta) {
    try {
      const filePath = path.join(process.cwd(), 'components', 'customize', 'sidebars', 'index.tsx')
      const fileContent = fs.readFileSync(filePath, 'utf-8')

      // Extract the specific component function (could be export const or export function)
      const functionStartRegex = new RegExp(`export (const|function) ${sidebarMeta.componentName}\\s*[=(]`, 'm')
      const match = fileContent.match(functionStartRegex)

      if (match && match.index !== undefined) {
        const startIndex = match.index
        // Find the end of this component
        // Look for the closing by finding the next export statement
        const nextExportMatch = fileContent.slice(startIndex + 1).match(/^export (type|function|const|interface)/m)
        const endIndex = nextExportMatch && nextExportMatch.index
          ? startIndex + 1 + nextExportMatch.index
          : fileContent.length

        let componentCode = fileContent.slice(startIndex, endIndex).trim()
        initialCode = componentCode
      }
    } catch (e) {
      console.error("Error reading sidebar component code:", e)
    }
  }

  if (tabbarMeta) {
    try {
      const filePath = path.join(process.cwd(), 'components', 'customize', 'tabbars', 'index.tsx')
      const fileContent = fs.readFileSync(filePath, 'utf-8')

      // Extract the specific component function (could be export const or export function)
      const functionStartRegex = new RegExp(`export (const|function) ${tabbarMeta.componentName}\\s*[=(]`, 'm')
      const match = fileContent.match(functionStartRegex)

      if (match && match.index !== undefined) {
        const startIndex = match.index
        // Find the end of this component
        // Look for the closing by finding the next export statement
        const nextExportMatch = fileContent.slice(startIndex + 1).match(/^export (type|function|const|interface)/m)
        const endIndex = nextExportMatch && nextExportMatch.index
          ? startIndex + 1 + nextExportMatch.index
          : fileContent.length

        let componentCode = fileContent.slice(startIndex, endIndex).trim()
        initialCode = componentCode
      }
    } catch (e) {
      console.error("Error reading tabbar component code:", e)
    }
  }

  if (sheetMeta) {
    try {
      const filePath = path.join(process.cwd(), 'components', 'customize', 'sheets', 'index.tsx')
      const fileContent = fs.readFileSync(filePath, 'utf-8')

      // Extract the specific component function (could be export const or export function)
      const functionStartRegex = new RegExp(`export (const|function) ${sheetMeta.componentName}\\s*[=(]`, 'm')
      const match = fileContent.match(functionStartRegex)

      if (match && match.index !== undefined) {
        const startIndex = match.index
        // Find the end of this component
        // Look for the closing by finding the next export statement
        const nextExportMatch = fileContent.slice(startIndex + 1).match(/^export (type|function|const|interface)/m)
        const endIndex = nextExportMatch && nextExportMatch.index
          ? startIndex + 1 + nextExportMatch.index
          : fileContent.length

        let componentCode = fileContent.slice(startIndex, endIndex).trim()
        initialCode = componentCode
      }
    } catch (e) {
      console.error("Error reading sheet component code:", e)
    }
  }

  if (tableMeta) {
    try {
      const filePath = path.join(process.cwd(), 'components', 'customize', 'tables', 'index.tsx')
      const fileContent = fs.readFileSync(filePath, 'utf-8')

      // Extract the specific component function (could be export const or export function)
      const functionStartRegex = new RegExp(`export (const|function) ${tableMeta.componentName}\\s*[=(]`, 'm')
      const match = fileContent.match(functionStartRegex)

      if (match && match.index !== undefined) {
        const startIndex = match.index
        // Find the end of this component
        // Look for the closing by finding the next export statement
        const nextExportMatch = fileContent.slice(startIndex + 1).match(/^export (type|function|const|interface)/m)
        const endIndex = nextExportMatch && nextExportMatch.index
          ? startIndex + 1 + nextExportMatch.index
          : fileContent.length

        let componentCode = fileContent.slice(startIndex, endIndex).trim()
        initialCode = componentCode
      }
    } catch (e) {
      console.error("Error reading table component code:", e)
    }
  }

  if (chartMeta) {
    try {
      const filePath = path.join(process.cwd(), 'components', 'customize', 'charts', 'index.tsx')
      const fileContent = fs.readFileSync(filePath, 'utf-8')

      // Extract the specific component function (could be export const or export function)
      const functionStartRegex = new RegExp(`export (const|function) ${chartMeta.componentName}\\s*[=(]`, 'm')
      const match = fileContent.match(functionStartRegex)

      if (match && match.index !== undefined) {
        const startIndex = match.index
        // Find the end of this component
        // Look for the closing by finding the next export statement
        const nextExportMatch = fileContent.slice(startIndex + 1).match(/^export (type|function|const|interface)/m)
        const endIndex = nextExportMatch && nextExportMatch.index
          ? startIndex + 1 + nextExportMatch.index
          : fileContent.length

        let componentCode = fileContent.slice(startIndex, endIndex).trim()
        initialCode = componentCode
      }
    } catch (e) {
      console.error("Error reading chart component code:", e)
    }
  }

  // Build customComponents array (same as components-page-client.tsx)
  const customComponents: ComponentInfo[] = [
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
    })),
    ...inputSections.map(input => ({
      name: input.name,
      description: input.description,
      href: `/components/${input.slug}`,
      category: "Input",
      tags: input.tags || [],
    })),
    ...dialogSections.map(dialog => ({
      name: dialog.name,
      description: dialog.description,
      href: `/components/${dialog.slug}`,
      category: "Dialog",
      tags: dialog.tags || [],
    })),
    ...toggleSections.map(toggle => ({
      name: toggle.name,
      description: toggle.description,
      href: `/components/${toggle.slug}`,
      category: "Toggle",
      tags: toggle.tags || [],
    })),
    ...tabsSections.map(tab => ({
      name: tab.name,
      description: tab.description,
      href: `/components/${tab.slug}`,
      category: "Tabs",
      tags: tab.tags || [],
    })),
    ...sidebarSections.map(sidebar => ({
      name: sidebar.name,
      description: sidebar.description,
      href: `/components/${sidebar.slug}`,
      category: "Sidebar",
      tags: sidebar.tags || [],
    })),
    ...tabbarSections.map(tabbar => ({
      name: tabbar.name,
      description: tabbar.description,
      href: `/components/${tabbar.slug}`,
      category: "Tabbar",
      tags: tabbar.tags || [],
    })),
    ...sheetSections.map(sheet => ({
      name: sheet.name,
      description: sheet.description,
      href: `/components/${sheet.slug}`,
      category: "Sheet",
      tags: sheet.tags || [],
    })),
    ...tableSections.map(table => ({
      name: table.name,
      description: table.description,
      href: `/components/${table.slug}`,
      category: "Table",
      tags: table.tags || [],
    })),
    ...chartSections.map(chart => ({
      name: chart.name,
      description: chart.description,
      href: `/components/${chart.slug}`,
      category: "Chart",
      tags: chart.tags || [],
    }))
  ]

  // Helper functions (same as components-page-client.tsx)
  const getSpecialComponents = () => {
    return customComponents.filter(c => 
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

  const getDialogComponents = () => {
    return customComponents.filter(c => c.category === "Dialog")
  }

  const getToggleComponents = () => {
    return customComponents.filter(c => c.category === "Toggle")
  }

  const getTabsComponents = () => {
    return customComponents.filter(c => c.category === "Tabs")
  }

  const getSidebarComponents = () => {
    return customComponents.filter(c => c.category === "Sidebar")
  }

  const getTabbarComponents = () => {
    return customComponents.filter(c => c.category === "Tabbar")
  }

  const getBadgeComponents = () => {
    return customComponents.filter(c => c.category === "Badge")
  }

  const getSheetComponents = () => {
    return customComponents.filter(c => c.category === "Sheet")
  }

  const getTableComponents = () => {
    return customComponents.filter(c => c.category === "Table")
  }

  const getChartComponents = () => {
    return customComponents.filter(c => c.category === "Chart")
  }

  const allFilteredSections = [
    ...headerSections.map(header => ({
      slug: header.slug,
      name: header.name,
      description: header.description,
      type: 'header' as const,
    })),
    ...heroSections.map(hero => ({
      slug: hero.slug,
      name: hero.name,
      description: hero.description,
      type: 'hero' as const,
    })),
    ...featureSections.map(feature => ({
      slug: feature.slug,
      name: feature.name,
      description: feature.description,
      type: 'feature' as const,
    })),
    ...paymentSections.map(payment => ({
      slug: payment.slug,
      name: payment.name,
      description: payment.description,
      type: 'payment' as const,
    })),
    ...ctaSections.map(cta => ({
      slug: cta.slug,
      name: cta.name,
      description: cta.description,
      type: 'cta' as const,
    })),
    ...footerSections.map(footer => ({
      slug: footer.slug,
      name: footer.name,
      description: footer.description,
      type: 'footer' as const,
    })),
    ...buttonSections.map(button => ({
      slug: button.slug,
      name: button.name,
      description: button.description,
      type: 'button' as const,
    })),
  ]

  const getSectionComponentsByType = (type: string) => {
    return allFilteredSections
      .filter(section => section.type === type)
      .map(section => ({
        name: section.name,
        href: `/components/${section.slug}`,
      }))
  }

  // Build sidebar items (same structure as components-page-client.tsx)
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
      items: [
        ...componentsData.filter(c => c.name === "Dialog").map((component) => ({
          title: component.name,
          href: component.href,
        })),
        ...getDialogComponents().map((component) => ({
          title: component.name,
          href: component.href,
        })),
      ],
    },
    {
      title: "Toggle",
      href: "/components",
      items: getToggleComponents().map((component) => ({
        title: component.name,
        href: component.href,
      })),
    },
    {
      title: "Tabs",
      href: "/components",
      items: [
        ...componentsData.filter(c => c.name === "Tabs").map((component) => ({
          title: component.name,
          href: component.href,
        })),
        ...getTabsComponents().map((component) => ({
          title: component.name,
          href: component.href,
        })),
      ],
    },
    {
      title: "Sidebar",
      href: "/components",
      items: getSidebarComponents().map((component) => ({
        title: component.name,
        href: component.href,
      })),
    },
    {
      title: "Tabbar",
      href: "/components",
      items: getTabbarComponents().map((component) => ({
        title: component.name,
        href: component.href,
      })),
    },
    {
      title: "Sheet",
      href: "/components",
      items: getSheetComponents().map((component) => ({
        title: component.name,
        href: component.href,
      })),
    },
    {
      title: "Table",
      href: "/components",
      items: getTableComponents().map((component) => ({
        title: component.name,
        href: component.href,
      })),
    },
    {
      title: "Chart",
      href: "/components",
      items: getChartComponents().map((component) => ({
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

  // Determine which sidebar section should be expanded based on component category
  const getDefaultExpanded = (): string[] => {
    const category = component.category
    
    // Map component category to sidebar section title
    const categoryToSection: Record<string, string> = {
      "Toggle": "Toggle",
      "Tabs": "Tabs",
      "Sidebar": "Sidebar",
      "Tabbar": "Tabbar",
      "Sheet": "Sheet",
      "Table": "Table",
      "Chart": "Chart",
      "Button": "Button",
      "Card": "Card",
      "Badge": "Badge",
      "Input": "Input",
      "Dialog": "Dialog",
      "Sections": heroMeta ? "Hero" : featureMeta ? "Feature" : paymentMeta ? "Payment" : ctaMeta ? "CTA" : footerMeta ? "Footer" : headerMeta ? "Header" : "",
    }
    
    // For section components, determine the specific section type
    if (heroMeta) return ["Hero"]
    if (featureMeta) return ["Feature"]
    if (paymentMeta) return ["Payment"]
    if (ctaMeta) return ["CTA"]
    if (footerMeta) return ["Footer"]
    if (headerMeta) return ["Header"]
    
    // For other categories, use the mapping
    const sectionTitle = categoryToSection[category]
    if (sectionTitle) {
      return [sectionTitle]
    }
    
    return []
  }

  const defaultExpanded = getDefaultExpanded()

  return (
    <div className="container flex-1 items-start md:grid md:grid-cols-[220px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10">
      <aside className="fixed top-14 z-30 -ml-2 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 overflow-y-auto border-r md:sticky md:block">
        <div className="py-6 pl-6 pr-6 lg:py-8 lg:pl-8">
          <SidebarNav items={sidebarItems} defaultExpanded={defaultExpanded} />
        </div>
      </aside>

      <div className="py-8 md:py-12">
        <div className="mb-6">
          <BackToComponentsButton
            href={heroMeta || featureMeta || paymentMeta || ctaMeta || footerMeta || headerMeta ? "/components?tab=section" : "/components"}
            isSection={!!(heroMeta || featureMeta || paymentMeta || ctaMeta || footerMeta || headerMeta)}
          />
          <div className="inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold mb-3">
            {component.category}
          </div>
          <h1 className="text-3xl font-bold tracking-tight mb-2">{component.name}</h1>
          <p className="text-muted-foreground mb-4">{component.description}</p>
          {component.tags && component.tags.length > 0 && (
            <TagsList tags={component.tags} defaultVisible={10} />
          )}
          <ComponentNavigation
            currentSlug={slug}
            heroMeta={heroMeta}
            featureMeta={featureMeta}
            paymentMeta={paymentMeta}
            ctaMeta={ctaMeta}
            footerMeta={footerMeta}
            headerMeta={headerMeta}
            buttonMeta={buttonMeta}
            cardMeta={cardMeta}
            badgeMeta={badgeMeta}
            inputMeta={inputMeta}
            toggleMeta={toggleMeta}
            tabsMeta={tabsMeta}
            sidebarMeta={sidebarMeta}
            tabbarMeta={tabbarMeta}
            sheetMeta={sheetMeta}
            tableMeta={tableMeta}
            chartMeta={chartMeta}
            sheetMeta={sheetMeta}
          />
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
