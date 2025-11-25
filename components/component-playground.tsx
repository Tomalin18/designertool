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
import { UrlInput } from "@/components/ui/url-input"
import { MediaPlayer } from "@/components/ui/media-player"
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
  UrlInput: {
    props: {
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
        <div className="w-full max-w-2xl">
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
        </div>
      )
    },
  },
  MediaPlayer: {
    props: {
      className: { type: "text", default: "" },
      trackTitle: { type: "text", default: "Midnight City" },
      artist: { type: "text", default: "M83" },
      album: { type: "text", default: "Hurry Up, We're Dreaming" },
      albumArtUrl: { type: "text", default: "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?q=80&w=1000&auto=format&fit=crop" },
      currentTime: { type: "text", default: "2:14" },
      totalTime: { type: "text", default: "4:03" },
      progress: { type: "slider", min: 0, max: 100, default: 66.67 },
      isPlaying: { type: "boolean", default: true },
      isLoved: { type: "boolean", default: false },
      showShuffle: { type: "boolean", default: true },
      showRepeat: { type: "boolean", default: true },
      showHeart: { type: "boolean", default: true },
      backgroundColor: { type: "color", default: "#171717" },
      borderColor: { type: "color", default: "#ffffff" },
      borderRadius: { type: "slider", min: 0, max: 48, default: 24 },
      glowColor1: { type: "color", default: "#6366f1" },
      glowColor2: { type: "color", default: "#a855f7" },
      enableImageUpload: { type: "boolean", default: true },
    },
    render: (props: any) => {
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

      // Calculate current time from progress if progress is set
      let displayCurrentTime = props.currentTime;
      if (props.progress !== undefined && props.totalTime) {
        const totalSeconds = timeToSeconds(props.totalTime);
        const currentSeconds = (props.progress / 100) * totalSeconds;
        displayCurrentTime = secondsToTime(currentSeconds);
      }

      return (
        <div className="w-full max-w-sm">
          <MediaPlayer 
            className={props.className || undefined}
            trackTitle={props.trackTitle}
            artist={props.artist}
            album={props.album}
            albumArtUrl={props.albumArtUrl}
            currentTime={displayCurrentTime}
            totalTime={props.totalTime}
            progress={props.progress}
            isPlaying={props.isPlaying}
            isLoved={props.isLoved}
            showShuffle={props.showShuffle}
            showRepeat={props.showRepeat}
            showHeart={props.showHeart}
            backgroundColor={props.backgroundColor ? hexToRgbWithOpacity(props.backgroundColor, 0.6) : undefined}
            borderColor={props.borderColor ? hexToRgba(props.borderColor, 0.1) : undefined}
            borderRadius={props.borderRadius}
            glowColor1={props.glowColor1 ? hexToRgbWithOpacity(props.glowColor1, 0.2) : undefined}
            glowColor2={props.glowColor2 ? hexToRgbWithOpacity(props.glowColor2, 0.2) : undefined}
            enableImageUpload={props.enableImageUpload}
            onTimeChange={(currentTime, progress) => {
              // Progress and time are automatically synced in the component
              console.log('Time changed:', currentTime, 'Progress:', progress);
            }}
            onImageUpload={(imageUrl) => {
              console.log('Image uploaded:', imageUrl.substring(0, 50) + '...');
            }}
          />
        </div>
      )
    },
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

  const updateProp = (key: string, value: any) => {
    setProps((prev) => {
      const updated = { ...prev, [key]: value }
      
      // If progress changes, automatically update currentTime for MediaPlayer
      if (componentName === "MediaPlayer" && key === "progress") {
        const totalTime = updated.totalTime || "4:03"
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
          return `${mins}:${secs.toString().padStart(2, '0')}`
        }
        const totalSeconds = timeToSeconds(totalTime)
        const currentSeconds = (value / 100) * totalSeconds
        updated.currentTime = secondsToTime(currentSeconds)
      }
      
      // If currentTime or totalTime changes, automatically update progress for MediaPlayer
      if (componentName === "MediaPlayer" && (key === "currentTime" || key === "totalTime")) {
        const currentTime = updated.currentTime || "2:14"
        const totalTime = updated.totalTime || "4:03"
        const timeToSeconds = (time: string): number => {
          const parts = time.split(':')
          if (parts.length === 2) {
            return parseInt(parts[0]) * 60 + parseInt(parts[1])
          }
          return 0
        }
        const currentSeconds = timeToSeconds(currentTime)
        const totalSeconds = timeToSeconds(totalTime)
        if (totalSeconds > 0) {
          updated.progress = (currentSeconds / totalSeconds) * 100
        }
      }
      
      return updated
    })
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
      propsList.push(`currentTime="${props.currentTime || "2:14"}"`)
      propsList.push(`totalTime="${props.totalTime || "4:03"}"`)
      if (props.progress !== undefined) {
        propsList.push(`progress={${props.progress}}`)
      }
      propsList.push(`isPlaying={${props.isPlaying !== undefined ? props.isPlaying : true}}`)
      propsList.push(`isLoved={${props.isLoved !== undefined ? props.isLoved : false}}`)
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
  showShuffle?: boolean
  showRepeat?: boolean
  showHeart?: boolean
  backgroundColor?: string
  borderColor?: string
  borderRadius?: number
  glowColor1?: string
  glowColor2?: string
  enableImageUpload?: boolean
  onPlayPause?: (isPlaying: boolean) => void
  onLove?: (isLoved: boolean) => void
  onShuffle?: () => void
  onRepeat?: () => void
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
  currentTime: initialCurrentTime = "${props.currentTime || "2:14"}",
  totalTime: initialTotalTime = "${props.totalTime || "4:03"}",
  progress: initialProgress${props.progress !== undefined ? ` = ${props.progress}` : ''},
  isPlaying: initialIsPlaying = ${props.isPlaying !== undefined ? props.isPlaying : true},
  isLoved: initialIsLoved = ${props.isLoved !== undefined ? props.isLoved : false},
  showShuffle = ${props.showShuffle !== undefined ? props.showShuffle : true},
  showRepeat = ${props.showRepeat !== undefined ? props.showRepeat : true},
  showHeart = ${props.showHeart !== undefined ? props.showHeart : true},
  backgroundColor = "${bgColor}",
  borderColor = "${borderCol}",
  borderRadius = ${props.borderRadius !== undefined ? props.borderRadius : 24},
  glowColor1 = "${glow1}",
  glowColor2 = "${glow2}",
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
  const [albumArtUrl, setAlbumArtUrl] = useState(initialAlbumArtUrl)
  const [currentTime, setCurrentTime] = useState(initialCurrentTime)
  const [totalTime, setTotalTime] = useState(initialTotalTime)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const calculateProgressFromTimes = (currTime: string, totTime: string): number => {
    const currentSeconds = timeToSeconds(currTime)
    const totalSeconds = timeToSeconds(totTime)
    if (totalSeconds === 0) return 0
    return (currentSeconds / totalSeconds) * 100
  }

  const calculateTimeFromProgress = (prog: number, totTime: string): string => {
    const totalSeconds = timeToSeconds(totTime)
    const currentSeconds = (prog / 100) * totalSeconds
    return secondsToTime(currentSeconds)
  }

  const [progress, setProgress] = useState(
    initialProgress !== undefined
      ? initialProgress
      : calculateProgressFromTimes(initialCurrentTime, initialTotalTime)
  )

  useEffect(() => {
    if (initialProgress === undefined) {
      const newProgress = calculateProgressFromTimes(currentTime, totalTime)
      setProgress(newProgress)
      onTimeChange?.(currentTime, newProgress)
    }
  }, [currentTime, totalTime])

  useEffect(() => {
    if (initialProgress !== undefined) {
      const newCurrentTime = calculateTimeFromProgress(initialProgress, totalTime)
      setCurrentTime(newCurrentTime)
      setProgress(initialProgress)
      onTimeChange?.(newCurrentTime, initialProgress)
    }
  }, [initialProgress, totalTime])

  useEffect(() => {
    setCurrentTime(initialCurrentTime)
  }, [initialCurrentTime])

  useEffect(() => {
    setTotalTime(initialTotalTime)
  }, [initialTotalTime])

  useEffect(() => {
    if (initialProgress !== undefined) {
      setProgress(initialProgress)
    }
  }, [initialProgress])

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
    onShuffle?.()
  }

  const handleRepeat = () => {
    onRepeat?.()
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

  return (
    <div
      className={cn("relative overflow-hidden border p-6 backdrop-blur-xl", className)}
      style={{
        backgroundColor: bgColor,
        borderColor: borderCol,
        borderRadius: \`\${borderRadius}px\`,
        borderWidth: '1px',
        borderStyle: 'solid',
      }}
    >
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
            className="text-neutral-500 hover:text-white transition-colors"
          >
            <Shuffle size={18} />
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
            className="text-neutral-500 hover:text-white transition-colors"
          >
            <Repeat size={18} />
          </button>
        ) : (
          <div />
        )}
      </div>
    </div>
  )
}

// Usage example:
export function MediaPlayerDemo() {
  return (
    <MediaPlayer${propsString} />
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
}

// Usage example:
export function UrlInputDemo() {
  const handleGenerate = (url: string) => {
    console.log('Generated URL:', url)
    // Your logic here
  }

  return (
    <UrlInput${propsString} onGenerate={handleGenerate} />
  )
}`
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
    <div className="flex flex-col lg:grid lg:grid-cols-[1fr_320px] gap-6 min-w-0 w-full">
      {/* Mobile Order: 1. Preview */}
      <div className="order-1 lg:col-span-1">
        <Card className="p-12 min-h-[400px] flex items-center justify-center bg-gradient-to-br from-background to-muted/20">
          {config.render(props)}
        </Card>
      </div>

      {/* Mobile Order: 2. Customize (Desktop: Right Column) */}
      <div className="order-2 lg:col-start-2 lg:row-start-1 lg:row-span-3">
        <Card className="p-6 sticky top-20">
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

                {propConfig.type === "color" && (
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={props[key] && /^#[0-9A-Fa-f]{6}$/.test(props[key]) ? props[key] : "#000000"}
                      onChange={(e) => updateProp(key, e.target.value)}
                      className="h-10 w-20 rounded border border-input cursor-pointer"
                    />
                    <Input
                      value={props[key] || ""}
                      onChange={(e) => {
                        let value = e.target.value
                        // Ensure it starts with # and is valid hex
                        if (value && !value.startsWith('#')) {
                          value = '#' + value
                        }
                        // Limit to 7 characters (# + 6 hex digits)
                        if (value.length > 7) {
                          value = value.slice(0, 7)
                        }
                        updateProp(key, value)
                      }}
                      placeholder={propConfig.default}
                      className="flex-1"
                    />
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

      {/* Mobile Order: 3. Code */}
      <div className="order-3 lg:col-span-1 min-w-0">
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
      </div>

      {/* Mobile Order: 4. Properties */}
      <div className="order-4 lg:col-span-1">
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
    </div>
  )
}
