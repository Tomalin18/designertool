export type InputPropControl =
  | "text"
  | "boolean"
  | "select"
  | "slider"
  | "color"
  | "textarea"
  | "number"

export interface InputPropDefinition {
  control: InputPropControl
  default: string | number | boolean
  description: string
  options?: string[]
  min?: number
  max?: number
  docType?: string
}

export interface InputSectionMeta {
  slug: string
  name: string
  componentName: string
  description: string
  tags: string[]
  props: Record<string, InputPropDefinition>
}

// Common props for all inputs (without backgroundColor and textColor - add them only where needed)
const commonInputProps: Record<string, InputPropDefinition> = {
  placeholder: {
    control: "text",
    default: "",
    description: "Placeholder text displayed when input is empty.",
  },
  className: {
    control: "text",
    default: "",
    description: "Additional CSS classes to apply to the input.",
  },
  borderColor: {
    control: "color",
    default: "",
    description: "Border color (optional, uses default if empty).",
  },
  borderRadius: {
    control: "slider",
    min: 0,
    max: 24,
    default: 8,
    description: "Border radius in pixels.",
  },
}

export const inputSections: InputSectionMeta[] = [
  {
    slug: "standard-input",
    name: "Standard Input",
    componentName: "StandardInput",
    description: "A basic standard input with border and dark background.",
    tags: ["input", "basic", "form", "standard"],
    props: {
      ...commonInputProps,
      placeholder: {
        control: "text",
        default: "Standard input...",
        description: "Placeholder text displayed when input is empty.",
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
    },
  },
  {
    slug: "filled-input",
    name: "Filled Input",
    componentName: "FilledInput",
    description: "An input with filled background and no border.",
    tags: ["input", "filled", "form", "background"],
    props: {
      ...commonInputProps,
      placeholder: {
        control: "text",
        default: "Filled input...",
        description: "Placeholder text displayed when input is empty.",
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
      focusRingColor: {
        control: "color",
        default: "#6366f1",
        description: "Focus ring color.",
      },
    },
  },
  {
    slug: "underline-input",
    name: "Underline Input",
    componentName: "UnderlineInput",
    description: "An input with underline border and floating label.",
    tags: ["input", "underline", "form", "label"],
    props: {
      placeholder: {
        control: "text",
        default: "",
        description: "Placeholder text displayed when input is empty.",
      },
      className: {
        control: "text",
        default: "",
        description: "Additional CSS classes to apply to the input.",
      },
      label: {
        control: "text",
        default: "Underline Label",
        description: "Label text for the input.",
      },
      borderColor: {
        control: "color",
        default: "#404040",
        description: "Border color.",
      },
      textColor: {
        control: "color",
        default: "",
        description: "Text color (optional, uses default if empty).",
      },
    },
  },
  {
    slug: "icon-left-input",
    name: "Icon Left Input",
    componentName: "IconLeftInput",
    description: "An input with an icon on the left side.",
    tags: ["input", "icon", "form", "left"],
    props: {
      ...commonInputProps,
      placeholder: {
        control: "text",
        default: "Email address...",
        description: "Placeholder text displayed when input is empty.",
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
      focusBorderColor: {
        control: "color",
        default: "#6366f1",
        description: "Border color when focused.",
      },
    },
  },
  {
    slug: "password-input",
    name: "Password Input",
    componentName: "PasswordInput",
    description: "A password input with toggle visibility button.",
    tags: ["input", "password", "form", "toggle"],
    props: {
      ...commonInputProps,
      placeholder: {
        control: "text",
        default: "Password",
        description: "Placeholder text displayed when input is empty.",
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
      showPassword: {
        control: "boolean",
        default: false,
        description: "Whether to show password text (controlled externally).",
      },
      focusBorderColor: {
        control: "color",
        default: "#6366f1",
        description: "Border color when focused.",
      },
    },
  },
  {
    slug: "search-input",
    name: "Search Input",
    componentName: "SearchInput",
    description: "A search input with icon and keyboard shortcut indicator.",
    tags: ["input", "search", "form", "pill"],
    props: {
      ...commonInputProps,
      placeholder: {
        control: "text",
        default: "Search...",
        description: "Placeholder text displayed when input is empty.",
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
      borderRadius: {
        control: "slider",
        min: 0,
        max: 24,
        default: 9999,
        description: "Border radius in pixels (9999 for full rounded).",
      },
    },
  },
  {
    slug: "error-input",
    name: "Error Input",
    componentName: "ErrorInput",
    description: "An input with error state styling and error message.",
    tags: ["input", "error", "form", "validation"],
    props: {
      placeholder: {
        control: "text",
        default: "Invalid input...",
        description: "Placeholder text displayed when input is empty.",
      },
      className: {
        control: "text",
        default: "",
        description: "Additional CSS classes to apply to the input.",
      },
      errorMessage: {
        control: "text",
        default: "Please enter a valid email address.",
        description: "Error message to display below the input.",
      },
      errorColor: {
        control: "color",
        default: "#ef4444",
        description: "Error color for border and text.",
      },
      defaultValue: {
        control: "text",
        default: "invalid@email",
        description: "Default value for the input.",
      },
    },
  },
  {
    slug: "success-input",
    name: "Success Input",
    componentName: "SuccessInput",
    description: "An input with success state styling and check icon.",
    tags: ["input", "success", "form", "validation"],
    props: {
      placeholder: {
        control: "text",
        default: "Success input...",
        description: "Placeholder text displayed when input is empty.",
      },
      className: {
        control: "text",
        default: "",
        description: "Additional CSS classes to apply to the input.",
      },
      successColor: {
        control: "color",
        default: "#22c55e",
        description: "Success color for border and icon.",
      },
      defaultValue: {
        control: "text",
        default: "validuser",
        description: "Default value for the input.",
      },
    },
  },
  {
    slug: "floating-label-input",
    name: "Floating Label Input",
    componentName: "FloatingLabelInput",
    description: "An input with floating label that animates on focus.",
    tags: ["input", "floating", "label", "material"],
    props: {
      placeholder: {
        control: "text",
        default: "",
        description: "Placeholder text displayed when input is empty.",
      },
      className: {
        control: "text",
        default: "",
        description: "Additional CSS classes to apply to the input.",
      },
      label: {
        control: "text",
        default: "Floating Label",
        description: "Label text for the input.",
      },
      borderColor: {
        control: "color",
        default: "",
        description: "Border color (optional, uses default if empty).",
      },
      textColor: {
        control: "color",
        default: "",
        description: "Text color (optional, uses default if empty).",
      },
      focusBorderColor: {
        control: "color",
        default: "#6366f1",
        description: "Border color when focused.",
      },
    },
  },
  {
    slug: "tags-input",
    name: "Tags Input",
    componentName: "TagsInput",
    description: "An input that allows adding and removing tags.",
    tags: ["input", "tags", "form", "multiple"],
    props: {
      ...commonInputProps,
      placeholder: {
        control: "text",
        default: "Add tag...",
        description: "Placeholder text displayed when input is empty.",
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
      tags: {
        control: "textarea",
        default: "Design\nUI",
        description: "Initial tags (newline-separated).",
      },
      borderRadius: {
        control: "slider",
        min: 0,
        max: 24,
        default: 12,
        description: "Border radius in pixels.",
      },
    },
  },
  {
    slug: "newsletter-input",
    name: "Newsletter Input",
    componentName: "NewsletterInput",
    description: "An input with attached button for newsletter signup.",
    tags: ["input", "newsletter", "form", "button"],
    props: {
      ...commonInputProps,
      placeholder: {
        control: "text",
        default: "Enter your email",
        description: "Placeholder text displayed when input is empty.",
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
      buttonText: {
        control: "text",
        default: "Join",
        description: "Text for the submit button.",
      },
      buttonColor: {
        control: "color",
        default: "#6366f1",
        description: "Background color of the button.",
      },
    },
  },
  {
    slug: "otp-input",
    name: "OTP Input",
    componentName: "OTPInput",
    description: "An input with multiple OTP code fields.",
    tags: ["input", "otp", "form", "code"],
    props: {
      ...commonInputProps,
      digits: {
        control: "slider",
        min: 4,
        max: 8,
        default: 4,
        description: "Number of OTP digits.",
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
      focusBorderColor: {
        control: "color",
        default: "#6366f1",
        description: "Border color when focused.",
      },
    },
  },
  {
    slug: "file-upload-input",
    name: "File Upload Input",
    componentName: "FileUploadInput",
    description: "A file upload input with drag and drop area.",
    tags: ["input", "file", "upload", "form"],
    props: {
      className: {
        control: "text",
        default: "",
        description: "Additional CSS classes to apply to the input.",
      },
      uploadText: {
        control: "text",
        default: "Click to upload or drag & drop",
        description: "Text displayed in the upload area.",
      },
      borderColor: {
        control: "color",
        default: "",
        description: "Border color (optional, uses default if empty).",
      },
      backgroundColor: {
        control: "color",
        default: "",
        description: "Background color (optional, uses default if empty).",
      },
      borderRadius: {
        control: "slider",
        min: 0,
        max: 24,
        default: 12,
        description: "Border radius in pixels.",
      },
    },
  },
  {
    slug: "currency-input",
    name: "Currency Input",
    componentName: "CurrencyInput",
    description: "An input for currency values with currency symbol.",
    tags: ["input", "currency", "form", "money"],
    props: {
      ...commonInputProps,
      placeholder: {
        control: "text",
        default: "0.00",
        description: "Placeholder text displayed when input is empty.",
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
      currency: {
        control: "text",
        default: "USD",
        description: "Currency code to display.",
      },
      currencyColor: {
        control: "color",
        default: "#22c55e",
        description: "Color for currency symbol and focus border.",
      },
    },
  },
  {
    slug: "url-input",
    name: "URL Input",
    componentName: "URLInput",
    description: "An input for URLs with https prefix.",
    tags: ["input", "url", "form", "link"],
    props: {
      ...commonInputProps,
      placeholder: {
        control: "text",
        default: "example.com",
        description: "Placeholder text displayed when input is empty.",
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
      focusBorderColor: {
        control: "color",
        default: "#3b82f6",
        description: "Border color when focused.",
      },
    },
  },
  {
    slug: "color-input",
    name: "Color Input",
    componentName: "ColorInput",
    description: "An input for color selection with color picker.",
    tags: ["input", "color", "form", "picker"],
    props: {
      className: {
        control: "text",
        default: "",
        description: "Additional CSS classes to apply to the input.",
      },
      defaultValue: {
        control: "text",
        default: "#6366F1",
        description: "Default color value in hex format.",
      },
      borderColor: {
        control: "color",
        default: "",
        description: "Border color (optional, uses default if empty).",
      },
      backgroundColor: {
        control: "color",
        default: "",
        description: "Background color (optional, uses default if empty).",
      },
    },
  },
  {
    slug: "range-input",
    name: "Range Input",
    componentName: "RangeInput",
    description: "A range slider input with value display.",
    tags: ["input", "range", "slider", "form"],
    props: {
      className: {
        control: "text",
        default: "",
        description: "Additional CSS classes to apply to the input.",
      },
      label: {
        control: "text",
        default: "Volume",
        description: "Label text for the range input.",
      },
      min: {
        control: "number",
        default: 0,
        description: "Minimum value.",
      },
      max: {
        control: "number",
        default: 100,
        description: "Maximum value.",
      },
      defaultValue: {
        control: "slider",
        min: 0,
        max: 100,
        default: 50,
        description: "Default value.",
      },
      accentColor: {
        control: "color",
        default: "#6366f1",
        description: "Accent color for the slider.",
      },
    },
  },
  {
    slug: "neon-input",
    name: "Neon Input",
    componentName: "NeonInput",
    description: "An input with neon glow effect.",
    tags: ["input", "neon", "glow", "effect"],
    props: {
      ...commonInputProps,
      placeholder: {
        control: "text",
        default: "Neon glow...",
        description: "Placeholder text displayed when input is empty.",
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
      glowColor: {
        control: "color",
        default: "#06b6d4",
        description: "Neon glow color.",
      },
    },
  },
  {
    slug: "glass-input",
    name: "Glass Input",
    componentName: "GlassInput",
    description: "An input with glassmorphism effect.",
    tags: ["input", "glass", "glassmorphism", "effect"],
    props: {
      ...commonInputProps,
      placeholder: {
        control: "text",
        default: "Glassmorphism...",
        description: "Placeholder text displayed when input is empty.",
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
      borderRadius: {
        control: "slider",
        min: 0,
        max: 24,
        default: 12,
        description: "Border radius in pixels.",
      },
    },
  },
  {
    slug: "retro-input",
    name: "Retro Input",
    componentName: "RetroInput",
    description: "An input with retro Windows 95 style.",
    tags: ["input", "retro", "windows", "nostalgic"],
    props: {
      ...commonInputProps,
      placeholder: {
        control: "text",
        default: "C:\\WINDOWS\\...",
        description: "Placeholder text displayed when input is empty.",
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
    },
  },
  {
    slug: "terminal-input",
    name: "Terminal Input",
    componentName: "TerminalInput",
    description: "An input styled like a terminal command line.",
    tags: ["input", "terminal", "command", "code"],
    props: {
      ...commonInputProps,
      placeholder: {
        control: "text",
        default: "npm install...",
        description: "Placeholder text displayed when input is empty.",
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
      promptColor: {
        control: "color",
        default: "#22c55e",
        description: "Color for the terminal prompt.",
      },
      pathColor: {
        control: "color",
        default: "#60a5fa",
        description: "Color for the path text.",
      },
    },
  },
  {
    slug: "animated-border-input",
    name: "Animated Border Input",
    componentName: "AnimatedBorderInput",
    description: "An input with animated gradient border on focus.",
    tags: ["input", "animated", "gradient", "border"],
    props: {
      ...commonInputProps,
      placeholder: {
        control: "text",
        default: "Focus me...",
        description: "Placeholder text displayed when input is empty.",
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
      gradientFrom: {
        control: "color",
        default: "#6366f1",
        description: "Gradient start color.",
      },
      gradientVia: {
        control: "color",
        default: "#a855f7",
        description: "Gradient middle color.",
      },
      gradientTo: {
        control: "color",
        default: "#ec4899",
        description: "Gradient end color.",
      },
    },
  },
  {
    slug: "material-input",
    name: "Material Input",
    componentName: "MaterialInput",
    description: "An input with Material Design style.",
    tags: ["input", "material", "design", "ripple"],
    props: {
      ...commonInputProps,
      label: {
        control: "text",
        default: "Username",
        description: "Label text for the input.",
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
      focusBorderColor: {
        control: "color",
        default: "#6366f1",
        description: "Border color when focused.",
      },
    },
  },
  {
    slug: "copy-input",
    name: "Copy Input",
    componentName: "CopyInput",
    description: "A readonly input with copy button.",
    tags: ["input", "copy", "readonly", "clipboard"],
    props: {
      ...commonInputProps,
      value: {
        control: "text",
        default: "npm i @lumina/ui",
        description: "Value to display and copy.",
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
      buttonHoverColor: {
        control: "color",
        default: "#262626",
        description: "Background color for button on hover.",
      },
    },
  },
  {
    slug: "chat-input",
    name: "Chat Input",
    componentName: "ChatInput",
    description: "An input for chat messages with action buttons.",
    tags: ["input", "chat", "message", "social"],
    props: {
      ...commonInputProps,
      placeholder: {
        control: "text",
        default: "Type a message...",
        description: "Placeholder text displayed when input is empty.",
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
      borderRadius: {
        control: "slider",
        min: 0,
        max: 24,
        default: 9999,
        description: "Border radius in pixels (9999 for full rounded).",
      },
      buttonColor: {
        control: "color",
        default: "#2563eb",
        description: "Background color of the send button.",
      },
    },
  },
  {
    slug: "phone-input",
    name: "Phone Input",
    componentName: "PhoneInput",
    description: "An input for phone numbers with country code.",
    tags: ["input", "phone", "tel", "country"],
    props: {
      ...commonInputProps,
      placeholder: {
        control: "text",
        default: "(555) 000-0000",
        description: "Placeholder text displayed when input is empty.",
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
      countryCode: {
        control: "text",
        default: "+1",
        description: "Country code to display.",
      },
      countryFlag: {
        control: "text",
        default: "🇺🇸",
        description: "Country flag emoji.",
      },
    },
  },
  {
    slug: "date-input",
    name: "Date Input",
    componentName: "DateInput",
    description: "An input for date selection with calendar icon.",
    tags: ["input", "date", "calendar", "form"],
    props: {
      ...commonInputProps,
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
      focusBorderColor: {
        control: "color",
        default: "#6366f1",
        description: "Border color when focused.",
      },
    },
  },
  {
    slug: "card-input",
    name: "Card Input",
    componentName: "CardInput",
    description: "An input for credit card numbers.",
    tags: ["input", "card", "credit", "payment"],
    props: {
      ...commonInputProps,
      placeholder: {
        control: "text",
        default: "0000 0000 0000 0000",
        description: "Placeholder text displayed when input is empty.",
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
      focusBorderColor: {
        control: "color",
        default: "#6366f1",
        description: "Border color when focused.",
      },
    },
  },
  {
    slug: "command-input",
    name: "Command Input",
    componentName: "CommandInput",
    description: "An input for command palette with keyboard shortcut.",
    tags: ["input", "command", "palette", "keyboard"],
    props: {
      placeholder: {
        control: "text",
        default: "What do you need?",
        description: "Placeholder text displayed when input is empty.",
      },
      className: {
        control: "text",
        default: "",
        description: "Additional CSS classes to apply to the input.",
      },
      borderColor: {
        control: "color",
        default: "",
        description: "Border color (optional, uses default if empty).",
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
    },
  },
  {
    slug: "ghost-input",
    name: "Ghost Input",
    componentName: "GhostInput",
    description: "A minimalist ghost input with transparent border.",
    tags: ["input", "ghost", "minimal", "clean"],
    props: {
      placeholder: {
        control: "text",
        default: "Untitled Project",
        description: "Placeholder text displayed when input is empty.",
      },
      className: {
        control: "text",
        default: "",
        description: "Additional CSS classes to apply to the input.",
      },
      textColor: {
        control: "color",
        default: "",
        description: "Text color (optional, uses default if empty).",
      },
      borderRadius: {
        control: "slider",
        min: 0,
        max: 24,
        default: 0,
        description: "Border radius in pixels.",
      },
      hoverBorderColor: {
        control: "color",
        default: "#404040",
        description: "Border color on hover.",
      },
      focusBorderColor: {
        control: "color",
        default: "#ffffff",
        description: "Border color when focused.",
      },
    },
  },
]

