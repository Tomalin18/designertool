export interface ComponentInfo {
  name: string
  description: string
  href: string
  category: string
}

export const componentsData: ComponentInfo[] = [
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

export const categories = ["All", "Display", "Forms", "Feedback", "Overlay", "Layout", "Navigation"] as const
