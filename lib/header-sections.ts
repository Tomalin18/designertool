import { HeroPropControl, HeroPropDefinition } from "./hero-sections"

export type HeaderPropControl = HeroPropControl
export type HeaderPropDefinition = HeroPropDefinition

export interface HeaderSectionMeta {
  slug: string
  name: string
  componentName: string
  description: string
  tags: string[]
  props: Record<string, HeaderPropDefinition>
}

export const headerSections: HeaderSectionMeta[] = [
  {
    slug: "simple-header",
    name: "Simple Header",
    componentName: "SimpleHeader",
    description: "A classic header with logo, navigation links, and a CTA button.",
    tags: ["header", "navigation", "simple", "classic", "light"],
    props: {
      logoText: {
        control: "text",
        default: "Lumina",
        description: "Logo text displayed on the left.",
      },
      link1Text: {
        control: "text",
        default: "Features",
        description: "Text for the first navigation link.",
      },
      link2Text: {
        control: "text",
        default: "Pricing",
        description: "Text for the second navigation link.",
      },
      link3Text: {
        control: "text",
        default: "About",
        description: "Text for the third navigation link.",
      },
      link4Text: {
        control: "text",
        default: "Blog",
        description: "Text for the fourth navigation link.",
      },
      buttonText: {
        control: "text",
        default: "Get Started",
        description: "Text for the CTA button.",
      },
      backgroundColor: {
        control: "color",
        default: "#ffffff",
        description: "Background color of the header.",
      },
      logoColor: {
        control: "color",
        default: "#000000",
        description: "Color of the logo text.",
      },
      linkColor: {
        control: "color",
        default: "#4b5563",
        description: "Color of the navigation links.",
      },
      linkHoverColor: {
        control: "color",
        default: "#000000",
        description: "Hover color for navigation links.",
      },
      buttonBackgroundColor: {
        control: "color",
        default: "#000000",
        description: "Background color of the CTA button.",
      },
      buttonTextColor: {
        control: "color",
        default: "#ffffff",
        description: "Text color of the CTA button.",
      },
      buttonBorderRadius: {
        control: "slider",
        default: 6,
        min: 0,
        max: 32,
        description: "Border radius of the CTA button.",
      },
      paddingY: {
        control: "slider",
        default: 16,
        min: 0,
        max: 64,
        description: "Vertical padding of the header.",
      },
      paddingX: {
        control: "slider",
        default: 24,
        min: 0,
        max: 128,
        description: "Horizontal padding of the header.",
      },
    },
  },
]

