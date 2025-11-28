"use client"

import * as React from "react"
import { Copy, Check, Settings2 } from 'lucide-react'
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
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
import { UrlInput } from "@/components/customize/url-input"
import { MediaPlayer } from "@/components/customize/media-player"
import { ChatInterface } from "@/components/customize/chat-interface"
import { SocialProfileCard } from "@/components/customize/SocialProfileCard"
import { GlassAuthForm } from "@/components/customize/glass-auth-form"
import { heroSections } from "@/lib/hero-sections"
import { heroComponentsByName } from "@/components/customize/heroes"
import { featureSections } from "@/lib/feature-sections"
import { featureComponentsByName } from "@/components/customize/features"
import { paymentSections } from "@/lib/payment-sections"
import { paymentComponentsByName } from "@/components/customize/payments"
import { ctaSections } from "@/lib/cta-sections"
import { ctaComponentsByName } from "@/components/customize/ctas"
import { headerSections } from "@/lib/header-sections"
import { headerComponentsByName } from "@/components/customize/headers"
import { footerSections } from "@/lib/footer-sections"
import { footerComponentsByName } from "@/components/customize/footers"
import { buttonSections } from "@/lib/button-sections"
import { buttonComponentsByName } from "@/components/customize/buttons"
import { cardSections } from "@/lib/card-sections"
import { cardComponentsByName } from "@/components/customize/cards"
import { badgeSections } from "@/lib/badge-sections"
import { badgeComponentsByName } from "@/components/customize/badges"
import { inputSections } from "@/lib/input-sections"
import { inputComponentsByName } from "@/components/customize/inputs"
import { dialogSections } from "@/lib/dialog-sections"
import { dialogComponentsByName } from "@/components/customize/dialogs"
import { toggleSections } from "@/lib/toggle-sections"
import { toggleComponentsByName } from "@/components/customize/toggles"
import { tabsSections } from "@/lib/tabs-sections"
import { tabsComponentsByName } from "@/components/customize/tabs"
import { sidebarSections } from "@/lib/sidebar-sections"
import { sidebarComponentsByName } from "@/components/customize/sidebars"
import { tabbarSections } from "@/lib/tabbar-sections"
import { sheetSections } from "@/lib/sheet-sections"
import { sheetComponentsByName } from "@/components/customize/sheets"
import { tabbarComponentsByName } from "@/components/customize/tabbars"
import { tableSections } from "@/lib/table-sections"
import { tableComponentsByName } from "@/components/customize/tables"
import { chartSections } from "@/lib/chart-sections"
import { chartComponentsByName } from "@/components/customize/charts"
import { ThreeDCard } from "@/components/three-d-card"
import { AlertCircle, Terminal } from 'lucide-react'
import { componentDetails } from "@/lib/component-details"
import { CodeBlock } from "@/components/code-block"
import { ColorPicker } from "@/components/ui/color-picker"
import { CustomizePanel } from "@/components/component-playground-customize-panel"

const heroNameToMeta = heroSections.reduce<Record<string, (typeof heroSections)[number]>>((acc, hero) => {
  acc[hero.name] = hero
  return acc
}, {})

const featureNameToMeta = featureSections.reduce<Record<string, (typeof featureSections)[number]>>((acc, feature) => {
  acc[feature.name] = feature
  return acc
}, {})

const paymentNameToMeta = paymentSections.reduce<Record<string, (typeof paymentSections)[number]>>((acc, payment) => {
  acc[payment.name] = payment
  return acc
}, {})

const ctaNameToMeta = ctaSections.reduce<Record<string, (typeof ctaSections)[number]>>((acc, cta) => {
  acc[cta.name] = cta
  return acc
}, {})

const footerNameToMeta = footerSections.reduce<Record<string, (typeof footerSections)[number]>>((acc, footer) => {
  acc[footer.name] = footer
  return acc
}, {})

const headerNameToMeta = headerSections.reduce<Record<string, (typeof headerSections)[number]>>((acc, header) => {
  acc[header.name] = header
  return acc
}, {})

const badgeNameToMeta = badgeSections.reduce<Record<string, (typeof badgeSections)[number]>>((acc, badge) => {
  acc[badge.name] = badge
  return acc
}, {})

const cardNameToMeta = cardSections.reduce<Record<string, (typeof cardSections)[number]>>((acc, card) => {
  acc[card.name] = card
  return acc
}, {})

const buttonNameToMeta = buttonSections.reduce<Record<string, (typeof buttonSections)[number]>>((acc, button) => {
  acc[button.name] = button
  return acc
}, {})

const inputNameToMeta = inputSections.reduce<Record<string, (typeof inputSections)[number]>>((acc, input) => {
  acc[input.name] = input
  return acc
}, {})

const dialogNameToMeta = dialogSections.reduce<Record<string, (typeof dialogSections)[number]>>((acc, dialog) => {
  acc[dialog.name] = dialog
  return acc
}, {})

const toggleNameToMeta = toggleSections.reduce<Record<string, (typeof toggleSections)[number]>>((acc, toggle) => {
  acc[toggle.name] = toggle
  return acc
}, {})

const tabsNameToMeta = tabsSections.reduce<Record<string, (typeof tabsSections)[number]>>((acc, tab) => {
  acc[tab.name] = tab
  return acc
}, {})

const sidebarNameToMeta = sidebarSections.reduce<Record<string, (typeof sidebarSections)[number]>>((acc, sidebar) => {
  acc[sidebar.name] = sidebar
  return acc
}, {})

const tabbarNameToMeta = tabbarSections.reduce<Record<string, (typeof tabbarSections)[number]>>((acc, tabbar) => {
  acc[tabbar.name] = tabbar
  return acc
}, {})

const sheetNameToMeta = sheetSections.reduce<Record<string, (typeof sheetSections)[number]>>((acc, sheet) => {
  acc[sheet.name] = sheet
  return acc
}, {})

const tableNameToMeta = tableSections.reduce<Record<string, (typeof tableSections)[number]>>((acc, table) => {
  acc[table.name] = table
  return acc
}, {})

const chartNameToMeta = chartSections.reduce<Record<string, (typeof chartSections)[number]>>((acc, chart) => {
  acc[chart.name] = chart
  return acc
}, {})

const componentConfigs: Record<string, any> = (() => {
  const configs: Record<string, any> = {
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
    UrlInput: {
      props: {
        enableHoverTilt: { type: "boolean", default: true },
        isLoading: { type: "boolean", default: false },
        borderRadius: { type: "slider", min: 0, max: 32, default: 12 },
        gradientFrom: { type: "color", default: "" },
        gradientTo: { type: "color", default: "" },
        gradientWidth: { type: "slider", min: 1, max: 10, default: 2 },
        gradientAnimated: { type: "boolean", default: false },
        backgroundColor: { type: "color", default: "#0f172a" },
        borderColor: { type: "color", default: "#334155" },
        showButton: { type: "boolean", default: true },
        buttonText: { type: "text", default: "Generate" },
        placeholder: { type: "text", default: "https://your-shop.com/product/..." },
        showIcon: { type: "boolean", default: true },
      },
      render: (props: any) => {
        // Convert hex to rgb if needed for backgroundColor and borderColor
        const hexToRgb = (hex: string) => {
          if (!hex || !hex.startsWith('#')) return hex
          const r = parseInt(hex.slice(1, 3), 16)
          const g = parseInt(hex.slice(3, 5), 16)
          const b = parseInt(hex.slice(5, 7), 16)
          return `rgb(${r} ${g} ${b})`
        }

        return (
          <ThreeDCard className="w-full max-w-2xl" disabled={!props.enableHoverTilt}>
            <UrlInput
              onGenerate={(url) => console.log('Generated URL:', url)}
              isLoading={props.isLoading}
              borderRadius={props.borderRadius}
              gradientFrom={props.gradientFrom || undefined}
              gradientTo={props.gradientTo || undefined}
              gradientWidth={props.gradientWidth}
              gradientAnimated={props.gradientAnimated}
              backgroundColor={props.backgroundColor ? hexToRgb(props.backgroundColor) : undefined}
              borderColor={props.borderColor ? hexToRgb(props.borderColor) : undefined}
              showButton={props.showButton}
              buttonText={props.buttonText}
              placeholder={props.placeholder}
              showIcon={props.showIcon}
            />
          </ThreeDCard>
        )
      },
    },
    MediaPlayer: {
      props: {
        enableHoverTilt: { type: "boolean", default: true },
        className: { type: "text", default: "" },
        trackTitle: { type: "text", default: "Midnight City" },
        artist: { type: "text", default: "M83" },
        album: { type: "text", default: "Hurry Up, We're Dreaming" },
        albumArtUrl: { type: "text", default: "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?q=80&w=1000&auto=format&fit=crop" },
        totalTime: { type: "text", default: "4:03" },
        progress: { type: "slider", min: 0, max: 100, default: 66.67 },
        isPlaying: { type: "boolean", default: true },
        isLoved: { type: "boolean", default: false },
        isShuffle: { type: "boolean", default: false },
        isRepeat: { type: "boolean", default: false },
        showShuffle: { type: "boolean", default: true },
        showRepeat: { type: "boolean", default: true },
        showHeart: { type: "boolean", default: true },
        backgroundColor: { type: "color", default: "#171717" },
        borderColor: { type: "color", default: "#ffffff" },
        borderRadius: { type: "slider", min: 0, max: 48, default: 24 },
        glowColor1: { type: "color", default: "#6366f1" },
        glowColor2: { type: "color", default: "#a855f7" },
        gradientFrom: { type: "color", default: "" },
        gradientTo: { type: "color", default: "" },
        gradientWidth: { type: "slider", min: 0, max: 10, default: 2 },
        gradientAnimated: { type: "boolean", default: false },
        enableImageUpload: { type: "boolean", default: true },
      },
      render: (props: any, setProps?: (updater: (prev: any) => any) => void) => {
        // Convert hex to rgb with opacity if needed
        const hexToRgbWithOpacity = (hex: string, opacity: number = 0.6) => {
          if (!hex || !hex.startsWith('#')) return hex;
          const r = parseInt(hex.slice(1, 3), 16);
          const g = parseInt(hex.slice(3, 5), 16);
          const b = parseInt(hex.slice(5, 7), 16);
          return `rgb(${r} ${g} ${b} / ${opacity})`;
        };

        const hexToRgb = (hex: string) => {
          if (!hex || !hex.startsWith('#')) return hex;
          const r = parseInt(hex.slice(1, 3), 16);
          const g = parseInt(hex.slice(3, 5), 16);
          const b = parseInt(hex.slice(5, 7), 16);
          return `rgb(${r} ${g} ${b})`;
        };

        // Helper to convert hex to rgba
        const hexToRgba = (hex: string, opacity: number = 0.1) => {
          if (!hex || !hex.startsWith('#')) return hex;
          const r = parseInt(hex.slice(1, 3), 16);
          const g = parseInt(hex.slice(3, 5), 16);
          const b = parseInt(hex.slice(5, 7), 16);
          return `rgba(${r}, ${g}, ${b}, ${opacity})`;
        };

        // Helper functions for time conversion (same as in MediaPlayer)
        const timeToSeconds = (time: string): number => {
          const parts = time.split(':');
          if (parts.length === 2) {
            return parseInt(parts[0]) * 60 + parseInt(parts[1]);
          }
          return 0;
        };

        const secondsToTime = (seconds: number): string => {
          const mins = Math.floor(seconds / 60);
          const secs = Math.floor(seconds % 60);
          return `${mins}:${secs.toString().padStart(2, '0')}`;
        };

        // Calculate current time from progress
        let displayCurrentTime = "0:00";
        if (props.progress !== undefined && props.totalTime) {
          const totalSeconds = timeToSeconds(props.totalTime);
          const currentSeconds = (props.progress / 100) * totalSeconds;
          displayCurrentTime = secondsToTime(currentSeconds);
        }

        return (
          <ThreeDCard className="w-full max-w-sm" disabled={!props.enableHoverTilt}>
            <MediaPlayer
              className={props.className || undefined}
              trackTitle={props.trackTitle}
              artist={props.artist}
              album={props.album}
              albumArtUrl={props.albumArtUrl}
              totalTime={props.totalTime}
              progress={props.progress}
              isPlaying={props.isPlaying}
              isLoved={props.isLoved}
              isShuffle={props.isShuffle}
              isRepeat={props.isRepeat}
              showShuffle={props.showShuffle}
              showRepeat={props.showRepeat}
              showHeart={props.showHeart}
              backgroundColor={props.backgroundColor ? hexToRgbWithOpacity(props.backgroundColor, 0.6) : undefined}
              borderColor={props.borderColor ? hexToRgba(props.borderColor, 0.1) : undefined}
              borderRadius={props.borderRadius}
              glowColor1={props.glowColor1 ? hexToRgbWithOpacity(props.glowColor1, 0.2) : undefined}
              glowColor2={props.glowColor2 ? hexToRgbWithOpacity(props.glowColor2, 0.2) : undefined}
              gradientFrom={props.gradientFrom || undefined}
              gradientTo={props.gradientTo || undefined}
              gradientWidth={props.gradientWidth}
              gradientAnimated={props.gradientAnimated}
              enableImageUpload={props.enableImageUpload}
              onShuffle={setProps ? (isShuffle) => {
                // Update Playground props when shuffle state changes
                setProps((prev: any) => ({ ...prev, isShuffle }));
              } : undefined}
              onRepeat={setProps ? (isRepeat) => {
                // Update Playground props when repeat state changes
                setProps((prev: any) => ({ ...prev, isRepeat }));
              } : undefined}
              onPlayPause={setProps ? (isPlaying) => {
                // Update Playground props when play/pause state changes
                setProps((prev: any) => ({ ...prev, isPlaying }));
              } : undefined}
              onLove={setProps ? (isLoved) => {
                // Update Playground props when love state changes
                setProps((prev: any) => ({ ...prev, isLoved }));
              } : undefined}
              onTimeChange={(currentTime, progress) => {
                // Progress and time are automatically synced in the component
                console.log('Time changed:', currentTime, 'Progress:', progress);
              }}
              onImageUpload={setProps ? (imageUrl) => {
                console.log('Image uploaded:', imageUrl.substring(0, 50) + '...');
                // Update Playground props when image is uploaded
                setProps((prev: any) => ({ ...prev, albumArtUrl: imageUrl }));
              } : undefined}
            />
          </ThreeDCard>
        )
      },
    },
    ChatInterface: {
      props: {
        className: { type: "text", default: "" },
        enableHoverTilt: { type: "boolean", default: true },
        // Header
        headerUserName: { type: "text", default: "Sarah Jenkins" },
        headerUserStatus: { type: "select", options: ["Online now", "Offline", "Away", "Busy", "Do not disturb", "Other"], default: "Online now" },
        headerUserStatusCustom: { type: "text", default: "" },
        headerUserAvatar: { type: "text", default: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1000&auto=format&fit=crop" },
        headerShowPhone: { type: "boolean", default: true },
        headerShowVideo: { type: "boolean", default: true },
        headerShowMore: { type: "boolean", default: true },
        headerBgColor: { type: "color-tailwind-bg", default: "bg-neutral-900/80" },
        headerBorderColor: { type: "color-tailwind-border", default: "border-neutral-800" },
        headerTextColor: { type: "color-tailwind-text", default: "text-neutral-100" },
        headerStatusColor: { type: "text", default: "" },
        // Body
        bodyBgColor: { type: "color-tailwind-bg", default: "" },
        bodyPadding: { type: "slider", min: 2, max: 12, default: 6 },
        bodyShowDateLabel: { type: "boolean", default: true },
        bodyDateLabelText: { type: "text", default: "Today, Oct 24" },
        bodyShowTypingIndicator: { type: "boolean", default: true },
        bodyShowReadReceipt: { type: "boolean", default: false },
        message1Text: { type: "text", default: "Hey! Have you had a chance to look at the new design system components?" },
        message1Time: { type: "text", default: "10:30 AM" },
        message1IsOwn: { type: "boolean", default: false },
        message2Text: { type: "text", default: "Yes! I just checked them out. The neon gradients look absolutely stunning 🤩" },
        message2Time: { type: "text", default: "10:32 AM" },
        message2IsOwn: { type: "boolean", default: true },
        message2IsRead: { type: "boolean", default: false },
        message3Text: { type: "text", default: "Right? I think we should use the SpotlightCard for the feature section." },
        message3Time: { type: "text", default: "10:32 AM" },
        message3IsOwn: { type: "boolean", default: true },
        message3IsRead: { type: "boolean", default: true },
        message4Text: { type: "text", default: "Agreed. I'm preparing the documentation now. Will send over the draft in a bit!" },
        message4Time: { type: "text", default: "10:35 AM" },
        message4IsOwn: { type: "boolean", default: false },
        ownMessageColor: { type: "color-tailwind-bg", default: "bg-indigo-600" },
        otherMessageColor: { type: "color-tailwind-bg", default: "bg-neutral-800" },
        messageTextColor: { type: "color-tailwind-text", default: "" },
        timeTextColor: { type: "color-tailwind-text", default: "text-neutral-500" },
        // Footer
        footerBgColor: { type: "color-tailwind-bg", default: "bg-neutral-900/80" },
        footerBorderColor: { type: "color-tailwind-border", default: "border-neutral-800" },
        footerInputBgColor: { type: "color-tailwind-bg", default: "bg-neutral-950" },
        footerInputPlaceholder: { type: "text", default: "Type a message..." },
        footerShowAttach: { type: "boolean", default: true },
        footerShowEmoji: { type: "boolean", default: true },
        footerButtonColor: { type: "color-tailwind-bg", default: "bg-indigo-600" },
        footerFocusBorderColor: { type: "color-tailwind-border", default: "border-indigo-500/50" },
      },
      render: (props: any, setProps?: (updater: (prev: any) => any) => void) => {
        return (
          <ThreeDCard className="w-full max-w-md h-[600px]" disabled={!props.enableHoverTilt}>
            <ChatInterface
              className={props.className}
              headerUserName={props.headerUserName}
              headerUserStatus={props.headerUserStatus === "Other" ? props.headerUserStatusCustom : props.headerUserStatus}
              headerUserAvatar={props.headerUserAvatar}
              onAvatarChange={setProps ? (url: string) => setProps((prev: any) => ({ ...prev, headerUserAvatar: url })) : undefined}
              headerShowPhone={props.headerShowPhone}
              headerShowVideo={props.headerShowVideo}
              headerShowMore={props.headerShowMore}
              headerBgColor={props.headerBgColor}
              headerBorderColor={props.headerBorderColor}
              headerTextColor={props.headerTextColor}
              headerStatusColor={props.headerStatusColor}
              bodyBgColor={props.bodyBgColor}
              bodyPadding={props.bodyPadding}
              bodyShowDateLabel={props.bodyShowDateLabel}
              bodyDateLabelText={props.bodyDateLabelText}
              bodyShowTypingIndicator={props.bodyShowTypingIndicator}
              bodyShowReadReceipt={props.bodyShowReadReceipt}
              message1Text={props.message1Text}
              message1Time={props.message1Time}
              message1IsOwn={props.message1IsOwn}
              message2Text={props.message2Text}
              message2Time={props.message2Time}
              message2IsOwn={props.message2IsOwn}
              message2IsRead={props.message2IsRead}
              message3Text={props.message3Text}
              message3Time={props.message3Time}
              message3IsOwn={props.message3IsOwn}
              message3IsRead={props.message3IsRead}
              message4Text={props.message4Text}
              message4Time={props.message4Time}
              message4IsOwn={props.message4IsOwn}
              onMessage1TextChange={setProps ? (text: string) => setProps((prev: any) => ({ ...prev, message1Text: text })) : undefined}
              onMessage2TextChange={setProps ? (text: string) => setProps((prev: any) => ({ ...prev, message2Text: text })) : undefined}
              onMessage3TextChange={setProps ? (text: string) => setProps((prev: any) => ({ ...prev, message3Text: text })) : undefined}
              onMessage4TextChange={setProps ? (text: string) => setProps((prev: any) => ({ ...prev, message4Text: text })) : undefined}
              editable={true}
              ownMessageColor={props.ownMessageColor}
              otherMessageColor={props.otherMessageColor}
              messageTextColor={props.messageTextColor}
              timeTextColor={props.timeTextColor}
              footerBgColor={props.footerBgColor}
              footerBorderColor={props.footerBorderColor}
              footerInputBgColor={props.footerInputBgColor}
              footerInputPlaceholder={props.footerInputPlaceholder}
              footerShowAttach={props.footerShowAttach}
              footerShowEmoji={props.footerShowEmoji}
              footerButtonColor={props.footerButtonColor}
              footerFocusBorderColor={props.footerFocusBorderColor}
            />
          </ThreeDCard>
        )
      },
    },
    SocialProfileCard: {
      props: {
        className: { type: "text", default: "" },
        enableHoverTilt: { type: "boolean", default: true },
        name: { type: "text", default: "Sarah Jenkins" },
        username: { type: "text", default: "@sarah_des" },
        bio: { type: "text", default: "Product Designer crafting digital experiences. Coffee enthusiast ☕. Building next-gen UI tools for developers." },
        avatarUrl: { type: "text", default: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1000&auto=format&fit=crop" },
        location: { type: "text", default: "San Francisco, CA" },
        website: { type: "text", default: "sarah.design" },
        twitter: { type: "text", default: "@sarah_des" },
        showLocation: { type: "boolean", default: true },
        showWebsite: { type: "boolean", default: true },
        showTwitter: { type: "boolean", default: true },
        followers: { type: "text", default: "12.5k" },
        following: { type: "text", default: "842" },
        projects: { type: "text", default: "142" },
        isOnline: { type: "boolean", default: true },
        statusColor: { type: "color-tailwind-bg", default: "bg-green-500" },
        bannerGradientFrom: { type: "color-tailwind-gradient", default: "from-indigo-500" },
        bannerGradientVia: { type: "color-tailwind-gradient", default: "via-purple-500" },
        bannerGradientTo: { type: "color-tailwind-gradient", default: "to-pink-500" },
        followButtonText: { type: "text", default: "Follow" },
        showFollowButton: { type: "boolean", default: true },
        showMessageButton: { type: "boolean", default: true },
        showSimilarButton: { type: "boolean", default: true },
        messageButtonText: { type: "text", default: "Message" },
        similarButtonText: { type: "text", default: "Similar" },
        backgroundColor: { type: "color", default: "" },
        borderColor: { type: "color", default: "" },
        borderRadius: { type: "slider", min: 8, max: 48, default: 24 },
        gradientFrom: { type: "color", default: "" },
        gradientTo: { type: "color", default: "" },
        gradientWidth: { type: "slider", min: 1, max: 10, default: 2 },
        gradientAnimated: { type: "boolean", default: false },
      },
      render: (props: any, setProps?: (updater: (prev: any) => any) => void) => {
        // Convert hex to rgb if needed
        const hexToRgb = (hex: string) => {
          if (!hex) return undefined
          // Extract hex from Tailwind format like bg-[#hex] or from-[#hex]
          const hexMatch = hex.match(/\[#([0-9A-Fa-f]{6})\]/)
          if (hexMatch) {
            const r = parseInt(hexMatch[1].slice(0, 2), 16)
            const g = parseInt(hexMatch[1].slice(2, 4), 16)
            const b = parseInt(hexMatch[1].slice(4, 6), 16)
            return `rgb(${r} ${g} ${b})`
          }
          // If it's already a hex value
          if (hex.startsWith('#')) {
            const r = parseInt(hex.slice(1, 3), 16)
            const g = parseInt(hex.slice(3, 5), 16)
            const b = parseInt(hex.slice(5, 7), 16)
            return `rgb(${r} ${g} ${b})`
          }
          // Return as is if it's already rgb or other format
          return hex
        }

        return (
          <ThreeDCard className="w-full max-w-sm" disabled={!props.enableHoverTilt}>
            <SocialProfileCard
              className={props.className}
              name={props.name}
              username={props.username}
              bio={props.bio}
              avatarUrl={props.avatarUrl}
              location={props.location}
              website={props.website}
              twitter={props.twitter}
              showLocation={props.showLocation}
              showWebsite={props.showWebsite}
              showTwitter={props.showTwitter}
              followers={props.followers}
              following={props.following}
              projects={props.projects}
              isOnline={props.isOnline}
              statusColor={props.statusColor}
              bannerGradientFrom={props.bannerGradientFrom}
              bannerGradientVia={props.bannerGradientVia}
              bannerGradientTo={props.bannerGradientTo}
              followButtonText={props.followButtonText}
              showFollowButton={props.showFollowButton}
              showMessageButton={props.showMessageButton}
              showSimilarButton={props.showSimilarButton}
              messageButtonText={props.messageButtonText}
              similarButtonText={props.similarButtonText}
              onFollow={props.onFollow}
              onMessage={props.onMessage}
              onSimilar={props.onSimilar}
              onAvatarChange={setProps ? (url: string) => setProps((prev: any) => ({ ...prev, avatarUrl: url })) : undefined}
              backgroundColor={props.backgroundColor ? hexToRgb(props.backgroundColor) : undefined}
              borderColor={props.borderColor ? hexToRgb(props.borderColor) : undefined}
              borderRadius={props.borderRadius}
              gradientFrom={props.gradientFrom || undefined}
              gradientTo={props.gradientTo || undefined}
              gradientWidth={props.gradientWidth}
              gradientAnimated={props.gradientAnimated}
            />
          </ThreeDCard>
        )
      },
    },
    GlassAuthForm: {
      props: {
        className: { type: "text", default: "" },
        enableHoverTilt: { type: "boolean", default: true },
        // Text content
        title: { type: "text", default: "Welcome Back" },
        subtitle: { type: "text", default: "Enter your credentials to access the workspace." },
        emailLabel: { type: "text", default: "Email address" },
        passwordLabel: { type: "text", default: "Password" },
        rememberText: { type: "text", default: "Remember me" },
        forgotPasswordText: { type: "text", default: "Forgot password?" },
        signInText: { type: "text", default: "Sign In" },
        continueWithText: { type: "text", default: "Or continue with" },
        githubText: { type: "text", default: "GitHub" },
        googleText: { type: "text", default: "Google" },
        // Display options
        showRememberMe: { type: "boolean", default: true },
        showForgotPassword: { type: "boolean", default: true },
        showSocialButtons: { type: "boolean", default: true },
        showGithub: { type: "boolean", default: true },
        showGoogle: { type: "boolean", default: true },
        // Colors
        backgroundColor: { type: "color", default: "#171717" },
        borderColor: { type: "color", default: "#262626" },
        textColor: { type: "color-tailwind-text", default: "text-white" },
        iconGradientFrom: { type: "color", default: "#6366f1" },
        iconGradientTo: { type: "color", default: "#a855f7" },
        orb1Color: { type: "color", default: "#6366f1" },
        orb2Color: { type: "color", default: "#a855f7" },
        buttonColor: { type: "color", default: "" },
        socialButtonBgColor: { type: "color", default: "#262626" },
        socialButtonBorderColor: { type: "color", default: "#404040" },
        inputLabelColor: { type: "color-tailwind-text", default: "text-neutral-400" },
        inputBgColor: { type: "color-tailwind-bg", default: "bg-neutral-800" },
        inputBorderColor: { type: "color-tailwind-border", default: "border-neutral-700" },
        inputTextColor: { type: "color-tailwind-text", default: "text-white" },
        focusBorderColor: { type: "color-tailwind-border", default: "border-indigo-500" },
        // Card gradient
        cardGradientFrom: { type: "color", default: "" },
        cardGradientTo: { type: "color", default: "" },
        cardGradientWidth: { type: "slider", min: 1, max: 10, default: 2 },
        cardGradientAnimated: { type: "boolean", default: false },
        // Outer gradient
        outerGradientFrom: { type: "color", default: "" },
        outerGradientTo: { type: "color", default: "" },
        outerGradientWidth: { type: "slider", min: 1, max: 10, default: 2 },
        outerGradientAnimated: { type: "boolean", default: false },
        // Style
        borderRadius: { type: "slider", min: 8, max: 48, default: 24 },
        padding: { type: "slider", min: 4, max: 16, default: 8 },
        backdropBlur: { type: "slider", min: 0, max: 24, default: 12 },
      },
      render: (props: any, setProps?: (updater: (prev: any) => any) => void) => {
        // Helper to convert hex or Tailwind class to rgb
        const getColorFromTailwind = (colorValue: string): string | undefined => {
          if (!colorValue) return undefined
          // Extract hex from bg-[#hex] or text-[#hex] format
          const hexMatch = colorValue.match(/\[#([0-9A-Fa-f]{6})\]/)
          if (hexMatch) {
            const r = parseInt(hexMatch[1].slice(0, 2), 16)
            const g = parseInt(hexMatch[1].slice(2, 4), 16)
            const b = parseInt(hexMatch[1].slice(4, 6), 16)
            return `rgb(${r} ${g} ${b})`
          }
          // If it's already a hex value
          if (colorValue.startsWith('#')) {
            const r = parseInt(colorValue.slice(1, 3), 16)
            const g = parseInt(colorValue.slice(3, 5), 16)
            const b = parseInt(colorValue.slice(5, 7), 16)
            return `rgb(${r} ${g} ${b})`
          }
          // Try color map for Tailwind classes
          const colorMap: Record<string, string> = {
            "text-white": "rgb(255 255 255)",
            "text-neutral-400": "rgb(163 163 163)",
            "text-neutral-500": "rgb(115 115 115)",
            "bg-neutral-800": "rgb(38 38 38)",
            "bg-neutral-900": "rgb(23 23 23)",
            "border-neutral-700": "rgb(64 64 64)",
            "border-indigo-500": "rgb(99 102 241)",
          }
          return colorMap[colorValue] || undefined
        }

        // Helper to convert hex to rgb (for color type props)
        const hexToRgb = (hex: string) => {
          if (!hex) return undefined
          if (hex.startsWith('#')) {
            const r = parseInt(hex.slice(1, 3), 16)
            const g = parseInt(hex.slice(3, 5), 16)
            const b = parseInt(hex.slice(5, 7), 16)
            return `rgb(${r} ${g} ${b})`
          }
          return hex
        }

        return (
          <ThreeDCard className="w-full max-w-sm" disabled={!props.enableHoverTilt}>
            <GlassAuthForm
              className={props.className}
              title={props.title}
              subtitle={props.subtitle}
              emailLabel={props.emailLabel}
              passwordLabel={props.passwordLabel}
              rememberText={props.rememberText}
              forgotPasswordText={props.forgotPasswordText}
              signInText={props.signInText}
              continueWithText={props.continueWithText}
              githubText={props.githubText}
              googleText={props.googleText}
              showRememberMe={props.showRememberMe}
              showForgotPassword={props.showForgotPassword}
              showSocialButtons={props.showSocialButtons}
              showGithub={props.showGithub}
              showGoogle={props.showGoogle}
              backgroundColor={props.backgroundColor ? hexToRgb(props.backgroundColor) : undefined}
              borderColor={props.borderColor ? hexToRgb(props.borderColor) : undefined}
              textColor={props.textColor ? getColorFromTailwind(props.textColor) : undefined}
              iconGradientFrom={props.iconGradientFrom ? hexToRgb(props.iconGradientFrom) : undefined}
              iconGradientTo={props.iconGradientTo ? hexToRgb(props.iconGradientTo) : undefined}
              orb1Color={props.orb1Color ? hexToRgb(props.orb1Color) : undefined}
              orb2Color={props.orb2Color ? hexToRgb(props.orb2Color) : undefined}
              buttonColor={props.buttonColor ? hexToRgb(props.buttonColor) : undefined}
              socialButtonBgColor={props.socialButtonBgColor ? hexToRgb(props.socialButtonBgColor) : undefined}
              socialButtonBorderColor={props.socialButtonBorderColor ? hexToRgb(props.socialButtonBorderColor) : undefined}
              inputLabelColor={props.inputLabelColor ? getColorFromTailwind(props.inputLabelColor) : undefined}
              inputBgColor={props.inputBgColor ? getColorFromTailwind(props.inputBgColor) : undefined}
              inputBorderColor={props.inputBorderColor ? getColorFromTailwind(props.inputBorderColor) : undefined}
              inputTextColor={props.inputTextColor ? getColorFromTailwind(props.inputTextColor) : undefined}
              focusBorderColor={props.focusBorderColor ? getColorFromTailwind(props.focusBorderColor) : undefined}
              cardGradientFrom={props.cardGradientFrom ? hexToRgb(props.cardGradientFrom) : undefined}
              cardGradientTo={props.cardGradientTo ? hexToRgb(props.cardGradientTo) : undefined}
              cardGradientWidth={props.cardGradientWidth}
              cardGradientAnimated={props.cardGradientAnimated}
              outerGradientFrom={props.outerGradientFrom ? hexToRgb(props.outerGradientFrom) : undefined}
              outerGradientTo={props.outerGradientTo ? hexToRgb(props.outerGradientTo) : undefined}
              outerGradientWidth={props.outerGradientWidth}
              outerGradientAnimated={props.outerGradientAnimated}
              borderRadius={props.borderRadius}
              padding={props.padding}
              backdropBlur={props.backdropBlur}
            />
          </ThreeDCard>
        )
      },
    },
  }

  heroSections.forEach((hero) => {
    const Component = heroComponentsByName[hero.componentName]
    if (!Component) return

    const propConfig = Object.fromEntries(
      Object.entries(hero.props).map(([key, prop]) => [
        key,
        {
          type: prop.control,
          default: prop.default,
          options: prop.options,
          min: prop.min,
          max: prop.max,
        },
      ])
    )

    configs[hero.name] = {
      props: propConfig,
      render: (props: any) => (
        <div className="w-full">
          <Component {...props} />
        </div>
      ),
    }
  })

  // Add header sections to configs
  headerSections.forEach((header) => {
    const Component = headerComponentsByName[header.componentName]
    if (!Component) return

    const propConfig = Object.fromEntries(
      Object.entries(header.props).map(([key, prop]) => [
        key,
        {
          type: prop.control,
          default: prop.default,
          options: prop.options,
          min: prop.min,
          max: prop.max,
        },
      ])
    )

    configs[header.name] = {
      props: propConfig,
      render: (props: any) => (
        <div className="w-full">
          <Component {...props} />
        </div>
      ),
    }
  })

  // Add feature sections to configs
  featureSections.forEach((feature) => {
    const Component = featureComponentsByName[feature.componentName]
    if (!Component) return

    const propConfig = Object.fromEntries(
      Object.entries(feature.props).map(([key, prop]) => [
        key,
        {
          type: prop.control,
          default: prop.default,
          options: prop.options,
          min: prop.min,
          max: prop.max,
        },
      ])
    )

    configs[feature.name] = {
      props: propConfig,
      render: (props: any) => (
        <div className="w-full">
          <Component {...props} />
        </div>
      ),
    }
  })

  // Add payment sections to configs
  paymentSections.forEach((payment) => {
    const Component = paymentComponentsByName[payment.componentName]
    if (!Component) return

    const propConfig = Object.fromEntries(
      Object.entries(payment.props).map(([key, prop]) => [
        key,
        {
          type: prop.control,
          default: prop.default,
          options: prop.options,
          min: prop.min,
          max: prop.max,
        },
      ])
    )

    configs[payment.name] = {
      props: propConfig,
      render: (props: any) => (
        <div className="w-full">
          <Component {...props} />
        </div>
      ),
    }
  })

  // Add CTA sections to configs
  ctaSections.forEach((cta) => {
    const Component = ctaComponentsByName[cta.componentName]
    if (!Component) return

    const propConfig = Object.fromEntries(
      Object.entries(cta.props).map(([key, prop]) => [
        key,
        {
          type: prop.control,
          default: prop.default,
          options: prop.options,
          min: prop.min,
          max: prop.max,
        },
      ])
    )

    configs[cta.name] = {
      props: propConfig,
      render: (props: any) => (
        <div className="w-full">
          <Component {...props} />
        </div>
      ),
    }
  })

  // Add footer sections to configs
  footerSections.forEach((footer) => {
    const Component = footerComponentsByName[footer.componentName]
    if (!Component) return

    const propConfig = Object.fromEntries(
      Object.entries(footer.props).map(([key, prop]) => [
        key,
        {
          type: prop.control,
          default: prop.default,
          options: prop.options,
          min: prop.min,
          max: prop.max,
        },
      ])
    )

    configs[footer.name] = {
      props: propConfig,
      render: (props: any) => (
        <div className="w-full">
          <Component {...props} />
        </div>
      ),
    }
  })

  // Add button sections to configs
  buttonSections.forEach((button) => {
    const Component = buttonComponentsByName[button.componentName]
    if (!Component) {
      console.warn(`Button component not found: ${button.componentName}`)
      return
    }

    const propConfig = Object.fromEntries(
      Object.entries(button.props).map(([key, prop]) => [
        key,
        {
          type: prop.control,
          default: prop.default,
          options: prop.options,
          min: prop.min,
          max: prop.max,
        },
      ])
    )

    configs[button.name] = {
      props: propConfig,
      render: (props: any) => {
        // Convert hex to rgb for backgroundColor, textColor, borderColor (like UrlInput does)
        const hexToRgb = (hex: string) => {
          if (!hex || !hex.startsWith('#')) return hex
          const r = parseInt(hex.slice(1, 3), 16)
          const g = parseInt(hex.slice(3, 5), 16)
          const b = parseInt(hex.slice(5, 7), 16)
          return `rgb(${r} ${g} ${b})`
        }

        // Extract and process props (like UrlInput does)
        const {
          size,
          borderRadius,
          paddingX,
          paddingY,
          backgroundColor,
          textColor,
          borderColor,
          borderWidth,
          className,
          children,
          buttonText,
          copyText,
          downloadText,
          // Animation props
          animationDuration,
          animationSpeed,
          shimmerSpeed,
          pulseSpeed,
          glowIntensity,
          magneticStrength,
          rippleSize,
          holdDuration,
          spinSpeed,
          flickerSpeed,
          elasticScale,
          // Color props
          glowColor,
          shimmerColor,
          hoverColor,
          fillColor,
          ...restProps
        } = props

        // Prepare props to pass to component (pass all props directly, like UrlInput)
        const componentProps: any = {
          children: children || buttonText || copyText || downloadText || 'Button',
          className,
          size,
          borderRadius,
          paddingX,
          paddingY,
          backgroundColor: backgroundColor ? hexToRgb(backgroundColor) : undefined,
          textColor: textColor ? hexToRgb(textColor) : undefined,
          borderColor: borderColor ? hexToRgb(borderColor) : undefined,
          borderWidth,
          // Special text props
          buttonText,
          copyText,
          downloadText,
          // Animation props
          animationDuration,
          animationSpeed,
          shimmerSpeed,
          pulseSpeed,
          glowIntensity,
          magneticStrength,
          rippleSize,
          holdDuration,
          spinSpeed,
          flickerSpeed,
          elasticScale,
          // Color props
          glowColor: glowColor ? hexToRgb(glowColor) : undefined,
          shimmerColor: shimmerColor ? hexToRgb(shimmerColor) : undefined,
          hoverColor: hoverColor ? hexToRgb(hoverColor) : undefined,
          fillColor: fillColor ? hexToRgb(fillColor) : undefined,
          // Button-specific color props - pass all props that might be used by any button
          shadowLayerColor: props.shadowLayerColor,
          mainButtonColor: props.mainButtonColor,
          pixelBorderColor: props.pixelBorderColor,
          glitchColor1: props.glitchColor1,
          glitchColor2: props.glitchColor2,
          glitchBackgroundColor: props.glitchBackgroundColor,
          neumorphicBgColor: props.neumorphicBgColor,
          neumorphicTextColor: props.neumorphicTextColor,
          neumorphicShadowLight: props.neumorphicShadowLight,
          neumorphicShadowDark: props.neumorphicShadowDark,
          gradientFrom: props.gradientFrom,
          gradientVia: props.gradientVia,
          gradientTo: props.gradientTo,
          innerBgColor: props.innerBgColor,
          swipeRightFillColor: props.swipeRightFillColor,
          swipeUpFillColor: props.swipeUpFillColor,
          swipeLeftFillColor: props.swipeLeftFillColor,
          swipeDownFillColor: props.swipeDownFillColor,
          scaleUpFillColor: props.scaleUpFillColor,
          shadowLightColor: props.shadowLightColor,
          shadowDarkColor: props.shadowDarkColor,
          pressBorderColor: props.pressBorderColor,
          pressShadowColor: props.pressShadowColor,
          rippleColor: props.rippleColor,
          ghostBorderColor: props.ghostBorderColor,
          spotlightColor: props.spotlightColor,
          glassBorderColor: props.glassBorderColor,
          glassBgColor: props.glassBgColor,
          elasticBgColor: props.elasticBgColor,
          idleBgColor: props.idleBgColor,
          loadingBgColor: props.loadingBgColor,
          successBgColor: props.successBgColor,
          copyBorderColor: props.copyBorderColor,
          copyBgColor: props.copyBgColor,
          copiedBorderColor: props.copiedBorderColor,
          copiedBgColor: props.copiedBgColor,
          progressBgColor: props.progressBgColor,
          socialBgColor: props.socialBgColor,
          drawBorderColor: props.drawBorderColor,
          dottedBorderColor: props.dottedBorderColor,
          gradientRingFrom: props.gradientRingFrom,
          gradientRingVia: props.gradientRingVia,
          gradientRingTo: props.gradientRingTo,
          cyberBorderColor: props.cyberBorderColor,
          cyberBgColor: props.cyberBgColor,
          cyberAccentColor: props.cyberAccentColor,
          retroBgColor: props.retroBgColor,
          retroBorderLightColor: props.retroBorderLightColor,
          retroBorderDarkColor: props.retroBorderDarkColor,
          skeuoGradientFrom: props.skeuoGradientFrom,
          skeuoGradientTo: props.skeuoGradientTo,
          skeuoBorderColor: props.skeuoBorderColor,
          errorBgColor: props.errorBgColor,
          confettiGradientFrom: props.confettiGradientFrom,
          confettiGradientTo: props.confettiGradientTo,
          holdProgressColor: props.holdProgressColor,
          deleteIdleBgColor: props.deleteIdleBgColor,
          deleteConfirmBgColor: props.deleteConfirmBgColor,
          likeBorderColor: props.likeBorderColor,
          likeBgColor: props.likeBgColor,
          likedBorderColor: props.likedBorderColor,
          likedBgColor: props.likedBgColor,
          likedTextColor: props.likedTextColor,
          skewBorderColor: props.skewBorderColor,
          blobBgColor: props.blobBgColor,
          underlineColor: props.underlineColor,
          bracketColor: props.bracketColor,
          curtainBgColor: props.curtainBgColor,
          curtainRevealBgColor: props.curtainRevealBgColor,
          curtainRevealTextColor: props.curtainRevealTextColor,
          sliceBgColor: props.sliceBgColor,
          wetPaintBgColor: props.wetPaintBgColor,
          particleColor: props.particleColor,
          isometricBgColor: props.isometricBgColor,
          isometricBorderColor: props.isometricBorderColor,
          isometricShadowColor: props.isometricShadowColor,
          paperFoldBgColor: props.paperFoldBgColor,
          paperFoldAccentColor: props.paperFoldAccentColor,
          textFillBorderColor: props.textFillBorderColor,
          textFillBgColor: props.textFillBgColor,
          iconSlideBgColor: props.iconSlideBgColor,
          multiLayerColor1: props.multiLayerColor1,
          multiLayerColor2: props.multiLayerColor2,
          multiLayerBgColor: props.multiLayerBgColor,
          multiLayerBorderColor: props.multiLayerBorderColor,
          uploadBgColor: props.uploadBgColor,
          toggleOnColor: props.toggleOnColor,
          toggleOffColor: props.toggleOffColor,
          doubleBorderColor: props.doubleBorderColor,
          spinningBorderGradientFrom: props.spinningBorderGradientFrom,
          spinningBorderGradientVia: props.spinningBorderGradientVia,
          spinningBorderGradientTo: props.spinningBorderGradientTo,
          letterSpacingBorderColor: props.letterSpacingBorderColor,
          blurRevealColor: props.blurRevealColor,
          vaporwaveGradientFrom: props.vaporwaveGradientFrom,
          vaporwaveGradientTo: props.vaporwaveGradientTo,
          vaporwaveShadowColor: props.vaporwaveShadowColor,
          saveBgColor: props.saveBgColor,
          printBorderColor: props.printBorderColor,
          printBgColor: props.printBgColor,
          notificationBgColor: props.notificationBgColor,
          notificationBadgeColor: props.notificationBadgeColor,
          circleToSquareBgColor: props.circleToSquareBgColor,
          morphFabBgColor: props.morphFabBgColor,
          morphFabHoverBgColor: props.morphFabHoverBgColor,
          shinyReflectionBgColor: props.shinyReflectionBgColor,
          shinyReflectionBorderColor: props.shinyReflectionBorderColor,
          dotHoverColor: props.dotHoverColor,
          marqueeBorderColor: props.marqueeBorderColor,
          scrambleTextColor: props.scrambleTextColor,
          scrambleBorderColor: props.scrambleBorderColor,
          typewriterBgColor: props.typewriterBgColor,
          typewriterBorderColor: props.typewriterBorderColor,
          typewriterCursorColor: props.typewriterCursorColor,
          liquidBlobBgColor: props.liquidBlobBgColor,
          cyberPunkBorderColor: props.cyberPunkBorderColor,
          cyberPunkBgColor: props.cyberPunkBgColor,
          cyberPunkTextColor: props.cyberPunkTextColor,
          cyberPunkAccentColor: props.cyberPunkAccentColor,
          roundedCornerMorphBgColor: props.roundedCornerMorphBgColor,
          roundedCornerMorphHoverBgColor: props.roundedCornerMorphHoverBgColor,
          ...restProps,
        }

        return (
          <div className="flex items-center justify-center p-8 w-full">
            <Component {...componentProps} />
          </div>
        )
      },
    }
  })

  // Add badge sections to configs
  badgeSections.forEach((badge) => {
    // Get Component dynamically to avoid circular dependency issues
    const Component = badgeComponentsByName[badge.componentName]
    if (!Component) {
      console.warn(`Badge component not found: ${badge.componentName}. Available components:`, Object.keys(badgeComponentsByName))
      return
    }

    const propConfig = Object.fromEntries(
      Object.entries(badge.props).map(([key, prop]) => [
        key,
        {
          type: prop.control,
          default: prop.default,
          options: prop.options,
          min: prop.min,
          max: prop.max,
        },
      ])
    )

    configs[badge.name] = {
      props: propConfig,
      render: (props: any, setProps?: (updater: (prev: any) => any) => void) => {
        // Get Component from badgeComponentsByName (re-fetch to ensure it's available)
        const Component = badgeComponentsByName[badge.componentName]
        
        if (!Component) {
          console.error(`Badge component ${badge.componentName} is not available in badgeComponentsByName. Available:`, Object.keys(badgeComponentsByName))
          return (
            <div className="w-full p-4 text-center text-muted-foreground">
              Component not found: {badge.componentName}
            </div>
          )
        }

        // Process props that need special handling
        // Helper to convert hex to rgb
        const hexToRgb = (hex: string): string | undefined => {
          if (!hex || typeof hex !== 'string' || !hex.startsWith('#')) return hex
          try {
            const r = parseInt(hex.slice(1, 3), 16)
            const g = parseInt(hex.slice(3, 5), 16)
            const b = parseInt(hex.slice(5, 7), 16)
            if (isNaN(r) || isNaN(g) || isNaN(b)) return hex
            return `rgb(${r} ${g} ${b})`
          } catch {
            return hex
          }
        }
        
        // Build processedProps
        const processedProps: any = {}
        
        // Process all props from badge.props definition
        Object.keys(badge.props).forEach((key) => {
          const propConfig = badge.props[key]
          const propValue = props[key]
          
          // Handle color props - convert hex to rgb if needed
          if (propConfig.control === "color") {
            if (propValue && typeof propValue === "string" && propValue.trim() !== "") {
              processedProps[key] = propValue.startsWith('#') ? hexToRgb(propValue) : propValue
            } else {
              processedProps[key] = undefined
            }
          }
          // Handle slider/number props
          else if (propConfig.control === "slider" || propConfig.control === "number") {
            if (propValue !== undefined && propValue !== null && propValue !== "") {
              processedProps[key] = typeof propValue === "number" ? propValue : parseFloat(String(propValue)) || propConfig.default || 0
            } else {
              processedProps[key] = propConfig.default !== undefined && propConfig.default !== null ? propConfig.default : (propConfig.min !== undefined ? propConfig.min : 0)
            }
          }
          // Handle boolean props
          else if (propConfig.control === "boolean") {
            if (propValue !== undefined && propValue !== null) {
              processedProps[key] = propValue === true || propValue === "true"
            } else {
              processedProps[key] = propConfig.default === true || propConfig.default === "true"
            }
          }
          // Handle text/textarea/select props
          else {
            if (propValue !== undefined && propValue !== null) {
              processedProps[key] = propValue
            } else {
              if (propConfig.control === "select" && propConfig.options && propConfig.options.length > 0) {
                processedProps[key] = propConfig.default !== undefined ? propConfig.default : propConfig.options[0]
              } else {
                processedProps[key] = propConfig.default !== undefined ? propConfig.default : ""
              }
            }
          }
        })
        
        // Also include any props from props that might not be in badge.props
        Object.keys(props).forEach((key) => {
          if (!(key in processedProps) && !key.startsWith('_')) {
            processedProps[key] = props[key]
          }
        })

        try {
          return (
            <div className="w-full flex items-center justify-center">
              <Component {...processedProps} />
            </div>
          )
        } catch (error) {
          console.error(`Error rendering ${badge.componentName}:`, error)
          return (
            <div className="w-full p-4 text-center text-muted-foreground">
              Error rendering component: {String(error)}
            </div>
          )
        }
      },
    }
  })

  // Add input sections to configs
  inputSections.forEach((input) => {
    // Get Component dynamically to avoid circular dependency issues
    const Component = inputComponentsByName[input.componentName]
    if (!Component) {
      console.warn(`Input component not found: ${input.componentName}. Available components:`, Object.keys(inputComponentsByName))
      return
    }

    const propConfig = Object.fromEntries(
      Object.entries(input.props).map(([key, prop]) => [
        key,
        {
          type: prop.control,
          default: prop.default,
          options: prop.options,
          min: prop.min,
          max: prop.max,
        },
      ])
    )

    configs[input.name] = {
      props: propConfig,
      render: (props: any, setProps?: (updater: (prev: any) => any) => void) => {
        // Get Component from inputComponentsByName (re-fetch to ensure it's available)
        const Component = inputComponentsByName[input.componentName]
        
        if (!Component) {
          console.error(`Input component ${input.componentName} is not available in inputComponentsByName. Available:`, Object.keys(inputComponentsByName))
          return (
            <div className="w-full p-4 text-center text-muted-foreground">
              Component not found: {input.componentName}
            </div>
          )
        }

        // Process props that need special handling
        // Helper to convert hex to rgb
        const hexToRgb = (hex: string): string | undefined => {
          if (!hex || typeof hex !== 'string' || !hex.startsWith('#')) return hex
          try {
            const r = parseInt(hex.slice(1, 3), 16)
            const g = parseInt(hex.slice(3, 5), 16)
            const b = parseInt(hex.slice(5, 7), 16)
            if (isNaN(r) || isNaN(g) || isNaN(b)) return hex
            return `rgb(${r} ${g} ${b})`
          } catch {
            return hex
          }
        }
        
        // Build processedProps
        const processedProps: any = {}
        
        // Process all props from input.props definition
        Object.keys(input.props).forEach((key) => {
          const propConfig = input.props[key]
          const propValue = props[key]
          
          // Handle color props - convert hex to rgb if needed
          if (propConfig.control === "color") {
            if (propValue && typeof propValue === "string" && propValue.trim() !== "") {
              processedProps[key] = propValue.startsWith('#') ? hexToRgb(propValue) : propValue
            } else {
              processedProps[key] = undefined
            }
          }
          // Handle slider/number props
          else if (propConfig.control === "slider" || propConfig.control === "number") {
            if (propValue !== undefined && propValue !== null && propValue !== "") {
              processedProps[key] = typeof propValue === "number" ? propValue : parseFloat(String(propValue)) || propConfig.default || 0
            } else {
              processedProps[key] = propConfig.default !== undefined && propConfig.default !== null ? propConfig.default : (propConfig.min !== undefined ? propConfig.min : 0)
            }
          }
          // Handle boolean props
          else if (propConfig.control === "boolean") {
            if (propValue !== undefined && propValue !== null) {
              processedProps[key] = propValue === true || propValue === "true"
            } else {
              processedProps[key] = propConfig.default === true || propConfig.default === "true"
            }
          }
          // Handle text/textarea/select props
          else {
            if (propValue !== undefined && propValue !== null) {
              processedProps[key] = propValue
            } else {
              if (propConfig.control === "select" && propConfig.options && propConfig.options.length > 0) {
                processedProps[key] = propConfig.default !== undefined ? propConfig.default : propConfig.options[0]
              } else {
                processedProps[key] = propConfig.default !== undefined ? propConfig.default : ""
              }
            }
          }
        })
        
        // Also include any props from props that might not be in input.props
        Object.keys(props).forEach((key) => {
          if (!(key in processedProps) && !key.startsWith('_')) {
            processedProps[key] = props[key]
          }
        })

        try {
          return (
            <div className="w-full flex items-center justify-center p-8">
              <Component {...processedProps} />
            </div>
          )
        } catch (error) {
          console.error(`Error rendering ${input.componentName}:`, error)
          return (
            <div className="w-full p-4 text-center text-muted-foreground">
              Error rendering component: {String(error)}
            </div>
          )
        }
      },
    }
  })

  // Add dialog sections to configs
  dialogSections.forEach((dialog) => {
    // Get Component dynamically to avoid circular dependency issues
    const Component = dialogComponentsByName[dialog.componentName]
    if (!Component) {
      console.warn(`Dialog component not found: ${dialog.componentName}. Available components:`, Object.keys(dialogComponentsByName))
      return
    }

    const propConfig = Object.fromEntries(
      Object.entries(dialog.props).map(([key, prop]) => [
        key,
        {
          type: prop.control,
          default: prop.default,
          options: prop.options,
          min: prop.min,
          max: prop.max,
        },
      ])
    )

    configs[dialog.name] = {
      props: propConfig,
      render: (props: any, setProps?: (updater: (prev: any) => any) => void) => {
        // Get Component from dialogComponentsByName (re-fetch to ensure it's available)
        const Component = dialogComponentsByName[dialog.componentName]
        
        if (!Component) {
          console.error(`Dialog component ${dialog.componentName} is not available in dialogComponentsByName. Available:`, Object.keys(dialogComponentsByName))
          return (
            <div className="w-full p-4 text-center text-muted-foreground">
              Component not found: {dialog.componentName}
            </div>
          )
        }

        // Process props that need special handling
        // Helper to convert hex to rgb
        const hexToRgb = (hex: string): string | undefined => {
          if (!hex || typeof hex !== 'string' || !hex.startsWith('#')) return hex
          try {
            const r = parseInt(hex.slice(1, 3), 16)
            const g = parseInt(hex.slice(3, 5), 16)
            const b = parseInt(hex.slice(5, 7), 16)
            if (isNaN(r) || isNaN(g) || isNaN(b)) return hex
            return `rgb(${r} ${g} ${b})`
          } catch {
            return hex
          }
        }
        
        // Build processedProps
        const processedProps: any = {}
        
        // Process all props from dialog.props definition
        Object.keys(dialog.props).forEach((key) => {
          const propConfig = dialog.props[key]
          const propValue = props[key]
          
          // Handle color props - convert hex to rgb if needed
          if (propConfig.control === "color") {
            if (propValue && typeof propValue === "string" && propValue.trim() !== "") {
              processedProps[key] = propValue.startsWith('#') ? hexToRgb(propValue) : propValue
            } else {
              processedProps[key] = undefined
            }
          }
          // Handle slider/number props
          else if (propConfig.control === "slider" || propConfig.control === "number") {
            if (propValue !== undefined && propValue !== null && propValue !== "") {
              processedProps[key] = typeof propValue === "number" ? propValue : parseFloat(String(propValue)) || propConfig.default || 0
            } else {
              processedProps[key] = propConfig.default !== undefined && propConfig.default !== null ? propConfig.default : (propConfig.min !== undefined ? propConfig.min : 0)
            }
          }
          // Handle boolean props
          else if (propConfig.control === "boolean") {
            if (propValue !== undefined && propValue !== null) {
              processedProps[key] = propValue === true || propValue === "true"
            } else {
              processedProps[key] = propConfig.default === true || propConfig.default === "true"
            }
          }
          // Handle text/textarea/select props
          else {
            if (propValue !== undefined && propValue !== null) {
              processedProps[key] = propValue
            } else {
              if (propConfig.control === "select" && propConfig.options && propConfig.options.length > 0) {
                processedProps[key] = propConfig.default !== undefined ? propConfig.default : propConfig.options[0]
              } else {
                processedProps[key] = propConfig.default !== undefined ? propConfig.default : ""
              }
            }
          }
        })
        
        // Also include any props from props that might not be in dialog.props
        Object.keys(props).forEach((key) => {
          if (!(key in processedProps) && !key.startsWith('_')) {
            processedProps[key] = props[key]
          }
        })

        try {
          return (
            <div className="w-full flex items-center justify-center p-8 overflow-auto">
              <div className="w-full max-w-full flex items-center justify-center">
                <Component {...processedProps} />
              </div>
            </div>
          )
        } catch (error) {
          console.error(`Error rendering ${dialog.componentName}:`, error)
          return (
            <div className="w-full p-4 text-center text-muted-foreground">
              Error rendering component: {String(error)}
            </div>
          )
        }
      },
    }
  })

  // Add card sections to configs
  cardSections.forEach((card) => {
    // Get Component dynamically to avoid circular dependency issues
    const Component = cardComponentsByName[card.componentName]
    if (!Component) {
      console.warn(`Card component not found: ${card.componentName}. Available components:`, Object.keys(cardComponentsByName))
      return
    }

    const propConfig = Object.fromEntries(
      Object.entries(card.props).map(([key, prop]) => [
        key,
        {
          type: prop.control,
          default: prop.default,
          options: prop.options,
          min: prop.min,
          max: prop.max,
        },
      ])
    )

    configs[card.name] = {
      props: propConfig,
      render: (props: any, setProps?: (updater: (prev: any) => any) => void) => {
        // Get Component from cardComponentsByName (re-fetch to ensure it's available)
        const Component = cardComponentsByName[card.componentName]
        
        if (!Component) {
          console.error(`Card component ${card.componentName} is not available in cardComponentsByName. Available:`, Object.keys(cardComponentsByName))
          return (
            <div className="w-full p-4 text-center text-muted-foreground">
              Component not found: {card.componentName}
            </div>
          )
        }

        // Process props that need special handling (like arrays, objects, etc.)
        // Helper to convert hex to rgb (same as SocialProfileCard)
        const hexToRgb = (hex: string): string | undefined => {
          if (!hex || typeof hex !== 'string' || !hex.startsWith('#')) return hex
          try {
            const r = parseInt(hex.slice(1, 3), 16)
            const g = parseInt(hex.slice(3, 5), 16)
            const b = parseInt(hex.slice(5, 7), 16)
            if (isNaN(r) || isNaN(g) || isNaN(b)) return hex
            return `rgb(${r} ${g} ${b})`
          } catch {
            return hex
          }
        }
        
        // Build processedProps similar to SocialProfileCard - explicitly pass each prop
        const processedProps: any = {}
        
        // Process all props from card.props definition
        // First, ensure all props from card.props are in processedProps
        Object.keys(card.props).forEach((key) => {
          const propConfig = card.props[key]
          const propValue = props[key]
          
          // Handle color props - convert hex to rgb if needed (like SocialProfileCard)
          // Match SocialProfileCard: backgroundColor={props.backgroundColor ? hexToRgb(props.backgroundColor) : undefined}
          if (propConfig.control === "color") {
            if (propValue && typeof propValue === "string" && propValue.trim() !== "") {
              // Convert hex to rgb if it's a hex value, otherwise pass as-is
              processedProps[key] = propValue.startsWith('#') ? hexToRgb(propValue) : propValue
            } else {
              // If empty or undefined, pass undefined (not empty string) to match SocialProfileCard behavior
              // This allows the component to use its default styling
              processedProps[key] = undefined
            }
          }
          // Handle slider/number props
          else if (propConfig.control === "slider" || propConfig.control === "number") {
            if (propValue !== undefined && propValue !== null && propValue !== "") {
              processedProps[key] = typeof propValue === "number" ? propValue : parseFloat(String(propValue)) || propConfig.default || 0
            } else {
              processedProps[key] = propConfig.default !== undefined && propConfig.default !== null ? propConfig.default : (propConfig.min !== undefined ? propConfig.min : 0)
            }
          }
          // Handle boolean props
          else if (propConfig.control === "boolean") {
            if (propValue !== undefined && propValue !== null) {
              processedProps[key] = propValue === true || propValue === "true"
            } else {
              processedProps[key] = propConfig.default === true || propConfig.default === "true"
            }
          }
          // Handle text/textarea/select props
          else {
            // Always pass the prop value if it exists (even if empty string)
            // Only use default if propValue is truly undefined or null
            if (propValue !== undefined && propValue !== null) {
              processedProps[key] = propValue
            } else {
              // For text/textarea, use default if available, otherwise empty string
              // For select, use default or first option
              if (propConfig.control === "select" && propConfig.options && propConfig.options.length > 0) {
                processedProps[key] = propConfig.default !== undefined ? propConfig.default : propConfig.options[0]
              } else {
                processedProps[key] = propConfig.default !== undefined ? propConfig.default : ""
              }
            }
          }
        })
        
        // Also include any props from props that might not be in card.props (for backward compatibility)
        Object.keys(props).forEach((key) => {
          if (!(key in processedProps) && !key.startsWith('_')) {
            // Include props that are not in card.props but are in props (might be added dynamically)
            processedProps[key] = props[key]
          }
        })
        
        // Handle features array for PricingCard
        if (card.componentName === "PricingCard" && props.features) {
          processedProps.features = typeof props.features === "string" 
            ? props.features.split("\n").filter((f: string) => f.trim())
            : props.features
        }
        
        // Handle skills array for SkillCard
        if (card.componentName === "SkillCard" && props.skills) {
          processedProps.skills = typeof props.skills === "string"
            ? props.skills.split("\n").filter((s: string) => s.trim())
            : props.skills
        }
        
        // Handle comparison rows for ComparisonCard
        if (card.componentName === "ComparisonCard" && props.rows) {
          if (typeof props.rows === "string") {
            processedProps.rows = props.rows.split("\n").map((row: string) => {
              const [label, left, right] = row.split(":")
              return { label: label?.trim() || "", left: left?.trim() || "", right: right?.trim() || "" }
            }).filter((r: any) => r.label)
          }
        }
        
        // Handle roadmap items for RoadmapCard
        if (card.componentName === "RoadmapCard" && props.items) {
          if (typeof props.items === "string") {
            processedProps.items = props.items.split("\n").map((item: string) => {
              const [title, status, color] = item.split(":")
              return { 
                title: title?.trim() || "", 
                status: status?.trim() || "", 
                color: color?.trim() === "green" ? "bg-green-500" : color?.trim() === "yellow" ? "bg-yellow-500" : "bg-neutral-600"
              }
            }).filter((i: any) => i.title)
          }
        }
        
        // Handle hourly forecast for WeatherCard
        if (card.componentName === "WeatherCard" && props.hourlyForecast) {
          if (typeof props.hourlyForecast === "string") {
            processedProps.hourlyForecast = props.hourlyForecast.split("\n").map((forecast: string) => {
              const [time, temp] = forecast.split(":")
              return { time: time?.trim() || "", temp: parseInt(temp?.trim() || "0") }
            }).filter((f: any) => f.time)
          }
        }

        try {
          return (
            <div className="w-full max-w-sm mx-auto">
              <Component {...processedProps} />
            </div>
          )
        } catch (error) {
          console.error(`Error rendering ${card.componentName}:`, error)
          return (
            <div className="w-full p-4 text-center text-muted-foreground">
              Error rendering component: {String(error)}
            </div>
          )
        }
      },
    }
  })

  // Add toggle sections to configs
  toggleSections.forEach((toggle) => {
    // Get Component dynamically to avoid circular dependency issues
    const Component = toggleComponentsByName[toggle.componentName]
    if (!Component) {
      console.warn(`Toggle component not found: ${toggle.componentName}. Available components:`, Object.keys(toggleComponentsByName))
      return
    }

    const propConfig = Object.fromEntries(
      Object.entries(toggle.props).map(([key, prop]) => [
        key,
        {
          type: prop.control,
          default: prop.default,
          options: prop.options,
          min: prop.min,
          max: prop.max,
        },
      ])
    )

    configs[toggle.name] = {
      props: propConfig,
      render: (props: any, setProps?: (updater: (prev: any) => any) => void) => {
        // Get Component from toggleComponentsByName (re-fetch to ensure it's available)
        const Component = toggleComponentsByName[toggle.componentName]
        
        if (!Component) {
          console.error(`Toggle component ${toggle.componentName} is not available in toggleComponentsByName. Available:`, Object.keys(toggleComponentsByName))
          return (
            <div className="w-full p-4 text-center text-muted-foreground">
              Component not found: {toggle.componentName}
            </div>
          )
        }

        // Process props that need special handling
        // Helper to convert hex to rgb
        const hexToRgb = (hex: string): string | undefined => {
          if (!hex || typeof hex !== 'string' || !hex.startsWith('#')) return hex
          try {
            const r = parseInt(hex.slice(1, 3), 16)
            const g = parseInt(hex.slice(3, 5), 16)
            const b = parseInt(hex.slice(5, 7), 16)
            if (isNaN(r) || isNaN(g) || isNaN(b)) return hex
            return `rgb(${r} ${g} ${b})`
          } catch {
            return hex
          }
        }
        
        // Build processedProps
        const processedProps: any = {}
        
        // Process all props from toggle.props definition
        Object.keys(toggle.props).forEach((key) => {
          const propConfig = toggle.props[key]
          const propValue = props[key]
          
          // Handle color props - convert hex to rgb if needed
          if (propConfig.control === "color") {
            if (propValue && typeof propValue === "string" && propValue.trim() !== "") {
              processedProps[key] = propValue.startsWith('#') ? hexToRgb(propValue) : propValue
            } else {
              processedProps[key] = undefined
            }
          }
          // Handle slider/number props
          else if (propConfig.control === "slider" || propConfig.control === "number") {
            if (propValue !== undefined && propValue !== null && propValue !== "") {
              processedProps[key] = typeof propValue === "number" ? propValue : parseFloat(String(propValue)) || propConfig.default || 0
            } else {
              processedProps[key] = propConfig.default !== undefined && propConfig.default !== null ? propConfig.default : (propConfig.min !== undefined ? propConfig.min : 0)
            }
          }
          // Handle boolean props
          else if (propConfig.control === "boolean") {
            if (propValue !== undefined && propValue !== null) {
              processedProps[key] = propValue === true || propValue === "true"
            } else {
              processedProps[key] = propConfig.default === true || propConfig.default === "true"
            }
          }
          // Handle text/textarea/select props
          else {
            if (propValue !== undefined && propValue !== null) {
              processedProps[key] = propValue
            } else {
              if (propConfig.control === "select" && propConfig.options && propConfig.options.length > 0) {
                processedProps[key] = propConfig.default !== undefined ? propConfig.default : propConfig.options[0]
              } else {
                processedProps[key] = propConfig.default !== undefined ? propConfig.default : ""
              }
            }
          }
        })
        
        // Also include any props from props that might not be in toggle.props
        Object.keys(props).forEach((key) => {
          if (!(key in processedProps) && !key.startsWith('_')) {
            processedProps[key] = props[key]
          }
        })

        try {
          return (
            <div className="w-full flex items-center justify-center p-8">
              <Component {...processedProps} />
            </div>
          )
        } catch (error) {
          console.error(`Error rendering ${toggle.componentName}:`, error)
          return (
            <div className="w-full p-4 text-center text-muted-foreground">
              Error rendering component: {String(error)}
            </div>
          )
        }
      },
    }
  })

  // Add tabs sections to configs
  tabsSections.forEach((tab) => {
    // Get Component dynamically to avoid circular dependency issues
    const Component = tabsComponentsByName[tab.componentName]
    if (!Component) {
      console.warn(`Tabs component not found: ${tab.componentName}. Available components:`, Object.keys(tabsComponentsByName))
      return
    }

    const propConfig = Object.fromEntries(
      Object.entries(tab.props).map(([key, prop]) => [
        key,
        {
          type: prop.control,
          default: prop.default,
          options: prop.options,
          min: prop.min,
          max: prop.max,
        },
      ])
    )

    configs[tab.name] = {
      props: propConfig,
      render: (props: any, setProps?: (updater: (prev: any) => any) => void) => {
        // Get Component from tabsComponentsByName (re-fetch to ensure it's available)
        const Component = tabsComponentsByName[tab.componentName]
        
        if (!Component) {
          console.error(`Tabs component ${tab.componentName} is not available in tabsComponentsByName. Available:`, Object.keys(tabsComponentsByName))
          return (
            <div className="w-full p-4 text-center text-muted-foreground">
              Component not found: {tab.componentName}
            </div>
          )
        }

        // Process props that need special handling
        // Helper to convert hex to rgb
        const hexToRgb = (hex: string): string | undefined => {
          if (!hex || typeof hex !== 'string' || !hex.startsWith('#')) return hex
          try {
            const r = parseInt(hex.slice(1, 3), 16)
            const g = parseInt(hex.slice(3, 5), 16)
            const b = parseInt(hex.slice(5, 7), 16)
            if (isNaN(r) || isNaN(g) || isNaN(b)) return hex
            return `rgb(${r} ${g} ${b})`
          } catch {
            return hex
          }
        }
        
        // Build processedProps
        const processedProps: any = {}
        
        // Process all props from tab.props definition
        Object.keys(tab.props).forEach((key) => {
          const propConfig = tab.props[key]
          const propValue = props[key]
          
          // Handle color props - convert hex to rgb if needed
          if (propConfig.control === "color") {
            if (propValue && typeof propValue === "string" && propValue.trim() !== "") {
              processedProps[key] = propValue.startsWith('#') ? hexToRgb(propValue) : propValue
            } else {
              processedProps[key] = undefined
            }
          }
          // Handle slider/number props
          else if (propConfig.control === "slider" || propConfig.control === "number") {
            if (propValue !== undefined && propValue !== null && propValue !== "") {
              processedProps[key] = typeof propValue === "number" ? propValue : parseFloat(String(propValue)) || propConfig.default || 0
            } else {
              processedProps[key] = propConfig.default !== undefined && propConfig.default !== null ? propConfig.default : (propConfig.min !== undefined ? propConfig.min : 0)
            }
          }
          // Handle boolean props
          else if (propConfig.control === "boolean") {
            if (propValue !== undefined && propValue !== null) {
              processedProps[key] = propValue === true || propValue === "true"
            } else {
              processedProps[key] = propConfig.default === true || propConfig.default === "true"
            }
          }
          // Handle text/textarea/select props
          else {
            if (propValue !== undefined && propValue !== null) {
              processedProps[key] = propValue
            } else {
              if (propConfig.control === "select" && propConfig.options && propConfig.options.length > 0) {
                processedProps[key] = propConfig.default !== undefined ? propConfig.default : propConfig.options[0]
              } else {
                processedProps[key] = propConfig.default !== undefined ? propConfig.default : ""
              }
            }
          }
        })
        
        // Also include any props from props that might not be in tab.props
        Object.keys(props).forEach((key) => {
          if (!(key in processedProps) && !key.startsWith('_')) {
            processedProps[key] = props[key]
          }
        })

        try {
          return (
            <div className="w-full flex items-center justify-center p-8">
              <Component {...processedProps} />
            </div>
          )
        } catch (error) {
          console.error(`Error rendering ${tab.componentName}:`, error)
          return (
            <div className="w-full p-4 text-center text-muted-foreground">
              Error rendering component: {String(error)}
            </div>
          )
        }
      },
    }
  })

  // Add sidebar sections to configs
  sidebarSections.forEach((sidebar) => {
    // Get Component dynamically to avoid circular dependency issues
    const Component = sidebarComponentsByName[sidebar.componentName]
    if (!Component) {
      console.warn(`Sidebar component not found: ${sidebar.componentName}. Available components:`, Object.keys(sidebarComponentsByName))
      return
    }

    const propConfig = Object.fromEntries(
      Object.entries(sidebar.props).map(([key, prop]) => [
        key,
        {
          type: prop.control,
          default: prop.default,
          options: prop.options,
          min: prop.min,
          max: prop.max,
        },
      ])
    )

    configs[sidebar.name] = {
      props: propConfig,
      render: (props: any, setProps?: (updater: (prev: any) => any) => void) => {
        // Get Component from sidebarComponentsByName (re-fetch to ensure it's available)
        const Component = sidebarComponentsByName[sidebar.componentName]
        
        if (!Component) {
          console.error(`Sidebar component ${sidebar.componentName} is not available in sidebarComponentsByName. Available:`, Object.keys(sidebarComponentsByName))
          return (
            <div className="w-full p-4 text-center text-muted-foreground">
              Component not found: {sidebar.componentName}
            </div>
          )
        }

        // Process props that need special handling
        // Helper to convert hex to rgb
        const hexToRgb = (hex: string): string | undefined => {
          if (!hex || typeof hex !== 'string' || !hex.startsWith('#')) return hex
          try {
            const r = parseInt(hex.slice(1, 3), 16)
            const g = parseInt(hex.slice(3, 5), 16)
            const b = parseInt(hex.slice(5, 7), 16)
            if (isNaN(r) || isNaN(g) || isNaN(b)) return hex
            return `rgb(${r} ${g} ${b})`
          } catch {
            return hex
          }
        }
        
        // Build processedProps
        const processedProps: any = {}
        
        // Process all props from sidebar.props definition
        Object.keys(sidebar.props).forEach((key) => {
          const propConfig = sidebar.props[key]
          const propValue = props[key]
          
          // Handle color props - convert hex to rgb if needed
          if (propConfig.control === "color") {
            if (propValue && typeof propValue === "string" && propValue.trim() !== "") {
              processedProps[key] = propValue.startsWith('#') ? hexToRgb(propValue) : propValue
            } else {
              processedProps[key] = undefined
            }
          }
          // Handle slider/number props
          else if (propConfig.control === "slider" || propConfig.control === "number") {
            if (propValue !== undefined && propValue !== null && propValue !== "") {
              processedProps[key] = typeof propValue === "number" ? propValue : parseFloat(String(propValue)) || propConfig.default || 0
            } else {
              processedProps[key] = propConfig.default !== undefined && propConfig.default !== null ? propConfig.default : (propConfig.min !== undefined ? propConfig.min : 0)
            }
          }
          // Handle boolean props
          else if (propConfig.control === "boolean") {
            if (propValue !== undefined && propValue !== null) {
              processedProps[key] = propValue === true || propValue === "true"
            } else {
              processedProps[key] = propConfig.default === true || propConfig.default === "true"
            }
          }
          // Handle text/textarea/select props
          else {
            if (propValue !== undefined && propValue !== null) {
              processedProps[key] = propValue
            } else {
              if (propConfig.control === "select" && propConfig.options && propConfig.options.length > 0) {
                processedProps[key] = propConfig.default !== undefined ? propConfig.default : propConfig.options[0]
              } else {
                processedProps[key] = propConfig.default !== undefined ? propConfig.default : ""
              }
            }
          }
        })
        
        // Also include any props from props that might not be in sidebar.props
        Object.keys(props).forEach((key) => {
          if (!(key in processedProps) && !key.startsWith('_')) {
            processedProps[key] = props[key]
          }
        })

        try {
          return (
            <div className="w-full">
              <Component {...processedProps} />
            </div>
          )
        } catch (error) {
          console.error(`Error rendering ${sidebar.componentName}:`, error)
          return (
            <div className="w-full p-4 text-center text-muted-foreground">
              Error rendering component: {String(error)}
            </div>
          )
        }
      },
    }
  })

  // Add tabbar sections to configs
  tabbarSections.forEach((tabbar) => {
    // Get Component dynamically to avoid circular dependency issues
    const Component = tabbarComponentsByName[tabbar.componentName]
    if (!Component) {
      console.warn(`Tabbar component not found: ${tabbar.componentName}. Available components:`, Object.keys(tabbarComponentsByName))
      return
    }

    const propConfig = Object.fromEntries(
      Object.entries(tabbar.props).map(([key, prop]) => [
        key,
        {
          type: prop.control,
          default: prop.default,
          options: prop.options,
          min: prop.min,
          max: prop.max,
        },
      ])
    )

    configs[tabbar.name] = {
      props: propConfig,
      render: (props: any, setProps?: (updater: (prev: any) => any) => void) => {
        // Get Component from tabbarComponentsByName (re-fetch to ensure it's available)
        const Component = tabbarComponentsByName[tabbar.componentName]
        
        if (!Component) {
          console.error(`Tabbar component ${tabbar.componentName} is not available in tabbarComponentsByName. Available:`, Object.keys(tabbarComponentsByName))
          return (
            <div className="w-full p-4 text-center text-muted-foreground">
              Component not found: {tabbar.componentName}
            </div>
          )
        }

        // Process props that need special handling
        // Helper to convert hex to rgb
        const hexToRgb = (hex: string): string | undefined => {
          if (!hex || typeof hex !== 'string' || !hex.startsWith('#')) return hex
          try {
            const r = parseInt(hex.slice(1, 3), 16)
            const g = parseInt(hex.slice(3, 5), 16)
            const b = parseInt(hex.slice(5, 7), 16)
            if (isNaN(r) || isNaN(g) || isNaN(b)) return hex
            return `rgb(${r} ${g} ${b})`
          } catch {
            return hex
          }
        }
        
        // Build processedProps
        const processedProps: any = {}
        
        // Process all props from tabbar.props definition
        Object.keys(tabbar.props).forEach((key) => {
          const propConfig = tabbar.props[key]
          const propValue = props[key]
          
          // Handle color props - convert hex to rgb if needed
          if (propConfig.control === "color") {
            if (propValue && typeof propValue === "string" && propValue.trim() !== "") {
              processedProps[key] = propValue.startsWith('#') ? hexToRgb(propValue) : propValue
            } else {
              processedProps[key] = undefined
            }
          }
          // Handle slider/number props
          else if (propConfig.control === "slider" || propConfig.control === "number") {
            if (propValue !== undefined && propValue !== null && propValue !== "") {
              processedProps[key] = typeof propValue === "number" ? propValue : parseFloat(String(propValue)) || propConfig.default || 0
            } else {
              processedProps[key] = propConfig.default !== undefined && propConfig.default !== null ? propConfig.default : (propConfig.min !== undefined ? propConfig.min : 0)
            }
          }
          // Handle boolean props
          else if (propConfig.control === "boolean") {
            if (propValue !== undefined && propValue !== null) {
              processedProps[key] = propValue === true || propValue === "true"
            } else {
              processedProps[key] = propConfig.default === true || propConfig.default === "true"
            }
          }
          // Handle text/textarea/select props
          else {
            if (propValue !== undefined && propValue !== null) {
              processedProps[key] = propValue
            } else {
              if (propConfig.control === "select" && propConfig.options && propConfig.options.length > 0) {
                processedProps[key] = propConfig.default !== undefined ? propConfig.default : propConfig.options[0]
              } else {
                processedProps[key] = propConfig.default !== undefined ? propConfig.default : ""
              }
            }
          }
        })
        
        // Also include any props from props that might not be in tabbar.props
        Object.keys(props).forEach((key) => {
          if (!(key in processedProps) && !key.startsWith('_')) {
            processedProps[key] = props[key]
          }
        })

        try {
          return (
            <div className="w-full">
              <Component {...processedProps} />
            </div>
          )
        } catch (error) {
          console.error(`Error rendering ${tabbar.componentName}:`, error)
          return (
            <div className="w-full p-4 text-center text-muted-foreground">
              Error rendering component: {String(error)}
            </div>
          )
        }
      },
    }
  })

  // Add sheet sections to configs
  sheetSections.forEach((sheet) => {
    // Get Component dynamically to avoid circular dependency issues
    const Component = sheetComponentsByName[sheet.componentName]
    if (!Component) {
      console.warn(`Sheet component not found: ${sheet.componentName}. Available components:`, Object.keys(sheetComponentsByName))
      return
    }

    const propConfig = Object.fromEntries(
      Object.entries(sheet.props).map(([key, prop]) => [
        key,
        {
          type: prop.control,
          default: prop.default,
          options: prop.options,
          min: prop.min,
          max: prop.max,
        },
      ])
    )

    configs[sheet.name] = {
      props: propConfig,
      render: (props: any, setProps?: (updater: (prev: any) => any) => void) => {
        // Get Component from sheetComponentsByName (re-fetch to ensure it's available)
        const Component = sheetComponentsByName[sheet.componentName]
        
        if (!Component) {
          console.error(`Sheet component ${sheet.componentName} is not available in sheetComponentsByName. Available:`, Object.keys(sheetComponentsByName))
          return (
            <div className="w-full p-4 text-center text-muted-foreground">
              Component not found: {sheet.componentName}
            </div>
          )
        }

        // Process props that need special handling
        // Helper to convert hex to rgb
        const hexToRgb = (hex: string): string | undefined => {
          if (!hex || typeof hex !== 'string' || !hex.startsWith('#')) return hex
          try {
            const r = parseInt(hex.slice(1, 3), 16)
            const g = parseInt(hex.slice(3, 5), 16)
            const b = parseInt(hex.slice(5, 7), 16)
            if (isNaN(r) || isNaN(g) || isNaN(b)) return hex
            return `rgb(${r} ${g} ${b})`
          } catch {
            return hex
          }
        }

        const processedProps: Record<string, any> = {}
        Object.keys(propConfig).forEach((key) => {
          const propConfigItem = propConfig[key]
          const propValue = props[key]

          // Handle color props - convert hex to rgb
          if (propConfigItem.type === "color") {
            if (propValue && typeof propValue === "string" && propValue.trim() !== "") {
              processedProps[key] = propValue.startsWith('#') 
                ? hexToRgb(propValue) 
                : propValue
            } else {
              processedProps[key] = undefined
            }
          }
          // Handle slider/number props - convert to number
          else if (propConfigItem.type === "slider" || propConfigItem.type === "number") {
            processedProps[key] = propValue !== undefined && propValue !== "" 
              ? Number(propValue) 
              : (propConfigItem.default !== undefined ? Number(propConfigItem.default) : undefined)
          }
          // Handle boolean props
          else if (propConfigItem.type === "boolean") {
            processedProps[key] = propValue === true || propValue === "true"
          }
          // Handle text/textarea props - ensure string
          else if (propConfigItem.type === "text" || propConfigItem.type === "textarea") {
            processedProps[key] = propValue !== undefined ? String(propValue) : (propConfigItem.default !== undefined ? String(propConfigItem.default) : "")
          }
          // Handle select props
          else if (propConfigItem.type === "select") {
            processedProps[key] = propValue !== undefined ? propValue : (propConfigItem.default !== undefined ? propConfigItem.default : "")
          }
          // Default: pass through
          else {
            processedProps[key] = props[key]
          }
        })

        try {
          return (
            <div className="w-full flex items-center justify-center">
              <Component {...processedProps} />
            </div>
          )
        } catch (error) {
          console.error(`Error rendering ${sheet.componentName}:`, error)
          return (
            <div className="w-full p-4 text-center text-muted-foreground">
              Error rendering component: {String(error)}
            </div>
          )
        }
      },
    }
  })

  // Add table sections to configs
  tableSections.forEach((table) => {
    const Component = tableComponentsByName[table.componentName]
    if (!Component) {
      console.warn(`Table component not found: ${table.componentName}. Available components:`, Object.keys(tableComponentsByName))
      return
    }

    const propConfig = Object.fromEntries(
      Object.entries(table.props).map(([key, prop]) => [
        key,
        {
          type: prop.control,
          default: prop.default,
          options: prop.options,
          min: prop.min,
          max: prop.max,
        },
      ])
    )

    configs[table.name] = {
      props: propConfig,
      render: (props: any, setProps?: (updater: (prev: any) => any) => void) => {
        const Component = tableComponentsByName[table.componentName]
        
        if (!Component) {
          return (
            <div className="w-full p-4 text-center text-muted-foreground">
              Component not found: {table.componentName}
            </div>
          )
        }

        // Helper to convert hex to rgb
        const hexToRgb = (hex: string): string | undefined => {
          if (!hex || typeof hex !== 'string' || !hex.startsWith('#')) return hex
          try {
            const r = parseInt(hex.slice(1, 3), 16)
            const g = parseInt(hex.slice(3, 5), 16)
            const b = parseInt(hex.slice(5, 7), 16)
            if (isNaN(r) || isNaN(g) || isNaN(b)) return hex
            return `rgb(${r} ${g} ${b})`
          } catch {
            return hex
          }
        }
        
        const processedProps: any = {}
        
        Object.keys(table.props).forEach((key) => {
          const propConfig = table.props[key]
          const propValue = props[key]
          
          // Handle color props - convert hex to rgb if needed
          if (propConfig.control === "color") {
            if (propValue && typeof propValue === "string" && propValue.trim() !== "") {
              processedProps[key] = propValue.startsWith('#') ? hexToRgb(propValue) : propValue
            } else {
              processedProps[key] = undefined
            }
          }
          // Handle slider/number props
          else if (propConfig.control === "slider" || propConfig.control === "number") {
            if (propValue !== undefined && propValue !== null && propValue !== "") {
              processedProps[key] = typeof propValue === "number" ? propValue : parseFloat(String(propValue)) || propConfig.default || 0
            } else {
              processedProps[key] = propConfig.default !== undefined && propConfig.default !== null ? propConfig.default : (propConfig.min !== undefined ? propConfig.min : 0)
            }
          }
          // Handle boolean props
          else if (propConfig.control === "boolean") {
            processedProps[key] = propValue === true || propValue === "true"
          }
          // Handle text/textarea/select props
          else {
            processedProps[key] = propValue !== undefined && propValue !== null ? propValue : (propConfig.default !== undefined ? propConfig.default : "")
          }
        })

        // Add editable support for all table components
        if (setProps) {
          processedProps.editable = true
          
          // For tables with title prop
          if (table.props.title) {
            processedProps.onTitleChange = (text: string) => {
              setProps((prev: any) => ({ ...prev, title: text }))
            }
          }
          
          // For tables with headers prop
          if (table.props.headers) {
            processedProps.onHeaderChange = (index: number, text: string) => {
              setProps((prev: any) => {
                const currentHeaders = (prev.headers || table.props.headers?.default || "").split("\n").filter((h: string) => h.trim() !== "")
                currentHeaders[index] = text
                return { ...prev, headers: currentHeaders.join("\n") }
              })
            }
          }
          
          // For cell changes - we'll enable editing but cell data is managed by component internally
          // The component will handle cell editing through onCellChange callback
          processedProps.onCellChange = (rowIndex: number, colIndex: number, text: string) => {
            // For now, we'll just log the change
            // In a full implementation, you might want to store cell data in props
            console.log(`Cell [${rowIndex}, ${colIndex}] changed to: ${text}`)
          }
        }

        try {
          return (
            <div className="w-full">
              <Component {...processedProps} />
            </div>
          )
        } catch (error) {
          console.error(`Error rendering ${table.componentName}:`, error)
          return (
            <div className="w-full p-4 text-center text-muted-foreground">
              Error rendering component: {String(error)}
            </div>
          )
        }
      },
    }
  })

  // Add chart sections to configs
  chartSections.forEach((chart) => {
    const Component = chartComponentsByName[chart.componentName]
    if (!Component) {
      console.warn(`Chart component not found: ${chart.componentName}. Available components:`, Object.keys(chartComponentsByName))
      return
    }

    const propConfig = Object.fromEntries(
      Object.entries(chart.props).map(([key, prop]) => [
        key,
        {
          type: prop.control,
          default: prop.default,
          options: prop.options,
          min: prop.min,
          max: prop.max,
        },
      ])
    )

    configs[chart.name] = {
      props: propConfig,
      render: (props: any, setProps?: (updater: (prev: any) => any) => void) => {
        const Component = chartComponentsByName[chart.componentName]
        
        if (!Component) {
          return (
            <div className="w-full p-4 text-center text-muted-foreground">
              Component not found: {chart.componentName}
            </div>
          )
        }

        // Helper to convert hex to rgb
        const hexToRgb = (hex: string): string | undefined => {
          if (!hex || typeof hex !== 'string' || !hex.startsWith('#')) return hex
          try {
            const r = parseInt(hex.slice(1, 3), 16)
            const g = parseInt(hex.slice(3, 5), 16)
            const b = parseInt(hex.slice(5, 7), 16)
            if (isNaN(r) || isNaN(g) || isNaN(b)) return hex
            return `rgb(${r} ${g} ${b})`
          } catch {
            return hex
          }
        }
        
        const processedProps: any = {}
        
        Object.keys(chart.props).forEach((key) => {
          const propConfig = chart.props[key]
          const propValue = props[key]
          
          // Handle color props - convert hex to rgb if needed
          if (propConfig.control === "color") {
            if (propValue && typeof propValue === "string" && propValue.trim() !== "") {
              processedProps[key] = propValue.startsWith('#') ? hexToRgb(propValue) : propValue
            } else {
              processedProps[key] = undefined
            }
          }
          // Handle slider/number props
          else if (propConfig.control === "slider" || propConfig.control === "number") {
            if (propValue !== undefined && propValue !== null && propValue !== "") {
              processedProps[key] = typeof propValue === "number" ? propValue : parseFloat(String(propValue)) || propConfig.default || 0
            } else {
              processedProps[key] = propConfig.default !== undefined && propConfig.default !== null ? propConfig.default : (propConfig.min !== undefined ? propConfig.min : 0)
            }
          }
          // Handle boolean props
          else if (propConfig.control === "boolean") {
            processedProps[key] = propValue === true || propValue === "true"
          }
          // Handle text/textarea/select props
          else {
            processedProps[key] = propValue !== undefined && propValue !== null ? propValue : (propConfig.default !== undefined ? propConfig.default : "")
          }
        })

        // Add editable support for charts
        if (setProps) {
          processedProps.editable = true
          
          // Special handling for SparklineStat (has label and value instead of title)
          if (chart.componentName === "SparklineStat") {
            processedProps.onLabelChange = (text: string) => {
              setProps((prev: any) => ({ ...prev, label: text }))
            }
            processedProps.onValueChange = (text: string) => {
              setProps((prev: any) => ({ ...prev, value: text }))
            }
            // Also provide onTitleChange as fallback
            processedProps.onTitleChange = (text: string) => {
              // Try to determine which field to update
              setProps((prev: any) => {
                // If label matches current value, update value
                if (prev.label === text) {
                  return { ...prev, value: text }
                }
                // Otherwise update label
                return { ...prev, label: text }
              })
            }
          } else {
            // For other charts, update title
            processedProps.onTitleChange = (text: string) => {
              setProps((prev: any) => ({ ...prev, title: text }))
            }
          }
        }

        try {
          return (
            <div className="w-full">
              <Component {...processedProps} />
            </div>
          )
        } catch (error) {
          console.error(`Error rendering ${chart.componentName}:`, error)
          return (
            <div className="w-full p-4 text-center text-muted-foreground">
              Error rendering component: {String(error)}
            </div>
          )
        }
      },
    }
  })

  return configs
})()

interface PlaygroundProps {
  componentName: string
  slug: string
  initialCode?: string
}

export function ComponentPlayground({ componentName, slug, initialCode }: PlaygroundProps) {
  // Try to find config by componentName first
  let config = componentConfigs[componentName]
  let actualComponentName = componentName
  
  // If not found, try to find by slug (for badge components)
  if (!config) {
    const badgeMeta = badgeSections.find(b => b.slug === slug)
    if (badgeMeta) {
      config = componentConfigs[badgeMeta.name]
      if (config) {
        // Update componentName to match the config key
        actualComponentName = badgeMeta.name
        console.log(`Found badge config by slug: ${slug} -> ${badgeMeta.name}`)
      } else {
        console.warn(`Badge meta found but config not found: ${badgeMeta.name}. Available configs:`, Object.keys(componentConfigs).slice(0, 10))
      }
    }

    const inputMeta = inputSections.find(i => i.slug === slug)
    if (inputMeta) {
      config = componentConfigs[inputMeta.name]
      if (config) {
        // Update componentName to match the config key
        actualComponentName = inputMeta.name
        console.log(`Found input config by slug: ${slug} -> ${inputMeta.name}`)
      } else {
        console.warn(`Input meta found but config not found: ${inputMeta.name}. Available configs:`, Object.keys(componentConfigs).slice(0, 10))
      }
    }

    const toggleMeta = toggleSections.find(t => t.slug === slug)
    if (toggleMeta) {
      config = componentConfigs[toggleMeta.name]
      if (config) {
        // Update componentName to match the config key
        actualComponentName = toggleMeta.name
        console.log(`Found toggle config by slug: ${slug} -> ${toggleMeta.name}`)
      } else {
        console.warn(`Toggle meta found but config not found: ${toggleMeta.name}. Available configs:`, Object.keys(componentConfigs).slice(0, 10))
      }
    }

    const tabsMeta = tabsSections.find(t => t.slug === slug)
    if (tabsMeta) {
      config = componentConfigs[tabsMeta.name]
      if (config) {
        // Update componentName to match the config key
        actualComponentName = tabsMeta.name
        console.log(`Found tabs config by slug: ${slug} -> ${tabsMeta.name}`)
      } else {
        console.warn(`Tabs meta found but config not found: ${tabsMeta.name}. Available configs:`, Object.keys(componentConfigs).slice(0, 10))
      }
    }

    const sidebarMeta = sidebarSections.find(s => s.slug === slug)
    if (sidebarMeta) {
      config = componentConfigs[sidebarMeta.name]
      if (config) {
        // Update componentName to match the config key
        actualComponentName = sidebarMeta.name
        console.log(`Found sidebar config by slug: ${slug} -> ${sidebarMeta.name}`)
      } else {
        console.warn(`Sidebar meta found but config not found: ${sidebarMeta.name}. Available configs:`, Object.keys(componentConfigs).slice(0, 10))
      }
    }

    const tabbarMeta = tabbarSections.find(t => t.slug === slug)
    if (tabbarMeta) {
      config = componentConfigs[tabbarMeta.name]
      if (config) {
        // Update componentName to match the config key
        actualComponentName = tabbarMeta.name
        console.log(`Found tabbar config by slug: ${slug} -> ${tabbarMeta.name}`)
      } else {
        console.warn(`Tabbar meta found but config not found: ${tabbarMeta.name}. Available configs:`, Object.keys(componentConfigs).slice(0, 10))
      }
    }

    const sheetMeta = sheetSections.find(s => s.slug === slug)
    if (sheetMeta) {
      config = componentConfigs[sheetMeta.name]
      if (config) {
        // Update componentName to match the config key
        actualComponentName = sheetMeta.name
        console.log(`Found sheet config by slug: ${slug} -> ${sheetMeta.name}`)
      } else {
        console.warn(`Sheet meta found but config not found: ${sheetMeta.name}. Available configs:`, Object.keys(componentConfigs).slice(0, 10))
      }
    }
  }
  
  // If not found, try to find by slug (for card components)
  if (!config) {
    const cardMeta = cardSections.find(c => c.slug === slug)
    if (cardMeta) {
      config = componentConfigs[cardMeta.name]
      if (config) {
        // Update componentName to match the config key
        actualComponentName = cardMeta.name
        console.log(`Found card config by slug: ${slug} -> ${cardMeta.name}`)
      } else {
        console.warn(`Card meta found but config not found: ${cardMeta.name}. Available configs:`, Object.keys(componentConfigs).slice(0, 10))
      }
    }
  }
  
  if (!config) {
    console.warn(`Component config not found for: ${componentName} (slug: ${slug}). Available card configs:`, Object.keys(componentConfigs).filter(k => k.includes('Card')).slice(0, 10))
  }

  const heroMeta = heroNameToMeta[actualComponentName]
  const featureMeta = featureNameToMeta[actualComponentName]
  const paymentMeta = paymentNameToMeta[actualComponentName]
  const ctaMeta = ctaNameToMeta[actualComponentName]
  const footerMeta = footerNameToMeta[actualComponentName]
  const headerMeta = headerNameToMeta[actualComponentName]
  const buttonMeta = buttonNameToMeta[actualComponentName]
  // For badge components, find by slug if not found by componentName
  let badgeMeta = badgeNameToMeta[actualComponentName]
  if (!badgeMeta) {
    const badgeMetaBySlug = badgeSections.find(b => b.slug === slug)
    if (badgeMetaBySlug) {
      badgeMeta = badgeNameToMeta[badgeMetaBySlug.name]
    }
  }
  // For input components, find by slug if not found by componentName
  let inputMeta = inputNameToMeta[actualComponentName]
  if (!inputMeta) {
    const inputMetaBySlug = inputSections.find(i => i.slug === slug)
    if (inputMetaBySlug) {
      inputMeta = inputNameToMeta[inputMetaBySlug.name]
    }
  }
  
  let cardMeta = cardNameToMeta[actualComponentName]
  if (!cardMeta) {
    const cardMetaBySlug = cardSections.find(c => c.slug === slug)
    if (cardMetaBySlug) {
      cardMeta = cardNameToMeta[cardMetaBySlug.name]
    }
  }
  // For dialog components, find by slug if not found by componentName
  let dialogMeta = dialogNameToMeta[actualComponentName]
  if (!dialogMeta) {
    const dialogMetaBySlug = dialogSections.find(d => d.slug === slug)
    if (dialogMetaBySlug) {
      dialogMeta = dialogNameToMeta[dialogMetaBySlug.name]
    }
  }
  // For toggle components, find by slug if not found by componentName
  let toggleMeta = toggleNameToMeta[actualComponentName]
  if (!toggleMeta) {
    const toggleMetaBySlug = toggleSections.find(t => t.slug === slug)
    if (toggleMetaBySlug) {
      toggleMeta = toggleNameToMeta[toggleMetaBySlug.name]
    }
  }

  // For tabs components, find by slug if not found by componentName
  let tabsMeta = tabsNameToMeta[actualComponentName]
  if (!tabsMeta) {
    const tabsMetaBySlug = tabsSections.find(t => t.slug === slug)
    if (tabsMetaBySlug) {
      tabsMeta = tabsNameToMeta[tabsMetaBySlug.name]
    }
  }

  // For sidebar components, find by slug if not found by componentName
  let sidebarMeta = sidebarNameToMeta[actualComponentName]
  if (!sidebarMeta) {
    const sidebarMetaBySlug = sidebarSections.find(s => s.slug === slug)
    if (sidebarMetaBySlug) {
      sidebarMeta = sidebarNameToMeta[sidebarMetaBySlug.name]
    }
  }

  // For tabbar components, find by slug if not found by componentName
  let tabbarMeta = tabbarNameToMeta[actualComponentName]
  if (!tabbarMeta) {
    const tabbarMetaBySlug = tabbarSections.find(t => t.slug === slug)
    if (tabbarMetaBySlug) {
      tabbarMeta = tabbarNameToMeta[tabbarMetaBySlug.name]
    }
  }

  // For table components, find by slug if not found by componentName
  let tableMeta = tableNameToMeta[actualComponentName]
  if (!tableMeta) {
    const tableMetaBySlug = tableSections.find(t => t.slug === slug)
    if (tableMetaBySlug) {
      tableMeta = tableNameToMeta[tableMetaBySlug.name]
    }
  }

  // For chart components, find by slug if not found by componentName
  let chartMeta = chartNameToMeta[actualComponentName]
  if (!chartMeta) {
    const chartMetaBySlug = chartSections.find(c => c.slug === slug)
    if (chartMetaBySlug) {
      chartMeta = chartNameToMeta[chartMetaBySlug.name]
    }
  }

  const [copied, setCopied] = React.useState(false)
  const [showSidebar, setShowSidebar] = React.useState(true)

  const [props, setProps] = React.useState<Record<string, any>>(() => {
    if (!config) return {}
    const initialProps: Record<string, any> = {}
    Object.entries(config.props).forEach(([key, propConfig]: [string, any]) => {
      // Ensure boolean defaults are properly set
      if (propConfig.type === "boolean") {
        initialProps[key] = propConfig.default === true || propConfig.default === "true"
      } else if (propConfig.type === "text" || propConfig.type === "textarea") {
        // Ensure text inputs always have a string value (never undefined)
        initialProps[key] = propConfig.default || ""
      } else if (propConfig.type === "select") {
        // Ensure select always has a value
        initialProps[key] = propConfig.default || propConfig.options?.[0] || ""
      } else if (propConfig.type === "color" ||
        propConfig.type === "color-tailwind-bg" ||
        propConfig.type === "color-tailwind-text" ||
        propConfig.type === "color-tailwind-border" ||
        propConfig.type === "color-tailwind-gradient") {
        // Ensure color inputs always have a string value (never undefined)
        initialProps[key] = propConfig.default || ""
      } else if (propConfig.type === "slider") {
        // Ensure slider always has a number value
        initialProps[key] = propConfig.default !== undefined && propConfig.default !== null ? propConfig.default : (propConfig.min !== undefined ? propConfig.min : 0)
      } else if (propConfig.type === "number") {
        // Ensure number always has a number value
        initialProps[key] = propConfig.default !== undefined && propConfig.default !== null ? propConfig.default : 0
      } else {
        initialProps[key] = propConfig.default !== undefined ? propConfig.default : ""
      }
    })
    return initialProps
  })

  // Set CSS variable colors as hex for color pickers after mount
  React.useEffect(() => {
    if (!config || componentName !== 'UrlInput') return

    // Helper function to get CSS variable value and convert to hex
    const getCssVarAsHex = (varName: string, fallback: string = '#000000'): string => {
      if (typeof window === 'undefined') return fallback
      try {
        const tempEl = document.createElement('div')
        tempEl.style.color = `var(${varName})`
        tempEl.style.position = 'absolute'
        tempEl.style.visibility = 'hidden'
        tempEl.style.pointerEvents = 'none'
        document.body.appendChild(tempEl)
        const rgb = getComputedStyle(tempEl).color
        document.body.removeChild(tempEl)

        // Convert rgb(r, g, b) or rgba(r, g, b, a) to hex
        const match = rgb.match(/\d+/g)
        if (match && match.length >= 3) {
          const r = Math.min(255, Math.max(0, parseInt(match[0]))).toString(16).padStart(2, '0')
          const g = Math.min(255, Math.max(0, parseInt(match[1]))).toString(16).padStart(2, '0')
          const b = Math.min(255, Math.max(0, parseInt(match[2]))).toString(16).padStart(2, '0')
          const hex = `#${r}${g}${b}`
          // Validate hex format
          if (/^#[0-9A-Fa-f]{6}$/.test(hex)) {
            return hex
          }
        }
      } catch (e) {
        // Fallback on error
      }
      return fallback
    }

    setProps((prev) => {
      const updated = { ...prev }
      // Only update if the value is empty string (default) or invalid format
      if (!prev.gradientFrom || prev.gradientFrom === '' || !/^#[0-9A-Fa-f]{6}$/.test(prev.gradientFrom)) {
        updated.gradientFrom = getCssVarAsHex('--primary', '#171717')
      }
      if (!prev.gradientTo || prev.gradientTo === '' || !/^#[0-9A-Fa-f]{6}$/.test(prev.gradientTo)) {
        updated.gradientTo = getCssVarAsHex('--accent', '#f5f5f5')
      }
      return updated
    })
  }, [config, componentName])

  // Extract actual colors from rendered button component after mount
  const playgroundRef = React.useRef<HTMLDivElement>(null)
  React.useEffect(() => {
    if (!config || !buttonMeta || typeof window === 'undefined') return

    // Wait for component to render
    const timeoutId = setTimeout(() => {
      if (!playgroundRef.current) return

      // Find the rendered button element
      const buttonElement = playgroundRef.current.querySelector('button')
      if (!buttonElement) return

      const computedStyle = window.getComputedStyle(buttonElement)

      // Helper to convert rgb/rgba to hex
      const rgbToHex = (rgb: string): string | null => {
        if (!rgb || rgb === 'rgba(0, 0, 0, 0)' || rgb === 'transparent') return null
        const match = rgb.match(/\d+/g)
        if (match && match.length >= 3) {
          const r = Math.min(255, Math.max(0, parseInt(match[0]))).toString(16).padStart(2, '0')
          const g = Math.min(255, Math.max(0, parseInt(match[1]))).toString(16).padStart(2, '0')
          const b = Math.min(255, Math.max(0, parseInt(match[2]))).toString(16).padStart(2, '0')
          const hex = `#${r}${g}${b}`
          if (/^#[0-9A-Fa-f]{6}$/.test(hex)) {
            return hex
          }
        }
        return null
      }

      setProps((prev) => {
        const updated = { ...prev }
        let hasChanges = false
        
        // Only update if the value is empty (default) and hasn't been set yet
        if ((!prev.backgroundColor || prev.backgroundColor === '') && !prev._colorsExtracted) {
          const bgColor = computedStyle.backgroundColor
          const bgHex = rgbToHex(bgColor)
          // Only set if it's a valid color and not transparent/black
          if (bgHex && bgHex !== '#000000' && bgColor !== 'rgba(0, 0, 0, 0)' && bgColor !== 'transparent') {
            updated.backgroundColor = bgHex
            hasChanges = true
          }
        }

        if ((!prev.textColor || prev.textColor === '') && !prev._colorsExtracted) {
          const textColor = computedStyle.color
          const textHex = rgbToHex(textColor)
          if (textHex && textHex !== '#000000') {
            updated.textColor = textHex
            hasChanges = true
          }
        }

        if ((!prev.borderColor || prev.borderColor === '') && !prev._colorsExtracted) {
          const borderColor = computedStyle.borderColor
          const borderWidth = computedStyle.borderWidth
          if (borderWidth !== '0px' && borderColor !== 'rgba(0, 0, 0, 0)') {
            const borderHex = rgbToHex(borderColor)
            if (borderHex && borderHex !== '#000000') {
              updated.borderColor = borderHex
              hasChanges = true
            }
          }
        }

        // Mark as extracted to prevent re-extraction
        if (hasChanges) {
          updated._colorsExtracted = true
        }

        return hasChanges ? updated : prev
      })
    }, 300) // Delay to ensure component is fully rendered

    return () => clearTimeout(timeoutId)
  }, [config, componentName, buttonMeta])

  const updateProp = (key: string, value: any) => {
    setProps((prev) => {
      const updated = { ...prev, [key]: value }

      // If totalTime changes, automatically update progress for MediaPlayer (if progress exists)
      if (componentName === "MediaPlayer" && key === "totalTime" && updated.progress !== undefined) {
        // Progress is already set, no need to recalculate
      }

      return updated
    })
  }

  const generateCode = () => {
    if (!config) return ""

    // For CTA and Footer sections, show all props including defaults
    const shouldShowAllProps = ctaMeta || footerMeta || buttonMeta

    const propsString = Object.entries(props)
      .filter(([key, value]) => {
        if (key === "enableHoverTilt") return false
        const propConfig = config.props[key]
        if (shouldShowAllProps) {
          // Show all props for CTA and Footer sections
          return value !== undefined && value !== ""
        }
        // For other components, only show non-default props
        return value !== propConfig.default && value !== undefined && value !== ""
      })
      .map(([key, value]) => {
        if (typeof value === "boolean") {
          if (shouldShowAllProps) {
            // For CTA and Footer, always show boolean props
            return `${key}={${value}}`
          }
          // For other components, only show true booleans
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
      return `import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export default function AccordionExample() {
  return (
    <Accordion${propsString ? " " + propsString : ""}>
      <AccordionItem value="item-1">
        <AccordionTrigger className="text-xl py-6">Is it accessible?</AccordionTrigger>
        <AccordionContent className="text-lg pb-6">
          Yes. It adheres to the WAI-ARIA design pattern.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger className="text-xl py-6">Is it styled?</AccordionTrigger>
        <AccordionContent className="text-lg pb-6">
          Yes. It comes with default styles that you can override.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger className="text-xl py-6">Is it animated?</AccordionTrigger>
        <AccordionContent className="text-lg pb-6">
          Yes. It's animated by default, but you can disable it if you prefer.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}`
    }

    if (componentName === "Dialog") {
      return `import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

export default function DialogExample() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="text-xl px-8 py-6 h-auto">Open Dialog</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-3xl p-10">
        <DialogHeader>
          <DialogTitle className="text-3xl">${props.title || "Dialog Title"}</DialogTitle>
          <DialogDescription className="text-lg mt-4">${props.description || "Dialog description goes here."}</DialogDescription>
        </DialogHeader>
        <DialogFooter className="mt-8 gap-4">
          <Button variant="outline" className="text-lg px-6 py-5 h-auto">Cancel</Button>
          <Button className="text-lg px-6 py-5 h-auto">Continue</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}`
    }

    if (componentName === "Dropdown Menu") {
      const itemCount = props.itemCount || 3
      return `import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function DropdownMenuExample() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="text-xl px-8 py-6 h-auto">${props.triggerText || "Open Menu"}</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-80">
        ${Array.from({ length: itemCount }).map((_, i) => `        <DropdownMenuItem key={${i}} className="text-lg py-4 px-4">Item ${i + 1}</DropdownMenuItem>`).join("\n")}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}`
    }

    if (componentName === "Label") {
      return `import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

export default function LabelExample() {
  return (
    <div className="space-y-4">
      <Label htmlFor="email" className="text-xl">
        ${props.text || "Email"}
        ${props.required ? '<span className="text-destructive ml-1">*</span>' : ''}
      </Label>
      <Input id="email" type="email" placeholder="m@example.com" className="text-xl h-16 px-6" />
    </div>
  )
}`
    }

    if (componentName === "Select") {
      return `import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export default function SelectExample() {
  return (
    <Select disabled={${props.disabled || false}}>
      <SelectTrigger className="w-[560px] text-xl h-16 px-6" style={{ borderRadius: "${props.borderRadius || 8}px" }}>
        <SelectValue placeholder="${props.placeholder || "Select a fruit"}" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="apple" className="text-xl py-4">Apple</SelectItem>
        <SelectItem value="banana" className="text-xl py-4">Banana</SelectItem>
        <SelectItem value="orange" className="text-xl py-4">Orange</SelectItem>
        <SelectItem value="grape" className="text-xl py-4">Grape</SelectItem>
      </SelectContent>
    </Select>
  )
}`
    }

    if (componentName === "Separator") {
      const orientation = props.orientation || "horizontal"
      return `import { Separator } from "@/components/ui/separator"

export default function SeparatorExample() {
  return (
    <div className="${orientation === "horizontal" ? "w-full space-y-8" : "flex h-40 space-x-8"}">
      <div className="${orientation === "horizontal" ? "space-y-2" : "space-y-2"}">
        <h4 className="text-xl font-medium leading-none">Radix Primitives</h4>
        <p className="text-lg text-muted-foreground">An open-source UI component library.</p>
      </div>
      <Separator orientation="${orientation}" className="${orientation === "horizontal" ? "h-[2px]" : "w-[2px]"}" />
      <div className="${orientation === "horizontal" ? "space-y-2" : "space-y-2"}">
        <h4 className="text-xl font-medium leading-none">Shadcn UI</h4>
        <p className="text-lg text-muted-foreground">Beautifully designed components.</p>
      </div>
    </div>
  )
}`
    }

    if (componentName === "Skeleton") {
      const count = props.count || 3
      const height = props.height || 20
      return `import { Skeleton } from "@/components/ui/skeleton"

export default function SkeletonExample() {
  return (
    <div className="space-y-6 w-full max-w-3xl">
      ${Array.from({ length: count }).map((_, i) => `      <Skeleton key={${i}} style={{ height: "${height * 2}px" }} className="w-full" />`).join("\n")}
    </div>
  )
}`
    }

    if (componentName === "Tabs") {
      const tabCount = props.tabCount || 3
      const defaultValue = props.defaultValue || "tab1"
      return `import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function TabsExample() {
  return (
    <Tabs defaultValue="${defaultValue}" className="w-[800px]">
      <TabsList className="grid w-full h-16" style={{ gridTemplateColumns: \`repeat(${tabCount}, 1fr)\` }}>
        ${Array.from({ length: tabCount }).map((_, i) => `        <TabsTrigger key={${i}} value="tab${i + 1}" className="text-xl">Tab ${i + 1}</TabsTrigger>`).join("\n")}
      </TabsList>
      ${Array.from({ length: tabCount }).map((_, i) => `      <TabsContent key={${i}} value="tab${i + 1}" className="space-y-4 p-6">
        <h3 className="text-2xl font-medium">Content for Tab ${i + 1}</h3>
        <p className="text-lg text-muted-foreground">
          This is the content area for tab ${i + 1}. You can add any content here.
        </p>
      </TabsContent>`).join("\n")}
    </Tabs>
  )
}`
    }

    if (componentName === "Textarea") {
      return `import { Textarea } from "@/components/ui/textarea"

export default function TextareaExample() {
  return (
    <Textarea 
      placeholder="${props.placeholder || "Type your message here..."}" 
      rows={${props.rows || 4}} 
      disabled={${props.disabled || false}} 
      className="max-w-3xl text-xl p-6" 
      style={{ borderRadius: "${props.borderRadius || 8}px", borderWidth: "${props.borderWidth || 1}px" }} 
    />
  )
}`
    }

    if (componentName === "Toast") {
      return `import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Terminal } from "lucide-react"

export default function ToastExample() {
  return (
    <div className="max-w-2xl">
      <Alert className="p-8">
        <Terminal className="h-8 w-8" />
        <AlertTitle className="text-2xl">${props.title || "Heads up!"}</AlertTitle>
        <AlertDescription className="text-lg mt-2">${props.description || "You can add components to your app."}</AlertDescription>
      </Alert>
      <p className="text-base text-muted-foreground mt-4">
        Note: This is a preview. Actual toast will appear as a notification.
      </p>
    </div>
  )
}`
    }

    if (componentName === "Toggle") {
      return `import { Toggle } from "@/components/ui/toggle"

export default function ToggleExample() {
  return (
    <Toggle 
      variant="${props.variant || "default"}" 
      size="${props.size || "default"}" 
      disabled={${props.disabled || false}} 
      aria-label="Toggle italic" 
      className="h-16 w-16"
    >
      <span className="font-bold text-3xl">B</span>
    </Toggle>
  )
}`
    }

    if (componentName === "Tooltip") {
      return `import { Button } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

export default function TooltipExample() {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline" className="text-xl px-8 py-6 h-auto">Hover me</Button>
        </TooltipTrigger>
        <TooltipContent side="${props.side || "top"}" className="text-lg p-4">
          <p>${props.text || "Tooltip content"}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}`
    }

    if (componentName === "MediaPlayer") {
      // Convert hex to rgb with opacity for colors in generated code
      const hexToRgbWithOpacity = (hex: string, opacity: number = 0.6) => {
        if (!hex || !hex.startsWith('#')) return hex
        const r = parseInt(hex.slice(1, 3), 16)
        const g = parseInt(hex.slice(3, 5), 16)
        const b = parseInt(hex.slice(5, 7), 16)
        return `rgb(${r} ${g} ${b} / ${opacity})`
      }

      const hexToRgba = (hex: string, opacity: number = 0.1) => {
        if (!hex || !hex.startsWith('#')) return hex
        const r = parseInt(hex.slice(1, 3), 16)
        const g = parseInt(hex.slice(3, 5), 16)
        const b = parseInt(hex.slice(5, 7), 16)
        return `rgba(${r}, ${g}, ${b}, ${opacity})`
      }

      const propsList = []
      // Always include all props with their current values (including defaults)
      propsList.push(`trackTitle="${props.trackTitle || "Midnight City"}"`)
      propsList.push(`artist="${props.artist || "M83"}"`)
      propsList.push(`album="${props.album || "Hurry Up, We're Dreaming"}"`)
      if (props.albumArtUrl) {
        propsList.push(`albumArtUrl="${props.albumArtUrl}"`)
      }
      propsList.push(`totalTime="${props.totalTime || "4:03"}"`)
      if (props.progress !== undefined) {
        propsList.push(`progress={${props.progress}}`)
      }
      propsList.push(`isPlaying={${props.isPlaying !== undefined ? props.isPlaying : true}}`)
      propsList.push(`isLoved={${props.isLoved !== undefined ? props.isLoved : false}}`)
      propsList.push(`isShuffle={${props.isShuffle !== undefined ? props.isShuffle : false}}`)
      propsList.push(`isRepeat={${props.isRepeat !== undefined ? props.isRepeat : false}}`)
      propsList.push(`showShuffle={${props.showShuffle !== undefined ? props.showShuffle : true}}`)
      propsList.push(`showRepeat={${props.showRepeat !== undefined ? props.showRepeat : true}}`)
      propsList.push(`showHeart={${props.showHeart !== undefined ? props.showHeart : true}}`)

      // Convert colors
      const bgColor = props.backgroundColor
        ? hexToRgbWithOpacity(props.backgroundColor, 0.6)
        : "rgb(23 23 23 / 0.6)"
      propsList.push(`backgroundColor="${bgColor}"`)

      const borderCol = props.borderColor
        ? hexToRgba(props.borderColor, 0.1)
        : "rgba(255, 255, 255, 0.1)"
      propsList.push(`borderColor="${borderCol}"`)

      propsList.push(`borderRadius={${props.borderRadius !== undefined ? props.borderRadius : 24}}`)

      const glow1 = props.glowColor1
        ? hexToRgbWithOpacity(props.glowColor1, 0.2)
        : "rgb(99 102 241 / 0.2)"
      propsList.push(`glowColor1="${glow1}"`)

      const glow2 = props.glowColor2
        ? hexToRgbWithOpacity(props.glowColor2, 0.2)
        : "rgb(168 85 247 / 0.2)"
      propsList.push(`glowColor2="${glow2}"`)

      propsList.push(`enableImageUpload={${props.enableImageUpload !== undefined ? props.enableImageUpload : true}}`)

      // Format with line breaks for better readability
      const propsString = propsList.length > 0
        ? `\n  ${propsList.join("\n  ")}\n`
        : ""

      return `"use client"

import React, { useState, useEffect, useRef } from "react"
import { cn } from "@/lib/utils"
import { Play, Pause, SkipBack, SkipForward, Heart, Repeat, Shuffle, Upload } from "lucide-react"

interface MediaPlayerProps {
  className?: string
  trackTitle?: string
  artist?: string
  album?: string
  albumArtUrl?: string
  currentTime?: string
  totalTime?: string
  progress?: number
  isPlaying?: boolean
  isLoved?: boolean
  isShuffle?: boolean
  isRepeat?: boolean
  showShuffle?: boolean
  showRepeat?: boolean
  showHeart?: boolean
  backgroundColor?: string
  borderColor?: string
  borderRadius?: number
  glowColor1?: string
  glowColor2?: string
  gradientFrom?: string
  gradientTo?: string
  gradientWidth?: number
  gradientAnimated?: boolean
  enableImageUpload?: boolean
  onPlayPause?: (isPlaying: boolean) => void
  onLove?: (isLoved: boolean) => void
  onShuffle?: (isShuffle: boolean) => void
  onRepeat?: (isRepeat: boolean) => void
  onSkipBack?: () => void
  onSkipForward?: () => void
  onImageUpload?: (imageUrl: string) => void
  onTimeChange?: (currentTime: string, progress: number) => void
}

const timeToSeconds = (time: string): number => {
  const parts = time.split(':')
  if (parts.length === 2) {
    return parseInt(parts[0]) * 60 + parseInt(parts[1])
  }
  return 0
}

const secondsToTime = (seconds: number): string => {
  const mins = Math.floor(seconds / 60)
  const secs = Math.floor(seconds % 60)
  return \`\${mins}:\${secs.toString().padStart(2, '0')}\`
}

export const MediaPlayer = ({
  className,
  trackTitle = "${props.trackTitle || "Midnight City"}",
  artist = "${props.artist || "M83"}",
  album = "${props.album || "Hurry Up, We're Dreaming"}",
  albumArtUrl: initialAlbumArtUrl = "${props.albumArtUrl || "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?q=80&w=1000&auto=format&fit=crop"}",
  totalTime: initialTotalTime = "${props.totalTime || "4:03"}",
  progress: initialProgress${props.progress !== undefined ? ` = ${props.progress}` : ''},
  isPlaying: initialIsPlaying = ${props.isPlaying !== undefined ? props.isPlaying : true},
  isLoved: initialIsLoved = ${props.isLoved !== undefined ? props.isLoved : false},
  isShuffle: initialIsShuffle = ${props.isShuffle !== undefined ? props.isShuffle : false},
  isRepeat: initialIsRepeat = ${props.isRepeat !== undefined ? props.isRepeat : false},
  showShuffle = ${props.showShuffle !== undefined ? props.showShuffle : true},
  showRepeat = ${props.showRepeat !== undefined ? props.showRepeat : true},
  showHeart = ${props.showHeart !== undefined ? props.showHeart : true},
  backgroundColor = "${bgColor}",
  borderColor = "${borderCol}",
  borderRadius = ${props.borderRadius !== undefined ? props.borderRadius : 24},
  glowColor1 = "${glow1}",
  glowColor2 = "${glow2}",
  gradientFrom${props.gradientFrom ? ` = "${props.gradientFrom}"` : ''},
  gradientTo${props.gradientTo ? ` = "${props.gradientTo}"` : ''},
  gradientWidth = ${props.gradientWidth !== undefined ? props.gradientWidth : 2},
  gradientAnimated = ${props.gradientAnimated !== undefined ? props.gradientAnimated : false},
  enableImageUpload = ${props.enableImageUpload !== undefined ? props.enableImageUpload : true},
  onPlayPause,
  onLove,
  onShuffle,
  onRepeat,
  onSkipBack,
  onSkipForward,
  onImageUpload,
  onTimeChange,
}: MediaPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(initialIsPlaying)
  const [isLoved, setIsLoved] = useState(initialIsLoved)
  const [isShuffle, setIsShuffle] = useState(initialIsShuffle)
  const [isRepeat, setIsRepeat] = useState(initialIsRepeat)
  const [albumArtUrl, setAlbumArtUrl] = useState(initialAlbumArtUrl)
  const [totalTime, setTotalTime] = useState(initialTotalTime)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const calculateTimeFromProgress = (prog: number, totTime: string): string => {
    const totalSeconds = timeToSeconds(totTime)
    const currentSeconds = (prog / 100) * totalSeconds
    return secondsToTime(currentSeconds)
  }

  const [progress, setProgress] = useState(
    initialProgress !== undefined ? initialProgress : 0
  )

  const [currentTime, setCurrentTime] = useState(() => {
    if (initialProgress !== undefined) {
      return calculateTimeFromProgress(initialProgress, initialTotalTime)
    }
    return "0:00"
  })

  useEffect(() => {
    if (initialProgress !== undefined) {
      const newCurrentTime = calculateTimeFromProgress(initialProgress, totalTime)
      setCurrentTime(newCurrentTime)
      setProgress(initialProgress)
      onTimeChange?.(newCurrentTime, initialProgress)
    }
  }, [initialProgress, totalTime])

  useEffect(() => {
    setTotalTime(initialTotalTime)
  }, [initialTotalTime])

  useEffect(() => {
    if (initialProgress !== undefined) {
      setProgress(initialProgress)
    }
  }, [initialProgress])

  useEffect(() => {
    setIsPlaying(initialIsPlaying)
  }, [initialIsPlaying])

  useEffect(() => {
    setIsLoved(initialIsLoved)
  }, [initialIsLoved])

  useEffect(() => {
    setIsShuffle(initialIsShuffle)
  }, [initialIsShuffle])

  useEffect(() => {
    setIsRepeat(initialIsRepeat)
  }, [initialIsRepeat])

  const handlePlayPause = () => {
    const newState = !isPlaying
    setIsPlaying(newState)
    onPlayPause?.(newState)
  }

  const handleLove = () => {
    const newState = !isLoved
    setIsLoved(newState)
    onLove?.(newState)
  }

  const handleShuffle = () => {
    const newState = !isShuffle
    setIsShuffle(newState)
    onShuffle?.(newState)
  }

  const handleRepeat = () => {
    const newState = !isRepeat
    setIsRepeat(newState)
    onRepeat?.(newState)
  }

  const handleSkipBack = () => {
    onSkipBack?.()
  }

  const handleSkipForward = () => {
    onSkipForward?.()
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader()
      reader.onloadend = () => {
        const imageUrl = reader.result as string
        setAlbumArtUrl(imageUrl)
        onImageUpload?.(imageUrl)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleImageClick = () => {
    if (enableImageUpload) {
      fileInputRef.current?.click()
    }
  }

  const hexToRgb = (hex: string) => {
    if (!hex || !hex.startsWith('#')) return hex
    const r = parseInt(hex.slice(1, 3), 16)
    const g = parseInt(hex.slice(3, 5), 16)
    const b = parseInt(hex.slice(5, 7), 16)
    return \`rgb(\${r} \${g} \${b})\`
  }

  const bgColor = backgroundColor.startsWith('#') ? hexToRgb(backgroundColor) : backgroundColor
  const borderCol = borderColor.startsWith('#') ? hexToRgb(borderColor) : borderColor
  const glow1 = glowColor1.startsWith('#') ? hexToRgb(glowColor1) : glowColor1
  const glow2 = glowColor2.startsWith('#') ? hexToRgb(glowColor2) : glowColor2
  
  const gradientFromColor = gradientFrom || 'var(--primary)'
  const gradientToColor = gradientTo || 'var(--accent)'
  const gradientInset = \`-\${gradientWidth}px\`

  return (
    <div
      className={cn("relative group overflow-hidden border p-6 backdrop-blur-xl", className)}
      style={{
        backgroundColor: bgColor,
        borderColor: borderCol,
        borderRadius: \`\${borderRadius}px\`,
        borderWidth: '1px',
        borderStyle: 'solid',
      }}
    >
      {(gradientFrom || gradientTo) && (
        <div
          className="absolute blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 pointer-events-none z-0"
          style={{
            inset: gradientInset,
            backgroundImage: gradientAnimated
              ? \`linear-gradient(90deg, \${gradientFromColor}, \${gradientToColor}, \${gradientFromColor})\`
              : \`linear-gradient(to right, \${gradientFromColor}, \${gradientToColor})\`,
            backgroundSize: gradientAnimated ? '200% 200%' : '100% 100%',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            borderRadius: \`\${borderRadius + gradientWidth}px\`,
            animation: gradientAnimated ? 'gradient-rotate 3s ease infinite' : undefined,
          }}
        />
      )}
      <div
        className="absolute -top-10 -right-10 h-40 w-40 rounded-full blur-3xl"
        style={{ backgroundColor: glow1 }}
      />
      <div
        className="absolute -bottom-10 -left-10 h-40 w-40 rounded-full blur-3xl"
        style={{ backgroundColor: glow2 }}
      />

      <div
        className={cn(
          "relative mx-auto mb-6 aspect-square w-full overflow-hidden shadow-2xl shadow-black/50",
          enableImageUpload && "cursor-pointer group"
        )}
        style={{ borderRadius: \`\${Math.max(0, borderRadius - 8)}px\` }}
        onClick={handleImageClick}
      >
        <img
          src={albumArtUrl}
          alt="Album Art"
          className="h-full w-full object-cover transition-transform duration-700 hover:scale-110"
        />
        <div className="absolute inset-0 bg-black/10" />
        {enableImageUpload && (
          <>
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <div className="flex flex-col items-center gap-2 text-white">
                <Upload className="h-8 w-8" />
                <span className="text-sm font-medium">上傳圖片</span>
              </div>
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
          </>
        )}
      </div>

      <div className="mb-6 flex items-end justify-between">
        <div>
          <h3 className="text-lg font-bold text-white">{trackTitle}</h3>
          <p className="text-sm font-medium text-neutral-400">
            {artist}{album ? \` • \${album}\` : ''}
          </p>
        </div>
        {showHeart && (
          <button
            onClick={handleLove}
            className={cn("transition-colors hover:scale-110", isLoved ? "text-rose-500" : "text-neutral-500 hover:text-white")}
          >
            <Heart className={cn("h-6 w-6", isLoved && "fill-current")} />
          </button>
        )}
      </div>

      <div className="mb-2 h-1.5 w-full overflow-hidden rounded-full bg-neutral-800">
        <div
          className="h-full rounded-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.5)]"
          style={{ width: \`\${Math.min(100, Math.max(0, progress))}%\` }}
        />
      </div>
      <div className="mb-6 flex justify-between text-xs font-medium text-neutral-500">
        <span>{currentTime}</span>
        <span>{totalTime}</span>
      </div>

      <div className="flex items-center justify-between px-2">
        {showShuffle ? (
          <button
            onClick={handleShuffle}
            className={cn(
              "flex h-8 w-8 items-center justify-center rounded-full transition-all",
              isShuffle
                ? "bg-white/20 text-white"
                : "text-neutral-500 hover:text-white hover:bg-white/10"
            )}
          >
            <Shuffle size={18} className={isShuffle ? "text-white" : ""} />
          </button>
        ) : (
          <div />
        )}

        <div className="flex items-center gap-6">
          <button
            onClick={handleSkipBack}
            className="text-neutral-300 hover:text-white transition-colors"
          >
            <SkipBack size={24} fill="currentColor" />
          </button>
          <button
            onClick={handlePlayPause}
            className="flex h-14 w-14 items-center justify-center rounded-full bg-white text-black shadow-lg shadow-white/20 transition-transform hover:scale-105 active:scale-95"
          >
            {isPlaying ? <Pause size={24} fill="currentColor" /> : <Play size={24} fill="currentColor" className="ml-1" />}
          </button>
          <button
            onClick={handleSkipForward}
            className="text-neutral-300 hover:text-white transition-colors"
          >
            <SkipForward size={24} fill="currentColor" />
          </button>
        </div>

        {showRepeat ? (
          <button
            onClick={handleRepeat}
            className={cn(
              "flex h-8 w-8 items-center justify-center rounded-full transition-all",
              isRepeat
                ? "bg-white/20 text-white"
                : "text-neutral-500 hover:text-white hover:bg-white/10"
            )}
          >
            <Repeat size={18} className={isRepeat ? "text-white" : ""} />
          </button>
        ) : (
          <div />
        )}
      </div>
    </div>
  )
}`
    }

    if (componentName === "ChatInterface") {
      // Helper function to convert Tailwind class to RGB for inline styles
      const getColorFromTailwind = (tailwindClass: string): string | undefined => {
        if (!tailwindClass) return undefined
        const hexMatch = tailwindClass.match(/\[#([0-9A-Fa-f]{6})\]/)
        if (hexMatch) {
          const r = parseInt(hexMatch[1].slice(0, 2), 16)
          const g = parseInt(hexMatch[1].slice(2, 4), 16)
          const b = parseInt(hexMatch[1].slice(4, 6), 16)
          return `rgb(${r} ${g} ${b})`
        }
        const colorMap: Record<string, string> = {
          "bg-neutral-900/80": "rgb(23 23 23 / 0.8)",
          "bg-neutral-800": "rgb(38 38 38)",
          "bg-neutral-950": "rgb(10 10 10)",
          "bg-indigo-600": "rgb(79 70 229)",
          "text-neutral-100": "rgb(245 245 245)",
          "text-neutral-500": "rgb(115 115 115)",
          "text-white": "rgb(255 255 255)",
          "text-neutral-200": "rgb(229 229 229)",
          "border-neutral-800": "rgb(38 38 38)",
          "border-indigo-500/50": "rgb(99 102 241 / 0.5)",
        }
        return colorMap[tailwindClass] || undefined
      }

      const headerBgColor = getColorFromTailwind(props.headerBgColor || "bg-neutral-900/80")
      const headerBorderColor = getColorFromTailwind(props.headerBorderColor || "border-neutral-800")
      const headerTextColor = getColorFromTailwind(props.headerTextColor || "text-neutral-100")
      const bodyBgColor = props.bodyBgColor ? getColorFromTailwind(props.bodyBgColor) : undefined
      const ownMessageColor = getColorFromTailwind(props.ownMessageColor || "bg-indigo-600")
      const otherMessageColor = getColorFromTailwind(props.otherMessageColor || "bg-neutral-800")
      const messageTextColor = props.messageTextColor ? getColorFromTailwind(props.messageTextColor) : undefined
      const timeTextColor = getColorFromTailwind(props.timeTextColor || "text-neutral-500")
      const footerBgColor = getColorFromTailwind(props.footerBgColor || "bg-neutral-900/80")
      const footerBorderColor = getColorFromTailwind(props.footerBorderColor || "border-neutral-800")
      const footerInputBgColor = getColorFromTailwind(props.footerInputBgColor || "bg-neutral-950")
      const footerButtonColor = getColorFromTailwind(props.footerButtonColor || "bg-indigo-600")
      const footerFocusBorderColor = getColorFromTailwind(props.footerFocusBorderColor || "border-indigo-500/50")

      const headerStatus = props.headerUserStatus === "Other" && props.headerUserStatusCustom
        ? props.headerUserStatusCustom
        : (props.headerUserStatus || "Online now")

      return `"use client"

import React from "react"
import { cn } from "@/lib/utils"
import { Send, Paperclip, Smile, MoreVertical, Phone, Video, Check, CheckCheck } from "lucide-react"

interface MessageProps {
  text: string
  isOwn?: boolean
  time: string
  isRead?: boolean
  showReadReceipt?: boolean
  ownMessageColor?: string
  otherMessageColor?: string
  messageTextColor?: string
  timeTextColor?: string
}

const getColorFromTailwindForMessage = (tailwindClass: string): string | undefined => {
  if (!tailwindClass) return undefined
  const hexMatch = tailwindClass.match(/\[#([0-9A-Fa-f]{6})\]/)
  if (hexMatch) {
    const r = parseInt(hexMatch[1].slice(0, 2), 16)
    const g = parseInt(hexMatch[1].slice(2, 4), 16)
    const b = parseInt(hexMatch[1].slice(4, 6), 16)
    return \`rgb(\${r} \${g} \${b})\`
  }
  const colorMap: Record<string, string> = {
    "bg-indigo-600": "rgb(79 70 229)",
    "bg-neutral-800": "rgb(38 38 38)",
    "text-white": "rgb(255 255 255)",
    "text-neutral-200": "rgb(229 229 229)",
    "text-neutral-500": "rgb(115 115 115)",
  }
  return colorMap[tailwindClass] || undefined
}

const Message = ({ 
  text, 
  isOwn, 
  time,
  isRead = false,
  showReadReceipt = false,
  ownMessageColor = "bg-indigo-600",
  otherMessageColor = "bg-neutral-800",
  messageTextColor,
  timeTextColor = "text-neutral-500"
}: MessageProps) => (
  <div className={cn("flex w-full flex-col gap-1", isOwn ? "items-end" : "items-start")}>
    <div 
      className={cn(
        "max-w-[80%] rounded-2xl px-4 py-3 text-sm",
        isOwn ? "rounded-br-none" : "rounded-bl-none"
      )}
      style={{
        backgroundColor: getColorFromTailwindForMessage(isOwn ? ownMessageColor : otherMessageColor),
        color: getColorFromTailwindForMessage(messageTextColor || (isOwn ? "text-white" : "text-neutral-200")),
      }}
    >
      {text}
    </div>
    <div className={cn("flex items-center gap-1", isOwn ? "flex-row-reverse" : "flex-row")}>
      <span 
        className={cn("text-[10px]")}
        style={{
          color: getColorFromTailwindForMessage(timeTextColor),
        }}
      >
        {time}
      </span>
      {showReadReceipt && isOwn && (
        <div className={cn("flex items-center", isRead ? "text-blue-400" : "text-neutral-500")}>
          {isRead ? <CheckCheck size={12} /> : <Check size={12} />}
        </div>
      )}
    </div>
  </div>
)

interface ChatInterfaceProps {
  className?: string
  headerUserName?: string
  headerUserStatus?: string
  headerUserAvatar?: string
  headerShowPhone?: boolean
  headerShowVideo?: boolean
  headerShowMore?: boolean
  headerBgColor?: string
  headerBorderColor?: string
  headerTextColor?: string
  headerStatusColor?: string
  bodyBgColor?: string
  bodyPadding?: number
  bodyShowDateLabel?: boolean
  bodyDateLabelText?: string
  bodyShowTypingIndicator?: boolean
  bodyShowReadReceipt?: boolean
  message1Text?: string
  message1Time?: string
  message1IsOwn?: boolean
  message2Text?: string
  message2Time?: string
  message2IsOwn?: boolean
  message2IsRead?: boolean
  message3Text?: string
  message3Time?: string
  message3IsOwn?: boolean
  message3IsRead?: boolean
  message4Text?: string
  message4Time?: string
  message4IsOwn?: boolean
  ownMessageColor?: string
  otherMessageColor?: string
  messageTextColor?: string
  timeTextColor?: string
  footerBgColor?: string
  footerBorderColor?: string
  footerInputBgColor?: string
  footerInputPlaceholder?: string
  footerShowAttach?: boolean
  footerShowEmoji?: boolean
  footerButtonColor?: string
  footerFocusBorderColor?: string
}

const getStatusColor = (status: string): string => {
  const statusColorMap: Record<string, string> = {
    "Online now": "text-green-500",
    "Offline": "text-neutral-500",
    "Away": "text-yellow-500",
    "Busy": "text-red-500",
    "Do not disturb": "text-orange-500",
  }
  return statusColorMap[status] || "text-neutral-500"
}

const getStatusIndicatorColor = (status: string, customColor?: string): string => {
  if (customColor && customColor.trim() !== "") {
    if (customColor.includes("[") && customColor.includes("#")) {
      return customColor.replace("text-", "bg-")
    }
    if (customColor.startsWith("text-")) {
      return customColor.replace("text-", "bg-")
    }
    if (customColor.startsWith("bg-")) {
      return customColor
    }
  }
  const statusIndicatorMap: Record<string, string> = {
    "Online now": "bg-green-500",
    "Offline": "bg-neutral-500",
    "Away": "bg-yellow-500",
    "Busy": "bg-red-500",
    "Do not disturb": "bg-orange-500",
  }
  return statusIndicatorMap[status] || "bg-neutral-500"
}

const getColorFromTailwind = (tailwindClass: string): string | undefined => {
  if (!tailwindClass) return undefined
  const hexMatch = tailwindClass.match(/\[#([0-9A-Fa-f]{6})\]/)
  if (hexMatch) {
    const r = parseInt(hexMatch[1].slice(0, 2), 16)
    const g = parseInt(hexMatch[1].slice(2, 4), 16)
    const b = parseInt(hexMatch[1].slice(4, 6), 16)
    return \`rgb(\${r} \${g} \${b})\`
  }
  const colorMap: Record<string, string> = {
    "bg-neutral-900/80": "rgb(23 23 23 / 0.8)",
    "bg-neutral-800": "rgb(38 38 38)",
    "bg-neutral-950": "rgb(10 10 10)",
    "bg-indigo-600": "rgb(79 70 229)",
    "text-neutral-100": "rgb(245 245 245)",
    "text-neutral-500": "rgb(115 115 115)",
    "border-neutral-800": "rgb(38 38 38)",
    "border-indigo-500/50": "rgb(99 102 241 / 0.5)",
  }
  return colorMap[tailwindClass] || undefined
}

export const ChatInterface = ({ 
  className,
  headerUserName = "${props.headerUserName || "Sarah Jenkins"}",
  headerUserStatus = "${headerStatus}",
  headerUserAvatar = "${props.headerUserAvatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1000&auto=format&fit=crop"}",
  headerShowPhone = ${props.headerShowPhone !== false},
  headerShowVideo = ${props.headerShowVideo !== false},
  headerShowMore = ${props.headerShowMore !== false},
  headerBgColor = "${props.headerBgColor || "bg-neutral-900/80"}",
  headerBorderColor = "${props.headerBorderColor || "border-neutral-800"}",
  headerTextColor = "${props.headerTextColor || "text-neutral-100"}",
  headerStatusColor${props.headerStatusColor ? ` = "${props.headerStatusColor}"` : ""},
  bodyBgColor${props.bodyBgColor ? ` = "${props.bodyBgColor}"` : ""},
  bodyPadding = ${props.bodyPadding || 6},
  bodyShowDateLabel = ${props.bodyShowDateLabel !== false},
  bodyDateLabelText = "${props.bodyDateLabelText || "Today, Oct 24"}",
  bodyShowTypingIndicator = ${props.bodyShowTypingIndicator !== false},
      bodyShowReadReceipt = ${props.bodyShowReadReceipt || false},
      message1Text = "${props.message1Text || "Hey! Have you had a chance to look at the new design system components?"}",
      message1Time = "${props.message1Time || "10:30 AM"}",
      message1IsOwn = ${props.message1IsOwn || false},
      message2Text = "${props.message2Text || "Yes! I just checked them out. The neon gradients look absolutely stunning 🤩"}",
      message2Time = "${props.message2Time || "10:32 AM"}",
      message2IsOwn = ${props.message2IsOwn !== false},
      message2IsRead = ${props.message2IsRead || false},
      message3Text = "${props.message3Text || "Right? I think we should use the SpotlightCard for the feature section."}",
      message3Time = "${props.message3Time || "10:32 AM"}",
      message3IsOwn = ${props.message3IsOwn !== false},
      message3IsRead = ${props.message3IsRead !== false},
      message4Text = "${props.message4Text || "Agreed. I'm preparing the documentation now. Will send over the draft in a bit!"}",
      message4Time = "${props.message4Time || "10:35 AM"}",
      message4IsOwn = ${props.message4IsOwn || false},
      ownMessageColor = "${props.ownMessageColor || "bg-indigo-600"}",
      otherMessageColor = "${props.otherMessageColor || "bg-neutral-800"}",
      messageTextColor${props.messageTextColor ? ` = "${props.messageTextColor}"` : ""},
      timeTextColor = "${props.timeTextColor || "text-neutral-500"}",
  footerBgColor = "${props.footerBgColor || "bg-neutral-900/80"}",
  footerBorderColor = "${props.footerBorderColor || "border-neutral-800"}",
  footerInputBgColor = "${props.footerInputBgColor || "bg-neutral-950"}",
  footerInputPlaceholder = "${props.footerInputPlaceholder || "Type a message..."}",
  footerShowAttach = ${props.footerShowAttach !== false},
  footerShowEmoji = ${props.footerShowEmoji !== false},
  footerButtonColor = "${props.footerButtonColor || "bg-indigo-600"}",
  footerFocusBorderColor = "${props.footerFocusBorderColor || "border-indigo-500/50"}",
}: ChatInterfaceProps) => {
  const statusText = headerUserStatus || "Online now"
  const hasCustomColor = headerStatusColor && headerStatusColor.trim() !== ""
  
  const extractHexFromColor = (colorClass: string): string | null => {
    if (!colorClass) return null
    const hexMatch = colorClass.match(/\[#([0-9A-Fa-f]{6})\]/)
    if (hexMatch) {
      return \`#\${hexMatch[1]}\`
    }
    const colorMap: Record<string, string> = {
      "text-green-500": "#22c55e",
      "text-blue-500": "#3b82f6",
      "text-yellow-500": "#eab308",
      "text-red-500": "#ef4444",
      "text-orange-500": "#f97316",
      "text-purple-500": "#a855f7",
      "text-pink-500": "#ec4899",
      "text-neutral-500": "#737373",
    }
    return colorMap[colorClass] || null
  }
  
  const hexToRgb = (hex: string): string | null => {
    if (!hex) return null
    const cleanHex = hex.replace('#', '')
    if (cleanHex.length !== 6) return null
    const r = parseInt(cleanHex.slice(0, 2), 16)
    const g = parseInt(cleanHex.slice(2, 4), 16)
    const b = parseInt(cleanHex.slice(4, 6), 16)
    return \`rgb(\${r} \${g} \${b})\`
  }
  
  const statusTextColorClass = hasCustomColor ? headerStatusColor : getStatusColor(statusText)
  const statusIndicatorColorClass = hasCustomColor 
    ? getStatusIndicatorColor(statusText, headerStatusColor) 
    : getStatusIndicatorColor(statusText)
  
  const statusTextHex = hasCustomColor 
    ? extractHexFromColor(headerStatusColor) 
    : extractHexFromColor(getStatusColor(statusText))
  const statusIndicatorHex = hasCustomColor
    ? extractHexFromColor(headerStatusColor)?.replace('#', '')
    : (() => {
        const statusIndicatorMap: Record<string, string> = {
          "Online now": "22c55e",
          "Offline": "737373",
          "Away": "eab308",
          "Busy": "ef4444",
          "Do not disturb": "f97316",
        }
        return statusIndicatorMap[statusText] || "737373"
      })()
  
  const statusTextRgb = statusTextHex ? hexToRgb(statusTextHex) : null
  const statusIndicatorRgb = statusIndicatorHex ? hexToRgb(\`#\${statusIndicatorHex}\`) : null

  return (
    <div className={cn("flex h-full flex-col overflow-hidden rounded-3xl border border-neutral-800 bg-neutral-900/60 shadow-xl backdrop-blur-md", className)}>
      <div 
        className={cn("flex items-center justify-between border-b px-6 py-4", headerBorderColor)}
        style={{
          backgroundColor: getColorFromTailwind(headerBgColor),
          borderColor: getColorFromTailwind(headerBorderColor),
        }}
      >
        <div className="flex items-center gap-3">
          <div className="relative">
            <img 
              src={headerUserAvatar} 
              alt="User" 
              className="h-10 w-10 rounded-full object-cover ring-2 ring-neutral-800"
            />
            <span 
              className={cn("absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full ring-2 ring-neutral-900", statusIndicatorColorClass)}
              style={statusIndicatorRgb ? { backgroundColor: statusIndicatorRgb } : undefined}
            />
          </div>
          <div>
            <h4 
              className={cn("font-semibold", headerTextColor)}
              style={{
                color: getColorFromTailwind(headerTextColor),
              }}
            >
              {headerUserName}
            </h4>
            <p 
              className={cn("text-xs", statusTextColorClass)}
              style={statusTextRgb ? { color: statusTextRgb } : undefined}
            >
              {statusText}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3 text-neutral-400">
          {headerShowPhone && (
            <button className="rounded-full p-2 hover:bg-neutral-800 hover:text-white transition-colors">
              <Phone size={18} />
            </button>
          )}
          {headerShowVideo && (
            <button className="rounded-full p-2 hover:bg-neutral-800 hover:text-white transition-colors">
              <Video size={18} />
            </button>
          )}
          {headerShowMore && (
            <button className="rounded-full p-2 hover:bg-neutral-800 hover:text-white transition-colors">
              <MoreVertical size={18} />
            </button>
          )}
        </div>
      </div>

      <div 
        className={cn("flex-1 space-y-6 overflow-y-auto scrollbar-hide")}
        style={{ 
          padding: \`\${bodyPadding * 4}px\`,
          backgroundColor: getColorFromTailwind(bodyBgColor),
        }}
      >
        {bodyShowDateLabel && (
          <div className="flex justify-center">
            <span className="rounded-full bg-neutral-800/50 px-3 py-1 text-[10px] font-medium text-neutral-500">
              {bodyDateLabelText}
            </span>
          </div>
        )}
        
        <Message 
          text={message1Text}
          time={message1Time}
          isOwn={message1IsOwn}
          showReadReceipt={bodyShowReadReceipt}
          ownMessageColor={ownMessageColor}
          otherMessageColor={otherMessageColor}
          messageTextColor={messageTextColor}
          timeTextColor={timeTextColor}
        />
        <Message 
          text={message2Text}
          isOwn={message2IsOwn}
          time={message2Time}
          isRead={message2IsRead}
          showReadReceipt={bodyShowReadReceipt}
          ownMessageColor={ownMessageColor}
          otherMessageColor={otherMessageColor}
          messageTextColor={messageTextColor}
          timeTextColor={timeTextColor}
        />
        <Message 
          text={message3Text}
          isOwn={message3IsOwn}
          time={message3Time}
          isRead={message3IsRead}
          showReadReceipt={bodyShowReadReceipt}
          ownMessageColor={ownMessageColor}
          otherMessageColor={otherMessageColor}
          messageTextColor={messageTextColor}
          timeTextColor={timeTextColor}
        />
        <Message 
          text={message4Text}
          isOwn={message4IsOwn}
          time={message4Time}
          showReadReceipt={bodyShowReadReceipt}
          ownMessageColor={ownMessageColor}
          otherMessageColor={otherMessageColor}
          messageTextColor={messageTextColor}
          timeTextColor={timeTextColor}
        />
        
        {bodyShowTypingIndicator && (
          <div className="flex items-center gap-1 px-4">
            <div className="h-1.5 w-1.5 animate-bounce rounded-full bg-neutral-600 delay-0" />
            <div className="h-1.5 w-1.5 animate-bounce rounded-full bg-neutral-600 delay-150" />
            <div className="h-1.5 w-1.5 animate-bounce rounded-full bg-neutral-600 delay-300" />
          </div>
        )}
      </div>

      <div 
        className={cn("p-4")}
        style={{
          backgroundColor: getColorFromTailwind(footerBgColor),
        }}
      >
        <div 
          className={cn(
            "flex items-center gap-2 rounded-xl border px-4 py-2 transition-all focus-within:ring-1 focus-within:ring-indigo-500/50",
            footerFocusBorderColor
          )}
          style={{
            borderColor: getColorFromTailwind(footerBorderColor),
            backgroundColor: getColorFromTailwind(footerInputBgColor),
          }}
        >
          {footerShowAttach && (
            <button className="text-neutral-500 hover:text-neutral-300">
              <Paperclip size={20} />
            </button>
          )}
          <input 
            type="text" 
            placeholder={footerInputPlaceholder} 
            className="flex-1 bg-transparent text-sm text-neutral-200 placeholder-neutral-500 focus:outline-none"
          />
          {footerShowEmoji && (
            <button className="text-neutral-500 hover:text-neutral-300">
              <Smile size={20} />
            </button>
          )}
          <button 
            className={cn("rounded-lg p-2 text-white shadow-lg shadow-indigo-500/20 hover:opacity-90 transition-colors")}
            style={{
              backgroundColor: getColorFromTailwind(footerButtonColor),
            }}
          >
            <Send size={16} />
          </button>
        </div>
      </div>
    </div>
  )
}`
    }

    if (componentName === "UrlInput") {
      // Convert hex to rgb for backgroundColor and borderColor in generated code
      const hexToRgb = (hex: string) => {
        if (!hex || !hex.startsWith('#')) return hex
        const r = parseInt(hex.slice(1, 3), 16)
        const g = parseInt(hex.slice(3, 5), 16)
        const b = parseInt(hex.slice(5, 7), 16)
        return `rgb(${r} ${g} ${b})`
      }

      const propsList = []
      if (props.isLoading) propsList.push("isLoading={true}")
      if (props.borderRadius !== 12) propsList.push(`borderRadius={${props.borderRadius}}`)
      if (props.gradientFrom) propsList.push(`gradientFrom="${props.gradientFrom}"`)
      if (props.gradientTo) propsList.push(`gradientTo="${props.gradientTo}"`)
      if (props.gradientWidth !== 2) propsList.push(`gradientWidth={${props.gradientWidth}}`)
      if (props.gradientAnimated) propsList.push("gradientAnimated={true}")
      const bgColor = props.backgroundColor && props.backgroundColor !== "#0f172a"
        ? hexToRgb(props.backgroundColor)
        : null
      if (bgColor) propsList.push(`backgroundColor="${bgColor}"`)
      const borderCol = props.borderColor && props.borderColor !== "#334155"
        ? hexToRgb(props.borderColor)
        : null
      if (borderCol) propsList.push(`borderColor="${borderCol}"`)
      if (!props.showButton) propsList.push("showButton={false}")
      if (props.buttonText !== "Generate") propsList.push(`buttonText="${props.buttonText}"`)
      if (props.placeholder !== "https://your-shop.com/product/...") propsList.push(`placeholder="${props.placeholder}"`)
      if (!props.showIcon) propsList.push("showIcon={false}")

      const propsString = propsList.length > 0 ? ` ${propsList.join(" ")}` : ""

      return `"use client"

import React, { useState } from 'react'
import { Search, ArrowRight, Loader2 } from 'lucide-react'

interface UrlInputProps {
  onGenerate: (url: string) => void
  isLoading?: boolean
  borderRadius?: number
  gradientFrom?: string
  gradientTo?: string
  gradientWidth?: number
  gradientAnimated?: boolean
  backgroundColor?: string
  borderColor?: string
  showButton?: boolean
  buttonText?: string
  placeholder?: string
  showIcon?: boolean
  className?: string
}

export const UrlInput: React.FC<UrlInputProps> = ({ 
  onGenerate, 
  isLoading = false,
  borderRadius = 12,
  gradientFrom,
  gradientTo,
  gradientWidth = 2,
  gradientAnimated = false,
  backgroundColor = 'rgb(15 23 42)',
  borderColor = 'rgb(51 65 85)',
  showButton = true,
  buttonText = 'Generate',
  placeholder = 'https://your-shop.com/product/...',
  showIcon = true,
  className = '',
}) => {
  const [url, setUrl] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (url.trim()) {
      onGenerate(url)
    }
  }

  const gradientFromColor = gradientFrom || 'var(--primary)'
  const gradientToColor = gradientTo || 'var(--accent)'
  const gradientInset = \`-\${gradientWidth}px\`

  return (
    <form onSubmit={handleSubmit} className={\`relative group w-full \${className}\`} style={{ minWidth: 0 }}>
      <div 
        className="absolute blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"
        style={{
          inset: gradientInset,
          backgroundImage: gradientAnimated 
            ? \`linear-gradient(90deg, \${gradientFromColor}, \${gradientToColor}, \${gradientFromColor})\`
            : \`linear-gradient(to right, \${gradientFromColor}, \${gradientToColor})\`,
          backgroundSize: gradientAnimated ? '200% 200%' : '100% 100%',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          borderRadius: \`\${borderRadius + gradientWidth}px\`,
          animation: gradientAnimated ? 'gradient-rotate 3s ease infinite' : undefined,
        }}
      ></div>
      <div 
        className="relative flex items-center p-2 shadow-2xl"
        style={{
          backgroundColor,
          borderColor,
          borderWidth: '1px',
          borderStyle: 'solid',
          borderRadius: \`\${borderRadius}px\`,
        }}
      >
        {showIcon && (
          <div className="pl-4 text-slate-400">
            <Search className="w-5 h-5" />
          </div>
        )}
        <input
          type="url"
          className="flex-1 bg-transparent border-none outline-none text-white px-4 py-3 placeholder:text-slate-500 font-medium truncate"
          placeholder={placeholder}
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          disabled={isLoading}
          required
        />
        {showButton && (
          <button
            type="submit"
            disabled={isLoading}
            className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-3 rounded-lg font-semibold flex items-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            style={{
              borderRadius: \`\${Math.max(0, borderRadius - 4)}px\`,
            }}
          >
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" /> Processing
              </>
            ) : (
              <>
                {buttonText} <ArrowRight className="w-5 h-5" />
              </>
            )}
          </button>
        )}
      </div>
    </form>
  )
}`
    }

    if (componentName === "GlassAuthForm") {
      // Helper to convert hex to rgb
      const hexToRgb = (hex: string) => {
        if (!hex) return hex
        // Extract hex from Tailwind format or from hex value
        const hexMatch = hex.match(/\[#([0-9A-Fa-f]{6})\]/)
        if (hexMatch) {
          const r = parseInt(hexMatch[1].slice(0, 2), 16)
          const g = parseInt(hexMatch[1].slice(2, 4), 16)
          const b = parseInt(hexMatch[1].slice(4, 6), 16)
          return `rgb(${r} ${g} ${b})`
        }
        // If it's already a hex value
        if (hex.startsWith('#')) {
          const r = parseInt(hex.slice(1, 3), 16)
          const g = parseInt(hex.slice(3, 5), 16)
          const b = parseInt(hex.slice(5, 7), 16)
          return `rgb(${r} ${g} ${b})`
        }
        return hex
      }

      const propsList = []
      // Always include all props with their current values (including defaults)
      if (props.className) propsList.push(`className="${props.className}"`)
      if (props.title !== "Welcome Back") propsList.push(`title="${props.title}"`)
      if (props.subtitle !== "Enter your credentials to access the workspace.") propsList.push(`subtitle="${props.subtitle}"`)
      if (props.emailLabel !== "Email address") propsList.push(`emailLabel="${props.emailLabel}"`)
      if (props.passwordLabel !== "Password") propsList.push(`passwordLabel="${props.passwordLabel}"`)
      if (props.rememberText !== "Remember me") propsList.push(`rememberText="${props.rememberText}"`)
      if (props.forgotPasswordText !== "Forgot password?") propsList.push(`forgotPasswordText="${props.forgotPasswordText}"`)
      if (props.signInText !== "Sign In") propsList.push(`signInText="${props.signInText}"`)
      if (props.continueWithText !== "Or continue with") propsList.push(`continueWithText="${props.continueWithText}"`)
      if (props.githubText !== "GitHub") propsList.push(`githubText="${props.githubText}"`)
      if (props.googleText !== "Google") propsList.push(`googleText="${props.googleText}"`)
      if (!props.showRememberMe) propsList.push("showRememberMe={false}")
      if (!props.showForgotPassword) propsList.push("showForgotPassword={false}")
      if (!props.showSocialButtons) propsList.push("showSocialButtons={false}")
      if (!props.showGithub) propsList.push("showGithub={false}")
      if (!props.showGoogle) propsList.push("showGoogle={false}")

      if (props.backgroundColor) {
        const bgColor = hexToRgb(props.backgroundColor)
        propsList.push(`backgroundColor="${bgColor}"`)
      }
      if (props.borderColor) {
        const borderCol = hexToRgb(props.borderColor)
        propsList.push(`borderColor="${borderCol}"`)
      }
      if (props.textColor) propsList.push(`textColor="${props.textColor}"`)
      if (props.iconGradientFrom) {
        const iconFrom = hexToRgb(props.iconGradientFrom)
        propsList.push(`iconGradientFrom="${iconFrom}"`)
      }
      if (props.iconGradientTo) {
        const iconTo = hexToRgb(props.iconGradientTo)
        propsList.push(`iconGradientTo="${iconTo}"`)
      }
      if (props.orb1Color) {
        const orb1 = hexToRgb(props.orb1Color)
        propsList.push(`orb1Color="${orb1}"`)
      }
      if (props.orb2Color) {
        const orb2 = hexToRgb(props.orb2Color)
        propsList.push(`orb2Color="${orb2}"`)
      }
      if (props.buttonColor) {
        const btnColor = hexToRgb(props.buttonColor)
        propsList.push(`buttonColor="${btnColor}"`)
      }
      if (props.socialButtonBgColor) {
        const socialBg = hexToRgb(props.socialButtonBgColor)
        propsList.push(`socialButtonBgColor="${socialBg}"`)
      }
      if (props.socialButtonBorderColor) {
        const socialBorder = hexToRgb(props.socialButtonBorderColor)
        propsList.push(`socialButtonBorderColor="${socialBorder}"`)
      }
      if (props.inputLabelColor) propsList.push(`inputLabelColor="${props.inputLabelColor}"`)
      if (props.inputBgColor) propsList.push(`inputBgColor="${props.inputBgColor}"`)
      if (props.inputBorderColor) propsList.push(`inputBorderColor="${props.inputBorderColor}"`)
      if (props.inputTextColor) propsList.push(`inputTextColor="${props.inputTextColor}"`)
      if (props.focusBorderColor) propsList.push(`focusBorderColor="${props.focusBorderColor}"`)
      if (props.cardGradientFrom) {
        const cardFrom = hexToRgb(props.cardGradientFrom)
        propsList.push(`cardGradientFrom="${cardFrom}"`)
      }
      if (props.cardGradientTo) {
        const cardTo = hexToRgb(props.cardGradientTo)
        propsList.push(`cardGradientTo="${cardTo}"`)
      }
      if (props.cardGradientWidth !== 2) propsList.push(`cardGradientWidth={${props.cardGradientWidth}}`)
      if (props.cardGradientAnimated) propsList.push("cardGradientAnimated={true}")
      if (props.outerGradientFrom) {
        const outerFrom = hexToRgb(props.outerGradientFrom)
        propsList.push(`outerGradientFrom="${outerFrom}"`)
      }
      if (props.outerGradientTo) {
        const outerTo = hexToRgb(props.outerGradientTo)
        propsList.push(`outerGradientTo="${outerTo}"`)
      }
      if (props.outerGradientWidth !== 2) propsList.push(`outerGradientWidth={${props.outerGradientWidth}}`)
      if (props.outerGradientAnimated) propsList.push("outerGradientAnimated={true}")
      if (props.borderRadius !== 24) propsList.push(`borderRadius={${props.borderRadius}}`)
      if (props.padding !== 8) propsList.push(`padding={${props.padding}}`)
      if (props.backdropBlur !== 12) propsList.push(`backdropBlur={${props.backdropBlur}}`)

      // Format with line breaks for better readability
      const propsString = propsList.length > 0
        ? `\n  ${propsList.join("\n  ")}\n`
        : ""

      return `"use client"

import React from "react"
import { cn } from "@/lib/utils"
import { Mail, Lock, Github, Chrome } from "lucide-react"
import { FloatingLabelInput } from "@/components/customize/FloatingLabelInput"
import { ShinyButton } from "@/components/customize/ShinyButton"

interface GlassAuthFormProps {
  className?: string
  // Text content
  title?: string
  subtitle?: string
  emailLabel?: string
  passwordLabel?: string
  rememberText?: string
  forgotPasswordText?: string
  signInText?: string
  continueWithText?: string
  githubText?: string
  googleText?: string
  // Display options
  showRememberMe?: boolean
  showForgotPassword?: boolean
  showSocialButtons?: boolean
  showGithub?: boolean
  showGoogle?: boolean
  // Colors
  backgroundColor?: string
  borderColor?: string
  textColor?: string
  iconGradientFrom?: string
  iconGradientTo?: string
  orb1Color?: string
  orb2Color?: string
  buttonColor?: string
  socialButtonBgColor?: string
  socialButtonBorderColor?: string
  inputLabelColor?: string
  inputBgColor?: string
  inputBorderColor?: string
  inputTextColor?: string
  focusBorderColor?: string
  // Card gradient
  cardGradientFrom?: string
  cardGradientTo?: string
  cardGradientWidth?: number
  cardGradientAnimated?: boolean
  // Outer gradient
  outerGradientFrom?: string
  outerGradientTo?: string
  outerGradientWidth?: number
  outerGradientAnimated?: boolean
  // Style
  borderRadius?: number
  padding?: number
  backdropBlur?: number
}

// Helper function to extract hex from Tailwind class or hex and convert to RGB
const getColorFromTailwind = (colorValue: string): string | undefined => {
  if (!colorValue) return undefined
  // Extract hex from bg-[#hex] or text-[#hex] format
  const hexMatch = colorValue.match(/\\[#([0-9A-Fa-f]{6})\\]/)
  if (hexMatch) {
    const r = parseInt(hexMatch[1].slice(0, 2), 16)
    const g = parseInt(hexMatch[1].slice(2, 4), 16)
    const b = parseInt(hexMatch[1].slice(4, 6), 16)
    return \`rgb(\${r} \${g} \${b})\`
  }
  // If it's already a hex value
  if (colorValue.startsWith('#')) {
    const r = parseInt(colorValue.slice(1, 3), 16)
    const g = parseInt(colorValue.slice(3, 5), 16)
    const b = parseInt(colorValue.slice(5, 7), 16)
    return \`rgb(\${r} \${g} \${b})\`
  }
  // Try color map
  const colorMap: Record<string, string> = {
    "bg-neutral-900/60": "rgb(23 23 23 / 0.6)",
    "bg-neutral-900": "rgb(23 23 23)",
    "border-neutral-800": "rgb(38 38 38)",
    "text-white": "rgb(255 255 255)",
    "text-neutral-400": "rgb(163 163 163)",
    "bg-indigo-500/20": "rgb(99 102 241 / 0.2)",
    "bg-purple-500/20": "rgb(168 85 247 / 0.2)",
    "from-indigo-500": "rgb(99 102 241)",
    "to-purple-500": "rgb(168 85 247)",
    "bg-indigo-600": "rgb(79 70 229)",
    "border-neutral-700": "rgb(64 64 64)",
    "bg-neutral-800": "rgb(38 38 38)",
  }
  return colorMap[colorValue] || undefined
}

export const GlassAuthForm: React.FC<GlassAuthFormProps> = ({
  className,
  title = "Welcome Back",
  subtitle = "Enter your credentials to access the workspace.",
  emailLabel = "Email address",
  passwordLabel = "Password",
  rememberText = "Remember me",
  forgotPasswordText = "Forgot password?",
  signInText = "Sign In",
  continueWithText = "Or continue with",
  githubText = "GitHub",
  googleText = "Google",
  showRememberMe = true,
  showForgotPassword = true,
  showSocialButtons = true,
  showGithub = true,
  showGoogle = true,
  backgroundColor,
  borderColor,
  textColor,
  iconGradientFrom,
  iconGradientTo,
  orb1Color,
  orb2Color,
  buttonColor,
  socialButtonBgColor,
  socialButtonBorderColor,
  inputLabelColor,
  inputBgColor,
  inputBorderColor,
  inputTextColor,
  focusBorderColor,
  cardGradientFrom,
  cardGradientTo,
  cardGradientWidth = 2,
  cardGradientAnimated = false,
  outerGradientFrom,
  outerGradientTo,
  outerGradientWidth = 2,
  outerGradientAnimated = false,
  borderRadius = 24,
  padding = 8,
  backdropBlur = 12,
}) => {
  const bgColor = backgroundColor ? getColorFromTailwind(backgroundColor) : "rgb(23 23 23 / 0.6)"
  const borderCol = borderColor ? getColorFromTailwind(borderColor) : "rgb(38 38 38)"
  const txtColor = textColor ? getColorFromTailwind(textColor) : "rgb(255 255 255)"
  const subTxtColor = textColor ? getColorFromTailwind(textColor) : "rgb(163 163 163)"
  const orb1Col = orb1Color ? getColorFromTailwind(orb1Color) : "rgb(99 102 241 / 0.2)"
  const orb2Col = orb2Color ? getColorFromTailwind(orb2Color) : "rgb(168 85 247 / 0.2)"
  const iconFrom = iconGradientFrom ? getColorFromTailwind(iconGradientFrom) : "rgb(99 102 241)"
  const iconTo = iconGradientTo ? getColorFromTailwind(iconGradientTo) : "rgb(168 85 247)"
  const socialBg = socialButtonBgColor ? getColorFromTailwind(socialButtonBgColor) : "rgb(38 38 38)"
  const socialBorder = socialButtonBorderColor ? getColorFromTailwind(socialButtonBorderColor) : "rgb(64 64 64)"
  
  // Card gradient colors
  const cardGradFrom = cardGradientFrom ? getColorFromTailwind(cardGradientFrom) : undefined
  const cardGradTo = cardGradientTo ? getColorFromTailwind(cardGradientTo) : undefined
  const cardGradInset = \`-\${cardGradientWidth}px\`
  
  // Outer gradient colors
  const outerGradFrom = outerGradientFrom ? getColorFromTailwind(outerGradientFrom) : undefined
  const outerGradTo = outerGradientTo ? getColorFromTailwind(outerGradientTo) : undefined
  const outerGradInset = \`-\${outerGradientWidth}px\`

  return (
    <div className={cn("relative group", className)} style={{ borderRadius: \`\${borderRadius}px\` }}>
      {/* Outer gradient */}
      {(outerGradFrom || outerGradTo) && (
        <div
          className="absolute blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 pointer-events-none z-0"
          style={{
            inset: outerGradInset,
            backgroundImage: outerGradientAnimated
              ? \`linear-gradient(90deg, \${outerGradFrom || 'var(--primary)'}, \${outerGradTo || 'var(--accent)'}, \${outerGradFrom || 'var(--primary)'})\`
              : \`linear-gradient(to right, \${outerGradFrom || 'var(--primary)'}, \${outerGradTo || 'var(--accent)'})\`,
            backgroundSize: outerGradientAnimated ? '200% 200%' : '100% 100%',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            borderRadius: \`\${borderRadius + outerGradientWidth}px\`,
            animation: outerGradientAnimated ? 'gradient-rotate 3s ease infinite' : undefined,
          }}
        />
      )}
      
      {/* Card gradient */}
      {(cardGradFrom || cardGradTo) && (
        <div
          className="absolute blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 pointer-events-none z-[1]"
          style={{
            inset: cardGradInset,
            backgroundImage: cardGradientAnimated
              ? \`linear-gradient(90deg, \${cardGradFrom || 'var(--primary)'}, \${cardGradTo || 'var(--accent)'}, \${cardGradFrom || 'var(--primary)'})\`
              : \`linear-gradient(to right, \${cardGradFrom || 'var(--primary)'}, \${cardGradTo || 'var(--accent)'})\`,
            backgroundSize: cardGradientAnimated ? '200% 200%' : '100% 100%',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            borderRadius: \`\${borderRadius + cardGradientWidth}px\`,
            animation: cardGradientAnimated ? 'gradient-rotate 3s ease infinite' : undefined,
          }}
        />
      )}
      
      <div
        className={cn("relative flex flex-col items-center overflow-hidden rounded-3xl border text-center z-10", className)}
        style={{
          backgroundColor: bgColor,
          borderColor: borderCol,
          borderRadius: \`\${borderRadius}px\`,
          padding: \`\${padding * 4}px\`,
          backdropFilter: \`blur(\${backdropBlur}px)\`,
        }}
      >
      {/* Background Orbs */}
      <div
        className="absolute -left-10 -top-10 h-32 w-32 rounded-full blur-3xl"
        style={{
          backgroundColor: orb1Col,
        }}
      />
      <div
        className="absolute -bottom-10 -right-10 h-32 w-32 rounded-full blur-3xl"
        style={{
          backgroundColor: orb2Col,
        }}
      />

      <div className="relative z-10 w-full">
        <div className="mb-6 flex flex-col items-center">
          <div
            className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl shadow-lg"
            style={{
              backgroundImage: \`linear-gradient(to top right, \${iconFrom}, \${iconTo})\`,
              boxShadow: \`\${iconFrom}30 0px 0px 20px\`,
            }}
          >
            <Lock className="h-6 w-6 text-white" />
          </div>
          <h3 className="text-xl font-bold" style={{ color: txtColor }}>
            {title}
          </h3>
          <p className="text-sm" style={{ color: subTxtColor }}>
            {subtitle}
          </p>
        </div>

        <div className="space-y-4">
          <FloatingLabelInput
            label={emailLabel}
            type="email"
            icon={<Mail size={16} />}
            labelColor={inputLabelColor}
            inputBgColor={inputBgColor}
            inputBorderColor={inputBorderColor}
            inputTextColor={inputTextColor}
            focusBorderColor={focusBorderColor}
          />
          <FloatingLabelInput
            label={passwordLabel}
            type="password"
            icon={<Lock size={16} />}
            labelColor={inputLabelColor}
            inputBgColor={inputBgColor}
            inputBorderColor={inputBorderColor}
            inputTextColor={inputTextColor}
            focusBorderColor={focusBorderColor}
          />
        </div>

        {showRememberMe && (
          <div className="mb-6 mt-2 flex items-center justify-between">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                className="h-3 w-3 rounded border-neutral-700 bg-neutral-800 text-indigo-600 focus:ring-0 focus:ring-offset-0"
                style={{
                  borderColor: socialBorder,
                  backgroundColor: socialBg,
                }}
              />
              <span className="text-xs" style={{ color: subTxtColor }}>
                {rememberText}
              </span>
            </label>
            {showForgotPassword && (
              <a
                href="#"
                className="text-xs font-medium text-indigo-400 hover:text-indigo-300"
                style={{
                  color: iconFrom || "rgb(99 102 241)",
                }}
              >
                {forgotPasswordText}
              </a>
            )}
          </div>
        )}

        <ShinyButton
          className="w-full"
          style={{
            ...(buttonColor && {
              backgroundColor: getColorFromTailwind(buttonColor),
            }),
          }}
        >
          {signInText}
        </ShinyButton>

        {showSocialButtons && (showGithub || showGoogle) && (
          <>
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <span
                  className="w-full border-t"
                  style={{
                    borderColor: borderCol,
                  }}
                />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span
                  className="px-2"
                  style={{
                    backgroundColor: bgColor,
                    color: subTxtColor,
                  }}
                >
                  {continueWithText}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {showGithub && (
                <button
                  className="flex items-center justify-center gap-2 rounded-lg border py-2.5 text-sm font-medium text-neutral-300 transition-colors hover:bg-neutral-700 hover:text-white"
                  style={{
                    backgroundColor: socialBg,
                    borderColor: socialBorder,
                    color: subTxtColor,
                  }}
                >
                  <Github size={16} />
                  {githubText}
                </button>
              )}
              {showGoogle && (
                <button
                  className="flex items-center justify-center gap-2 rounded-lg border py-2.5 text-sm font-medium text-neutral-300 transition-colors hover:bg-neutral-700 hover:text-white"
                  style={{
                    backgroundColor: socialBg,
                    borderColor: socialBorder,
                    color: subTxtColor,
                  }}
                >
                  <Chrome size={16} />
                  {googleText}
                </button>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  )
}`
    }

    if (componentName === "SocialProfileCard") {
      // Helper to convert hex to rgb
      const hexToRgb = (hex: string) => {
        if (!hex || !hex.startsWith('#')) return hex
        const r = parseInt(hex.slice(1, 3), 16)
        const g = parseInt(hex.slice(3, 5), 16)
        const b = parseInt(hex.slice(5, 7), 16)
        return `rgb(${r} ${g} ${b})`
      }

      const propsList = []
      // Build props list for usage example
      propsList.push(`name="${props.name || "Sarah Jenkins"}"`)
      propsList.push(`username="${props.username || "@sarah_des"}"`)
      propsList.push(`bio="${props.bio || "Product Designer crafting digital experiences. Coffee enthusiast ☕. Building next-gen UI tools for developers."}"`)
      propsList.push(`avatarUrl="${props.avatarUrl || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1000&auto=format&fit=crop"}"`)
      propsList.push(`location="${props.location || "San Francisco, CA"}"`)
      propsList.push(`website="${props.website || "sarah.design"}"`)
      propsList.push(`twitter="${props.twitter || "@sarah_des"}"`)
      propsList.push(`showLocation={${props.showLocation !== false}}`)
      propsList.push(`showWebsite={${props.showWebsite !== false}}`)
      propsList.push(`showTwitter={${props.showTwitter !== false}}`)
      propsList.push(`followers="${props.followers || "12.5k"}"`)
      propsList.push(`following="${props.following || "842"}"`)
      propsList.push(`projects="${props.projects || "142"}"`)
      propsList.push(`isOnline={${props.isOnline !== false}}`)
      propsList.push(`statusColor="${props.statusColor || "bg-green-500"}"`)
      propsList.push(`bannerGradientFrom="${props.bannerGradientFrom || "from-indigo-500"}"`)
      propsList.push(`bannerGradientVia="${props.bannerGradientVia || "via-purple-500"}"`)
      propsList.push(`bannerGradientTo="${props.bannerGradientTo || "to-pink-500"}"`)
      propsList.push(`followButtonText="${props.followButtonText || "Follow"}"`)
      propsList.push(`showFollowButton={${props.showFollowButton !== false}}`)
      propsList.push(`showMessageButton={${props.showMessageButton !== false}}`)
      propsList.push(`showSimilarButton={${props.showSimilarButton !== false}}`)
      propsList.push(`messageButtonText="${props.messageButtonText || "Message"}"`)
      propsList.push(`similarButtonText="${props.similarButtonText || "Similar"}"`)

      if (props.backgroundColor) {
        const bgColor = hexToRgb(props.backgroundColor)
        propsList.push(`backgroundColor="${bgColor}"`)
      }

      if (props.borderColor) {
        const borderCol = hexToRgb(props.borderColor)
        propsList.push(`borderColor="${borderCol}"`)
      }

      propsList.push(`borderRadius={${props.borderRadius !== undefined ? props.borderRadius : 24}}`)

      if (props.gradientFrom) {
        propsList.push(`gradientFrom="${props.gradientFrom}"`)
      }

      if (props.gradientTo) {
        propsList.push(`gradientTo="${props.gradientTo}"`)
      }

      propsList.push(`gradientWidth={${props.gradientWidth !== undefined ? props.gradientWidth : 2}}`)
      propsList.push(`gradientAnimated={${props.gradientAnimated || false}}`)

      // Format with line breaks for better readability
      const propsString = propsList.length > 0
        ? `\n  ${propsList.join("\n  ")}\n`
        : ""

      return `"use client"

import React from "react"
import { cn } from "@/lib/utils"
import { MapPin, Link as LinkIcon, Twitter, Users, MessageCircle } from "lucide-react"
import { ShinyButton } from "@/components/customize/ShinyButton"

interface SocialProfileCardProps {
  className?: string
  // User Info
  name?: string
  username?: string
  bio?: string
  avatarUrl?: string
  // Social Links
  location?: string
  website?: string
  twitter?: string
  showLocation?: boolean
  showWebsite?: boolean
  showTwitter?: boolean
  // Stats
  followers?: string | number
  following?: string | number
  projects?: string | number
  // Status
  isOnline?: boolean
  statusColor?: string
  // Banner
  bannerGradientFrom?: string
  bannerGradientVia?: string
  bannerGradientTo?: string
  // Buttons
  followButtonText?: string
  showFollowButton?: boolean
  showMessageButton?: boolean
  showSimilarButton?: boolean
  messageButtonText?: string
  similarButtonText?: string
  // Callbacks
  onFollow?: () => void
  onMessage?: () => void
  onSimilar?: () => void
  onAvatarChange?: (url: string) => void
  // Styling
  backgroundColor?: string
  borderColor?: string
  borderRadius?: number
  gradientFrom?: string
  gradientTo?: string
  gradientWidth?: number
  gradientAnimated?: boolean
}

export const SocialProfileCard = ({ 
  className,
  name = "${props.name || "Sarah Jenkins"}",
  username = "${props.username || "@sarah_des"}",
  bio = "${props.bio || "Product Designer crafting digital experiences. Coffee enthusiast ☕. Building next-gen UI tools for developers."}",
  avatarUrl = "${props.avatarUrl || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1000&auto=format&fit=crop"}",
  location = "${props.location || "San Francisco, CA"}",
  website = "${props.website || "sarah.design"}",
  twitter = "${props.twitter || "@sarah_des"}",
  showLocation = ${props.showLocation !== false},
  showWebsite = ${props.showWebsite !== false},
  showTwitter = ${props.showTwitter !== false},
  followers = "${props.followers || "12.5k"}",
  following = "${props.following || "842"}",
  projects = "${props.projects || "142"}",
  isOnline = ${props.isOnline !== false},
  statusColor = "${props.statusColor || "bg-green-500"}",
  bannerGradientFrom = "${props.bannerGradientFrom || "from-indigo-500"}",
  bannerGradientVia = "${props.bannerGradientVia || "via-purple-500"}",
  bannerGradientTo = "${props.bannerGradientTo || "to-pink-500"}",
  followButtonText = "${props.followButtonText || "Follow"}",
  showFollowButton = ${props.showFollowButton !== false},
  showMessageButton = ${props.showMessageButton !== false},
  showSimilarButton = ${props.showSimilarButton !== false},
  messageButtonText = "${props.messageButtonText || "Message"}",
  similarButtonText = "${props.similarButtonText || "Similar"}",
  onFollow,
  onMessage,
  onSimilar,
  onAvatarChange,
  backgroundColor${props.backgroundColor ? ` = "${hexToRgb(props.backgroundColor)}"` : ""},
  borderColor${props.borderColor ? ` = "${hexToRgb(props.borderColor)}"` : ""},
  borderRadius = ${props.borderRadius !== undefined ? props.borderRadius : 24},
  gradientFrom${props.gradientFrom ? ` = "${props.gradientFrom}"` : ""},
  gradientTo${props.gradientTo ? ` = "${props.gradientTo}"` : ""},
  gradientWidth = ${props.gradientWidth !== undefined ? props.gradientWidth : 2},
  gradientAnimated = ${props.gradientAnimated || false},
}: SocialProfileCardProps) => {
  const formatNumber = (value: string | number): string => {
    if (typeof value === "number") {
      if (value >= 1000) {
        return \`\${(value / 1000).toFixed(1)}k\`
      }
      return value.toString()
    }
    return value
  }

  const getColorFromTailwind = (tailwindClass: string): string | undefined => {
    if (!tailwindClass) return undefined
    const hexMatch = tailwindClass.match(/\\[#([0-9A-Fa-f]{6})\\]/)
    if (hexMatch) {
      const r = parseInt(hexMatch[1].slice(0, 2), 16)
      const g = parseInt(hexMatch[1].slice(2, 4), 16)
      const b = parseInt(hexMatch[1].slice(4, 6), 16)
      return \`rgb(\${r} \${g} \${b})\`
    }
    const colorMap: Record<string, string> = {
      "bg-green-500": "rgb(34 197 94)",
      "bg-blue-500": "rgb(59 130 246)",
      "bg-purple-500": "rgb(168 85 247)",
      "bg-pink-500": "rgb(236 72 153)",
      "bg-yellow-500": "rgb(234 179 8)",
      "bg-red-500": "rgb(239 68 68)",
      "bg-orange-500": "rgb(249 115 22)",
      "bg-neutral-900": "rgb(23 23 23)",
      "bg-neutral-800": "rgb(38 38 38)",
      "from-indigo-500": "rgb(99 102 241)",
      "from-purple-500": "rgb(168 85 247)",
      "from-pink-500": "rgb(236 72 153)",
      "from-blue-500": "rgb(59 130 246)",
      "from-green-500": "rgb(34 197 94)",
      "from-yellow-500": "rgb(234 179 8)",
      "from-red-500": "rgb(239 68 68)",
      "from-orange-500": "rgb(249 115 22)",
      "via-indigo-500": "rgb(99 102 241)",
      "via-purple-500": "rgb(168 85 247)",
      "via-pink-500": "rgb(236 72 153)",
      "via-blue-500": "rgb(59 130 246)",
      "via-green-500": "rgb(34 197 94)",
      "via-yellow-500": "rgb(234 179 8)",
      "via-red-500": "rgb(239 68 68)",
      "via-orange-500": "rgb(249 115 22)",
      "to-indigo-500": "rgb(99 102 241)",
      "to-purple-500": "rgb(168 85 247)",
      "to-pink-500": "rgb(236 72 153)",
      "to-blue-500": "rgb(59 130 246)",
      "to-green-500": "rgb(34 197 94)",
      "to-yellow-500": "rgb(234 179 8)",
      "to-red-500": "rgb(239 68 68)",
      "to-orange-500": "rgb(249 115 22)",
    }
    return colorMap[tailwindClass] || undefined
  }

  const gradientFromColor = gradientFrom || 'var(--primary, #a855f7)'
  const gradientToColor = gradientTo || 'var(--accent, #ec4899)'
  const gradientInset = \`-\${gradientWidth}px\`

  return (
    <div className={cn("relative group", className)} style={{ borderRadius: \`\${borderRadius}px\` }}>
      <div 
        className="absolute blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"
        style={{
          inset: gradientInset,
          backgroundImage: gradientAnimated 
            ? \`linear-gradient(90deg, \${gradientFromColor}, \${gradientToColor}, \${gradientFromColor})\`
            : \`linear-gradient(to right, \${gradientFromColor}, \${gradientToColor})\`,
          backgroundSize: gradientAnimated ? '200% 200%' : '100% 100%',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          borderRadius: \`\${borderRadius + gradientWidth}px\`,
          animation: gradientAnimated ? 'gradient-rotate 3s ease infinite' : undefined,
          zIndex: 0,
        }}
      />
      <div 
        className={cn(
          "relative overflow-hidden rounded-3xl border shadow-xl w-full h-full",
          !backgroundColor && "bg-neutral-900/90",
          !borderColor && "border-neutral-800",
        )}
        style={{
          ...(backgroundColor && { backgroundColor }),
          ...(borderColor && { borderColor }),
          borderRadius: \`\${borderRadius}px\`,
          zIndex: 1,
        }}
      >
        <div 
          className="h-32 w-full opacity-80 transition-opacity group-hover:opacity-100"
          style={{
            backgroundImage: \`linear-gradient(to right, \${
              getColorFromTailwind(bannerGradientFrom) || "rgb(99 102 241)"
            }, \${
              getColorFromTailwind(bannerGradientVia) || "rgb(168 85 247)"
            }, \${
              getColorFromTailwind(bannerGradientTo) || "rgb(236 72 153)"
            })\`,
          }}
        >
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />
        </div>

        <div className="relative px-6 pb-6">
          <div className="relative -mt-12 mb-4 inline-block">
            <div className="relative">
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0]
                  if (file && onAvatarChange) {
                    const reader = new FileReader()
                    reader.onloadend = () => {
                      const result = reader.result as string
                      onAvatarChange(result)
                    }
                    reader.readAsDataURL(file)
                  }
                }}
                className="hidden"
                id="avatar-upload"
              />
              <label
                htmlFor="avatar-upload"
                className={cn(
                  "block cursor-pointer",
                  onAvatarChange && "hover:opacity-80 transition-opacity"
                )}
              >
                <div className="h-24 w-24 rounded-2xl border-4 border-neutral-900 bg-neutral-800 shadow-xl overflow-hidden">
                  <img 
                    src={avatarUrl} 
                    alt="Profile" 
                    className="h-full w-full object-cover"
                  />
                </div>
              </label>
            </div>
            {isOnline && (
              <div 
                className="absolute bottom-1 right-1 h-4 w-4 rounded-full border-2 border-neutral-900"
                style={{
                  backgroundColor: getColorFromTailwind(statusColor),
                }}
              />
            )}
          </div>

          <div className="mb-6">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-xl font-bold text-white">{name}</h3>
                <p className="text-sm text-indigo-400">{username}</p>
              </div>
              {showFollowButton && (
                <ShinyButton 
                  className="h-9 px-4 text-xs"
                  onClick={onFollow}
                >
                  {followButtonText}
                </ShinyButton>
              )}
            </div>
            
            <p className="mt-3 text-sm leading-relaxed text-neutral-400">
              {bio}
            </p>
            
            <div className="mt-4 flex flex-wrap gap-4 text-xs text-neutral-500">
              {showLocation && location && (
                <div className="flex items-center gap-1 hover:text-neutral-300 transition-colors">
                  <MapPin size={14} />
                  {location}
                </div>
              )}
              {showWebsite && website && (
                <div className="flex items-center gap-1 hover:text-neutral-300 transition-colors">
                  <LinkIcon size={14} />
                  {website}
                </div>
              )}
              {showTwitter && twitter && (
                <div className="flex items-center gap-1 hover:text-neutral-300 transition-colors">
                  <Twitter size={14} />
                  {twitter}
                </div>
              )}
            </div>
          </div>

          <div className="flex border-t border-neutral-800 pt-6">
            <div className="flex-1 text-center border-r border-neutral-800">
              <div className="text-lg font-bold text-white">{formatNumber(followers)}</div>
              <div className="text-xs font-medium text-neutral-500">Followers</div>
            </div>
            <div className="flex-1 text-center border-r border-neutral-800">
              <div className="text-lg font-bold text-white">{formatNumber(following)}</div>
              <div className="text-xs font-medium text-neutral-500">Following</div>
            </div>
            <div className="flex-1 text-center">
              <div className="text-lg font-bold text-white">{formatNumber(projects)}</div>
              <div className="text-xs font-medium text-neutral-500">Projects</div>
            </div>
          </div>

          {(showMessageButton || showSimilarButton) && (
            <div className="mt-6 flex gap-3">
              {showMessageButton && (
                <button 
                  onClick={onMessage}
                  className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-neutral-800 bg-neutral-900/50 py-2.5 text-sm font-medium text-neutral-300 transition-colors hover:bg-neutral-800 hover:text-white"
                >
                  <MessageCircle size={16} />
                  {messageButtonText}
                </button>
              )}
              {showSimilarButton && (
                <button 
                  onClick={onSimilar}
                  className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-neutral-800 bg-neutral-900/50 py-2.5 text-sm font-medium text-neutral-300 transition-colors hover:bg-neutral-800 hover:text-white"
                >
                  <Users size={16} />
                  {similarButtonText}
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}`
    }

    if (heroMeta && initialCode) {
      const interfaceName = `${heroMeta.componentName}Props`
      const propsInterface = `interface ${interfaceName} {\n` +
        Object.entries(config.props).map(([key, conf]: [string, any]) => {
          const type = conf.type === "boolean" ? "boolean" :
            conf.type === "slider" || conf.min !== undefined ? "number" : "string"
          return `  ${key}?: ${type}`
        }).join("\n") +
        "\n}"

      // Replace the type definition line
      let code = initialCode.replace(
        new RegExp(`export type ${interfaceName} = HeroComponentProps<"[^"]+">`),
        propsInterface
      )

      // Fallback if replacement didn't happen (e.g. different formatting), just prepend
      if (code === initialCode) {
        code = propsInterface + "\n\n" + initialCode
      }

      const imports = `"use client"

import React, { useState } from "react"
import { cn } from "@/lib/utils"
import { 
  ArrowRight, CheckCircle2, Command, Heart, Layout, Mail, MapPin, Mic, 
  Play, PlayCircle, Search, Star, Terminal, Zap, Quote, Shield, CreditCard, Smartphone 
} from "lucide-react"
import { ShinyButton } from "@/components/customize/ShinyButton"
`
      // Helper functions
      const helpers = `
const highlightText = (text: string, highlight: string, options?: { className?: string; style?: React.CSSProperties }) => {
  if (!highlight) return text
  const index = text.toLowerCase().indexOf(highlight.toLowerCase())
  if (index === -1) {
    return (
      <>
        {text}{" "}
        <span className={options?.className} style={options?.style}>
          {highlight}
        </span>
      </>
    )
  }
  const before = text.slice(0, index)
  const match = text.slice(index, index + highlight.length)
  const after = text.slice(index + highlight.length)
  return (
    <>
      {before}
      <span className={options?.className} style={options?.style}>
        {match}
      </span>
      {after}
    </>
  )
}

const iconMap = {
  layout: Layout,
  zap: Zap,
  command: Command,
}
`

      return `${imports}\n${helpers}\n${code}`
    }

    if (heroMeta) {
      return `"use client"

import { ${heroMeta.componentName} } from "@/components/customize/heroes"

export default function ${heroMeta.componentName}Example() {
  return (
    <${heroMeta.componentName}${propsString ? " " + propsString : ""} />
  )
}`
    }

    // Feature section code generation with initialCode (full component)
    if (featureMeta && initialCode) {
      const interfaceName = `${featureMeta.componentName}Props`
      const propsInterface = `interface ${interfaceName} {\n` +
        Object.entries(config.props).map(([key, conf]: [string, any]) => {
          const type = conf.type === "boolean" ? "boolean" :
            conf.type === "slider" || conf.min !== undefined ? "number" : "string"
          return `  ${key}?: ${type}`
        }).join("\n") +
        "\n}"

      // Replace the type definition line
      let code = initialCode.replace(
        new RegExp(`export type ${interfaceName} = FeatureComponentProps<"[^"]+">`),
        propsInterface
      )

      // Fallback if replacement didn't happen (e.g. different formatting), just prepend
      if (code === initialCode) {
        code = propsInterface + "\n\n" + initialCode
      }

      const imports = `"use client"

import React, { useState } from "react"
import { cn } from "@/lib/utils"
import { 
  Zap, Shield, BarChart, Smartphone, Globe, Code, Terminal, Layout, Lock, Search,
  Check, ArrowRight, PlayCircle, Cpu, Layers, MessageSquare
} from "lucide-react"
import { ShinyButton } from "@/components/customize/ShinyButton"
`

      return `${imports}\n${code}`
    }

    // Feature section code generation (simple import)
    if (featureMeta) {
      return `"use client"

import { ${featureMeta.componentName} } from "@/components/customize/features"

export default function ${featureMeta.componentName}Example() {
  return (
    <${featureMeta.componentName}${propsString ? " " + propsString : ""} />
  )
}`
    }

    // Payment section code generation with initialCode (full component)
    if (paymentMeta && initialCode) {
      const interfaceName = `${paymentMeta.componentName}Props`
      const propsInterface = `interface ${interfaceName} {\n` +
        Object.entries(config.props).map(([key, conf]: [string, any]) => {
          const type = conf.type === "boolean" ? "boolean" :
            conf.type === "slider" || conf.min !== undefined ? "number" : "string"
          return `  ${key}?: ${type}`
        }).join("\n") +
        "\n}"

      // Replace the type definition line
      let code = initialCode.replace(
        new RegExp(`export type ${interfaceName} = PaymentComponentProps<"[^"]+">`),
        propsInterface
      )

      // Fallback if replacement didn't happen (e.g. different formatting), just prepend
      if (code === initialCode) {
        code = propsInterface + "\n\n" + initialCode
      }

      const imports = `"use client"

import React, { useState } from "react"
import { cn } from "@/lib/utils"
import { 
  Check, X, CreditCard, Lock, Shield, Zap, Globe, Smartphone, ArrowRight, Download,
  FileText, Clock, AlertCircle, Search, Wallet, Bitcoin, ChevronRight, Plus, Trash2,
  Copy, RefreshCw, Gift, Building
} from "lucide-react"
import { ShinyButton } from "@/components/customize/ShinyButton"
`

      return `${imports}\n${code}`
    }

    // Payment section code generation (simple import)
    if (paymentMeta) {
      return `"use client"

import { ${paymentMeta.componentName} } from "@/components/customize/payments"

export default function ${paymentMeta.componentName}Example() {
  return (
    <${paymentMeta.componentName}${propsString ? " " + propsString : ""} />
  )
}`
    }

    // CTA section code generation with initialCode (full component)
    if (ctaMeta && initialCode) {
      const interfaceName = `${ctaMeta.componentName}Props`
      const propsInterface = `interface ${interfaceName} {\n` +
        Object.entries(config.props).map(([key, conf]: [string, any]) => {
          const type = conf.type === "boolean" ? "boolean" :
            conf.type === "slider" || conf.min !== undefined ? "number" : "string"
          return `  ${key}?: ${type}`
        }).join("\n") +
        "\n}"

      // Replace the type definition line
      let code = initialCode.replace(
        new RegExp(`export type ${interfaceName} = CtaComponentProps<"[^"]+">`),
        propsInterface
      )

      // Fallback if replacement didn't happen (e.g. different formatting), just prepend
      if (code === initialCode) {
        code = propsInterface + "\n\n" + initialCode
      }

      const imports = `"use client"

import React, { useState } from "react"
import { cn } from "@/lib/utils"
import { 
  ArrowRight, Mail, Download, Smartphone, Github, CheckCircle2, Play, Zap,
  MessageCircle, Clock, Shield, Gift
} from "lucide-react"
import { ShinyButton } from "@/components/customize/ShinyButton"
`

      return `${imports}\n${code}`
    }

    // CTA section code generation (simple import)
    if (ctaMeta) {
      return `"use client"

import { ${ctaMeta.componentName} } from "@/components/customize/ctas"

export default function ${ctaMeta.componentName}Example() {
  return (
    <${ctaMeta.componentName}${propsString ? " " + propsString : ""} />
  )
}`
    }

    // Footer section code generation with initialCode (full component)
    if (footerMeta && initialCode) {
      const interfaceName = `${footerMeta.componentName}Props`
      const propsInterface = `interface ${interfaceName} {\n` +
        Object.entries(config.props).map(([key, conf]: [string, any]) => {
          const type = conf.type === "boolean" ? "boolean" :
            conf.type === "slider" || conf.min !== undefined ? "number" : "string"
          return `  ${key}?: ${type}`
        }).join("\n") +
        "\n}"

      // Replace the type definition line
      let code = initialCode.replace(
        new RegExp(`export type ${interfaceName} = FooterComponentProps<"[^"]+">`),
        propsInterface
      )

      // Fallback if replacement didn't happen (e.g. different formatting), just prepend
      if (code === initialCode) {
        code = propsInterface + "\n\n" + initialCode
      }

      const imports = `"use client"

import React, { useState } from "react"
import { cn } from "@/lib/utils"
import { 
  Twitter, Facebook, Instagram, Linkedin, Github, Youtube, ArrowRight, Mail, MapPin, Phone,
  Globe, Shield, CreditCard, Heart, Send, CheckCircle2, Smartphone, Command, Sun, Moon,
  Slack, Dribbble, Figma, Disc, ArrowUpRight, Zap, Terminal
} from "lucide-react"
import { ShinyButton } from "@/components/customize/ShinyButton"
`

      return `${imports}\n${code}`
    }

    // Footer section code generation (simple import)
    if (footerMeta) {
      return `"use client"

import { ${footerMeta.componentName} } from "@/components/customize/footers"

export default function ${footerMeta.componentName}Example() {
  return (
    <${footerMeta.componentName}${propsString ? " " + propsString : ""} />
  )
}`
    }

    // Header section code generation with initialCode (full component)
    if (headerMeta && initialCode) {
      const interfaceName = `${headerMeta.componentName}Props`
      const propsInterface = `interface ${interfaceName} {\n` +
        Object.entries(config.props).map(([key, conf]: [string, any]) => {
          const type = conf.type === "boolean" ? "boolean" :
            conf.type === "slider" || conf.min !== undefined ? "number" : "string"
          return `  ${key}?: ${type}`
        }).join("\n") +
        "\n}"

      // Replace the type definition line
      let code = initialCode.replace(
        new RegExp(`export type ${interfaceName} = HeaderComponentProps<"[^"]+">`),
        propsInterface
      )

      // Fallback if replacement didn't happen (e.g. different formatting), just prepend
      if (code === initialCode) {
        code = propsInterface + "\n\n" + initialCode
      }

      const imports = `"use client"

import React, { useState } from "react"
import { cn } from "@/lib/utils"
import {
  Menu, X, ChevronDown, Search, Bell, Zap, ShoppingBag, Command, Moon, Globe,
  Mic, Video, TrendingUp, HelpCircle, Home, Tv, Users, Gamepad2, MenuSquare,
  MessageCircle, Terminal, Shield, Wallet, MapPin, Phone, Music, Heart,
  GraduationCap, Plane, Calendar, LayoutGrid, Github
} from "lucide-react"
`

      return `${imports}\n${code}`
    }

    // Header section code generation (simple import)
    if (headerMeta) {
      return `"use client"

import { ${headerMeta.componentName} } from "@/components/customize/headers"

export default function ${headerMeta.componentName}Example() {
  return (
    <${headerMeta.componentName}${propsString ? " " + propsString : ""} />
  )
}`
    }

    // Button section code generation with initialCode (full component)
    if (buttonMeta && initialCode) {
      // Use the initialCode directly (it already contains the full component)
      // Check if initialCode already has imports
      if (!initialCode.includes('"use client"') && !initialCode.includes("import React")) {
        // Add necessary imports at the top
        const imports = `"use client"

import React from "react";
import { cn } from "@/lib/utils";

`
        return `${imports}${initialCode}`
      } else {
        // initialCode already has imports, use it as-is
        return initialCode
      }
    }

    // Button section code generation (simple import)
    if (buttonMeta) {
      // Convert hex to rgb for color props (like UrlInput does)
      const hexToRgb = (hex: string) => {
        if (!hex || !hex.startsWith('#')) return hex
        const r = parseInt(hex.slice(1, 3), 16)
        const g = parseInt(hex.slice(3, 5), 16)
        const b = parseInt(hex.slice(5, 7), 16)
        return `rgb(${r} ${g} ${b})`
      }

      // Build props list - show all props with their current values (including defaults)
      const propsList: string[] = []
      Object.entries(props).forEach(([key, value]) => {
        if (value === undefined || value === "") return
        const propConfig = config.props[key]
        if (!propConfig) return
        
        // Convert color props to rgb format (like UrlInput)
        if ((key === 'backgroundColor' || key === 'textColor' || key === 'borderColor') && typeof value === 'string' && value.startsWith('#')) {
          propsList.push(`${key}="${hexToRgb(value)}"`)
        } else if (typeof value === "boolean") {
          propsList.push(`${key}={${value}}`)
        } else if (typeof value === "string") {
          propsList.push(`${key}="${value}"`)
        } else {
          propsList.push(`${key}={${JSON.stringify(value)}}`)
        }
      })

      const propsString = propsList.length > 0 ? ` ${propsList.join(" ")}` : ""
      const children = props.children || props.buttonText || props.copyText || props.downloadText || "Button"

      return `"use client"

import { ${buttonMeta.componentName} } from "@/components/customize/buttons"

export default function ${buttonMeta.componentName}Example() {
  return (
    <${buttonMeta.componentName}${propsString}>${children}</${buttonMeta.componentName}>
  )
}`
    }

    // Input section code generation - try both componentName and actualComponentName
    let inputMeta = inputNameToMeta[componentName] || inputNameToMeta[actualComponentName]
    if (!inputMeta) {
      // Try to find by slug
      const inputMetaBySlug = inputSections.find(i => i.slug === slug)
      if (inputMetaBySlug) {
        inputMeta = inputNameToMeta[inputMetaBySlug.name]
      }
    }
    if (inputMeta && initialCode) {
      // Use the initialCode directly (it already contains the full component)
      // Check if initialCode already has imports
      if (!initialCode.includes('"use client"') && !initialCode.includes("import React")) {
        // Add necessary imports at the top
        const imports = `"use client"

import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

`
        return `${imports}${initialCode}`
      } else {
        // initialCode already has imports, use it as-is
        return initialCode
      }
    }
    if (inputMeta) {
      // Convert hex to rgb for color props
      const hexToRgb = (hex: string) => {
        if (!hex || !hex.startsWith('#')) return hex
        const r = parseInt(hex.slice(1, 3), 16)
        const g = parseInt(hex.slice(3, 5), 16)
        const b = parseInt(hex.slice(5, 7), 16)
        return `rgb(${r} ${g} ${b})`
      }

      // Build props list - show all props with their current values (including defaults)
      const propsList: string[] = []
      Object.entries(props).forEach(([key, value]) => {
        // Skip internal props
        if (key.startsWith('_')) return
        
        // Only include props that are defined in inputMeta.props
        if (!inputMeta.props[key]) return
        
        // Skip empty values for optional props
        if (value === "" || value === undefined || value === null) return
        
        // Convert color props to rgb format
        if ((key.includes("Color") || key === "backgroundColor" || key === "textColor" || key === "borderColor" || key === "glowColor" || key === "errorColor" || key === "successColor" || key === "focusBorderColor" || key === "buttonColor" || key === "currencyColor" || key === "accentColor" || key === "promptColor" || key === "pathColor" || key === "gradientFrom" || key === "gradientVia" || key === "gradientTo" || key === "hoverBorderColor" || key === "focusBorderColor" || key === "buttonHoverColor") 
            && typeof value === "string" && value.startsWith("#")) {
          propsList.push(`${key}="${hexToRgb(value)}"`)
        }
        // Handle boolean props
        else if (typeof value === "boolean") {
          propsList.push(`${key}={${value}}`)
        }
        // Handle number props
        else if (typeof value === "number") {
          propsList.push(`${key}={${value}}`)
        }
        // Handle string props
        else {
          propsList.push(`${key}="${String(value).replace(/"/g, '&quot;')}"`)
        }
      })

      return `"use client"

import { ${inputMeta.componentName} } from "@/components/customize/inputs"

export default function ${inputMeta.componentName}Example() {
  return (
    <div className="flex items-center justify-center p-8 min-h-[200px]">
      <${inputMeta.componentName}${propsList.length > 0 ? ` ${propsList.join(" ")}` : ""} />
    </div>
  )
}`
    }

    // Badge section code generation - try both componentName and actualComponentName
    let badgeMeta = badgeNameToMeta[componentName] || badgeNameToMeta[actualComponentName]
    if (!badgeMeta) {
      // Try to find by slug
      const badgeMetaBySlug = badgeSections.find(b => b.slug === slug)
      if (badgeMetaBySlug) {
        badgeMeta = badgeNameToMeta[badgeMetaBySlug.name]
      }
    }
    if (badgeMeta && initialCode) {
      // Use the initialCode directly (it already contains the full component)
      // Check if initialCode already has imports
      if (!initialCode.includes('"use client"') && !initialCode.includes("import React")) {
        // Add necessary imports at the top
        const imports = `"use client"

import React from "react";
import { cn } from "@/lib/utils";

`
        return `${imports}${initialCode}`
      } else {
        // initialCode already has imports, use it as-is
        return initialCode
      }
    }
    if (badgeMeta) {
      // Convert hex to rgb for color props
      const hexToRgb = (hex: string) => {
        if (!hex || !hex.startsWith('#')) return hex
        const r = parseInt(hex.slice(1, 3), 16)
        const g = parseInt(hex.slice(3, 5), 16)
        const b = parseInt(hex.slice(5, 7), 16)
        return `rgb(${r} ${g} ${b})`
      }

      // Build props list - show all props with their current values (including defaults)
      const propsList: string[] = []
      Object.entries(props).forEach(([key, value]) => {
        if (value === undefined || value === "") return
        const propConfig = config.props[key]
        if (!propConfig) return
        
        if ((key.includes("Color") || key === "backgroundColor" || key === "textColor" || key === "borderColor" || key === "gradientFrom" || key === "gradientTo" || key === "glowColor" || key === "pulseColor" || key === "iconColor" || key === "shadowColor" || key === "dotColor") && typeof value === "string" && value.startsWith("#")) {
          // Convert color props to rgb format
          propsList.push(`${key}="${hexToRgb(value)}"`)
        } else if (typeof value === "boolean") {
          propsList.push(`${key}={${value}}`)
        } else if (typeof value === "number") {
          propsList.push(`${key}={${value}}`)
        } else if (typeof value === "string") {
          // Escape quotes in strings
          const escapedValue = value.replace(/"/g, '\\"')
          propsList.push(`${key}="${escapedValue}"`)
        } else {
          propsList.push(`${key}={${JSON.stringify(value)}}`)
        }
      })

      const propsString = propsList.length > 0 ? `\n  ${propsList.join("\n  ")}\n` : ""

      return `"use client"

import { ${badgeMeta.componentName} } from "@/components/customize/badges"

export default function ${badgeMeta.componentName}Example() {
  return (
    <div className="flex items-center justify-center p-8 min-h-[200px]">
      <${badgeMeta.componentName}${propsString} />
    </div>
  )
}`
    }

    // Card section code generation - try both componentName and actualComponentName
    let cardMeta = cardNameToMeta[componentName] || cardNameToMeta[actualComponentName]
    if (!cardMeta) {
      // Try to find by slug
      const cardMetaBySlug = cardSections.find(c => c.slug === slug)
      if (cardMetaBySlug) {
        cardMeta = cardNameToMeta[cardMetaBySlug.name]
      }
    }
    if (cardMeta && initialCode) {
      // Use the initialCode directly (it already contains the full component)
      // Check if initialCode already has imports
      if (!initialCode.includes('"use client"') && !initialCode.includes("import React")) {
        // Add necessary imports at the top
        const imports = `"use client"

import React from "react";
import { cn } from "@/lib/utils";

`
        return `${imports}${initialCode}`
      } else {
        // initialCode already has imports, use it as-is
        return initialCode
      }
    }
    if (cardMeta) {
      // Convert hex to rgb for color props
      const hexToRgb = (hex: string) => {
        if (!hex || !hex.startsWith('#')) return hex
        const r = parseInt(hex.slice(1, 3), 16)
        const g = parseInt(hex.slice(3, 5), 16)
        const b = parseInt(hex.slice(5, 7), 16)
        return `rgb(${r} ${g} ${b})`
      }

      // Build props list - show all props with their current values (including defaults)
      const propsList: string[] = []
      Object.entries(props).forEach(([key, value]) => {
        if (value === undefined || value === "") return
        const propConfig = config.props[key]
        if (!propConfig) return
        
        // Handle special cases for card props
        if (key === "features" && typeof value === "string") {
          // Convert newline-separated string to array
          const features = value.split("\n").filter((f: string) => f.trim())
          propsList.push(`features={${JSON.stringify(features)}}`)
        } else if (key === "skills" && typeof value === "string") {
          // Convert newline-separated string to array
          const skills = value.split("\n").filter((s: string) => s.trim())
          propsList.push(`skills={${JSON.stringify(skills)}}`)
        } else if (key === "rows" && typeof value === "string") {
          // Convert comparison rows format: "Label:Left:Right"
          const rows = value.split("\n").map((row: string) => {
            const [label, left, right] = row.split(":")
            return { label: label?.trim() || "", left: left?.trim() || "", right: right?.trim() || "" }
          }).filter((r: any) => r.label)
          propsList.push(`rows={${JSON.stringify(rows)}}`)
        } else if (key === "items" && typeof value === "string") {
          // Convert roadmap items format: "Title:Status:Color"
          const items = value.split("\n").map((item: string) => {
            const [title, status, color] = item.split(":")
            return { 
              title: title?.trim() || "", 
              status: status?.trim() || "", 
              color: color?.trim() === "green" ? "bg-green-500" : color?.trim() === "yellow" ? "bg-yellow-500" : "bg-neutral-600"
            }
          }).filter((i: any) => i.title)
          propsList.push(`items={${JSON.stringify(items)}}`)
        } else if (key === "hourlyForecast" && typeof value === "string") {
          // Convert hourly forecast format: "Time:Temp"
          const forecast = value.split("\n").map((f: string) => {
            const [time, temp] = f.split(":")
            return { time: time?.trim() || "", temp: parseInt(temp?.trim() || "0") }
          }).filter((f: any) => f.time)
          propsList.push(`hourlyForecast={${JSON.stringify(forecast)}}`)
        } else if ((key.includes("Color") || key === "backgroundColor" || key === "textColor" || key === "borderColor" || key === "revealColor" || key === "gradientFrom" || key === "gradientTo") && typeof value === "string" && value.startsWith("#")) {
          // Convert color props to rgb format
          propsList.push(`${key}="${hexToRgb(value)}"`)
        } else if (typeof value === "boolean") {
          propsList.push(`${key}={${value}}`)
        } else if (typeof value === "number") {
          propsList.push(`${key}={${value}}`)
        } else if (typeof value === "string") {
          // Escape quotes in strings
          const escapedValue = value.replace(/"/g, '\\"')
          propsList.push(`${key}="${escapedValue}"`)
        } else {
          propsList.push(`${key}={${JSON.stringify(value)}}`)
        }
      })

      const propsString = propsList.length > 0 ? `\n  ${propsList.join("\n  ")}\n` : ""

      return `"use client"

import { ${cardMeta.componentName} } from "@/components/customize/cards"

export default function ${cardMeta.componentName}Example() {
  return (
    <div className="flex items-center justify-center p-8 min-h-[200px]">
      <div className="max-w-sm w-full">
        <${cardMeta.componentName}${propsString} />
      </div>
    </div>
  )
}`
    }

    // Dialog section code generation - try both componentName and actualComponentName
    let dialogMeta = dialogNameToMeta[componentName] || dialogNameToMeta[actualComponentName]
    if (!dialogMeta) {
      // Try to find by slug
      const dialogMetaBySlug = dialogSections.find(d => d.slug === slug)
      if (dialogMetaBySlug) {
        dialogMeta = dialogNameToMeta[dialogMetaBySlug.name]
      }
    }
    if (dialogMeta && initialCode) {
      // Use the initialCode directly (it already contains the full component)
      // Check if initialCode already has imports
      if (!initialCode.includes('"use client"') && !initialCode.includes("import React")) {
        // Add necessary imports at the top
        const imports = `"use client"

import React, { useState } from "react";
import { cn } from "@/lib/utils";

`
        return `${imports}${initialCode}`
      } else {
        // initialCode already has imports, use it as-is
        return initialCode
      }
    }
    if (dialogMeta) {
      // Convert hex to rgb for color props
      const hexToRgb = (hex: string) => {
        if (!hex || !hex.startsWith('#')) return hex
        const r = parseInt(hex.slice(1, 3), 16)
        const g = parseInt(hex.slice(3, 5), 16)
        const b = parseInt(hex.slice(5, 7), 16)
        return `rgb(${r} ${g} ${b})`
      }

      // Build props list - show all props with their current values (including defaults)
      const propsList: string[] = []
      Object.entries(props).forEach(([key, value]) => {
        if (value === undefined || value === "") return
        const propConfig = config.props[key]
        if (!propConfig) return
        
        if ((key.includes("Color") || key === "backgroundColor" || key === "textColor" || key === "borderColor" || key === "buttonColor" || key === "buttonHoverColor") && typeof value === "string" && value.startsWith("#")) {
          // Convert color props to rgb format
          propsList.push(`${key}="${hexToRgb(value)}"`)
        } else if (typeof value === "boolean") {
          propsList.push(`${key}={${value}}`)
        } else if (typeof value === "number") {
          propsList.push(`${key}={${value}}`)
        } else if (typeof value === "string") {
          // Escape quotes in strings
          const escapedValue = value.replace(/"/g, '\\"')
          propsList.push(`${key}="${escapedValue}"`)
        } else {
          propsList.push(`${key}={${JSON.stringify(value)}}`)
        }
      })

      const propsString = propsList.length > 0 ? `\n    ${propsList.join("\n    ")}\n  ` : ""

      // Generate complete, ready-to-use component code
      return `"use client"

import { ${dialogMeta.componentName} } from "@/components/customize/dialogs"

export default function ${dialogMeta.componentName}Example() {
  return (
    <div className="flex items-center justify-center p-8 min-h-[200px]">
      <${dialogMeta.componentName}${propsString}/>
    </div>
  )
}`
    }

    // Toggle section code generation with initialCode (full component)
    let toggleMeta = toggleNameToMeta[componentName] || toggleNameToMeta[actualComponentName]
    if (!toggleMeta) {
      // Try to find by slug
      const toggleMetaBySlug = toggleSections.find(t => t.slug === slug)
      if (toggleMetaBySlug) {
        toggleMeta = toggleNameToMeta[toggleMetaBySlug.name]
      }
    }

    let tabsMeta: (typeof tabsSections)[number] | undefined
    tabsMeta = tabsNameToMeta[componentName]
    if (!tabsMeta) {
      // Try to find by slug
      const tabsMetaBySlug = tabsSections.find(t => t.slug === slug)
      if (tabsMetaBySlug) {
        tabsMeta = tabsNameToMeta[tabsMetaBySlug.name]
      }
    }

    let sidebarMeta: (typeof sidebarSections)[number] | undefined
    sidebarMeta = sidebarNameToMeta[componentName]
    if (!sidebarMeta) {
      // Try to find by slug
      const sidebarMetaBySlug = sidebarSections.find(s => s.slug === slug)
      if (sidebarMetaBySlug) {
        sidebarMeta = sidebarNameToMeta[sidebarMetaBySlug.name]
      }
    }
    if (toggleMeta && initialCode) {
      // Use the initialCode directly (it already contains the full component)
      // The initialCode from the file includes the component definition and interface
      // We need to add the necessary imports and helper functions at the top
      // Check if initialCode already has imports (it shouldn't, as we extract only the component)
      if (!initialCode.includes('"use client"') && !initialCode.includes("import React")) {
        // Add necessary imports and helper functions at the top
        const imports = `"use client"

import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { 
  Sun, 
  Moon, 
  Check, 
  X, 
  Lock, 
  Unlock, 
  Power, 
  Volume2, 
  VolumeX, 
  Wifi, 
  WifiOff 
} from "lucide-react";

// Helper function to convert hex to rgb
const hexToRgb = (hex: string): string | undefined => {
  if (!hex) return undefined;
  const result = /^#?([a-f\\d]{2})([a-f\\d]{2})([a-f\\d]{2})$/i.exec(hex);
  if (!result) return hex; // Return as-is if not a valid hex
  const r = parseInt(result[1], 16);
  const g = parseInt(result[2], 16);
  const b = parseInt(result[3], 16);
  return \`rgb(\${r} \${g} \${b})\`;
};

// Common toggle props interface
export interface ToggleProps {
  className?: string;
  defaultChecked?: boolean;
  activeColor?: string;
  inactiveColor?: string;
  thumbColor?: string;
}

`

        return `${imports}${initialCode}`
      } else {
        // initialCode already has imports, use it as-is
        return initialCode
      }
    }

    // Toggle section code generation (simple import)
    if (toggleMeta) {
      // Convert hex to rgb for color props
      const hexToRgb = (hex: string) => {
        if (!hex || !hex.startsWith('#')) return hex
        const r = parseInt(hex.slice(1, 3), 16)
        const g = parseInt(hex.slice(3, 5), 16)
        const b = parseInt(hex.slice(5, 7), 16)
        return `rgb(${r} ${g} ${b})`
      }

      // Build props list - show all props with their current values (including defaults)
      const propsList: string[] = []
      Object.entries(props).forEach(([key, value]) => {
        if (value === undefined || value === "") return
        const propConfig = config.props[key]
        if (!propConfig) return
        
        if ((key.includes("Color") || key === "activeColor" || key === "inactiveColor" || key === "thumbColor") && typeof value === "string" && value.startsWith("#")) {
          // Convert color props to rgb format
          propsList.push(`${key}="${hexToRgb(value)}"`)
        } else if (typeof value === "boolean") {
          propsList.push(`${key}={${value}}`)
        } else if (typeof value === "number") {
          propsList.push(`${key}={${value}}`)
        } else if (typeof value === "string") {
          // Escape quotes in strings
          const escapedValue = value.replace(/"/g, '\\"')
          propsList.push(`${key}="${escapedValue}"`)
        } else {
          propsList.push(`${key}={${JSON.stringify(value)}}`)
        }
      })

      const propsString = propsList.length > 0 ? `\n    ${propsList.join("\n    ")}\n  ` : ""

      // Generate complete, ready-to-use component code
      return `"use client"

import { ${toggleMeta.componentName} } from "@/components/customize/toggles"

export default function ${toggleMeta.componentName}Example() {
  return (
    <div className="flex items-center justify-center p-8 min-h-[200px]">
      <${toggleMeta.componentName}${propsString}/>
    </div>
  )
}`
    }

    // Tabs section code generation with initialCode (full component)
    if (tabsMeta && initialCode) {
      // Use the initialCode directly (it already contains the full component)
      // Check if initialCode already has imports
      if (!initialCode.includes('"use client"') && !initialCode.includes("import React")) {
        // Add necessary imports and helper functions at the top
        const imports = `"use client"

import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { 
  Home, 
  Settings, 
  User, 
  MessageSquare, 
  Bell, 
  Star, 
  Zap, 
  Layout, 
  Code, 
  Terminal, 
  Activity, 
  Box, 
  Layers, 
  Shield, 
  CreditCard,
  Music,
  Video,
  Image as ImageIcon,
  FileText,
  Folder,
  Search,
  ShoppingBag,
  Hash
} from "lucide-react";

// Helper function to convert hex to rgb
const hexToRgb = (hex: string): string | undefined => {
  if (!hex) return undefined;
  const result = /^#?([a-f\\d]{2})([a-f\\d]{2})([a-f\\d]{2})$/i.exec(hex);
  if (!result) return hex; // Return as-is if not a valid hex
  const r = parseInt(result[1], 16);
  const g = parseInt(result[2], 16);
  const b = parseInt(result[3], 16);
  return \`rgb(\${r} \${g} \${b})\`;
};

// Common tabs props interface
export interface TabsProps {
  className?: string;
  tabs?: string;
  defaultActive?: string;
  activeColor?: string;
  inactiveColor?: string;
  backgroundColor?: string;
}

`

        return `${imports}${initialCode}`
      } else {
        // initialCode already has imports, use it as-is
        return initialCode
      }
    }

    // Tabs section code generation (simple import)
    if (tabsMeta) {
      // Convert hex to rgb for color props
      const hexToRgb = (hex: string) => {
        if (!hex || !hex.startsWith('#')) return hex
        const r = parseInt(hex.slice(1, 3), 16)
        const g = parseInt(hex.slice(3, 5), 16)
        const b = parseInt(hex.slice(5, 7), 16)
        return `rgb(${r} ${g} ${b})`
      }

      // Build props list - show all props with their current values (including defaults)
      const propsList: string[] = []
      Object.entries(props).forEach(([key, value]) => {
        if (value === undefined || value === "") return
        const propConfig = config.props[key]
        if (!propConfig) return
        
        if ((key.includes("Color") || key === "activeColor" || key === "inactiveColor" || key === "backgroundColor") && typeof value === "string" && value.startsWith("#")) {
          // Convert color props to rgb format
          propsList.push(`${key}="${hexToRgb(value)}"`)
        } else if (typeof value === "boolean") {
          propsList.push(`${key}={${value}}`)
        } else if (typeof value === "number") {
          propsList.push(`${key}={${value}}`)
        } else if (typeof value === "string") {
          // Escape quotes in strings and handle newlines
          const escapedValue = value.replace(/"/g, '\\"').replace(/\n/g, '\\n')
          propsList.push(`${key}="${escapedValue}"`)
        } else {
          propsList.push(`${key}={${JSON.stringify(value)}}`)
        }
      })

      const propsString = propsList.length > 0 ? `\n    ${propsList.join("\n    ")}\n  ` : ""

      // Generate complete, ready-to-use component code
      return `"use client"

import { ${tabsMeta.componentName} } from "@/components/customize/tabs"

export default function ${tabsMeta.componentName}Example() {
  return (
    <div className="flex items-center justify-center p-8 min-h-[200px]">
      <${tabsMeta.componentName}${propsString}/>
    </div>
  )
}`
    }

    // For sidebar components with initialCode
    if (sidebarMeta && initialCode) {
      // Use the initialCode directly (it already contains the full component)
      // Check if initialCode already has imports
      if (!initialCode.includes('"use client"') && !initialCode.includes("import React")) {
        // Add necessary imports and helper functions at the top
        const imports = `"use client"

import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { 
  Home, 
  Search, 
  Settings, 
  User, 
  Bell, 
  Grid, 
  Briefcase, 
  Calendar, 
  MessageSquare, 
  PieChart, 
  Folder, 
  FileText, 
  LogOut, 
  Plus, 
  ChevronRight, 
  ChevronDown, 
  MoreHorizontal, 
  Zap, 
  Shield, 
  Database, 
  Cloud, 
  Code, 
  Terminal, 
  Layout, 
  Command, 
  Hash, 
  Music, 
  Disc, 
  Mic, 
  Radio, 
  Box, 
  Layers, 
  Flag,
  MapPin,
  Compass,
  Gift,
  CreditCard,
  Phone,
  Moon,
  Sun,
  Laptop,
  Heart,
  Star
} from "lucide-react";

`
        return `${imports}${initialCode}`
      } else {
        // initialCode already has imports, use as-is
        return initialCode
      }
    }

    // For sidebar components without initialCode, generate usage example
    if (sidebarMeta) {
      // Helper to convert hex to rgb
      const hexToRgb = (hex: string): string => {
        if (!hex || !hex.startsWith('#')) return hex
        const r = parseInt(hex.slice(1, 3), 16)
        const g = parseInt(hex.slice(3, 5), 16)
        const b = parseInt(hex.slice(5, 7), 16)
        return `rgb(${r} ${g} ${b})`
      }

      // Build props list - show all props with their current values (including defaults)
      const propsList: string[] = []
      Object.entries(props).forEach(([key, value]) => {
        if (value === undefined || value === "") return
        const propConfig = config.props[key]
        if (!propConfig) return
        
        if ((key.includes("Color") || key === "activeColor" || key === "inactiveColor" || key === "backgroundColor") && typeof value === "string" && value.startsWith("#")) {
          // Convert color props to rgb format
          propsList.push(`${key}="${hexToRgb(value)}"`)
        } else if (typeof value === "boolean") {
          propsList.push(`${key}={${value}}`)
        } else if (typeof value === "number") {
          propsList.push(`${key}={${value}}`)
        } else if (typeof value === "string") {
          // Escape quotes in strings and handle newlines
          const escapedValue = value.replace(/"/g, '\\"').replace(/\n/g, '\\n')
          propsList.push(`${key}="${escapedValue}"`)
        } else {
          propsList.push(`${key}={${JSON.stringify(value)}}`)
        }
      })

      const propsString = propsList.length > 0 ? `\n    ${propsList.join("\n    ")}\n  ` : ""

      // Generate complete, ready-to-use component code
      return `"use client"

import { ${sidebarMeta.componentName} } from "@/components/customize/sidebars"

export default function ${sidebarMeta.componentName}Example() {
  return (
    <div className="flex items-center justify-center p-8 min-h-[200px]">
      <${sidebarMeta.componentName}${propsString}/>
    </div>
  )
}`
    }

    // For tabbar components with initialCode
    let tabbarMeta: (typeof tabbarSections)[number] | undefined
    tabbarMeta = tabbarNameToMeta[componentName]
    if (!tabbarMeta) {
      // Try to find by slug
      const tabbarMetaBySlug = tabbarSections.find(t => t.slug === slug)
      if (tabbarMetaBySlug) {
        tabbarMeta = tabbarNameToMeta[tabbarMetaBySlug.name]
      }
    }

    // For sheet components with initialCode
    let sheetMeta: (typeof sheetSections)[number] | undefined
    sheetMeta = sheetNameToMeta[componentName]
    if (!sheetMeta) {
      // Try to find by slug
      const sheetMetaBySlug = sheetSections.find(s => s.slug === slug)
      if (sheetMetaBySlug) {
        sheetMeta = sheetNameToMeta[sheetMetaBySlug.name]
      }
    }

    if (tabbarMeta && initialCode) {
      // Use the initialCode directly (it already contains the full component)
      // Check if initialCode already has imports
      if (!initialCode.includes('"use client"') && !initialCode.includes("import React")) {
        // Add necessary imports and helper functions at the top
        const imports = `"use client"

import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { 
  Home, 
  Search, 
  User, 
  Bell, 
  Settings, 
  Plus, 
  Heart, 
  ShoppingBag, 
  Map, 
  Calendar, 
  MessageSquare, 
  Menu, 
  Compass, 
  Star, 
  Video, 
  Music, 
  Grid, 
  Layers, 
  Zap, 
  Radio,
  Scan,
  Box,
  TrendingUp,
  Mail,
  Send
} from "lucide-react";

`
        return `${imports}${initialCode}`
      } else {
        // initialCode already has imports, use as-is
        return initialCode
      }
    }

    // For tabbar components without initialCode, generate usage example
    if (tabbarMeta) {
      // Helper to convert hex to rgb
      const hexToRgb = (hex: string): string => {
        if (!hex || !hex.startsWith('#')) return hex
        const r = parseInt(hex.slice(1, 3), 16)
        const g = parseInt(hex.slice(3, 5), 16)
        const b = parseInt(hex.slice(5, 7), 16)
        return `rgb(${r} ${g} ${b})`
      }

      // Build props list - show all props with their current values (including defaults)
      const propsList: string[] = []
      Object.entries(props).forEach(([key, value]) => {
        if (value === undefined || value === "") return
        const propConfig = config.props[key]
        if (!propConfig) return
        
        if ((key.includes("Color") || key === "activeColor" || key === "inactiveColor" || key === "backgroundColor" || key === "fabColor" || key === "fabShadowColor" || key === "glowColor" || key === "gradientFrom" || key === "gradientTo" || key === "pillBackgroundColor" || key === "pillTextColor" || key === "activeTextColor" || key === "activeBackgroundColor" || key === "containerBackgroundColor" || key === "indicatorColor" || key === "iconColor" || key === "borderColor" || key === "textColor" || key === "dotColor" || key === "dividerColor") && typeof value === "string" && value.startsWith("#")) {
          // Convert color props to rgb format
          propsList.push(`${key}="${hexToRgb(value)}"`)
        } else if (typeof value === "boolean") {
          propsList.push(`${key}={${value}}`)
        } else if (typeof value === "number") {
          propsList.push(`${key}={${value}}`)
        } else if (typeof value === "string") {
          // Escape quotes in strings and handle newlines
          const escapedValue = value.replace(/"/g, '\\"').replace(/\n/g, '\\n')
          propsList.push(`${key}="${escapedValue}"`)
        } else {
          propsList.push(`${key}={${JSON.stringify(value)}}`)
        }
      })

      const propsString = propsList.length > 0 ? `\n    ${propsList.join("\n    ")}\n  ` : ""

      // Generate complete, ready-to-use component code
      return `"use client"

import { ${tabbarMeta.componentName} } from "@/components/customize/tabbars"

export default function ${tabbarMeta.componentName}Example() {
  return (
    <div className="flex items-center justify-center p-8 min-h-[200px]">
      <${tabbarMeta.componentName}${propsString}/>
    </div>
  )
}`
    }

    // For sheet components with initialCode
    if (sheetMeta && initialCode) {
      // Use the initialCode directly (it already contains the full component)
      // Check if initialCode already has imports
      if (!initialCode.includes('"use client"') && !initialCode.includes("import React")) {
        // Add necessary imports and helper functions at the top
        const imports = `"use client"

import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { 
  X, 
  ChevronLeft, 
  ChevronRight, 
  Settings, 
  User, 
  CreditCard, 
  Bell, 
  ShoppingBag, 
  Filter, 
  Sliders, 
  Check, 
  Search, 
  MoreVertical, 
  Share2, 
  Heart, 
  MessageCircle, 
  Trash2, 
  FileText, 
  Image as ImageIcon, 
  Music, 
  Video, 
  List, 
  LogOut, 
  Plus, 
  Minus,
  Calendar,
  MapPin,
  Clock,
  ArrowRight,
  Shield,
  Zap,
  Github,
  Code
} from "lucide-react";
import { ShinyButton } from "./ShinyButton";

`
        return `${imports}${initialCode}`
      } else {
        // initialCode already has imports, use as-is
        return initialCode
      }
    }

    // For sheet components without initialCode, generate usage example
    if (sheetMeta) {
      // Helper to convert hex to rgb
      const hexToRgb = (hex: string): string => {
        if (!hex || !hex.startsWith('#')) return hex
        const r = parseInt(hex.slice(1, 3), 16)
        const g = parseInt(hex.slice(3, 5), 16)
        const b = parseInt(hex.slice(5, 7), 16)
        return `rgb(${r} ${g} ${b})`
      }

      // Build props list - show all props with their current values (including defaults)
      const propsList: string[] = []
      Object.entries(props).forEach(([key, value]) => {
        if (value === undefined || value === "") return
        const propConfig = config.props[key]
        if (!propConfig) return
        
        if ((key.includes("Color") || key === "backgroundColor" || key === "textColor" || key === "borderColor" || key === "activeColor" || key === "hoverColor" || key === "buttonColor") && typeof value === "string" && value.startsWith("#")) {
          // Convert color props to rgb format
          propsList.push(`${key}="${hexToRgb(value)}"`)
        } else if (typeof value === "boolean") {
          propsList.push(`${key}={${value}}`)
        } else if (typeof value === "number") {
          propsList.push(`${key}={${value}}`)
        } else if (typeof value === "string") {
          // Escape quotes in strings and handle newlines
          const escapedValue = value.replace(/"/g, '\\"').replace(/\n/g, '\\n')
          propsList.push(`${key}="${escapedValue}"`)
        } else {
          propsList.push(`${key}={${JSON.stringify(value)}}`)
        }
      })

      const propsString = propsList.length > 0 ? `\n    ${propsList.join("\n    ")}\n  ` : ""

      // Generate complete, ready-to-use component code
      return `"use client"

import { ${sheetMeta.componentName} } from "@/components/customize/sheets"

export default function ${sheetMeta.componentName}Example() {
  return (
    <div className="flex items-center justify-center p-8 min-h-[200px]">
      <${sheetMeta.componentName}${propsString}/>
    </div>
  )
}`
    }

    // For table components with initialCode
    if (tableMeta && initialCode) {
      // Use the initialCode directly (it already contains the full component)
      // Check if initialCode already has imports
      if (!initialCode.includes('"use client"') && !initialCode.includes("import React")) {
        // Add necessary imports and helper functions at the top
        const imports = `"use client"

import React from "react";
import { cn } from "@/lib/utils";
import { 
  MoreHorizontal, 
  Filter, 
  FileText,
  Image as ImageIcon,
  MoreVertical,
  Download,
  ChevronLeft,
  ChevronRight,
  Plus,
  CheckCircle2,
} from "lucide-react";

// Helper function to convert hex to rgb
const hexToRgb = (hex: string): string | undefined => {
  if (!hex) return undefined;
  const result = /^#?([a-f\\d]{2})([a-f\\d]{2})([a-f\\d]{2})$/i.exec(hex);
  if (!result) return hex;
  const r = parseInt(result[1], 16);
  const g = parseInt(result[2], 16);
  const b = parseInt(result[3], 16);
  return \`rgb(\${r} \${g} \${b})\`;
};

`
        return `${imports}${initialCode}`
      } else {
        // initialCode already has imports, use as-is
        return initialCode
      }
    }

    // For table components without initialCode, generate usage example
    if (tableMeta) {
      // Helper to convert hex to rgb
      const hexToRgb = (hex: string): string => {
        if (!hex || !hex.startsWith('#')) return hex
        const r = parseInt(hex.slice(1, 3), 16)
        const g = parseInt(hex.slice(3, 5), 16)
        const b = parseInt(hex.slice(5, 7), 16)
        return `rgb(${r} ${g} ${b})`
      }

      // Build props list - show all props with their current values
      const propsList: string[] = []
      Object.entries(props).forEach(([key, value]) => {
        if (value === undefined || value === "") return
        const propConfig = config.props[key]
        if (!propConfig) return
        
        if ((key.includes("Color") || key === "backgroundColor" || key === "textColor" || key === "borderColor") && typeof value === "string" && value.startsWith("#")) {
          // Convert color props to rgb format
          propsList.push(`${key}="${hexToRgb(value)}"`)
        } else if (typeof value === "boolean") {
          propsList.push(`${key}={${value}}`)
        } else if (typeof value === "number") {
          propsList.push(`${key}={${value}}`)
        } else if (typeof value === "string") {
          const escapedValue = value.replace(/"/g, '\\"')
          propsList.push(`${key}="${escapedValue}"`)
        } else {
          propsList.push(`${key}={${JSON.stringify(value)}}`)
        }
      })

      const propsString = propsList.length > 0 ? `\n    ${propsList.join("\n    ")}\n  ` : ""

      // Generate complete, ready-to-use component code
      return `"use client"

import { ${tableMeta.componentName} } from "@/components/customize/tables"

export default function ${tableMeta.componentName}Example() {
  return (
    <div className="flex items-center justify-center p-8 min-h-[200px]">
      <${tableMeta.componentName}${propsString}/>
    </div>
  )
}`
    }

    // For chart components with initialCode
    if (chartMeta && initialCode) {
      // Use the initialCode directly (it already contains the full component)
      // Check if initialCode already has imports
      if (!initialCode.includes('"use client"') && !initialCode.includes("import React")) {
        // Add necessary imports and helper functions at the top
        const imports = `"use client"

import React from "react";
import { cn } from "@/lib/utils";
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  Legend
} from "recharts";

// Helper function to convert hex to rgb
const hexToRgb = (hex: string): string | undefined => {
  if (!hex) return undefined;
  const result = /^#?([a-f\\d]{2})([a-f\\d]{2})([a-f\\d]{2})$/i.exec(hex);
  if (!result) return hex;
  const r = parseInt(result[1], 16);
  const g = parseInt(result[2], 16);
  const b = parseInt(result[3], 16);
  return \`rgb(\${r} \${g} \${b})\`;
};

`
        return `${imports}${initialCode}`
      } else {
        // initialCode already has imports, use as-is
        return initialCode
      }
    }

    // For chart components without initialCode, generate usage example
    if (chartMeta) {
      // Helper to convert hex to rgb
      const hexToRgb = (hex: string): string => {
        if (!hex || !hex.startsWith('#')) return hex
        const r = parseInt(hex.slice(1, 3), 16)
        const g = parseInt(hex.slice(3, 5), 16)
        const b = parseInt(hex.slice(5, 7), 16)
        return `rgb(${r} ${g} ${b})`
      }

      // Build props list - show all props with their current values
      const propsList: string[] = []
      const addedKeys = new Set<string>()
      
      Object.entries(props).forEach(([key, value]) => {
        const propConfig = config.props[key]
        if (!propConfig) return
        
        // Skip undefined values
        if (value === undefined) return
        
        // For boolean props, always include (even if false)
        if (typeof value === "boolean") {
          propsList.push(`${key}={${value}}`)
          addedKeys.add(key)
          return
        }
        
        // For number props, always include if not undefined
        if (typeof value === "number") {
          propsList.push(`${key}={${value}}`)
          addedKeys.add(key)
          return
        }
        
        // For string props
        if (typeof value === "string") {
          // For data prop, always include the actual value from props (what user entered)
          if (key === "data") {
            // Always use the current value from props (what user entered in ChartDataEditor)
            // Only fallback to default if value is truly empty/undefined
            const dataValue = (value && value.trim() !== "") ? value : (propConfig.default || "")
            if (dataValue && dataValue.trim() !== "") {
              // Escape quotes and newlines for proper string formatting
              const escapedValue = dataValue.replace(/\\/g, '\\\\').replace(/"/g, '\\"').replace(/\n/g, '\\n')
              propsList.push(`${key}="${escapedValue}"`)
              addedKeys.add(key)
            }
            return
          }
          
          // Include other string props if not empty
          if (value.trim() !== "") {
            // Handle colors prop (newline-separated hex colors)
            if (key === "colors" && value.includes("\n")) {
              const colorLines = value.split("\n").filter(c => c.trim() !== "")
              const rgbColors = colorLines.map(c => {
                const trimmed = c.trim()
                return trimmed.startsWith("#") ? hexToRgb(trimmed) : trimmed
              }).join("\\n")
              propsList.push(`${key}="${rgbColors}"`)
            }
            // Handle regular color props (single hex color)
            else if ((key.includes("Color") || key === "backgroundColor" || key === "textColor" || key === "borderColor" || key === "barColor" || key === "lineColor" || key === "areaColor") && value.startsWith("#")) {
              propsList.push(`${key}="${hexToRgb(value)}"`)
            }
            // Handle regular string props
            else {
              const escapedValue = value.replace(/"/g, '\\"').replace(/\n/g, '\\n')
              propsList.push(`${key}="${escapedValue}"`)
            }
            addedKeys.add(key)
          }
          return
        }
        
        // For other types, use JSON.stringify
        if (value !== null && value !== "") {
          propsList.push(`${key}={${JSON.stringify(value)}}`)
          addedKeys.add(key)
        }
      })
      
      // Also include important props that have defaults but are not in current props
      // This ensures important display options and data are included even if not explicitly set
      const importantBooleanProps = ["showXAxis", "showYAxis", "showGrid", "showTooltip", "showLegend", "showLabels", "showDots"]
      Object.entries(config.props).forEach(([key, propConfig]: [string, any]) => {
        // Skip if already added
        if (addedKeys.has(key)) return
        
        // Include important boolean props with their default values
        if (importantBooleanProps.includes(key) && propConfig.control === "boolean") {
          const defaultValue = propConfig.default !== undefined ? propConfig.default : false
          propsList.push(`${key}={${defaultValue}}`)
          addedKeys.add(key)
        }
        
        // Include data prop with default value if not already added
        if (key === "data" && propConfig.control === "textarea" && propConfig.default) {
          const defaultData = String(propConfig.default)
          if (defaultData.trim() !== "") {
            const escapedValue = defaultData.replace(/"/g, '\\"').replace(/\n/g, '\\n')
            propsList.push(`${key}="${escapedValue}"`)
            addedKeys.add(key)
          }
        }
      })

      const propsString = propsList.length > 0 ? `\n    ${propsList.join("\n    ")}\n  ` : ""

      // Generate complete, ready-to-use component code
      return `"use client"

import { ${chartMeta.componentName} } from "@/components/customize/charts"

export default function ${chartMeta.componentName}Example() {
  return (
    <div className="flex items-center justify-center p-8 min-h-[200px]">
      <${chartMeta.componentName}${propsString}/>
    </div>
  )
}`
    }

    // Default code generation for components without specific handlers
    // Try to determine if it's a shadcn component or custom component
    const shadcnComponents = ["Button", "Badge", "Checkbox", "Progress", "Switch", "Input", "Card", "Alert", "Avatar"]
    const isShadcnComponent = shadcnComponents.includes(componentName)
    
    // Get import path based on component type
    let importPath = ""
    if (isShadcnComponent) {
      const componentPathMap: Record<string, string> = {
        Button: "@/components/ui/button",
        Badge: "@/components/ui/badge",
        Checkbox: "@/components/ui/checkbox",
        Progress: "@/components/ui/progress",
        Switch: "@/components/ui/switch",
        Input: "@/components/ui/input",
        Card: "@/components/ui/card",
        Alert: "@/components/ui/alert",
        Avatar: "@/components/ui/avatar",
      }
      importPath = componentPathMap[componentName] || "@/components/ui/" + componentName.toLowerCase()
    } else {
      // For custom components, try to infer the import path
      importPath = `@/components/customize/${componentName.toLowerCase()}s`
    }

    if (children) {
      return `import { ${componentName} } from "${importPath}"

export default function ${componentName}Example() {
  return (
    <${componentName}${propsString ? " " + propsString : ""}>${children}</${componentName}>
  )
}`
    }

    return `import { ${componentName} } from "${importPath}"

export default function ${componentName}Example() {
  return (
    <div className="flex items-center justify-center p-8 min-h-[200px]">
      <${componentName}${propsString ? " " + propsString : ""} />
    </div>
  )
}`
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
    <div className="relative w-full">
      <div className="flex flex-col gap-6 min-w-0 w-full">
        <div className="relative" ref={playgroundRef} data-playground>
          {config && config.render ? (
            (() => {
              try {
                const rendered = config.render(props, setProps)
                if (!rendered) {
                  console.warn(`Render function returned null for ${componentName}`)
                  return (
                    <div className="text-center text-muted-foreground">
                      Component returned null
                    </div>
                  )
                }
                return rendered
              } catch (error) {
                console.error(`Error in render function for ${componentName}:`, error)
                return (
                  <div className="text-center text-muted-foreground p-4">
                    <div>Error rendering component</div>
                    <div className="text-xs mt-2">{String(error)}</div>
                  </div>
                )
              }
            })()
          ) : (
            <div className="text-center text-muted-foreground">
              {!config ? (
                <div>
                  <div>Config not found for: {componentName}</div>
                  <div className="text-xs mt-2">Slug: {slug}</div>
                  <div className="text-xs mt-1">Available card configs: {Object.keys(componentConfigs).filter(k => k.includes('Card')).slice(0, 5).join(', ')}</div>
                </div>
              ) : (
                <div>Render function not available</div>
              )}
            </div>
          )}
          <Button
            variant="outline"
            size="icon"
            className="absolute right-4 top-4 z-10 h-10 w-10 rounded-full shadow-md bg-background border-muted-foreground/20"
            onClick={() => setShowSidebar(true)}
          >
            <Settings2 className="h-5 w-5" />
          </Button>
        </div>

        <Card className="p-6 min-w-0">
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
          <div className="w-full min-w-0 overflow-hidden">
            <pre className="bg-muted p-4 rounded-lg overflow-x-auto overflow-y-auto text-sm max-h-[400px] w-full min-w-0 scrollbar-thin scrollbar-thumb-border scrollbar-track-transparent hover:scrollbar-thumb-muted-foreground transition-colors">
              <code className="block whitespace-pre">{generateCode()}</code>
            </pre>
          </div>
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
                  <th className="text-left p-3 font-medium">Description</th>
                </tr>
              </thead>
              <tbody>
                {(() => {
                  const componentDetail = componentDetails[slug]
                  const propsMap = componentDetail?.props || []

                  return Object.entries(config.props).map(([key, propConfig]: [string, any]) => {
                    const propDetail = propsMap.find((p: any) => p.name === key)
                    return (
                      <tr key={key} className="border-t">
                        <td className="p-3 font-mono text-xs">{key}</td>
                        <td className="p-3">
                          <Badge variant="secondary">{propConfig.type === "slider" ? "number" : propConfig.type}</Badge>
                        </td>
                        <td className="p-3 font-mono text-xs text-muted-foreground">
                          {String(propConfig.default || "-")}
                        </td>
                        <td className="p-3 text-xs text-muted-foreground">
                          {propDetail?.description || "-"}
                        </td>
                      </tr>
                    )
                  })
                })()}
              </tbody>
            </table>
          </div>
        </Card>

        {(() => {
          const componentDetail = componentDetails[slug]
          if (!componentDetail || (!componentDetail.variants?.length && !componentDetail.examples?.length)) {
            return null
          }

          return (
            <>
              {componentDetail.variants && componentDetail.variants.length > 0 && (
                <div>
                  <Card className="p-6">
                    <h3 className="font-semibold mb-4">Variants</h3>
                    <div className="space-y-6">
                      {componentDetail.variants.map((variant, index) => (
                        <div key={index} className="space-y-3">
                          <div>
                            <h4 className="font-medium text-sm mb-1">{variant.name}</h4>
                            <p className="text-sm text-muted-foreground">{variant.description}</p>
                          </div>
                          <CodeBlock code={variant.code} />
                        </div>
                      ))}
                    </div>
                  </Card>
                </div>
              )}

              {componentDetail.examples && componentDetail.examples.length > 0 && (
                <div>
                  <Card className="p-6">
                    <h3 className="font-semibold mb-4">Examples</h3>
                    <div className="space-y-8">
                      {componentDetail.examples.map((example, index) => (
                        <div key={index} className="space-y-3">
                          <div>
                            <h4 className="font-medium text-base mb-1">{example.title}</h4>
                            <p className="text-sm text-muted-foreground">{example.description}</p>
                          </div>
                          <CodeBlock code={example.code} />
                        </div>
                      ))}
                    </div>
                  </Card>
                </div>
              )}
            </>
          )
        })()}
      </div>

      <Sheet open={showSidebar} onOpenChange={setShowSidebar} modal={false}>
        <SheetContent className="w-[400px] sm:max-w-[400px] overflow-y-auto p-0" side="right" onInteractOutside={(e) => e.preventDefault()}>
          <SheetHeader className="p-6 border-b sticky top-0 bg-background z-10">
            <SheetTitle>Customize</SheetTitle>
          </SheetHeader>
          <div className="p-6">
            {config && (
              <CustomizePanel
                componentName={actualComponentName}
                props={props}
                config={config}
                updateProp={updateProp}
                groupingConfig={buttonMeta?.groupingConfig}
              />
            )}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}
