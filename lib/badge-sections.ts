export type BadgePropControl =
  | "text"
  | "boolean"
  | "select"
  | "slider"
  | "color"
  | "textarea"
  | "number"

export interface BadgePropDefinition {
  control: BadgePropControl
  default: string | number | boolean
  description: string
  options?: string[]
  min?: number
  max?: number
  docType?: string
}

export interface BadgeSectionMeta {
  slug: string
  name: string
  componentName: string
  description: string
  tags: string[]
  props: Record<string, BadgePropDefinition>
  groupingConfig?: any
}

// Common props for all badges
const commonBadgeProps: Record<string, BadgePropDefinition> = {
  children: {
    control: "text",
    default: "Badge",
    description: "The text content of the badge.",
  },
  className: {
    control: "text",
    default: "",
    description: "Additional CSS classes to apply to the badge.",
  },
  backgroundColor: {
    control: "color",
    default: "",
    description: "Background color (optional, uses default if empty).",
  },
  textColor: {
    control: "color",
    default: "",
    description: "Text color (optional, uses default if empty).",
  },
  borderColor: {
    control: "color",
    default: "",
    description: "Border color (optional, uses default if empty).",
  },
  borderRadius: {
    control: "slider",
    min: 0,
    max: 48,
    default: 9999,
    description: "Border radius in pixels.",
  },
  padding: {
    control: "slider",
    min: 0,
    max: 24,
    default: 8,
    description: "Padding in pixels.",
  },
  borderWidth: {
    control: "slider",
    min: 0,
    max: 4,
    default: 0,
    description: "Border width in pixels.",
  },
}

export const badgeSections: BadgeSectionMeta[] = [
  {
    slug: "solid-badge",
    name: "Solid Badge",
    componentName: "SolidBadge",
    description: "A basic solid badge with dark background and white text.",
    tags: ["badge", "solid", "basic", "display"],
    props: {
      ...commonBadgeProps,
      children: {
        control: "text",
        default: "Badge",
        description: "The text content of the badge.",
      },
    },
  },
  {
    slug: "outline-badge",
    name: "Outline Badge",
    componentName: "OutlineBadge",
    description: "A badge with border outline and transparent background.",
    tags: ["badge", "outline", "border", "display"],
    props: {
      ...commonBadgeProps,
      children: {
        control: "text",
        default: "Badge",
        description: "The text content of the badge.",
      },
      borderWidth: {
        control: "slider",
        min: 0,
        max: 4,
        default: 1,
        description: "Border width in pixels.",
      },
    },
  },
  {
    slug: "soft-badge",
    name: "Soft Badge",
    componentName: "SoftBadge",
    description: "A soft badge with light background and colored text.",
    tags: ["badge", "soft", "light", "display"],
    props: {
      ...commonBadgeProps,
      children: {
        control: "text",
        default: "Badge",
        description: "The text content of the badge.",
      },
    },
  },
  {
    slug: "dot-badge",
    name: "Dot Badge",
    componentName: "DotBadge",
    description: "A badge with a colored dot indicator.",
    tags: ["badge", "dot", "status", "indicator"],
    props: {
      ...commonBadgeProps,
      children: {
        control: "text",
        default: "Status",
        description: "The text content of the badge.",
      },
      dotColor: {
        control: "color",
        default: "#22c55e",
        description: "Color of the dot indicator (hex format, e.g., #22c55e for green).",
      },
    },
  },
  {
    slug: "icon-badge",
    name: "Icon Badge",
    componentName: "IconBadge",
    description: "A badge with an icon and text.",
    tags: ["badge", "icon", "display"],
    props: {
      ...commonBadgeProps,
      children: {
        control: "text",
        default: "Feature",
        description: "The text content of the badge.",
      },
      icon: {
        control: "select",
        default: "Star",
        options: ["Star", "Check", "Shield", "Zap", "Lock", "AlertCircle", "Clock", "TrendingUp", "Crown", "Sparkles", "Flame", "Tag"],
        description: "Icon to display in the badge.",
      },
    },
  },
  {
    slug: "gradient-badge",
    name: "Gradient Badge",
    componentName: "GradientBadge",
    description: "A badge with gradient background effect.",
    tags: ["badge", "gradient", "colorful", "display"],
    props: {
      children: {
        control: "text",
        default: "Premium",
        description: "The text content of the badge.",
      },
      className: {
        control: "text",
        default: "",
        description: "Additional CSS classes to apply to the badge.",
      },
      gradientFrom: {
        control: "color",
        default: "#ec4899",
        description: "Gradient start color.",
      },
      gradientTo: {
        control: "color",
        default: "#8b5cf6",
        description: "Gradient end color.",
      },
      textColor: {
        control: "color",
        default: "",
        description: "Text color (optional, uses default if empty).",
      },
      borderColor: {
        control: "color",
        default: "",
        description: "Border color (optional, uses default if empty).",
      },
      borderRadius: {
        control: "slider",
        min: 0,
        max: 48,
        default: 9999,
        description: "Border radius in pixels.",
      },
      padding: {
        control: "slider",
        min: 0,
        max: 24,
        default: 8,
        description: "Padding in pixels.",
      },
      borderWidth: {
        control: "slider",
        min: 0,
        max: 4,
        default: 0,
        description: "Border width in pixels.",
      },
    },
  },
  {
    slug: "glass-badge",
    name: "Glass Badge",
    componentName: "GlassBadge",
    description: "A glassmorphism badge with backdrop blur effect.",
    tags: ["badge", "glass", "glassmorphism", "blur", "display"],
    props: {
      ...commonBadgeProps,
      children: {
        control: "text",
        default: "Glass",
        description: "The text content of the badge.",
      },
      backdropBlur: {
        control: "slider",
        min: 0,
        max: 24,
        default: 8,
        description: "Backdrop blur amount.",
      },
      borderOpacity: {
        control: "slider",
        min: 0,
        max: 100,
        default: 20,
        description: "Border opacity percentage.",
      },
    },
  },
  {
    slug: "neon-badge",
    name: "Neon Badge",
    componentName: "NeonBadge",
    description: "A neon-style badge with glow effect.",
    tags: ["badge", "neon", "glow", "effect", "display"],
    props: {
      ...commonBadgeProps,
      children: {
        control: "text",
        default: "New",
        description: "The text content of the badge.",
      },
      glowColor: {
        control: "color",
        default: "#22c55e",
        description: "Glow effect color.",
      },
      glowIntensity: {
        control: "slider",
        min: 0,
        max: 100,
        default: 20,
        description: "Glow effect intensity percentage.",
      },
    },
  },
  {
    slug: "brutalist-badge",
    name: "Brutalist Badge",
    componentName: "BrutalistBadge",
    description: "A bold neo-brutalist badge with hard shadows.",
    tags: ["badge", "brutalist", "bold", "shadow", "display"],
    props: {
      ...commonBadgeProps,
      children: {
        control: "text",
        default: "BOLD",
        description: "The text content of the badge.",
      },
      shadowOffsetX: {
        control: "slider",
        min: 0,
        max: 8,
        default: 2,
        description: "Shadow offset X in pixels.",
      },
      shadowOffsetY: {
        control: "slider",
        min: 0,
        max: 8,
        default: 2,
        description: "Shadow offset Y in pixels.",
      },
    },
  },
  {
    slug: "count-badge",
    name: "Count Badge",
    componentName: "CountBadge",
    description: "A notification count badge showing numbers.",
    tags: ["badge", "count", "notification", "number"],
    props: {
      count: {
        control: "number",
        default: 5,
        description: "The count number to display.",
      },
      maxCount: {
        control: "number",
        default: 99,
        description: "Maximum count to display (shows '99+' if exceeded).",
      },
      backgroundColor: {
        control: "color",
        default: "#ef4444",
        description: "Background color of the count badge.",
      },
      textColor: {
        control: "color",
        default: "#ffffff",
        description: "Text color of the count badge.",
      },
    },
  },
  {
    slug: "dismissable-badge",
    name: "Dismissable Badge",
    componentName: "DismissableBadge",
    description: "A badge that can be dismissed with an X button.",
    tags: ["badge", "dismissable", "interactive", "display"],
    props: {
      ...commonBadgeProps,
      children: {
        control: "text",
        default: "Dismissable",
        description: "The text content of the badge.",
      },
      showDismissButton: {
        control: "boolean",
        default: true,
        description: "Show/hide the dismiss button.",
      },
    },
  },
  {
    slug: "verified-badge",
    name: "Verified Badge",
    componentName: "VerifiedBadge",
    description: "A verified badge with checkmark icon.",
    tags: ["badge", "verified", "check", "status"],
    props: {
      text: {
        control: "text",
        default: "Verified",
        description: "The text to display.",
      },
      iconColor: {
        control: "color",
        default: "#3b82f6",
        description: "Icon and text color.",
      },
    },
  },
  {
    slug: "premium-badge",
    name: "Premium Badge",
    componentName: "PremiumBadge",
    description: "A premium badge with crown icon and gradient.",
    tags: ["badge", "premium", "crown", "gradient"],
    props: {
      text: {
        control: "text",
        default: "Pro",
        description: "The text to display.",
      },
      gradientFrom: {
        control: "color",
        default: "#fde047",
        description: "Gradient start color.",
      },
      gradientTo: {
        control: "color",
        default: "#facc15",
        description: "Gradient end color.",
      },
    },
  },
  {
    slug: "pulsing-badge",
    name: "Pulsing Badge",
    componentName: "PulsingBadge",
    description: "A badge with pulsing animation effect.",
    tags: ["badge", "pulsing", "animation", "effect"],
    props: {
      ...commonBadgeProps,
      children: {
        control: "text",
        default: "Live",
        description: "The text content of the badge.",
      },
      pulseColor: {
        control: "color",
        default: "#ef4444",
        description: "Pulse effect color.",
      },
      pulseSpeed: {
        control: "slider",
        min: 0.5,
        max: 3,
        default: 1,
        description: "Pulse animation speed multiplier.",
      },
    },
  },
  {
    slug: "tag-badge",
    name: "Tag Badge",
    componentName: "TagBadge",
    description: "A price tag style badge with clip-path.",
    tags: ["badge", "tag", "price", "display"],
    props: {
      ...commonBadgeProps,
      children: {
        control: "text",
        default: "Sale",
        description: "The text content of the badge.",
      },
    },
  },
  {
    slug: "cyber-badge",
    name: "Cyber Badge",
    componentName: "CyberBadge",
    description: "A cyberpunk-style badge with monospace font.",
    tags: ["badge", "cyber", "cyberpunk", "monospace"],
    props: {
      ...commonBadgeProps,
      children: {
        control: "text",
        default: "CYBER",
        description: "The text content of the badge.",
      },
      borderColor: {
        control: "color",
        default: "#06b6d4",
        description: "Border color.",
      },
      textColor: {
        control: "color",
        default: "#06b6d4",
        description: "Text color.",
      },
      glowColor: {
        control: "color",
        default: "#06b6d4",
        description: "Glow effect color.",
      },
    },
  },
  {
    slug: "status-dot",
    name: "Status Dot",
    componentName: "StatusDot",
    description: "A minimal status indicator dot.",
    tags: ["badge", "status", "dot", "indicator"],
    props: {
      status: {
        control: "select",
        default: "online",
        options: ["online", "offline", "busy"],
        description: "Status type.",
      },
      size: {
        control: "slider",
        min: 4,
        max: 16,
        default: 10,
        description: "Dot size in pixels.",
      },
    },
  },
  {
    slug: "beta-badge",
    name: "Beta Badge",
    componentName: "BetaBadge",
    description: "A beta version badge.",
    tags: ["badge", "beta", "version", "status"],
    props: {
      text: {
        control: "text",
        default: "Beta",
        description: "The text to display.",
      },
      borderColor: {
        control: "color",
        default: "#a855f7",
        description: "Border color.",
      },
      textColor: {
        control: "color",
        default: "#a855f7",
        description: "Text color.",
      },
    },
  },
  {
    slug: "trending-badge",
    name: "Trending Badge",
    componentName: "TrendingBadge",
    description: "A trending badge with trending up icon.",
    tags: ["badge", "trending", "icon", "status"],
    props: {
      text: {
        control: "text",
        default: "Trending",
        description: "The text to display.",
      },
      backgroundColor: {
        control: "color",
        default: "#fed7aa",
        description: "Background color.",
      },
      textColor: {
        control: "color",
        default: "#ea580c",
        description: "Text color.",
      },
    },
  },
  {
    slug: "new-badge",
    name: "New Badge",
    componentName: "NewBadge",
    description: "A new feature badge with shadow effect.",
    tags: ["badge", "new", "feature", "shadow"],
    props: {
      text: {
        control: "text",
        default: "NEW",
        description: "The text to display.",
      },
      backgroundColor: {
        control: "color",
        default: "#2563eb",
        description: "Background color.",
      },
      textColor: {
        control: "color",
        default: "#ffffff",
        description: "Text color.",
      },
      shadowColor: {
        control: "color",
        default: "#2563eb",
        description: "Shadow color.",
      },
    },
  },
  {
    slug: "warning-badge",
    name: "Warning Badge",
    componentName: "WarningBadge",
    description: "A warning badge with alert icon.",
    tags: ["badge", "warning", "alert", "icon"],
    props: {
      ...commonBadgeProps,
      children: {
        control: "text",
        default: "Warning",
        description: "The text content of the badge.",
      },
      iconColor: {
        control: "color",
        default: "#ca8a04",
        description: "Icon color.",
      },
      textColor: {
        control: "color",
        default: "#ca8a04",
        description: "Text color.",
      },
    },
  },
  {
    slug: "magic-badge",
    name: "Magic Badge",
    componentName: "MagicBadge",
    description: "An AI/Magic badge with sparkles icon and gradient.",
    tags: ["badge", "magic", "ai", "sparkles", "gradient"],
    props: {
      ...commonBadgeProps,
      children: {
        control: "text",
        default: "AI",
        description: "The text content of the badge.",
      },
      gradientFrom: {
        control: "color",
        default: "#e0e7ff",
        description: "Gradient start color.",
      },
      gradientTo: {
        control: "color",
        default: "#f3e8ff",
        description: "Gradient end color.",
      },
      iconColor: {
        control: "color",
        default: "#8b5cf6",
        description: "Icon color.",
      },
      textColor: {
        control: "color",
        default: "#4f46e5",
        description: "Text color.",
      },
    },
  },
  {
    slug: "dark-pill-badge",
    name: "Dark Pill Badge",
    componentName: "DarkPillBadge",
    description: "A dark mode pill-style badge.",
    tags: ["badge", "dark", "pill", "display"],
    props: {
      ...commonBadgeProps,
      children: {
        control: "text",
        default: "Dark",
        description: "The text content of the badge.",
      },
    },
  },
  {
    slug: "hot-badge",
    name: "Hot Badge",
    componentName: "HotBadge",
    description: "A hot badge with flame icon.",
    tags: ["badge", "hot", "flame", "fire"],
    props: {
      text: {
        control: "text",
        default: "HOT",
        description: "The text to display.",
      },
      borderColor: {
        control: "color",
        default: "#fecaca",
        description: "Border color.",
      },
      backgroundColor: {
        control: "color",
        default: "#fef2f2",
        description: "Background color.",
      },
      textColor: {
        control: "color",
        default: "#dc2626",
        description: "Text color.",
      },
    },
  },
  {
    slug: "role-badge",
    name: "Role Badge",
    componentName: "RoleBadge",
    description: "A role/user badge with indicator dot.",
    tags: ["badge", "role", "user", "indicator"],
    props: {
      role: {
        control: "text",
        default: "Admin",
        description: "The role text to display.",
      },
      dotColor: {
        control: "color",
        default: "#9ca3af",
        description: "Indicator dot color.",
      },
      backgroundColor: {
        control: "color",
        default: "#f3f4f6",
        description: "Background color.",
      },
      textColor: {
        control: "color",
        default: "#4b5563",
        description: "Text color.",
      },
    },
  },
  {
    slug: "discount-badge",
    name: "Discount Badge",
    componentName: "DiscountBadge",
    description: "A discount percentage badge.",
    tags: ["badge", "discount", "percentage", "sale"],
    props: {
      percent: {
        control: "number",
        default: 20,
        description: "Discount percentage.",
      },
      backgroundColor: {
        control: "color",
        default: "#000000",
        description: "Background color.",
      },
      textColor: {
        control: "color",
        default: "#ffffff",
        description: "Text color.",
      },
    },
  },
  {
    slug: "security-badge",
    name: "Security Badge",
    componentName: "SecurityBadge",
    description: "A security badge with shield icon.",
    tags: ["badge", "security", "shield", "icon"],
    props: {
      text: {
        control: "text",
        default: "Secure",
        description: "The text to display.",
      },
      backgroundColor: {
        control: "color",
        default: "#d1fae5",
        description: "Background color.",
      },
      textColor: {
        control: "color",
        default: "#059669",
        description: "Text color.",
      },
      borderColor: {
        control: "color",
        default: "#a7f3d0",
        description: "Border color.",
      },
    },
  },
  {
    slug: "time-badge",
    name: "Time Badge",
    componentName: "TimeBadge",
    description: "A time badge with clock icon and monospace font.",
    tags: ["badge", "time", "clock", "monospace"],
    props: {
      time: {
        control: "text",
        default: "12:00",
        description: "The time to display.",
      },
      backgroundColor: {
        control: "color",
        default: "#1f2937",
        description: "Background color.",
      },
      textColor: {
        control: "color",
        default: "#d1d5db",
        description: "Text color.",
      },
    },
  },
  {
    slug: "category-badge",
    name: "Category Badge",
    componentName: "CategoryBadge",
    description: "A category badge with customizable color.",
    tags: ["badge", "category", "color", "display"],
    props: {
      category: {
        control: "text",
        default: "Category",
        description: "The category text to display.",
      },
      backgroundColor: {
        control: "color",
        default: "#3b82f6",
        description: "Background color.",
      },
      textColor: {
        control: "color",
        default: "#ffffff",
        description: "Text color.",
      },
    },
  },
  {
    slug: "platform-badge",
    name: "Platform Badge",
    componentName: "PlatformBadge",
    description: "A platform badge (e.g., iOS, Android).",
    tags: ["badge", "platform", "os", "display"],
    props: {
      platform: {
        control: "text",
        default: "iOS",
        description: "The platform name to display.",
      },
      borderColor: {
        control: "color",
        default: "#d1d5db",
        description: "Border color.",
      },
      backgroundColor: {
        control: "color",
        default: "#f9fafb",
        description: "Background color.",
      },
      textColor: {
        control: "color",
        default: "#4b5563",
        description: "Text color.",
      },
    },
  },
]

