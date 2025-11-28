export type TabbarPropControl =
  | "text"
  | "textarea"
  | "boolean"
  | "select"
  | "slider"
  | "color"
  | "number"

export interface TabbarPropDefinition {
  control: TabbarPropControl
  default: string | number | boolean
  description: string
  options?: string[]
  min?: number
  max?: number
}

export interface TabbarSectionMeta {
  slug: string
  name: string
  componentName: string
  description: string
  tags: string[]
  props: Record<string, TabbarPropDefinition>
}

// Common props for tabbars
const commonTabbarProps: Record<string, TabbarPropDefinition> = {
  className: {
    control: "text",
    default: "",
    description: "Additional CSS classes to apply to the tabbar component.",
  },
  items: {
    control: "textarea",
    default: "",
    description: "List of tab items, one per line. Leave empty to use default items.",
  },
  icons: {
    control: "textarea",
    default: "",
    description: "List of icon names for each item (one per line, same order as items). Available: Home, Search, User, Bell, Settings, Plus, Heart, ShoppingBag, Map, Calendar, MessageSquare, Menu, Compass, Star, Video, Music, Grid, Layers, Zap, Radio, Scan, TrendingUp, Mail, Send",
  },
  showLabels: {
    control: "boolean",
    default: true,
    description: "Whether to show text labels below icons.",
  },
  backgroundColor: {
    control: "color",
    default: "",
    description: "Background color (optional, uses default if empty).",
  },
  activeColor: {
    control: "color",
    default: "",
    description: "Active item color (optional, uses default if empty).",
  },
  inactiveColor: {
    control: "color",
    default: "",
    description: "Inactive item color (optional, uses default if empty).",
  },
}

export const tabbarSections: TabbarSectionMeta[] = [
  {
    slug: "ios-tab-bar",
    name: "iOS Tab Bar",
    componentName: "IosTabBar",
    description: "A standard iOS-style tab bar with icons and labels.",
    tags: ["tabbar", "ios", "mobile", "navigation"],
    props: {
      ...commonTabbarProps,
      items: {
        control: "textarea",
        default: "Home\nSearch\nLibrary",
        description: "List of tab items, one per line.",
      },
      icons: {
        control: "textarea",
        default: "Home\nSearch\nLayers",
        description: "List of icon names for each item (one per line).",
      },
      showLabels: {
        control: "boolean",
        default: true,
        description: "Whether to show text labels below icons.",
      },
      activeColor: {
        control: "color",
        default: "#3b82f6",
        description: "Color for active tab (blue by default).",
      },
      inactiveColor: {
        control: "color",
        default: "#737373",
        description: "Color for inactive tabs (gray by default).",
      },
    },
  },
  {
    slug: "material-tab-bar",
    name: "Material 3 Tab Bar",
    componentName: "MaterialTabBar",
    description: "A Material Design 3 style tab bar with rounded active indicators.",
    tags: ["tabbar", "material", "google", "navigation"],
    props: {
      ...commonTabbarProps,
      items: {
        control: "textarea",
        default: "Mail\nChat\nMeet",
        description: "List of tab items, one per line.",
      },
      icons: {
        control: "textarea",
        default: "Mail\nMessageSquare\nVideo",
        description: "List of icon names for each item (one per line).",
      },
      showLabels: {
        control: "boolean",
        default: true,
        description: "Whether to show text labels below icons.",
      },
      activeColor: {
        control: "color",
        default: "#004A77",
        description: "Background color for active tab.",
      },
      activeTextColor: {
        control: "color",
        default: "#C2E7FF",
        description: "Text color for active tab.",
      },
      inactiveColor: {
        control: "color",
        default: "#ffffff",
        description: "Text color for inactive tabs.",
      },
    },
  },
  {
    slug: "island-tab-bar",
    name: "Floating Island Tab Bar",
    componentName: "IslandTabBar",
    description: "A floating island-style tab bar with glassmorphic design.",
    tags: ["tabbar", "floating", "island", "glassmorphic"],
    props: {
      ...commonTabbarProps,
      items: {
        control: "textarea",
        default: "Home\nSearch\nNotifications\nProfile",
        description: "List of tab items, one per line.",
      },
      icons: {
        control: "textarea",
        default: "Home\nSearch\nBell\nUser",
        description: "List of icon names for each item (one per line).",
      },
      showLabels: {
        control: "boolean",
        default: false,
        description: "Whether to show text labels below icons.",
      },
      backgroundColor: {
        control: "color",
        default: "rgba(255, 255, 255, 0.1)",
        description: "Background color with transparency.",
      },
      activeColor: {
        control: "color",
        default: "#ffffff",
        description: "Background color for active button.",
      },
      activeTextColor: {
        control: "color",
        default: "#000000",
        description: "Text/icon color for active button.",
      },
      inactiveColor: {
        control: "color",
        default: "#ffffff",
        description: "Icon color for inactive buttons.",
      },
    },
  },
  {
    slug: "notched-fab-bar",
    name: "Notched FAB Bar",
    componentName: "NotchedFabBar",
    description: "A tab bar with a notched floating action button in the center.",
    tags: ["tabbar", "fab", "notched", "floating"],
    props: {
      ...commonTabbarProps,
      items: {
        control: "textarea",
        default: "Home\nCalendar\nMessages\nProfile",
        description: "List of tab items, one per line.",
      },
      icons: {
        control: "textarea",
        default: "Home\nCalendar\nMessageSquare\nUser",
        description: "List of icon names for each item (one per line).",
      },
      showLabels: {
        control: "boolean",
        default: false,
        description: "Whether to show text labels below icons.",
      },
      fabColor: {
        control: "color",
        default: "#4f46e5",
        description: "Color of the floating action button.",
      },
      activeColor: {
        control: "color",
        default: "#4f46e5",
        description: "Color for active tabs.",
      },
      inactiveColor: {
        control: "color",
        default: "#a3a3a3",
        description: "Color for inactive tabs.",
      },
    },
  },
  {
    slug: "animated-indicator-bar",
    name: "Animated Indicator Bar",
    componentName: "AnimatedIndicatorBar",
    description: "A tab bar with an animated pink indicator that slides between tabs.",
    tags: ["tabbar", "animated", "indicator", "sliding"],
    props: {
      ...commonTabbarProps,
      items: {
        control: "textarea",
        default: "Home\nExplore\nFavorites\nProfile",
        description: "List of tab items, one per line.",
      },
      icons: {
        control: "textarea",
        default: "Home\nCompass\nHeart\nUser",
        description: "List of icon names for each item (one per line).",
      },
      showLabels: {
        control: "boolean",
        default: false,
        description: "Whether to show text labels below icons.",
      },
      indicatorColor: {
        control: "color",
        default: "#ec4899",
        description: "Color of the animated indicator.",
      },
      iconColor: {
        control: "color",
        default: "#ffffff",
        description: "Color of the icons.",
      },
      backgroundColor: {
        control: "color",
        default: "#000000",
        description: "Background color of the tab bar.",
      },
    },
  },
  {
    slug: "text-only-bar",
    name: "Text Only Minimalist",
    componentName: "TextOnlyBar",
    description: "A minimalist text-only tab bar with dot indicators.",
    tags: ["tabbar", "text", "minimalist", "simple"],
    props: {
      ...commonTabbarProps,
      items: {
        control: "textarea",
        default: "Shop\nDiscover\nCart\nAccount",
        description: "List of tab items, one per line.",
      },
      showLabels: {
        control: "boolean",
        default: true,
        description: "Whether to show text labels (always true for text-only bar).",
      },
      activeColor: {
        control: "color",
        default: "#000000",
        description: "Color for active tab text and indicator.",
      },
      inactiveColor: {
        control: "color",
        default: "#a3a3a3",
        description: "Color for inactive tab text.",
      },
      backgroundColor: {
        control: "color",
        default: "#f5f5f5",
        description: "Background color of the tab bar.",
      },
    },
  },
  {
    slug: "glass-curved-bar",
    name: "Glassmorphic Curved Bar",
    componentName: "GlassCurvedBar",
    description: "A glassmorphic tab bar with curved design and backdrop blur.",
    tags: ["tabbar", "glassmorphic", "curved", "blur"],
    props: {
      ...commonTabbarProps,
      backgroundColor: {
        control: "color",
        default: "rgba(255, 255, 255, 0.1)",
        description: "Background color with transparency.",
      },
      activeColor: {
        control: "color",
        default: "#000000",
        description: "Text color for active tab.",
      },
      inactiveColor: {
        control: "color",
        default: "#ffffff",
        description: "Text color for inactive tabs.",
      },
    },
  },
  {
    slug: "slide-gesture-bar",
    name: "Slide Gesture Bar",
    componentName: "SlideGestureBar",
    description: "A minimal tab bar with a swipe gesture indicator.",
    tags: ["tabbar", "gesture", "swipe", "minimal"],
    props: {
      ...commonTabbarProps,
      backgroundColor: {
        control: "color",
        default: "rgba(0, 0, 0, 0.8)",
        description: "Background color with transparency.",
      },
      indicatorColor: {
        control: "color",
        default: "#525252",
        description: "Color of the swipe indicator.",
      },
      textColor: {
        control: "color",
        default: "#737373",
        description: "Color of the instruction text.",
      },
    },
  },
  {
    slug: "labeled-icons-bar",
    name: "Labeled Icons (Detailed)",
    componentName: "LabeledIconsBar",
    description: "A detailed tab bar with labeled icons and special post button.",
    tags: ["tabbar", "labeled", "icons", "detailed"],
    props: {
      ...commonTabbarProps,
      items: {
        control: "textarea",
        default: "Home\nNetwork\nPost\nJobs\nChat",
        description: "List of tab items, one per line.",
      },
      icons: {
        control: "textarea",
        default: "Home\nGrid\nPlus\nBriefcaseIcon\nMessageSquare",
        description: "List of icon names for each item (one per line).",
      },
      showLabels: {
        control: "boolean",
        default: true,
        description: "Whether to show text labels below icons.",
      },
      activeColor: {
        control: "color",
        default: "#000000",
        description: "Color for active tab.",
      },
      inactiveColor: {
        control: "color",
        default: "#a3a3a3",
        description: "Color for inactive tabs.",
      },
      backgroundColor: {
        control: "color",
        default: "#ffffff",
        description: "Background color of the tab bar.",
      },
    },
  },
  {
    slug: "hamburger-hybrid-bar",
    name: "Hamburger Hybrid Bar",
    componentName: "HamburgerHybridBar",
    description: "A hybrid tab bar with icons and a hamburger menu button.",
    tags: ["tabbar", "hamburger", "hybrid", "menu"],
    props: {
      ...commonTabbarProps,
      items: {
        control: "textarea",
        default: "Home\nSearch\nShop",
        description: "List of tab items, one per line.",
      },
      icons: {
        control: "textarea",
        default: "Home\nSearch\nShoppingBag",
        description: "List of icon names for each item (one per line).",
      },
      showLabels: {
        control: "boolean",
        default: false,
        description: "Whether to show text labels below icons.",
      },
      activeColor: {
        control: "color",
        default: "#f97316",
        description: "Color for active tabs.",
      },
      inactiveColor: {
        control: "color",
        default: "#ffffff",
        description: "Color for inactive tabs.",
      },
      backgroundColor: {
        control: "color",
        default: "#171717",
        description: "Background color of the tab bar.",
      },
      dividerColor: {
        control: "color",
        default: "#262626",
        description: "Color of the divider line.",
      },
    },
  },
  {
    slug: "social-media-bar",
    name: "Social Media Style",
    componentName: "SocialMediaBar",
    description: "A social media style tab bar with filled icons and profile avatar.",
    tags: ["tabbar", "social", "media", "instagram"],
    props: {
      ...commonTabbarProps,
      items: {
        control: "textarea",
        default: "feed\nexplore\ncreate\nreels\nprofile",
        description: "List of tab items, one per line.",
      },
      icons: {
        control: "textarea",
        default: "Home\nSearch\nPlus\nVideo\nUser",
        description: "List of icon names for each item (one per line).",
      },
      showLabels: {
        control: "boolean",
        default: false,
        description: "Whether to show text labels below icons.",
      },
      backgroundColor: {
        control: "color",
        default: "#000000",
        description: "Background color of the tab bar.",
      },
      iconColor: {
        control: "color",
        default: "#ffffff",
        description: "Color of the icons.",
      },
      borderColor: {
        control: "color",
        default: "#ffffff",
        description: "Border color for the create button.",
      },
    },
  },
  {
    slug: "retro-pixel-bar",
    name: "Retro Pixel Bar",
    componentName: "RetroPixelBar",
    description: "A retro pixel-style tab bar with 3D button effect.",
    tags: ["tabbar", "retro", "pixel", "3d"],
    props: {
      ...commonTabbarProps,
      items: {
        control: "textarea",
        default: "START\nITEMS\nMAP\nSAVE",
        description: "List of tab items, one per line.",
      },
      showLabels: {
        control: "boolean",
        default: true,
        description: "Whether to show text labels.",
      },
      backgroundColor: {
        control: "color",
        default: "#C3C3C3",
        description: "Background color of the tab bar.",
      },
      activeBackgroundColor: {
        control: "color",
        default: "#ffffff",
        description: "Background color for active tab.",
      },
      borderColor: {
        control: "color",
        default: "#000000",
        description: "Border color for tabs.",
      },
      textColor: {
        control: "color",
        default: "#000000",
        description: "Text color for tabs.",
      },
    },
  },
  {
    slug: "cyberpunk-bar",
    name: "Cyberpunk Bar",
    componentName: "CyberpunkBar",
    description: "A cyberpunk-style tab bar with angular design and neon colors.",
    tags: ["tabbar", "cyberpunk", "neon", "angular"],
    props: {
      ...commonTabbarProps,
      items: {
        control: "textarea",
        default: "Home\nMap\nRadio\nProfile",
        description: "List of tab items, one per line.",
      },
      icons: {
        control: "textarea",
        default: "Home\nMap\nRadio\nUser",
        description: "List of icon names for each item (one per line).",
      },
      showLabels: {
        control: "boolean",
        default: false,
        description: "Whether to show text labels below icons.",
      },
      activeColor: {
        control: "color",
        default: "#facc15",
        description: "Background color for active tab.",
      },
      activeTextColor: {
        control: "color",
        default: "#000000",
        description: "Text/icon color for active tab.",
      },
      inactiveColor: {
        control: "color",
        default: "#ca8a04",
        description: "Text color for inactive tabs.",
      },
      backgroundColor: {
        control: "color",
        default: "#050505",
        description: "Background color of the tab bar.",
      },
      borderColor: {
        control: "color",
        default: "#eab308",
        description: "Border color at the top.",
      },
    },
  },
  {
    slug: "neon-glow-bar",
    name: "Neon Glow Bar",
    componentName: "NeonGlowBar",
    description: "A tab bar with neon glow effects and animated spotlight.",
    tags: ["tabbar", "neon", "glow", "animated"],
    props: {
      ...commonTabbarProps,
      items: {
        control: "textarea",
        default: "Home\nMusic\nLightning\nSettings",
        description: "List of tab items, one per line.",
      },
      icons: {
        control: "textarea",
        default: "Home\nMusic\nZap\nSettings",
        description: "List of icon names for each item (one per line).",
      },
      showLabels: {
        control: "boolean",
        default: false,
        description: "Whether to show text labels below icons.",
      },
      activeColor: {
        control: "color",
        default: "#60a5fa",
        description: "Color for active tab with glow effect.",
      },
      inactiveColor: {
        control: "color",
        default: "#525252",
        description: "Color for inactive tabs.",
      },
      backgroundColor: {
        control: "color",
        default: "#0a0a0a",
        description: "Background color of the tab bar.",
      },
      glowColor: {
        control: "color",
        default: "#3b82f6",
        description: "Color of the glow spotlight effect.",
      },
    },
  },
  {
    slug: "minimal-line-bar",
    name: "Minimal Line Bar",
    componentName: "MinimalLineBar",
    description: "A minimal tab bar with small dot indicators.",
    tags: ["tabbar", "minimal", "line", "dot"],
    props: {
      ...commonTabbarProps,
      items: {
        control: "textarea",
        default: "Home\nSearch\nFavorites\nProfile",
        description: "List of tab items, one per line.",
      },
      icons: {
        control: "textarea",
        default: "Home\nSearch\nHeart\nUser",
        description: "List of icon names for each item (one per line).",
      },
      showLabels: {
        control: "boolean",
        default: false,
        description: "Whether to show text labels below icons.",
      },
      activeColor: {
        control: "color",
        default: "#000000",
        description: "Color for active tab icon and dot.",
      },
      inactiveColor: {
        control: "color",
        default: "#d4d4d4",
        description: "Color for inactive tab icons.",
      },
      backgroundColor: {
        control: "color",
        default: "#ffffff",
        description: "Background color of the tab bar.",
      },
      dotColor: {
        control: "color",
        default: "#000000",
        description: "Color of the active dot indicator.",
      },
    },
  },
  {
    slug: "gradient-mask-bar",
    name: "Gradient Mask Bar",
    componentName: "GradientMaskBar",
    description: "A tab bar with gradient mask effects on active tabs.",
    tags: ["tabbar", "gradient", "mask", "modern"],
    props: {
      ...commonTabbarProps,
      items: {
        control: "textarea",
        default: "Home\nTrending\nWallet\nProfile",
        description: "List of tab items, one per line.",
      },
      icons: {
        control: "textarea",
        default: "Home\nTrendingUp\nWalletIcon\nUser",
        description: "List of icon names for each item (one per line).",
      },
      showLabels: {
        control: "boolean",
        default: false,
        description: "Whether to show text labels below icons.",
      },
      activeColor: {
        control: "color",
        default: "#ffffff",
        description: "Text color for active tab.",
      },
      inactiveColor: {
        control: "color",
        default: "#737373",
        description: "Text color for inactive tabs.",
      },
      backgroundColor: {
        control: "color",
        default: "#171717",
        description: "Background color of the container.",
      },
      containerBackgroundColor: {
        control: "color",
        default: "#262626",
        description: "Background color of the inner container.",
      },
      gradientFrom: {
        control: "color",
        default: "#a855f7",
        description: "Start color of the gradient mask.",
      },
      gradientTo: {
        control: "color",
        default: "#f97316",
        description: "End color of the gradient mask.",
      },
    },
  },
  {
    slug: "pill-indicator-bar",
    name: "Pill Indicator Bar",
    componentName: "PillIndicatorBar",
    description: "A tab bar with a pill-shaped indicator for the center button.",
    tags: ["tabbar", "pill", "indicator", "center"],
    props: {
      ...commonTabbarProps,
      items: {
        control: "textarea",
        default: "Home\nScan\nHistory",
        description: "List of tab items, one per line.",
      },
      icons: {
        control: "textarea",
        default: "Home\nScan\nClockIcon",
        description: "List of icon names for each item (one per line).",
      },
      showLabels: {
        control: "boolean",
        default: true,
        description: "Whether to show text labels below icons.",
      },
      activeColor: {
        control: "color",
        default: "#ffffff",
        description: "Color for active tabs.",
      },
      inactiveColor: {
        control: "color",
        default: "#525252",
        description: "Color for inactive tabs.",
      },
      backgroundColor: {
        control: "color",
        default: "#000000",
        description: "Background color of the tab bar.",
      },
      pillBackgroundColor: {
        control: "color",
        default: "#ffffff",
        description: "Background color of the pill button.",
      },
      pillTextColor: {
        control: "color",
        default: "#000000",
        description: "Text color of the pill button.",
      },
    },
  },
  {
    slug: "cupertino-blurred-bar",
    name: "Cupertino Blurred Bar",
    componentName: "CupertinoBlurredBar",
    description: "A Cupertino-style tab bar with blur effect.",
    tags: ["tabbar", "cupertino", "blur", "ios"],
    props: {
      ...commonTabbarProps,
      items: {
        control: "textarea",
        default: "Photos\nFor You\nAlbums\nSearch",
        description: "List of tab items, one per line.",
      },
      icons: {
        control: "textarea",
        default: "ImageIcon\nHeart\nLayers\nSearch",
        description: "List of icon names for each item (one per line).",
      },
      showLabels: {
        control: "boolean",
        default: true,
        description: "Whether to show text labels below icons.",
      },
      activeColor: {
        control: "color",
        default: "#3b82f6",
        description: "Color for active tab.",
      },
      inactiveColor: {
        control: "color",
        default: "#a3a3a3",
        description: "Color for inactive tabs.",
      },
      backgroundColor: {
        control: "color",
        default: "rgba(255, 255, 255, 0.8)",
        description: "Background color with transparency.",
      },
      borderColor: {
        control: "color",
        default: "#e5e5e5",
        description: "Border color at the top.",
      },
    },
  },
  {
    slug: "vertical-mobile-bar",
    name: "Vertical Sidebar (Mobile Landscape)",
    componentName: "VerticalMobileBar",
    description: "A vertical sidebar for mobile landscape orientation.",
    tags: ["tabbar", "vertical", "sidebar", "landscape"],
    props: {
      ...commonTabbarProps,
      activeColor: {
        control: "color",
        default: "#000000",
        description: "Text color for active tab.",
      },
      inactiveColor: {
        control: "color",
        default: "#737373",
        description: "Text color for inactive tabs.",
      },
      backgroundColor: {
        control: "color",
        default: "#171717",
        description: "Background color of the sidebar.",
      },
      activeBackgroundColor: {
        control: "color",
        default: "#ffffff",
        description: "Background color for active tab button.",
      },
    },
  },
  {
    slug: "fab-center-bar",
    name: "Floating Action Button Center",
    componentName: "FabCenterBar",
    description: "A tab bar with a floating action button centered at the top.",
    tags: ["tabbar", "fab", "floating", "center"],
    props: {
      ...commonTabbarProps,
      items: {
        control: "textarea",
        default: "Home\nSearch\nFavorites\nProfile",
        description: "List of tab items, one per line.",
      },
      icons: {
        control: "textarea",
        default: "Home\nSearch\nHeart\nUser",
        description: "List of icon names for each item (one per line).",
      },
      showLabels: {
        control: "boolean",
        default: true,
        description: "Whether to show text labels below icons.",
      },
      activeColor: {
        control: "color",
        default: "#ec4899",
        description: "Color for active tabs.",
      },
      inactiveColor: {
        control: "color",
        default: "#a3a3a3",
        description: "Color for inactive tabs.",
      },
      backgroundColor: {
        control: "color",
        default: "#ffffff",
        description: "Background color of the tab bar.",
      },
      fabColor: {
        control: "color",
        default: "#ec4899",
        description: "Background color of the floating action button.",
      },
      fabShadowColor: {
        control: "color",
        default: "#ec4899",
        description: "Shadow color of the floating action button.",
      },
    },
  },
]

