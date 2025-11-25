export interface ComponentDetail {
  name: string
  description: string
  category: string
  hasPlayground: boolean
  installation: string
  usage: string
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
    installation: "Copy the component from the code example below.",
    usage: `import { UrlInput } from "@/components/ui/url-input"

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
        code: `import { UrlInput } from "@/components/ui/url-input"
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
        code: `import { UrlInput } from "@/components/ui/url-input"
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
}
