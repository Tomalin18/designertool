export type TabsPropControl =
  | "text"
  | "textarea"
  | "boolean"
  | "select"
  | "slider"
  | "color"
  | "number"

export interface TabsPropDefinition {
  control: TabsPropControl
  default: string | number | boolean
  description: string
  options?: string[]
  min?: number
  max?: number
}

export interface TabsSectionMeta {
  slug: string
  name: string
  componentName: string
  description: string
  tags: string[]
  props: Record<string, TabsPropDefinition>
  groupingConfig?: any
}

// Common props for tabs
const commonTabsProps: Record<string, TabsPropDefinition> = {
  className: {
    control: "text",
    default: "",
    description: "Additional CSS classes to apply to the tabs component.",
  },
  tabs: {
    control: "textarea",
    default: "Tab 1\nTab 2\nTab 3",
    description: "List of tab labels, one per line.",
  },
  defaultActive: {
    control: "text",
    default: "",
    description: "Initial active tab (uses first tab if empty).",
  },
  activeColor: {
    control: "color",
    default: "",
    description: "Color for active tab (optional, uses default if empty).",
  },
  inactiveColor: {
    control: "color",
    default: "",
    description: "Color for inactive tabs (optional, uses default if empty).",
  },
  backgroundColor: {
    control: "color",
    default: "",
    description: "Background color (optional, uses default if empty).",
  },
}

export const tabsSections: TabsSectionMeta[] = [
  {
    slug: "simple-underline-tabs",
    name: "Simple Underline Tabs",
    componentName: "SimpleUnderlineTabs",
    description: "Simple tabs with underline indicator for active tab.",
    tags: ["tabs", "underline", "simple", "navigation"],
    props: {
      ...commonTabsProps,
      tabs: {
        control: "textarea",
        default: "Account\nPassword\nNotifications\nBilling",
        description: "List of tab labels, one per line.",
      },
      activeColor: {
        control: "color",
        default: "#6366f1",
        description: "Color of the underline indicator.",
      },
    },
  },
  {
    slug: "pill-tabs",
    name: "Pill Tabs",
    componentName: "PillTabs",
    description: "Tabs styled as pills with rounded background.",
    tags: ["tabs", "pill", "rounded", "navigation"],
    props: {
      ...commonTabsProps,
      tabs: {
        control: "textarea",
        default: "Overview\nIntegrations\nActivity\nDomains",
        description: "List of tab labels, one per line.",
      },
      activeColor: {
        control: "color",
        default: "",
        description: "Background color for active tab (optional).",
      },
      backgroundColor: {
        control: "color",
        default: "#171717",
        description: "Background color of the tabs container.",
      },
    },
  },
  {
    slug: "segmented-tabs",
    name: "Segmented Control",
    componentName: "SegmentedTabs",
    description: "iOS-style segmented control tabs.",
    tags: ["tabs", "segmented", "ios", "control"],
    props: {
      ...commonTabsProps,
      tabs: {
        control: "textarea",
        default: "Daily\nWeekly\nMonthly\nYearly",
        description: "List of tab labels, one per line.",
      },
      activeColor: {
        control: "color",
        default: "",
        description: "Background color for active tab (optional).",
      },
      backgroundColor: {
        control: "color",
        default: "#e5e7eb",
        description: "Background color of the segmented control.",
      },
    },
  },
  {
    slug: "icon-tabs",
    name: "Icon Only Tabs",
    componentName: "IconTabs",
    description: "Tabs with icons only, no text labels.",
    tags: ["tabs", "icon", "minimal", "navigation"],
    props: {
      ...commonTabsProps,
      tabs: {
        control: "textarea",
        default: "Home\nActivity\nMessages\nProfile",
        description: "List of tab labels (icons are predefined).",
      },
      activeColor: {
        control: "color",
        default: "#818cf8",
        description: "Color for active tab icon.",
      },
    },
  },
  {
    slug: "vertical-tabs",
    name: "Vertical Tabs",
    componentName: "VerticalTabs",
    description: "Sidebar-style vertical tabs layout.",
    tags: ["tabs", "vertical", "sidebar", "layout"],
    props: {
      ...commonTabsProps,
      tabs: {
        control: "textarea",
        default: "General\nProfile\nPassword\nTeam\nBilling\nNotifications",
        description: "List of tab labels, one per line.",
      },
      activeColor: {
        control: "color",
        default: "",
        description: "Background color for active tab (optional).",
      },
      backgroundColor: {
        control: "color",
        default: "#0a0a0a",
        description: "Background color of the container.",
      },
    },
  },
  {
    slug: "floating-tabs",
    name: "Floating Bar Tabs",
    componentName: "FloatingTabs",
    description: "Floating tab bar with backdrop blur effect.",
    tags: ["tabs", "floating", "glass", "blur"],
    props: {
      ...commonTabsProps,
      tabs: {
        control: "textarea",
        default: "Discover\nArcade\nCreate\nWork\nPlay",
        description: "List of tab labels, one per line.",
      },
      activeColor: {
        control: "color",
        default: "",
        description: "Background color for active tab (optional).",
      },
      backgroundColor: {
        control: "color",
        default: "#171717",
        description: "Background color of the floating bar.",
      },
    },
  },
  {
    slug: "folder-tabs",
    name: "Folder Tabs",
    componentName: "FolderTabs",
    description: "Browser-style file folder tabs.",
    tags: ["tabs", "folder", "browser", "file"],
    props: {
      ...commonTabsProps,
      tabs: {
        control: "textarea",
        default: "index.tsx\nApp.tsx\nstyles.css\nutils.ts",
        description: "List of file names, one per line.",
      },
      activeColor: {
        control: "color",
        default: "#1e1e1e",
        description: "Background color for active tab.",
      },
      backgroundColor: {
        control: "color",
        default: "#252526",
        description: "Background color of the tab bar.",
      },
    },
  },
  {
    slug: "neon-tabs",
    name: "Neon Glowing Tabs",
    componentName: "NeonTabs",
    description: "Tabs with neon glow effect and cyan styling.",
    tags: ["tabs", "neon", "glow", "cyberpunk"],
    props: {
      ...commonTabsProps,
      tabs: {
        control: "textarea",
        default: "Cyber\nPunk\nNeon\nFuture",
        description: "List of tab labels, one per line.",
      },
      activeColor: {
        control: "color",
        default: "#22d3ee",
        description: "Neon glow color for active tab.",
      },
    },
  },
  {
    slug: "minimal-text-tabs",
    name: "Minimal Text Tabs",
    componentName: "MinimalTextTabs",
    description: "Minimal tabs with large text that scales on selection.",
    tags: ["tabs", "minimal", "text", "typography"],
    props: {
      ...commonTabsProps,
      tabs: {
        control: "textarea",
        default: "Design\nCode\nShip",
        description: "List of tab labels, one per line.",
      },
      activeColor: {
        control: "color",
        default: "#ffffff",
        description: "Text color for active tab.",
      },
      inactiveColor: {
        control: "color",
        default: "#262626",
        description: "Text color for inactive tabs.",
      },
    },
  },
  {
    slug: "box-tabs",
    name: "Box Tabs",
    componentName: "BoxTabs",
    description: "Connected box-style tabs with border.",
    tags: ["tabs", "box", "connected", "border"],
    props: {
      ...commonTabsProps,
      tabs: {
        control: "textarea",
        default: "Personal\nTeam\nEnterprise",
        description: "List of tab labels, one per line.",
      },
      activeColor: {
        control: "color",
        default: "#171717",
        description: "Background color for active tab.",
      },
      backgroundColor: {
        control: "color",
        default: "#0a0a0a",
        description: "Background color of the container.",
      },
    },
  },
  {
    slug: "gradient-tabs",
    name: "Gradient Border Tabs",
    componentName: "GradientTabs",
    description: "Tabs with gradient border effect.",
    tags: ["tabs", "gradient", "border", "colorful"],
    props: {
      ...commonTabsProps,
      tabs: {
        control: "textarea",
        default: "AI Models\nDatasets\nFine-tuning",
        description: "List of tab labels, one per line.",
      },
      activeColor: {
        control: "color",
        default: "",
        description: "Gradient colors are predefined (pink to yellow).",
      },
      backgroundColor: {
        control: "color",
        default: "#171717",
        description: "Background color of the tabs container.",
      },
    },
  },
  {
    slug: "glass-tabs",
    name: "Glass Tabs",
    componentName: "GlassTabs",
    description: "Glassmorphism style tabs with backdrop blur.",
    tags: ["tabs", "glass", "glassmorphism", "blur"],
    props: {
      ...commonTabsProps,
      tabs: {
        control: "textarea",
        default: "Music\nVideo\nImages",
        description: "List of tab labels, one per line.",
      },
      activeColor: {
        control: "color",
        default: "",
        description: "Background color for active tab (optional).",
      },
    },
  },
  {
    slug: "retro-tabs",
    name: "Retro Windows 95 Tabs",
    componentName: "RetroTabs",
    description: "Nostalgic Windows 95 style tabs.",
    tags: ["tabs", "retro", "windows", "vintage"],
    props: {
      ...commonTabsProps,
      tabs: {
        control: "textarea",
        default: "Setup\nDisplay\nSound\nNetwork",
        description: "List of tab labels, one per line.",
      },
      activeColor: {
        control: "color",
        default: "#c0c0c0",
        description: "Background color for active tab.",
      },
      backgroundColor: {
        control: "color",
        default: "#c0c0c0",
        description: "Background color of the container.",
      },
    },
  },
  {
    slug: "status-tabs",
    name: "Status Badge Tabs",
    componentName: "StatusTabs",
    description: "Tabs with status badge counts.",
    tags: ["tabs", "badge", "status", "count"],
    props: {
      ...commonTabsProps,
      tabs: {
        control: "textarea",
        default: "All:12\nUnread:4\nArchived:0",
        description: "List of tabs with counts, format: 'Label:Count', one per line.",
      },
      activeColor: {
        control: "color",
        default: "",
        description: "Background color for active tab (optional).",
      },
      backgroundColor: {
        control: "color",
        default: "#171717",
        description: "Background color of the tabs container.",
      },
    },
  },
  {
    slug: "circle-tabs",
    name: "Circle Indicator Tabs",
    componentName: "CircleTabs",
    description: "Step indicator tabs with circle numbers.",
    tags: ["tabs", "circle", "step", "indicator"],
    props: {
      ...commonTabsProps,
      tabs: {
        control: "textarea",
        default: "Step 1\nStep 2\nStep 3\nStep 4",
        description: "List of step labels, one per line.",
      },
      activeColor: {
        control: "color",
        default: "#6366f1",
        description: "Color for active step circle.",
      },
    },
  },
  {
    slug: "arrow-tabs",
    name: "Arrow Breadcrumb Tabs",
    componentName: "ArrowTabs",
    description: "Arrow-shaped breadcrumb style tabs.",
    tags: ["tabs", "arrow", "breadcrumb", "navigation"],
    props: {
      ...commonTabsProps,
      tabs: {
        control: "textarea",
        default: "Cart\nShipping\nPayment\nConfirm",
        description: "List of tab labels, one per line.",
      },
      activeColor: {
        control: "color",
        default: "#2563eb",
        description: "Background color for active tab.",
      },
      backgroundColor: {
        control: "color",
        default: "#171717",
        description: "Background color of the tabs container.",
      },
    },
  },
  {
    slug: "animated-underline-tabs",
    name: "Dynamic Underline",
    componentName: "AnimatedUnderlineTabs",
    description: "Tabs with animated sliding underline indicator.",
    tags: ["tabs", "animated", "underline", "smooth"],
    props: {
      ...commonTabsProps,
      tabs: {
        control: "textarea",
        default: "Product\nFeatures\nMarketplace\nCompany",
        description: "List of tab labels, one per line.",
      },
      activeColor: {
        control: "color",
        default: "#ffffff",
        description: "Color of the underline indicator.",
      },
    },
  },
  {
    slug: "card-stack-tabs",
    name: "Card Stack Tabs",
    componentName: "CardStackTabs",
    description: "Credit card style stacked tabs.",
    tags: ["tabs", "card", "stack", "credit"],
    props: {
      ...commonTabsProps,
      tabs: {
        control: "textarea",
        default: "Visa\nMaster\nAmex",
        description: "List of card types, one per line.",
      },
      activeColor: {
        control: "color",
        default: "#2563eb",
        description: "Color for first card (Visa).",
      },
    },
  },
  {
    slug: "mobile-tab-bar",
    name: "Tab Bar",
    componentName: "MobileTabBar",
    description: "Mobile bottom navigation tab bar.",
    tags: ["tabs", "mobile", "bottom", "navigation"],
    props: {
      ...commonTabsProps,
      tabs: {
        control: "textarea",
        default: "Home\nSearch\nReels\nShop\nProfile",
        description: "List of tab labels (icons are predefined).",
      },
      activeColor: {
        control: "color",
        default: "#ffffff",
        description: "Color for active tab icon.",
      },
    },
  },
  {
    slug: "code-file-tabs",
    name: "Code File Tabs",
    componentName: "CodeFileTabs",
    description: "Code editor style file tabs.",
    tags: ["tabs", "code", "file", "editor"],
    props: {
      ...commonTabsProps,
      tabs: {
        control: "textarea",
        default: "page.tsx\nlayout.tsx\nglobals.css\ncomponents",
        description: "List of file names, one per line.",
      },
      activeColor: {
        control: "color",
        default: "#3b82f6",
        description: "Border color for active tab.",
      },
      backgroundColor: {
        control: "color",
        default: "#1e1e1e",
        description: "Background color of the tab bar.",
      },
    },
  },
]

