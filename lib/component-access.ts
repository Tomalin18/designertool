const freeComponentNamesByCategory = {
  Button: [
    "Ghost Hover Button",
    "Pulse Glow Button",
    "Glassmorphism Button",
    "Elastic Button",
    "Like Button",
    "Upload Button",
    "Toggle Switch Button",
    "Double Border Button",
    "Print Button",
    "Save Button",
  ],
  Card: [
    "Simple Card",
    "Image Card",
    "Stats Card",
    "Testimonial Card",
    "Task Card",
    "Product Card",
    "Feature Icon Card",
    "Alert Card",
    "Skill Card",
    "Cookie Card",
  ],
  Badge: [
    "Solid Badge",
    "Outline Badge",
    "Soft Badge",
    "Dot Badge",
    "Count Badge",
    "Pulsing Badge",
    "Status Dot",
    "Dark Pill Badge",
    "Category Badge",
    "Platform Badge",
  ],
  Input: [
    "Standard Input",
    "Password Input",
    "File Upload Input",
    "URL Input",
    "Date Input",
  ],
  Dialog: [
    "Simple Alert Dialog",
    "Success Dialog",
    "Cookie Dialog",
    "Login Dialog",
    "Upload Dialog",
  ],
  Toggle: [
    "Simple Toggle",
    "iOS Style Toggle",
    "Outline Toggle",
    "Material Ripple Toggle",
    "Thin Toggle",
  ],
  Tabs: [
    "Simple Underline Tabs",
    "Pill Tabs",
    "Box Tabs",
  ],
  Sidebar: [
    "Simple Sidebar",
  ],
  Tabbar: [
    "Social Media Style",
    "Text Only Minimalist",
    "Cupertino Blurred Bar",
  ],
  Sheet: [
    "Standard Right Sheet",
    "Bottom Sheet",
    "Cart Sheet",
    "Notification Sheet",
  ],
  Table: [
    "Basic Table",
    "Leaderboard Table",
    "Status Board",
    "Striped Table",
  ],
  Chart: [
    "Simple Bar Chart",
    "Simple Line Chart",
    "Simple Pie Chart",
  ],
} as const

type FreeCategory = keyof typeof freeComponentNamesByCategory

const freeComponentSets: Partial<Record<FreeCategory, Set<string>>> = Object.fromEntries(
  Object.entries(freeComponentNamesByCategory).map(([category, names]) => [
    category,
    new Set(names),
  ]),
) as Partial<Record<FreeCategory, Set<string>>>

export function isComponentPremium(name: string, category?: string) {
  if (category) {
    const freeSet = freeComponentSets[category as FreeCategory]
    if (freeSet) {
      return !freeSet.has(name)
    }
    return true
  }

  return true
}

export function isComponentFree(name: string, category?: string) {
  return !isComponentPremium(name, category)
}

