"use client"

import * as React from "react"
import { Copy, Check } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Skeleton } from "@/components/ui/skeleton"
import { Textarea } from "@/components/ui/textarea"
import { Toggle } from "@/components/ui/toggle"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { AlertCircle, Terminal } from 'lucide-react'

interface PlaygroundProps {
  componentName: string
  slug: string
}

const componentConfigs: Record<string, any> = {
  Button: {
    props: {
      variant: { type: "select", options: ["default", "destructive", "outline", "secondary", "ghost", "link"], default: "default" },
      size: { type: "select", options: ["default", "sm", "lg", "icon"], default: "default" },
      disabled: { type: "boolean", default: false },
      children: { type: "text", default: "Click me" },
      borderRadius: { type: "slider", min: 0, max: 24, default: 6 },
      borderWidth: { type: "slider", min: 0, max: 4, default: 0 },
    },
    render: (props: any) => {
      const { borderRadius, borderWidth, ...domProps } = props
      const style: React.CSSProperties = {
        borderRadius: `${borderRadius}px`,
        fontSize: '1.5rem',
      }
      if (borderWidth > 0) {
        style.borderWidth = `${borderWidth}px`
        style.borderStyle = 'solid'
        style.borderColor = 'hsl(var(--border))'
      }
      return (
        <Button
          {...domProps}
          className="scale-150"
          style={style}
        >
          {props.children}
        </Button>
      )
    },
  },
  Badge: {
    props: {
      variant: { type: "select", options: ["default", "secondary", "destructive", "outline"], default: "default" },
      children: { type: "text", default: "Badge" },
      borderRadius: { type: "slider", min: 0, max: 24, default: 12 },
      borderWidth: { type: "slider", min: 0, max: 4, default: 0 },
    },
    render: (props: any) => {
      const { borderRadius, borderWidth, ...domProps } = props
      const style: React.CSSProperties = {
        borderRadius: `${borderRadius}px`,
        fontSize: '1.25rem',
      }
      if (borderWidth > 0) {
        style.borderWidth = `${borderWidth}px`
        style.borderStyle = 'solid'
        style.borderColor = 'hsl(var(--border))'
      }
      return (
        <Badge
          {...domProps}
          className="scale-150 inline-block"
          style={style}
        >
          {props.children}
        </Badge>
      )
    },
  },
  Checkbox: {
    props: {
      disabled: { type: "boolean", default: false },
      defaultChecked: { type: "boolean", default: false },
    },
    render: (props: any) => (
      <div className="flex items-center space-x-4">
        <Checkbox {...props} id="terms" className="h-8 w-8" />
        <label htmlFor="terms" className="text-xl font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
          Accept terms and conditions
        </label>
      </div>
    ),
  },
  Progress: {
    props: {
      value: { type: "slider", min: 0, max: 100, default: 50 },
    },
    render: (props: any) => <Progress {...props} className="w-[80%] h-6" />,
  },
  Switch: {
    props: {
      disabled: { type: "boolean", default: false },
      defaultChecked: { type: "boolean", default: false },
    },
    render: (props: any) => (
      <div className="flex items-center space-x-4">
        <Switch {...props} id="airplane-mode" className="scale-150" />
        <Label htmlFor="airplane-mode" className="text-xl">Airplane Mode</Label>
      </div>
    ),
  },
  Accordion: {
    props: {
      type: { type: "select", options: ["single", "multiple"], default: "single" },
      collapsible: { type: "boolean", default: true },
    },
    render: (props: any) => (
      <Accordion
        type={props.type}
        collapsible={props.type === "single" ? props.collapsible : undefined}
        className="w-full"
      >
        <AccordionItem value="item-1">
          <AccordionTrigger className="text-xl py-6">Is it accessible?</AccordionTrigger>
          <AccordionContent className="text-lg pb-6">Yes. It adheres to the WAI-ARIA design pattern.</AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger className="text-xl py-6">Is it styled?</AccordionTrigger>
          <AccordionContent className="text-lg pb-6">Yes. It comes with default styles that you can override.</AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger className="text-xl py-6">Is it animated?</AccordionTrigger>
          <AccordionContent className="text-lg pb-6">Yes. It's animated by default, but you can disable it if you prefer.</AccordionContent>
        </AccordionItem>
      </Accordion>
    ),
  },
  Input: {
    props: {
      type: { type: "select", options: ["text", "email", "password", "number", "search", "tel", "url"], default: "text" },
      placeholder: { type: "text", default: "Enter text..." },
      disabled: { type: "boolean", default: false },
      borderRadius: { type: "slider", min: 0, max: 24, default: 6 },
      borderWidth: { type: "slider", min: 1, max: 4, default: 1 },
    },
    render: (props: any) => {
      const { borderRadius, borderWidth, ...domProps } = props
      const style: React.CSSProperties = {
        borderRadius: `${borderRadius}px`,
        borderWidth: `${borderWidth}px`,
      }
      return (
        <Input
          {...domProps}
          className="max-w-2xl text-xl h-16 px-6"
          style={style}
        />
      )
    },
  },
  Card: {
    props: {
      title: { type: "text", default: "Card Title" },
      description: { type: "text", default: "Card description goes here." },
      showFooter: { type: "boolean", default: true },
      borderRadius: { type: "slider", min: 0, max: 32, default: 8 },
      borderWidth: { type: "slider", min: 0, max: 4, default: 1 },
    },
    render: (props: any) => {
      const { borderRadius, borderWidth, title, description, showFooter, ...domProps } = props
      const style: React.CSSProperties = {
        borderRadius: `${borderRadius}px`,
        borderWidth: `${borderWidth}px`,
      }
      return (
        <Card className="w-[700px]" style={style} {...domProps}>
          <div className="p-12">
            <h3 className="text-4xl font-semibold leading-none tracking-tight">{title}</h3>
            <p className="text-lg text-muted-foreground mt-4">{description}</p>
          </div>
          {showFooter && (
            <div className="flex items-center p-12 pt-0">
              <Button className="w-full text-xl h-14">Action</Button>
            </div>
          )}
        </Card>
      )
    },
  },
  Alert: {
    props: {
      variant: { type: "select", options: ["default", "destructive"], default: "default" },
      title: { type: "text", default: "Heads up!" },
      description: { type: "text", default: "You can add components to your app using the cli." },
      borderRadius: { type: "slider", min: 0, max: 24, default: 8 },
      borderWidth: { type: "slider", min: 0, max: 4, default: 1 },
    },
    render: (props: any) => {
      const { borderRadius, borderWidth, title, description, variant, ...domProps } = props
      const style: React.CSSProperties = {
        borderRadius: `${borderRadius}px`,
        borderWidth: `${borderWidth}px`,
      }
      return (
        <Alert variant={variant} className="max-w-3xl p-8" style={style} {...domProps}>
          <AlertCircle className="h-8 w-8" />
          <AlertTitle className="text-2xl">{title}</AlertTitle>
          <AlertDescription className="text-lg mt-2">{description}</AlertDescription>
        </Alert>
      )
    },
  },
  Avatar: {
    props: {
      size: { type: "select", options: ["sm", "md", "lg"], default: "md" },
      fallback: { type: "text", default: "CN" },
      showImage: { type: "boolean", default: true },
    },
    render: (props: any) => {
      const sizeClasses = {
        sm: "h-16 w-16 text-xl",
        md: "h-24 w-24 text-2xl",
        lg: "h-32 w-32 text-3xl",
      }
      return (
        <Avatar className={sizeClasses[props.size as keyof typeof sizeClasses]}>
          {props.showImage && <AvatarImage src="https://github.com/shadcn.png" alt="Avatar" />}
          <AvatarFallback className="text-2xl">{props.fallback}</AvatarFallback>
        </Avatar>
      )
    },
  },
  Dialog: {
    props: {
      title: { type: "text", default: "Are you absolutely sure?" },
      description: { type: "text", default: "This action cannot be undone." },
    },
    render: (props: any) => (
      <Dialog>
        <DialogTrigger asChild>
          <Button className="text-xl px-8 py-6 h-auto">Open Dialog</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-3xl p-10">
          <DialogHeader>
            <DialogTitle className="text-3xl">{props.title}</DialogTitle>
            <DialogDescription className="text-lg mt-4">{props.description}</DialogDescription>
          </DialogHeader>
          <DialogFooter className="mt-8 gap-4">
            <Button variant="outline" className="text-lg px-6 py-5 h-auto">Cancel</Button>
            <Button className="text-lg px-6 py-5 h-auto">Continue</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    ),
  },
  "Dropdown Menu": {
    props: {
      triggerText: { type: "text", default: "Open Menu" },
      itemCount: { type: "slider", min: 1, max: 10, default: 4 },
    },
    render: (props: any) => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="text-xl px-8 py-6 h-auto">{props.triggerText}</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-80">
          {Array.from({ length: props.itemCount }).map((_, i) => (
            <DropdownMenuItem key={i} className="text-lg py-4 px-4">Item {i + 1}</DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  },
  Label: {
    props: {
      text: { type: "text", default: "Your email" },
      required: { type: "boolean", default: false },
    },
    render: (props: any) => (
      <div className="space-y-4">
        <Label htmlFor="email" className="text-xl">
          {props.text}
          {props.required && <span className="text-destructive ml-1">*</span>}
        </Label>
        <Input id="email" type="email" placeholder="m@example.com" className="text-xl h-16 px-6" />
      </div>
    ),
  },
  Select: {
    props: {
      placeholder: { type: "text", default: "Select an option" },
      disabled: { type: "boolean", default: false },
      borderRadius: { type: "slider", min: 0, max: 24, default: 6 },
    },
    render: (props: any) => {
      const { borderRadius, ...domProps } = props
      const style: React.CSSProperties = {
        borderRadius: `${borderRadius}px`,
      }
      return (
        <Select disabled={domProps.disabled}>
          <SelectTrigger className="w-[560px] text-xl h-16 px-6" style={style}>
            <SelectValue placeholder={domProps.placeholder} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="apple" className="text-xl py-4">Apple</SelectItem>
            <SelectItem value="banana" className="text-xl py-4">Banana</SelectItem>
            <SelectItem value="orange" className="text-xl py-4">Orange</SelectItem>
            <SelectItem value="grape" className="text-xl py-4">Grape</SelectItem>
          </SelectContent>
        </Select>
      )
    },
  },
  Separator: {
    props: {
      orientation: { type: "select", options: ["horizontal", "vertical"], default: "horizontal" },
    },
    render: (props: any) => (
      <div className={props.orientation === "horizontal" ? "w-full space-y-8" : "flex h-40 space-x-8"}>
        <div className={props.orientation === "horizontal" ? "space-y-2" : "space-y-2"}>
          <h4 className="text-xl font-medium leading-none">Radix Primitives</h4>
          <p className="text-lg text-muted-foreground">An open-source UI component library.</p>
        </div>
        <Separator orientation={props.orientation} className={props.orientation === "horizontal" ? "h-[2px]" : "w-[2px]"} />
        <div className={props.orientation === "horizontal" ? "space-y-2" : "space-y-2"}>
          <h4 className="text-xl font-medium leading-none">Shadcn UI</h4>
          <p className="text-lg text-muted-foreground">Beautifully designed components.</p>
        </div>
      </div>
    ),
  },
  Skeleton: {
    props: {
      count: { type: "slider", min: 1, max: 5, default: 3 },
      height: { type: "slider", min: 20, max: 200, default: 40 },
    },
    render: (props: any) => (
      <div className="space-y-6 w-full max-w-3xl">
        {Array.from({ length: props.count }).map((_, i) => (
          <Skeleton key={i} style={{ height: `${props.height * 2}px` }} className="w-full" />
        ))}
      </div>
    ),
  },
  Tabs: {
    props: {
      defaultValue: { type: "select", options: ["tab1", "tab2", "tab3"], default: "tab1" },
      tabCount: { type: "slider", min: 2, max: 5, default: 3 },
    },
    render: (props: any) => (
      <Tabs defaultValue={props.defaultValue} className="w-[800px]">
        <TabsList className="grid w-full h-16" style={{ gridTemplateColumns: `repeat(${props.tabCount}, 1fr)` }}>
          {Array.from({ length: props.tabCount }).map((_, i) => (
            <TabsTrigger key={i} value={`tab${i + 1}`} className="text-xl">Tab {i + 1}</TabsTrigger>
          ))}
        </TabsList>
        {Array.from({ length: props.tabCount }).map((_, i) => (
          <TabsContent key={i} value={`tab${i + 1}`} className="space-y-4 p-6">
            <h3 className="text-2xl font-medium">Content for Tab {i + 1}</h3>
            <p className="text-lg text-muted-foreground">
              This is the content area for tab {i + 1}. You can add any content here.
            </p>
          </TabsContent>
        ))}
      </Tabs>
    ),
  },
  Textarea: {
    props: {
      placeholder: { type: "text", default: "Type your message here." },
      rows: { type: "slider", min: 2, max: 10, default: 4 },
      disabled: { type: "boolean", default: false },
      borderRadius: { type: "slider", min: 0, max: 24, default: 6 },
      borderWidth: { type: "slider", min: 1, max: 4, default: 1 },
    },
    render: (props: any) => {
      const { borderRadius, borderWidth, ...domProps } = props
      const style: React.CSSProperties = {
        borderRadius: `${borderRadius}px`,
        borderWidth: `${borderWidth}px`,
      }
      return (
        <Textarea
          {...domProps}
          className="max-w-3xl text-xl p-6"
          style={style}
        />
      )
    },
  },
  Toast: {
    props: {
      title: { type: "text", default: "Scheduled: Catch up" },
      description: { type: "text", default: "Friday, February 10, 2023 at 5:57 PM" },
    },
    render: (props: any) => (
      <div className="max-w-2xl">
        <Alert className="p-8">
          <Terminal className="h-8 w-8" />
          <AlertTitle className="text-2xl">{props.title}</AlertTitle>
          <AlertDescription className="text-lg mt-2">{props.description}</AlertDescription>
        </Alert>
        <p className="text-base text-muted-foreground mt-4">
          Note: This is a preview. Actual toast will appear as a notification.
        </p>
      </div>
    ),
  },
  Toggle: {
    props: {
      variant: { type: "select", options: ["default", "outline"], default: "default" },
      size: { type: "select", options: ["default", "sm", "lg"], default: "default" },
      disabled: { type: "boolean", default: false },
    },
    render: (props: any) => (
      <Toggle {...props} aria-label="Toggle italic" className="h-16 w-16">
        <span className="font-bold text-3xl">B</span>
      </Toggle>
    ),
  },
  Tooltip: {
    props: {
      text: { type: "text", default: "Add to library" },
      side: { type: "select", options: ["top", "bottom", "left", "right"], default: "top" },
    },
    render: (props: any) => (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="outline" className="text-xl px-8 py-6 h-auto">Hover me</Button>
          </TooltipTrigger>
          <TooltipContent side={props.side} className="text-lg p-4">
            <p>{props.text}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    ),
  },
}

export function ComponentPlayground({ componentName, slug }: PlaygroundProps) {
  const config = componentConfigs[componentName]
  const [copied, setCopied] = React.useState(false)

  const [props, setProps] = React.useState<Record<string, any>>(() => {
    if (!config) return {}
    const initialProps: Record<string, any> = {}
    Object.entries(config.props).forEach(([key, propConfig]: [string, any]) => {
      initialProps[key] = propConfig.default
    })
    return initialProps
  })

  const updateProp = (key: string, value: any) => {
    setProps((prev) => ({ ...prev, [key]: value }))
  }

  const generateCode = () => {
    if (!config) return ""

    const propsString = Object.entries(props)
      .filter(([key, value]) => {
        const propConfig = config.props[key]
        return value !== propConfig.default && value !== undefined && value !== ""
      })
      .map(([key, value]) => {
        if (typeof value === "boolean") {
          return value ? key : ""
        }
        if (typeof value === "string") {
          return `${key}="${value}"`
        }
        return `${key}={${JSON.stringify(value)}}`
      })
      .filter(Boolean)
      .join(" ")

    const children = props.children || ""

    if (componentName === "Accordion") {
      return `<Accordion${propsString ? " " + propsString : ""}>\n  <AccordionItem value="item-1">\n    <AccordionTrigger className="text-xl py-6">Is it accessible?</AccordionTrigger>\n    <AccordionContent className="text-lg pb-6">\n      Yes. It adheres to the WAI-ARIA design pattern.\n    </AccordionContent>\n  </AccordionItem>\n  <AccordionItem value="item-2">\n    <AccordionTrigger className="text-xl py-6">Is it styled?</AccordionTrigger>\n    <AccordionContent className="text-lg pb-6">\n      Yes. It comes with default styles that you can override.\n    </AccordionContent>\n  </AccordionItem>\n  <AccordionItem value="item-3">\n    <AccordionTrigger className="text-xl py-6">Is it animated?</AccordionTrigger>\n    <AccordionContent className="text-lg pb-6">\n      Yes. It's animated by default, but you can disable it if you prefer.\n    </AccordionContent>\n  </AccordionItem>\n</Accordion>`
    }

    if (componentName === "Dialog") {
      return `<Dialog>\n  <DialogTrigger asChild>\n    <Button className="text-xl px-8 py-6 h-auto">Open Dialog</Button>\n  </DialogTrigger>\n  <DialogContent className="sm:max-w-3xl p-10">\n    <DialogHeader>\n      <DialogTitle className="text-3xl">${props.title}</DialogTitle>\n      <DialogDescription className="text-lg mt-4">${props.description}</DialogDescription>\n    </DialogHeader>\n    <DialogFooter className="mt-8 gap-4">\n      <Button variant="outline" className="text-lg px-6 py-5 h-auto">Cancel</Button>\n      <Button className="text-lg px-6 py-5 h-auto">Continue</Button>\n    </DialogFooter>\n  </DialogContent>\n</Dialog>`
    }

    if (componentName === "Dropdown Menu") {
      return `<DropdownMenu>\n  <DropdownMenuTrigger asChild>\n    <Button variant="outline" className="text-xl px-8 py-6 h-auto">${props.triggerText}</Button>\n  </DropdownMenuTrigger>\n  <DropdownMenuContent className="w-80">\n    ${Array.from({ length: props.itemCount }).map((_, i) => `<DropdownMenuItem key={${i}} className="text-lg py-4 px-4">Item ${i + 1}</DropdownMenuItem>\n`).join("")}\n  </DropdownMenuContent>\n</DropdownMenu>`
    }

    if (componentName === "Label") {
      return `<div className="space-y-4">\n  <Label htmlFor="email" className="text-xl">\n    ${props.text}\n    ${props.required ? '<span className="text-destructive ml-1">*</span>' : ''}\n  </Label>\n  <Input id="email" type="email" placeholder="m@example.com" className="text-xl h-16 px-6" />\n</div>`
    }

    if (componentName === "Select") {
      return `<Select disabled={${props.disabled}}>\n  <SelectTrigger className="w-[560px] text-xl h-16 px-6" style={{ borderRadius: "${props.borderRadius}px" }}>\n    <SelectValue placeholder="${props.placeholder}" />\n  </SelectTrigger>\n  <SelectContent>\n    <SelectItem value="apple" className="text-xl py-4">Apple</SelectItem>\n    <SelectItem value="banana" className="text-xl py-4">Banana</SelectItem>\n    <SelectItem value="orange" className="text-xl py-4">Orange</SelectItem>\n    <SelectItem value="grape" className="text-xl py-4">Grape</SelectItem>\n  </SelectContent>\n</Select>`
    }

    if (componentName === "Separator") {
      return `<div className="${props.orientation === "horizontal" ? "w-full space-y-8" : "flex h-40 space-x-8"}">\n  <div className="${props.orientation === "horizontal" ? "space-y-2" : "space-y-2"}">\n    <h4 className="text-xl font-medium leading-none">Radix Primitives</h4>\n    <p className="text-lg text-muted-foreground">An open-source UI component library.</p>\n  </div>\n  <Separator orientation="${props.orientation}" className="${props.orientation === "horizontal" ? "h-[2px]" : "w-[2px]"}" />\n  <div className="${props.orientation === "horizontal" ? "space-y-2" : "space-y-2"}">\n    <h4 className="text-xl font-medium leading-none">Shadcn UI</h4>\n    <p className="text-lg text-muted-foreground">Beautifully designed components.</p>\n  </div>\n</div>`
    }

    if (componentName === "Skeleton") {
      return `<div className="space-y-6 w-full max-w-3xl">\n  ${Array.from({ length: props.count }).map((_, i) => `<Skeleton key={${i}} style={{ height: "${props.height * 2}px" }} className="w-full" />\n`).join("")}\n</div>`
    }

    if (componentName === "Tabs") {
      return `<Tabs defaultValue="${props.defaultValue}" className="w-[800px]">\n  <TabsList className="grid w-full h-16" style={{ gridTemplateColumns: \`repeat(${props.tabCount}, 1fr)\` }}>\n    ${Array.from({ length: props.tabCount }).map((_, i) => `<TabsTrigger key={${i}} value="tab${i + 1}" className="text-xl">Tab ${i + 1}</TabsTrigger>\n`).join("")}\n  </TabsList>\n  ${Array.from({ length: props.tabCount }).map((_, i) => `<TabsContent key={${i}} value="tab${i + 1}" className="space-y-4 p-6">\n    <h3 className="text-2xl font-medium">Content for Tab ${i + 1}</h3>\n    <p className="text-lg text-muted-foreground">\n      This is the content area for tab ${i + 1}. You can add any content here.\n    </p>\n  </TabsContent>\n`).join("")}\n</Tabs>`
    }

    if (componentName === "Textarea") {
      return `<Textarea placeholder="${props.placeholder}" rows={${props.rows}} disabled={${props.disabled}} className="max-w-3xl text-xl p-6" style={{ borderRadius: "${props.borderRadius}px", borderWidth: "${props.borderWidth}px" }} />`
    }

    if (componentName === "Toast") {
      return `<div className="max-w-2xl">\n  <Alert className="p-8">\n    <Terminal className="h-8 w-8" />\n    <AlertTitle className="text-2xl">${props.title}</AlertTitle>\n    <AlertDescription className="text-lg mt-2">${props.description}</AlertDescription>\n  </Alert>\n  <p className="text-base text-muted-foreground mt-4">\n    Note: This is a preview. Actual toast will appear as a notification.\n  </p>\n</div>`
    }

    if (componentName === "Toggle") {
      return `<Toggle variant="${props.variant}" size="${props.size}" disabled={${props.disabled}} aria-label="Toggle italic" className="h-16 w-16">\n  <span className="font-bold text-3xl">B</span>\n</Toggle>`
    }

    if (componentName === "Tooltip") {
      return `<TooltipProvider>\n  <Tooltip>\n    <TooltipTrigger asChild>\n      <Button variant="outline" className="text-xl px-8 py-6 h-auto">Hover me</Button>\n    </TooltipTrigger>\n    <TooltipContent side="${props.side}" className="text-lg p-4">\n      <p>${props.text}</p>\n    </TooltipContent>\n  </Tooltip>\n</TooltipProvider>`
    }

    if (children) {
      return `<${componentName}${propsString ? " " + propsString : ""}>${children}</${componentName}>`
    }

    return `<${componentName}${propsString ? " " + propsString : ""} />`
  }

  const handleCopy = async () => {
    await navigator.clipboard.writeText(generateCode())
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  if (!config) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        Playground not available for this component yet.
      </div>
    )
  }

  return (
    <div className="grid lg:grid-cols-[1fr_320px] gap-6">
      <div className="space-y-6">
        {/* 實時預覽 */}
        <Card className="p-12 min-h-[400px] flex items-center justify-center bg-gradient-to-br from-background to-muted/20">
          {config.render(props)}
        </Card>

        {/* 代碼顯示 */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">Code</h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleCopy}
              className="gap-2"
            >
              {copied ? (
                <>
                  <Check className="h-4 w-4" />
                  Copied
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4" />
                  Copy
                </>
              )}
            </Button>
          </div>
          <pre className="bg-muted p-4 rounded-lg overflow-x-auto overflow-y-auto text-sm max-h-[400px] scrollbar-thin scrollbar-thumb-border scrollbar-track-transparent hover:scrollbar-thumb-muted-foreground transition-colors">
            <code>{generateCode()}</code>
          </pre>
        </Card>

        <Card className="p-6">
          <h3 className="font-semibold mb-4">Properties</h3>
          <div className="border rounded-lg overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-muted">
                <tr>
                  <th className="text-left p-3 font-medium">Name</th>
                  <th className="text-left p-3 font-medium">Type</th>
                  <th className="text-left p-3 font-medium">Default</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(config.props).map(([key, propConfig]: [string, any]) => (
                  <tr key={key} className="border-t">
                    <td className="p-3 font-mono text-xs">{key}</td>
                    <td className="p-3">
                      <Badge variant="secondary">{propConfig.type === "slider" ? "number" : propConfig.type}</Badge>
                    </td>
                    <td className="p-3 font-mono text-xs text-muted-foreground">
                      {String(propConfig.default)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>

      <div className="space-y-6">
        <Card className="p-6">
          <h3 className="font-semibold mb-4">Customize</h3>
          <div className="space-y-4">
            {Object.entries(config.props).map(([key, propConfig]: [string, any]) => (
              <div key={key} className="space-y-2">
                <Label className="capitalize">{key}</Label>

                {propConfig.type === "select" && (
                  <Select value={props[key]} onValueChange={(value) => updateProp(key, value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {propConfig.options.map((option: string) => (
                        <SelectItem key={option} value={option}>
                          {option}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}

                {propConfig.type === "boolean" && (
                  <div className="flex items-center space-x-2">
                    <Switch
                      checked={props[key]}
                      onCheckedChange={(checked) => updateProp(key, checked)}
                    />
                    <span className="text-sm text-muted-foreground">
                      {props[key] ? "Enabled" : "Disabled"}
                    </span>
                  </div>
                )}

                {propConfig.type === "text" && (
                  <Input
                    value={props[key]}
                    onChange={(e) => updateProp(key, e.target.value)}
                    placeholder={propConfig.default}
                  />
                )}

                {propConfig.type === "slider" && (
                  <div className="space-y-2">
                    <Slider
                      value={[props[key]]}
                      onValueChange={([value]) => updateProp(key, value)}
                      min={propConfig.min}
                      max={propConfig.max}
                      step={1}
                    />
                    <div className="text-xs text-muted-foreground text-right">
                      {props[key]}
                    </div>
                  </div>
                )}

                {key !== Object.keys(config.props)[Object.keys(config.props).length - 1] && (
                  <Separator className="!mt-4" />
                )}
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  )
}
