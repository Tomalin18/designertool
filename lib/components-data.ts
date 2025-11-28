import { heroSections } from "./hero-sections"
import { featureSections } from "./feature-sections"
import { paymentSections } from "./payment-sections"
import { ctaSections } from "./cta-sections"
import { headerSections } from "./header-sections"
import { buttonSections } from "./button-sections"
import { inputSections } from "./input-sections"
import { dialogSections } from "./dialog-sections"
import { toggleSections } from "./toggle-sections"
import { tabsSections } from "./tabs-sections"
import { sidebarSections } from "./sidebar-sections"
import { tabbarSections } from "./tabbar-sections"

export interface ComponentInfo {
  name: string
  description: string
  href: string
  category: string
  tags?: string[]
}

const baseComponents: ComponentInfo[] = [
  {
    name: "Accordion",
    description: "A vertically stacked set of interactive headings that each reveal a section of content.",
    href: "/components/accordion",
    category: "Display",
  },
  {
    name: "Alert",
    description: "Displays a callout for user attention.",
    href: "/components/alert",
    category: "Feedback",
  },
  {
    name: "Avatar",
    description: "An image element with a fallback for representing the user.",
    href: "/components/avatar",
    category: "Display",
  },
  {
    name: "Badge",
    description: "Displays a badge or a component that looks like a badge.",
    href: "/components/badge",
    category: "Display",
  },
  {
    name: "Button",
    description: "Displays a button or a component that looks like a button.",
    href: "/components/button",
    category: "Forms",
  },
  {
    name: "Card",
    description: "Displays a card with header, content, and footer.",
    href: "/components/card",
    category: "Display",
  },
  {
    name: "Checkbox",
    description: "A control that allows the user to toggle between checked and not checked.",
    href: "/components/checkbox",
    category: "Forms",
  },
  {
    name: "Dialog",
    description: "A window overlaid on either the primary window or another dialog window.",
    href: "/components/dialog",
    category: "Overlay",
  },
  {
    name: "Dropdown Menu",
    description: "Displays a menu to the user — such as a set of actions or functions — triggered by a button.",
    href: "/components/dropdown-menu",
    category: "Overlay",
  },
  {
    name: "Input",
    description: "Displays a form input field or a component that looks like an input field.",
    href: "/components/input",
    category: "Forms",
  },
  {
    name: "Label",
    description: "Renders an accessible label associated with controls.",
    href: "/components/label",
    category: "Forms",
  },
  {
    name: "Select",
    description: "Displays a list of options for the user to pick from—triggered by a button.",
    href: "/components/select",
    category: "Forms",
  },
  {
    name: "Separator",
    description: "Visually or semantically separates content.",
    href: "/components/separator",
    category: "Layout",
  },
  {
    name: "Skeleton",
    description: "Use to show a placeholder while content is loading.",
    href: "/components/skeleton",
    category: "Feedback",
  },
  {
    name: "Switch",
    description: "A control that allows the user to toggle between checked and not checked.",
    href: "/components/switch",
    category: "Forms",
  },
  {
    name: "Tabs",
    description: "A set of layered sections of content—known as tab panels—that are displayed one at a time.",
    href: "/components/tabs",
    category: "Navigation",
  },
  {
    name: "Textarea",
    description: "Displays a form textarea or a component that looks like a textarea.",
    href: "/components/textarea",
    category: "Forms",
  },
  {
    name: "Toast",
    description: "A succinct message that is displayed temporarily.",
    href: "/components/toast",
    category: "Feedback",
  },
  {
    name: "Toggle",
    description: "A two-state button that can be either on or off.",
    href: "/components/toggle",
    category: "Forms",
  },
  {
    name: "Tooltip",
    description:
      "A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.",
    href: "/components/tooltip",
    category: "Overlay",
  },
]

const heroComponentEntries: ComponentInfo[] = heroSections.map((hero) => ({
  name: hero.name,
  description: hero.description,
  href: `/components/${hero.slug}`,
  category: "Sections",
  tags: hero.tags,
}))

const featureComponentEntries: ComponentInfo[] = featureSections.map((feature) => ({
  name: feature.name,
  description: feature.description,
  href: `/components/${feature.slug}`,
  category: "Sections",
  tags: feature.tags,
}))

const paymentComponentEntries: ComponentInfo[] = paymentSections.map((payment) => ({
  name: payment.name,
  description: payment.description,
  href: `/components/${payment.slug}`,
  category: "Sections",
  tags: payment.tags,
}))

const ctaComponentEntries: ComponentInfo[] = ctaSections.map((cta) => ({
  name: cta.name,
  description: cta.description,
  href: `/components/${cta.slug}`,
  category: "Sections",
  tags: cta.tags,
}))

const headerComponentEntries: ComponentInfo[] = headerSections.map((header) => ({
  name: header.name,
  description: header.description,
  href: `/components/${header.slug}`,
  category: "Sections",
  tags: header.tags,
}))

const buttonComponentEntries: ComponentInfo[] = buttonSections.map((button) => ({
  name: button.name,
  description: button.description,
  href: `/components/${button.slug}`,
  category: "Button",
  tags: button.tags,
}))

const inputComponentEntries: ComponentInfo[] = inputSections.map((input) => ({
  name: input.name,
  description: input.description,
  href: `/components/${input.slug}`,
  category: "Input",
  tags: input.tags,
}))

const dialogComponentEntries: ComponentInfo[] = dialogSections.map((dialog) => ({
  name: dialog.name,
  description: dialog.description,
  href: `/components/${dialog.slug}`,
  category: "Dialog",
  tags: dialog.tags,
}))

const toggleComponentEntries: ComponentInfo[] = toggleSections.map((toggle) => ({
  name: toggle.name,
  description: toggle.description,
  href: `/components/${toggle.slug}`,
  category: "Toggle",
  tags: toggle.tags,
}))

const tabsComponentEntries: ComponentInfo[] = tabsSections.map((tab) => ({
  name: tab.name,
  description: tab.description,
  href: `/components/${tab.slug}`,
  category: "Tabs",
  tags: tab.tags,
}))

const sidebarComponentEntries: ComponentInfo[] = sidebarSections.map((sidebar) => ({
  name: sidebar.name,
  description: sidebar.description,
  href: `/components/${sidebar.slug}`,
  category: "Sidebar",
  tags: sidebar.tags,
}))

const tabbarComponentEntries: ComponentInfo[] = tabbarSections.map((tabbar) => ({
  name: tabbar.name,
  description: tabbar.description,
  href: `/components/${tabbar.slug}`,
  category: "Tabbar",
  tags: tabbar.tags,
}))

export const componentsData: ComponentInfo[] = [...baseComponents, ...heroComponentEntries, ...featureComponentEntries, ...paymentComponentEntries, ...ctaComponentEntries, ...headerComponentEntries, ...buttonComponentEntries, ...inputComponentEntries, ...dialogComponentEntries, ...toggleComponentEntries, ...tabsComponentEntries, ...sidebarComponentEntries, ...tabbarComponentEntries]

export const categories = ["All", "Display", "Forms", "Feedback", "Overlay", "Layout", "Navigation", "Sections", "Button", "Input", "Dialog", "Toggle", "Tabs", "Sidebar", "Tabbar"] as const
