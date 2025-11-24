import type { CanvasElement, Frame } from "./types"

export interface SectionTemplate {
  id: string
  name: string
  elements: Omit<CanvasElement, "id">[]
}

/**
 * Creates a Header section template with logo, navigation, and login button
 */
export function createHeaderTemplate(frameWidth: number): Omit<CanvasElement, "id">[] {
  const headerHeight = 80
  const elements: Omit<CanvasElement, "id">[] = []

  // Main header container (will be the parent) - use special marker
  const headerContainer: Omit<CanvasElement, "id"> = {
    type: "header",
    position: { x: 0, y: 0 },
    size: { width: frameWidth, height: headerHeight },
    props: {
      children: "Header",
    },
    tagName: "header",
    className: "flex items-center justify-between px-6 border-b",
    parentId: null,
  }
  elements.push(headerContainer)
  
  // Use special marker that will be replaced in store
  const headerId = "__HEADER_PARENT__"

  // Logo (left side) - child of header
  elements.push({
    type: "text",
    position: { x: 20, y: 20 },
    size: { width: 120, height: 40 },
    props: {
      text: "Logo",
      color: "currentColor",
    },
    tagName: "span",
    className: "text-2xl font-bold",
    parentId: headerId as any,
  })

  // Navigation tabs (center) - child of header
  const navItems = ["Home", "About", "Services", "Contact"]
  const navStartX = frameWidth / 2 - 200
  navItems.forEach((item, index) => {
    elements.push({
      type: "button",
      position: { x: navStartX + index * 100, y: 20 },
      size: { width: 80, height: 40 },
      props: {
        children: item,
        variant: "ghost",
      },
      tagName: "button",
      parentId: headerId as any,
    })
  })

  // Notification icon button (right side, before login) - child of header
  elements.push({
    type: "button",
    position: { x: frameWidth - 220, y: 20 },
    size: { width: 40, height: 40 },
    props: {
      children: "🔔",
      variant: "ghost",
      size: "icon",
    },
    tagName: "button",
    parentId: headerId as any,
  })

  // Login button (right side) - child of header
  elements.push({
    type: "button",
    position: { x: frameWidth - 120, y: 20 },
    size: { width: 100, height: 40 },
    props: {
      children: "Login",
      variant: "default",
    },
    tagName: "button",
    parentId: headerId as any,
  })

  return elements
}

/**
 * Creates a Hero section template with heading, subtitle, and CTA buttons
 */
export function createHeroTemplate(frameWidth: number): Omit<CanvasElement, "id">[] {
  const heroHeight = 600
  const centerX = frameWidth / 2
  const centerY = heroHeight / 2
  const elements: Omit<CanvasElement, "id">[] = []

  // Main hero container
  elements.push({
    type: "hero",
    position: { x: 0, y: 0 },
    size: { width: frameWidth, height: heroHeight },
    props: {
      children: "Hero Section",
    },
  })

  // Main heading
  elements.push({
    type: "text",
    position: { x: centerX - 200, y: centerY - 100 },
    size: { width: 400, height: 60 },
    props: {
      text: "Welcome to Our Platform",
      color: "currentColor",
      style: { fontSize: "48px", fontWeight: "bold", textAlign: "center" },
    },
  })

  // Subtitle
  elements.push({
    type: "text",
    position: { x: centerX - 250, y: centerY - 20 },
    size: { width: 500, height: 40 },
    props: {
      text: "Build amazing experiences with our powerful tools",
      color: "currentColor",
      style: { fontSize: "20px", textAlign: "center", opacity: 0.8 },
    },
  })

  // Primary CTA button
  elements.push({
    type: "button",
    position: { x: centerX - 120, y: centerY + 40 },
    size: { width: 200, height: 50 },
    props: {
      children: "Get Started",
      variant: "default",
      size: "lg",
    },
  })

  // Secondary CTA button
  elements.push({
    type: "button",
    position: { x: centerX + 80, y: centerY + 40 },
    size: { width: 150, height: 50 },
    props: {
      children: "Learn More",
      variant: "outline",
      size: "lg",
    },
  })

  return elements
}

/**
 * Creates a Footer section template with links, social media, and copyright
 */
export function createFooterTemplate(frameWidth: number): Omit<CanvasElement, "id">[] {
  const footerHeight = 200
  const elements: Omit<CanvasElement, "id">[] = []

  // Main footer container
  elements.push({
    type: "footer",
    position: { x: 0, y: 0 },
    size: { width: frameWidth, height: footerHeight },
    props: {
      children: "Footer Section",
    },
  })

  // Company info (left)
  elements.push({
    type: "text",
    position: { x: 40, y: 40 },
    size: { width: 200, height: 60 },
    props: {
      text: "Company Name\nYour tagline here",
      color: "currentColor",
      style: { fontSize: "14px", lineHeight: "1.6" },
    },
  })

  // Link columns
  const linkColumns = [
    { title: "About", links: ["About Us", "Team", "Careers"] },
    { title: "Services", links: ["Products", "Pricing", "Support"] },
    { title: "Legal", links: ["Privacy", "Terms", "Cookies"] },
  ]

  linkColumns.forEach((column, colIndex) => {
    const colX = 300 + colIndex * 200
    // Column title
    elements.push({
      type: "text",
      position: { x: colX, y: 40 },
      size: { width: 150, height: 24 },
      props: {
        text: column.title,
        color: "currentColor",
        style: { fontSize: "16px", fontWeight: "bold" },
      },
    })
    // Links
    column.links.forEach((link, linkIndex) => {
      elements.push({
        type: "text",
        position: { x: colX, y: 70 + linkIndex * 25 },
        size: { width: 150, height: 20 },
        props: {
          text: link,
          color: "currentColor",
          style: { fontSize: "14px", opacity: 0.7, cursor: "pointer" },
        },
      })
    })
  })

  // Copyright (bottom center)
  elements.push({
    type: "text",
    position: { x: frameWidth / 2 - 150, y: footerHeight - 30 },
    size: { width: 300, height: 20 },
    props: {
      text: `© ${new Date().getFullYear()} Company Name. All rights reserved.`,
      color: "currentColor",
      style: { fontSize: "12px", textAlign: "center", opacity: 0.6 },
    },
  })

  return elements
}

/**
 * Creates a Navbar section template with logo, menu, search, and user menu
 */
export function createNavbarTemplate(frameWidth: number): Omit<CanvasElement, "id">[] {
  const navbarHeight = 60
  const elements: Omit<CanvasElement, "id">[] = []

  // Main navbar container
  elements.push({
    type: "navbar",
    position: { x: 0, y: 0 },
    size: { width: frameWidth, height: navbarHeight },
    props: {
      children: "Navbar",
    },
  })

  // Logo (left)
  elements.push({
    type: "text",
    position: { x: 20, y: 10 },
    size: { width: 100, height: 40 },
    props: {
      text: "Logo",
      color: "currentColor",
      style: { fontSize: "20px", fontWeight: "bold" },
    },
  })

  // Menu items (center-left)
  const menuItems = ["Products", "Solutions", "Resources", "Pricing"]
  menuItems.forEach((item, index) => {
    elements.push({
      type: "button",
      position: { x: 150 + index * 100, y: 10 },
      size: { width: 80, height: 40 },
      props: {
        children: item,
        variant: "ghost",
      },
    })
  })

  // Search input (center-right)
  elements.push({
    type: "input",
    position: { x: frameWidth - 300, y: 10 },
    size: { width: 200, height: 40 },
    props: {
      placeholder: "Search...",
    },
  })

  // User menu button (right)
  elements.push({
    type: "button",
    position: { x: frameWidth - 80, y: 10 },
    size: { width: 60, height: 40 },
    props: {
      children: "User",
      variant: "outline",
    },
  })

  return elements
}

/**
 * Creates a Sidebar section template with navigation items
 */
export function createSidebarTemplate(frameHeight: number): Omit<CanvasElement, "id">[] {
  const sidebarWidth = 250
  const elements: Omit<CanvasElement, "id">[] = []

  // Main sidebar container
  elements.push({
    type: "sidebar",
    position: { x: 0, y: 0 },
    size: { width: sidebarWidth, height: frameHeight },
    props: {
      children: "Sidebar",
    },
  })

  // User profile section (top)
  elements.push({
    type: "div",
    position: { x: 10, y: 20 },
    size: { width: sidebarWidth - 20, height: 80 },
    props: {
      children: "User Profile",
      style: { padding: "16px", borderBottom: "1px solid rgba(0,0,0,0.1)" },
    },
  })

  // Navigation items
  const navItems = [
    "Dashboard",
    "Projects",
    "Settings",
    "Analytics",
    "Team",
    "Documents",
    "Help",
  ]

  navItems.forEach((item, index) => {
    elements.push({
      type: "button",
      position: { x: 10, y: 120 + index * 50 },
      size: { width: sidebarWidth - 20, height: 40 },
      props: {
        children: item,
        variant: "ghost",
        style: { justifyContent: "flex-start" },
      },
    })
  })

  return elements
}

/**
 * Creates a CTA section template with heading, description, and action buttons
 */
export function createCTATemplate(frameWidth: number): Omit<CanvasElement, "id">[] {
  const ctaHeight = 300
  const centerX = frameWidth / 2
  const centerY = ctaHeight / 2
  const elements: Omit<CanvasElement, "id">[] = []

  // Main CTA container
  elements.push({
    type: "cta",
    position: { x: 0, y: 0 },
    size: { width: frameWidth, height: ctaHeight },
    props: {
      children: "Call to Action",
    },
  })

  // Heading
  elements.push({
    type: "text",
    position: { x: centerX - 200, y: centerY - 60 },
    size: { width: 400, height: 40 },
    props: {
      text: "Ready to Get Started?",
      color: "currentColor",
      style: { fontSize: "36px", fontWeight: "bold", textAlign: "center" },
    },
  })

  // Description
  elements.push({
    type: "text",
    position: { x: centerX - 250, y: centerY - 10 },
    size: { width: 500, height: 30 },
    props: {
      text: "Join thousands of users who are already building amazing things",
      color: "currentColor",
      style: { fontSize: "16px", textAlign: "center", opacity: 0.8 },
    },
  })

  // Primary action button
  elements.push({
    type: "button",
    position: { x: centerX - 100, y: centerY + 40 },
    size: { width: 180, height: 50 },
    props: {
      children: "Start Free Trial",
      variant: "default",
      size: "lg",
    },
  })

  // Secondary action button
  elements.push({
    type: "button",
    position: { x: centerX + 100, y: centerY + 40 },
    size: { width: 150, height: 50 },
    props: {
      children: "Contact Sales",
      variant: "outline",
      size: "lg",
    },
  })

  return elements
}

/**
 * Creates a Feature1 section template with title, description, buttons, and image
 */
export function createFeature1Template(frameWidth: number): Omit<CanvasElement, "id">[] {
  const featureHeight = 600
  const elements: Omit<CanvasElement, "id">[] = []

  // Main section container
  const sectionContainer: Omit<CanvasElement, "id"> = {
    type: "section",
    position: { x: 0, y: 0 },
    size: { width: frameWidth, height: featureHeight },
    props: {
      children: "Feature Section",
    },
    tagName: "section",
    className: "py-32",
    parentId: null,
  }
  elements.push(sectionContainer)
  
  const sectionId = "__FEATURE1_SECTION__"

  // Container div
  const containerDiv: Omit<CanvasElement, "id"> = {
    type: "div",
    position: { x: 0, y: 128 }, // py-32 = 128px padding
    size: { width: frameWidth, height: featureHeight - 256 },
    props: {},
    tagName: "div",
    className: "container",
    parentId: sectionId as any,
  }
  elements.push(containerDiv)
  const containerId = "__FEATURE1_CONTAINER__"

  // Grid container
  const gridDiv: Omit<CanvasElement, "id"> = {
    type: "div",
    position: { x: 0, y: 0 },
    size: { width: frameWidth, height: featureHeight - 256 },
    props: {},
    tagName: "div",
    className: "grid items-center gap-8 lg:grid-cols-2",
    parentId: containerId as any,
  }
  elements.push(gridDiv)
  const gridId = "__FEATURE1_GRID__"

  // Left column container
  const leftColumn: Omit<CanvasElement, "id"> = {
    type: "div",
    position: { x: 0, y: 0 },
    size: { width: frameWidth / 2 - 16, height: featureHeight - 256 },
    props: {},
    tagName: "div",
    className: "flex flex-col items-center text-center lg:items-start lg:text-left",
    parentId: gridId as any,
  }
  elements.push(leftColumn)
  const leftColumnId = "__FEATURE1_LEFT__"

  // Title (h2)
  elements.push({
    type: "text",
    position: { x: 0, y: 0 },
    size: { width: frameWidth / 2 - 100, height: 60 },
    props: {
      text: "Blocks built with Shadcn & Tailwind",
    },
    tagName: "h2",
    className: "my-6 mt-0 text-balance text-4xl font-semibold lg:text-5xl",
    parentId: leftColumnId as any,
  })

  // Description (p)
  elements.push({
    type: "text",
    position: { x: 0, y: 80 },
    size: { width: frameWidth / 2 - 100, height: 80 },
    props: {
      text: "Hundreds of finely crafted components built with React, Tailwind and Shadcn UI. Developers can copy and paste these blocks directly into their project.",
    },
    tagName: "p",
    className: "text-muted-foreground mb-8 max-w-xl lg:text-lg",
    parentId: leftColumnId as any,
  })

  // Buttons container
  const buttonsContainer: Omit<CanvasElement, "id"> = {
    type: "div",
    position: { x: 0, y: 180 },
    size: { width: frameWidth / 2 - 100, height: 50 },
    props: {},
    tagName: "div",
    className: "flex w-full flex-col justify-center gap-2 sm:flex-row lg:justify-start",
    parentId: leftColumnId as any,
  }
  elements.push(buttonsContainer)
  const buttonsId = "__FEATURE1_BUTTONS__"

  // Primary button
  elements.push({
    type: "button",
    position: { x: 0, y: 0 },
    size: { width: 140, height: 40 },
    props: {
      children: "Get Started",
      href: "https://shadcnblocks.com",
    },
    tagName: "button",
    parentId: buttonsId as any,
  })

  // Secondary button
  elements.push({
    type: "button",
    position: { x: 150, y: 0 },
    size: { width: 120, height: 40 },
    props: {
      children: "Learn More",
      variant: "outline",
      href: "https://shadcnblocks.com",
    },
    tagName: "button",
    parentId: buttonsId as any,
  })

  // Right column - Image
  elements.push({
    type: "image",
    position: { x: frameWidth / 2 + 16, y: 0 },
    size: { width: frameWidth / 2 - 32, height: featureHeight - 256 },
    props: {
      src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-1.svg",
      alt: "placeholder hero",
    },
    tagName: "img",
    className: "max-h-96 w-full rounded-md object-cover",
    parentId: gridId as any,
  })

  return elements
}

/**
 * Get section template by section ID
 */
export function getSectionTemplate(
  sectionId: string,
  frame: Frame
): Omit<CanvasElement, "id">[] {
  switch (sectionId) {
    case "header":
      return createHeaderTemplate(frame.width)
    case "hero":
      return createHeroTemplate(frame.width)
    case "footer":
      return createFooterTemplate(frame.width)
    case "navbar":
      return createNavbarTemplate(frame.width)
    case "sidebar":
      return createSidebarTemplate(frame.height)
    case "cta":
      return createCTATemplate(frame.width)
    case "feature1":
      return createFeature1Template(frame.width)
    default:
      return []
  }
}

// Re-export for better module resolution
export type { SectionTemplate }

