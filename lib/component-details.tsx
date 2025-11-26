import { heroSections } from "./hero-sections"
import { featureSections } from "./feature-sections"
import { paymentSections } from "./payment-sections"
import { ctaSections } from "./cta-sections"
import { footerSections } from "./footer-sections"

export interface ComponentDetail {
  name: string
  description: string
  category: string
  hasPlayground: boolean
  installation: string
  usage: string
  tags?: string[]
  props: Array<{
    name: string
    type: string
    default?: string
    description: string
  }>
  variants?: Array<{
    name: string
    description: string
    code: string
  }>
  examples?: Array<{
    title: string
    description: string
    code: string
  }>
}

export const componentDetails: Record<string, ComponentDetail> = {
  accordion: {
    name: "Accordion",
    description: "A vertically stacked set of interactive headings that each reveal a section of content.",
    category: "Display",
    hasPlayground: true,
    installation: "npx shadcn@latest add accordion",
    usage: `import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export function AccordionDemo() {
  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="item-1">
        <AccordionTrigger>Is it accessible?</AccordionTrigger>
        <AccordionContent>
          Yes. It adheres to the WAI-ARIA design pattern.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}`,
    props: [
      {
        name: "type",
        type: '"single" | "multiple"',
        description: "Determines whether one or multiple items can be opened at the same time.",
      },
      {
        name: "collapsible",
        type: "boolean",
        default: "false",
        description: "When type is 'single', allows closing content when clicking trigger for an open item.",
      },
      {
        name: "defaultValue",
        type: "string | string[]",
        description: "The default active value(s).",
      },
    ],
  },
  alert: {
    name: "Alert",
    description: "Displays a callout for user attention.",
    category: "Feedback",
    hasPlayground: false,
    installation: "npx shadcn@latest add alert",
    usage: `import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export function AlertDemo() {
  return (
    <Alert>
      <AlertTitle>Heads up!</AlertTitle>
      <AlertDescription>
        You can add components to your app using the cli.
      </AlertDescription>
    </Alert>
  )
}`,
    props: [
      {
        name: "variant",
        type: '"default" | "destructive"',
        default: '"default"',
        description: "The visual style of the alert.",
      },
    ],
    variants: [
      {
        name: "Default",
        description: "The default alert style.",
        code: `<Alert>
  <AlertTitle>Heads up!</AlertTitle>
  <AlertDescription>
    You can add components to your app using the cli.
  </AlertDescription>
</Alert>`,
      },
      {
        name: "Destructive",
        description: "Use for error or destructive messages.",
        code: `<Alert variant="destructive">
  <AlertTitle>Error</AlertTitle>
  <AlertDescription>
    Your session has expired. Please log in again.
  </AlertDescription>
</Alert>`,
      },
    ],
  },
  avatar: {
    name: "Avatar",
    description: "An image element with a fallback for representing the user.",
    category: "Display",
    hasPlayground: false,
    installation: "npx shadcn@latest add avatar",
    usage: `import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function AvatarDemo() {
  return (
    <Avatar>
      <AvatarImage src="/images/design-mode/shadcn.png" />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  )
}`,
    props: [
      {
        name: "asChild",
        type: "boolean",
        default: "false",
        description: "Change the component to a different HTML tag or custom component.",
      },
    ],
  },
  badge: {
    name: "Badge",
    description: "Displays a badge or a component that looks like a badge.",
    category: "Display",
    hasPlayground: false,
    installation: "npx shadcn@latest add badge",
    usage: `import { Badge } from "@/components/ui/badge"

export function BadgeDemo() {
  return <Badge>Badge</Badge>
}`,
    props: [
      {
        name: "variant",
        type: '"default" | "secondary" | "destructive" | "outline"',
        default: '"default"',
        description: "The visual style of the badge.",
      },
    ],
    variants: [
      {
        name: "Default",
        description: "The default badge style.",
        code: `<Badge>Badge</Badge>`,
      },
      {
        name: "Secondary",
        description: "A secondary badge style.",
        code: `<Badge variant="secondary">Secondary</Badge>`,
      },
      {
        name: "Destructive",
        description: "Use for error or destructive states.",
        code: `<Badge variant="destructive">Destructive</Badge>`,
      },
      {
        name: "Outline",
        description: "A badge with an outline.",
        code: `<Badge variant="outline">Outline</Badge>`,
      },
    ],
  },
  button: {
    name: "Button",
    description: "Displays a button or a component that looks like a button.",
    category: "Forms",
    hasPlayground: false,
    installation: "npx shadcn@latest add button",
    usage: `import { Button } from "@/components/ui/button"

export function ButtonDemo() {
  return <Button>Button</Button>
}`,
    props: [
      {
        name: "variant",
        type: '"default" | "destructive" | "outline" | "secondary" | "ghost" | "link"',
        default: '"default"',
        description: "The visual style of the button.",
      },
      {
        name: "size",
        type: '"default" | "sm" | "lg" | "icon"',
        default: '"default"',
        description: "The size of the button.",
      },
      {
        name: "asChild",
        type: "boolean",
        default: "false",
        description: "Change the component to a different HTML tag or custom component.",
      },
    ],
    variants: [
      {
        name: "Default",
        description: "The default button style.",
        code: `<Button>Button</Button>`,
      },
      {
        name: "Secondary",
        description: "A secondary button style.",
        code: `<Button variant="secondary">Secondary</Button>`,
      },
      {
        name: "Destructive",
        description: "Use for destructive actions.",
        code: `<Button variant="destructive">Destructive</Button>`,
      },
      {
        name: "Outline",
        description: "A button with an outline.",
        code: `<Button variant="outline">Outline</Button>`,
      },
      {
        name: "Ghost",
        description: "A button with minimal styling.",
        code: `<Button variant="ghost">Ghost</Button>`,
      },
      {
        name: "Link",
        description: "A button that looks like a link.",
        code: `<Button variant="link">Link</Button>`,
      },
    ],
  },
  card: {
    name: "Card",
    description: "Displays a card with header, content, and footer.",
    category: "Display",
    hasPlayground: false,
    installation: "npx shadcn@latest add card",
    usage: `import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export function CardDemo() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>Card Description</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Card Content</p>
      </CardContent>
      <CardFooter>
        <p>Card Footer</p>
      </CardFooter>
    </Card>
  )
}`,
    props: [
      {
        name: "className",
        type: "string",
        description: "Additional CSS classes to apply to the card.",
      },
    ],
  },
  checkbox: {
    name: "Checkbox",
    description: "A control that allows the user to toggle between checked and not checked.",
    category: "Forms",
    hasPlayground: false,
    installation: "npx shadcn@latest add checkbox",
    usage: `import { Checkbox } from "@/components/ui/checkbox"

export function CheckboxDemo() {
  return (
    <div className="flex items-center space-x-2">
      <Checkbox id="terms" />
      <label htmlFor="terms">Accept terms and conditions</label>
    </div>
  )
}`,
    props: [
      {
        name: "checked",
        type: "boolean",
        description: "The controlled checked state of the checkbox.",
      },
      {
        name: "defaultChecked",
        type: "boolean",
        description: "The default checked state when initially rendered.",
      },
      {
        name: "onCheckedChange",
        type: "(checked: boolean) => void",
        description: "Event handler called when the checked state changes.",
      },
      {
        name: "disabled",
        type: "boolean",
        default: "false",
        description: "When true, prevents the user from interacting with the checkbox.",
      },
    ],
  },
  dialog: {
    name: "Dialog",
    description: "A window overlaid on either the primary window or another dialog window.",
    category: "Overlay",
    hasPlayground: false,
    installation: "npx shadcn@latest add dialog",
    usage: `import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

export function DialogDemo() {
  return (
    <Dialog>
      <DialogTrigger>Open</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone.
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}`,
    props: [
      {
        name: "open",
        type: "boolean",
        description: "The controlled open state of the dialog.",
      },
      {
        name: "onOpenChange",
        type: "(open: boolean) => void",
        description: "Event handler called when the open state changes.",
      },
    ],
  },
  "dropdown-menu": {
    name: "Dropdown Menu",
    description: "Displays a menu to the user — such as a set of actions or functions — triggered by a button.",
    category: "Overlay",
    hasPlayground: false,
    installation: "npx shadcn@latest add dropdown-menu",
    usage: `import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function DropdownMenuDemo() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>Open</DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Profile</DropdownMenuItem>
        <DropdownMenuItem>Settings</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}`,
    props: [
      {
        name: "open",
        type: "boolean",
        description: "The controlled open state of the dropdown menu.",
      },
      {
        name: "onOpenChange",
        type: "(open: boolean) => void",
        description: "Event handler called when the open state changes.",
      },
    ],
  },
  input: {
    name: "Input",
    description: "Displays a form input field or a component that looks like an input field.",
    category: "Forms",
    hasPlayground: false,
    installation: "npx shadcn@latest add input",
    usage: `import { Input } from "@/components/ui/input"

export function InputDemo() {
  return <Input type="email" placeholder="Email" />
}`,
    props: [
      {
        name: "type",
        type: "string",
        default: '"text"',
        description: "The type of the input.",
      },
      {
        name: "disabled",
        type: "boolean",
        default: "false",
        description: "When true, prevents the user from interacting with the input.",
      },
      {
        name: "placeholder",
        type: "string",
        description: "The placeholder text for the input.",
      },
    ],
  },
  label: {
    name: "Label",
    description: "Renders an accessible label associated with controls.",
    category: "Forms",
    hasPlayground: false,
    installation: "npx shadcn@latest add label",
    usage: `import { Label } from "@/components/ui/label"

export function LabelDemo() {
  return <Label htmlFor="email">Email</Label>
}`,
    props: [
      {
        name: "htmlFor",
        type: "string",
        description: "The id of the element the label is associated with.",
      },
    ],
  },
  select: {
    name: "Select",
    description: "Displays a list of options for the user to pick from—triggered by a button.",
    category: "Forms",
    hasPlayground: false,
    installation: "npx shadcn@latest add select",
    usage: `import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export function SelectDemo() {
  return (
    <Select>
      <SelectTrigger>
        <SelectValue placeholder="Select a fruit" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="apple">Apple</SelectItem>
        <SelectItem value="banana">Banana</SelectItem>
        <SelectItem value="orange">Orange</SelectItem>
      </SelectContent>
    </Select>
  )
}`,
    props: [
      {
        name: "value",
        type: "string",
        description: "The controlled value of the select.",
      },
      {
        name: "onValueChange",
        type: "(value: string) => void",
        description: "Event handler called when the value changes.",
      },
      {
        name: "disabled",
        type: "boolean",
        default: "false",
        description: "When true, prevents the user from interacting with the select.",
      },
    ],
  },
  separator: {
    name: "Separator",
    description: "Visually or semantically separates content.",
    category: "Layout",
    hasPlayground: false,
    installation: "npx shadcn@latest add separator",
    usage: `import { Separator } from "@/components/ui/separator"

export function SeparatorDemo() {
  return (
    <div>
      <div className="space-y-1">
        <h4 className="text-sm font-medium">Radix Primitives</h4>
        <p className="text-sm text-muted-foreground">
          An open-source UI component library.
        </p>
      </div>
      <Separator className="my-4" />
      <div className="flex h-5 items-center space-x-4 text-sm">
        <div>Blog</div>
        <Separator orientation="vertical" />
        <div>Docs</div>
        <Separator orientation="vertical" />
        <div>Source</div>
      </div>
    </div>
  )
}`,
    props: [
      {
        name: "orientation",
        type: '"horizontal" | "vertical"',
        default: '"horizontal"',
        description: "The orientation of the separator.",
      },
      {
        name: "decorative",
        type: "boolean",
        default: "true",
        description: "When true, assumes the separator is purely visual.",
      },
    ],
  },
  skeleton: {
    name: "Skeleton",
    description: "Use to show a placeholder while content is loading.",
    category: "Feedback",
    hasPlayground: false,
    installation: "npx shadcn@latest add skeleton",
    usage: `import { Skeleton } from "@/components/ui/skeleton"

export function SkeletonDemo() {
  return (
    <div className="flex items-center space-x-4">
      <Skeleton className="h-12 w-12 rounded-full" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
    </div>
  )
}`,
    props: [
      {
        name: "className",
        type: "string",
        description: "Additional CSS classes to apply to the skeleton.",
      },
    ],
  },
  switch: {
    name: "Switch",
    description: "A control that allows the user to toggle between checked and not checked.",
    category: "Forms",
    hasPlayground: false,
    installation: "npx shadcn@latest add switch",
    usage: `import { Switch } from "@/components/ui/switch"

export function SwitchDemo() {
  return (
    <div className="flex items-center space-x-2">
      <Switch id="airplane-mode" />
      <label htmlFor="airplane-mode">Airplane Mode</label>
    </div>
  )
}`,
    props: [
      {
        name: "checked",
        type: "boolean",
        description: "The controlled checked state of the switch.",
      },
      {
        name: "onCheckedChange",
        type: "(checked: boolean) => void",
        description: "Event handler called when the checked state changes.",
      },
      {
        name: "disabled",
        type: "boolean",
        default: "false",
        description: "When true, prevents the user from interacting with the switch.",
      },
    ],
  },
  tabs: {
    name: "Tabs",
    description: "A set of layered sections of content—known as tab panels—that are displayed one at a time.",
    category: "Navigation",
    hasPlayground: false,
    installation: "npx shadcn@latest add tabs",
    usage: `import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function TabsDemo() {
  return (
    <Tabs defaultValue="account">
      <TabsList>
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="password">Password</TabsTrigger>
      </TabsList>
      <TabsContent value="account">Account content</TabsContent>
      <TabsContent value="password">Password content</TabsContent>
    </Tabs>
  )
}`,
    props: [
      {
        name: "defaultValue",
        type: "string",
        description: "The value of the tab that should be active by default.",
      },
      {
        name: "value",
        type: "string",
        description: "The controlled value of the tab to activate.",
      },
      {
        name: "onValueChange",
        type: "(value: string) => void",
        description: "Event handler called when the value changes.",
      },
    ],
  },
  textarea: {
    name: "Textarea",
    description: "Displays a form textarea or a component that looks like a textarea.",
    category: "Forms",
    hasPlayground: false,
    installation: "npx shadcn@latest add textarea",
    usage: `import { Textarea } from "@/components/ui/textarea"

export function TextareaDemo() {
  return <Textarea placeholder="Type your message here." />
}`,
    props: [
      {
        name: "disabled",
        type: "boolean",
        default: "false",
        description: "When true, prevents the user from interacting with the textarea.",
      },
      {
        name: "placeholder",
        type: "string",
        description: "The placeholder text for the textarea.",
      },
    ],
  },
  toast: {
    name: "Toast",
    description: "A succinct message that is displayed temporarily.",
    category: "Feedback",
    hasPlayground: false,
    installation: "npx shadcn@latest add toast",
    usage: `import { useToast } from "@/hooks/use-toast"

export function ToastDemo() {
  const { toast } = useToast()

  return (
    <Button
      onClick={() => {
        toast({
          title: "Scheduled: Catch up",
          description: "Friday, February 10, 2023 at 5:57 PM",
        })
      }}
    >
      Show Toast
    </Button>
  )
}`,
    props: [
      {
        name: "title",
        type: "string",
        description: "The title of the toast.",
      },
      {
        name: "description",
        type: "string",
        description: "The description of the toast.",
      },
      {
        name: "variant",
        type: '"default" | "destructive"',
        default: '"default"',
        description: "The visual style of the toast.",
      },
    ],
  },
  toggle: {
    name: "Toggle",
    description: "A two-state button that can be either on or off.",
    category: "Forms",
    hasPlayground: false,
    installation: "npx shadcn@latest add toggle",
    usage: `import { Toggle } from "@/components/ui/toggle"

export function ToggleDemo() {
  return <Toggle>Toggle</Toggle>
}`,
    props: [
      {
        name: "pressed",
        type: "boolean",
        description: "The controlled pressed state of the toggle.",
      },
      {
        name: "onPressedChange",
        type: "(pressed: boolean) => void",
        description: "Event handler called when the pressed state changes.",
      },
      {
        name: "disabled",
        type: "boolean",
        default: "false",
        description: "When true, prevents the user from interacting with the toggle.",
      },
      {
        name: "variant",
        type: '"default" | "outline"',
        default: '"default"',
        description: "The visual style of the toggle.",
      },
      {
        name: "size",
        type: '"default" | "sm" | "lg"',
        default: '"default"',
        description: "The size of the toggle.",
      },
    ],
  },
  tooltip: {
    name: "Tooltip",
    description: "A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.",
    category: "Overlay",
    hasPlayground: false,
    installation: "npx shadcn@latest add tooltip",
    usage: `import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

export function TooltipDemo() {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>Hover</TooltipTrigger>
        <TooltipContent>
          <p>Add to library</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}`,
    props: [
      {
        name: "open",
        type: "boolean",
        description: "The controlled open state of the tooltip.",
      },
      {
        name: "onOpenChange",
        type: "(open: boolean) => void",
        description: "Event handler called when the open state changes.",
      },
      {
        name: "delayDuration",
        type: "number",
        default: "700",
        description: "The duration from when the mouse enters until the tooltip opens.",
      },
    ],
  },
  "url-input": {
    name: "UrlInput",
    description: "A URL input component with gradient border effect and generate button.",
    category: "Forms",
    hasPlayground: true,
    tags: ["input", "url", "gradient", "form", "button", "search", "submit", "loading", "icon"],
    installation: "Copy the component from the code example below.",
    usage: `import { UrlInput } from "@/components/customize/url-input"

export function UrlInputDemo() {
  const handleGenerate = (url: string) => {
    console.log('Generated URL:', url)
    // Your logic here
  }

  return (
    <UrlInput 
      onGenerate={handleGenerate}
      isLoading={false}
    />
  )
}`,
    props: [
      {
        name: "onGenerate",
        type: "(url: string) => void",
        description: "Callback function called when the form is submitted with a valid URL.",
      },
      {
        name: "isLoading",
        type: "boolean",
        default: "false",
        description: "Whether the component is in a loading state.",
      },
      {
        name: "borderRadius",
        type: "number",
        default: "12",
        description: "Border radius in pixels for the input container.",
      },
      {
        name: "gradientFrom",
        type: "string",
        description: "Starting color for the gradient border effect. Defaults to primary color if not provided.",
      },
      {
        name: "gradientTo",
        type: "string",
        description: "Ending color for the gradient border effect. Defaults to indigo-600 if not provided.",
      },
      {
        name: "backgroundColor",
        type: "string",
        default: "rgb(15 23 42)",
        description: "Background color of the input container.",
      },
      {
        name: "borderColor",
        type: "string",
        default: "rgb(51 65 85)",
        description: "Border color of the input container.",
      },
      {
        name: "showButton",
        type: "boolean",
        default: "true",
        description: "Whether to show the submit button.",
      },
      {
        name: "buttonText",
        type: "string",
        default: "Generate",
        description: "Text displayed on the submit button.",
      },
      {
        name: "placeholder",
        type: "string",
        default: "https://your-shop.com/product/...",
        description: "Placeholder text for the input field.",
      },
      {
        name: "showIcon",
        type: "boolean",
        default: "true",
        description: "Whether to show the search icon.",
      },
      {
        name: "className",
        type: "string",
        description: "Additional CSS classes to apply to the form element.",
      },
    ],
    variants: [
      {
        name: "Default",
        description: "The default URL input with gradient border effect.",
        code: `<UrlInput 
  onGenerate={(url) => console.log('Generated URL:', url)} 
  isLoading={false}
/>`,
      },
      {
        name: "Loading",
        description: "URL input in loading state.",
        code: `<UrlInput 
  onGenerate={(url) => console.log('Generated URL:', url)} 
  isLoading={true}
/>`,
      },
    ],
    examples: [
      {
        title: "Basic Usage",
        description: "A simple URL input with submit handler.",
        code: `import { UrlInput } from "@/components/customize/url-input"
import { useState } from "react"

export function BasicUrlInput() {
  const [url, setUrl] = useState("")

  const handleGenerate = (inputUrl: string) => {
    setUrl(inputUrl)
    // Process the URL
    console.log('Processing URL:', inputUrl)
  }

  return (
    <div className="space-y-4">
      <UrlInput onGenerate={handleGenerate} />
      {url && <p className="text-sm text-muted-foreground">Last URL: {url}</p>}
    </div>
  )
}`,
      },
      {
        title: "With Loading State",
        description: "URL input with async processing and loading state.",
        code: `import { UrlInput } from "@/components/customize/url-input"
import { useState } from "react"

export function AsyncUrlInput() {
  const [isLoading, setIsLoading] = useState(false)

  const handleGenerate = async (url: string) => {
    setIsLoading(true)
    try {
      // Simulate API call
      await fetch('/api/process-url', {
        method: 'POST',
        body: JSON.stringify({ url }),
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <UrlInput 
      onGenerate={handleGenerate}
      isLoading={isLoading}
    />
  )
}`,
      },
    ],
  },
  "media-player": {
    name: "MediaPlayer",
    description: "A beautiful media player component with album art, playback controls, and progress bar.",
    category: "Display",
    hasPlayground: true,
    tags: ["audio", "music", "player", "media", "playback", "controls", "progress", "slider", "button", "upload", "image"],
    installation: "Copy the component from the code example below.",
    usage: `import { MediaPlayer } from "@/components/customize/media-player"

export function MediaPlayerDemo() {
  return (
    <MediaPlayer 
      trackTitle="Midnight City"
      artist="M83"
      album="Hurry Up, We're Dreaming"
    />
  )
}`,
    props: [
      {
        name: "className",
        type: "string",
        description: "Additional CSS classes to apply to the media player container.",
      },
      {
        name: "trackTitle",
        type: "string",
        default: '"Midnight City"',
        description: "The title of the current track.",
      },
      {
        name: "artist",
        type: "string",
        default: '"M83"',
        description: "The artist name.",
      },
      {
        name: "album",
        type: "string",
        default: "\"Hurry Up, We're Dreaming\"",
        description: "The album name (optional, displayed after artist).",
      },
      {
        name: "albumArtUrl",
        type: "string",
        default: "Unsplash image URL",
        description: "URL of the album art image.",
      },
      {
        name: "currentTime",
        type: "string",
        default: '"2:14"',
        description: "Current playback time in MM:SS format.",
      },
      {
        name: "totalTime",
        type: "string",
        default: '"4:03"',
        description: "Total track duration in MM:SS format.",
      },
      {
        name: "progress",
        type: "number",
        default: "66.67",
        description: "Playback progress percentage (0-100).",
      },
      {
        name: "isPlaying",
        type: "boolean",
        default: "true",
        description: "Initial playing state.",
      },
      {
        name: "isLoved",
        type: "boolean",
        default: "false",
        description: "Initial loved/favorited state.",
      },
      {
        name: "isShuffle",
        type: "boolean",
        default: "false",
        description: "Initial shuffle state (whether shuffle is active).",
      },
      {
        name: "isRepeat",
        type: "boolean",
        default: "false",
        description: "Initial repeat state (whether repeat is active).",
      },
      {
        name: "showShuffle",
        type: "boolean",
        default: "true",
        description: "Whether to show the shuffle button.",
      },
      {
        name: "showRepeat",
        type: "boolean",
        default: "true",
        description: "Whether to show the repeat button.",
      },
      {
        name: "showHeart",
        type: "boolean",
        default: "true",
        description: "Whether to show the heart/favorite button.",
      },
      {
        name: "backgroundColor",
        type: "string",
        default: "rgb(23 23 23 / 0.6)",
        description: "Background color of the player (supports hex or rgb).",
      },
      {
        name: "borderColor",
        type: "string",
        default: "rgba(255, 255, 255, 0.1)",
        description: "Border color of the player (supports hex or rgb).",
      },
      {
        name: "borderRadius",
        type: "number",
        default: "24",
        description: "Border radius in pixels.",
      },
      {
        name: "glowColor1",
        type: "string",
        default: "rgb(99 102 241 / 0.2)",
        description: "First background glow color (top-right, supports hex or rgb).",
      },
      {
        name: "glowColor2",
        type: "string",
        default: "rgb(168 85 247 / 0.2)",
        description: "Second background glow color (bottom-left, supports hex or rgb).",
      },
      {
        name: "onPlayPause",
        type: "(isPlaying: boolean) => void",
        description: "Callback function called when play/pause button is clicked.",
      },
      {
        name: "onLove",
        type: "(isLoved: boolean) => void",
        description: "Callback function called when heart button is clicked.",
      },
      {
        name: "onShuffle",
        type: "(isShuffle: boolean) => void",
        description: "Callback function called when shuffle button is clicked (returns new shuffle state).",
      },
      {
        name: "onRepeat",
        type: "(isRepeat: boolean) => void",
        description: "Callback function called when repeat button is clicked (returns new repeat state).",
      },
      {
        name: "onSkipBack",
        type: "() => void",
        description: "Callback function called when skip back button is clicked.",
      },
      {
        name: "onSkipForward",
        type: "() => void",
        description: "Callback function called when skip forward button is clicked.",
      },
      {
        name: "enableImageUpload",
        type: "boolean",
        default: "false",
        description: "Whether to enable image upload functionality for album art.",
      },
      {
        name: "onImageUpload",
        type: "(imageUrl: string) => void",
        description: "Callback function called when an image is uploaded (returns base64 data URL).",
      },
      {
        name: "onTimeChange",
        type: "(currentTime: string, progress: number) => void",
        description: "Callback function called when time or progress changes (automatically synced).",
      },
    ],
    variants: [
      {
        name: "Default",
        description: "The default media player with all features enabled.",
        code: `<MediaPlayer />`,
      },
      {
        name: "Custom Track",
        description: "Media player with custom track information.",
        code: `<MediaPlayer 
  trackTitle="Blinding Lights"
  artist="The Weeknd"
  album="After Hours"
  albumArtUrl="https://example.com/album.jpg"
/>`,
      },
      {
        name: "Minimal Controls",
        description: "Media player with only essential controls.",
        code: `<MediaPlayer 
  showShuffle={false}
  showRepeat={false}
  showHeart={false}
/>`,
      },
    ],
    examples: [
      {
        title: "Basic Usage",
        description: "A simple media player component with default settings.",
        code: `import { MediaPlayer } from "@/components/customize/media-player"

export function BasicMediaPlayer() {
  return (
    <div className="max-w-sm">
      <MediaPlayer />
    </div>
  )
}`,
      },
      {
        title: "With Custom Track Info",
        description: "Media player with custom track, artist, and album information.",
        code: `import { MediaPlayer } from "@/components/customize/media-player"

export function CustomTrackPlayer() {
  return (
    <div className="max-w-sm">
      <MediaPlayer 
        trackTitle="Blinding Lights"
        artist="The Weeknd"
        album="After Hours"
        currentTime="3:15"
        totalTime="3:21"
        progress={92}
      />
    </div>
  )
}`,
      },
      {
        title: "With Event Handlers",
        description: "Media player with custom event handlers for user interactions.",
        code: `import { MediaPlayer } from "@/components/customize/media-player"
import { useState } from "react"

export function InteractivePlayer() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isLoved, setIsLoved] = useState(false)

  return (
    <div className="max-w-sm">
      <MediaPlayer 
        isPlaying={isPlaying}
        isLoved={isLoved}
        onPlayPause={(playing) => {
          setIsPlaying(playing)
          console.log('Playing:', playing)
        }}
        onLove={(loved) => {
          setIsLoved(loved)
          console.log('Loved:', loved)
        }}
        onSkipBack={() => console.log('Skip back')}
        onSkipForward={() => console.log('Skip forward')}
      />
    </div>
  )
}`,
      },
      {
        title: "With Custom Colors",
        description: "Media player with custom background, border, and glow colors.",
        code: `import { MediaPlayer } from "@/components/customize/media-player"

export function CustomColorPlayer() {
  return (
    <div className="max-w-sm">
      <MediaPlayer 
        backgroundColor="rgb(15 23 42 / 0.8)"
        borderColor="rgba(59, 130, 246, 0.3)"
        glowColor1="rgb(59 130 246 / 0.3)"
        glowColor2="rgb(147 51 234 / 0.3)"
        borderRadius={32}
      />
    </div>
  )
}`,
      },
    ],
  },
  "chat-interface": {
    name: "ChatInterface",
    description: "A modern chat interface component with message bubbles, typing indicator, and input area. Perfect for messaging applications, customer support chats, or any real-time communication interface.",
    category: "Display",
    hasPlayground: true,
    tags: ["chat", "messaging", "message", "conversation", "communication", "input", "button", "avatar", "badge", "indicator", "bubble"],
    installation: "Copy the component from the code example below.",
    usage: `import { ChatInterface } from "@/components/customize/chat-interface"

export function ChatInterfaceDemo() {
  return (
    <div className="h-[600px] w-full max-w-md">
      <ChatInterface />
    </div>
  )
}`,
    props: [
      {
        name: "className",
        type: "string",
        description: "Additional CSS classes to apply to the chat interface container. Use this to customize the appearance, size, or add custom styling.",
      },
      // Header props
      {
        name: "headerUserName",
        type: "string",
        default: '"Sarah Jenkins"',
        description: "The name displayed in the header.",
      },
      {
        name: "headerUserStatus",
        type: "string",
        default: '"Online now"',
        description: "The status displayed below the user name. Options: 'Online now' (green), 'Offline' (gray), 'Away' (yellow), 'Busy' (red), 'Do not disturb' (orange), or 'Other' for custom status.",
      },
      {
        name: "headerUserStatusCustom",
        type: "string",
        description: "Custom status text when 'Other' is selected. Only visible when headerUserStatus is set to 'Other'.",
      },
      {
        name: "headerUserAvatar",
        type: "string",
        default: "Unsplash image URL",
        description: "URL of the user avatar image.",
      },
      {
        name: "headerShowPhone",
        type: "boolean",
        default: "true",
        description: "Whether to show the phone call button in the header.",
      },
      {
        name: "headerShowVideo",
        type: "boolean",
        default: "true",
        description: "Whether to show the video call button in the header.",
      },
      {
        name: "headerShowMore",
        type: "boolean",
        default: "true",
        description: "Whether to show the more options button in the header.",
      },
      {
        name: "headerBgColor",
        type: "string",
        default: '"bg-neutral-900/80"',
        description: "Background color class for the header section.",
      },
      {
        name: "headerBorderColor",
        type: "string",
        default: '"border-neutral-800"',
        description: "Border color class for the header section.",
      },
      {
        name: "headerTextColor",
        type: "string",
        default: '"text-neutral-100"',
        description: "Text color class for the header user name.",
      },
      {
        name: "headerStatusColor",
        type: "string",
        description: "Text color class for the header status. If not set, colors are automatically assigned: Online now (green), Offline (gray), Away (yellow), Busy (red), Do not disturb (orange). Leave empty to use default colors, or set a custom color class to override.",
      },
      // Body props
      {
        name: "bodyBgColor",
        type: "string",
        description: "Background color class for the message area. Leave empty for default.",
      },
      {
        name: "bodyPadding",
        type: "number",
        default: "6",
        description: "Padding value for the message area (in Tailwind spacing units, 1 = 4px).",
      },
      {
        name: "bodyShowDateLabel",
        type: "boolean",
        default: "true",
        description: "Whether to show the date label above messages.",
      },
      {
        name: "bodyDateLabelText",
        type: "string",
        default: '"Today, Oct 24"',
        description: "Text displayed in the date label.",
      },
      {
        name: "bodyShowTypingIndicator",
        type: "boolean",
        default: "true",
        description: "Whether to show the typing indicator animation.",
      },
      {
        name: "bodyShowReadReceipt",
        type: "boolean",
        default: "false",
        description: "Whether to show read receipt indicators (checkmarks) on own messages. Single checkmark for sent, double checkmark for read.",
      },
      {
        name: "ownMessageColor",
        type: "string",
        default: '"bg-indigo-600"',
        description: "Background color class for messages sent by the current user.",
      },
      {
        name: "otherMessageColor",
        type: "string",
        default: '"bg-neutral-800"',
        description: "Background color class for messages received from others.",
      },
      {
        name: "messageTextColor",
        type: "string",
        description: "Text color class for message content. Leave empty for default colors.",
      },
      {
        name: "timeTextColor",
        type: "string",
        default: '"text-neutral-500"',
        description: "Text color class for message timestamps.",
      },
      // Footer props
      {
        name: "footerBgColor",
        type: "string",
        default: '"bg-neutral-900/80"',
        description: "Background color class for the footer/input area.",
      },
      {
        name: "footerBorderColor",
        type: "string",
        default: '"border-neutral-800"',
        description: "Border color class for the input container.",
      },
      {
        name: "footerInputBgColor",
        type: "string",
        default: '"bg-neutral-950"',
        description: "Background color class for the input field container.",
      },
      {
        name: "footerInputPlaceholder",
        type: "string",
        default: '"Type a message..."',
        description: "Placeholder text for the message input field.",
      },
      {
        name: "footerShowAttach",
        type: "boolean",
        default: "true",
        description: "Whether to show the attachment button.",
      },
      {
        name: "footerShowEmoji",
        type: "boolean",
        default: "true",
        description: "Whether to show the emoji picker button.",
      },
      {
        name: "footerButtonColor",
        type: "string",
        default: '"bg-indigo-600"',
        description: "Background color class for the send button.",
      },
      {
        name: "footerFocusBorderColor",
        type: "string",
        default: '"border-indigo-500/50"',
        description: "Border color class when the input is focused.",
      },
    ],
    variants: [
      {
        name: "Default",
        description: "The default chat interface with sample messages, header with user info, and input area.",
        code: `<ChatInterface />`,
      },
      {
        name: "Compact Size",
        description: "A more compact version suitable for smaller screens or sidebars.",
        code: `<div className="h-[400px] w-full max-w-sm">
  <ChatInterface className="rounded-2xl" />
</div>`,
      },
      {
        name: "Full Width",
        description: "Chat interface that spans the full width of its container.",
        code: `<div className="h-[700px] w-full">
  <ChatInterface className="rounded-3xl shadow-2xl" />
</div>`,
      },
    ],
    examples: [
      {
        title: "Basic Usage",
        description: "A simple chat interface component with default settings. Perfect for getting started quickly.",
        code: `import { ChatInterface } from "@/components/customize/chat-interface"

export function BasicChatInterface() {
  return (
    <div className="h-[600px] w-full max-w-md">
      <ChatInterface />
    </div>
  )
}`,
      },
      {
        title: "With Custom Styling",
        description: "Chat interface with custom className for additional styling and enhanced visual effects.",
        code: `import { ChatInterface } from "@/components/customize/chat-interface"

export function CustomStyledChat() {
  return (
    <div className="h-[600px] w-full max-w-lg">
      <ChatInterface className="shadow-2xl border-2 border-indigo-500/20" />
    </div>
  )
}`,
      },
      {
        title: "Responsive Layout",
        description: "Chat interface that adapts to different screen sizes using responsive classes.",
        code: `import { ChatInterface } from "@/components/customize/chat-interface"

export function ResponsiveChat() {
  return (
    <div className="h-[500px] md:h-[600px] lg:h-[700px] w-full max-w-sm md:max-w-md lg:max-w-lg">
      <ChatInterface />
    </div>
  )
}`,
      },
      {
        title: "In a Card Container",
        description: "Chat interface embedded within a card component for better integration with your design system.",
        code: `import { ChatInterface } from "@/components/customize/chat-interface"
import { Card } from "@/components/ui/card"

export function ChatInCard() {
  return (
    <Card className="p-4">
      <div className="h-[600px] w-full">
        <ChatInterface />
      </div>
    </Card>
  )
}`,
      },
    ],
  },
  "social-profile-card": {
    name: "SocialProfileCard",
    description: "A beautiful social profile card component with avatar, stats, and action buttons. Perfect for user profiles, team member showcases, or social media interfaces.",
    category: "Display",
    hasPlayground: true,
    tags: ["profile", "social", "card", "user", "avatar", "stats", "button", "banner", "gradient", "follow", "link"],
    installation: "Copy the component from the code example below.",
    usage: `import { SocialProfileCard } from "@/components/customize/SocialProfileCard"

export function SocialProfileCardDemo() {
  return (
    <SocialProfileCard 
      name="Sarah Jenkins"
      username="@sarah_des"
      bio="Product Designer crafting digital experiences."
    />
  )
}`,
    props: [
      {
        name: "className",
        type: "string",
        description: "Additional CSS classes to apply to the card container.",
      },
      {
        name: "name",
        type: "string",
        default: '"Sarah Jenkins"',
        description: "The user's display name.",
      },
      {
        name: "username",
        type: "string",
        default: '"@sarah_des"',
        description: "The user's username or handle (displayed below the name).",
      },
      {
        name: "bio",
        type: "string",
        default: "Product Designer crafting digital experiences...",
        description: "The user's bio or description text.",
      },
      {
        name: "avatarUrl",
        type: "string",
        default: "Unsplash image URL",
        description: "URL of the user's avatar image.",
      },
      {
        name: "location",
        type: "string",
        default: '"San Francisco, CA"',
        description: "The user's location (displayed with MapPin icon).",
      },
      {
        name: "website",
        type: "string",
        default: '"sarah.design"',
        description: "The user's website URL (displayed with Link icon).",
      },
      {
        name: "twitter",
        type: "string",
        default: '"@sarah_des"',
        description: "The user's Twitter handle (displayed with Twitter icon).",
      },
      {
        name: "showLocation",
        type: "boolean",
        default: "true",
        description: "Whether to show the location information.",
      },
      {
        name: "showWebsite",
        type: "boolean",
        default: "true",
        description: "Whether to show the website information.",
      },
      {
        name: "showTwitter",
        type: "boolean",
        default: "true",
        description: "Whether to show the Twitter handle.",
      },
      {
        name: "followers",
        type: "string | number",
        default: '"12.5k"',
        description: "Number of followers (automatically formatted if number is provided).",
      },
      {
        name: "following",
        type: "string | number",
        default: '"842"',
        description: "Number of following (automatically formatted if number is provided).",
      },
      {
        name: "projects",
        type: "string | number",
        default: '"142"',
        description: "Number of projects (automatically formatted if number is provided).",
      },
      {
        name: "isOnline",
        type: "boolean",
        default: "true",
        description: "Whether to show the online status indicator.",
      },
      {
        name: "statusColor",
        type: "string",
        default: '"bg-green-500"',
        description: "Tailwind class for the status indicator color (e.g., 'bg-green-500', 'bg-yellow-500').",
      },
      {
        name: "bannerGradientFrom",
        type: "string",
        default: '"from-indigo-500"',
        description: "Tailwind gradient class for banner start color.",
      },
      {
        name: "bannerGradientVia",
        type: "string",
        default: '"via-purple-500"',
        description: "Tailwind gradient class for banner middle color.",
      },
      {
        name: "bannerGradientTo",
        type: "string",
        default: '"to-pink-500"',
        description: "Tailwind gradient class for banner end color.",
      },
      {
        name: "followButtonText",
        type: "string",
        default: '"Follow"',
        description: "Text displayed on the follow button.",
      },
      {
        name: "showFollowButton",
        type: "boolean",
        default: "true",
        description: "Whether to show the follow button.",
      },
      {
        name: "showMessageButton",
        type: "boolean",
        default: "true",
        description: "Whether to show the message button.",
      },
      {
        name: "showSimilarButton",
        type: "boolean",
        default: "true",
        description: "Whether to show the similar users button.",
      },
      {
        name: "messageButtonText",
        type: "string",
        default: '"Message"',
        description: "Text displayed on the message button.",
      },
      {
        name: "similarButtonText",
        type: "string",
        default: '"Similar"',
        description: "Text displayed on the similar button.",
      },
      {
        name: "onFollow",
        type: "() => void",
        description: "Callback function called when the follow button is clicked.",
      },
      {
        name: "onMessage",
        type: "() => void",
        description: "Callback function called when the message button is clicked.",
      },
      {
        name: "onSimilar",
        type: "() => void",
        description: "Callback function called when the similar button is clicked.",
      },
      {
        name: "onAvatarChange",
        type: "(url: string) => void",
        description: "Callback function called when avatar is uploaded (returns base64 data URL).",
      },
      {
        name: "backgroundColor",
        type: "string",
        description: "Background color of the card (supports hex or rgb).",
      },
      {
        name: "borderColor",
        type: "string",
        description: "Border color of the card (supports hex or rgb).",
      },
      {
        name: "borderRadius",
        type: "number",
        default: "24",
        description: "Border radius in pixels.",
      },
    ],
    variants: [
      {
        name: "Default",
        description: "The default social profile card with all features enabled.",
        code: `<SocialProfileCard />`,
      },
      {
        name: "Custom User",
        description: "Social profile card with custom user information.",
        code: `<SocialProfileCard 
  name="John Doe"
  username="@johndoe"
  bio="Full-stack developer passionate about creating amazing user experiences."
  location="New York, NY"
  followers={12500}
  following={342}
  projects={28}
/>`,
      },
      {
        name: "Minimal Actions",
        description: "Social profile card with only follow button.",
        code: `<SocialProfileCard 
  showMessageButton={false}
  showSimilarButton={false}
/>`,
      },
    ],
    examples: [
      {
        title: "Basic Usage",
        description: "A simple social profile card with default settings.",
        code: `import { SocialProfileCard } from "@/components/customize/SocialProfileCard"

export function BasicProfileCard() {
  return (
    <div className="max-w-sm">
      <SocialProfileCard />
    </div>
  )
}`,
      },
      {
        title: "With Custom User Info",
        description: "Social profile card with custom user information and stats.",
        code: `import { SocialProfileCard } from "@/components/customize/SocialProfileCard"

export function CustomUserCard() {
  return (
    <div className="max-w-sm">
      <SocialProfileCard 
        name="Alex Chen"
        username="@alexchen"
        bio="UI/UX Designer | Coffee Lover | Building beautiful interfaces"
        location="Tokyo, Japan"
        website="alexchen.design"
        twitter="@alexchen"
        followers={8500}
        following={1200}
        projects={45}
      />
    </div>
  )
}`,
      },
      {
        title: "With Event Handlers",
        description: "Social profile card with custom event handlers for user interactions.",
        code: `import { SocialProfileCard } from "@/components/customize/SocialProfileCard"
import { useState } from "react"

export function InteractiveCard() {
  const [isFollowing, setIsFollowing] = useState(false)

  return (
    <div className="max-w-sm">
      <SocialProfileCard 
        followButtonText={isFollowing ? "Following" : "Follow"}
        onFollow={() => {
          setIsFollowing(!isFollowing)
          console.log('Follow status:', !isFollowing)
        }}
        onMessage={() => {
          console.log('Open message dialog')
        }}
        onSimilar={() => {
          console.log('Show similar users')
        }}
      />
    </div>
  )
}`,
      },
      {
        title: "With Custom Colors",
        description: "Social profile card with custom banner gradient and styling.",
        code: `import { SocialProfileCard } from "@/components/customize/SocialProfileCard"

export function CustomColorCard() {
  return (
    <div className="max-w-sm">
      <SocialProfileCard 
        bannerGradientFrom="from-blue-500"
        bannerGradientVia="via-cyan-500"
        bannerGradientTo="to-teal-500"
        statusColor="bg-blue-500"
        backgroundColor="rgb(15 23 42 / 0.8)"
        borderColor="rgba(59, 130, 246, 0.3)"
        borderRadius={32}
      />
    </div>
  )
}`,
      },
      {
        title: "With Avatar Upload",
        description: "Social profile card with avatar upload functionality.",
        code: `import { SocialProfileCard } from "@/components/customize/SocialProfileCard"
import { useState } from "react"

export function UploadableAvatarCard() {
  const [avatarUrl, setAvatarUrl] = useState("https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1000&auto=format&fit=crop")

  return (
    <div className="max-w-sm">
      <SocialProfileCard 
        avatarUrl={avatarUrl}
        onAvatarChange={(url) => {
          setAvatarUrl(url)
          console.log('Avatar updated:', url)
        }}
      />
    </div>
  )
}`,
      },
    ],
  },
  "glass-auth-form": {
    name: "GlassAuthForm",
    description: "A beautiful glassmorphism authentication form component with floating label inputs, social login buttons, and customizable colors. Perfect for login pages, sign-up forms, or any authentication interface.",
    category: "Forms",
    hasPlayground: true,
    tags: ["auth", "form", "login", "signin", "glass", "floating", "input", "button", "social", "gradient", "backdrop"],
    installation: "Copy the component from the code example below.",
    usage: `import { GlassAuthForm } from "@/components/customize/glass-auth-form"

export function GlassAuthFormDemo() {
  return (
    <GlassAuthForm />
  )
}`,
    props: [
      {
        name: "className",
        type: "string",
        description: "Additional CSS classes to apply to the form container.",
      },
      {
        name: "title",
        type: "string",
        default: '"Welcome Back"',
        description: "The main title displayed at the top of the form.",
      },
      {
        name: "subtitle",
        type: "string",
        default: '"Enter your credentials to access the workspace."',
        description: "The subtitle text displayed below the title.",
      },
      {
        name: "emailLabel",
        type: "string",
        default: '"Email address"',
        description: "Label text for the email input field.",
      },
      {
        name: "passwordLabel",
        type: "string",
        default: '"Password"',
        description: "Label text for the password input field.",
      },
      {
        name: "rememberText",
        type: "string",
        default: '"Remember me"',
        description: "Text displayed next to the remember me checkbox.",
      },
      {
        name: "forgotPasswordText",
        type: "string",
        default: '"Forgot password?"',
        description: "Text for the forgot password link.",
      },
      {
        name: "signInText",
        type: "string",
        default: '"Sign In"',
        description: "Text displayed on the main sign in button.",
      },
      {
        name: "continueWithText",
        type: "string",
        default: '"Or continue with"',
        description: "Text displayed above the social login buttons.",
      },
      {
        name: "githubText",
        type: "string",
        default: '"GitHub"',
        description: "Text displayed on the GitHub login button.",
      },
      {
        name: "googleText",
        type: "string",
        default: '"Google"',
        description: "Text displayed on the Google login button.",
      },
      {
        name: "showRememberMe",
        type: "boolean",
        default: "true",
        description: "Whether to show the remember me checkbox.",
      },
      {
        name: "showForgotPassword",
        type: "boolean",
        default: "true",
        description: "Whether to show the forgot password link.",
      },
      {
        name: "showSocialButtons",
        type: "boolean",
        default: "true",
        description: "Whether to show the social login buttons section.",
      },
      {
        name: "showGithub",
        type: "boolean",
        default: "true",
        description: "Whether to show the GitHub login button.",
      },
      {
        name: "showGoogle",
        type: "boolean",
        default: "true",
        description: "Whether to show the Google login button.",
      },
      {
        name: "backgroundColor",
        type: "string",
        description: "Background color of the form container. Accepts hex color or RGB value.",
      },
      {
        name: "borderColor",
        type: "string",
        description: "Border color of the form container. Accepts hex color or RGB value.",
      },
      {
        name: "textColor",
        type: "string",
        description: "Text color for the title and main text. Accepts Tailwind text class or hex color.",
      },
      {
        name: "iconGradientFrom",
        type: "string",
        description: "Starting color for the icon gradient. Accepts hex color or RGB value.",
      },
      {
        name: "iconGradientTo",
        type: "string",
        description: "Ending color for the icon gradient. Accepts hex color or RGB value.",
      },
      {
        name: "orb1Color",
        type: "string",
        description: "Color of the first background orb. Accepts hex color or RGB value.",
      },
      {
        name: "orb2Color",
        type: "string",
        description: "Color of the second background orb. Accepts hex color or RGB value.",
      },
      {
        name: "buttonColor",
        type: "string",
        description: "Background color of the sign in button. Accepts hex color or RGB value.",
      },
      {
        name: "socialButtonBgColor",
        type: "string",
        description: "Background color of the social login buttons. Accepts hex color or RGB value.",
      },
      {
        name: "socialButtonBorderColor",
        type: "string",
        description: "Border color of the social login buttons. Accepts hex color or RGB value.",
      },
      {
        name: "inputLabelColor",
        type: "string",
        description: "Color of the input field labels. Accepts Tailwind text class or hex color.",
      },
      {
        name: "inputBgColor",
        type: "string",
        description: "Background color of the input fields. Accepts Tailwind bg class or hex color.",
      },
      {
        name: "inputBorderColor",
        type: "string",
        description: "Border color of the input fields. Accepts Tailwind border class or hex color.",
      },
      {
        name: "inputTextColor",
        type: "string",
        description: "Text color of the input fields. Accepts Tailwind text class or hex color.",
      },
      {
        name: "focusBorderColor",
        type: "string",
        description: "Border color when input fields are focused. Accepts Tailwind border class or hex color.",
      },
      {
        name: "cardGradientFrom",
        type: "string",
        description: "Starting color for the card gradient border effect. Accepts hex color or RGB value.",
      },
      {
        name: "cardGradientTo",
        type: "string",
        description: "Ending color for the card gradient border effect. Accepts hex color or RGB value.",
      },
      {
        name: "cardGradientWidth",
        type: "number",
        default: "2",
        description: "Width of the card gradient border in pixels.",
      },
      {
        name: "cardGradientAnimated",
        type: "boolean",
        default: "false",
        description: "Whether the card gradient should be animated.",
      },
      {
        name: "outerGradientFrom",
        type: "string",
        description: "Starting color for the outer gradient border effect. Accepts hex color or RGB value.",
      },
      {
        name: "outerGradientTo",
        type: "string",
        description: "Ending color for the outer gradient border effect. Accepts hex color or RGB value.",
      },
      {
        name: "outerGradientWidth",
        type: "number",
        default: "2",
        description: "Width of the outer gradient border in pixels.",
      },
      {
        name: "outerGradientAnimated",
        type: "boolean",
        default: "false",
        description: "Whether the outer gradient should be animated.",
      },
      {
        name: "borderRadius",
        type: "number",
        default: "24",
        description: "Border radius of the form container in pixels.",
      },
      {
        name: "padding",
        type: "number",
        default: "8",
        description: "Padding of the form container (multiplied by 4px).",
      },
      {
        name: "backdropBlur",
        type: "number",
        default: "12",
        description: "Backdrop blur amount in pixels for the glassmorphism effect.",
      },
    ],
    variants: [
      {
        name: "Default",
        description: "The default glassmorphism authentication form.",
        code: `<GlassAuthForm />`,
      },
      {
        name: "Custom Colors",
        description: "Authentication form with custom color scheme.",
        code: `<GlassAuthForm 
  backgroundColor="rgb(15 23 42 / 0.8)"
  iconGradientFrom="rgb(139 92 246)"
  iconGradientTo="rgb(236 72 153)"
  orb1Color="rgb(139 92 246 / 0.2)"
  orb2Color="rgb(236 72 153 / 0.2)"
/>`,
      },
    ],
    examples: [
      {
        title: "Basic Usage",
        description: "A simple authentication form with default settings.",
        code: `import { GlassAuthForm } from "@/components/customize/glass-auth-form"

export function BasicAuthForm() {
  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <GlassAuthForm />
    </div>
  )
}`,
      },
      {
        title: "Custom Text",
        description: "Authentication form with custom text content.",
        code: `import { GlassAuthForm } from "@/components/customize/glass-auth-form"

export function CustomTextAuthForm() {
  return (
    <GlassAuthForm 
      title="Sign In to Your Account"
      subtitle="Welcome back! Please enter your details."
      signInText="Log In"
      continueWithText="Or sign in with"
    />
  )
}`,
      },
      {
        title: "Minimal Form",
        description: "Authentication form without social buttons and remember me.",
        code: `import { GlassAuthForm } from "@/components/customize/glass-auth-form"

export function MinimalAuthForm() {
  return (
    <GlassAuthForm 
      showRememberMe={false}
      showForgotPassword={false}
      showSocialButtons={false}
    />
  )
}`,
      },
    ],
  },
}

heroSections.forEach((hero) => {
  componentDetails[hero.slug] = {
    name: hero.name,
    description: hero.description,
    category: "Sections",
    hasPlayground: true,
    installation: "Copy the hero component from the code example below.",
    usage: `import { ${hero.componentName} } from "@/components/customize/heroes"

export function ${hero.componentName}Demo() {
  return <${hero.componentName} />
}`,
    tags: hero.tags,
    props: Object.entries(hero.props).map(([propName, prop]) => ({
      name: propName,
      type: prop.docType ?? (prop.control === "boolean" ? "boolean" : "string"),
      default:
        typeof prop.default === "string"
          ? JSON.stringify(prop.default)
          : String(prop.default),
      description: prop.description,
    })),
  }
})

featureSections.forEach((feature) => {
  componentDetails[feature.slug] = {
    name: feature.name,
    description: feature.description,
    category: "Sections",
    hasPlayground: true,
    installation: "Copy the feature component from the code example below.",
    usage: `import { ${feature.componentName} } from "@/components/customize/features"

export function ${feature.componentName}Demo() {
  return <${feature.componentName} />
}`,
    tags: feature.tags,
    props: Object.entries(feature.props).map(([propName, prop]) => ({
      name: propName,
      type: prop.docType ?? (prop.control === "boolean" ? "boolean" : prop.control === "slider" ? "number" : "string"),
      default:
        typeof prop.default === "string"
          ? JSON.stringify(prop.default)
          : String(prop.default),
      description: prop.description,
    })),
  }
})

paymentSections.forEach((payment) => {
  componentDetails[payment.slug] = {
    name: payment.name,
    description: payment.description,
    category: "Sections",
    hasPlayground: true,
    installation: "Copy the payment component from the code example below.",
    usage: `import { ${payment.componentName} } from "@/components/customize/payments"

export function ${payment.componentName}Demo() {
  return <${payment.componentName} />
}`,
    tags: payment.tags,
    props: Object.entries(payment.props).map(([propName, prop]) => ({
      name: propName,
      type: prop.docType ?? (prop.control === "boolean" ? "boolean" : prop.control === "slider" ? "number" : "string"),
      default:
        typeof prop.default === "string"
          ? JSON.stringify(prop.default)
          : String(prop.default),
      description: prop.description,
    })),
  }
})

ctaSections.forEach((cta) => {
  componentDetails[cta.slug] = {
    name: cta.name,
    description: cta.description,
    category: "Sections",
    hasPlayground: true,
    installation: "Copy the CTA component from the code example below.",
    usage: `import { ${cta.componentName} } from "@/components/customize/ctas"

export function ${cta.componentName}Demo() {
  return <${cta.componentName} />
}`,
    tags: cta.tags,
    props: Object.entries(cta.props).map(([propName, prop]) => ({
      name: propName,
      type: prop.docType ?? (prop.control === "boolean" ? "boolean" : prop.control === "slider" ? "number" : "string"),
      default:
        typeof prop.default === "string"
          ? JSON.stringify(prop.default)
          : String(prop.default),
      description: prop.description,
    })),
  }
})

footerSections.forEach((footer) => {
  componentDetails[footer.slug] = {
    name: footer.name,
    description: footer.description,
    category: "Sections",
    hasPlayground: true,
    installation: "Copy the footer component from the code example below.",
    usage: `import { ${footer.componentName} } from "@/components/customize/footers"

export function ${footer.componentName}Demo() {
  return <${footer.componentName} />
}`,
    tags: footer.tags,
    props: Object.entries(footer.props).map(([propName, prop]) => ({
      name: propName,
      type: prop.docType ?? (prop.control === "boolean" ? "boolean" : prop.control === "slider" ? "number" : "string"),
      default:
        typeof prop.default === "string"
          ? JSON.stringify(prop.default)
          : String(prop.default),
      description: prop.description,
    })),
  }
})
