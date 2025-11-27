export type TogglePropControl =
  | "text"
  | "boolean"
  | "select"
  | "slider"
  | "color"
  | "number"

export interface TogglePropDefinition {
  control: TogglePropControl
  default: string | number | boolean
  description: string
  options?: string[]
  min?: number
  max?: number
}

export interface ToggleSectionMeta {
  slug: string
  name: string
  componentName: string
  description: string
  tags: string[]
  props: Record<string, TogglePropDefinition>
}

// Common props for toggles
const commonToggleProps: Record<string, TogglePropDefinition> = {
  className: {
    control: "text",
    default: "",
    description: "Additional CSS classes to apply to the toggle.",
  },
  defaultChecked: {
    control: "boolean",
    default: false,
    description: "Initial checked state of the toggle.",
  },
  activeColor: {
    control: "color",
    default: "",
    description: "Color when toggle is active (optional, uses default if empty).",
  },
  inactiveColor: {
    control: "color",
    default: "",
    description: "Color when toggle is inactive (optional, uses default if empty).",
  },
  thumbColor: {
    control: "color",
    default: "",
    description: "Color of the toggle thumb/knob (optional, uses default if empty).",
  },
}

export const toggleSections: ToggleSectionMeta[] = [
  {
    slug: "simple-toggle",
    name: "Simple Toggle",
    componentName: "SimpleToggle",
    description: "A simple toggle switch with smooth transitions.",
    tags: ["toggle", "switch", "simple", "interactive"],
    props: {
      ...commonToggleProps,
      activeColor: {
        control: "color",
        default: "#4f46e5",
        description: "Background color when toggle is active.",
      },
      inactiveColor: {
        control: "color",
        default: "#525252",
        description: "Background color when toggle is inactive.",
      },
    },
  },
  {
    slug: "ios-toggle",
    name: "iOS Style Toggle",
    componentName: "IosToggle",
    description: "A toggle switch styled like iOS switches.",
    tags: ["toggle", "switch", "ios", "apple"],
    props: {
      ...commonToggleProps,
      defaultChecked: {
        control: "boolean",
        default: true,
        description: "Initial checked state of the toggle.",
      },
    },
  },
  {
    slug: "square-toggle",
    name: "Square Toggle",
    componentName: "SquareToggle",
    description: "A toggle switch with square corners.",
    tags: ["toggle", "switch", "square", "geometric"],
    props: {
      ...commonToggleProps,
      activeColor: {
        control: "color",
        default: "#2563eb",
        description: "Background color when toggle is active.",
      },
      inactiveColor: {
        control: "color",
        default: "#404040",
        description: "Background color when toggle is inactive.",
      },
    },
  },
  {
    slug: "material-toggle",
    name: "Material Ripple Toggle",
    componentName: "MaterialToggle",
    description: "A Material Design inspired toggle with ripple effect.",
    tags: ["toggle", "switch", "material", "ripple"],
    props: {
      ...commonToggleProps,
      activeColor: {
        control: "color",
        default: "#6366f1",
        description: "Color when toggle is active.",
      },
    },
  },
  {
    slug: "icon-toggle",
    name: "Icon Toggle",
    componentName: "IconToggle",
    description: "A toggle switch with sun/moon icons for dark mode.",
    tags: ["toggle", "switch", "icon", "dark-mode"],
    props: {
      ...commonToggleProps,
      activeColor: {
        control: "color",
        default: "#1e293b",
        description: "Background color when toggle is active (dark mode).",
      },
      inactiveColor: {
        control: "color",
        default: "#bae6fd",
        description: "Background color when toggle is inactive (light mode).",
      },
    },
  },
  {
    slug: "text-toggle",
    name: "Text Toggle",
    componentName: "TextToggle",
    description: "A toggle switch with ON/OFF text labels.",
    tags: ["toggle", "switch", "text", "label"],
    props: {
      ...commonToggleProps,
      defaultChecked: {
        control: "boolean",
        default: true,
        description: "Initial checked state of the toggle.",
      },
      activeColor: {
        control: "color",
        default: "#10b981",
        description: "Background color when toggle is ON.",
      },
      inactiveColor: {
        control: "color",
        default: "#ef4444",
        description: "Background color when toggle is OFF.",
      },
    },
  },
  {
    slug: "gradient-toggle",
    name: "Gradient Toggle",
    componentName: "GradientToggle",
    description: "A toggle switch with gradient background.",
    tags: ["toggle", "switch", "gradient", "colorful"],
    props: {
      ...commonToggleProps,
      defaultChecked: {
        control: "boolean",
        default: true,
        description: "Initial checked state of the toggle.",
      },
      inactiveColor: {
        control: "color",
        default: "#262626",
        description: "Background color when toggle is inactive.",
      },
    },
  },
  {
    slug: "neon-toggle",
    name: "Neon Toggle",
    componentName: "NeonToggle",
    description: "A toggle switch with neon glow effect.",
    tags: ["toggle", "switch", "neon", "glow", "cyberpunk"],
    props: {
      ...commonToggleProps,
      activeColor: {
        control: "color",
        default: "#22d3ee",
        description: "Neon color when toggle is active.",
      },
    },
  },
  {
    slug: "thin-toggle",
    name: "Thin Toggle",
    componentName: "ThinToggle",
    description: "A minimal toggle switch with thin track.",
    tags: ["toggle", "switch", "thin", "minimal"],
    props: {
      ...commonToggleProps,
      activeColor: {
        control: "color",
        default: "#818cf8",
        description: "Color when toggle is active.",
      },
    },
  },
  {
    slug: "outline-toggle",
    name: "Outline Toggle",
    componentName: "OutlineToggle",
    description: "A toggle switch with outline border style.",
    tags: ["toggle", "switch", "outline", "border"],
    props: {
      ...commonToggleProps,
      activeColor: {
        control: "color",
        default: "#4f46e5",
        description: "Border and background color when toggle is active.",
      },
      inactiveColor: {
        control: "color",
        default: "#737373",
        description: "Border color when toggle is inactive.",
      },
      thumbColor: {
        control: "color",
        default: "#737373",
        description: "Thumb color when toggle is inactive.",
      },
    },
  },
  {
    slug: "3d-toggle",
    name: "3D Toggle",
    componentName: "ThreeDToggle",
    description: "A toggle switch with 3D pressed effect.",
    tags: ["toggle", "switch", "3d", "depth"],
    props: {
      ...commonToggleProps,
      activeColor: {
        control: "color",
        default: "#22c55e",
        description: "Background color when toggle is active.",
      },
      inactiveColor: {
        control: "color",
        default: "#404040",
        description: "Background color when toggle is inactive.",
      },
    },
  },
  {
    slug: "elastic-toggle",
    name: "Elastic Toggle",
    componentName: "ElasticToggle",
    description: "A toggle switch with elastic bounce animation.",
    tags: ["toggle", "switch", "elastic", "animation"],
    props: {
      ...commonToggleProps,
      activeColor: {
        control: "color",
        default: "#9333ea",
        description: "Background color when toggle is active.",
      },
      inactiveColor: {
        control: "color",
        default: "#e5e7eb",
        description: "Background color when toggle is inactive.",
      },
    },
  },
  {
    slug: "check-x-toggle",
    name: "Check / X Toggle",
    componentName: "CheckXToggle",
    description: "A toggle switch with check and X icons.",
    tags: ["toggle", "switch", "icon", "check", "x"],
    props: {
      ...commonToggleProps,
      defaultChecked: {
        control: "boolean",
        default: true,
        description: "Initial checked state of the toggle.",
      },
      activeColor: {
        control: "color",
        default: "#22c55e",
        description: "Background color when toggle is active (check).",
      },
      inactiveColor: {
        control: "color",
        default: "#ef4444",
        description: "Background color when toggle is inactive (X).",
      },
    },
  },
  {
    slug: "lock-toggle",
    name: "Lock Toggle",
    componentName: "LockToggle",
    description: "A toggle switch with lock/unlock icons.",
    tags: ["toggle", "switch", "icon", "lock", "security"],
    props: {
      ...commonToggleProps,
      defaultChecked: {
        control: "boolean",
        default: true,
        description: "Initial checked state (locked).",
      },
      activeColor: {
        control: "color",
        default: "#ef4444",
        description: "Color when toggle is locked.",
      },
      inactiveColor: {
        control: "color",
        default: "#22c55e",
        description: "Color when toggle is unlocked.",
      },
    },
  },
  {
    slug: "power-toggle",
    name: "Power Button Toggle",
    componentName: "PowerToggle",
    description: "A power button style toggle switch.",
    tags: ["toggle", "switch", "power", "button", "icon"],
    props: {
      ...commonToggleProps,
      activeColor: {
        control: "color",
        default: "#22c55e",
        description: "Border and background color when toggle is active.",
      },
      inactiveColor: {
        control: "color",
        default: "#171717",
        description: "Background color when toggle is inactive.",
      },
    },
  },
  {
    slug: "cyber-toggle",
    name: "Cyberpunk Toggle",
    componentName: "CyberToggle",
    description: "A cyberpunk style toggle switch with skew effect.",
    tags: ["toggle", "switch", "cyberpunk", "futuristic"],
    props: {
      ...commonToggleProps,
      defaultChecked: {
        control: "boolean",
        default: true,
        description: "Initial checked state of the toggle.",
      },
      activeColor: {
        control: "color",
        default: "#facc15",
        description: "Active color (yellow).",
      },
    },
  },
  {
    slug: "neumorphic-toggle",
    name: "Neumorphic Toggle",
    componentName: "NeumorphicToggle",
    description: "A neumorphic style toggle switch with soft shadows.",
    tags: ["toggle", "switch", "neumorphic", "soft"],
    props: {
      ...commonToggleProps,
      activeColor: {
        control: "color",
        default: "#3b82f6",
        description: "Color when toggle is active.",
      },
    },
  },
  {
    slug: "glass-toggle",
    name: "Glassmorphism Toggle",
    componentName: "GlassToggle",
    description: "A glassmorphism style toggle switch with blur effect.",
    tags: ["toggle", "switch", "glassmorphism", "glass", "blur"],
    props: {
      ...commonToggleProps,
    },
  },
  {
    slug: "volume-toggle",
    name: "Volume Slider Toggle",
    componentName: "VolumeToggle",
    description: "A volume control toggle with visual bars.",
    tags: ["toggle", "switch", "volume", "audio", "bars"],
    props: {
      ...commonToggleProps,
      activeColor: {
        control: "color",
        default: "#22c55e",
        description: "Color of volume bars when not muted.",
      },
      inactiveColor: {
        control: "color",
        default: "#171717",
        description: "Background color.",
      },
    },
  },
  {
    slug: "wifi-toggle",
    name: "Wifi Toggle",
    componentName: "WifiToggle",
    description: "A wifi connection toggle switch.",
    tags: ["toggle", "switch", "wifi", "network", "icon"],
    props: {
      ...commonToggleProps,
      defaultChecked: {
        control: "boolean",
        default: true,
        description: "Initial checked state (connected).",
      },
      activeColor: {
        control: "color",
        default: "#3b82f6",
        description: "Color when wifi is connected.",
      },
      inactiveColor: {
        control: "color",
        default: "#171717",
        description: "Background color when wifi is offline.",
      },
    },
  },
]

